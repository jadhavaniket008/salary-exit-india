/**
 * Financial year configuration for Indian income tax estimators.
 *
 * **Assumption:** Slab rates and standard deductions must be updated each Budget
 * from the Finance Act / CBDT notifications.
 *
 * **FY 2025-26 (AY 2026-27):** New-regime slabs and Section 87A rebate per Union Budget 2025
 * (effective 1 Apr 2025). Old-regime structure kept as prior baseline in this model unless
 * superseded — always verify for your assessment year.
 */

export type TaxSlab = {
  /** Upper bound of this bracket (INR). Use Infinity for top slab. */
  upperInclusive: number;
  /** Marginal rate for income above previous slab up to this upper bound */
  marginalRate: number;
};

export type FinancialYearId = "FY2024_25" | "FY2025_26";

export type FinancialYearConfig = {
  id: FinancialYearId;
  label: string;
  /** Standard deduction under old regime (Section 16(ia)) — salaried */
  standardDeductionOldRegime: number;
  /** Standard deduction under new regime (Section 16(ia)) — salaried, as per applicable FY */
  standardDeductionNewRegime: number;
  /** Health and education cess on income tax */
  cessRate: number;
  oldRegimeSlabs: readonly TaxSlab[];
  newRegimeSlabs: readonly TaxSlab[];
  /** Section 87A: max rebate for old regime when taxable income <= threshold */
  rebate87AOldRegimeMax: number;
  rebate87AOldRegimeIncomeLimit: number;
  /**
   * New regime Section 87A: simplified model — full rebate of tax if taxable income
   * is at or below this limit (verify exact legal text for the FY).
   */
  rebate87ANewRegimeIncomeLimit: number;
};

/**
 * FY 2024-25 (AY 2025-26) — retained for tests and historical comparison.
 */
export const FY2024_25: FinancialYearConfig = {
  id: "FY2024_25",
  label: "Financial Year 2024-25 (AY 2025-26)",
  standardDeductionOldRegime: 50_000,
  standardDeductionNewRegime: 75_000,
  cessRate: 0.04,
  oldRegimeSlabs: [
    { upperInclusive: 250_000, marginalRate: 0 },
    { upperInclusive: 500_000, marginalRate: 0.05 },
    { upperInclusive: 1_000_000, marginalRate: 0.2 },
    { upperInclusive: Number.POSITIVE_INFINITY, marginalRate: 0.3 },
  ],
  newRegimeSlabs: [
    { upperInclusive: 300_000, marginalRate: 0 },
    { upperInclusive: 600_000, marginalRate: 0.05 },
    { upperInclusive: 900_000, marginalRate: 0.1 },
    { upperInclusive: 1_200_000, marginalRate: 0.15 },
    { upperInclusive: 1_500_000, marginalRate: 0.2 },
    { upperInclusive: Number.POSITIVE_INFINITY, marginalRate: 0.3 },
  ],
  rebate87AOldRegimeMax: 12_500,
  rebate87AOldRegimeIncomeLimit: 500_000,
  rebate87ANewRegimeIncomeLimit: 700_000,
};

/**
 * FY 2025-26 (AY 2026-27) — new concessional regime slabs & rebate per Union Budget 2025.
 * Old regime slabs unchanged in this simplified model vs FY 2024-25.
 */
export const FY2025_26: FinancialYearConfig = {
  id: "FY2025_26",
  label: "Financial Year 2025-26 (AY 2026-27)",
  standardDeductionOldRegime: 50_000,
  standardDeductionNewRegime: 75_000,
  cessRate: 0.04,
  oldRegimeSlabs: [...FY2024_25.oldRegimeSlabs],
  newRegimeSlabs: [
    { upperInclusive: 400_000, marginalRate: 0 },
    { upperInclusive: 800_000, marginalRate: 0.05 },
    { upperInclusive: 1_200_000, marginalRate: 0.1 },
    { upperInclusive: 1_600_000, marginalRate: 0.15 },
    { upperInclusive: 2_000_000, marginalRate: 0.2 },
    { upperInclusive: 2_400_000, marginalRate: 0.25 },
    { upperInclusive: Number.POSITIVE_INFINITY, marginalRate: 0.3 },
  ],
  rebate87AOldRegimeMax: 12_500,
  rebate87AOldRegimeIncomeLimit: 500_000,
  /** Taxable income at or below ₹12 lakh: full rebate of tax before cess (simplified 87A model). */
  rebate87ANewRegimeIncomeLimit: 1_200_000,
};

/** Default FY used by all calculators and tax estimates. */
export const DEFAULT_FINANCIAL_YEAR: FinancialYearConfig = FY2025_26;
