# Link-earning offers

Five concrete things to offer instead of "can you please backlink to my website?" Every row in `backlink-prospects.csv` references one of these by name.

## Offer 1 — Citation-ready chart

One chart + its underlying CSV row-set, sized to slot into an existing article the prospect has already published (found via `recent_relevant_article` in the prospects CSV). Delivered as: a link to the specific chart/table on the flagship report, plus the raw numbers inline in the email so they don't have to click through to evaluate it.

**Best for:** personal-finance blogs, tax publishers, HR publications with an existing relevant article (category A, C rows).

## Offer 2 — Custom data cut

A model run the publisher can't get from the default report — a different CTC band, a different employer-cost assumption, a two-city comparison, or (per the prospects CSV) an audience-specific cut like "below ₹5L CTC" for frontline-hiring platforms or "management-track ₹15-50L" for B-school placement offices. This is the highest-effort, highest-conversion offer — reserve it for prospects with a clearly stated, specific need.

**Best for:** any prospect whose existing audience doesn't match the report's default ₹5L-₹50L range (Apna, WorkIndia, IIM/XLRI/ISB placement offices).

## Offer 3 — Free embed

The `/embed/in-hand-salary-table` page (see final report §3 for its known limitation — it still renders inside the site's normal header/footer rather than being fully chrome-free). No charge, no exclusivity, attribution link back to the methodology page, no requirement that the publisher use a followed link.

**Best for:** placement-cell resource pages, HRMS product blogs, job-board career-advice sections that want a live, always-current table rather than a static chart.

## Offer 4 — Expert technical explanation

Aniket explaining, in his own words, one of:
- how salary calculators model CTC decomposition
- why two calculators can disagree on the same input (different PF-ceiling or Basic+DA assumptions)
- how employer-side costs change gross salary
- how SalaryExit validates its engine against Finance Act publications

**Explicitly not:** Aniket is not a CA, not a lawyer, and outreach must never imply otherwise. This offer is a builder's technical explanation of a calculation engine, not professional tax/legal advice.

**Best for:** peer personal-finance writers who publish their own calculators or tools (Freefincal/M. Pattabiraman is the clearest fit — see prospect row E15) — a methodology conversation, not a one-way ask.

## Offer 5 — Co-created resource

For a small number of selected recruiters, HR professionals, CAs, or payroll specialists: a genuinely co-reviewed resource (e.g., a joint "how to read your offer letter" guide) with visible, real attribution to both parties — not a ghost-written piece with SalaryExit's name quietly inserted.

**Best for:** relationships that have already had at least one positive reply — this is a second-stage offer, not a cold-outreach opener. Track candidates for this in `outreach-ledger.csv` under `response = positive` before proposing it.

## What none of these offers do

None of them ask for an exact-match anchor text, none promise reciprocal linking, none are contingent on the publisher using a `dofollow` link — `utm-standard.md` and the outreach templates in `outreach-templates.md` are built so a `nofollow` citation is still counted as a success (traffic + brand mention), not treated as a failed outreach.
