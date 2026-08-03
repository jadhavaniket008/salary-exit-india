# Ready-to-send — outreach, Week 1-2

7 personalized drafts (6 editorial + 1 gated college). Every prospect below is Tier 1, `ready_for_outreach = true`, has a confirmed live article/resource, and a confirmed contact route in `docs/growth/backlink-prospects-tiered.csv` — verified by parsing that file with a quote-aware CSV parser (not just reading it visually, which is what surfaced the two corrupted rows this package excludes — see `05-week-1-2-execution-queue.md`). No `{{...}}` placeholders remain. No name, email, or job title is invented anywhere below — where the source data has no verified named contact, this is stated explicitly rather than filled in.

Template source: `docs/growth/outreach-templates.md` (Email 1 structure, approved CTA list, banned-phrase list — all followed below).

---

## 1. HR Katha — Tier 1 — Day 8

**Article/resource**: "The year HR stopped pretending" (2025 roundup, per `backlink-prospects-tiered.csv` A02)
**Contact route**: hrkatha.com contact/about page — general organizational contact form. **No named individual or verified email exists in the source data** — send via the site's contact form, not a personal email.
**Content gap**: HR Katha's coverage of payroll and compensation trends does not currently include a modeled, engine-derived data cut like SalaryExit's.
**Asset offered**: free embed of the in-hand salary table.

**Subject**: A free embeddable in-hand salary table for your comp coverage

**Body**:
```text
Hi the HR Katha team,

I read your 2025 roundup, "The year HR stopped pretending." The theme of employers being more upfront about real numbers lines up with something we've been modeling directly: how much take-home actually varies at the same CTC depending on employer-cost structure.

I run SalaryExit India, a free salary/tax calculator site. We modeled how employer-cost structure changes take-home at the same CTC using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful for your comp/benefits coverage. No cost, no exclusivity, just attribution if you use it.

You may embed the table without charge if that's easier than a static chart.

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-hr-01`
**Attachment/asset**: none attached — CSV/embed offered by link only, per template.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the HR Katha team,

Following up with something new rather than a nudge — a second cut of the same model showing how the PF wage-ceiling choice alone shifts monthly in-hand by a few thousand rupees at identical CTC, which might fit a payroll-policy angle better than the original chart.

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-hr-01-followup

Best,
Aniket
```
**Logging**: on send, set `outreach-ledger.csv` row A02: `contact_date` = actual send date, `sent` = true. On reply, update `replied`/`positive`/`declined` the same day.

---

## 2. India Briefing (Dezan Shira & Associates) — Tier 1 — Day 8

**Article/resource**: "India HR, Payroll, and Wage Compliance Guide 2026" (confirmed live, per A04)
**Contact route**: india-briefing.com contact page — general organizational contact form. **No named individual or verified email exists in the source data.**
**Content gap**: the guide covers payroll and wage compliance generally but does not show the employee-side in-hand impact of those obligations.
**Asset offered**: custom data cut for their existing guide.

**Subject**: A chart for your 2026 payroll guide, if useful

**Body**:
```text
Hi the India Briefing team,

I read your India HR, Payroll, and Wage Compliance Guide 2026. I noticed it explains TDS obligations clearly but doesn't show the employee-side in-hand impact — the number an employee actually takes home after those exact obligations are applied.

I run SalaryExit India, a free salary/tax calculator site. We modeled that exact employee-side impact using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful for the guide.

Would this chart be useful in your existing guide?

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-hr-02`
**Attachment/asset**: none attached — CSV offered by link only.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the India Briefing team,

Following up with something new — a variant of the same chart broken out by the ₹15,000/month statutory PF wage ceiling, since your guide already covers that ceiling from the compliance side.

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-hr-02-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row A04, same-day logging as above. Note: A19/E14 in `backlink-prospects-tiered.csv` are the same organization — do not send a second, separate email to India Briefing this window.

---

## 3. ClearTax — Tier 1 — Day 9

**Article/resource**: ITR filing and salary-tax explainers (multiple articles, per A18)
**Contact route**: cleartax.in contact/help page — general organizational contact form. **No named individual or verified email exists in the source data.**
**Content gap**: ClearTax's salary/tax-filing content does not currently include a modeled, engine-derived data cut like SalaryExit's.
**Asset offered**: citation-ready chart + custom data cut.

**Subject**: Data question re: your salary-tax explainers

**Body**:
```text
Hi the ClearTax team,

I read through your ITR filing and salary-tax explainers. They're strong on the filing mechanics, but I didn't see a modeled comparison of how take-home actually differs across employer-cost structures at the same CTC — which is a common follow-up question for readers deciding between two offers.

I run SalaryExit India, a free salary/tax calculator site. We modeled that comparison using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful alongside your explainers. No cost, no exclusivity, just attribution if you use it.

Would you like the source CSV and methodology to review first?

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-finance-02`
**Attachment/asset**: none attached — CSV/methodology offered by link only.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the ClearTax team,

Following up with something new — a specific cut showing the Section 87A marginal-relief transition band (₹12,00,000 to ₹12,70,587 taxable income under the new regime), which might fit your tax-regime content more directly than the general chart.

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-finance-02-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row A18. Note: C09 in `backlink-prospects-tiered.csv` is the same organization (ClearTax blog) — do not also contact C09, per that row's own note.

---

## 4. Naukri Campus — Tier 1 — Day 9

**Article/resource**: "How to negotiate salary for freshers" and related career-guidance posts (per A20)
**Contact route**: naukri.com contact/about page — general organizational contact form. **No named individual or verified email exists in the source data.**
**Content gap**: Naukri Campus's salary-negotiation and offer-evaluation content does not currently include a modeled, engine-derived data cut like SalaryExit's.
**Asset offered**: free embed or citation-ready chart.

**Subject**: A chart for your salary-negotiation content, if useful

**Body**:
```text
Hi the Naukri Campus team,

I read "How to negotiate salary for freshers" and your related career-guidance posts. They cover the negotiation conversation well, but I didn't see a modeled breakdown of what a given CTC actually becomes in-hand — which is usually the exact number a fresher is trying to negotiate toward.

I run SalaryExit India, a free salary/tax calculator site. We modeled that breakdown across CTC bands using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful for your career-guidance vertical. No cost, no exclusivity, just attribution if you use it.

You may embed the table without charge if that's easier than a static chart.

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-career-01`
**Attachment/asset**: none attached — embed/CSV offered by link only.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the Naukri Campus team,

Following up with something new — the required-CTC-for-target-in-hand version of the same model, which is closer to how a fresher usually frames the negotiation ("I need X take-home").

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-career-01-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row A20.

---

## 5. Careers360 — Tier 1 — Day 10

**Article/resource**: college placement coverage (per B14 — a general coverage area, not one specific named article; recorded as such in the source data, not overstated here)
**Contact route**: `careers360.com/contact-us` — the one prospect in this batch with an exact contact-form URL rather than just a domain description. **No named individual or verified email exists in the source data.**
**Content gap**: Careers360's college-placement coverage does not currently include a modeled, engine-derived data cut like SalaryExit's, and doesn't address what a placement offer's CTC actually becomes in-hand.
**Asset offered**: First Offer Reality Guide + citation.

**Subject**: A resource for your placement coverage, if useful

**Body**:
```text
Hi the Careers360 team,

I've followed your college placement coverage. One gap I noticed across placement-season content generally is that it reports CTC figures without much on what those figures actually become in-hand for a first-time earner — Basic+DA splits, PF treatment, and tax regime all change that number more than students usually expect.

I run SalaryExit India, a free salary/tax calculator site. We built a First Offer Reality Guide specifically for this — a plain-language walkthrough of CTC vs. gross vs. in-hand, aimed at graduates, with worked examples from our FY 2026-27 tax engine. Happy to share it if it's useful for your placement-season readers. No cost, no exclusivity, just attribution if you use it.

Would this resource be useful alongside your placement coverage?

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-career-02`
**Attachment/asset**: First Offer Reality Guide PDF may be offered — same asset gated in item 7 below; only send once `09-college-resource-approval.md`'s final sign-off is given.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the Careers360 team,

Following up with something new — the specific monthly in-hand table across ₹5L-₹50L CTC bands, in case the full guide is more than your placement coverage needs and a single chart fits better.

No worries if the timing isn't right — happy to leave the guide/CSV link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-career-02-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row B14. Note: E12 in `backlink-prospects-tiered.csv` is the same organization (Careers360 editorial desk) — do not also contact E12.

---

## 6. Groww blog — Tier 1 — Day 10

**Article/resource**: Groww blog Personal Finance category (confirmed live via search, per C10)
**Contact route**: groww.in contact/help page — general organizational contact form. **No named individual or verified email exists in the source data.**
**Content gap**: Groww's personal-finance and salary-linked investment-planning content does not currently include a modeled, engine-derived data cut like SalaryExit's.
**Asset offered**: citation-ready chart.

**Subject**: A chart for your Personal Finance category, if useful

**Body**:
```text
Hi the Groww team,

I read through your Personal Finance blog category. It covers investment planning well, but I didn't see a modeled view of how much of a salary is actually available to invest after tax, PF, and employer-cost structure are accounted for — the number that determines what someone can realistically invest each month.

I run SalaryExit India, a free salary/tax calculator site. We modeled that available-to-invest figure across CTC bands using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful for your Personal Finance readers. No cost, no exclusivity, just attribution if you use it.

Would this chart be useful in your existing category content?

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-finance-03`
**Attachment/asset**: none attached — CSV offered by link only.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the Groww team,

Following up with something new — a version of the same chart split by old vs. new tax regime, since the "available to invest" number differs meaningfully between the two.

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=hr-newsletter&utm_medium=referral&utm_campaign=required-ctc-report-2026&utm_content=editorial-batch1-finance-03-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row C10.

---

## 7. IIT Madras — Placement & Internship Office — Tier 1 — Day 11 — GATED

**GATE: do not send until Aniket has given final content/tone approval on `docs/growth/college-resource/first-offer-reality-guide.pdf`** (technical/factual certification already done — see `09-college-resource-approval.md`; final sign-off is separate and still outstanding).

**Article/resource**: "Students' Guide & Policies Document — Placements 2023-24" (confirmed live via search, per D01)
**Contact route**: placement.iitm.ac.in — the placement office's official site. Only a domain is confirmed, not an exact contact-form URL — **locate the enquiry/contact link on that site before sending; do not guess a specific email address.** **No named individual exists in the source data** despite that row's contact-verification field saying "named real individual" — no actual name is present anywhere in the CSV, so this draft addresses the office generally, not a person.
**Content gap**: the existing placement guide covers process and policy but does not include a modeled walkthrough of what a placement offer's CTC actually becomes in-hand for a first-time earner.
**Asset offered**: First Offer Reality Guide (PDF) — a supplementary financial-literacy resource for exactly this gap.

**Subject**: A financial-literacy resource to complement your Placements Guide

**Body**:
```text
Hi the IIT Madras Placement & Internship Office team,

I read your Students' Guide & Policies Document for Placements. It's thorough on process and policy, but like most placement guides, it doesn't walk students through what a placement offer's CTC actually becomes in-hand — Basic+DA splits, PF treatment, tax regime, and variable pay all change that number more than students usually expect before their first payslip.

I run SalaryExit India, a free salary/tax calculator site (no signup, no login, no payment). I've put together a First Offer Reality Guide specifically for graduating students — a plain-language PDF walkthrough of CTC vs. gross vs. in-hand, with worked examples from our FY 2026-27 tax engine, and a clear disclosure that I'm not a CA, tax lawyer, or payroll professional. Happy to share it as a supplementary resource for your placement communications, at no cost and with no exclusivity.

Would this guide be useful to share alongside your existing placement materials?

Best,
Aniket
SalaryExit India
```

**Campaign URL**: `https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=college-placement&utm_medium=email&utm_campaign=graduate-offer-guide-2026&utm_content=editorial-batch1-college-01`
**Attachment/asset**: `docs/growth/college-resource/first-offer-reality-guide.pdf` (attach directly — do not link only, since the office may not click through) — attach only after the gate above is cleared.
**Follow-up rule**: only if no reply after 5-7 business days, only once.
**Follow-up draft**:
```text
Hi the IIT Madras Placement & Internship Office team,

Following up briefly — happy to also share the underlying data (a monthly in-hand table across CTC bands, downloadable CSV) if that's a better fit for a placement newsletter than the full guide.

No worries if the timing isn't right — the guide link stays open either way: https://www.salaryexit.in/reports/india-in-hand-salary-model-2026?utm_source=college-placement&utm_medium=email&utm_campaign=graduate-offer-guide-2026&utm_content=editorial-batch1-college-01-followup

Best,
Aniket
```
**Logging**: `outreach-ledger.csv` row D01. Log the gate-clearance date separately from the send date, since this item cannot go out on the same schedule as the ungated items above.
