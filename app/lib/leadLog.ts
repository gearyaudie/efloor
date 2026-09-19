import { getAttribution } from "./attribution";
import { TRACKING_ENABLED } from "./tracking-config";

/**
 * Fires the same WhatsApp click to our own `/api/leads` log, in addition to
 * the GA4/Ads beacons in `analytics.ts`. GA4 and Ads only keep aggregate
 * conversion counts; this is the only place the per-click ref code and its
 * source/channel are kept, which the internal Ads dashboard reads back.
 * Best-effort: never blocks or delays the WhatsApp hand-off.
 */
export function logLeadEvent(context: { ref: string; source?: string; product?: string }): void {
  if (!TRACKING_ENABLED || typeof window === "undefined") return;

  const attribution = getAttribution();
  const hasClickId = Boolean(attribution.gclid || attribution.gbraid || attribution.wbraid);

  const body = JSON.stringify({
    ref: context.ref,
    source: context.source,
    product: context.product,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    hasClickId,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/leads", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/leads", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
}
