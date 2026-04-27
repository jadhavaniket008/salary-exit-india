/**
 * Long-tail "₹X LPA in-hand" landing pages — single source of truth.
 * Add rows here to scale to 50+ pages without duplicating route files.
 */

import type { CtcToInHandInput } from "@/types/salary";
import type { SeoPageMetadata } from "@/types/seo";

export type LpaLandingPageConfig = {
  /** Path segment for /lpa/[slug] (canonical), e.g. 8-lpa-in-hand-salary */
  slug: string;
  /** Human label, e.g. 8 */
  lpa: number;
  seo: SeoPageMetadata;
  /** Scenario passed to computeCtcToInHand — all amounts INR */
  scenario: CtcToInHandInput;
  /** Extra bullets shown alongside engine assumptions */
  scenarioNotes: string[];
  /** Unique body copy to reduce thin/duplicate LPA pages */
  angleParagraph: string;
  /** Band-specific bullets: pay patterns, regime, metro context — avoid repeating across LPA pages */
  bandInsights: string[];
  /** Optional human interpretation — not a repeat of the breakdown table */
  realityCheckParagraphs?: string[];
};

const PT_ANNUAL = 2_500;

/**
 * Default scenario for LPA band pages:
 * - Gross = LPA × 1,00,000
 * - New regime (common comparison baseline)
 * - Basic+DA assumed at 45% of gross for PF derivation (explicitly disclosed in UI)
 */
function baseScenario(lpa: number): CtcToInHandInput {
  const annualGrossSalary = lpa * 100_000;
  return {
    annualGrossSalary,
    regime: "new",
    metroCity: false,
    professionalTaxAnnual: PT_ANNUAL,
    basicAndDaAnnual: Math.round(annualGrossSalary * 0.45),
  };
}

export const LPA_LANDING_PAGES: readonly LpaLandingPageConfig[] = [
  {
    slug: "8-lpa-in-hand-salary",
    lpa: 8,
    seo: {
      title: "8 LPA In-Hand Salary: ₹64,600/month (FY 2025-26)",
      description:
        "₹64,600/month in-hand on ₹8 LPA gross — zero income tax (Section 87A rebate, FY 2025-26). Employee PF included. Adjust Basic+DA and state PT in the CTC calculator.",
      keywords: [
        "8 LPA in hand",
        "800000 salary in hand",
        "CTC 8 LPA take home India",
        "8 lakh salary monthly net",
      ],
    },
    scenario: baseScenario(8),
    scenarioNotes: [
      "₹8 LPA is interpreted as ₹8,00,000 gross per year for this illustration.",
    ],
    angleParagraph:
      "At the ₹8 LPA band, PF and professional tax still move the needle on take-home. This page fixes a single transparent scenario so you can sanity-check recruiter numbers before you plug your own Basic+DA and state PT into the calculator.",
    bandInsights: [
      "Entry-level offers often quote CTC; confirm how much is fixed monthly vs variable — this page uses gross as one annual number.",
      "Metro living costs can exceed non-metro on the same gross — the engine does not model rent; compare discretionary cash separately.",
      "If you have large Section 80C + HRA in the old regime, the new-regime illustration here may understate your deduction story — use the regime comparison tool.",
      "Professional tax varies by state; ₹2,500/year here is a placeholder until you plug your state’s typical annual PT.",
    ],
    realityCheckParagraphs: [
      "Eight LPA is a realistic first-job or early-career number in many Indian cities and sectors. After PF and a state PT placeholder, the in-hand estimate above is what typically hits your bank account before any rent, food, transport, or other fixed expenses. The gap between this and what your recruiter quoted as CTC is not hidden fees — it is statutory and policy-driven deductions.",
      "At this income band, PF deductions (roughly ₹3,600–4,000/month depending on your Basic+DA) are proportionally significant. Choosing to contribute more via VPF reduces in-hand further but builds a tax-efficient retirement corpus. If your employer has no PF (exempted establishment or contractual role), your in-hand will be higher but you will need to manage retirement savings separately.",
      "Income tax at ₹8 LPA gross under the new regime is effectively zero after the Section 87A rebate (FY 2025-26) — so TDS should be minimal or nil if your employer has set it up correctly. If you are seeing unexpected TDS at this level, check whether your employer has your regime declaration on file.",
    ],
  },
  {
    slug: "10-lpa-in-hand-salary",
    lpa: 10,
    seo: {
      title: "10 LPA In-Hand Salary: ₹81,300/month (FY 2025-26)",
      description:
        "₹81,300/month in-hand on ₹10 LPA gross — zero income tax (Section 87A rebate, FY 2025-26). Tune Basic+DA and state PT for your exact take-home.",
      keywords: ["10 LPA in hand", "10 lakh salary take home", "CTC 10 LPA India", "10 LPA monthly net"],
    },
    scenario: baseScenario(10),
    scenarioNotes: ["₹10 LPA is interpreted as ₹10,00,000 gross per year."],
    angleParagraph:
      "Ten LPA is a common early-career anchor in metro hiring. Use this page to see how much of gross typically remains after statutory-style PF and a flat annual PT placeholder — then replace PT with your state for a tighter number.",
    bandInsights: [
      "At ~₹10L gross, employee PF (as modeled from Basic+DA) and PT still change monthly cash meaningfully — don’t ignore them in offer chats.",
      "Internships and training stipends are taxed differently — this page assumes regular salary-style gross.",
      "Switching from a smaller city to a metro on similar gross: negotiate rent support or structure, not just headline LPA.",
      "If your employer caps PF wage below Basic+DA, rerun numbers in the CTC→in-hand calculator with payslip PF.",
    ],
    realityCheckParagraphs: [
      "Ten LPA is the most commonly searched salary band in India — it represents a first significant job milestone for many and a comparison anchor for early-career switches. The illustrated in-hand above assumes a clean new-regime setup with no itemized deductions. Under the Section 87A rebate structure for FY 2025-26, income tax at this gross is nil, so the deductions you see are PF and professional tax only.",
      "If your actual Basic+DA is higher than 45% of gross (the assumed split here), your PF deduction will be higher and your in-hand slightly lower. If your employer uses a PF wage cap, the deduction will be lower. Use the CTC-to-in-hand calculator and enter your payslip’s Basic+DA for a number that matches your specific situation rather than this band illustration.",
      "The question people at ₹10 LPA most often ask is not about tax — it is about rent. This page shows gross-to-in-hand mechanics only. For a realistic monthly budget picture (rent, commute, lifestyle spend, and what is left), use the Salary Reality Check with your actual city and rent figure.",
    ],
  },
  {
    slug: "12-lpa-in-hand-salary",
    lpa: 12,
    seo: {
      title: "12 LPA In-Hand: ₹98,000/month, Zero Tax (FY 2025-26)",
      description:
        "₹98,000/month in-hand on ₹12 LPA gross — zero income tax under Section 87A (FY 2025-26). Compare old vs new regime if you claim HRA or 80C deductions.",
      keywords: ["12 LPA in hand", "12 lakh CTC take home", "12 LPA monthly salary hand"],
    },
    scenario: baseScenario(12),
    scenarioNotes: ["₹12 LPA is interpreted as ₹12,00,000 gross per year."],
    angleParagraph:
      "Twelve LPA is often discussed as gross CTC — here we treat it as taxable gross for a like-for-like in-hand story. If your offer packs large variable pay, interpret “LPA” consistently before comparing employers.",
    bandInsights: [
      "Twelve lakh gross is a frequent benchmark for first switches — compare offers on the same definition of fixed vs variable.",
      "New regime is shown for a clean baseline; if you claim HRA + 80C, old regime may win — model both explicitly.",
      "Employer contribution to PF beyond employee 12% does not increase your in-hand here; keep CTC components separate when negotiating.",
      "Two offers with the same gross but different Basic+DA splits can produce different PF and slightly different take-home.",
    ],
    realityCheckParagraphs: [
      "Twelve LPA is where many professionals make their first significant job switch, often moving from services to product companies or from tier-2 cities to metros. The in-hand illustration above uses the new regime and a 45% Basic+DA assumption. At this gross level, income tax under the new regime is zero (Section 87A rebate covers the full liability for FY 2025-26), meaning all your deductions are PF and professional tax.",
      "If you are comparing a ₹12 LPA offer at two companies, check whether both have similar PF wage definitions. A company with Basic at 35% of gross has employee PF of roughly ₹5,040/month; a company with Basic at 50% has employee PF of roughly ₹7,200/month. The same headline gross produces nearly ₹2,000/month difference in monthly cash — which adds up to ₹24,000 over a year.",
      "At ₹12 LPA, the regime comparison (old vs new) may start to become relevant if you pay significant rent and can claim a substantial HRA exemption, or if you make maximum 80C investments. Use the tax regime calculator with your actual inputs before instructing your employer on TDS treatment.",
    ],
  },
  {
    slug: "15-lpa-in-hand-salary",
    lpa: 15,
    seo: {
      title: "15 LPA In-Hand Salary: ₹1,14,900/month (FY 2025-26)",
      description:
        "₹1,14,900/month in-hand on ₹15 LPA gross (new regime, FY 2025-26). Tax kicks in above the ₹12L rebate limit — see monthly PF, TDS, and PT breakdown.",
      keywords: ["15 LPA in hand", "15 lakh salary monthly", "15 LPA net salary India"],
    },
    scenario: baseScenario(15),
    scenarioNotes: ["₹15 LPA is interpreted as ₹15,00,000 gross per year."],
    angleParagraph:
      "Mid-band offers often mix fixed pay with bonuses. This illustration is gross-based; fold recurring bonuses into gross only if that matches how you negotiate and how your employer structures pay.",
    bandInsights: [
      "Around ₹15L, tax brackets and PF ceiling behaviour start to matter more in percentage terms — small gross changes move annual tax.",
      "Retention bonuses and joining bonuses: decide whether to annualize them before comparing “LPA” across companies.",
      "Metro vs non-metro affects rent and commute, not this tax model — use in-hand here plus your rent for real budgeting.",
      "If you are evaluating startup equity vs cash, this page only covers cash salary mechanics — not liquidity or tax on ESOPs.",
    ],
    realityCheckParagraphs: [
      "Fifteen LPA is the band where income tax first becomes a meaningful line item under the new regime for FY 2025-26. Above the Section 87A rebate threshold, tax kicks in on the incremental taxable income — and the illustrated TDS spread reflects that. The in-hand estimate above is after this tax effect, PF, and a PT placeholder.",
      "At ₹15L, the old-vs-new regime comparison deserves explicit attention. If you pay significant rent and can claim HRA exemption, or if you max out 80C investments (₹1.5L) and NPS contributions, the old regime may produce lower annual tax than the new regime despite its higher slab rates. The crossover depends on your exact deduction profile — run the tax regime calculator to see your specific numbers.",
      "People at ₹15 LPA are often evaluating their first significant city upgrade — moving to a premium flat, adding a vehicle, or building savings for a home down payment. These goals require the full budget picture, not just in-hand. Add your actual rent and spend tier in the Salary Reality Check to see how much is actually left after living costs at this income level.",
    ],
  },
  {
    slug: "18-lpa-in-hand-salary",
    lpa: 18,
    seo: {
      title: "18 LPA In-Hand Salary: ₹1,35,400/month (FY 2025-26)",
      description:
        "₹1,35,400/month in-hand on ₹18 LPA gross (new regime, FY 2025-26). Transparent monthly TDS, PF, and PT breakdown. Not a payslip — tune inputs for your employer.",
      keywords: [
        "18 LPA in hand",
        "18 lakh CTC take home India",
        "18 LPA monthly hand",
        "18 lpa salary after tax india",
      ],
    },
    scenario: baseScenario(18),
    scenarioNotes: ["₹18 LPA is interpreted as ₹18,00,000 gross per year."],
    angleParagraph:
      "Eighteen LPA is where tax progression becomes more visible in annual terms. The engine applies configured slabs and a simplified rebate model — use the tax regime calculator if old-regime deductions could change your story.",
    bandInsights: [
      "₹18L gross is a range where regime choice (old vs new) and deduction mix deserve a dedicated comparison — don’t assume new regime from this page alone.",
      "Home loan principal/80C and NPS tier-2 style choices are not individually modeled; the salary breakdown calculator is better for itemized old-regime playbooks.",
      "If you are cross-offering between Bangalore and a tier-2 city, equal gross does not mean equal lifestyle — stress-test rent as a separate line item.",
      "Variable pay as a high fraction of CTC reduces predictability of monthly in-hand — align on what hits payroll monthly.",
    ],
    realityCheckParagraphs: [
      "₹18 LPA is the band where recruiters still say “good package,” but your bank app might disagree until you see rent. The table above is only tax mechanics — it does not judge whether you can afford a city. Most people at this gross are one rent decision away from either comfortable savings or constant anxiety.",
      "This page assumes a clean salaried story (gross in, PF out, TDS spread). Real life adds joining bonuses, stock, medical, parents, or a partner with no income. If any of that is you, treat the in-hand line as a starting point, not a verdict.",
      "If your real question is “Can I live well on this in Bangalore / Mumbai / Pune?”, open a city scenario next — same engine, but with rent and lifestyle in the same picture.",
    ],
  },
  {
    slug: "20-lpa-in-hand-salary",
    lpa: 20,
    seo: {
      title: "20 LPA In-Hand Salary: ₹1,48,600/month (FY 2025-26)",
      description:
        "₹1,48,600/month in-hand on ₹20 LPA gross (new regime, FY 2025-26). Monthly TDS, PF, and PT breakdown. Surcharge not modeled — treat as directional estimate.",
      keywords: ["20 LPA in hand", "20 lakh salary take home", "20 LPA net pay India"],
    },
    scenario: baseScenario(20),
    scenarioNotes: ["₹20 LPA is interpreted as ₹20,00,000 gross per year."],
    angleParagraph:
      "At twenty LPA gross, small changes in PF wage definition or PT still shift monthly cash. Treat the PT line as a placeholder until you align it with your state’s typical annual deduction.",
    bandInsights: [
      "At ₹20L, interview numbers are often “CTC” — ask for fixed monthly, employer PF, gratuity eligibility, and variable timing.",
      "Surcharge is not modeled in this engine; if you are close to surcharge thresholds, treat this as directional only.",
      "Senior IC and lead roles at this band may include allowances; if they are taxable and in gross, you are aligned — if not, adjust gross.",
      "Offer evaluation: compare notice period, insurance, and leave encashment rules — not only gross.",
    ],
    realityCheckParagraphs: [
      "Twenty LPA is a milestone that mid-career professionals often cite as a target, but the in-hand number can be surprising — tax at this gross is not trivial even under the new regime, and PF continues to deduct on Basic+DA. The illustrated monthly cash is after these deductions and before any personal expenses.",
      "At ₹20L, the salary structure increasingly matters for net outcome. A company with Basic at 40% (₹8L annual) produces employee PF of roughly ₹7,200/month. A company with Basic at 30% produces roughly ₹5,400/month. The ₹1,800/month difference adds to in-hand but reduces gratuity accrual and EPF corpus. Neither structure is superior — it depends on how long you stay and how you value liquid vs locked-in savings.",
      "People evaluating ₹20 LPA offers are often at a stage where home loan EMIs, children's education, or family obligations start appearing in the budget. The Salary Reality Check is particularly relevant here — the tool helps you see whether ₹20L in your target city actually produces the savings you need for a specific financial goal after all fixed costs.",
    ],
  },
  {
    slug: "25-lpa-in-hand-salary",
    lpa: 25,
    seo: {
      title: "25 LPA In-Hand Salary: ₹1,79,700/month (FY 2025-26)",
      description:
        "₹1,79,700/month in-hand on ₹25 LPA gross (new regime, FY 2025-26). Transparent PF and TDS breakdown. Surcharge not modeled — directional planning only.",
      keywords: ["25 LPA in hand", "25 lakh CTC monthly in hand", "25 LPA net salary"],
    },
    scenario: baseScenario(25),
    scenarioNotes: ["₹25 LPA is interpreted as ₹25,00,000 gross per year."],
    angleParagraph:
      "Twenty-five LPA is often a switching target in tech and finance roles. This page keeps assumptions explicit: new regime baseline, statutory-style PF ceiling behaviour in code, and no surcharge — so you are not surprised when a payslip looks different.",
    bandInsights: [
      "₹25L is firmly in “verify surcharge and perquisites” territory for many taxpayers — this simplified model may understate tax vs Form 16.",
      "International remote or global pay components may have different withholding — this page assumes standard India salary-style gross.",
      "If you optimize for in-hand, structure (Basic vs allowances) and PF wage matter as much as headline CTC.",
      "When comparing offers, use one consistent method for in-hand (e.g. CTC→in-hand calculator) for each employer before ranking.",
    ],
    realityCheckParagraphs: [
      "Twenty-five LPA is senior-career territory for most Indian industries — product engineering, management consulting, financial services, and senior public sector roles. The in-hand illustrated above is a simplified model: it does not include surcharge (which may apply depending on total income including bonuses and other sources), perquisites, or employer-specific allowances. Treat it as a directional estimate.",
      "At this band, regime choice (old vs new) is genuinely non-trivial and depends on your full deduction profile: home loan interest (Section 24, up to ₹2L), HRA, NPS contributions (Section 80CCD), and 80C. For some employees, the old regime's deduction menu can reduce taxable income substantially enough to outperform the new regime's lower slab rates. Do the comparison explicitly before the financial year.",
      "Beyond in-hand, ₹25L employees are often building significant net worth through EPF, NPS, ESOP vesting, or real estate. The monthly in-hand from salary is one input to a fuller financial picture. Use this page to understand the tax and PF mechanics on the salary side, and consult a financial planner or CA for the investment and tax optimisation side.",
    ],
  },
  {
    slug: "30-lpa-in-hand-salary",
    lpa: 30,
    seo: {
      title: "30 LPA In-Hand Salary: ₹2,08,300/month (FY 2025-26)",
      description:
        "₹2,08,300/month in-hand on ₹30 LPA gross (new regime, FY 2025-26). Directional estimate — surcharge and perquisites out of scope. Validate with Form 16.",
      keywords: ["30 LPA in hand", "30 lakh salary take home India", "30 LPA monthly net"],
    },
    scenario: baseScenario(30),
    scenarioNotes: [
      "₹30 LPA is interpreted as ₹30,00,000 gross per year.",
      "Surcharge and high-income nuances are not modeled in the engine used here.",
    ],
    angleParagraph:
      "At thirty LPA gross, real-world tax can include surcharge and perquisites that this simplified engine does not model. Use the output as a directional split of gross into PF, PT, TDS spread, and cash in-hand — then validate with a professional for filing.",
    bandInsights: [
      "₹30L gross usually triggers additional tax considerations (surcharge, marginal relief) not in SalaryExit’s engine — treat this page as illustrative.",
      "RSU/ESOP and large bonuses can dominate effective tax rate — annualize carefully before comparing to “LPA”.",
      "Metro housing and schooling may dominate cash flow; use this in-hand as one input to a full budget, not the whole story.",
      "For filing and advance tax, rely on Form 16, AIS, and a qualified professional — not long-tail LPA pages.",
    ],
    realityCheckParagraphs: [
      "Thirty LPA is a level where salary structure complexity and tax nuance both increase significantly. This page gives you a simplified gross-to-in-hand illustration using standard slab-based calculation — but real-world tax at this income level may include surcharge, marginal relief (which prevents a sharp tax spike at the threshold), and perquisite taxation on employer-provided benefits. These are not in this engine.",
      "If your ₹30 LPA package includes RSU vesting, annual bonuses, or any non-cash components, your actual effective tax rate will differ from this illustration. RSU vesting is taxed as perquisite income at the fair market value on vesting date — a large vest in one financial year can push effective tax significantly higher than the slab rates alone suggest. This requires advance tax planning and direct engagement with your chartered accountant.",
      "At ₹30 LPA, the monthly in-hand from salary is one piece of a larger financial picture. Home loan EMIs, children’s education fees, family insurance premiums, and wealth-building investments all compete for the same cash. Use the in-hand estimate here as the starting point for monthly budgeting, not a conclusion.",
    ],
  },
  {
    slug: "35-lpa-in-hand-salary",
    lpa: 35,
    seo: {
      title: "35 LPA In-Hand Salary: ₹2,37,000/month (FY 2025-26)",
      description:
        "₹2,37,000/month in-hand on ₹35 LPA gross (new regime, FY 2025-26). Directional estimate — surcharge not modeled. Validate with Form 16 and a CA.",
      keywords: ["35 LPA in hand", "35 lakh salary take home India", "35 LPA monthly net"],
    },
    scenario: baseScenario(35),
    scenarioNotes: [
      "₹35 LPA is interpreted as ₹35,00,000 gross per year.",
      "Surcharge and high-income nuances are not modeled in the engine used here.",
    ],
    angleParagraph:
      "At thirty-five LPA gross, surcharge and perquisite taxation are real considerations that SalaryExit’s simplified engine does not capture. Use this page to understand the shape of your deductions (PF, PT, TDS spread) as directional context, not a payslip prediction.",
    bandInsights: [
      "₹35L gross is well into surcharge territory for many taxpayers — this model may meaningfully understate actual tax vs Form 16.",
      "RSU vesting, large annual bonuses, and joining pay can push effective tax rate further — annualise carefully before comparing to “LPA”.",
      "At this band, PF wage definition and structure (Basic vs allowances) can shift in-hand by several thousand rupees monthly — ask HR for a pay breakdown.",
      "For advance tax planning and filing, rely on Form 16, AIS, and a CA — not long-tail LPA pages.",
    ],
    realityCheckParagraphs: [
      "Thirty-five LPA is firmly senior-leadership or senior-specialist territory. At this income level, the simplification in SalaryExit's engine — no surcharge modeling, no perquisite valuation, no marginal relief calculation — means the actual monthly in-hand on your payslip will likely differ from the illustration above. The difference is not arbitrary; it reflects the real complexity of high-income taxation in India, which requires Form 16 and a qualified CA to resolve accurately.",
      "A key planning issue at ₹35 LPA: whether to use old or new regime is not a simple comparison at this income level. The old regime's deduction menu (home loan interest, HRA, NPS, 80C) can reduce taxable income substantially. But the new regime's lower slab rates and absence of documentation requirements have their own appeal, especially if your deductions are limited. The regime calculator cannot model your entire financial situation — use it alongside professional advice.",
      "For most employees at ₹35 LPA, the monthly cash-flow question is less urgent than the wealth-accumulation question: how much EPF, NPS, ESOP, or real estate equity are you building? Monthly in-hand tells you what is available for spending and liquid savings. The rest of the wealth picture requires a separate analysis. Use this page for the salary mechanics and engage a financial planner for the broader picture.",
    ],
  },
];

const bySlug = new Map(LPA_LANDING_PAGES.map((p) => [p.slug, p]));

export function getLpaLandingPageConfig(slug: string): LpaLandingPageConfig | undefined {
  return bySlug.get(slug);
}

export function getAllLpaSlugs(): string[] {
  return LPA_LANDING_PAGES.map((p) => p.slug);
}

export function getAdjacentLpa(
  slug: string
): { prev?: LpaLandingPageConfig; next?: LpaLandingPageConfig } {
  const idx = LPA_LANDING_PAGES.findIndex((p) => p.slug === slug);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? LPA_LANDING_PAGES[idx - 1] : undefined,
    next: idx < LPA_LANDING_PAGES.length - 1 ? LPA_LANDING_PAGES[idx + 1] : undefined,
  };
}
