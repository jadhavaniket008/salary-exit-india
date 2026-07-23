/**
 * Guide hubs and articles — metadata + routing. Body content lives in components.
 */

import { ROUTES } from "@/lib/routes";
import type { SeoPageMetadata } from "@/types/seo";

export type GuideHubId = "salary" | "tax" | "jobSwitch";

export type GuideArticleMeta = {
  hub: GuideHubId;
  segment: string;
  title: string;
  description: string;
  keywords: string[];
  /** Calculator routes to feature in-article */
  relatedCalculatorPaths: string[];
};

/** Display on guide pages when content was last substantively revised */
export const GUIDE_CONTENT_AS_OF_DATE = "24 June 2026";
export const GUIDE_CONTENT_AS_OF_ISO = "2026-06-24";

export const GUIDE_HUBS: Record<
  GuideHubId,
  { path: string; title: string; description: string; seo: SeoPageMetadata }
> = {
  salary: {
    path: ROUTES.salaryGuides,
    title: "Salary guides (India)",
    description:
      "Plain-English explainers on Indian salary structure, components, and what moves your in-hand pay — with links to calculators.",
    seo: {
      title: "Salary guides for India — structure, CTC, and in-hand pay",
      description:
        "Understand salary structure in India, what affects in-hand salary, and how to interpret payslip components. Linked to free calculators.",
      keywords: ["India salary structure", "CTC meaning", "in-hand salary", "Basic HRA"],
    },
  },
  tax: {
    path: ROUTES.taxGuides,
    title: "Tax guides (India)",
    description:
      "Foundational tax explainers for salaried employees — focused on clarity, not filing software.",
    seo: {
      title: "Income tax guides for salaried employees in India",
      description:
        "Old vs new tax regime basics for Indian salaried income — educational context with calculator links. Not tax advice.",
      keywords: ["old vs new tax regime India", "Section 87A", "new tax regime 115BAC"],
    },
  },
  jobSwitch: {
    path: ROUTES.jobSwitchGuides,
    title: "Job switch & exit guides",
    description:
      "Notice buyouts, gratuity, leave encashment, and offer comparison — what to verify beyond headline CTC.",
    seo: {
      title: "Job switch & exit guides — notice period, gratuity, offers",
      description:
        "Practical explainers on notice buyouts, gratuity, and comparing offers in India — with assumptions called out and calculator links.",
      keywords: ["notice buyout India", "gratuity calculation", "compare job offers"],
    },
  },
};

export const GUIDE_ARTICLES: readonly GuideArticleMeta[] = [
  {
    hub: "salary",
    segment: "salary-structure-in-india",
    title: "Salary structure in India explained (CTC vs in-hand)",
    description:
      "How Indian salary offers are structured: Basic, allowances, PF, and why CTC is not your bank credit.",
    keywords: ["salary structure India", "CTC components", "Basic salary", "allowances"],
    relatedCalculatorPaths: [
      ROUTES.ctcToInHandCalculator,
      ROUTES.salaryCalculator,
      ROUTES.epfCalculator,
    ],
  },
  {
    hub: "salary",
    segment: "what-affects-in-hand-salary",
    title: "What affects in-hand salary in India (beyond the CTC number)",
    description:
      "The main deductions and policy choices that change take-home: PF, PT, income tax regime, and timing effects.",
    keywords: ["in-hand salary", "PF deduction", "professional tax", "TDS"],
    relatedCalculatorPaths: [
      ROUTES.ctcToInHandCalculator,
      ROUTES.salaryCalculator,
      ROUTES.oldVsNewTaxRegimeCalculator,
    ],
  },
  {
    hub: "salary",
    segment: "what-reduces-your-in-hand-salary",
    title: "What reduces your in-hand salary in India (deductions, in order of impact)",
    description:
      "A straight list of what eats take-home — PF, professional tax, TDS, recoveries — and where to model each one with calculators.",
    keywords: [
      "why in-hand less than CTC",
      "salary deductions India",
      "take home less than expected",
      "TDS PF salary",
    ],
    relatedCalculatorPaths: [
      ROUTES.ctcToInHandCalculator,
      ROUTES.salaryCalculator,
      ROUTES.oldVsNewTaxRegimeCalculator,
      ROUTES.epfCalculator,
    ],
  },
  {
    hub: "salary",
    segment: "how-to-judge-if-a-salary-is-good-in-india",
    title: "How to judge if a salary is good in India (practical framework)",
    description:
      "A plain checklist: in-hand vs fixed costs, city rent, lifestyle, loans, and variable pay — so “good” means good for you, not for a headline.",
    keywords: [
      "is my salary good India",
      "good salary India",
      "CTC vs in-hand India",
      "salary enough India",
    ],
    relatedCalculatorPaths: [
      ROUTES.salaryRealityCheck,
      ROUTES.ctcToInHandCalculator,
      ROUTES.offerComparisonCalculator,
    ],
  },
  {
    hub: "salary",
    segment: "how-rent-changes-your-monthly-savings",
    title: "How rent changes your monthly savings (after tax, after fixed spend)",
    description:
      "Why rent hits savings harder than a higher CTC headline suggests, and how to see the trade-off with a pre-filled budget model.",
    keywords: ["rent vs savings India", "salary rent savings", "monthly savings rent", "Bengaluru rent savings"],
    relatedCalculatorPaths: [ROUTES.salaryRealityCheck, ROUTES.ctcToInHandCalculator],
  },
  {
    hub: "salary",
    segment: "how-much-salary-you-need-in-bangalore",
    title: "How much salary you need in Bangalore (Bengaluru) — a realistic way to think about it",
    description:
      "Why there is no magic LPA number, what usually drives the answer (rent + household), and how to stress-test your gross with city-specific scenarios.",
    keywords: [
      "how much salary Bangalore",
      "Bengaluru salary enough",
      "Bangalore rent salary",
      "LPA Bangalore living cost",
    ],
    relatedCalculatorPaths: [ROUTES.salaryRealityCheck, ROUTES.ctcToInHandCalculator],
  },
  {
    hub: "salary",
    segment: "how-much-salary-you-need-in-pune",
    title: "How much salary you need in Pune — rent, commute, and what “enough” means",
    description:
      "Pune is not one rental market. Here is how to translate CTC into monthly cash, then compare it to rent and lifestyle without generic cost-of-living fluff.",
    keywords: ["how much salary Pune", "Pune IT salary enough", "Pune rent salary", "LPA Pune"],
    relatedCalculatorPaths: [ROUTES.salaryRealityCheck, ROUTES.ctcToInHandCalculator],
  },
  {
    hub: "salary",
    segment: "pf-withdrawal-rules-explained",
    title: "PF withdrawal rules in India (2026): what's tax-free and what isn't",
    description:
      "Full withdrawal, partial advances, the EPS pension component, and the 5-year rule that decides whether your EPF withdrawal is taxed — explained with the mistakes that cost people the most.",
    keywords: [
      "PF withdrawal rules",
      "EPF withdrawal tax",
      "PF withdrawal after resignation",
      "EPS pension withdrawal",
    ],
    relatedCalculatorPaths: [ROUTES.epfCalculator, ROUTES.finalSettlementCalculator],
  },
  {
    hub: "tax",
    segment: "old-vs-new-tax-regime-basics",
    title: "Old vs new tax regime in India: basics for salaried employees",
    description:
      "A readable overview of how regime choice interacts with deductions — and why “lower tax on paper” is not automatic.",
    keywords: ["old tax regime", "new tax regime", "115BAC", "standard deduction"],
    relatedCalculatorPaths: [
      ROUTES.oldVsNewTaxRegimeCalculator,
      ROUTES.hraCalculator,
      ROUTES.salaryCalculator,
    ],
  },
  {
    hub: "tax",
    segment: "how-to-read-form-16",
    title: "How to read Form 16 line by line (Part A and Part B explained)",
    description:
      "What each line of Form 16 actually means, how to reconcile it with Form 26AS/AIS, and the common employer errors that cost salaried employees a tax notice or a lost refund.",
    keywords: [
      "how to read form 16",
      "form 16 part a part b",
      "form 16 vs 26AS",
      "form 16 explained",
    ],
    relatedCalculatorPaths: [ROUTES.salaryCalculator, ROUTES.oldVsNewTaxRegimeCalculator],
  },
  {
    hub: "tax",
    segment: "hra-exemption-rules-explained",
    title: "HRA exemption rules explained (the actual formula, not just the theory)",
    description:
      "The least-of-three HRA formula, metro vs non-metro city classification, paying rent to parents correctly, and why this exemption only exists under the old regime.",
    keywords: [
      "HRA exemption rules",
      "HRA exemption formula",
      "HRA metro non-metro",
      "HRA rent to parents",
    ],
    relatedCalculatorPaths: [ROUTES.hraCalculator, ROUTES.oldVsNewTaxRegimeCalculator],
  },
  {
    hub: "jobSwitch",
    segment: "leave-encashment-rules-and-tax",
    title: "Leave encashment rules and tax treatment in India",
    description:
      "Why leave encashment during service is fully taxed but encashment at resignation isn't — the four-way exemption limit, and the mistakes that shrink people's payout.",
    keywords: [
      "leave encashment rules",
      "leave encashment tax",
      "earned leave encashment",
      "leave encashment on resignation",
    ],
    relatedCalculatorPaths: [ROUTES.leaveEncashmentCalculator, ROUTES.finalSettlementCalculator],
  },
  {
    hub: "jobSwitch",
    segment: "final-settlement-checklist",
    title: "Final settlement checklist: what your employer owes you when you resign",
    description:
      "Every line item a full and final settlement should include, the statutory timeline, and what to verify before you sign the no-dues certificate.",
    keywords: [
      "full and final settlement",
      "final settlement checklist",
      "F&F settlement India",
      "no dues certificate",
    ],
    relatedCalculatorPaths: [
      ROUTES.finalSettlementCalculator,
      ROUTES.leaveEncashmentCalculator,
      ROUTES.gratuityCalculator,
    ],
  },
  {
    hub: "jobSwitch",
    segment: "how-notice-period-buyout-works",
    title: "How notice period buyout usually works (India)",
    description:
      "What a buyout is trying to approximate, common ways employers compute it, and what to verify in your contract.",
    keywords: ["notice buyout", "notice period salary deduction", "short notice"],
    relatedCalculatorPaths: [
      ROUTES.noticePeriodBuyoutCalculator,
      ROUTES.finalSettlementCalculator,
    ],
  },
  {
    hub: "jobSwitch",
    segment: "what-is-gratuity",
    title: "What is gratuity in India (and how estimates work)",
    description:
      "A straightforward overview of gratuity intent, common formula intuition, eligibility context, and tax caveats.",
    keywords: ["gratuity meaning", "15/26 formula", "gratuity eligibility India"],
    relatedCalculatorPaths: [ROUTES.gratuityCalculator, ROUTES.finalSettlementCalculator],
  },
  {
    hub: "jobSwitch",
    segment: "compare-job-offers-beyond-ctc",
    title: "How to compare job offers beyond CTC in India",
    description:
      "A checklist for comparing offers using in-hand, benefits, risk, and growth — not just the biggest CTC headline.",
    keywords: ["compare job offers", "CTC vs in-hand", "offer evaluation India"],
    relatedCalculatorPaths: [
      ROUTES.offerComparisonCalculator,
      ROUTES.ctcToInHandCalculator,
      ROUTES.salaryHikeCalculator,
    ],
  },
];

export function guideArticlePath(meta: GuideArticleMeta): string {
  return `${GUIDE_HUBS[meta.hub].path}/${meta.segment}`;
}

export function getGuideArticleByHubSegment(
  hub: GuideHubId,
  segment: string
): GuideArticleMeta | undefined {
  return GUIDE_ARTICLES.find((a) => a.hub === hub && a.segment === segment);
}

export function listArticlesForHub(hub: GuideHubId): GuideArticleMeta[] {
  return GUIDE_ARTICLES.filter((a) => a.hub === hub);
}
