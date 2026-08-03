# Week 1-2 execution queue — approval summary

Full queue: `docs/growth/week-1-2-execution.csv` (16 rows). Dates are relative to the actual deployment date (Day 1 = the day Aniket starts posting) — see "Dates" below.

| Category | Count | Status |
|---|---|---|
| LinkedIn personal-profile posts | 6 (Week 1: 3, Week 2: 3) | Drafted, link-consistent, pending manual approval — see `06-linkedin-approval-checklist.md` and `READY-LINKEDIN-WEEK-1-2.md` |
| LinkedIn company-page post | 1 (Day 4) | Drafted, pending manual approval |
| Reddit post | 1 | **BLOCKED** — see `07-reddit-approval-checklist.md`. Not part of the active queue. |
| Editorial outreach emails | 6 | Personalized, eligible, pending manual approval — see `08-outreach-approval-checklist.md` and `READY-OUTREACH-WEEK-1-2.md` |
| College placement-office outreach | 1 (IIT Madras, Day 11) | Personalized, gated on PDF approval — see `09-college-resource-approval.md` |

**Total: 14 active items** (7 LinkedIn + 7 outreach), down from the prior 18-item draft. 4 items were removed, not replaced — see "What was dropped" below.

## What was dropped and why

| Item | Reason |
|---|---|
| BankBazaar outreach (A17) | `backlink-prospects-tiered.csv`'s row for A17 is internally corrupted — its "specific existing article" field actually contains a contact-page URL fragment, and its contact-route/email fields contain unrelated text fragments (a CSV data-integrity defect, confirmed by parsing the raw file with a quote-aware CSV parser). No real article or clean contact route is actually confirmed for this prospect despite its Tier-1/ready label. No unused, verified Tier-1 replacement exists (every clean Tier-1 organization in the tiered list is already in this queue) — dropped, not replaced. |
| PaisaBazaar outreach (C18) | Same defect pattern as A17 — its article field is a contact-page description, not a real article. Dropped, not replaced, for the same reason. |
| IIT (BHU) Varanasi outreach (D02) | Correctly Tier 3, `ready_for_outreach = false — research backlog`, no confirmed article. Never eligible for this window. No Tier-1 college replacement exists besides IIT Madras (D01), which is already queued. Dropped, not replaced. |
| Reddit post | Still blocked on manual subreddit-rule verification — unchanged from the prior pass. |

**Six strong outreach prospects plus one gated college prospect is the honest number this window supports** — padding back to ten by reusing the corrupted or ineligible rows would mean sending to a target with no confirmed article and no verified contact route, which is exactly the low-effort pattern `outreach-templates.md` already warns against.

## Approval mechanics

Unchanged from the prior pass: every row's `approval_status` starts at `pending manual approval` (or `BLOCKED`/`GATED` where applicable). Nothing auto-publishes. No code in this repository posts to LinkedIn, Reddit, or sends email.

## Dates

All dates are now relative (`Day 1` through `Day 12`), not fixed calendar dates — the real deployment date sets Day 1. Day 1 = the day the first LinkedIn post goes out; Day 8-12 fall in the second calendar week of the pilot. College outreach (Day 11) is deliberately in week 2, after the PDF gate.
