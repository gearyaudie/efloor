import { sendGAEvent } from "@next/third-parties/google";

// Google Ads conversion action "WhatsApp Click" (customers/9859902435/conversionActions/7764861976).
// Every CTA on the site funnels to WhatsApp, so this is the real lead signal —
// fired alongside the existing "Calls from ads" conversion, not replacing it.
const WHATSAPP_CONVERSION_SEND_TO = "AW-17805856884/vxPSCJjIyfYcEPSgv6pC";

export function trackWhatsAppClick() {
  sendGAEvent("event", "whatsapp_click", { method: "whatsapp" });
  sendGAEvent("event", "conversion", {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
    value: 1.0,
    currency: "IDR",
  });
}

export function isWhatsAppLink(href: string) {
  return href.includes("api.whatsapp.com") || href.includes("wa.me");
}
