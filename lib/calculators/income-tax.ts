/**
 * Core income tax computation (resident individual, no surcharge).
 *
 * Uses progressive slabs from FinancialYearConfig. Cess is applied on tax
 * after rebate. Section 87A rebates are **simplified** — verify against
 * the Finance Act for the exact FY.
 */

import type { FinancialYearConfig, TaxSlab } from "@/lib/config/financial-year";

/**
 * Progressive tax on positive taxable income using ordered slabs.
 * Each slab's `upperInclusive` is the top of that bracket; `marginalRate`
 * applies to income strictly above the previous bracket floor.
 */
export function progressiveTax(
  taxableIncome: number,
  slabs: readonly TaxSlab[]
): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) {
    return 0;
  }
  let tax = 0;
  let lower = 0;
  for (const slab of slabs) {
    const upper = slab.upperInclusive;
    if (taxableIncome <= lower) {
      break;
    }
    const top =
      upper === Number.POSITIVE_INFINITY ? taxableIncome : Math.min(taxableIncome, upper);
    const width = top - lower;
    if (width > 0) {
      tax += width * slab.marginalRate;
    }
    lower = upper === Number.POSITIVE_INFINITY ? taxableIncome : upper;
  }
  return tax;
}

export function rebate87AOldRegime(
  taxableIncome: number,
  taxBeforeRebate: number,
  fy: FinancialYearConfig
): number {
  if (taxableIncome <= fy.rebate87AOldRegimeIncomeLimit) {
    return Math.min(fy.rebate87AOldRegimeMax, taxBeforeRebate);
  }
  return 0;
}

/**
 * Simplified new-regime rebate: if taxable income is within the configured
 * limit, rebate equals entire tax before cess (approximates Section 87A).
 */
export function rebate87ANewRegime(
  taxableIncome: number,
  taxBeforeRebate: number,
  fy: FinancialYearConfig
): number {
  if (taxableIncome <= fy.rebate87ANewRegimeIncomeLimit) {
    return taxBeforeRebate;
  }
  return 0;
}

export function addCess(taxAfterRebate: number, fy: FinancialYearConfig): number {
  if (taxAfterRebate <= 0) return 0;
  return taxAfterRebate * fy.cessRate;
}

export function totalTaxWithCess(
  taxAfterRebate: number,
  fy: FinancialYearConfig
): number {
  const cess = addCess(taxAfterRebate, fy);
  return taxAfterRebate + cess;
}
