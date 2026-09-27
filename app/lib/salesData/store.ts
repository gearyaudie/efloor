import { getStore } from "@netlify/blobs";

const SALES_SNAPSHOT_STORE = "ads-dashboard-sales";
export const SALES_SNAPSHOT_KEY = "latest";

export function salesSnapshotStore() {
  return getStore(SALES_SNAPSHOT_STORE);
}
