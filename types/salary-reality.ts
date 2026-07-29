import type { LifestyleLevel, MonthlyExpenseParts } from "@/lib/config/salary-reality-heuristics";
import type { CtcToInHandOutput } from "@/types/salary";
import type { TaxRegime } from "@/types/salary";

export type { LifestyleLevel, MonthlyExpenseParts };

export type SavingsVerdict = "high" | "moderate" | "low" | "negative";

/** What’s shaping the verdict — rent, tax/PF, lifestyle spend. */
export type SalaryRealityDrivingFactor = {
  id: "tax" | "rent" | "lifestyle";
  label: string;
  detail: string;
};

export type SalaryRealityInput = {
  /** Annual CTC as entered — employer-side costs below are subtracted from this to get taxable gross. */
  annualCtc: number;
  /** Employer PF contribution (annual) — subtracted from annualCtc before computing gross. Default 0. */
  employerPfAnnual?: number;
  /** Gratuity accrual (annual) — subtracted from annualCtc before computing gross. Default 0. */
  gratuityAnnual?: number;
  /** Insurance/other non-cash benefits (annual) — subtracted from annualCtc before computing gross. Default 0. */
  insuranceAndBenefitsAnnual?: number;
  metroCity: boolean;
  monthlyRent: number;
  lifestyle: LifestyleLevel;
  /** Defaults to new — matches typical offer comparisons; old available for legacy structures. */
  regime?: TaxRegime;
  /**
   * Share of annual gross treated as Basic+DA for PF (when payslip split unknown).
   * Default 0.45 — see DEFAULT_BASIC_DA_SHARE_OF_GROSS in salary-reality-heuristics.
   */
  basicDaShareOfGross?: number;
  /**
   * Explicit non-rent monthly lines. If omitted, derived from lifestyle + metro table.
   */
  monthlyExpenses?: MonthlyExpenseParts;
};

export type SalaryRealityOutput = {
  /** Monthly in-hand from centralized CTC engine */
  inHandMonthly: number;
  /** Annual gross after subtracting employer PF/gratuity/insurance from annualCtc (equals annualCtc when none provided) */
  annualGrossSalary: number;
  /** Sum of employer PF + gratuity + insurance/benefits subtracted from annualCtc */
  employerSideCostsAnnual: number;
  ctcEngine: CtcToInHandOutput;
  regime: TaxRegime;
  basicDaShareOfGross: number;
  basicAndDaAnnual: number | undefined;
  expenseLines: { label: string; amount: number; kind: "rent" | "modeled" }[];
  totalMonthlyExpenses: number;
  monthlySavings: number;
  /** savings / in-hand when in-hand > 0 */
  savingsRatio: number;
  verdict: SavingsVerdict;
  verdictTitle: string;
  verdictBody: string;
  /** Why this verdict was assigned (ties to savings ratio / thresholds). */
  verdictWhy: string;
  /** Rent, tax/PF/TDS, and lifestyle — ordered by relevance. */
  verdictDrivingFactors: SalaryRealityDrivingFactor[];
  /** Actionable ideas (reduce rent, regime, salary, discretionary). */
  verdictSuggestions: string[];
  warnings: string[];
};
