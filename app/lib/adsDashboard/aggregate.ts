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
    adsReportedConversions: Kpi;
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
};

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

  const currentSpend = sum(currentDaily, (d) => d.costMicros);
  const previousSpend = sum(previousDaily, (d) => d.costMicros);
  const currentClicks = sum(currentDaily, (d) => d.clicks);
  const currentImpressions = sum(currentDaily, (d) => d.impressions);
  const previousClicks = sum(previousDaily, (d) => d.clicks);
  const previousImpressions = sum(previousDaily, (d) => d.impressions);
  const currentConversions = sum(currentDaily, (d) => d.conversions);
  const previousConversions = sum(previousDaily, (d) => d.conversions);

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
    acc.clicks += row.clicks;
    acc.costMicros += row.costMicros;
    acc.conversions += row.conversions;
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
      ctr: kpi(
        currentImpressions === 0 ? 0 : currentClicks / currentImpressions,
        previousImpressions === 0 ? 0 : previousClicks / previousImpressions,
      ),
    },
    trend,
    campaigns,
  };
}
