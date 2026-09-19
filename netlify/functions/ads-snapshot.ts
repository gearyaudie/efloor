import type { Config } from "@netlify/functions";
import { getAdsCustomer } from "../../app/lib/adsDashboard/googleAdsClient";
import { adsSnapshotStore, SNAPSHOT_KEY } from "../../app/lib/adsDashboard/blobStore";
import type {
  AdsCampaignDailyMetric,
  AdsConversionActionDailyMetric,
  AdsConversionActionMeta,
  AdsDailyMetric,
  AdsKeywordMetric,
  AdsSearchTermMetric,
  AdsSnapshot,
} from "../../app/lib/adsDashboard/types";

const LOOKBACK_DAYS = 60;

// GAQL's DURING operator only accepts a fixed set of named ranges (LAST_30_DAYS,
// LAST_MONTH, THIS_MONTH, ...) — there's no LAST_60_DAYS, so an arbitrary
// lookback needs an explicit BETWEEN range instead.
function lookbackRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return { start: iso(start), end: iso(end) };
}

// Pulls account, campaign, and conversion-action level daily metrics and
// caches them in Netlify Blobs, so the dashboard page never calls the Google
// Ads API on a page view — one API round trip a day instead of one per
// viewer per visit.
export default async (): Promise<Response> => {
  try {
    const customer = getAdsCustomer();
    const { start, end } = lookbackRange(LOOKBACK_DAYS);

    const [currencyRows, accountRows, campaignRows, conversionRows, conversionActionRows, keywordRows, searchTermRows] =
      await Promise.all([
        customer.query(`SELECT customer.currency_code FROM customer LIMIT 1`),
        customer.query(`
        SELECT segments.date, metrics.impressions, metrics.clicks,
               metrics.cost_micros, metrics.conversions, metrics.conversions_value
        FROM customer
        WHERE segments.date BETWEEN '${start}' AND '${end}'
        ORDER BY segments.date
      `),
        customer.query(`
        SELECT segments.date, campaign.id, campaign.name, metrics.impressions,
               metrics.clicks, metrics.cost_micros, metrics.conversions,
               metrics.conversions_value
        FROM campaign
        WHERE segments.date BETWEEN '${start}' AND '${end}'
        ORDER BY segments.date
      `),
        customer.query(`
        SELECT segments.date, segments.conversion_action_name,
               metrics.conversions, metrics.all_conversions, metrics.conversions_value
        FROM campaign
        WHERE segments.date BETWEEN '${start}' AND '${end}' AND metrics.all_conversions > 0
        ORDER BY segments.date
      `),
        // Static-ish metadata (not date-filtered): which actions actually count toward bidding.
        customer.query(`
        SELECT conversion_action.name, conversion_action.category,
               conversion_action.include_in_conversions_metric, conversion_action.status
        FROM conversion_action
      `),
        // Keyword totals over the lookback window — not day-segmented, see
        // docs/ads/dashboard-setup.md for why.
        customer.query(`
        SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
               ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type, ad_group_criterion.status,
               ad_group_criterion.quality_info.quality_score, metrics.clicks,
               metrics.impressions, metrics.cost_micros, metrics.conversions
        FROM keyword_view
        WHERE segments.date BETWEEN '${start}' AND '${end}'
          AND ad_group_criterion.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
      `),
        // Search terms over the lookback window, top 200 by cost.
        customer.query(`
        SELECT search_term_view.search_term, campaign.id, campaign.name,
               ad_group.id, ad_group.name, metrics.clicks, metrics.impressions,
               metrics.cost_micros, metrics.conversions
        FROM search_term_view
        WHERE segments.date BETWEEN '${start}' AND '${end}'
        ORDER BY metrics.cost_micros DESC
        LIMIT 200
      `),
      ]);

    const daily: AdsDailyMetric[] = accountRows.map((row) => ({
      date: String(row.segments?.date),
      impressions: Number(row.metrics?.impressions ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      conversions: Number(row.metrics?.conversions ?? 0),
      conversionsValueMicros: Number(row.metrics?.conversions_value ?? 0),
    }));

    const campaignDaily: AdsCampaignDailyMetric[] = campaignRows.map((row) => ({
      date: String(row.segments?.date),
      campaignId: String(row.campaign?.id),
      campaignName: String(row.campaign?.name ?? ""),
      impressions: Number(row.metrics?.impressions ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      conversions: Number(row.metrics?.conversions ?? 0),
      conversionsValueMicros: Number(row.metrics?.conversions_value ?? 0),
    }));

    const conversionActionDaily: AdsConversionActionDailyMetric[] = conversionRows.map(
      (row) => ({
        date: String(row.segments?.date),
        conversionActionName: String(row.segments?.conversion_action_name ?? "Unknown"),
        conversions: Number(row.metrics?.conversions ?? 0),
        allConversions: Number(row.metrics?.all_conversions ?? 0),
        conversionsValueMicros: Number(row.metrics?.conversions_value ?? 0),
      }),
    );

    const conversionActions: AdsConversionActionMeta[] = conversionActionRows.map((row) => ({
      name: String(row.conversion_action?.name ?? "Unknown"),
      category: String(row.conversion_action?.category ?? ""),
      includeInConversionsMetric: Boolean(row.conversion_action?.include_in_conversions_metric),
      status: String(row.conversion_action?.status ?? ""),
    }));

    const keywords: AdsKeywordMetric[] = keywordRows.map((row) => ({
      campaignId: String(row.campaign?.id),
      campaignName: String(row.campaign?.name ?? ""),
      adGroupId: String(row.ad_group?.id),
      adGroupName: String(row.ad_group?.name ?? ""),
      keywordId: String(row.ad_group_criterion?.criterion_id),
      keywordText: String(row.ad_group_criterion?.keyword?.text ?? ""),
      matchType: String(row.ad_group_criterion?.keyword?.match_type ?? ""),
      status: String(row.ad_group_criterion?.status ?? ""),
      qualityScore:
        row.ad_group_criterion?.quality_info?.quality_score != null
          ? Number(row.ad_group_criterion.quality_info.quality_score)
          : null,
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      conversions: Number(row.metrics?.conversions ?? 0),
    }));

    const searchTerms: AdsSearchTermMetric[] = searchTermRows.map((row) => ({
      searchTerm: String(row.search_term_view?.search_term ?? ""),
      campaignId: String(row.campaign?.id),
      campaignName: String(row.campaign?.name ?? ""),
      adGroupId: String(row.ad_group?.id),
      adGroupName: String(row.ad_group?.name ?? ""),
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      conversions: Number(row.metrics?.conversions ?? 0),
    }));

    const snapshot: AdsSnapshot = {
      fetchedAt: new Date().toISOString(),
      customerId: String(customer.credentials.customer_id),
      currency: String(currencyRows[0]?.customer?.currency_code ?? "IDR"),
      daily,
      campaignDaily,
      conversionActionDaily,
      conversionActions,
      keywords,
      searchTerms,
    };

    await adsSnapshotStore().setJSON(SNAPSHOT_KEY, snapshot);

    return new Response(
      JSON.stringify({
        ok: true,
        days: daily.length,
        campaigns: campaignRows.length,
        keywords: keywords.length,
        searchTerms: searchTerms.length,
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  } catch (error) {
    console.error("ads-snapshot failed", error);
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
};

// 08:15 Asia/Jakarta (UTC+7) — after the Ads API's own data for "yesterday"
// has settled, before the team's morning check-in.
export const config: Config = {
  schedule: "15 1 * * *",
};
