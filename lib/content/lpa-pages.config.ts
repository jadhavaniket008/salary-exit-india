/**
 * Long-tail “₹X LPA in-hand” landing pages — single source of truth.
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
      title: "₹8 LPA take-home in India — monthly in-hand estimate (FY engine)",
      description:
        "₹8,00,000 gross/year: see estimated monthly in-hand, PF, professional tax placeholder, and TDS spread. Adjust inputs in the CTC→in-hand calculator for your state and payslip.",
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
  },
  {
    slug: "10-lpa-in-hand-salary",
    lpa: 10,
    seo: {
      title: "₹10 LPA in-hand India — tax, PF & monthly estimate",
      description:
        "₹10,00,000 gross: monthly in-hand estimate under new regime defaults, ₹2,500 PT placeholder, and PF from a 45% Basic+DA assumption. Not a payslip — tune the CTC tool for your employer.",
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
  },
  {
    slug: "12-lpa-in-hand-salary",
    lpa: 12,
    seo: {
      title: "₹12 LPA in-hand India — tax, PF & monthly estimate",
      description:
        "₹12 lakh gross salary: estimated monthly in-hand, employee PF, TDS spread, and FY slabs in code. Compare old vs new regime if deductions matter for you.",
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
  },
  {
    slug: "15-lpa-in-hand-salary",
    lpa: 15,
    seo: {
      title: "₹15 LPA in-hand estimate India — tax, PF & PT explained",
      description:
        "₹15,00,000 gross/year: transparent monthly breakdown with SalaryExit’s FY model. Surcharge not included — see methodology for limits.",
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
  },
  {
    slug: "18-lpa-in-hand-salary",
    lpa: 18,
    seo: {
      title: "₹18 LPA in-hand India — tax, PF & monthly estimate",
      description:
        "₹18 lakh gross: monthly take-home under new regime + PF wage assumption. Links to full calculators and regime comparison for serious planning (not filing advice).",
      keywords: ["18 LPA in hand", "18 lakh CTC take home India", "18 LPA monthly hand"],
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
  },
  {
    slug: "20-lpa-in-hand-salary",
    lpa: 20,
    seo: {
      title: "₹20 LPA in-hand India — tax, PF & monthly estimate",
      description:
        "₹20,00,000 gross: see PF, PT placeholder, and TDS spread as monthly lines. Verify professional tax for your state; results are educational estimates.",
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
  },
  {
    slug: "25-lpa-in-hand-salary",
    lpa: 25,
    seo: {
      title: "₹25 LPA in-hand India — high-level monthly cash estimate",
      description:
        "₹25 lakh gross salary: estimated in-hand with SalaryExit defaults. No surcharge in engine — read methodology before comparing to Form 16.",
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
  },
  {
    slug: "30-lpa-in-hand-salary",
    lpa: 30,
    seo: {
      title: "₹30 LPA gross to monthly in-hand — India (no surcharge modeled)",
      description:
        "₹30,00,000 gross: monthly in-hand estimate; high-income surcharge and complex pay are out of scope. Use for directional planning, not tax filing.",
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
      "For filing and advance tax, rely on Form 16, AIS, and a CA — not long-tail LPA pages.",
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
