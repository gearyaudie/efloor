# EFLOOR Google Ads — operating playbook

How the account is run week to week after the September 2026 revamp.
Account `985-990-2435`, campaign **EFLOOR SEARCH** `23588047100`.
Baseline before the revamp: [baseline-2026-09-16.md](./baseline-2026-09-16.md).

## Structure as of 18 Sep 2026

| Ad group | ID | Lands on |
|---|---|---|
| Ad group 1 (original, protected) | 192208191294 | `/` |
| Harga Lem | 201172064318 | `/harga-lem-vinyl-karpet` |
| Lem Vinyl - Produk | 195552484250 | `/products/lem-vinyl-efloor` |
| Lem Karpet - Produk | 200341182156 | `/products/lem-karpet` |
| Supplier & Proyek | 200340994516 | `/projects` |
| Lem HPL | 200882873472 | `/lem-hpl-pvc-sheet` |
| Lem Karpet Gym | 200882876072 | `/lem-karpet-gym` |
| Lem Lapangan Badminton | 207034013024 | `/lem-lapangan-badminton` |
| Lem Karpet Masjid | 198913664534 | `/lem-karpet-masjid` |
| List Siku & Step Nosing | 201807844482 | `/list-siku-step-nosing` |
| List Plint / Skirting | 208718472628 | `/list-plint-skirting-pvc` |
| List Adaptasi / Transisi | 205918758408 | `/list-adaptasi-transisi` |
| Brand | 201766667273 | `/` and `/products/lem-efloor-max` |

Settings: Maximize Conversions, no target CPA, Rp80.000/day, Indonesia with
**Presence** targeting, Google Search only, 06:00–22:00 WIB.
Bidding optimises toward **WhatsApp Click** and **Calls from ads** only.
Negatives: 70 campaign-level plus the shared list **EFLOOR – Tidak Relevan**
(`12239103730`, 156 terms).

## Weekly review

```
cd C:\PP\google-ads-mcp
node --env-file=.env scripts/weekly-review.mjs --days 7
```

Read-only. It reports KPIs against the revamp targets, spend by ad group,
irrelevant search terms with suggested negatives, converting terms worth adding
as exact keywords, keywords with Quality Score ≤ 4, negative conflicts, and
which Phase 3 gates are met.

Then, in order:

1. **Add negatives** for irrelevant terms. The rule that matters: never add a
   phrase negative that can sit directly after the word "lem". Put a buying
   word in front instead ("jual karpet", not "karpet"). Run
   `check_negative_conflicts` after every change; it must return 0.
2. **Promote converting search terms** to exact keywords in the ad group whose
   landing page answers them.
3. **Quality Score ≤ 4**: check the keyword is in the right ad group and that
   its landing page mentions the search term. Move it rather than raise bids.
4. **Ad strength**: replace assets rated "Low" roughly every 3 weeks; aim for
   Good or better.

## Gates — do not act before these are met

| Change | Gate |
|---|---|
| Set a target CPA | ≥30 WhatsApp leads in 30 days; set it at 1,2× the observed cost per lead, then tighten 10% every 2 weeks |
| Broad-match discovery ad group | ≥30 WhatsApp leads in 30 days; stop it if non-"lem" search terms take >30% of its spend after 14 days |
| Raise the daily budget | Lost impression share (budget) >20% **and** cost per lead on target for 14 days; raise by at most 20% at a time |
| Switch to Maximize Conversion Value | Lead values actually differ (tiered or real order values) **and** "Calls from ads" has a realistic value instead of Rp1 |

## Order values: closing the loop

Every WhatsApp CTA opens the chat with a reference code, e.g.
`(ref: G-7K2QX9)`. `G-` means the visitor arrived from a Google Ads click,
`W-` means any other visit. The same code is sent to Google Ads as the
conversion's transaction ID.

**What sales does:** for every chat that becomes an order, log a row:

| ref | order date | order value (Rp) | product | notes |
|---|---|---|---|---|
| G-7K2QX9 | 2026-09-18 | 1525000 | Lem Vinyl 20 KG | tender proyek |

**What we do, weekly:** upload those values with `upload_order_values`
(conversion action **WhatsApp Click** `7764861976`, currency IDR). It replaces
the Rp50.000 placeholder on that conversion with the real order value, matched
by the reference code, so bidding learns from revenue rather than an estimate.

Limits worth knowing:
- Only conversions from the **last 55 days** can be adjusted, so upload weekly.
- Only `G-` references exist in Google Ads; `W-` chats came from elsewhere.
- Adjustments can take a few hours to show in reports.
- Always `dry_run` first.

## Placeholder values, to revisit

- **WhatsApp Click: Rp50.000.** A placeholder, not a measured figure. Replace
  it once order values are flowing, or sooner by tiering values per lead type
  (a `/projects` quotation is worth more than a 1 KG retail chat).
- **Calls from ads: Rp1.** Needs a realistic value before any value-based
  bidding, or calls will be treated as worthless.

## Data owned outside the repo

- **Sanity:** product names, descriptions and price variants. The pricing and
  trim landing pages read them at build time, so a price change needs a
  redeploy to appear.
- **Google Business Profile:** the "Local actions" conversions (directions,
  calls, website visits). These are reported but no longer bid on.
