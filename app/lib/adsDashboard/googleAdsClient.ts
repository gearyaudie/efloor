import { GoogleAdsApi } from "google-ads-api";

// The account audited in docs/ads/baseline-2026-09-16.md. Overridable so the
// same code works against a different account without a code change.
const DEFAULT_CUSTOMER_ID = "9859902435";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name} for the Google Ads API`);
  }
  return value;
}

export function getAdsCustomer() {
  const client = new GoogleAdsApi({
    client_id: requireEnv("GOOGLE_ADS_CLIENT_ID"),
    client_secret: requireEnv("GOOGLE_ADS_CLIENT_SECRET"),
    developer_token: requireEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
  });

  const customerId =
    process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "") || DEFAULT_CUSTOMER_ID;

  return client.Customer({
    customer_id: customerId,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, ""),
    refresh_token: requireEnv("GOOGLE_ADS_REFRESH_TOKEN"),
  });
}

export { DEFAULT_CUSTOMER_ID };
