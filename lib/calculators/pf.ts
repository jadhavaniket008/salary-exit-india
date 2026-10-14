/**
 * Employee PF contribution estimate on PF wage (Basic + DA).
 */

import { DEFAULT_PF_ASSUMPTIONS, HISTORICAL_PF_ASSUMPTIONS, type PfProjectionBasis, type PfAssumptions } from "@/lib/config/pf";
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

/** Current monthly run rate × 12; not the transition-year contribution total. */
export function computeEmployeePfAnnual(
  pfWageMonthly: number,
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS
): number {
  return computeEmployeePfMonthly(pfWageMonthly, assumptions) * 12;
}

/** Constant PF wage and continuous membership, unless newly covered from 17 September.
 * EPFO wage-ceiling FAQ Q7–9: September uses 16/30 old + 14/30 new.
 * No intermediate rounding; payroll/ECR rounding and arrears can differ.
 */
export function computeEmployeePfFy2026Annual(
  pfWageMonthly: number,
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS,
  membership: "existing" | "new-from-2026-09-17" = "existing"
) {
  const oldMonthly = membership === "existing" ? computeEmployeePfMonthly(pfWageMonthly, {
    ...assumptions,
    statutoryWageCeilingMonthly: HISTORICAL_PF_ASSUMPTIONS.statutoryWageCeilingMonthly,
  }) : 0;
  const currentMonthly = computeEmployeePfMonthly(pfWageMonthly, assumptions);
  const september = oldMonthly * 16 / 30 + currentMonthly * 14 / 30;
  return { aprilToAugustMonthly: oldMonthly, september, octoberToMarchMonthly: currentMonthly,
    annual: oldMonthly * 5 + september + currentMonthly * 6 };
}

export function computeEmployeePfProjectionAnnual(
  pfWageMonthly: number,
  basis: PfProjectionBasis = "current-annualized",
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS
): number {
  return basis === "fy-2026-27"
    ? computeEmployeePfFy2026Annual(pfWageMonthly, assumptions).annual
    : computeEmployeePfAnnual(pfWageMonthly, assumptions);
}
