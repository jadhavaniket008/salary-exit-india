/**
 * Trust / freshness copy shown next to calculators and methodology.
 * Update when FY config, slab source, or editorial review changes meaningfully.
 *
 * Keep content-review dates separate from PF model revision dates — never claim
 * a full site content review on a date when only the PF engine was updated.
 */

import { PF_REVIEWED_ISO } from "@/lib/config/pf";

/** When site copy and policy alignment were last reviewed (human-readable). */
export const SITE_CONTENT_LAST_UPDATED = "July 2026";

/** Stable machine-readable date for sitemap lastModified (YYYY-MM-DD). */
export const SITE_CONTENT_LAST_UPDATED_ISO = "2026-07-01";

/**
 * Human-readable date of the documented PF wage-ceiling model revision
 * (17 Sep 2026 ceiling; engine reviewed {@link PF_REVIEWED_ISO}).
 * This is a model update date — not a claim that all site prose was re-reviewed then.
 */
export const PF_MODEL_LAST_UPDATED =
  PF_REVIEWED_ISO === "2026-10-14" ? "14 October 2026" : PF_REVIEWED_ISO;

/** Machine-readable PF model revision date — keep aligned with {@link PF_REVIEWED_ISO}. */
export const PF_MODEL_LAST_UPDATED_ISO = PF_REVIEWED_ISO;
/**
 * Short label for badges — keep in sync with {@link DEFAULT_FINANCIAL_YEAR} in financial-year.ts.
 */
export const ENGINE_FY_LABEL = "Tax Year 2026–27 (FY 2026–27) tax slabs in engine";

/**
 * What government/Budget rules the coded slabs intentionally follow (for transparency).
 */
export const TAX_RULESET_SOURCE_LABEL =
  "Union Budget 2026 — no slab changes; Income Tax Act, 2025 Tax Year 2026–27; new regime (Section 202, earlier 115BAC) slabs from Budget 2025 continue; Section 156 rebate (earlier 87A) ≤₹12L taxable; std. deduction ₹75,000 (Section 19(1)); cess 4%";

/**
 * Longer reassurance line for methodology / trust components.
 */
export const CALCULATIONS_POLICY_SYNC_LINE = `Calculator tax math was last aligned to ${TAX_RULESET_SOURCE_LABEL}. New-regime rebate / marginal relief is modeled; surcharge is not — validate Form 16 and CBDT circulars for filing.`;
