import type { Config } from "@netlify/functions";
import { getAdsCustomer } from "../../app/lib/adsDashboard/googleAdsClient";
import { adsSnapshotStore, SNAPSHOT_KEY } from "../../app/lib/adsDashboard/blobStore";
import type {
  AdsCampaignDailyMetric,
  AdsConversionActionDailyMetric,
  AdsDailyMetric,
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

    const [currencyRows, accountRows, campaignRows, conversionRows] = await Promise.all([
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
               metrics.conversions, metrics.conversions_value
        FROM campaign
        WHERE segments.date BETWEEN '${start}' AND '${end}' AND metrics.conversions > 0
        ORDER BY segments.date
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
        conversionsValueMicros: Number(row.metrics?.conversions_value ?? 0),
      }),
    );

    const snapshot: AdsSnapshot = {
      fetchedAt: new Date().toISOString(),
      customerId: String(customer.credentials.customer_id),
      currency: String(currencyRows[0]?.customer?.currency_code ?? "IDR"),
      daily,
      campaignDaily,
      conversionActionDaily,
    };

    await adsSnapshotStore().setJSON(SNAPSHOT_KEY, snapshot);

    return new Response(
      JSON.stringify({ ok: true, days: daily.length, campaigns: campaignRows.length }),
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
