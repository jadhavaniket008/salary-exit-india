/**
 * CTC / gross to in-hand: monthly cash after PF, professional tax, and TDS spread.
 *
 * Uses annual gross as payroll base; does not model perquisites or flex pay.
 *
 * PF has three distinct concepts after the 17 Sep 2026 mid-year ceiling change:
 * A. current monthly employee PF cash deduction
 * B. annualized current PF run-rate (A × 12)
 * C. Tax Year / FY 2026–27 projected PF used for old-regime deduction modelling
 */

import { DEFAULT_PF_ASSUMPTIONS, DEFAULT_TAX_SETTINGS } from "@/lib/config";
import type {
  CtcDecomposeInput,
  CtcDecomposeOutput,
  CtcToInHandInput,
  CtcToInHandOutput,
} from "@/types/salary";
import { clampNonNegative } from "@/lib/validation/sanitize";
import { estimateAnnualIncomeTax } from "./annual-tax";
import {
  computeEmployeePfAnnual,
  computeEmployeePfFy2026Annual,
  computeEmployeePfMonthly,
} from "./pf";

/**
 * Decompose an offer-letter CTC into its taxable gross basis by removing
 * employer-side costs (employer PF, gratuity accrual, insurance/benefits) —
 * these are company spend, not employee income, and must not be treated as gross.
 */
export function deriveGrossFromCtc(input: CtcDecomposeInput): CtcDecomposeOutput {
  const annualCtc = clampNonNegative(input.annualCtc);
  const employerPfAnnual = clampNonNegative(input.employerPfAnnual ?? 0);
  const gratuityAnnual = clampNonNegative(input.gratuityAnnual ?? 0);
  const insuranceAndBenefitsAnnual = clampNonNegative(input.insuranceAndBenefitsAnnual ?? 0);
  const employerSideCostsAnnual = employerPfAnnual + gratuityAnnual + insuranceAndBenefitsAnnual;

  return {
    annualCtc,
    employerSideCostsAnnual,
    annualGrossSalary: Math.max(0, annualCtc - employerSideCostsAnnual),
  };
}

/** Worked example aligned with the CTC→in-hand calculator page — keep in sync with UI/tests. */
export const CTC_WORKED_EXAMPLE_INPUT: CtcToInHandInput = {
  annualGrossSalary: 18_00_000,
  regime: "new",
  metroCity: false,
  professionalTaxAnnual: 2_500,
  basicAndDaAnnual: 9_00_000,
};

export function computeCtcToInHand(
  input: CtcToInHandInput,
  fy = DEFAULT_TAX_SETTINGS.financialYear
): CtcToInHandOutput {
  const warnings: string[] = [
    "In-hand is an estimate: actual TDS may differ due to proofs, perquisites, arrears, and surcharges.",
    "The monthly TDS line is annual tax ÷ 12 for planning — not a payslip TDS schedule.",
  ];

  const gross = clampNonNegative(input.annualGrossSalary);
  const ptAnnual = clampNonNegative(input.professionalTaxAnnual);

  /** A — current monthly cash PF; B — annualized current run-rate; C — Tax Year PF for old-regime tax. */
  let employeePfMonthlyCash: number;
  let employeePfAnnualizedCurrent: number;
  let employeePfTaxYearAnnual: number;

  if (input.employeePfAnnual !== undefined) {
    const override = clampNonNegative(input.employeePfAnnual);
    employeePfMonthlyCash = override / 12;
    employeePfAnnualizedCurrent = override;
    employeePfTaxYearAnnual = override;
    warnings.push(
      "Using your supplied annual employee PF; monthly PF is that amount divided by 12. No automatic ceiling or transition adjustment is applied."
    );
  } else if (input.basicAndDaAnnual !== undefined) {
    const pfWageMonthly = clampNonNegative(input.basicAndDaAnnual) / 12;
    const currentMonthly = computeEmployeePfMonthly(pfWageMonthly, DEFAULT_PF_ASSUMPTIONS);
    const annualizedCurrent = computeEmployeePfAnnual(pfWageMonthly, DEFAULT_PF_ASSUMPTIONS);
    const taxYearAnnual = computeEmployeePfFy2026Annual(
      pfWageMonthly,
      DEFAULT_PF_ASSUMPTIONS
    ).annual;

    if (input.pfProjectionBasis === "fy-2026-27") {
      // Explicit FY average view: monthly line is Tax Year total ÷ 12, not current payroll.
      employeePfMonthlyCash = taxYearAnnual / 12;
      employeePfAnnualizedCurrent = annualizedCurrent;
      employeePfTaxYearAnnual = taxYearAnnual;
      warnings.push(
        "Tax Year / FY 2026–27 average: PF uses the September 17 ceiling transition for an existing member at constant wages. Monthly PF is the annual average."
      );
    } else {
      employeePfMonthlyCash = currentMonthly;
      employeePfAnnualizedCurrent = annualizedCurrent;
      // Old-regime tax must use the Tax Year contribution, not the October run-rate × 12.
      employeePfTaxYearAnnual = taxYearAnnual;
      warnings.push(
        `Current monthly PF from 17 September 2026 (about ₹${Math.round(currentMonthly)}/month; annualized current run-rate ₹${Math.round(employeePfAnnualizedCurrent)}). This is not the full Tax Year / FY 2026–27 PF total (about ₹${Math.round(taxYearAnnual)} for the constant-wage existing-member model). Old-regime tax uses the Tax Year PF estimate when Basic+DA is supplied. Actual annual PF can be entered explicitly.`
      );
    }
  } else {
    employeePfMonthlyCash = 0;
    employeePfAnnualizedCurrent = 0;
    employeePfTaxYearAnnual = 0;
    warnings.push(
      "Employee PF was not provided and Basic+DA was missing — PF treated as zero for tax/in-hand."
    );
  }

  if (input.regime === "old") {
    warnings.push(
      "Old regime on this screen: only employee PF is included in the Section 123 deduction bucket (corresponding to the earlier Section 80C framework). Other Section 123 items and HRA are not captured — use the salary breakdown calculator for a fuller old-regime estimate."
    );
  }

  const { totalTaxAnnual } = estimateAnnualIncomeTax(
    input.regime,
    gross,
    // New regime ignores PF for tax; old regime uses Tax Year PF (C), not annualized current (B).
    employeePfTaxYearAnnual,
    fy,
    {}
  );

  const grossMonthly = gross / 12;
  const employeePfMonthly = employeePfMonthlyCash;
  const professionalTaxMonthly = ptAnnual / 12;
  const tdsMonthly = totalTaxAnnual / 12;
  const inHandMonthly =
    grossMonthly - employeePfMonthly - professionalTaxMonthly - tdsMonthly;

  return {
    grossMonthly,
    employeePfMonthly,
    professionalTaxMonthly,
    tdsMonthly,
    inHandMonthly,
    annualGrossSalary: gross,
    estimatedTotalTaxAnnual: totalTaxAnnual,
    warnings,
  };
}
