import type { TaxRegime } from "@/types/salary";

export type ReverseSalaryInput = {
  /** What the user wants to land in their account in a normal (non-bonus) month */
  desiredMonthlyInHand: number;
  regime: TaxRegime;
  professionalTaxAnnual: number;
  /** Share of gross treated as Basic+DA for PF — default 0.45 */
  basicDaShareOfGross: number;
  /**
   * Employer PF + gratuity + insurance as a share of CTC, used to convert the
   * solved gross back into a required CTC. Default 0.10 — real offers vary.
   */
  employerCostShareOfCtc?: number;
};

export type ReverseSalaryOutput = {
  requiredAnnualGross: number;
  /** Point estimate using employerCostShareOfCtc (or its default) */
  requiredAnnualCtc: number;
  /** Required CTC assuming a lean employer-cost structure (~8% of CTC) */
  requiredAnnualCtcLow: number;
  /** Required CTC assuming a heavier employer-cost structure (~18% of CTC) */
  requiredAnnualCtcHigh: number;
  /** The in-hand actually produced at requiredAnnualGross — sanity-check against the target */
  achievedMonthlyInHand: number;
  warnings: string[];
};
