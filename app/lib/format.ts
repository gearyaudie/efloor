/** Formats rupiah as "Rp62.000" — deterministic, so server and client match. */
export function rupiah(n: number) {
  return `Rp${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** Centimetres the Indonesian way: 2.2 → "2,2". */
export const fmtCm = (n: number) => n.toString().replace(".", ",");
