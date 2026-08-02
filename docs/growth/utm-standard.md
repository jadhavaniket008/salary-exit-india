# UTM standard

Fixes the exact problem documented in `docs/salaryexit-distribution-forensics.md` §10: `?utm=reddit` (not a real UTM key), missing UTMs entirely, and `?utm_source=redd` (non-standard value, no medium/campaign). Every link used in this growth system must be built with `scripts/growth/generate-campaign-url.ts` (backed by `lib/growth/campaign-url.ts`), not typed by hand.

## Mandatory fields

```text
utm_source     — where the click came from (platform or list)
utm_medium     — the type of channel
utm_campaign   — the specific initiative
utm_content    — the specific asset/post/variant, for A/B distinguishing
```

## Optional field

```text
utm_id         — campaign_id from campaign-ledger.csv, for joining GA4 data back to the ledger
```

## Format rule

Lowercase kebab-case only: letters, digits, single hyphens. No spaces, no underscores, no uppercase. The generator rejects anything else — see `tests/growth-campaign-url.test.ts` for the enforced cases.

## Approved `utm_source` / `utm_medium` pairs

| Channel | utm_source | utm_medium |
|---|---|---|
| LinkedIn personal profile | `linkedin` | `organic-social` |
| LinkedIn company page | `linkedin-page` | `organic-social` |
| Reddit | `reddit` | `community` |
| Editorial/newsletter referral | the publication's slug, e.g. `hr-newsletter`, `moneycontrol` | `referral` |
| College/placement-cell email | `college-placement` | `email` |
| B2B/HR-tech email | `b2b-outreach` | `email` |
| Embed page attribution link | `embed` | `referral` |
| Media kit / journalist pitch | `media-pitch` | `email` |

## `utm_campaign` values in use this quarter

- `required-ctc-report-2026` — the flagship In-Hand Salary Model 2026 report and everything promoting it
- `graduate-offer-guide-2026` — the college-specific "First Offer Reality Guide" (Phase 8)

Add new campaign slugs here as they're created — don't invent one inline without registering it, or `campaign-ledger.csv` and GA4 will disagree on what a session belongs to.

## Worked examples

```text
utm_source=linkedin
utm_medium=organic-social
utm_campaign=required-ctc-report-2026
utm_content=personal-profile-carousel-01
```

```text
utm_source=reddit
utm_medium=community
utm_campaign=required-ctc-report-2026
utm_content=personalfinanceindia-native-table
```

```text
utm_source=hr-newsletter
utm_medium=referral
utm_campaign=required-ctc-report-2026
utm_content=editorial-chart
```

```text
utm_source=college-placement
utm_medium=email
utm_campaign=graduate-offer-guide-2026
utm_content=placement-cell-outreach-01
```

## How to build a link

```bash
npx tsx scripts/growth/generate-campaign-url.ts \
  --url /reports/india-in-hand-salary-model-2026 \
  --source reddit --medium community \
  --campaign required-ctc-report-2026 \
  --content personalfinanceindia-native-table
```

Prints the final URL. Paste it into the post/email/comment, then log the send in `campaign-ledger.csv` with the same `utm_content` value as the row's identifier. The script writes nothing to disk — logging the ledger row is a manual, reviewed step by design (see Phase 14 decision rules — the ledger is what Friday reviews are based on, so it should reflect what was actually sent, not what a script assumed).

## Known technical gotcha this standard specifically avoids

`https://www.salaryexit.in/ctc-to-in-hand-calculator/?utm_source=redd` (trailing slash before the query string) 308-redirects before landing — confirmed during production verification earlier in this engagement. `buildCampaignUrl()` strips trailing slashes before appending the query string so every generated link lands directly, no extra hop.
