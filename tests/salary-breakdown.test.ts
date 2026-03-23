import { describe, expect, it } from "vitest";
import { computeSalaryBreakdown } from "@/lib/calculators/salary-breakdown";

describe("computeSalaryBreakdown", () => {
  it("computes net and in-hand for new regime", () => {
    const out = computeSalaryBreakdown({
      annualGrossSalary: 15_00_000,
      employeePfAnnual: 1_50_000,
      professionalTaxAnnual: 2_500,
      regime: "new",
      metroCity: true,
    });
    expect(out.taxableIncomeAnnual).toBeGreaterThan(0);
    expect(out.totalTaxAnnual).toBeGreaterThanOrEqual(0);
    expect(out.estimatedNetAnnual).toBe(
      15_00_000 - 1_50_000 - 2_500 - out.totalTaxAnnual
    );
    expect(out.breakdownLines?.length).toBeGreaterThan(0);
  });

  it("respects HRA exemption in old regime", () => {
    const without = computeSalaryBreakdown({
      annualGrossSalary: 18_00_000,
      employeePfAnnual: 1_50_000,
      professionalTaxAnnual: 2_500,
      regime: "old",
      metroCity: true,
    });
    const withHra = computeSalaryBreakdown({
      annualGrossSalary: 18_00_000,
      employeePfAnnual: 1_50_000,
      professionalTaxAnnual: 2_500,
      regime: "old",
      metroCity: true,
      hraExemptionAnnual: 2_00_000,
    });
    expect(withHra.taxableIncomeAnnual).toBeLessThan(without.taxableIncomeAnnual);
  });

  it("warns that monthly in-hand uses smoothed TDS spread", () => {
    const out = computeSalaryBreakdown({
      annualGrossSalary: 12_00_000,
      professionalTaxAnnual: 2_500,
      regime: "new",
      metroCity: false,
      employeePfAnnual: 1_50_000,
    });
    expect(out.warnings.some((w) => w.includes("annual tax ÷ 12"))).toBe(true);
  });

  it("missing optional PF defaults to 0", () => {
    const out = computeSalaryBreakdown({
      annualGrossSalary: 10_00_000,
      professionalTaxAnnual: 0,
      regime: "new",
      metroCity: false,
    });
    expect(out.employeePfAnnual).toBe(0);
  });
});
