/**
 * HRA exemption under Section 10(13A): minimum of three tests.
 */

import { DEFAULT_HRA_ASSUMPTIONS, type HraAssumptions } from "@/lib/config/hra";
import type { HraInput, HraOutput } from "@/types/hra";
import { clampNonNegative } from "@/lib/validation/sanitize";

export const HRA_WORKED_EXAMPLE_INPUT: HraInput = {
  basicAnnual: 8_00_000,
  dearnessAllowanceAnnual: 0,
  hraReceivedAnnual: 3_60_000,
  rentPaidAnnual: 3_00_000,
  metroCity: true,
};

export function computeHraExemption(
  input: HraInput,
  assumptions: HraAssumptions = DEFAULT_HRA_ASSUMPTIONS
): HraOutput {
  const warnings: string[] = [
    "HRA exemption requires old tax regime and actual rent payment proofs. This is an estimate only.",
  ];

  const basic = clampNonNegative(input.basicAnnual);
  const da = clampNonNegative(input.dearnessAllowanceAnnual);
  const salary = basic + da;
  const hra = clampNonNegative(input.hraReceivedAnnual);
  const rent = clampNonNegative(input.rentPaidAnnual);

  const testActualHra = hra;
  const testRentMinus10 = Math.max(0, rent - assumptions.rentMinusPercentOfSalary * salary);
  const pct = input.metroCity
    ? assumptions.metroPercentOfSalary
    : assumptions.nonMetroPercentOfSalary;
  const testSalaryCap = pct * salary;

  const exemptionAnnual = Math.min(testActualHra, testRentMinus10, testSalaryCap);

  return {
    exemptionAnnual,
    testRentMinus10Percent: testRentMinus10,
    testSalaryPercentCap: testSalaryCap,
    warnings,
  };
}
