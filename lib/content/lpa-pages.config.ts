/**
 * Long-tail "₹X LPA in-hand" landing pages — single source of truth.
 * Add rows here to scale to 50+ pages without duplicating route files.
 */

import type { CtcToInHandInput } from "@/types/salary";
import type { SeoPageMetadata } from "@/types/seo";
import type { FaqItem } from "@/types/faq";

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
  /** Per-entry FAQ items — prepended before generic band FAQs in the template */
  faq?: FaqItem[];
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
    slug: "3-lpa-in-hand-salary",
    lpa: 3,
    seo: {
      title: "3 LPA In-Hand Salary: ₹23,400/month (FY 2026-27)",
      description:
        "3 LPA का मतलब: ₹23,400/month in-hand (FY 2026-27, नई regime, zero tax). Fresher salary breakdown — employee PF, professional tax, zero TDS. Adjust for your state.",
      keywords: ["3 LPA in hand", "3 lakh salary in hand", "fresher 3 LPA monthly salary", "3 LPA take home India"],
    },
    scenario: baseScenario(3),
    scenarioNotes: [
      "₹3 LPA = ₹3,00,000 gross per year. Basic+DA at 45% = ₹11,250/month — below the PF wage ceiling, so PF is calculated on actual Basic+DA here.",
    ],
    angleParagraph:
      "At ₹3 LPA, Basic+DA (45% of gross = ₹11,250/month) sits below the ₹15,000 PF wage ceiling, so PF is computed on actual Basic+DA — ₹1,350/month rather than the ₹1,800 that applies at higher bands. Income tax is zero. This makes the gross-to-in-hand conversion particularly clean.",
    bandInsights: [
      "Zero income tax: taxable income after ₹75,000 standard deduction = ₹2.25L — no slab liability, full 87A rebate.",
      "PF deduction is ~₹1,350/month here (not the ₹1,800 cap), because Basic+DA is below the ₹15,000 PF wage ceiling.",
      "Many small employers at this salary band don't deduct PF at all — check your offer letter for PF applicability.",
      "In-hand at ₹3 LPA covers basic expenses in tier-2/3 cities; metros require shared accommodation or supplements.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 3 LPA in India (FY 2026-27)?",
        answer:
          "Approximately ₹23,400/month under the new tax regime. No income tax (Section 87A rebate applies). Deductions: employee PF ~₹1,350/month and professional tax ~₹208/month. Actual take-home varies if your employer has a different Basic+DA split or exempts PF.",
      },
      {
        question: "Is 3 LPA a good fresher salary in India?",
        answer:
          "₹3 LPA (₹23,400/month) is viable in tier-2/tier-3 cities but tight in metros where rent alone can consume 50–60% of take-home. For freshers, trajectory matters more than starting salary — look for structured appraisal cycles rather than just the first number.",
      },
    ],
  },
  {
    slug: "4-lpa-in-hand-salary",
    lpa: 4,
    seo: {
      title: "4 LPA In-Hand Salary: ₹31,300/month (FY 2026-27)",
      description:
        "4 LPA का मतलब: ₹31,300/month in-hand (FY 2026-27, नई regime, zero tax). CTC to take-home breakdown for ₹4 lakh annual salary — PF capped at ₹1,800/month.",
      keywords: ["4 LPA in hand", "4 lakh salary in hand", "CTC 4 LPA take home India", "4 LPA monthly salary"],
    },
    scenario: baseScenario(4),
    scenarioNotes: [
      "₹4 LPA = ₹4,00,000 gross per year. Basic+DA at 45% = ₹15,000/month — exactly at the PF wage ceiling.",
    ],
    angleParagraph:
      "₹4 LPA is where the PF wage ceiling kicks in exactly — Basic+DA at the 45% assumption is precisely ₹15,000/month, capping employee PF at ₹1,800. Income tax is nil. The gross-to-in-hand math is clean: only PF and professional tax reduce your take-home.",
    bandInsights: [
      "Zero income tax: taxable income = ₹3.25L after standard deduction — covered by Section 87A rebate.",
      "PF deduction is ₹1,800/month (12% of ₹15,000 PF wage ceiling) — same as it will be at ₹5, ₹8, or ₹12 LPA.",
      "Variable pay, joining bonus, and quarterly components are not modelled here — add them on top for total CTC view.",
      "Old regime also yields zero tax at ₹4 LPA — no advantage over new regime at this band.",
    ],
    faq: [
      {
        question: "4 LPA in-hand per month India — how much is it?",
        answer:
          "~₹31,300/month under the new tax regime (FY 2026-27). Zero income tax (Section 87A rebate). Deductions: employee PF ₹1,800/month + professional tax ~₹208/month. Adjust for your state's PT and Basic+DA split using the calculator above.",
      },
      {
        question: "Does 4 LPA qualify for a home loan or credit card?",
        answer:
          "Most banks require ₹25,000–₹30,000/month minimum in-hand for entry credit cards. At ~₹31,300/month you're at the lower threshold. Home loan eligibility at ₹4 LPA is typically ₹15–20L (50–60× monthly in-hand) — insufficient in most metro markets but workable with a co-applicant.",
      },
    ],
  },
  {
    slug: "5-lpa-in-hand-salary",
    lpa: 5,
    seo: {
      title: "5 LPA In-Hand Salary: ₹39,600/month (FY 2026-27)",
      description:
        "5 LPA का मतलब: ₹39,600/month in-hand (FY 2026-27, नई regime, zero tax). Free CTC to take-home calculator for ₹5 lakh annual salary — no registration required.",
      keywords: ["5 LPA in hand", "5 lakh salary in hand", "5 LPA monthly in hand salary", "CTC 5 LPA take home"],
    },
    scenario: baseScenario(5),
    scenarioNotes: ["₹5 LPA = ₹5,00,000 gross per year. New tax regime baseline for FY 2026-27."],
    angleParagraph:
      "₹5 LPA is a common offer for IT graduates after 1–2 years of experience and non-tech professionals in mid-tier roles. At this gross, Section 87A rebate eliminates income tax entirely — only PF and professional tax reduce take-home.",
    bandInsights: [
      "Zero income tax: taxable income = ₹4.25L after standard deduction — well within 87A coverage.",
      "Both old and new tax regimes produce zero tax at ₹5 LPA — new regime wins on simplicity.",
      "NPS Tier 1 at this band: ₹50,000 under 80CCD(1B) is still reachable and builds compounding even if tax saving is minimal now.",
      "₹39,600/month gives reasonable financial independence in tier-2 cities; metros typically require shared accommodation.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 5 LPA in India (FY 2026-27)?",
        answer:
          "~₹39,600/month under the new tax regime. Income tax is zero (Section 87A rebate covers full liability at ₹5L gross). Deductions: employee PF ₹1,800/month + professional tax ~₹208/month.",
      },
      {
        question: "Is old or new regime better at 5 LPA?",
        answer:
          "Both give zero tax at ₹5 LPA. New regime is better in practice — no paperwork, no investment proof required. Old regime with 80C deductions doesn't reduce an already-zero liability. Stick with new regime unless you have specific high-deduction scenarios.",
      },
    ],
  },
  {
    slug: "6-lpa-in-hand-salary",
    lpa: 6,
    seo: {
      title: "6 LPA In-Hand Salary: ₹48,000/month (FY 2026-27)",
      description:
        "6 LPA का मतलब: ₹48,000/month in-hand (FY 2026-27, नई regime, zero tax). Monthly take-home for ₹6 lakh salary — PF, PT, and TDS breakdown with calculator.",
      keywords: ["6 LPA in hand", "6 lakh salary in hand", "6 LPA monthly salary India", "CTC 6 LPA take home"],
    },
    scenario: baseScenario(6),
    scenarioNotes: ["₹6 LPA = ₹6,00,000 gross per year. New regime, standard non-metro PT assumption."],
    angleParagraph:
      "₹6 LPA is a transition band where many professionals start encountering structured HRA and flexi-pay components in their CTC. These components affect how much of the CTC headline translates to gross salary — and thus in-hand. Tax remains zero at this gross under the new regime.",
    bandInsights: [
      "Zero income tax: taxable income = ₹5.25L after standard deduction — fully within 87A rebate coverage.",
      "HRA exemption in old regime is irrelevant here — new regime already produces zero tax, so HRA saves nothing additional.",
      "If your CTC packs in employer PF and gratuity on top of gross, your actual gross is lower than the headline — enter gross (not CTC) in the calculator.",
      "₹48,000/month supports independent living in most tier-2 Indian cities with modest savings.",
    ],
    faq: [
      {
        question: "6 LPA in-hand per month — exact amount?",
        answer:
          "~₹48,000/month under the new regime (FY 2026-27). Zero income tax (87A rebate). Deductions: PF ₹1,800/month + professional tax ~₹208/month. Use the calculator above to adjust for your state PT and Basic+DA split.",
      },
      {
        question: "Is 6 LPA gross or CTC — and does it matter?",
        answer:
          "It matters significantly. If 6 LPA is CTC (includes employer PF ₹21,600/year, gratuity ~₹28,846/year, and insurance), your gross salary is closer to ₹5.4–5.5L — meaning monthly in-hand drops by ₹4,000–5,000. Always ask for a salary breakup before accepting, not just the CTC headline.",
      },
    ],
  },
  {
    slug: "7-lpa-in-hand-salary",
    lpa: 7,
    seo: {
      title: "7 LPA In-Hand Salary: ₹56,300/month (FY 2026-27)",
      description:
        "7 LPA का मतलब: ₹56,300/month in-hand (FY 2026-27, नई regime, zero tax). Monthly take-home, PF deduction, zero TDS explained for ₹7 lakh annual salary.",
      keywords: ["7 LPA in hand", "7 lakh salary in hand", "CTC 7 LPA take home India", "7 LPA monthly in hand"],
    },
    scenario: baseScenario(7),
    scenarioNotes: ["₹7 LPA = ₹7,00,000 gross per year. New regime baseline; 45% Basic+DA assumed."],
    angleParagraph:
      "₹7 LPA is a common milestone for engineers with 2–3 years of experience or first-job offers at product companies. Income tax is still zero under the new regime — salary engineering (Basic splits, flexi-pay) only affects PF, not tax.",
    bandInsights: [
      "Zero income tax: taxable income = ₹6.25L after standard deduction — covered by Section 87A (new regime).",
      "Old regime with max 80C + basic HRA yields near-zero tax too — new regime wins on paperwork simplicity.",
      "Variable pay at this band (common in sales, banking) changes annual CTC materially — model fixed monthly pay separately.",
      "Delhi, Haryana, and some states don't levy professional tax — adjust the PT field to ₹0 if you're in a zero-PT state.",
    ],
    faq: [
      {
        question: "What is 7 LPA in-hand per month in India?",
        answer:
          "~₹56,300/month under the new tax regime (FY 2026-27). Income tax is zero (Section 87A rebate). Deductions: PF ₹1,800/month + professional tax ~₹208/month. Verify your employer has your regime declaration on file to avoid unnecessary TDS.",
      },
      {
        question: "New vs old regime at ₹7 LPA — which is better?",
        answer:
          "New regime: zero tax, no paperwork. Old regime: near-zero tax if you claim 80C and basic HRA, but needs documentation. Unless you pay substantial rent or have significant 80C investments that push taxable income much lower, new regime is simpler and typically equivalent or better at this band.",
      },
    ],
  },
  {
    slug: "8-lpa-in-hand-salary",
    lpa: 8,
    seo: {
      title: "8 LPA In-Hand Salary: ₹64,600/month (FY 2026-27)",
      description:
        "₹64,600/month in-hand on ₹8 LPA gross — zero income tax (Section 87A rebate, FY 2026-27). Employee PF included. Adjust Basic+DA and state PT in the CTC calculator.",
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
      "Income tax at ₹8 LPA gross under the new regime is effectively zero after the Section 87A rebate (FY 2026-27) — so TDS should be minimal or nil if your employer has set it up correctly. If you are seeing unexpected TDS at this level, check whether your employer has your regime declaration on file.",
    ],
    faq: [
      {
        question: "Why is there no income tax deduction at ₹8 LPA?",
        answer:
          "At ₹8L gross under the new regime, the Section 87A rebate (up to ₹60,000 under FY 2026-27) covers the full income tax liability at this gross — effective tax is nil. Your TDS should be minimal or zero if your employer has your regime declaration on file.",
      },
      {
        question: "How can I increase my in-hand at ₹8 LPA?",
        answer:
          "The main levers are PF wage definition (if your Basic+DA is lower, PF deduction is lower) and professional tax (varies by state — some charge less than the ₹2,500 placeholder here). Income tax is already nil at this gross under the new regime, so there is no tax saving available there.",
      },
      {
        question: "What career stage typically earns ₹8 LPA in India?",
        answer:
          "₹8 LPA is common for engineers with 1–3 years of experience, junior analysts, or early-career finance and ops professionals in metro cities. In tier-2 cities it can represent a senior or lead role. Because effective income tax is nil at this band, the full gross conversion to in-hand depends only on PF and state professional tax.",
      },
    ],
  },
  {
    slug: "9-lpa-in-hand-salary",
    lpa: 9,
    seo: {
      title: "9 LPA In-Hand Salary: ₹73,000/month (FY 2026-27)",
      description:
        "9 LPA का मतलब: ₹73,000/month in-hand (FY 2026-27, नई regime, zero tax). CTC to take-home breakdown for ₹9 lakh annual salary — PF, professional tax, zero TDS.",
      keywords: ["9 LPA in hand", "9 lakh salary in hand", "9 LPA monthly salary India", "CTC 9 LPA take home"],
    },
    scenario: baseScenario(9),
    scenarioNotes: ["₹9 LPA = ₹9,00,000 gross per year. New tax regime; taxable income after standard deduction = ₹8.25L — below 87A threshold."],
    angleParagraph:
      "₹9 LPA sits in the middle of a zero-tax band — income tax remains nil under both old and new regimes. Many professionals at this band start accumulating meaningful PF balance and question whether to make VPF contributions. The short answer: VPF reduces in-hand by exactly as much as you contribute but delivers 8%+ compounding in a tax-free instrument.",
    bandInsights: [
      "Zero income tax: taxable income = ₹8.25L after standard deduction — fully covered by Section 87A rebate (new regime).",
      "VPF at ₹9 LPA: if you can spare ₹5,000–8,000/month, VPF offers guaranteed 8.25% (FY 2023-24 rate) compounding tax-free.",
      "Switching employers? Check whether your PF balance will be transferred (UAN-linked) or withdrawn — premature withdrawal under 5 years is taxable.",
      "Metro vs non-metro: ₹73,000/month can support independent living in most cities — see the Salary Reality Check for a city-specific view.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 9 LPA in India (FY 2026-27)?",
        answer:
          "~₹73,000/month under the new tax regime. Zero income tax (Section 87A rebate covers full liability at ₹9L gross). Deductions: employee PF ₹1,800/month + professional tax ~₹208/month.",
      },
      {
        question: "Is 9 LPA a good salary in India in 2026?",
        answer:
          "₹9 LPA (₹73,000/month in-hand) is comfortable in tier-2 cities and manageable in metros with shared accommodation or reasonable rent. It falls within the zero-tax zone, which means your employer's salary structure (Basic+DA split, flexi-pay components) determines your in-hand more than your tax bracket does.",
      },
    ],
  },
  {
    slug: "10-lpa-in-hand-salary",
    lpa: 10,
    seo: {
      title: "10 LPA In-Hand Salary: ₹81,300/month (FY 2026-27)",
      description:
        "₹81,300/month in-hand on ₹10 LPA gross — zero income tax (Section 87A rebate, FY 2026-27). Tune Basic+DA and state PT for your exact take-home.",
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
      "Ten LPA is the most commonly searched salary band in India — it represents a first significant job milestone for many and a comparison anchor for early-career switches. The illustrated in-hand above assumes a clean new-regime setup with no itemized deductions. Under the Section 87A rebate structure for FY 2026-27, income tax at this gross is nil, so the deductions you see are PF and professional tax only.",
      "If your actual Basic+DA is higher than 45% of gross (the assumed split here), your PF deduction will be higher and your in-hand slightly lower. If your employer uses a PF wage cap, the deduction will be lower. Use the CTC-to-in-hand calculator and enter your payslip’s Basic+DA for a number that matches your specific situation rather than this band illustration.",
      "The question people at ₹10 LPA most often ask is not about tax — it is about rent. This page shows gross-to-in-hand mechanics only. For a realistic monthly budget picture (rent, commute, lifestyle spend, and what is left), use the Salary Reality Check with your actual city and rent figure.",
    ],
    faq: [
      {
        question: "Is ₹10 LPA still tax-free under the new regime for FY 2026-27?",
        answer:
          "Yes — the Section 87A rebate (up to ₹60,000 under FY 2026-27 new regime) covers the full income tax at ₹10L gross. Effective income tax is nil, so the deductions you see here are PF and professional tax only. Confirm your employer has your regime choice recorded to avoid unnecessary TDS.",
      },
      {
        question: "How much of my ₹10 LPA in-hand should go toward rent?",
        answer:
          "A widely used guideline is 30–35% of net monthly income. At the illustrated in-hand of roughly ₹81,000/month, that suggests ₹24k–₹28k — though the right number depends on your city and savings goals. Use the Salary Reality Check to see what remains after a specific rent figure.",
      },
      {
        question: "How much does my employer contribute to EPF at ₹10 LPA?",
        answer:
          "Employer PF matches your 12% employee contribution on Basic+DA. At a 45% Basic assumption on ₹10L gross, that is roughly ₹3,600–₹4,500/month going into your EPF account from the employer side. This amount is part of your CTC but not part of in-hand — it builds your retirement corpus and is accessible after employment ends, subject to withdrawal rules.",
      },
    ],
  },
  {
    slug: "11-lpa-in-hand-salary",
    lpa: 11,
    seo: {
      title: "11 LPA In-Hand Salary: ₹89,600/month (FY 2026-27)",
      description:
        "11 LPA का मतलब: ₹89,600/month in-hand (FY 2026-27, नई regime, zero tax). CTC to take-home calculator for ₹11 lakh salary — last zero-tax band before the ₹12L threshold.",
      keywords: ["11 LPA in hand", "11 lakh salary in hand", "11 LPA monthly salary India", "CTC 11 LPA take home"],
    },
    scenario: baseScenario(11),
    scenarioNotes: ["₹11 LPA = ₹11,00,000 gross per year. Taxable income after standard deduction = ₹10.25L — below the 87A threshold for full rebate."],
    angleParagraph:
      "₹11 LPA is the last full LPA band before income crosses the ₹12L mark where Section 87A rebate no longer fully covers tax. At ₹11L gross, effective income tax is still nil — which is why ₹11–12 LPA is a particularly attractive band: you cross a meaningful salary milestone without entering a tax bracket.",
    bandInsights: [
      "Zero income tax: taxable income = ₹10.25L after standard deduction — still within 87A full coverage (new regime).",
      "The jump from ₹11 to ₹13 LPA triggers progressive tax — see the 13 LPA page for how this changes in-hand.",
      "Negotiating ₹11 vs ₹12 LPA? The in-hand difference is ~₹8,300/month with zero tax at both levels. Worth pushing for.",
      "If your employer's Basic+DA is set very high (60%+), your PF deduction rises — but tax remains zero at this gross.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 11 LPA (FY 2026-27)?",
        answer:
          "~₹89,600/month under the new tax regime. Zero income tax — Section 87A rebate covers the full liability at ₹11L gross (taxable income = ₹10.25L after standard deduction). Deductions: employee PF ₹1,800/month + professional tax ~₹208/month.",
      },
      {
        question: "Why is ₹11 LPA considered a sweet spot for in-hand salary?",
        answer:
          "At ₹11 LPA, you cross ₹85,000+/month in-hand while paying zero income tax — the Section 87A rebate still covers the full tax liability. Cross into ₹13+ LPA and progressive tax starts, reducing the per-rupee take-home. The ₹10–12 LPA range gives the best gross-to-net conversion of any salary band in India right now.",
      },
    ],
  },
  {
    slug: "12-lpa-in-hand-salary",
    lpa: 12,
    seo: {
      title: "12 LPA In-Hand: ₹98,000/month, Zero Tax (FY 2026-27)",
      description:
        "12 LPA का मतलब: ₹98,000/month in-hand (FY 2026-27, नई regime, zero tax). 12 lakh gross to take-home — PF, TDS breakdown with calculator. Old vs new regime comparison.",
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
      "Twelve LPA is where many professionals make their first significant job switch, often moving from services to product companies or from tier-2 cities to metros. The in-hand illustration above uses the new regime and a 45% Basic+DA assumption. At this gross level, income tax under the new regime is zero (Section 87A rebate covers the full liability for FY 2026-27), meaning all your deductions are PF and professional tax.",
      "If you are comparing a ₹12 LPA offer at two companies, check whether both have similar PF wage definitions. A company with Basic at 35% of gross has employee PF of roughly ₹5,040/month; a company with Basic at 50% has employee PF of roughly ₹7,200/month. The same headline gross produces nearly ₹2,000/month difference in monthly cash — which adds up to ₹24,000 over a year.",
      "At ₹12 LPA, the regime comparison (old vs new) may start to become relevant if you pay significant rent and can claim a substantial HRA exemption, or if you make maximum 80C investments. Use the tax regime calculator with your actual inputs before instructing your employer on TDS treatment.",
    ],
    faq: [
      {
        question: "At ₹12 LPA, which tax regime is better — old or new?",
        answer:
          "At ₹12L gross under the new regime, income tax is zero (Section 87A rebate). The old regime can beat the new regime only if your deductions (HRA + 80C + NPS) are large enough — but since new-regime tax is already nil here, the old regime rarely helps unless you have significant exemptions that reduce taxable income below ₹5L.",
      },
      {
        question: "Why does Basic+DA split matter for my ₹12 LPA take-home?",
        answer:
          "Employee PF is 12% of Basic+DA. A company setting Basic at 50% of gross deducts roughly ₹7,200/month in PF; one at 35% deducts roughly ₹5,040/month. On the same ₹12L CTC, that is a ₹2,160/month difference in cash in-hand. Enter your actual Basic in the CTC calculator for a number specific to your payslip.",
      },
      {
        question: "Can I afford a car loan EMI on a ₹12 LPA salary?",
        answer:
          "At an in-hand of roughly ₹98,000/month, a typical car EMI of ₹10,000–₹15,000/month is feasible if rent and fixed costs remain controlled. A common guideline is to keep total EMIs under 30–35% of net income. Use the Salary Reality Check to model rent plus an EMI and see what monthly surplus remains before committing.",
      },
    ],
  },
  {
    slug: "13-lpa-in-hand-salary",
    lpa: 13,
    seo: {
      title: "13 LPA In-Hand Salary: ₹1,03,600/month (FY 2026-27)",
      description:
        "13 LPA का मतलब: ~₹1,03,600/month in-hand (FY 2026-27, नई regime). Tax kicks in just above ₹12L — see how marginal relief keeps your liability low at ₹13 LPA.",
      keywords: ["13 LPA in hand", "13 lakh salary monthly", "13 LPA take home India", "CTC 13 LPA monthly salary"],
    },
    scenario: baseScenario(13),
    scenarioNotes: [
      "₹13 LPA = ₹13,00,000 gross per year. Taxable income after standard deduction = ₹12.25L — marginally above the 87A threshold.",
    ],
    angleParagraph:
      "₹13 LPA is the first band where income tax enters the picture under the new regime, but marginal relief provisions limit the effective liability. The tax at this level is small relative to income — the bigger practical question is old vs new regime and whether your deductions (HRA, 80C) change the calculation.",
    bandInsights: [
      "Tax kicks in: taxable income = ₹12.25L (above 87A threshold). Marginal relief may cap liability near ₹25,000–30,000 annually.",
      "Old regime comparison becomes worthwhile at ₹13 LPA if you pay metro rent + claim 80C — run the tax regime calculator.",
      "The step from ₹12 to ₹13 LPA does not give you ₹8,300/month more in-hand; income tax shaves some of that increment.",
      "Home loan eligibility steps up meaningfully here: lenders typically offer ₹52L–₹65L at this gross (4–5× annual salary).",
    ],
    faq: [
      {
        question: "How much is 13 LPA in-hand per month (FY 2026-27)?",
        answer:
          "Approximately ₹1,03,600/month under the new tax regime. Tax begins at this gross (taxable income = ₹12.25L after standard deduction), but marginal relief provisions keep the annual liability low. Deductions: PF ₹1,800/month + professional tax ~₹208/month + small TDS spread.",
      },
      {
        question: "Why is my in-hand lower at ₹13 LPA than expected after ₹12 LPA zero-tax?",
        answer:
          "At ₹12 LPA, Section 87A rebate eliminated all tax. At ₹13 LPA, taxable income crosses ₹12L and income tax applies on the incremental amount — marginal relief limits the pain, but it does reduce the per-rupee take-home increment. This is why offers in the ₹12–15 LPA range need a proper tax model, not just a headline comparison.",
      },
    ],
  },
  {
    slug: "14-lpa-in-hand-salary",
    lpa: 14,
    seo: {
      title: "14 LPA In-Hand Salary: ₹1,09,300/month (FY 2026-27)",
      description:
        "14 LPA का मतलब: ~₹1,09,300/month in-hand (FY 2026-27, नई regime). Monthly take-home for ₹14 lakh salary — PF, TDS, PT breakdown and old vs new regime comparison.",
      keywords: ["14 LPA in hand", "14 lakh salary monthly", "14 LPA take home India", "CTC 14 LPA monthly salary"],
    },
    scenario: baseScenario(14),
    scenarioNotes: [
      "₹14 LPA = ₹14,00,000 gross per year. Taxable income after standard deduction = ₹13.25L.",
    ],
    angleParagraph:
      "At ₹14 LPA, income tax is a growing line item but still moderate under the new regime. This band is where the old-vs-new regime choice starts to matter if you have significant rent or 80C commitments — the break-even point on deductions is worth modelling explicitly before your employer's regime declaration deadline.",
    bandInsights: [
      "Taxable income = ₹13.25L — annual tax under new regime approx ₹1,05,000–₹1,12,000 (inc. cess); ~₹9,000/month TDS.",
      "Old regime may win if: HRA deduction ≥ ₹15,000/month + 80C of ₹1.5L + NPS ₹50k. Otherwise new regime is simpler.",
      "Notice period buyout at ₹14 LPA: ~₹1,16,700/month gross. Use the exit calculator to model your exact notice period cost.",
      "Two ₹14 LPA offers with different fixed-to-variable ratios are not equivalent — model only fixed monthly pay for in-hand comparison.",
    ],
    faq: [
      {
        question: "What is 14 LPA in-hand per month in India (FY 2026-27)?",
        answer:
          "~₹1,09,300/month under the new tax regime. Annual income tax approx ₹1,05,000–₹1,12,000 (including 4% cess) on ₹13.25L taxable income. Deductions per month: PF ₹1,800 + professional tax ~₹208 + TDS ~₹9,000. Enter your actual Basic+DA and regime in the calculator for your exact payslip figure.",
      },
      {
        question: "Is ₹14 LPA in the old or new tax regime better?",
        answer:
          "Depends on your deductions. Old regime wins if you can combine: HRA exemption (rent ₹15k+/month in metro), 80C investments of ₹1.5L, and NPS 80CCD(1B) of ₹50k. The combined deduction of ~₹2.75L+ can pull taxable income below ₹10.5L, where old-regime slabs become competitive. Use the tax regime calculator with your actual numbers.",
      },
    ],
  },
  {
    slug: "15-lpa-in-hand-salary",
    lpa: 15,
    seo: {
      title: "15 LPA In-Hand Salary: ₹1,14,900/month (FY 2026-27)",
      description:
        "₹1,14,900/month in-hand on ₹15 LPA gross (new regime, FY 2026-27). Tax kicks in above the ₹12L rebate limit — see monthly PF, TDS, and PT breakdown.",
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
      "Fifteen LPA is the band where income tax first becomes a meaningful line item under the new regime for FY 2026-27. Above the Section 87A rebate threshold, tax kicks in on the incremental taxable income — and the illustrated TDS spread reflects that. The in-hand estimate above is after this tax effect, PF, and a PT placeholder.",
      "At ₹15L, the old-vs-new regime comparison deserves explicit attention. If you pay significant rent and can claim HRA exemption, or if you max out 80C investments (₹1.5L) and NPS contributions, the old regime may produce lower annual tax than the new regime despite its higher slab rates. The crossover depends on your exact deduction profile — run the tax regime calculator to see your specific numbers.",
      "People at ₹15 LPA are often evaluating their first significant city upgrade — moving to a premium flat, adding a vehicle, or building savings for a home down payment. These goals require the full budget picture, not just in-hand. Add your actual rent and spend tier in the Salary Reality Check to see how much is actually left after living costs at this income level.",
    ],
    faq: [
      {
        question: "Why does income tax appear at ₹15 LPA but not at ₹12 LPA?",
        answer:
          "The Section 87A rebate (up to ₹60,000) applies only when taxable income is ₹12L or below under the new regime (FY 2026-27). At ₹15L gross, income above ₹12L becomes taxable. The TDS spread in the breakdown above reflects the incremental tax on that portion.",
      },
      {
        question: "Is the old tax regime worth switching to at ₹15 LPA?",
        answer:
          "Potentially yes — if you can claim HRA exemption (metro rent of ₹40k–₹60k/month), ₹1.5L under 80C, and ₹50k under NPS Section 80CCD(1B), your old-regime taxable income drops enough to reduce annual tax meaningfully. Run the tax regime calculator with your exact deductions to see the crossover point.",
      },
      {
        question: "What home loan amount can I expect to be eligible for at ₹15 LPA?",
        answer:
          "Lenders typically sanction home loans at 4–5x annual gross salary under standard underwriting, implying eligibility in the ₹60L–₹75L range at ₹15L gross. The actual sanction depends on your credit score, existing EMIs, co-applicant income, and property valuation. Your net monthly income after existing obligations determines how much EMI the bank will allow — confirm directly with your lender.",
      },
    ],
  },
  {
    slug: "16-lpa-in-hand-salary",
    lpa: 16,
    seo: {
      title: "16 LPA In-Hand Salary: ₹1,21,700/month (FY 2026-27)",
      description:
        "16 LPA का मतलब: ~₹1,21,700/month in-hand (FY 2026-27, नई regime). Monthly take-home, PF, TDS breakdown for ₹16 lakh salary — old vs new regime comparison included.",
      keywords: ["16 LPA in hand", "16 lakh salary monthly", "16 LPA take home India", "CTC 16 LPA monthly net"],
    },
    scenario: baseScenario(16),
    scenarioNotes: ["₹16 LPA = ₹16,00,000 gross per year. Taxable income after standard deduction = ₹15.25L."],
    angleParagraph:
      "At ₹16 LPA, income tax becomes a genuine monthly line item. This is the band where building a focused regime comparison — old vs new — delivers real value. If you pay ₹20,000+/month in rent and maximize 80C, the old regime may outperform despite higher marginal rates.",
    bandInsights: [
      "Annual tax under new regime: approx ₹1,55,000–₹1,65,000 (incl. cess) on ₹15.25L taxable; ~₹13,000–₹14,000 TDS/month.",
      "Old regime worth modelling if: HRA deduction ≥ ₹18k/month + 80C ₹1.5L + NPS ₹50k.",
      "ESOP or RSU grants at this level? Perquisite tax on exercise and sale can dwarf salary tax — see the income tax calculator for a fuller picture.",
      "₹1.21L/month in-hand supports EMIs, savings, and rent simultaneously in most cities — use the Salary Reality Check for a city-specific breakdown.",
    ],
    faq: [
      {
        question: "What is 16 LPA in-hand per month (FY 2026-27)?",
        answer:
          "~₹1,21,700/month under the new tax regime. Annual tax approx ₹1,60,000 on ₹15.25L taxable income. Monthly: PF ₹1,800 + PT ~₹208 + TDS ~₹13,300. Use the calculator above with your actual Basic+DA for a payslip-accurate number.",
      },
      {
        question: "How much more is 16 LPA take-home compared to 15 LPA?",
        answer:
          "~₹6,800/month more in-hand (₹1,21,700 vs ₹1,14,900). The ₹1L extra gross is partially consumed by incremental income tax in the 20% slab — your effective take-home per additional rupee of gross is about 82 paise at this band (new regime).",
      },
    ],
  },
  {
    slug: "17-lpa-in-hand-salary",
    lpa: 17,
    seo: {
      title: "17 LPA In-Hand Salary: ₹1,28,600/month (FY 2026-27)",
      description:
        "17 LPA का मतलब: ~₹1,28,600/month in-hand (FY 2026-27, नई regime). Monthly take-home for ₹17 lakh salary — PF, TDS, PT and free CTC to net calculator.",
      keywords: ["17 LPA in hand", "17 lakh salary monthly", "17 LPA take home India", "CTC 17 LPA net salary"],
    },
    scenario: baseScenario(17),
    scenarioNotes: ["₹17 LPA = ₹17,00,000 gross per year. Taxable income after standard deduction = ₹16.25L."],
    angleParagraph:
      "₹17 LPA sits in the 20% new-regime slab — effective tax rate is rising but still far from the 30% bracket that begins at ₹15L taxable. This is a useful anchor for professionals comparing mid-senior offers or evaluating whether a ₹2–3L hike is worth switching employers.",
    bandInsights: [
      "Annual tax under new regime: approx ₹1,80,000–₹1,92,000 (incl. cess) on ₹16.25L taxable; ~₹15,000–₹16,000 TDS/month.",
      "At ₹17L, a ₹2L raise (to ₹19L) increases gross by 11% but in-hand by only ~₹1L (post-tax increment shrinks).",
      "Appraisal negotiation: ask for the raise in gross, not CTC. Employer PF and gratuity embedded in CTC inflate the headline without changing your take-home.",
      "Gratuity eligibility starts at 5 years of service — at ₹17L, gratuity accrual is ~₹81,700/year; model exit timing.",
    ],
    faq: [
      {
        question: "What is 17 LPA in-hand per month in India?",
        answer:
          "~₹1,28,600/month under the new tax regime (FY 2026-27). Annual income tax approx ₹1,86,000 on ₹16.25L taxable income. Monthly deductions: PF ₹1,800 + PT ~₹208 + TDS ~₹15,500.",
      },
      {
        question: "Is there a big jump from ₹15 LPA to ₹17 LPA in take-home?",
        answer:
          "The gross jump is ₹2L/year (13%), but in-hand increases by ~₹13,700/month (₹1,28,600 vs ₹1,14,900). After tax absorption, each additional LPA at this band adds roughly ₹6,800–₹7,000/month to your take-home. Worth negotiating for, but manage expectations — a ₹2L raise is not ₹16,667/month extra in-hand.",
      },
    ],
  },
  {
    slug: "18-lpa-in-hand-salary",
    lpa: 18,
    seo: {
      title: "18 LPA In-Hand Salary: ₹1,35,400/month (FY 2026-27)",
      description:
        "18 LPA का मतलब: ₹1,35,400/month in-hand (FY 2026-27, नई regime). 18 lakh gross to take-home — monthly PF, TDS, PT breakdown. Tune Basic+DA for your payslip.",
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
    faq: [
      {
        question: 'How much income tax do I pay at ₹18 LPA under the new regime?',
        answer:
          'Annual income tax at ₹18L gross (new regime, FY 2026-27) is roughly ₹1.5L–₹1.7L as shown in the breakdown table. The exact amount depends on your actual Basic+DA and taxable allowances — open the tax calculator with your payslip inputs for a precise figure. No surcharge applies at this gross for salary-only income.',
      },
      {
        question: 'Does my employee PF contribution reduce income tax at ₹18 LPA?',
        answer:
          'Under the new regime, employee PF is not an income tax deduction — it reduces your cash but not taxable income. Under the old regime, PF counts toward 80C (₹1.5L ceiling). If your annual PF plus other 80C investments already hit ₹1.5L, additional PF gives no further old-regime tax benefit.',
      },
      {
        question: "How does ₹18 LPA compare to the median Indian salary?",
        answer:
          "India's national median formal-sector salary is estimated at roughly ₹4L–₹6L annually. ₹18 LPA places you in approximately the top 5–8% of salaried earners across the formal economy. Within the organized IT and services sector specifically, ₹18L sits above junior roles and below senior IC or lead levels — it is a competitive mid-level anchor for 5–8 years of experience in major metros.",
      },
    ],
  },
  {
    slug: "19-lpa-in-hand-salary",
    lpa: 19,
    seo: {
      title: "19 LPA In-Hand Salary: ₹1,42,000/month (FY 2026-27)",
      description:
        "19 LPA का मतलब: ~₹1,42,000/month in-hand (FY 2026-27, नई regime). Monthly take-home for ₹19 lakh salary — PF, TDS breakdown and free CTC to net salary calculator.",
      keywords: ["19 LPA in hand", "19 lakh salary monthly", "19 LPA take home India", "CTC 19 LPA net salary"],
    },
    scenario: baseScenario(19),
    scenarioNotes: ["₹19 LPA = ₹19,00,000 gross per year. Taxable income after standard deduction = ₹18.25L."],
    angleParagraph:
      "₹19 LPA is a common appraisal destination from ₹16–18 LPA. At this gross, the 20% and 30% slabs overlap at the margin — understanding your effective tax rate (not marginal rate) matters more than worrying about the slab number.",
    bandInsights: [
      "Annual tax under new regime at ₹19L: approx ₹2,25,000–₹2,40,000 (incl. cess); TDS spread ~₹19,000/month.",
      "The effective tax rate at ₹19L is roughly 14–15% of gross — not 30%, which is only the marginal rate on income above ₹15L.",
      "Appraisal jump from ₹18 to ₹19 LPA: in-hand rises ~₹6,600/month after tax — a meaningful but not dramatic change.",
      "Salary negotiation anchor: if counter-offering at ₹19 vs ₹18 LPA, the monthly cash difference is ~₹6,600 — factor this into your decision-making.",
    ],
    faq: [
      {
        question: "What is 19 LPA in-hand per month (FY 2026-27)?",
        answer:
          "~₹1,42,000/month under the new tax regime. Annual income tax approx ₹2,32,500 on ₹18.25L taxable income. Monthly: PF ₹1,800 + PT ~₹208 + TDS ~₹19,375.",
      },
      {
        question: "How much more is 19 LPA take-home vs 18 LPA?",
        answer:
          "~₹6,600/month more in-hand (₹1,42,000 vs ₹1,35,400). The ₹1L gross increment is partially absorbed by the 30% marginal slab applying to income above ₹15L taxable. Your effective per-rupee take-home at this band is ~79 paise on each extra rupee of gross.",
      },
    ],
  },
  {
    slug: "20-lpa-in-hand-salary",
    lpa: 20,
    seo: {
      title: "20 LPA In-Hand Salary: ₹1,48,600/month (FY 2026-27)",
      description:
        "20 LPA का मतलब: ₹1,48,600/month in-hand (FY 2026-27, नई regime). 20 lakh gross to take-home — PF, TDS, PT breakdown. Surcharge not modeled; use as directional estimate.",
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
    faq: [
      {
        question: 'Why is my ₹20 LPA in-hand lower than I expected?',
        answer:
          'At ₹20L gross, both income tax (new regime kicks in above ₹12L rebate limit) and PF deductions are meaningful. Employee PF on a 45% Basic assumption is roughly ₹7,200/month, and annual tax adds another significant monthly TDS spread. Many people see only one deduction and underestimate the combined impact.',
      },
      {
        question: 'Does an NPS contribution improve my ₹20 LPA in-hand under the new regime?',
        answer:
          'Under the new regime, NPS contributions via Section 80CCD are not available as deductions — they do not reduce your taxable income. If your employer contributes to NPS via Section 80CCD employer share (up to 10% of Basic+DA), that amount is separately non-taxable as a perquisite. Ask HR whether your CTC includes an employer NPS component.',
      },
      {
        question: "Do I need to pay advance tax at ₹20 LPA?",
        answer:
          "If your employer correctly deducts TDS on salary, advance tax is generally not required for salary-only income — TDS acts as advance tax. You only need to pay advance tax separately if your total annual tax liability (after TDS) exceeds ₹10,000, which can happen if you have interest income, capital gains, or freelance receipts in the same year. Track all income sources, not just salary.",
      },
    ],
  },
  {
    slug: "25-lpa-in-hand-salary",
    lpa: 25,
    seo: {
      title: "25 LPA In-Hand Salary: ₹1,79,700/month (FY 2026-27)",
      description:
        "₹1,79,700/month in-hand on ₹25 LPA gross (new regime, FY 2026-27). Transparent PF and TDS breakdown. Surcharge not modeled — directional planning only.",
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
    faq: [
      {
        question: 'Does surcharge apply at ₹25 LPA gross?',
        answer:
          "Surcharge applies when total taxable income exceeds ₹50L. Salary alone at ₹25L gross does not trigger surcharge — but if bonuses, RSU vesting, capital gains, or rental income push your total income above ₹50L in a financial year, the 10% surcharge tier activates. This page's engine does not model surcharge; validate with your Form 16.",
      },
      {
        question: 'Should I negotiate a lower Basic+DA at ₹25 LPA to increase in-hand?',
        answer:
          'Lowering Basic+DA reduces employee PF deduction and increases monthly cash, but also reduces your EPF corpus growth and gratuity accrual. At ₹25 LPA over a multi-year tenure, the EPF and gratuity side can be meaningful wealth. Weigh short-term cash against long-term accumulation before asking HR to restructure.',
      },
      {
        question: "What is my effective income tax rate at ₹25 LPA under the new regime?",
        answer:
          "At ₹25L gross under the new regime with salary-only income, the effective tax rate is roughly 12–14% of gross — approximately ₹3L–₹3.5L in annual income tax. The marginal rate on income above ₹20L is 30%, but slabs below that are taxed at lower rates, pulling the effective rate down. No surcharge applies until total taxable income from all sources exceeds ₹50L.",
      },
    ],
  },
  {
    slug: "30-lpa-in-hand-salary",
    lpa: 30,
    seo: {
      title: "30 LPA In-Hand Salary: ₹2,08,300/month (FY 2026-27)",
      description:
        "₹2,08,300/month in-hand on ₹30 LPA gross (new regime, FY 2026-27). Directional estimate — surcharge and perquisites out of scope. Validate with Form 16.",
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
    faq: [
      {
        question: 'Is surcharge already deducted from my payslip at ₹30 LPA?',
        answer:
          'If your total taxable income from all sources exceeds ₹50L in a financial year, your employer should compute TDS including the 10% surcharge. However, employers sometimes reconcile this at year-end rather than monthly. Cross-check your Form 16 Part A and consult a CA to confirm correct TDS treatment — underpaid TDS can result in advance tax interest.',
      },
      {
        question: 'How far off is this estimate from my real ₹30 LPA payslip?',
        answer:
          'If surcharge applies, your RSU vests are large, or your pay structure differs from a simple gross assumption, the actual annual tax can be ₹80k–₹1.5L higher than the illustrated TDS spread. Use this page for the shape of deductions and validate the absolute numbers with Form 16 and a tax professional.',
      },
      {
        question: "Should I hire a CA for ITR filing at ₹30 LPA?",
        answer:
          "For salary-only income, ITR filing at ₹30L is manageable without a CA using the tax portal or reputable tax tools. A CA becomes advisable when you have RSU vesting, capital gains, NPS, home loan interest, or multiple income sources in the same year — because cross-income optimization (timing RSU sales, advance tax coordination, AIS reconciliation) is where professional advice pays for itself.",
      },
    ],
  },
  {
    slug: "35-lpa-in-hand-salary",
    lpa: 35,
    seo: {
      title: "35 LPA In-Hand Salary: ₹2,37,000/month (FY 2026-27)",
      description:
        "35 LPA का मतलब: ₹2,37,000/month in-hand (FY 2026-27, नई regime, directional). 35 lakh gross to take-home — PF, TDS, PT breakdown. Validate with Form 16 and a CA.",
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
    faq: [
      {
        question: 'How far off is the ₹35 LPA estimate from my real payslip?',
        answer:
          'Potentially by ₹1L–₹2.5L annually if surcharge applies, your package includes large RSU vests or bonuses, or your employer uses a different salary structure. This page gives you the shape of deductions — not a filing-accurate number. Validate with Form 16 and a CA before advance tax or ITR.',
      },
      {
        question: 'Should I file ITR under old or new regime at ₹35 LPA?',
        answer:
          "This is a genuine financial planning decision that depends on home loan interest, HRA, NPS, and 80C. The old regime's deduction menu can still outperform at ₹35L if your deductions are substantial. Use the tax regime calculator for a directional comparison, then confirm with a CA before your regime declaration deadline.",
      },
      {
        question: 'Is ₹35 LPA a good salary in India in 2026?',
        answer:
          '₹35 LPA puts you in the top 1–2% of salaried earners in India by gross income. In most cities, ₹2,37,000/month in-hand provides genuine financial comfort — quality housing, real savings capacity, and investment headroom. Whether it feels "good" depends on your city, family size, and lifestyle expectations. In Bengaluru or Hyderabad, ₹35 LPA is excellent. In Mumbai or Delhi with premium rent, it is comfortable but not lavish.',
      },
      {
        question: 'Is ₹35 LPA a good salary in Bangalore?',
        answer:
          '₹35 LPA is very good in Bengaluru. At ~₹2,37,000/month in-hand (new regime, Karnataka PT ₹200/month), you can afford a premium 2BHK in Koramangala or Indiranagar (₹45–60k rent), build meaningful savings, and have discretionary spend. It is senior-IC or tech-lead territory — a marker of strong career trajectory in the Bengaluru tech ecosystem.',
      },
      {
        question: '35 LPA ka matlab kya hota hai? Monthly in-hand kitni hogi?',
        answer:
          '35 LPA yani ₹35,00,000 saalana gross CTC. Is par monthly in-hand lagbhag ₹2,37,000 hoti hai (nayi tax regime, FY 2026-27). Har mahine gross: ₹2,91,667. Deductions: PF ~₹1,800, income tax TDS ~₹52,650. Yeh ek senior-level salary hai — India ke top earners mein aate hain.',
      },
    ],
  },
  {
    slug: "40-lpa-in-hand-salary",
    lpa: 40,
    seo: {
      title: "40 LPA In-Hand Salary: ₹2,65,700/month (FY 2026-27)",
      description:
        "40 LPA का मतलब: ~₹2,65,700/month in-hand (FY 2026-27, नई regime). 40 lakh gross to take-home — PF, TDS, PT breakdown. Directional estimate; surcharge not modeled.",
      keywords: ["40 LPA in hand", "40 lakh salary take home India", "40 LPA monthly net India", "40lpa meaning"],
    },
    scenario: baseScenario(40),
    scenarioNotes: [
      "₹40 LPA = ₹40,00,000 gross per year. Taxable income after standard deduction = ₹39.25L.",
      "No surcharge at this gross (below ₹50L taxable income threshold) — tax is computed at slab rates only.",
    ],
    angleParagraph:
      "Forty LPA is a senior IC or early-leadership milestone in Indian tech and financial services. Unlike lower bands, the tax deduction here is substantial — roughly ₹7.9L annually (pre-cess) — making regime choice and deduction optimization genuinely meaningful rather than academic.",
    bandInsights: [
      "Annual tax under new regime: ~₹7,87,800 (including 4% cess). Monthly TDS spread: ~₹65,650.",
      "Old regime comparison matters at ₹40L: HRA + home loan interest + NPS can together reduce taxable income by ₹5–8L, potentially saving ₹1.5–2L in annual tax.",
      "RSU vests and joining bonuses are taxed as perquisites or salary income — they spike the effective TDS in the vesting/receipt month. Many employees at this band see uneven monthly in-hand for this reason.",
      "At ₹40 LPA, the question shifts from 'how much tax?' to 'which deductions am I missing?' — engage a CA or a structured regime comparison before your April declaration.",
    ],
    realityCheckParagraphs: [
      "Forty LPA is where monthly cash flow stops being the only financial concern. The illustrated in-hand of ~₹2,65,700/month is substantial for individual spend, but at this income level wealth accumulation — EPF, ESOP vesting schedules, NPS, real estate equity — typically contributes more to net worth over a career than monthly surplus alone.",
      "For most employees at ₹40 LPA, the most impactful salary optimization is the annual regime declaration, not payroll mechanics. If you claim HRA (metro rent ≥ ₹50,000/month), home loan interest (₹2L deduction), and full 80C (₹1.5L), the old regime can save ₹1.5–2.5L annually compared to new regime at this gross. The tax regime calculator can model this — but use actual rent receipts and home loan statements, not estimates.",
      "The PF deduction shown here (₹1,800/month) is the statutory minimum calculation on capped PF wage. Many employees at ₹40 LPA negotiate lower Basic+DA explicitly to minimize PF deduction, trading long-term corpus for short-term cash. Neither choice is wrong — but be clear about the trade-off before accepting a salary structure.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 40 LPA in India (FY 2026-27)?",
        answer:
          "~₹2,65,700/month under the new tax regime. Annual income tax is approximately ₹7,87,800 (including 4% cess). Deductions: employee PF ₹1,800/month + professional tax ~₹208/month. Actual payslip may differ based on your Basic+DA split, state PT, and any RSU or bonus perquisites.",
      },
      {
        question: "40 LPA ka matlab kya hota hai? In-hand kitni hogi?",
        answer:
          "40 LPA yani ₹40,00,000 saalana gross CTC. FY 2026-27 mein nai tax regime ke hisab se, estimated in-hand salary lagbhag ₹2,65,700 per maah hoti hai — employee PF (₹1,800) aur professional tax (₹208) deduct karne ke baad. Actual salary aapke employer ki salary structure par depend karti hai.",
      },
      {
        question: "Should I choose old or new regime at ₹40 LPA?",
        answer:
          "At ₹40L, the regime choice is not trivial. If you claim metro HRA (₹40,000–₹60,000/month rent), home loan interest (₹2L deduction), and full 80C (₹1.5L), the old regime can save ₹1.5–2.5L annually. If you have few deductions, the new regime is simpler. Use the tax regime calculator with your actual deductions — don't default without checking.",
      },
    ],
  },
  {
    slug: "45-lpa-in-hand-salary",
    lpa: 45,
    seo: {
      title: "45 LPA In-Hand Salary: ₹2,94,300/month (FY 2026-27)",
      description:
        "45 LPA का मतलब: ~₹2,94,300/month in-hand (FY 2026-27, नई regime). 45 lakh gross to monthly take-home — TDS, PF breakdown. Directional estimate; validate with Form 16.",
      keywords: ["45 LPA in hand", "45 lakh salary take home India", "45 LPA monthly net", "45lpa meaning"],
    },
    scenario: baseScenario(45),
    scenarioNotes: [
      "₹45 LPA = ₹45,00,000 gross per year. Taxable income after standard deduction = ₹44.25L.",
      "No surcharge at this gross (taxable income below ₹50L threshold).",
    ],
    angleParagraph:
      "₹45 LPA is a common destination for senior engineers (L6/L7 equivalents), directors, and principals in tech. Tax at this gross is ~₹9.44L annually under the new regime — the monthly TDS bite of ~₹78,650 is significant enough that regime optimization and deduction planning can add ₹1–2L back into your year.",
    bandInsights: [
      "Annual tax under new regime: ~₹9,43,800 (including 4% cess). Monthly TDS spread: ~₹78,650.",
      "Old regime at ₹45L: with full 80C + substantial HRA + home loan interest, deductions can reduce taxable income by ₹5–10L — potentially saving ₹2–3L annually vs new regime.",
      "At ₹45 LPA in metro cities, equity compensation (ESOPs, RSUs) often represents a large fraction of total CTC — this page models only the fixed salary gross.",
      "VPF as a tax strategy: under the new regime, VPF saves zero income tax but builds a tax-free EPF corpus. Under old regime, VPF counts toward 80C only up to ₹1.5L ceiling already filled by PPF/ELSS/insurance.",
    ],
    realityCheckParagraphs: [
      "At ₹45 LPA, the monthly in-hand of ~₹2,94,300 is above what most household expenses require in even high-cost metro living — which means the real question is about savings rate and wealth allocation, not sufficiency. This page shows statutory deductions only; your actual wealth build depends on EPF balance, equity vesting, and investment decisions that happen outside the payslip.",
      "Tax planning at this income level rewards investment in professional advice. The difference between an optimized and an unoptimized tax declaration at ₹45L can be ₹1.5–3L annually — one fee-only financial planner session typically pays for itself many times over at this income.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 45 LPA in India (FY 2026-27)?",
        answer:
          "~₹2,94,300/month under the new tax regime. Annual income tax approximately ₹9,43,800 (including cess). Deductions: employee PF ₹1,800/month + PT ~₹208/month. Payslip values vary with salary structure, RSU vests, and bonus perquisites.",
      },
      {
        question: "45 LPA ka matlab kya hai? Monthly in-hand kitni hoti hai?",
        answer:
          "45 LPA matlab ₹45 lakh saalana gross. FY 2026-27 mein nai regime se in-hand lagbhag ₹2,94,300 per maah — PF aur tax deduct karne ke baad. Ye ek estimate hai; aapki actual salary employer ki structure par depend karegi.",
      },
      {
        question: "Does surcharge apply at ₹45 LPA under the new regime?",
        answer:
          "No surcharge at ₹45L gross for salary-only income under the new regime. The surcharge threshold triggers when taxable income (after standard deduction) exceeds ₹50L. At ₹45L gross, taxable income is approximately ₹44.25L — below the ₹50L surcharge trigger. However, if you receive a large bonus or RSU vest in the same year pushing total income above ₹50L, surcharge applies on that increment.",
      },
    ],
  },
  {
    slug: "50-lpa-in-hand-salary",
    lpa: 50,
    seo: {
      title: "50 LPA In-Hand Salary: ₹3,23,000/month (FY 2026-27)",
      description:
        "50 LPA का मतलब: ~₹3,23,000/month in-hand (FY 2026-27, नई regime, no surcharge at this gross). 50 lakh salary take-home breakdown — TDS, PF, PT. Validate with Form 16.",
      keywords: ["50 LPA in hand", "50 lakh salary take home India", "50 LPA monthly net", "50lpa meaning"],
    },
    scenario: baseScenario(50),
    scenarioNotes: [
      "₹50 LPA = ₹50,00,000 gross per year. Taxable income after standard deduction = ₹49.25L.",
      "Taxable income is below the ₹50L surcharge threshold — no surcharge in this illustration.",
      "If total income (salary + other sources) exceeds ₹50L, surcharge of 10% applies on tax — this model does not capture that scenario.",
    ],
    angleParagraph:
      "Fifty LPA is a senior leadership or deep-specialist level that places you in approximately the top 0.5–1% of salaried earners in India's formal economy. The illustrated in-hand of ~₹3,23,000/month is after new-regime tax of roughly ₹11L annually — old regime with significant deductions may materially change this picture.",
    bandInsights: [
      "Annual tax under new regime: ~₹10,99,800 (including 4% cess). Monthly TDS spread: ~₹91,650.",
      "Surcharge boundary: taxable income of ₹49.25L sits just below the ₹50L surcharge trigger. A small bonus or interest income can push total income over ₹50L and add 10% surcharge on the full tax — this creates a marginal rate cliff that professional tax planning specifically addresses.",
      "At ₹50 LPA, the salary structure negotiation (Basic+DA split, allowances, NPS employer contribution) has meaningful tax consequences — unlike lower bands where structure mainly affects PF, not tax.",
      "Old regime evaluation: home loan deductions, NPS (employer 80CCD and Section 80CCD(1B) both available under old regime), and HRA can reduce taxable income significantly. With ₹5–10L of legitimate deductions, old regime can save ₹2–3.5L vs new regime annually.",
    ],
    realityCheckParagraphs: [
      "Fifty LPA produces a monthly in-hand that comfortably covers high-cost metro living, premium housing, and substantial discretionary spending. The financial challenges at this level shift from cash flow to complexity: multiple income streams (salary, ESOP vests, capital gains, interest), advance tax obligations, and the surcharge boundary all require active management rather than passive payroll reliance.",
      "The SalaryExit engine used here is simplified and directional at this income level. It does not model surcharge, perquisite valuation (car, ESOP), non-salary income, or employer NPS contributions. For a filing-accurate picture, use Form 16 and a CA. Use this page for understanding the shape of your salary deductions — PF, PT, and approximate TDS — not for ITR planning.",
      "At ₹50 LPA, the most impactful monthly cash flow lever is often not the salary structure but the advance tax schedule. Many employees at this gross underestimate their TDS (especially if year includes ESOP vests) and face a large Q4 recovery deduction. If you have RSUs vesting or interest income, project full-year income by February and adjust employer TDS or pay advance tax before March 15.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for 50 LPA in India (FY 2026-27)?",
        answer:
          "~₹3,23,000/month under the new tax regime, assuming salary-only income stays below the ₹50L surcharge threshold. Annual income tax ~₹10,99,800 (including cess). Deductions: PF ₹1,800/month + PT ~₹208/month. Validate against your Form 16 — this is a directional estimate.",
      },
      {
        question: "50 LPA ka matlab kya hota hai? In-hand salary kitni hoti hai?",
        answer:
          "50 LPA matlab ₹50,00,000 saalana gross CTC. FY 2026-27 mein nai tax regime se in-hand lagbhag ₹3,23,000 per maah hoti hai — PF (₹1,800) aur income tax TDS (~₹91,650/month) deduct karne ke baad. Ye estimate hai; actual payslip aapki salary structure aur bonuses par depend karegi.",
      },
      {
        question: "Does surcharge apply at ₹50 LPA?",
        answer:
          "At ₹50L gross, taxable income (after ₹75,000 standard deduction) is ~₹49.25L — just below the ₹50L surcharge trigger. Salary-only income at this gross typically avoids surcharge. However, if you receive any interest income, rental income, capital gains, or RSU vests in the same year pushing total income above ₹50L, 10% surcharge applies on income tax for that portion. Track all income sources, not just salary.",
      },
      {
        question: "Old regime vs new regime at ₹50 LPA — which is better?",
        answer:
          "This depends heavily on your actual deductions. If you claim HRA (metro rent ≥ ₹60,000/month), home loan interest (₹2L), full 80C (₹1.5L), and NPS 80CCD(1B) (₹50,000), your deductions can total ₹5–8L, potentially saving ₹2–3.5L annually vs the new regime. At ₹50L, this calculation is worth a fee-only planner session. Don't default to new regime without running the numbers.",
      },
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
