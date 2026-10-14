# PF ceiling release — reviewed 14 October 2026

Scope: resolve the PF release blocker on `growth/financial-trust-and-revenue`, starting
at `b1f2aa98d1376c514df76591c29a1a3c9ae0f18f`. No deployment, merge, new page,
product, revenue programme, or analytics changes.

## Official implementation evidence

- [PIB 2311968, 18 September](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2311968): ₹25,000 ceiling effective 17 September 2026.
- [PIB 2314111, 23 September](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2314111): existing capped members use actual wages or ₹25,000, whichever is lower; EPS treatment remains membership-dependent.
- [EPFO employer portal](https://unifiedportal-emp.epfindia.gov.in/epfo/): official “FAQs related to recent revision of EPFO wage ceiling” PDF, downloaded from its public `getRevisionAlertPdf` link on 14 October. Q7–9 specify September 1–16 old, September 17–30 new, in one ECR. Its link requires session state, so the stable portal is cited. The review bundle contains the retrieved PDF and SHA-256.

## Exact model contract

Assume a covered member, constant PF wages, 12% contribution, no unpaid leave.
PF wages are modeled as supplied Basic+DA; the tool does not determine statutory
wage composition, membership eligibility, EPS allocation or payroll rounding.

| Basis | Before | After |
|---|---|---|
| Current monthly capped | 12% × min(wages, ₹15,000) | 12% × min(wages, ₹25,000), effective 17 Sep |
| Current monthly full-Basic | 12% × actual PF wages | Unchanged |
| Annualized current contribution | Current monthly ×12 | Same definition; maximum now ₹36,000 |
| Full FY 2026–27, existing member | No explicit transition model | Five old months + September (16/30 old + 14/30 new) + six new months |
| New member covered from 17 Sep | Not modeled explicitly | Explicit helper option: no earlier contribution; September 14/30 new + six new months |

For wages ≥₹25,000: capped September ₹2,360; FY total ₹29,360; FY monthly
average ₹2,446.6667. This is not ₹36,000 and does not retroactively replace old
monthly payroll. For wages ₹20,000: September ₹2,080 and FY ₹25,480 for an
existing capped member; newly covered September ₹1,120 and FY ₹15,520.
Existing full-Basic PF at ₹60,000 wages stays ₹7,200/month and ₹86,400/year.
No intermediate rounding is applied; exports round only displayed rupees.

`computeEmployeePfAnnual` retains its annualized-current contract. The separate
`computeEmployeePfFy2026Annual` helper returns period totals. CTC inputs can
explicitly select `pfProjectionBasis: "fy-2026-27"` to obtain an FY monthly
average. Actual annual PF overrides continue to take precedence. Report JSON
labels its annualized fields and adds separate FY PF and FY average-net fields;
the report is new-regime salary only, so the PF change does not alter its tax.

The 8/13/18% employer-cost scenarios remain explicit fixed assumptions. They do
not imply that every employer absorbs higher PF without altering gross salary.

## July history and dependent artifacts

The original July CSV/JSON is copied byte-for-byte to dated `2026-07-31` files;
all original chart PNG/CSV files are copied to `growth-assets/archive-2026-07-31`.
The live report keeps its 31 July publication date and uses 14 October modification
and generation dates. Current report/embed/image values use the revised engine.
Historical outreach drafts retain their numbers with an explicit historical notice.
They should not be reused as current guidance.

Regenerated: 72 report rows (36 capped, 36 full-Basic), 36 PF comparisons,
five reverse-salary targets, the CSV/JSON, five chart CSVs and ten chart PNGs.
Full-Basic rows and report income taxes are unchanged; capped reductions in
monthly net depend on the actual wage (up to ₹1,200). At 13% employer costs:
₹20L CTC capped/full-Basic gap is now ₹4,830/month (was ₹6,030).
Homepage ₹15L gross net: ₹114,875 → ₹113,675 with PT ₹200/month.
₹12L gross net: ₹97,991.67 → ₹96,791.67; ₹35L: ₹237,008.33 → ₹235,808.33
with PT ₹2,500/year. Homepage ₹12L uses PT ₹2,400/year: ₹98,000 → ₹96,800.

## Validation and boundaries

Financial boundary tests reproduce official September examples and distinguish
full-year totals from annualized monthly estimates. Regression tests reconcile
all 72 current rows against historical PF/tax/net and check exported data.
Validation logs and a complete change manifest are included in the review bundle.

Remaining limitations: estimates do not infer membership, wage-definition compliance,
variable wages, partial service, unpaid leave, EPS eligibility or arrears recovery.
A user-supplied actual annual PF amount remains preferable for filing-year tax.
Historical external shares cannot be retroactively updated. No deployment or merge
has occurred. Any unchanged repository-wide lint findings are reported separately;
changed files must pass lint.


Validation completed for this continuation: 201 tests in 33 suites passed; TypeScript
no-emit check and production build passed. Site integrity: 109 pages, 13 calculators,
37 salary-enough pages. Changed-file lint: 31 TS/TSX files, zero errors/warnings.
Repository-wide lint retains 167 errors and two warnings, all in unchanged files
(prior checkpoint: 176 errors, two warnings). Seventeen July data/image archives
match the starting commit byte-for-byte. Generated chart readability was checked;
horizontal chart spacing was corrected to prevent overlapping labels in existing assets.
No browser interaction test was run; rendered production HTML is checked separately.
