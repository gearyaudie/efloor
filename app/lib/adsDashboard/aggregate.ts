import type { AdsSnapshot, LeadEvent } from "./types";

export type DateRange = "mtd" | "28d";

export type DashboardPayload = {
  fetchedAt: string | null;
  currency: string;
  range: {
    label: string;
    start: string;
    end: string;
    compareStart: string;
    compareEnd: string;
  };
  kpis: {
    totalLeads: Kpi;
    paidLeadShare: Kpi; // fraction 0..1, leads that carried a Google Ads click id
    adSpendMicros: Kpi;
    blendedCplMicros: Kpi | null; // spend / paid leads
    adsReportedConversions: Kpi; // every biddable action combined — see conversionsByAction for the split
    whatsappClickConversions: Kpi; // the one conversion action that actually means "lead"
    ctr: Kpi; // fraction 0..1
  };
  trend: { date: string; paidLeads: number; otherLeads: number }[];
  campaigns: {
    campaignId: string;
    campaignName: string;
    clicks: number;
    costMicros: number;
    conversions: number;
    convRate: number; // fraction 0..1
  }[];
  conversionsByAction: {
    name: string;
    countedInBidding: boolean;
    conversions: number;
    allConversions: number;
    valueMicros: number;
  }[];
  /** Period totals over the snapshot's lookback window — not sliced by `range`. See dashboard-setup.md. */
  keywords: {
    campaignName: string;
    adGroupName: string;
    keywordId: string;
    keywordText: string;
    matchType: string;
    status: string;
    qualityScore: number | null;
    clicks: number;
    costMicros: number;
    conversions: number;
    convRate: number;
  }[];
  /** Same lookback-window caveat as `keywords`. */
  searchTerms: {
    searchTerm: string;
    campaignName: string;
    adGroupName: string;
    clicks: number;
    costMicros: number;
    conversions: number;
    zeroConversionSpend: boolean;
  }[];
};

/** Below this, a zero-conversion search term isn't worth flagging as a likely leak. */
const ZERO_CONVERSION_SPEND_THRESHOLD_MICROS = 20_000 * 1_000_000;

type Kpi = { current: number; previous: number; deltaPct: number | null };

function kpi(current: number, previous: number): Kpi {
  const deltaPct = previous === 0 ? null : (current - previous) / previous;
  return { current, previous, deltaPct };
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

/** [start, end] inclusive, both as YYYY-MM-DD, for the requested range and its like-for-like comparison period. */
function resolveWindow(range: DateRange, today: Date) {
  const end = today;
  let start: Date;
  if (range === "mtd") {
    start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  } else {
    start = addDays(today, -27);
  }

  const spanDays = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  let compareEnd: Date;
  let compareStart: Date;
  if (range === "mtd") {
    // Same day-of-month cut in the previous month ("LMTD").
    const prevMonthEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, today.getUTCDate()));
    compareEnd = prevMonthEnd;
    compareStart = new Date(Date.UTC(prevMonthEnd.getUTCFullYear(), prevMonthEnd.getUTCMonth(), 1));
  } else {
    compareEnd = addDays(start, -1);
    compareStart = addDays(compareEnd, -(spanDays - 1));
  }

  return {
    start: isoDate(start),
    end: isoDate(end),
    compareStart: isoDate(compareStart),
    compareEnd: isoDate(compareEnd),
  };
}

function inRange(date: string, start: string, end: string): boolean {
  return date >= start && date <= end;
}

export function buildDashboardPayload(
  snapshot: AdsSnapshot | null,
  leadEvents: LeadEvent[],
  range: DateRange,
  now: Date = new Date(),
): DashboardPayload {
  const window = resolveWindow(range, now);

  const daily = snapshot?.daily ?? [];
  const currentDaily = daily.filter((d) => inRange(d.date, window.start, window.end));
  const previousDaily = daily.filter((d) => inRange(d.date, window.compareStart, window.compareEnd));

  const sum = (rows: typeof daily, pick: (d: (typeof daily)[number]) => number) =>
    rows.reduce((acc, d) => acc + pick(d), 0);

  const currentSpend = sum(currentDaily, (d) => d.costMicros ?? 0);
  const previousSpend = sum(previousDaily, (d) => d.costMicros ?? 0);
  const currentClicks = sum(currentDaily, (d) => d.clicks ?? 0);
  const currentImpressions = sum(currentDaily, (d) => d.impressions ?? 0);
  const previousClicks = sum(previousDaily, (d) => d.clicks ?? 0);
  const previousImpressions = sum(previousDaily, (d) => d.impressions ?? 0);
  const currentConversions = sum(currentDaily, (d) => d.conversions ?? 0);
  const previousConversions = sum(previousDaily, (d) => d.conversions ?? 0);

  const leadsByDate = (start: string, end: string) =>
    leadEvents.filter((e) => inRange(e.loggedAt.slice(0, 10), start, end));

  const currentLeads = leadsByDate(window.start, window.end);
  const previousLeads = leadsByDate(window.compareStart, window.compareEnd);

  const paidLeadsCurrent = currentLeads.filter((e) => e.hasClickId).length;
  const paidLeadsPrevious = previousLeads.filter((e) => e.hasClickId).length;

  const paidShareCurrent = currentLeads.length === 0 ? 0 : paidLeadsCurrent / currentLeads.length;
  const paidSharePrevious = previousLeads.length === 0 ? 0 : paidLeadsPrevious / previousLeads.length;

  const trendMap = new Map<string, { paidLeads: number; otherLeads: number }>();
  for (const e of currentLeads) {
    const date = e.loggedAt.slice(0, 10);
    const bucket = trendMap.get(date) ?? { paidLeads: 0, otherLeads: 0 };
    if (e.hasClickId) bucket.paidLeads += 1;
    else bucket.otherLeads += 1;
    trendMap.set(date, bucket);
  }
  const trend = [...trendMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({ date, ...v }));

  const campaignTotals = new Map<
    string,
    { campaignName: string; clicks: number; costMicros: number; conversions: number }
  >();
  for (const row of snapshot?.campaignDaily ?? []) {
    if (!inRange(row.date, window.start, window.end)) continue;
    const acc = campaignTotals.get(row.campaignId) ?? {
      campaignName: row.campaignName,
      clicks: 0,
      costMicros: 0,
      conversions: 0,
    };
    acc.clicks += row.clicks ?? 0;
    acc.costMicros += row.costMicros ?? 0;
    acc.conversions += row.conversions ?? 0;
    campaignTotals.set(row.campaignId, acc);
  }
  const campaigns = [...campaignTotals.entries()]
    .map(([campaignId, v]) => ({
      campaignId,
      campaignName: v.campaignName,
      clicks: v.clicks,
      costMicros: v.costMicros,
      conversions: v.conversions,
      convRate: v.clicks === 0 ? 0 : v.conversions / v.clicks,
    }))
    .sort((a, b) => b.costMicros - a.costMicros);

  const countedByName = new Map(
    (snapshot?.conversionActions ?? []).map((a) => [a.name, a.includeInConversionsMetric]),
  );

  const conversionActionTotals = new Map<
    string,
    { conversions: number; allConversions: number; valueMicros: number }
  >();
  for (const row of snapshot?.conversionActionDaily ?? []) {
    if (!inRange(row.date, window.start, window.end)) continue;
    const acc = conversionActionTotals.get(row.conversionActionName) ?? {
      conversions: 0,
      allConversions: 0,
      valueMicros: 0,
    };
    acc.conversions += row.conversions ?? 0;
    acc.allConversions += row.allConversions ?? 0;
    acc.valueMicros += row.conversionsValueMicros ?? 0;
    conversionActionTotals.set(row.conversionActionName, acc);
  }
  const conversionsByAction = [...conversionActionTotals.entries()]
    .map(([name, v]) => ({
      name,
      countedInBidding: countedByName.get(name) ?? false,
      conversions: v.conversions,
      allConversions: v.allConversions,
      valueMicros: v.valueMicros,
    }))
    .sort((a, b) => b.allConversions - a.allConversions);

  const whatsappConversionsFor = (start: string, end: string) =>
    (snapshot?.conversionActionDaily ?? [])
      .filter((row) => row.conversionActionName === "WhatsApp Click" && inRange(row.date, start, end))
      .reduce((acc, row) => acc + (row.conversions ?? 0), 0);

  const keywords = [...(snapshot?.keywords ?? [])]
    .map((k) => {
      const clicks = k.clicks ?? 0;
      const conversions = k.conversions ?? 0;
      return {
        campaignName: k.campaignName,
        adGroupName: k.adGroupName,
        keywordId: k.keywordId,
        keywordText: k.keywordText,
        matchType: k.matchType,
        status: k.status,
        qualityScore: k.qualityScore ?? null,
        clicks,
        costMicros: k.costMicros ?? 0,
        conversions,
        convRate: clicks === 0 ? 0 : conversions / clicks,
      };
    })
    .sort((a, b) => b.costMicros - a.costMicros);

  const searchTerms = [...(snapshot?.searchTerms ?? [])]
    .map((t) => {
      const conversions = t.conversions ?? 0;
      const costMicros = t.costMicros ?? 0;
      return {
        searchTerm: t.searchTerm,
        campaignName: t.campaignName,
        adGroupName: t.adGroupName,
        clicks: t.clicks ?? 0,
        costMicros,
        conversions,
        zeroConversionSpend: conversions === 0 && costMicros >= ZERO_CONVERSION_SPEND_THRESHOLD_MICROS,
      };
    })
    .sort((a, b) => b.costMicros - a.costMicros);

  return {
    fetchedAt: snapshot?.fetchedAt ?? null,
    currency: snapshot?.currency ?? "IDR",
    range: {
      label: range === "mtd" ? "MTD" : "Last 28 days",
      ...window,
    },
    kpis: {
      totalLeads: kpi(currentLeads.length, previousLeads.length),
      paidLeadShare: kpi(paidShareCurrent, paidSharePrevious),
      adSpendMicros: kpi(currentSpend, previousSpend),
      blendedCplMicros:
        paidLeadsCurrent === 0
          ? null
          : kpi(currentSpend / paidLeadsCurrent, paidLeadsPrevious === 0 ? 0 : previousSpend / paidLeadsPrevious),
      adsReportedConversions: kpi(currentConversions, previousConversions),
      whatsappClickConversions: kpi(
        whatsappConversionsFor(window.start, window.end),
        whatsappConversionsFor(window.compareStart, window.compareEnd),
      ),
      ctr: kpi(
        currentImpressions === 0 ? 0 : currentClicks / currentImpressions,
        previousImpressions === 0 ? 0 : previousClicks / previousImpressions,
      ),
    },
    trend,
    campaigns,
    conversionsByAction,
    keywords,
    searchTerms,
  };
}
