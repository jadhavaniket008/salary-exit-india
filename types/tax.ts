/**
 * Old vs new tax regime comparison (estimator only).
 */

export type TaxComparisonInput = {
  /** Annual gross salary before standard deduction */
  annualGrossSalary: number;
  /** Employee PF + VPF (annual) — for old regime 80C cap */
  employeePfAnnual?: number;
  /** Other 80C etc. (annual), old regime */
  otherChapterVIADeductionsAnnual?: number;
  /** HRA exemption annual (old regime only) — pre-computed from HRA calculator */
  hraExemptionAnnual?: number;
};

export type RegimeTaxBreakdown = {
  taxableIncomeAnnual: number;
  incomeTaxBeforeRebate: number;
  rebate87A: number;
  incomeTaxAfterRebate: number;
  cess: number;
  totalTaxAnnual: number;
};

export type TaxComparisonOutput = {
  oldRegime: RegimeTaxBreakdown;
  newRegime: RegimeTaxBreakdown;
  lowerRegime: "old" | "new";
  annualSavingsIfChooseLower: number;
  warnings: string[];
};
