/**
 * Salary / CTC inputs and outputs for in-hand and breakdown calculators.
 */

export type TaxRegime = "old" | "new";

export type SalaryInput = {
  /** Annual gross salary (before employee deductions), in INR */
  annualGrossSalary: number;
  /** Employee PF + VPF (annual), in INR — used for 80C cap logic when regime is old */
  employeePfAnnual?: number;
  /** Other Chapter VI-A (annual), old regime only — optional rough bucket */
  otherChapterVIADeductionsAnnual?: number;
  /** HRA exemption (annual), old regime — pre-computed from HRA calculator */
  hraExemptionAnnual?: number;
  /** State professional tax (annual) — user-provided or from config */
  professionalTaxAnnual: number;
  regime: TaxRegime;
  metroCity: boolean;
};

export type SalaryBreakdownLine = {
  label: string;
  amountAnnual: number;
  amountMonthly: number;
};

export type SalaryOutput = {
  annualGrossSalary: number;
  standardDeductionAnnual: number;
  taxableIncomeAnnual: number;
  /** Income tax after Section 87A rebate, before health & education cess */
  estimatedIncomeTaxAnnual: number;
  cessAnnual: number;
  totalTaxAnnual: number;
  employeePfAnnual: number;
  professionalTaxAnnual: number;
  /** Monthly cash in hand after PF, PT, and monthly TDS accrual */
  estimatedInHandMonthly: number;
  /** Annual net after tax, PF, PT */
  estimatedNetAnnual: number;
  /** Optional line items for UI tables */
  breakdownLines?: SalaryBreakdownLine[];
  warnings: string[];
};

export type CtcToInHandInput = {
  /** Annual gross (or interpreted gross after CTC adjustments) */
  annualGrossSalary: number;
  /** Employee PF annual; if omitted, derived from PF wage base */
  employeePfAnnual?: number;
  /** Basic + DA annual for PF wage base (optional) */
  basicAndDaAnnual?: number;
  regime: TaxRegime;
  metroCity: boolean;
  /** Professional tax per year (state-specific; user-provided or from config) */
  professionalTaxAnnual: number;
};

export type CtcToInHandOutput = {
  grossMonthly: number;
  employeePfMonthly: number;
  professionalTaxMonthly: number;
  tdsMonthly: number;
  inHandMonthly: number;
  annualGrossSalary: number;
  estimatedTotalTaxAnnual: number;
  warnings: string[];
};
