import { parseIdrAmount } from "@/app/lib/parseIdrAmount";
import type { SalesChannel, SalesRow } from "./types";

// Matches the monthly sales-log tabs, e.g. "SEPTEMBER 2026 EFLOOR SHOPEE/TOKPED",
// "JULY 2026 EFLOOR SHOPEE/TOKPED" — excludes HPP/stock/ledger/B2B/config tabs.
export const MONTHLY_SALES_TAB_PATTERN = /EFLOOR.*SHOPEE.*TOKPED/i;

function normalizeHeader(header: unknown): string {
  return String(header ?? "").trim().toLowerCase();
}

/** Finds the header cell matching `test`, returns its column index or -1. */
function findColumn(headerRow: unknown[], test: (normalized: string) => boolean): number {
  return headerRow.findIndex((cell) => test(normalizeHeader(cell)));
}

export function classifyChannel(rawChannel: string): SalesChannel {
  const text = rawChannel.toLowerCase();
  if (text.includes("google")) return "google";
  if (text.includes("shopee")) return "shopee";
  if (text.includes("tokopedia")) return "tokopedia";
  if (text.includes("whatsapp")) return "whatsapp";
  return "other";
}

/** "9/1/2026" (M/D/YYYY) -> "2026-09-01". Returns null if unparseable. */
function parseSheetDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/**
 * Parses one monthly sales tab's raw values (including the header row) into
 * SalesRow[]. Column positions drift between months (some months have extra
 * Affiliate Fee columns, some name the OrderId column differently), so
 * columns are resolved by header text rather than a fixed letter — except
 * the channel column, which doesn't consistently use the same header text
 * across months (September's differs from the rest), so it falls back to
 * scanning for whichever string column's values look like known channel
 * keywords.
 */
export function parseSalesTab(sheetTitle: string, values: unknown[][]): SalesRow[] {
  if (values.length < 2) return [];
  const [headerRow, ...dataRows] = values;

  const dateCol = findColumn(headerRow, (h) => h.includes("date"));
  const productCol = findColumn(headerRow, (h) => h.includes("product name"));
  const quantityCol = findColumn(headerRow, (h) => h.includes("quantity"));
  const revenueCol = findColumn(headerRow, (h) => h.includes("subtotal"));
  const netProfitCol = findColumn(headerRow, (h) => h.includes("net profit"));

  let channelCol = findColumn(headerRow, (h) => h === "platform" || h.includes("whatsapp"));
  if (channelCol === -1) {
    // Fall back to whichever column's sampled values mostly look like known
    // channel keywords, rather than trusting a specific header spelling.
    const keywordPattern = /shopee|tokopedia|whatsapp|google/i;
    let bestCol = -1;
    let bestScore = 0;
    for (let col = 0; col < headerRow.length; col++) {
      let matches = 0;
      let sampled = 0;
      for (const row of dataRows.slice(0, 30)) {
        const cell = row[col];
        if (typeof cell !== "string" || !cell.trim()) continue;
        sampled += 1;
        if (keywordPattern.test(cell)) matches += 1;
      }
      if (sampled > 0 && matches / sampled > bestScore) {
        bestScore = matches / sampled;
        bestCol = col;
      }
    }
    if (bestScore > 0.5) channelCol = bestCol;
  }

  if (dateCol === -1 || revenueCol === -1) {
    // Can't make sense of this tab's layout — skip it rather than guess.
    return [];
  }

  const rows: SalesRow[] = [];
  for (const row of dataRows) {
    const date = parseSheetDate(row[dateCol]);
    const revenue = parseIdrAmount(row[revenueCol]);
    if (!date || revenue === null) continue; // blank trailing rows etc.

    const rawChannel = channelCol >= 0 ? String(row[channelCol] ?? "") : "";
    const netProfit = netProfitCol >= 0 ? parseIdrAmount(row[netProfitCol]) : null;

    rows.push({
      date,
      channel: classifyChannel(rawChannel),
      rawChannel,
      productName: productCol >= 0 ? String(row[productCol] ?? "") : "",
      quantity: quantityCol >= 0 ? Number(row[quantityCol]) || 0 : 0,
      // Stored as micros (value * 1,000,000), matching the Ads API's own
      // currency convention already used throughout this dashboard, purely
      // so both data sources can share the same formatIdr()/aggregation
      // code — the sheet itself has nothing to do with micros.
      revenueMicros: revenue * 1_000_000,
      netProfitMicros: netProfit !== null ? netProfit * 1_000_000 : null,
      sourceTab: sheetTitle,
    });
  }

  return rows;
}
