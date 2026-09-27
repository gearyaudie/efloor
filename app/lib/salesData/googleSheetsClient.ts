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

/**
 * Reads the whole downloaded service-account key file (pasted verbatim as
 * one env var) rather than splitting client_email/private_key into two
 * separate vars — a hand-pasted PEM key routinely gets its newlines mangled
 * by single-line env var fields (missing entirely, or double-escaped),
 * which OpenSSL rejects with an opaque "DECODER routines::unsupported"
 * error. Parsing the original JSON keeps the key's newlines intact exactly
 * as Google generated them.
 */
function getServiceAccountCredentials(): { client_email: string; private_key: string } {
  const raw = requireEnv("GOOGLE_SERVICE_ACCOUNT_KEY_JSON");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY_JSON is not valid JSON — paste the entire contents of the downloaded service account key file, unmodified",
    );
  }

  const { client_email, private_key } = (parsed ?? {}) as {
    client_email?: string;
    private_key?: string;
  };
  if (!client_email || !private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_JSON is missing client_email or private_key");
  }

  return { client_email, private_key };
}

export function getSheetsClient() {
  const { client_email, private_key } = getServiceAccountCredentials();

  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}
