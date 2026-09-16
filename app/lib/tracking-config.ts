// Tracking is opt-in per Netlify deploy context. Production sets
// NEXT_PUBLIC_ENABLE_TRACKING="true" in netlify.toml; deploy previews and
// local dev leave it unset, so clicking a WhatsApp CTA there no longer
// files a real Google Ads conversion against the live account.
export const TRACKING_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";

// GA4 property and Google Ads account the site reports to.
export const GA_MEASUREMENT_ID = "G-GQGMBDHQMG";
export const GOOGLE_ADS_ID = "AW-17805856884";
