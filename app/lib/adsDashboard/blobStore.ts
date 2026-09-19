import { getStore } from "@netlify/blobs";

// Netlify auto-configures blob access (siteID + token) for both the Next.js
// runtime and standalone functions when deployed on Netlify, and for `netlify
// dev` locally. There is nothing to provision manually.
const ADS_SNAPSHOT_STORE = "ads-dashboard-snapshots";
const LEADS_STORE = "ads-dashboard-leads";

export const SNAPSHOT_KEY = "latest";

export function adsSnapshotStore() {
  return getStore(ADS_SNAPSHOT_STORE);
}

export function leadsStore() {
  return getStore(LEADS_STORE);
}

/** One UTC day's worth of WhatsApp-click leads are kept under this key. */
export function leadsKeyForDate(date: string): string {
  return `day/${date}`;
}
