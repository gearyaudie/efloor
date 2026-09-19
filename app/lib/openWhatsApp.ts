import { trackWhatsAppClick } from "./analytics";
import { createLeadRef } from "./attribution";
import { logLeadEvent } from "./leadLog";
import { buildWhatsAppUrl } from "./whatsapp";

/**
 * Opens a WhatsApp chat with a pre-filled, referenced message and records the
 * lead. Call it directly from a click handler.
 */
export function openWhatsApp({
  source,
  product,
}: {
  source: string;
  product?: string;
}): void {
  const ref = createLeadRef();
  const url = buildWhatsAppUrl({ product, ref });

  // Open synchronously inside the click: a window.open that first waits on a
  // promise loses the user gesture and gets popup-blocked. The conversion goes
  // out by beacon, which completes even after the hand-off to WhatsApp.
  const tab = window.open(url, "_blank");
  logLeadEvent({ ref, source, product });
  const tracked = trackWhatsAppClick({ source, product, ref });
  if (tab) {
    tab.opener = null;
    return;
  }

  // Popups blocked (some in-app browsers): let the hit flush, then leave.
  void tracked.then(() => {
    window.location.href = url;
  });
}
