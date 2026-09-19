import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, isValidSessionToken } from "@/app/lib/adsDashboard/auth";
import { adsSnapshotStore, SNAPSHOT_KEY } from "@/app/lib/adsDashboard/blobStore";
import { readRecentLeadEvents } from "@/app/lib/adsDashboard/leads";
import { buildDashboardPayload, type DateRange } from "@/app/lib/adsDashboard/aggregate";
import type { AdsSnapshot } from "@/app/lib/adsDashboard/types";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const rangeParam = request.nextUrl.searchParams.get("range");
  const range: DateRange = rangeParam === "28d" ? "28d" : "mtd";

  const [snapshot, leadEvents] = await Promise.all([
    adsSnapshotStore().get(SNAPSHOT_KEY, { type: "json" }) as Promise<AdsSnapshot | null>,
    readRecentLeadEvents(65),
  ]);

  const payload = buildDashboardPayload(snapshot, leadEvents, range);
  return NextResponse.json({ ok: true, data: payload });
}
