/**
 * Single-regime annual income tax estimate (for in-hand and breakdown flows).
 */

import {
  DEFAULT_TAX_SETTINGS,
  type FinancialYearConfig,
} from "@/lib/config";
import type { TaxRegime } from "@/types/salary";
import {
  addCess,
  progressiveTax,
  rebate87ANewRegime,
  rebate87AOldRegime,
} from "./income-tax";

export type AnnualTaxEstimate = {
  taxableIncomeAnnual: number;
  /** Tax after rebate, before cess */
  taxAfterRebateBeforeCess: number;
  cessAnnual: number;
  totalTaxAnnual: number;
};

/**
 * Estimates total tax + cess for one regime given gross salary and common deductions.
 * Old regime: applies standard deduction, 80C cap bucket, optional HRA exemption.
 * New regime: standard deduction only (no 80C/HRA in this simplified model).
 */
export function estimateAnnualIncomeTax(
  regime: TaxRegime,
  annualGrossSalary: number,
  employeePfAnnual: number,
  fy: FinancialYearConfig,
  options?: {
    otherChapterVIADeductionsAnnual?: number;
    hraExemptionAnnual?: number;
  }
): AnnualTaxEstimate {
  const gross = Math.max(0, annualGrossSalary);
  const employeePf = Math.max(0, employeePfAnnual);
  const other = Math.max(0, options?.otherChapterVIADeductionsAnnual ?? 0);
  const chapter80C = Math.min(
    employeePf + other,
    DEFAULT_TAX_SETTINGS.section80CCap
  );
  const hra = Math.max(0, options?.hraExemptionAnnual ?? 0);

  if (regime === "new") {
    const taxableIncomeAnnual = Math.max(0, gross - fy.standardDeductionNewRegime);
    const taxBefore = progressiveTax(taxableIncomeAnnual, fy.newRegimeSlabs);
    const rebate = rebate87ANewRegime(taxableIncomeAnnual, taxBefore, fy);
    const taxAfterRebateBeforeCess = Math.max(0, taxBefore - rebate);
    const cessAnnual = addCess(taxAfterRebateBeforeCess, fy);
    const totalTaxAnnual = taxAfterRebateBeforeCess + cessAnnual;
    return {
      taxableIncomeAnnual,
      taxAfterRebateBeforeCess,
      cessAnnual,
      totalTaxAnnual,
    };
  }

  const taxableIncomeAnnual = Math.max(
    0,
    gross - fy.standardDeductionOldRegime - chapter80C - hra
  );
  const taxBefore = progressiveTax(taxableIncomeAnnual, fy.oldRegimeSlabs);
  const rebate = rebate87AOldRegime(taxableIncomeAnnual, taxBefore, fy);
  const taxAfterRebateBeforeCess = Math.max(0, taxBefore - rebate);
  const cessAnnual = addCess(taxAfterRebateBeforeCess, fy);
  const totalTaxAnnual = taxAfterRebateBeforeCess + cessAnnual;

  return {
    taxableIncomeAnnual,
    taxAfterRebateBeforeCess,
    cessAnnual,
    totalTaxAnnual,
  };
}
