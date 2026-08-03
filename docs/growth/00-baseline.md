# Growth baseline — 2026-08-02

Real baseline pulled live via the connected GA4 and GSC MCP servers on 2026-08-02, immediately before the four-week pilot begins. Every figure below traces to `docs/growth/generated/*.json`, which record the exact retrieval window and MCP tool used. No figure here is estimated, inferred from social impressions, or carried over from the prior `Unknown`-only baseline.

## Traffic (GA4)

Current window: 2026-05-04 to 2026-08-01 (90 days). Previous window: 2026-02-04 to 2026-05-03 (the directly preceding 90 days).

| Metric | Previous 90d | Current 90d | Change |
|---|---|---|---|
| Sessions | 65 | 118 | +81.5% |
| Users | 44 | 65 | +47.7% |
| Engaged sessions | 25 | 91 | +264.0% |
| Engagement rate | 38.5% | 77.1% | +38.7 points |
| Avg. session duration | 187s | 252s | +34.5% |

**Trailing-28-day channel mix** (2026-07-05 to 2026-08-01), sorted by engaged sessions:

| Channel | Sessions | Engaged sessions |
|---|---|---|
| Direct | 35 | 24 |
| Organic Social | 21 | 16 |
| Unassigned | 7 | 6 |
| Organic Search | 4 | 3 |
| Referral | 1 | 1 |
| AI Assistant | 2 | 0 |

**90-day source/medium** (attributable rows only — see note below for excluded rows):

| Source / medium | Sessions | Engaged sessions |
|---|---|---|
| (direct) / (none) | 47 | 34 |
| google / organic | 13 | 9 |
| reddit / comment | 13 | 12 |
| linkedin.com / referral | 7 | 3 |
| linkedin_post_link / (not set) | 7 | 6 |
| chatgpt.com / ai-assistant | 6 | 3 |
| reddit.com / referral | 2 | 2 |
| duckduckgo / organic | 1 | 1 |
| perplexity / (not set) | 1 | 0 |

**Excluded from channel attribution** (not a marketing channel): `vercel.com / referral` (21 sessions) — not attributable to any marketing channel — likely Vercel platform/preview toolbar traffic, not external referral. Excluded from channel-attribution claims.

**Campaign tagging**: every session in the 90-day window resolves to a generic bucket ((direct), (referral), (not set), (organic), (ai-assistant)) — no session carries a real UTM campaign name yet. Confirms the forensics report's pre-existing finding; `utm-standard.md` links published from this point forward are what will populate this dimension going forward.

**Calculator engagement**: `calculator_use` fired 65 times in 90 days. `share_summary` did not fire at all in the same window.

**Top landing pages (90d)**:

| Path | Sessions | Engaged sessions |
|---|---|---|
| `/` | 65 | 56 |
| `/ctc-to-in-hand-calculator` | 22 | 15 |
| `/for-businesses` | 3 | 3 |
| `/salary-guides/pf-withdrawal-rules-explained` | 3 | 1 |
| `/salary-guides/salary-structure-in-india` | 3 | 2 |

Plus 11 sessions (5 engaged) spread across single-session landing pages: 11 additional distinct landing-page paths each recorded exactly 1 session in the 90-day window (5 of the 11 engaged) — includes /lpa/12-lpa-in-hand-salary, /lpa/15-lpa-in-hand-salary, /notice-period-buyout-calculator, /old-vs-new-tax-regime-calculator, /salary-reality-check, and 6 others. Not shown as individual rows since each is a single-session data point.

**Notable absence**: `/reports/india-in-hand-salary-model-2026` — Zero landing-page sessions in the 90-day window. The flagship report (this campaign's core linkable asset) has not yet driven a single recorded GA4 session as a landing page.

## Search (GSC)

Current window: 2026-05-05 to 2026-08-01. Previous window: 2026-02-04 to 2026-05-04.

| Metric | Previous | Current | Change |
|---|---|---|---|
| Clicks | 36 | 50 | +38.9% |
| Impressions | 7274 | 17917 | +146.3% |
| CTR | 0.49% | 0.28% | declined |
| Avg. position | 7.5 | 13.0 | got worse (higher number) |

Impressions roughly doubled while average position moved from 7.5 to 13.0 and CTR fell — consistent with new impression volume coming disproportionately from high-volume, zero-click definitional queries (see Quick wins below) rather than higher-intent queries.

**Quick-win opportunities (GSC-detected)**: 14 opportunities, concentrated on the LPA "meaning" pages. Estimated additional clicks available from the top opportunities: ~127/quarter against a real current quarterly total of 50 clicks sitewide. All 14 detected quick-wins are zero-click, position-4-to-10 rankings for Hindi-transliteration definitional queries ('X lpa ka matlab', 'X lpa kitna hota hai', 'X lpa meaning') on the two highest-impression LPA pages. Title/meta-description rewrites that directly answer 'what does X LPA mean per month' are the single highest-leverage, zero-cost SEO action available.

**Flagship report indexing**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026` — NOT indexed (`URL is unknown to Google`). Unlike the sitemap-level field above, this is a specific, reliable, page-level signal: Google has not indexed or even discovered the flagship report page. Combined with zero GA4 landing-page sessions for the same URL, the flagship report currently has no measurable organic presence at all.

**Backlinks**: GSC MCP does not expose external-link reporting. This does not block the pilot; backlink verification for the tiered prospect list continues to rely on manual, independently-visible confirmation (see `docs/growth/backlink-prospects-tiered.csv`), not this connector.

## Content and indexing

| Metric | Value | Source |
|---|---|---|
| Indexed pages (sitemap rollup) | 47 submitted / 0 per the sitemap "indexed" field | GSC `list_sitemaps` — GSC's list_sitemaps/get_sitemap 'indexed' count is a known-unreliable rollup field that frequently reads 0 regardless of true index status — contradicted here by real search-performance data across dozens of URLs. Not treated as evidence of a real indexing failure by itself. |
| Top landing pages | see table above | GA4 `landingPagePlusQueryString` |
| Top queries | zero branded queries observed; dominated by "X lpa meaning"-style definitional queries | GSC query dimension (658 rows; undercounts true totals — see `gsc-baseline-current.json` note) |
| Branded vs. non-branded search share | 0% branded of 50 total quarterly clicks (0 branded query rows found in 658) | GSC query dimension, manually classified |

## Distribution channels (verified — see `docs/salaryexit-distribution-forensics.md`)

| Metric | Value | Source |
|---|---|---|
| LinkedIn posts published | 3 (personal profile only; company page activity unconfirmed) | `linkedin.xls` |
| LinkedIn 30-day organic impressions (06/22–07/21/2026) | 1,322 | `linkedin.xls` → Metrics |
| LinkedIn 30-day organic clicks | 17 | `linkedin.xls` → Metrics |
| LinkedIn-attributed GA4 sessions (90d, linkedin.com/referral + linkedin_post_link) | 14 sessions / 9 engaged | GA4 sourceMedium, this baseline |
| Reddit-attributed GA4 sessions (90d, reddit/comment + reddit.com/referral) | 15 sessions / 14 engaged | GA4 sourceMedium, this baseline |
| Email — college outreach sent | 68 (of 69 contacts, 1 dedup) | `outreach/sent_log.csv` |
| Email — B2B outreach sent | 5 | `outreach/sent_log_b2b.csv` |

LinkedIn- and Reddit-attributed GA4 sessions above are GA4's own `sessionSourceMedium` classification, not an inference from social-platform impression counts — see `docs/growth/prior-campaign-impact.md` for the full correlation-vs-causation analysis against the known posting dates.

## Authority

| Metric | Value | Source |
|---|---|---|
| Referring domains (independent, editorial) | 0 confirmed | `docs/salaryexit-distribution-forensics.md` §12 |
| Referring domains (social/UGC, nofollow) | 5 (2 Reddit posts still live, 3 LinkedIn posts) | Same |
| GSC external-links report | Not available from this connector | `GSC MCP does not expose external-link reporting.` |
| Third-party Domain Authority / Domain Rating | Unknown | Not verifiably available locally — explicitly a secondary metric per this campaign's strategic principle, not a target |

## Product surface (context, not a target — already built)

CTC-to-in-hand (+ gross-to-in-hand mode), reverse salary, Salary Reality Check, tax-regime comparison, HRA, EPF, notice-period buyout, gratuity, leave encashment, final settlement, offer comparison, city salary scenarios, salary/tax/job-switch guides, named creator + methodology, GA4 + Plausible event wiring, calculation-error reporting, dynamic OG images, publisher embed (`/embed/*`), college resource (First Offer Reality Guide).

## What this baseline does NOT include

No paid traffic, no directory submissions, no press coverage, no podcast/YouTube presence, no Product Hunt launch — confirmed absent from local evidence (see forensics report §8). No LinkedIn follower count (not exposed by any connected source). No independently-confirmed editorial backlinks (GSC does not expose a links report; manual verification only).
