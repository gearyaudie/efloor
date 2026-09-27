import { portableTextToPlainText } from "./sanityText";

/** "12 September 2026", in Jakarta time so server and client agree. */
export function formatPostDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
}

/** Minutes to read at ~200 words per minute, never less than 1. */
export function readingMinutes(content: unknown) {
  const words = portableTextToPlainText(content, Number.MAX_SAFE_INTEGER).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
