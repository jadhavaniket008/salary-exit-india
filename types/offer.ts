/**
 * Offer comparison — uses outputs from other calculators for consistency.
 */

export type OfferMetrics = {
  label: string;
  annualCtc: number;
  /** Pre-computed monthly in-hand from ctc-to-in-hand or similar */
  estimatedInHandMonthly: number;
  /** Optional total tax for ranking */
  estimatedTotalTaxAnnual?: number;
};

export type OfferComparisonInput = {
  offers: OfferMetrics[];
};

export type OfferComparisonRow = OfferMetrics & {
  rankByInHand: number;
  rankByCtc: number;
};

export type OfferComparisonOutput = {
  rows: OfferComparisonRow[];
  bestByInHand: string;
  bestByCtc: string;
  warnings: string[];
};
