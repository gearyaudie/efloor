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
  conversions: number; // counted toward the account's biddable "Conversions"
  allConversions: number; // every recorded conversion, counted or not
  conversionsValueMicros: number;
};

/** Whether a named conversion action is counted toward bidding, from the `conversion_action` resource. */
export type AdsConversionActionMeta = {
  name: string;
  category: string;
  includeInConversionsMetric: boolean;
  status: string;
};

/**
 * One keyword's performance totals over the snapshot's lookback window
 * (not day-segmented — see docs/ads/dashboard-setup.md for why).
 */
export type AdsKeywordMetric = {
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  keywordId: string;
  keywordText: string;
  matchType: string;
  status: string;
  qualityScore: number | null;
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
};

/** One search term's totals over the snapshot's lookback window, top N by cost. */
export type AdsSearchTermMetric = {
  searchTerm: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
};

export type AdsSnapshot = {
  fetchedAt: string; // ISO timestamp
  customerId: string;
  currency: string;
  daily: AdsDailyMetric[];
  campaignDaily: AdsCampaignDailyMetric[];
  conversionActionDaily: AdsConversionActionDailyMetric[];
  conversionActions: AdsConversionActionMeta[];
  keywords: AdsKeywordMetric[];
  searchTerms: AdsSearchTermMetric[];
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
