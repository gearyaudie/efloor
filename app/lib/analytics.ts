import { sendGAEvent } from "@next/third-parties/google";
import { GOOGLE_ADS_ID, TRACKING_ENABLED } from "./tracking-config";

// Google Ads conversion action "WhatsApp Click"
// (customers/9859902435/conversionActions/7764861976). Every CTA on the site
// funnels to WhatsApp, so this is the real lead signal — fired alongside the
// existing "Calls from ads" conversion, not replacing it.
const WHATSAPP_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/vxPSCJjIyfYcEPSgv6pC`;

// Placeholder lead value. A WhatsApp chat is not a sale, so this is a proxy
// for what one qualified chat is worth; revisit once offline order imports
// give us a real close rate. Bidding compares values, so Rp1 made every lead
// look worthless.
export const WHATSAPP_LEAD_VALUE_IDR = 50_000;

// How long to wait for gtag to confirm the hit before letting the browser
// leave for WhatsApp.
const CONVERSION_FLUSH_TIMEOUT_MS = 800;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export type WhatsAppClickContext = {
  /** Where the click happened, e.g. "hero", "floating-button", "footer". */
  source?: string;
  /** Product or landing page the visitor was looking at. */
  product?: string;
  /**
   * Lead reference written into the WhatsApp message. It is sent as the
   * conversion transaction ID, so an order closed in that chat can later
   * restate the conversion value by order ID, without needing the gclid.
   */
  ref?: string;
};

/**
 * Reports a WhatsApp CTA click to GA4 and Google Ads.
 *
 * Resolves once Google Ads confirms the hit (or after a short timeout), so
 * callers can wait before navigating away. The conversion is sent with
 * `transport_type: "beacon"` so it still survives the browser handing off to
 * the WhatsApp app mid-request.
 */
export function trackWhatsAppClick(
  context: WhatsAppClickContext = {},
): Promise<void> {
  if (!TRACKING_ENABLED || typeof window === "undefined") {
    return Promise.resolve();
  }

  sendGAEvent("event", "whatsapp_click", {
    method: "whatsapp",
    ...(context.source ? { source: context.source } : {}),
    ...(context.product ? { product: context.product } : {}),
    ...(context.ref ? { ref: context.ref } : {}),
  });

  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve();
    };
    const timer = setTimeout(settle, CONVERSION_FLUSH_TIMEOUT_MS);

    gtag("event", "conversion", {
      send_to: WHATSAPP_CONVERSION_SEND_TO,
      value: WHATSAPP_LEAD_VALUE_IDR,
      currency: "IDR",
      ...(context.ref ? { transaction_id: context.ref } : {}),
      transport_type: "beacon",
      event_callback: settle,
    });
  });
}
