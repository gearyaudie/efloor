/** One day of account-level Google Ads metrics, in the account's own currency (IDR). */
export type AdsDailyMetric = {
  date: string; // YYYY-MM-DD
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
  conversionsValueMicros: number;
};

/** One day of a single campaign's metrics. */
export type AdsCampaignDailyMetric = AdsDailyMetric & {
  campaignId: string;
  campaignName: string;
};

/** One day of a single named conversion action (e.g. "WhatsApp Click"). */
export type AdsConversionActionDailyMetric = {
  date: string;
  conversionActionName: string;
  conversions: number;
  conversionsValueMicros: number;
};

export type AdsSnapshot = {
  fetchedAt: string; // ISO timestamp
  customerId: string;
  currency: string;
  daily: AdsDailyMetric[];
  campaignDaily: AdsCampaignDailyMetric[];
  conversionActionDaily: AdsConversionActionDailyMetric[];
};

/** One WhatsApp CTA click, logged server-side when the click fires client-side. */
export type LeadEvent = {
  ref: string; // e.g. "G-7K2QX9" — "G" prefix = arrived via a Google Ads click
  loggedAt: string; // ISO timestamp
  source?: string; // where on the site the CTA was, e.g. "hero", "footer"
  product?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  hasClickId: boolean; // gclid / gbraid / wbraid present at click time
};

export type LeadDay = {
  date: string; // YYYY-MM-DD
  events: LeadEvent[];
};
