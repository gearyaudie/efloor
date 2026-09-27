import { inRange, resolveWindow, type DateRange } from "@/app/lib/adsDashboard/aggregate";
import type { SalesChannel, SalesSnapshot } from "./types";

export type SalesPayload = {
  fetchedAt: string | null;
  channels: {
    channel: SalesChannel;
    revenueMicros: number;
    orders: number;
    quantity: number;
  }[];
  /** null when there's no ad spend figure to divide against for this range. */
  googleRoas: {
    revenueMicros: number;
    adSpendMicros: number;
    roas: number; // revenue / spend
  } | null;
};

/**
 * `adSpendMicros` is the Ads dashboard's own spend total for the same
 * range — passed in rather than recomputed here, so there's exactly one
 * place that sums Ads API daily spend.
 */
export function buildSalesPayload(
  snapshot: SalesSnapshot | null,
  range: DateRange,
  adSpendMicros: number | null,
  now: Date = new Date(),
): SalesPayload {
  const window = resolveWindow(range, now);
  const rows = (snapshot?.rows ?? []).filter((r) => inRange(r.date, window.start, window.end));

  const totals = new Map<SalesChannel, { revenueMicros: number; orders: number; quantity: number }>();
  for (const row of rows) {
    const acc = totals.get(row.channel) ?? { revenueMicros: 0, orders: 0, quantity: 0 };
    acc.revenueMicros += row.revenueMicros;
    acc.orders += 1;
    acc.quantity += row.quantity;
    totals.set(row.channel, acc);
  }

  const channels = [...totals.entries()]
    .map(([channel, v]) => ({ channel, ...v }))
    .sort((a, b) => b.revenueMicros - a.revenueMicros);

  const googleRevenueMicros = totals.get("google")?.revenueMicros ?? 0;
  const googleRoas =
    adSpendMicros && adSpendMicros > 0
      ? {
          revenueMicros: googleRevenueMicros,
          adSpendMicros,
          roas: googleRevenueMicros / adSpendMicros,
        }
      : null;

  return {
    fetchedAt: snapshot?.fetchedAt ?? null,
    channels,
    googleRoas,
  };
}
