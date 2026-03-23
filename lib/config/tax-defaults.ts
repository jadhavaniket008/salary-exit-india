/**
 * Default tax-related settings for estimators (not a substitute for filing software).
 */

import { DEFAULT_FINANCIAL_YEAR, type FinancialYearConfig } from "./financial-year";

export type DefaultTaxSettings = {
  financialYear: FinancialYearConfig;
  /** Chapter VI-A cap for Section 80C (combined) */
  section80CCap: number;
};

export const DEFAULT_TAX_SETTINGS: DefaultTaxSettings = {
  financialYear: DEFAULT_FINANCIAL_YEAR,
  section80CCap: 150_000,
};
