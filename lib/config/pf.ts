/**
 * Provident Fund (EPF) assumptions for employee contribution estimates.
 *
 * **Important:** SalaryExit models PF wages from the Basic+DA input. Actual
 * statutory wages and payroll treatment can depend on applicable EPFO rules,
 * the member's existing contribution arrangement, and payroll circumstances.
 * Treatment above the statutory wage ceiling is not an arbitrary employer choice.
 * EPS ceiling affects employer split, not necessarily employee rate.
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
   * Current statutory PF wage ceiling from 17 September 2026 — optional cap
   * for *employee* contribution estimate when `applyStatutoryWageCeiling` is true.
   */
  statutoryWageCeilingMonthly: number;
  /** If true, PF wage = min(Basic+DA, ceiling); if false, use full Basic+DA */
  applyStatutoryWageCeiling: boolean;
};

export const DEFAULT_PF_ASSUMPTIONS: PfAssumptions = {
  employeeContributionRate: 0.12,
  employerEpfRateOnPfWage: 0.12,
  statutoryWageCeilingMonthly: 25_000,
  /** Conservative default for "typical" IT sector statutory PF */
  applyStatutoryWageCeiling: true,
};

/** Explicit versions: a generation timestamp never selects a historical rule implicitly. */
export const PF_MODEL_VERSION = "2026-09-17";
export const PF_REVIEWED_ISO = "2026-10-14";
export const HISTORICAL_PF_ASSUMPTIONS: PfAssumptions = {
  ...DEFAULT_PF_ASSUMPTIONS,
  statutoryWageCeilingMonthly: 15_000,
};
export const PF_OFFICIAL_SOURCE = "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2314111";
export type PfProjectionBasis = "current-annualized" | "fy-2026-27";
