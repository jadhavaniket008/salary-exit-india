/**
 * Employee PF contribution estimate on PF wage (Basic + DA).
 */

import { DEFAULT_PF_ASSUMPTIONS, type PfAssumptions } from "@/lib/config/pf";
import { clampNonNegative } from "@/lib/validation/sanitize";

/**
 * Monthly employee PF = rate × PF wage (optionally capped per assumptions).
 */
export function computeEmployeePfMonthly(
  pfWageMonthly: number,
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS
): number {
  const wage = clampNonNegative(pfWageMonthly);
  const base =
    assumptions.applyStatutoryWageCeiling
      ? Math.min(wage, assumptions.statutoryWageCeilingMonthly)
      : wage;
  return base * assumptions.employeeContributionRate;
}

export function computeEmployeePfAnnual(
  pfWageMonthly: number,
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS
): number {
  return computeEmployeePfMonthly(pfWageMonthly, assumptions) * 12;
}
