/**
 * HRA exemption (Section 10(13A)) — percentage of salary for metro vs non-metro.
 */

export type HraAssumptions = {
  metroPercentOfSalary: number;
  nonMetroPercentOfSalary: number;
  /** "Salary" for HRA = Basic + DA (if DA is part of retirement benefits) */
  rentMinusPercentOfSalary: number;
};

export const DEFAULT_HRA_ASSUMPTIONS: HraAssumptions = {
  metroPercentOfSalary: 0.5,
  nonMetroPercentOfSalary: 0.4,
  rentMinusPercentOfSalary: 0.1,
};
