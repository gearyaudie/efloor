const ONES = [
  "",
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
  "Sebelas",
];

/** Converts a non-negative integer into Indonesian words (e.g. 3375000 -> "Tiga Juta Tiga Ratus Tujuh Puluh Lima Ribu"). */
function numberToWords(n: number): string {
  if (n < 12) return ONES[n];
  if (n < 20) return `${numberToWords(n - 10)} Belas`;
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const rest = n % 10;
    return rest === 0 ? `${numberToWords(tens)} Puluh` : `${numberToWords(tens)} Puluh ${numberToWords(rest)}`;
  }
  if (n < 200) return `Seratus${n - 100 === 0 ? "" : ` ${numberToWords(n - 100)}`}`;
  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    return rest === 0 ? `${numberToWords(hundreds)} Ratus` : `${numberToWords(hundreds)} Ratus ${numberToWords(rest)}`;
  }
  if (n < 2000) return `Seribu${n - 1000 === 0 ? "" : ` ${numberToWords(n - 1000)}`}`;
  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1000);
    const rest = n % 1000;
    return rest === 0 ? `${numberToWords(thousands)} Ribu` : `${numberToWords(thousands)} Ribu ${numberToWords(rest)}`;
  }
  if (n < 1_000_000_000) {
    const millions = Math.floor(n / 1_000_000);
    const rest = n % 1_000_000;
    return rest === 0 ? `${numberToWords(millions)} Juta` : `${numberToWords(millions)} Juta ${numberToWords(rest)}`;
  }
  const billions = Math.floor(n / 1_000_000_000);
  const rest = n % 1_000_000_000;
  return rest === 0 ? `${numberToWords(billions)} Miliar` : `${numberToWords(billions)} Miliar ${numberToWords(rest)}`;
}

/** Formats a Rupiah amount as the "SAY" terbilang line, e.g. 3375000 -> "Tiga Juta Tiga Ratus Tujuh Puluh Lima Ribu Rupiah". */
export function terbilangRupiah(amount: number): string {
  const rounded = Math.round(Math.abs(amount));
  if (rounded === 0) return "Nol Rupiah";
  return `${numberToWords(rounded)} Rupiah`;
}

/** Formats a number with Indonesian thousands separators, e.g. 3375000 -> "3.375.000". */
export function formatIdrAmount(amount: number): string {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Math.round(amount));
}
