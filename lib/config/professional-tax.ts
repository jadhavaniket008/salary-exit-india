/**
 * Professional tax — **state-specific** slabs. This file holds placeholders only.
 *
 * Replace with per-state monthly/annual tables before showing exact PT in UI.
 */

export type ProfessionalTaxPlaceholder = {
  stateCode: string;
  /** Rough annual PT for a mid-senior salaried employee (INR) */
  annualEstimate: number;
  notes: string;
};

/** Example placeholder — not legal advice; verify with state law. */
export const PROFESSIONAL_TAX_PLACEHOLDER_MAHARASHTRA: ProfessionalTaxPlaceholder = {
  stateCode: "MH",
  annualEstimate: 2_500,
  notes:
    "Maharashtra PT varies by monthly salary slab; ₹2,500/year is a common upper bound for employees. Replace with exact monthly computation.",
};

export const DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE =
  PROFESSIONAL_TAX_PLACEHOLDER_MAHARASHTRA.annualEstimate;
