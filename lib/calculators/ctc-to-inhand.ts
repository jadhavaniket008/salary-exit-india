/**
 * CTC / gross to in-hand: monthly cash after PF, professional tax, and TDS spread.
 *
 * Uses annual gross as payroll base; does not model perquisites or flex pay.
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
import { computeEmployeePfAnnual } from "./pf";

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

  const employeePfAnnual = clampNonNegative(
    input.employeePfAnnual ??
      (input.basicAndDaAnnual !== undefined
        ? computeEmployeePfAnnual(input.basicAndDaAnnual / 12, DEFAULT_PF_ASSUMPTIONS)
        : 0)
  );

  if (input.employeePfAnnual === undefined && input.basicAndDaAnnual === undefined) {
    warnings.push(
      "Employee PF was not provided and Basic+DA was missing — PF treated as zero for tax/in-hand."
    );
  }

  if (input.regime === "old") {
    warnings.push(
      "Old regime on this screen: only employee PF is included in the Section 80C bucket. Other 80C items and HRA are not captured — use the salary breakdown calculator for a fuller old-regime estimate."
    );
  }

  const { totalTaxAnnual } = estimateAnnualIncomeTax(
    input.regime,
    gross,
    employeePfAnnual,
    fy,
    {}
  );

  const grossMonthly = gross / 12;
  const employeePfMonthly = employeePfAnnual / 12;
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
