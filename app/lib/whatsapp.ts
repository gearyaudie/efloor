// The one WhatsApp number every CTA on the site opens.
export const WHATSAPP_NUMBER = "628561153725";

// The same line takes calls; the Google Ads call asset already uses it.
export const PHONE_TEL_HREF = `tel:+${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = "0856-1153-725";

/**
 * Builds a wa.me link with a pre-filled first message, so sales can see which
 * product the visitor was looking at and, when a ref is passed, which visit
 * the chat came from.
 */
export function buildWhatsAppUrl({
  product,
  ref,
}: { product?: string; ref?: string } = {}): string {
  const topic = product
    ? `saya tertarik dengan ${product}`
    : "saya ingin bertanya tentang produk EFLOOR";
  const suffix = ref ? ` (ref: ${ref})` : "";
  const text = `Halo EFLOOR, ${topic}.${suffix}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
