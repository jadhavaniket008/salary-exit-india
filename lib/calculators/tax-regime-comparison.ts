/**
 * Old vs new tax regime comparison (estimator).
 */

import {
  DEFAULT_TAX_SETTINGS,
  type FinancialYearConfig,
} from "@/lib/config";
import type { TaxComparisonInput, TaxComparisonOutput, RegimeTaxBreakdown } from "@/types/tax";
import {
  addCess,
  progressiveTax,
  rebate87ANewRegime,
  rebate87AOldRegime,
  totalTaxWithCess,
} from "./income-tax";

/** Worked example aligned with the tax regime comparison calculator page. */
export const TAX_REGIME_WORKED_EXAMPLE_INPUT: TaxComparisonInput = {
  annualGrossSalary: 18_00_000,
  employeePfAnnual: 1_50_000,
  otherChapterVIADeductionsAnnual: 0,
  hraExemptionAnnual: 2_00_000,
};

function buildBreakdownOld(
  taxableIncome: number,
  fy: FinancialYearConfig
): RegimeTaxBreakdown {
  const incomeTaxBeforeRebate = progressiveTax(taxableIncome, fy.oldRegimeSlabs);
  const rebate87A = rebate87AOldRegime(taxableIncome, incomeTaxBeforeRebate, fy);
  const incomeTaxAfterRebate = Math.max(0, incomeTaxBeforeRebate - rebate87A);
  const cess = addCess(incomeTaxAfterRebate, fy);
  return {
    taxableIncomeAnnual: taxableIncome,
    incomeTaxBeforeRebate,
    rebate87A,
    incomeTaxAfterRebate,
    cess,
    totalTaxAnnual: totalTaxWithCess(incomeTaxAfterRebate, fy),
  };
}

function buildBreakdownNew(
  taxableIncome: number,
  fy: FinancialYearConfig
): RegimeTaxBreakdown {
  const incomeTaxBeforeRebate = progressiveTax(taxableIncome, fy.newRegimeSlabs);
  const rebate87A = rebate87ANewRegime(taxableIncome, incomeTaxBeforeRebate, fy);
  const incomeTaxAfterRebate = Math.max(0, incomeTaxBeforeRebate - rebate87A);
  const cess = addCess(incomeTaxAfterRebate, fy);
  return {
    taxableIncomeAnnual: taxableIncome,
    incomeTaxBeforeRebate,
    rebate87A,
    incomeTaxAfterRebate,
    cess,
    totalTaxAnnual: totalTaxWithCess(incomeTaxAfterRebate, fy),
  };
}

export function compareTaxRegimes(
  input: TaxComparisonInput,
  fy: FinancialYearConfig = DEFAULT_TAX_SETTINGS.financialYear
): TaxComparisonOutput {
  const warnings: string[] = [
    "Surcharge, marginal relief, and perquisites are not modeled. Values are estimates only.",
  ];

  const gross = Math.max(0, input.annualGrossSalary);
  const employeePf = Math.max(0, input.employeePfAnnual ?? 0);
  const otherViA = Math.max(0, input.otherChapterVIADeductionsAnnual ?? 0);
  const chapter80C = Math.min(
    employeePf + otherViA,
    DEFAULT_TAX_SETTINGS.section80CCap
  );
  const hraExempt = Math.max(0, input.hraExemptionAnnual ?? 0);

  const taxableOld = Math.max(
    0,
    gross -
      fy.standardDeductionOldRegime -
      chapter80C -
      hraExempt
  );

  const taxableNew = Math.max(0, gross - fy.standardDeductionNewRegime);

  const oldRegime = buildBreakdownOld(taxableOld, fy);
  const newRegime = buildBreakdownNew(taxableNew, fy);

  const lowerRegime =
    oldRegime.totalTaxAnnual <= newRegime.totalTaxAnnual ? "old" : "new";
  const annualSavingsIfChooseLower = Math.abs(
    oldRegime.totalTaxAnnual - newRegime.totalTaxAnnual
  );

  return {
    oldRegime,
    newRegime,
    lowerRegime,
    annualSavingsIfChooseLower,
    warnings,
  };
}
