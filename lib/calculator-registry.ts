import { ROUTES, type CalculatorSlug } from "@/lib/routes";
import type { SeoPageMetadata } from "@/types/seo";

export type CalculatorDefinition = {
  slug: CalculatorSlug;
  path: string;
  label: string;
  shortLabel: string;
  seo: SeoPageMetadata;
  /** Other slugs for cross-links */
  related: CalculatorSlug[];
};

const baseKeywords = [
  "India salary calculator",
  "in-hand salary",
  "tax regime",
  "PF",
  "HRA",
];

export const CALCULATOR_REGISTRY: Record<CalculatorSlug, CalculatorDefinition> = {
  salaryRealityCheck: {
    slug: "salaryRealityCheck",
    path: ROUTES.salaryRealityCheck,
    label: "Salary Reality Check",
    shortLabel: "Reality check",
    seo: {
      title: "Salary Reality Check — rent vs savings left",
      description:
        "India salaried: estimated in-hand after tax/PF from CTC, minus rent and realistic monthly spend bands — see real savings left and a plain verdict. Not a budget app or filing tool.",
      keywords: [
        ...baseKeywords,
        "salary savings India",
        "CTC rent calculator",
        "monthly savings after rent India",
        "real savings from salary",
      ],
    },
    related: ["ctcToInHand", "offerComparison", "salary"],
  },
  salary: {
    slug: "salary",
    path: ROUTES.salaryCalculator,
    label: "Salary & tax breakdown",
    shortLabel: "Salary",
    seo: {
      title: "Salary & tax breakdown calculator",
      description:
        "Estimate taxable income, TDS, PF, professional tax, and monthly in-hand salary for India (FY assumptions in-app). Not tax filing advice.",
      keywords: [...baseKeywords, "TDS estimate", "salary breakdown"],
    },
    related: ["salaryRealityCheck", "ctcToInHand", "taxRegime", "hra", "epf"],
  },
  ctcToInHand: {
    slug: "ctcToInHand",
    path: ROUTES.ctcToInHandCalculator,
    label: "CTC to in-hand",
    shortLabel: "CTC → in-hand",
    seo: {
      title: "CTC to in-hand salary calculator (India)",
      description:
        "Convert annual gross / CTC into estimated monthly take-home after PF, professional tax, and TDS spread. Indicative only.",
      keywords: [...baseKeywords, "CTC calculator", "take home salary"],
    },
    related: ["salaryRealityCheck", "salary", "taxRegime", "epf"],
  },
  taxRegime: {
    slug: "taxRegime",
    path: ROUTES.oldVsNewTaxRegimeCalculator,
    label: "Old vs new tax regime",
    shortLabel: "Tax regime",
    seo: {
      title: "Compare old vs new income tax (India salaried)",
      description:
        "Side-by-side estimated tax after standard deduction: old regime (80C/HRA you enter) vs new regime — see which leaves more cash after tax. Simplified 87A; surcharge not modeled; not for filing.",
      keywords: [
        ...baseKeywords,
        "115BAC",
        "old regime",
        "new regime",
        "old vs new tax which is better salaried",
      ],
    },
    related: ["salary", "hra", "ctcToInHand"],
  },
  hra: {
    slug: "hra",
    path: ROUTES.hraCalculator,
    label: "HRA exemption",
    shortLabel: "HRA",
    seo: {
      title: "HRA exemption calculator (Section 10(13A))",
      description:
        "Estimate HRA exemption using the three-part test (rent, salary %, actual HRA). Old-regime context; estimates only.",
      keywords: [...baseKeywords, "HRA exemption", "rent"],
    },
    related: ["taxRegime", "salary", "leaveEncashment"],
  },
  gratuity: {
    slug: "gratuity",
    path: ROUTES.gratuityCalculator,
    label: "Gratuity",
    shortLabel: "Gratuity",
    seo: {
      title: "Gratuity calculator (India)",
      description:
        "Estimate gratuity using the common (15/26) formula and rough tax-exempt band for covered employers. Not legal advice.",
      keywords: [...baseKeywords, "gratuity", "exit"],
    },
    related: ["finalSettlement", "noticeBuyout", "leaveEncashment"],
  },
  leaveEncashment: {
    slug: "leaveEncashment",
    path: ROUTES.leaveEncashmentCalculator,
    label: "Leave encashment",
    shortLabel: "Leave encash",
    seo: {
      title: "Leave encashment calculator (estimate)",
      description:
        "Estimate gross leave encashment from Basic+DA using a 26- or 30-day per-day rate. Tax rules vary; not payroll advice.",
      keywords: [...baseKeywords, "leave encashment", "unused leave"],
    },
    related: ["finalSettlement", "gratuity", "noticeBuyout"],
  },
  noticeBuyout: {
    slug: "noticeBuyout",
    path: ROUTES.noticePeriodBuyoutCalculator,
    label: "Notice period buyout",
    shortLabel: "Notice buyout",
    seo: {
      title: "Notice period buyout calculator",
      description:
        "Estimate notice buyout as gross monthly pay prorated by calendar days in a month. Contract terms may differ.",
      keywords: [...baseKeywords, "notice period", "buyout"],
    },
    related: ["finalSettlement", "salaryHike", "offerComparison"],
  },
  finalSettlement: {
    slug: "finalSettlement",
    path: ROUTES.finalSettlementCalculator,
    label: "Final settlement",
    shortLabel: "Settlement",
    seo: {
      title: "Final settlement calculator",
      description:
        "Sum payout lines and deductions you enter to estimate net final settlement. Does not infer statutory components.",
      keywords: [...baseKeywords, "full and final", "FnF"],
    },
    related: ["gratuity", "leaveEncashment", "noticeBuyout"],
  },
  offerComparison: {
    slug: "offerComparison",
    path: ROUTES.offerComparisonCalculator,
    label: "Offer comparison",
    shortLabel: "Offers",
    seo: {
      title: "Job offer comparison (CTC & in-hand)",
      description:
        "Rank multiple offers by estimated monthly in-hand and CTC using numbers you provide. Consistency of methodology matters.",
      keywords: [...baseKeywords, "offer comparison", "CTC"],
    },
    related: ["salaryRealityCheck", "ctcToInHand", "salaryHike", "taxRegime"],
  },
  salaryHike: {
    slug: "salaryHike",
    path: ROUTES.salaryHikeCalculator,
    label: "Salary hike",
    shortLabel: "Hike %",
    seo: {
      title: "Salary hike percentage calculator",
      description:
        "Compute absolute and percentage change between old and new annual CTC or gross figures.",
      keywords: [...baseKeywords, "salary hike", "increment"],
    },
    related: ["offerComparison", "ctcToInHand", "salary"],
  },
  epf: {
    slug: "epf",
    path: ROUTES.epfCalculator,
    label: "EPF contributions",
    shortLabel: "EPF",
    seo: {
      title: "EPF contribution estimator",
      description:
        "Estimate employee and employer EPF contributions on PF wage with optional statutory ceiling. EPS split not shown.",
      keywords: [...baseKeywords, "EPF", "PF contribution"],
    },
    related: ["ctcToInHand", "salary", "gratuity"],
  },
};

export function getCalculator(slug: CalculatorSlug): CalculatorDefinition {
  return CALCULATOR_REGISTRY[slug];
}

export function relatedCalculatorLinks(
  slug: CalculatorSlug
): { href: string; label: string }[] {
  return getCalculator(slug).related.map((s) => ({
    href: CALCULATOR_REGISTRY[s].path,
    label: CALCULATOR_REGISTRY[s].label,
  }));
}
