import type { CalculatorSlug } from "@/lib/routes";

export type ConfidenceLevel = "high" | "medium" | "assumption-heavy";

export type CalculatorTrustProfile = {
  confidence: ConfidenceLevel;
  headline: string;
  /** Shown under “Directly calculated” */
  direct: string[];
  /** Shown under “Estimated / modeled” */
  estimated: string[];
  /** Shown under “Engine assumptions” */
  assumptions: string[];
  /** Shown under “What may change in practice” */
  realWorldFactors: string[];
  caveatsTitle: string;
  caveatsBullets: string[];
};

/**
 * Accuracy / trust copy per calculator — keep aligned with methodology and engine limits.
 */
export const CALCULATOR_TRUST: Record<CalculatorSlug, CalculatorTrustProfile> = {
  salaryRealityCheck: {
    confidence: "assumption-heavy",
    headline:
      "In-hand comes from the centralized CTC engine; monthly spend uses fixed lifestyle heuristics — a directional map, not a personal budget.",
    direct: [
      "Savings = estimated monthly in-hand − sum of modeled expense lines.",
      "Savings ratio = savings ÷ in-hand when in-hand is positive.",
    ],
    estimated: [
      "In-hand from CTC→in-hand (new regime, PF from Basic+DA split, default PT).",
      "Groceries, commute, utilities, discretionary from lifestyle tier tables.",
    ],
    assumptions: [
      "CTC treated as annual gross; single earner; no EMI/insurance/kids modeled.",
      "Rent is the only housing cash outflow you enter.",
    ],
    realWorldFactors: [
      "Actual spend varies by city block, family size, debt, and employer structure.",
      "Variable pay and bonuses not folded into monthly in-hand here.",
    ],
    caveatsTitle: "Why this verdict can change in real life",
    caveatsBullets: [
      "Heuristic expenses are not bank categories — adjust lifestyle tier or rent and re-run.",
      "Use CTC→in-hand calculator for payslip-aligned PF/PT before treating savings as truth.",
    ],
  },
  salary: {
    confidence: "assumption-heavy",
    headline:
      "Full salary breakdown path: tax, cess, PF, PT, and monthly in-hand use the same FY config as other tools — not your employer’s payroll run.",
    direct: [
      "Arithmetic on the numbers you enter (gross, PF, PT, optional HRA/80C figures).",
      "Standard deduction and slab application follow code rules for the selected regime.",
    ],
    estimated: [
      "Annual tax after simplified Section 87A handling; TDS shown as annual tax ÷ 12.",
      "Combined 80C bucket and caps as modeled (not full ITR).",
    ],
    assumptions: [
      "Single salary head; limited old-regime deductions vs a dedicated HRA flow.",
      "No surcharge, marginal relief, or perquisite valuation.",
    ],
    realWorldFactors: [
      "Bonuses, arrears, FBP, and one-off pay.",
      "Actual monthly TDS vs smoothed spread.",
      "State PT slabs and employer PF wage definition.",
    ],
    caveatsTitle: "Why this in-hand number may differ from payroll",
    caveatsBullets: [
      "TDS timing and year-end adjustments.",
      "Proofs and regime choice vs modeled defaults.",
      "HRA entered as a single annual figure — not recomputed from rent here.",
    ],
  },
  ctcToInHand: {
    confidence: "assumption-heavy",
    headline:
      "Streamlined gross → in-hand: one PF input path (payslip PF or Basic+DA-derived), PT you supply, and tax from slabs.",
    direct: [
      "Monthly gross ÷12, PF ÷12, PT ÷12 from your annual inputs.",
      "Tax from annual gross using the selected regime and FY tables in code.",
    ],
    estimated: [
      "Employee PF when derived from Basic+DA under configured ceiling rules.",
      "Total tax and monthly TDS spread (not payslip TDS schedule).",
    ],
    assumptions: [
      "Metro flag does not change this screen’s tax path beyond what you encode in gross.",
      "No separate HRA/80C modeling — use salary breakdown for richer old regime.",
    ],
    realWorldFactors: [
      "CTC vs taxable gross definitions.",
      "VPF, NPS employer, loan recovery, and flex deductions.",
    ],
    caveatsTitle: "Why take-home may not match your offer letter / payslip",
    caveatsBullets: [
      "Variable pay and joining bonuses not in gross.",
      "Employer-specific PF wage and state PT.",
      "High income: surcharge not modeled.",
    ],
  },
  taxRegime: {
    confidence: "medium",
    headline:
      "Side-by-side annual tax + cess for old vs new on the same gross and deduction inputs — a planning slice, not Form 16.",
    direct: [
      "Taxable income computation from gross minus modeled deductions per regime.",
      "Comparison of total tax + cess outputs from the same engine snapshot.",
    ],
    estimated: [
      "Section 87A rebate simplification.",
      "Old-regime 80C/HRA as annual numbers you type — not full schedule.",
    ],
    assumptions: [
      "No surcharge, AMT, or capital gains.",
      "Single salary source; no loss set-off.",
    ],
    realWorldFactors: [
      "Employer-chosen regime and proof submission.",
      "Other income, advance tax, and refunds.",
    ],
    caveatsTitle: "Why this may differ from IT portal / Form 16",
    caveatsBullets: [
      "Actual TDS and proofs change final liability.",
      "Rebate and slab boundaries are modeled, not adjudicated.",
      "Does not recommend which regime to choose.",
    ],
  },
  hra: {
    confidence: "medium",
    headline:
      "The three statutory tests (min of HRA, rent−10%, salary %) are deterministic from your inputs — but payroll/ITR eligibility still depends on regime and proofs.",
    direct: [
      "Minimum of actual HRA, rent − 10% of (Basic+DA), and metro/non-metro % cap.",
    ],
    estimated: [
      "Which amounts count as Basic/DA/HRA for your employer (you must align inputs).",
    ],
    assumptions: [
      "Annual figures; no pro-rata months.",
      "DA included only as you enter it.",
    ],
    realWorldFactors: [
      "Old vs new regime eligibility for exemption in your filing context.",
      "Rent receipts, landlord PAN rules, and payroll HRA component structure.",
    ],
    caveatsTitle: "Why payroll / ITR HRA can still differ",
    caveatsBullets: [
      "Employer may compute exemption with different rounding or partial-year rent.",
      "New regime typically does not use HRA exemption like old — confirm your regime story.",
    ],
  },
  gratuity: {
    confidence: "medium",
    headline:
      "Statutory-style (15/26) formula on last drawn Basic+DA with a rough exempt cap for covered employers — legal/tax finality needs a professional.",
    direct: [
      "Formula output from salary × years × (15/26) under configured day basis.",
    ],
    estimated: [
      "Rough split between exempt (capped) vs taxable gratuity in the model.",
    ],
    assumptions: [
      "Eligibility and coverage checkbox; not every employer rule.",
    ],
    realWorldFactors: [
      "Non-covered schemes, gratuity policy caps, and payment timing.",
      "Actual tax on gratuity depends on exemptions and salary history.",
    ],
    caveatsTitle: "Why gratuity in real life may differ",
    caveatsBullets: [
      "Service years rounding and salary definition per policy.",
      "Statutory vs contractual gratuity schemes.",
    ],
  },
  leaveEncashment: {
    confidence: "medium",
    headline:
      "Gross encashment from per-day rate × days — before tax and employer-specific caps.",
    direct: [
      "(Basic+DA monthly ÷ 26 or 30) × unused days, per your selected basis.",
    ],
    estimated: [
      "Net after tax / 10(10AA) style exemptions — not calculated here.",
    ],
    assumptions: [
      "Single Basic+DA definition; no special employer rounding tables.",
    ],
    realWorldFactors: [
      "Company policy on encashable balance, notice offset, and minimum leave.",
      "Tax treatment varies by case — use a CA for net pay.",
    ],
    caveatsTitle: "Why payout may differ",
    caveatsBullets: [
      "Employers may use working days or different denominators.",
      "Some components may be excluded from encashment base.",
    ],
  },
  noticeBuyout: {
    confidence: "high",
    headline:
      "Prorated gross for notice days using calendar days in the month you pick — common contract math, not every contract.",
    direct: [
      "(Monthly gross ÷ days in month) × notice days.",
    ],
    estimated: [
      "Whether your contract uses calendar days, working days, or fixed 30-day months.",
    ],
    assumptions: [
      "Gross monthly as you enter it; no separate bonus split.",
    ],
    realWorldFactors: [
      "Waivers, garden leave, and recoveries.",
      "Statutory vs notice shortfall definitions.",
    ],
    caveatsTitle: "Why buyout cheques differ",
    caveatsBullets: [
      "HR may apply different month length or rounding.",
      "Tax and PF on notice pay are not modeled here.",
    ],
  },
  finalSettlement: {
    confidence: "high",
    headline:
      "Pure summation: credits minus deductions from the lines you list — completeness is on you.",
    direct: [
      "Sum of credit amounts minus sum of deduction amounts.",
    ],
    estimated: [
      "Nothing inferred — gratuity, leave, statutory dues must be added as lines if applicable.",
    ],
    assumptions: [
      "All figures are gross as entered; no tax withholding line unless you add it.",
    ],
    realWorldFactors: [
      "Recoveries, advances, and pending approvals.",
      "Employer-specific settlement schedules and holds.",
    ],
    caveatsTitle: "Gaps to watch",
    caveatsBullets: [
      "Missing a line means missing money — this tool never guesses components.",
      "Net tax after FnF is outside this screen.",
    ],
  },
  offerComparison: {
    confidence: "medium",
    headline:
      "Ranking and sorting are exact from the numbers you enter — credibility depends on how consistently you estimated each offer’s in-hand using the same methodology.",
    direct: [
      "Sorting and ranking from the numbers you enter.",
    ],
    estimated: [
      "In-hand and tax are not recomputed from CTC here — they must come from other tools or payslips.",
    ],
    assumptions: [
      "Comparable definitions of CTC and monthly in-hand across rows.",
    ],
    realWorldFactors: [
      "Equity, benefits, notice, and role risk — not in the table.",
      "Different tax regimes or cities between offers.",
    ],
    caveatsTitle: "Making comparisons fair",
    caveatsBullets: [
      "Use the same CTC→in-hand methodology for every offer.",
      "A higher CTC with worse variable structure can still lose on cash flow.",
    ],
  },
  salaryHike: {
    confidence: "high",
    headline:
      "Percentage and absolute change between two annual figures — pure arithmetic.",
    direct: [
      "New − old, and (new − old) ÷ old when old is greater than zero.",
    ],
    estimated: [
      "None — but interpretation of “CTC” vs “fixed” is on you.",
    ],
    assumptions: [
      "Both numbers use the same definition (gross vs net vs CTC).",
    ],
    realWorldFactors: [
      "In-hand impact depends on tax, PF, and structure — use CTC or salary calculators.",
    ],
    caveatsTitle: "When % hike misleads",
    caveatsBullets: [
      "Mixing old gross with new CTC (or vice versa) skews the %.",
      "A big % on a small base still may not move take-home much.",
    ],
  },
  epf: {
    confidence: "medium",
    headline:
      "Employee and employer EPF on PF wage using configured rates and optional ceiling — EPS split and admin charges omitted.",
    direct: [
      "Contribution rates applied to monthly PF wage after ceiling logic when enabled.",
    ],
    estimated: [
      "Employer EPF component as modeled — real employer accounting splits EPS/EDLI.",
    ],
    assumptions: [
      "Single PF wage; no excluded allowances unless you net them out manually.",
    ],
    realWorldFactors: [
      "Actual PF wage vs Basic+DA; international worker rules.",
      "Contribution timing and arrears.",
    ],
    caveatsTitle: "Why payslip EPF may differ",
    caveatsBullets: [
      "Ceiling and wage definitions vary by employer.",
      "Employer total cost includes more than EPF shown here.",
    ],
  },
};

export function getCalculatorTrust(slug: CalculatorSlug): CalculatorTrustProfile {
  return CALCULATOR_TRUST[slug];
}
