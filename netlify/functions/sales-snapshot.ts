import type { Config } from "@netlify/functions";
import { getSalesSpreadsheetId, getSheetsClient } from "../../app/lib/salesData/googleSheetsClient";
import { MONTHLY_SALES_TAB_PATTERN, parseSalesTab } from "../../app/lib/salesData/parseSheet";
import { salesSnapshotStore, SALES_SNAPSHOT_KEY } from "../../app/lib/salesData/store";
import type { SalesRow, SalesSnapshot } from "../../app/lib/salesData/types";

// Pulls every monthly sales-log tab from the "efloor masterdata" sheet and
// caches the parsed rows in Netlify Blobs — the dashboard never calls the
// Sheets API itself. Customer name/phone/notes columns are never read into
// the rows this writes; only date, channel, product, quantity and revenue
// figures are kept.
export default async (): Promise<Response> => {
  try {
    const spreadsheetId = getSalesSpreadsheetId();
    const sheets = getSheetsClient();

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const tabTitles = (meta.data.sheets ?? [])
      .map((s) => s.properties?.title)
      .filter(
        (title): title is string => typeof title === "string" && MONTHLY_SALES_TAB_PATTERN.test(title),
      );

    const rows: SalesRow[] = [];
    for (const title of tabTitles) {
      const range = `'${title}'!A:Z`;
      const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      rows.push(...parseSalesTab(title, result.data.values ?? []));
    }

    const snapshot: SalesSnapshot = {
      fetchedAt: new Date().toISOString(),
      spreadsheetId,
      sourceTabs: tabTitles,
      rows,
    };

    await salesSnapshotStore().setJSON(SALES_SNAPSHOT_KEY, snapshot);

    return new Response(
      JSON.stringify({ ok: true, tabs: tabTitles.length, rows: rows.length }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  } catch (error) {
    console.error("sales-snapshot failed", error);
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
};

// 08:30 Asia/Jakarta (UTC+7) — 15 minutes after ads-snapshot, same rationale.
export const config: Config = {
  schedule: "30 1 * * *",
};
