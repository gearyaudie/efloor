/**
 * One sales-log row from the "efloor masterdata" Google Sheet, stripped of
 * every customer-identifying field (name, phone, notes) before it's kept
 * anywhere — the sheet holds real customer PII and none of it belongs in
 * the dashboard's storage or UI.
 */
export type SalesRow = {
  date: string; // YYYY-MM-DD
  channel: SalesChannel;
  rawChannel: string; // the sheet's own text, e.g. "Shopee - efloor.id" — kept for debugging a misclassification
  productName: string;
  quantity: number;
  revenueMicros: number; // "Subtotal Sales"
  netProfitMicros: number | null; // "Net Profit", when present
  sourceTab: string; // which monthly tab this came from, e.g. "SEPTEMBER 2026 EFLOOR SHOPEE/TOKPED"
};

/**
 * Normalized from whatever text sits in the sheet's channel column. "google"
 * is a label a human types in when they judge an order came from a Google
 * Ads click — it is not verified against an actual ad click or ref code, so
 * treat any Google-attributed revenue/ROAS as only as reliable as that
 * manual tagging.
 */
export type SalesChannel = "google" | "shopee" | "tokopedia" | "whatsapp" | "other";

export type SalesSnapshot = {
  fetchedAt: string; // ISO timestamp
  spreadsheetId: string;
  sourceTabs: string[]; // which sheet tabs were parsed
  rows: SalesRow[];
};
