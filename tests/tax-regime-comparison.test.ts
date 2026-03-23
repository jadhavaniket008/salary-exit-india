import { describe, expect, it } from "vitest";
import { compareTaxRegimes } from "@/lib/calculators/tax-regime-comparison";

describe("compareTaxRegimes", () => {
  it("produces lower annual tax for one regime", () => {
    const out = compareTaxRegimes({
      annualGrossSalary: 15_00_000,
      employeePfAnnual: 1_50_000,
      otherChapterVIADeductionsAnnual: 0,
      hraExemptionAnnual: 2_00_000,
    });
    expect(out.oldRegime.totalTaxAnnual).toBeGreaterThanOrEqual(0);
    expect(out.newRegime.totalTaxAnnual).toBeGreaterThanOrEqual(0);
    expect(["old", "new"]).toContain(out.lowerRegime);
    expect(out.annualSavingsIfChooseLower).toBe(
      Math.abs(out.oldRegime.totalTaxAnnual - out.newRegime.totalTaxAnnual)
    );
  });

  it("is consistent when old tax equals new tax", () => {
    const out = compareTaxRegimes({
      annualGrossSalary: 0,
    });
    expect(out.oldRegime.totalTaxAnnual).toBe(0);
    expect(out.newRegime.totalTaxAnnual).toBe(0);
    expect(out.annualSavingsIfChooseLower).toBe(0);
  });

  it("includes warnings", () => {
    const out = compareTaxRegimes({
      annualGrossSalary: 8_00_000,
    });
    expect(out.warnings.length).toBeGreaterThan(0);
  });
});
