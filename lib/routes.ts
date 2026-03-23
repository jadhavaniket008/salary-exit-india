/**
 * Central route path constants for SalaryExit India.
 * Use these for links, breadcrumbs, and canonical URLs.
 */
export const ROUTES = {
  home: "/",
  calculators: "/calculators",
  about: "/about",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  disclaimer: "/disclaimer",
  /** How calculations work (methodology) */
  methodology: "/methodology",
  /** Content hubs */
  salaryGuides: "/salary-guides",
  taxGuides: "/tax-guides",
  jobSwitchGuides: "/job-switch-guides",
  salaryCalculator: "/salary-calculator",
  /** CTC + rent + lifestyle → in-hand vs modeled spend (decision assistant) */
  salaryRealityCheck: "/salary-reality-check",
  ctcToInHandCalculator: "/ctc-to-in-hand-calculator",
  oldVsNewTaxRegimeCalculator: "/old-vs-new-tax-regime-calculator",
  hraCalculator: "/hra-calculator",
  gratuityCalculator: "/gratuity-calculator",
  leaveEncashmentCalculator: "/leave-encashment-calculator",
  noticePeriodBuyoutCalculator: "/notice-period-buyout-calculator",
  finalSettlementCalculator: "/final-settlement-calculator",
  offerComparisonCalculator: "/offer-comparison-calculator",
  salaryHikeCalculator: "/salary-hike-calculator",
  epfCalculator: "/epf-calculator",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export type CalculatorSlug =
  | "salary"
  | "salaryRealityCheck"
  | "ctcToInHand"
  | "taxRegime"
  | "hra"
  | "gratuity"
  | "leaveEncashment"
  | "noticeBuyout"
  | "finalSettlement"
  | "offerComparison"
  | "salaryHike"
  | "epf";

/** Config-driven LPA / salary-enough SEO pages — canonical paths. */
export {
  LPA_ROUTE_PREFIX,
  SALARY_ENOUGH_ROUTE_PREFIX,
  lpaLandingPath,
  salaryEnoughPath,
} from "./routes/landing-routes";
