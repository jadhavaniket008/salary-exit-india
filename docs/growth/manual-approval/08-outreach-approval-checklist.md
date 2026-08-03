# Outreach approval checklist — editorial + college, Week 1-2

Source drafts (final, personalized, no placeholders): `docs/growth/manual-approval/READY-OUTREACH-WEEK-1-2.md`. Template structure they were built from: `docs/growth/outreach-templates.md`. Tracking: `docs/growth/outreach-ledger.csv`. Eligibility source of truth: `docs/growth/backlink-prospects-tiered.csv`.

## What changed this pass

The prior 10-email queue included 3 prospects that do not actually meet this pilot's eligibility bar, found by parsing `backlink-prospects-tiered.csv` with a proper quote-aware CSV parser rather than reading it as plain text:

- **BankBazaar (A17)** and **PaisaBazaar (C18)** — both rows are internally corrupted in the source CSV: their "specific existing article" field contains a contact-page URL fragment instead of a real article, and their contact/email fields contain unrelated text fragments. No real article or clean contact route is actually confirmed for either, despite the Tier-1/ready label on the row.
- **IIT (BHU) Varanasi (D02)** — correctly Tier 3, `ready_for_outreach = false`, no confirmed article. Was never eligible.

No unused Tier-1 replacement exists for any of the three (every clean Tier-1 organization in the tiered list is already in this queue) — all three are **dropped, not replaced**. This leaves **6 editorial emails + 1 gated college email = 7 total**, down from 10.

## Before sending any email

- [ ] Read the exact, final draft in `READY-OUTREACH-WEEK-1-2.md` for that prospect — do not send from memory or improvise personalization.
- [ ] Confirm the contact route (contact form vs. exact URL) is still current — this data was compiled in a prior session, not re-verified live this pass. Careers360 (`careers360.com/contact-us`) is the only prospect in this batch with an exact confirmed URL; the other 5 editorial prospects have only a domain + page description, so locate the actual contact form on the site before sending.
- [ ] Confirm the UTM-tagged campaign URL in `week-1-2-execution.csv` resolves.
- [ ] For IIT Madras (the college email): confirm the First Offer Reality Guide PDF attachment is the current, tax-wording-corrected version, **and** that Aniket has given final content/tone sign-off per `09-college-resource-approval.md` — this email stays gated until then, independent of the other 6.
- [ ] Log every send in `outreach-ledger.csv` immediately.

## The 7 eligible prospects

| # | Prospect | Tier | Article/resource confirmed | Contact route | Day |
|---|---|---|---|---|---|
| 1 | HR Katha | 1 | "The year HR stopped pretending" (2025 roundup) | Contact form (domain only) | 8 |
| 2 | India Briefing | 1 | India HR, Payroll, and Wage Compliance Guide 2026 | Contact form (domain only) | 8 |
| 3 | ClearTax | 1 | ITR filing and salary-tax explainers (multiple) | Contact form (domain only) | 9 |
| 4 | Naukri Campus | 1 | "How to negotiate salary for freshers" and related posts | Contact form (domain only) | 9 |
| 5 | Careers360 | 1 | College placement coverage | `careers360.com/contact-us` (exact URL) | 10 |
| 6 | Groww blog | 1 | Groww blog Personal Finance category | Contact form (domain only) | 10 |
| 7 | IIT Madras Placement Office | 1 | Students' Guide & Policies Document (Placements 2023-24) | Official site (domain only) — **GATED** | 11 |

No two rows above share an organization or domain — duplicate groups in `backlink-prospects-tiered.csv` (A19/E14 vs. A04; C09 vs. A18; E12 vs. B14) were checked and excluded from being added as separate sends.

## Realistic expectation, from real data

Neither of the two known prior outreach dates (07-25, 07-27) shows a GA4 signal strong enough to call more than "possible" or "unsupported" (see `03-prior-campaign-impact-summary.md`) — and none of the 68 college emails or 5 B2B emails sent previously had open/click/reply tracking at all. This pilot's UTM-tagged links are the first outreach in this campaign's history that will produce a verifiable click signal, even before any reply arrives.

## Stop condition (per-email)

No reply after the one allowed follow-up (drafted per-prospect in `READY-OUTREACH-WEEK-1-2.md`). Do not send a second follow-up beyond that — this is a documented anti-spam constraint carried from the prior session's design, not new to this pass.
