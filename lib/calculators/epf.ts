/**
 * EPF contribution estimate: employee + employer on PF wage (simplified).
 *
 * **Assumption:** Employer deposit is often 12% of PF wage with part diverted to EPS.
 * We do not model EPS/EDLI splits — total employer cash outflow may differ.
 */

import { DEFAULT_PF_ASSUMPTIONS, type PfAssumptions } from "@/lib/config/pf";
import type { EpfInput, EpfOutput } from "@/types/epf";
import { clampNonNegative } from "@/lib/validation/sanitize";

/** PF wage at statutory ceiling — matches EPF calculator worked example (12% + 12% under defaults). */
export const EPF_WORKED_EXAMPLE_INPUT: EpfInput = {
  pfWageMonthly: 15_000,
};

export function computeEpfEstimate(
  input: EpfInput,
  assumptions: PfAssumptions = DEFAULT_PF_ASSUMPTIONS
): EpfOutput {
  const warnings: string[] = [
    "Employer PF has EPS and administrative components; employer rate on PF wage is a rough total-employer-cost approximation.",
  ];

  const wage = clampNonNegative(input.pfWageMonthly);
  const ceiling = input.epsWageCeilingMonthly ?? assumptions.statutoryWageCeilingMonthly;
  const pfBase = assumptions.applyStatutoryWageCeiling
    ? Math.min(wage, ceiling)
    : wage;

  const employeeContributionMonthly = pfBase * assumptions.employeeContributionRate;
  const employerContributionMonthly = pfBase * assumptions.employerEpfRateOnPfWage;

  return {
    employeeContributionMonthly,
    employerContributionMonthly,
    totalEpfMonthly: employeeContributionMonthly + employerContributionMonthly,
    warnings,
  };
}
