/**
 * Trust / freshness copy shown next to calculators and methodology.
 * Update when FY config, slab source, or editorial review changes meaningfully.
 */

/** When site copy and policy alignment were last reviewed (human-readable). */
export const SITE_CONTENT_LAST_UPDATED = "July 2026";

/** Stable machine-readable date for sitemap lastModified (YYYY-MM-DD). */
export const SITE_CONTENT_LAST_UPDATED_ISO = "2026-07-01";

/**
 * Short label for badges — keep in sync with {@link DEFAULT_FINANCIAL_YEAR} in financial-year.ts.
 */
export const ENGINE_FY_LABEL = "FY 2026–27 (AY 2027–28) tax slabs in engine";

/**
 * What government/Budget rules the coded slabs intentionally follow (for transparency).
 */
export const TAX_RULESET_SOURCE_LABEL =
  "Union Budget 2026 — no slab changes; new regime slabs from Budget 2025 continue; Section 87A (≤₹12L taxable); std. deduction ₹75,000; cess 4%";

/**
 * Longer reassurance line for methodology / trust components.
 */
export const CALCULATIONS_POLICY_SYNC_LINE = `Calculator tax math was last aligned to ${TAX_RULESET_SOURCE_LABEL}. Section 87A marginal relief (new regime) is modeled; surcharge is not — validate Form 16 and CBDT circulars for filing.`;
