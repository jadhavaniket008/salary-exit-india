/**
 * Provident Fund (EPF) assumptions for employee contribution estimates.
 *
 * **Important:** Actual PF can depend on company policy, Basic+DA definition,
 * and whether contribution is on capped or full wages. EPS ceiling affects
 * employer split, not necessarily employee rate.
 */

export type PfAssumptions = {
  /** Employee contribution rate on PF wage (typically 12% of PF wage) */
  employeeContributionRate: number;
  /**
   * Employer EPF deposit on PF wage (simplified; actual EPS/EDLI split ignored).
   * Often 12% of PF wage for the EPF portion — verify with payslip.
   */
  employerEpfRateOnPfWage: number;
  /**
   * Many employers cap PF wage at ₹15,000/month for statutory EPS — optional cap
   * for *employee* contribution estimate when `applyStatutoryWageCeiling` is true.
   */
  statutoryWageCeilingMonthly: number;
  /** If true, PF wage = min(Basic+DA, ceiling); if false, use full Basic+DA */
  applyStatutoryWageCeiling: boolean;
};

export const DEFAULT_PF_ASSUMPTIONS: PfAssumptions = {
  employeeContributionRate: 0.12,
  employerEpfRateOnPfWage: 0.12,
  statutoryWageCeilingMonthly: 15_000,
  /** Conservative default for "typical" IT sector statutory PF */
  applyStatutoryWageCeiling: true,
};
