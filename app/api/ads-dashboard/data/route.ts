import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, isValidSessionToken } from "@/app/lib/adsDashboard/auth";
import { adsSnapshotStore, SNAPSHOT_KEY } from "@/app/lib/adsDashboard/blobStore";
import { readRecentLeadEvents } from "@/app/lib/adsDashboard/leads";
import { buildDashboardPayload, type DateRange } from "@/app/lib/adsDashboard/aggregate";
import type { AdsSnapshot } from "@/app/lib/adsDashboard/types";
import { salesSnapshotStore, SALES_SNAPSHOT_KEY } from "@/app/lib/salesData/store";
import { buildSalesPayload } from "@/app/lib/salesData/aggregate";
import type { SalesSnapshot } from "@/app/lib/salesData/types";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const rangeParam = request.nextUrl.searchParams.get("range");
  const range: DateRange = rangeParam === "28d" ? "28d" : "mtd";

  const [snapshot, leadEvents, salesSnapshot] = await Promise.all([
    adsSnapshotStore().get(SNAPSHOT_KEY, { type: "json" }) as Promise<AdsSnapshot | null>,
    readRecentLeadEvents(65),
    salesSnapshotStore().get(SALES_SNAPSHOT_KEY, { type: "json" }) as Promise<SalesSnapshot | null>,
  ]);

  const payload = buildDashboardPayload(snapshot, leadEvents, range);
  const sales = buildSalesPayload(salesSnapshot, range, payload.kpis.adSpendMicros.current);

  return NextResponse.json({ ok: true, data: payload, sales });
}
