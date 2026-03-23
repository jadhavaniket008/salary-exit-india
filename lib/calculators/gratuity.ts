/**
 * Gratuity estimate under Payment of Gratuity Act formula (15/26 × salary × years).
 * Tax treatment is **highly fact-specific** — we only surface a rough exempt band.
 */

import {
  DEFAULT_GRATUITY_ASSUMPTIONS,
  type GratuityAssumptions,
} from "@/lib/config/gratuity";
import type { GratuityInput, GratuityOutput } from "@/types/gratuity";
import { clampNonNegative } from "@/lib/validation/sanitize";

/** Same numbers as the gratuity calculator “worked example” — keep in sync with UI tests. */
export const GRATUITY_WORKED_EXAMPLE_INPUT: GratuityInput = {
  lastDrawnMonthlySalary: 100_000,
  yearsOfService: 7,
  coveredUnderGratuityAct: true,
};

export function computeGratuity(
  input: GratuityInput,
  assumptions: GratuityAssumptions = DEFAULT_GRATUITY_ASSUMPTIONS
): GratuityOutput {
  const warnings: string[] = [];

  const monthly = clampNonNegative(input.lastDrawnMonthlySalary);
  const years = clampNonNegative(input.yearsOfService);

  if (years < assumptions.minimumYearsForEligibility) {
    warnings.push(
      `Eligibility under the Act generally requires at least ${assumptions.minimumYearsForEligibility} years of service (exceptions apply).`
    );
  }

  const factor =
    (assumptions.gratuityDaysPerYear / assumptions.daysInMonthBasis) * years;
  const gratuityAmount = monthly * factor;

  const exemptCap = input.coveredUnderGratuityAct
    ? assumptions.taxExemptCapCoveredEmployer
    : 0;

  const exemptGratuityEstimate = input.coveredUnderGratuityAct
    ? Math.min(gratuityAmount, exemptCap)
    : 0;

  const taxableGratuityEstimate = Math.max(0, gratuityAmount - exemptGratuityEstimate);

  warnings.push(
    "Tax on gratuity depends on employer type, covered vs not covered, and salary history. Consult a CA for exact treatment."
  );

  return {
    gratuityAmount,
    taxableGratuityEstimate,
    exemptGratuityEstimate,
    warnings,
  };
}
