import { describe, expect, it } from "vitest";
import { FY2024_25 } from "@/lib/config/financial-year";
import { estimateAnnualIncomeTax } from "@/lib/calculators/annual-tax";

describe("estimateAnnualIncomeTax", () => {
  it("new regime: taxable 7L gets full rebate of tax before cess", () => {
    // Gross such that taxable after std deduction = 7L => gross = 7L + 75k
    const gross = 700_000 + FY2024_25.standardDeductionNewRegime;
    const out = estimateAnnualIncomeTax("new", gross, 0, FY2024_25);
    expect(out.taxableIncomeAnnual).toBe(700_000);
    expect(out.totalTaxAnnual).toBe(0);
  });

  it("old regime: respects 80C cap with PF + other", () => {
    const out = estimateAnnualIncomeTax("old", 20_00_000, 1_00_000, FY2024_25, {
      otherChapterVIADeductionsAnnual: 1_00_000,
    });
    // 80C combined capped at 1.5L
    expect(out.taxableIncomeAnnual).toBe(
      20_00_000 - FY2024_25.standardDeductionOldRegime - 150_000
    );
  });
});
