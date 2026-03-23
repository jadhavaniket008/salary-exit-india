/**
 * Salary hike percentage and absolute delta.
 */

import type { SalaryHikeInput, SalaryHikeOutput } from "@/types/hike";
import { clampNonNegative, safeDivide } from "@/lib/validation/sanitize";

export const SALARY_HIKE_WORKED_EXAMPLE_INPUT: SalaryHikeInput = {
  oldAnnualCtc: 12_00_000,
  newAnnualCtc: 14_40_000,
};

export function computeSalaryHike(input: SalaryHikeInput): SalaryHikeOutput {
  const warnings: string[] = [];

  const oldCtc = clampNonNegative(input.oldAnnualCtc);
  const newCtc = clampNonNegative(input.newAnnualCtc);

  if (oldCtc === 0 && newCtc > 0) {
    warnings.push("Old CTC was zero — percentage increase is not meaningful.");
  }

  const absoluteIncreaseAnnual = newCtc - oldCtc;
  const percentIncrease =
    oldCtc === 0 ? 0 : safeDivide(absoluteIncreaseAnnual, oldCtc) * 100;

  return {
    absoluteIncreaseAnnual,
    percentIncrease,
    warnings,
  };
}
