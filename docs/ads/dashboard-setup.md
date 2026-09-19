# Ads + leads dashboard — setup

Internal page at `/internal/ads-dashboard` (noindexed, `disallow`ed in
`robots.ts`, password-gated). Shows Google Ads spend/performance for account
`985-990-2435` next to WhatsApp leads logged by the site itself, so a status
check doesn't require a fresh round of GAQL queries each time (see
`docs/ads/baseline-2026-09-16.md` for what that used to look like manually).

## How it's wired

- **`netlify/functions/ads-snapshot.ts`** — scheduled function (`0 1:15 UTC`
  daily, `config.schedule` in the file) that pulls account/campaign/
  conversion-action daily metrics via the Google Ads API and caches them as
  one JSON blob in Netlify Blobs (`ads-dashboard-snapshots` store). The
  dashboard reads this cache — it never calls the Ads API itself.
- **`app/api/leads/route.ts`** — public POST endpoint. `app/lib/leadLog.ts`
  calls it (via `sendBeacon`) from `openWhatsApp.ts`, alongside the existing
  GA4/Ads conversion beacons, whenever a visitor taps a WhatsApp CTA. This is
  the only durable per-click record (ref code, source, product, UTM, whether
  a `gclid`/`gbraid`/`wbraid` was present) — GA4 and Ads only expose
  aggregate conversion counts, not this. Stored one blob per UTC day in the
  `ads-dashboard-leads` store.
- **`app/api/ads-dashboard/{login,logout,data}/route.ts`** — password check,
  signed session cookie (`node:crypto` HMAC, 7-day expiry), and the endpoint
  the dashboard page fetches once authenticated.
- **`app/internal/ads-dashboard/`** — the page itself (`page.tsx` server-side
  cookie check, `LoginForm.tsx`, `Dashboard.tsx`).

## Required environment variables (set in Netlify → Site configuration → Environment variables)

| Variable | What it is |
|---|---|
| `GOOGLE_ADS_DEVELOPER_TOKEN` | From the Ads API Center on the manager account |
| `GOOGLE_ADS_CLIENT_ID` / `GOOGLE_ADS_CLIENT_SECRET` | OAuth client used for the Ads API (same OAuth app as the Google Ads MCP setup, if that's already in place — its client ID/secret work here too) |
| `GOOGLE_ADS_REFRESH_TOKEN` | Refresh token for an account with access to `985-990-2435` |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | The manager (MCC) account ID, digits only, no dashes — omit if the refresh token's account has direct access |
| `GOOGLE_ADS_CUSTOMER_ID` | Target account, digits only — defaults to `9859902435` if unset |
| `ADS_DASHBOARD_PASSWORD` | The shared password for `/internal/ads-dashboard` |
| `ADS_DASHBOARD_SECRET` | Random string (e.g. `openssl rand -hex 32`) used to sign the login session cookie — not the same as the password |

Netlify Blobs needs no separate provisioning — it's automatically available
to both the Next.js runtime and standalone functions on Netlify, and to
`netlify dev` locally.

## First run

1. Set the env vars above in Netlify, then deploy.
2. Either wait for the next scheduled run, or trigger `ads-snapshot` once by
   hand from the Netlify Functions tab (or `netlify functions:invoke
   ads-snapshot`) so the dashboard has data immediately instead of showing
   an empty Ads section for up to a day.
3. Leads only start accumulating from the deploy where `logLeadEvent` first
   ships — there's no backfill for WhatsApp clicks before that.
4. Visit `/internal/ads-dashboard` and sign in with `ADS_DASHBOARD_PASSWORD`.

## What the numbers mean (and don't)

- **Ads-reported conversions (all actions)** comes straight from the Google
  Ads API (`metrics.conversions`) — this is whatever conversion actions are
  currently biddable/counted in the account (see the baseline doc's table),
  not a sales-verified figure. There's no CRM behind this site, so unlike a
  lead-to-policy dashboard, nothing here confirms a WhatsApp chat became a
  sale.
- **WhatsApp Click conversions** is the one action in that blend that
  actually corresponds to a lead — pulled out separately because, at
  baseline, "Local actions - Directions" (an auto-counted, low-intent,
  Google-hosted action) supplied effectively all of "conversions" while
  WhatsApp Click itself wasn't even biddable yet. The **"Conversions by
  action"** table below both KPIs shows every conversion action Google Ads
  is recording, with a badge for whether it's currently counted toward
  bidding at all.
- **"Leads from Google Ads"** is the share of logged WhatsApp clicks that
  carried a `gclid`/`gbraid`/`wbraid` at click time — a proxy for
  paid-channel origin, not a matched Ads conversion record.
- **Blended CPL** = ad spend ÷ those Google-Ads-attributed leads for the
  selected range.
- **Keyword performance** and **Search terms** are period totals over the
  snapshot's 60-day lookback window, refreshed daily — they do **not**
  move when you switch the MTD / Last 28 days toggle above them. This is
  deliberate: `ad_group_criterion.quality_info.quality_score` is a current
  snapshot value, not a true daily historical metric, so there was no real
  benefit to day-segmenting either report at this account's size (see the
  baseline doc's own "90-day totals" framing, which this follows). Search
  terms are capped to the top 200 by cost; rows with Rp20,000+ spent and
  zero conversions are flagged as negative-keyword candidates — the
  dashboard only flags, it doesn't auto-suggest negatives, since the
  baseline doc already found real conflicts between "irrelevant"-looking
  terms and legitimate "lem …" queries that a naive heuristic would get
  wrong.

## Extending this later

If sales ever get logged against the `ref` code written into each WhatsApp
message (the `G-XXXXXX` / `W-XXXXXX` codes from `attribution.ts`), a real
lead → sale conversion view becomes possible by joining that log against
`ads-dashboard-leads`. Nothing here assumes that yet.
