/**
 * Gratuity — Payment of Gratuity Act formula constants.
 *
 * Tax exemption on gratuity has separate limits for covered vs other employees.
 */

export type GratuityAssumptions = {
  /** Days in month basis for Act formula (15/26) */
  daysInMonthBasis: number;
  /** Multiplier in Act (15 days wages per year) */
  gratuityDaysPerYear: number;
  /** Tax-exempt limit for employer covered under Act (₹20 lakh, as amended) */
  taxExemptCapCoveredEmployer: number;
  /** Minimum years of service for eligibility under the Act (typically 5; exceptions exist) */
  minimumYearsForEligibility: number;
};

export const DEFAULT_GRATUITY_ASSUMPTIONS: GratuityAssumptions = {
  daysInMonthBasis: 26,
  gratuityDaysPerYear: 15,
  taxExemptCapCoveredEmployer: 20_00_000,
  minimumYearsForEligibility: 5,
};
