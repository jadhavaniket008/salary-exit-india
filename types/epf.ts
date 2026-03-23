/**
 * EPF — employer + employee contributions (estimate; employer EPS split varies).
 */
export type EpfInput = {
  /** PF wage (Basic + DA) monthly — subject to employer-specific caps */
  pfWageMonthly: number;
  /** Statutory ceiling on EPS wage (used by many employers for PF calculation) */
  epsWageCeilingMonthly?: number;
};

export type EpfOutput = {
  employeeContributionMonthly: number;
  employerContributionMonthly: number;
  /** Total EPF (employee + employer) monthly */
  totalEpfMonthly: number;
  warnings: string[];
};
