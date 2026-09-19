import { NextRequest, NextResponse } from "next/server";
import { appendLeadEvent } from "@/app/lib/adsDashboard/leads";
import { TRACKING_ENABLED } from "@/app/lib/tracking-config";

/**
 * Logs one WhatsApp CTA click server-side, called alongside the existing
 * GA4/Google Ads beacons in `openWhatsApp.ts`. This is the only durable
 * record of individual leads — GA4/Ads only keep aggregate conversion
 * counts, not the per-click ref codes needed to break leads down by source
 * on the internal dashboard.
 */
export async function POST(request: NextRequest) {
  if (!TRACKING_ENABLED) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { ref, source, product, utmSource, utmMedium, utmCampaign, hasClickId } =
    (body ?? {}) as Record<string, unknown>;

  if (typeof ref !== "string" || !ref) {
    return NextResponse.json({ ok: false, error: "Missing ref" }, { status: 400 });
  }

  try {
    await appendLeadEvent({
      ref,
      loggedAt: new Date().toISOString(),
      source: typeof source === "string" ? source : undefined,
      product: typeof product === "string" ? product : undefined,
      utmSource: typeof utmSource === "string" ? utmSource : undefined,
      utmMedium: typeof utmMedium === "string" ? utmMedium : undefined,
      utmCampaign: typeof utmCampaign === "string" ? utmCampaign : undefined,
      hasClickId: Boolean(hasClickId),
    });
  } catch (error) {
    // Never break the WhatsApp hand-off over a logging failure.
    console.error("Failed to log lead event", error);
  }

  return NextResponse.json({ ok: true });
}
