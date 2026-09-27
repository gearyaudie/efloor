import { google } from "googleapis";

// The "efloor masterdata" sheet, shared with the service account as Viewer.
const DEFAULT_SPREADSHEET_ID = "1-kklLwzQRFcB5aGrmOLslv94muIKckGcDOa17-5vZ-M";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name} for the Google Sheets sync`);
  }
  return value;
}

export function getSalesSpreadsheetId(): string {
  return process.env.GOOGLE_SHEETS_SALES_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;
}

export function getSheetsClient() {
  // Netlify env vars are single-line, so a pasted PEM key has its newlines
  // escaped as literal "\n" — turn them back into real newlines.
  const privateKey = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}
