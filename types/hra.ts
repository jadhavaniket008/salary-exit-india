/**
 * HRA exemption (Section 10(13A)) — annual amounts in INR.
 */
export type HraInput = {
  /** Basic salary annual */
  basicAnnual: number;
  /** DA forming part of retirement benefits annual (if applicable) */
  dearnessAllowanceAnnual: number;
  /** Actual HRA received annual */
  hraReceivedAnnual: number;
  /** Rent paid annual */
  rentPaidAnnual: number;
  /** Metro (50% rule) vs non-metro (40%) */
  metroCity: boolean;
};

export type HraOutput = {
  /** Minimum of the three Section 10(13A) tests */
  exemptionAnnual: number;
  /** rentPaid - 10% of (basic + DA) */
  testRentMinus10Percent: number;
  /** 50% or 40% of (basic + DA) */
  testSalaryPercentCap: number;
  warnings: string[];
};
