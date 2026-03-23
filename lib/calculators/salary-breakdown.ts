/**
 * Full salary breakdown: tax, PF, PT, net — mirrors CTC logic with richer output lines.
 */

import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import type { SalaryBreakdownLine, SalaryInput, SalaryOutput } from "@/types/salary";
import { clampNonNegative } from "@/lib/validation/sanitize";
import { estimateAnnualIncomeTax } from "./annual-tax";

/** Worked example aligned with the salary breakdown calculator page. */
export const SALARY_WORKED_EXAMPLE_INPUT: SalaryInput = {
  annualGrossSalary: 12_00_000,
  regime: "new",
  professionalTaxAnnual: 2_500,
  employeePfAnnual: 1_50_000,
  metroCity: false,
};

function line(
  label: string,
  amountAnnual: number
): SalaryBreakdownLine {
  return {
    label,
    amountAnnual,
    amountMonthly: amountAnnual / 12,
  };
}

export function computeSalaryBreakdown(
  input: SalaryInput,
  fy = DEFAULT_TAX_SETTINGS.financialYear
): SalaryOutput {
  const warnings: string[] = [
    "Figures are indicative. Surcharge, marginal relief, bonus, and perquisites are not modeled.",
    "Monthly in-hand uses annual tax ÷ 12 for a smooth TDS estimate — actual employer TDS can differ month to month.",
  ];

  const gross = clampNonNegative(input.annualGrossSalary);
  const employeePfAnnual = clampNonNegative(input.employeePfAnnual ?? 0);
  const ptAnnual = clampNonNegative(input.professionalTaxAnnual);

  const {
    taxableIncomeAnnual,
    taxAfterRebateBeforeCess,
    cessAnnual,
    totalTaxAnnual,
  } = estimateAnnualIncomeTax(
    input.regime,
    gross,
    employeePfAnnual,
    fy,
    {
      otherChapterVIADeductionsAnnual: input.otherChapterVIADeductionsAnnual,
      hraExemptionAnnual: input.hraExemptionAnnual,
    }
  );

  const std =
    input.regime === "old"
      ? fy.standardDeductionOldRegime
      : fy.standardDeductionNewRegime;

  const netAnnual = gross - employeePfAnnual - ptAnnual - totalTaxAnnual;
  const estimatedInHandMonthly = netAnnual / 12;

  const breakdownLines: SalaryBreakdownLine[] = [
    line("Gross salary", gross),
    line("Standard deduction (estimated)", std),
    line("Employee PF (deducted)", employeePfAnnual),
    line("Professional tax", ptAnnual),
    line("Income tax after rebate (before cess)", taxAfterRebateBeforeCess),
    line("Health and education cess", cessAnnual),
    line("Total tax + cess (TDS estimate)", totalTaxAnnual),
  ];

  return {
    annualGrossSalary: gross,
    standardDeductionAnnual: std,
    taxableIncomeAnnual,
    estimatedIncomeTaxAnnual: taxAfterRebateBeforeCess,
    cessAnnual,
    totalTaxAnnual,
    employeePfAnnual,
    professionalTaxAnnual: ptAnnual,
    estimatedInHandMonthly,
    estimatedNetAnnual: netAnnual,
    breakdownLines,
    warnings,
  };
}
