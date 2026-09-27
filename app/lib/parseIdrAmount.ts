/**
 * Parses an IDR amount that may be a plain number or a formatted string like
 * "Rp151.800" (Indonesian formatting uses "." as the thousands separator, no
 * decimals) — observed both ways across Sanity price fields and the sales
 * spreadsheet, so accept either shape rather than assuming one.
 */
export function parseIdrAmount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9]/g, "");
    if (digits) return Number(digits);
  }
  return null;
}
