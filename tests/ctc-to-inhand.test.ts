import { describe, expect, it } from "vitest";
import { computeCtcToInHand, deriveGrossFromCtc } from "@/lib/calculators/ctc-to-inhand";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";

describe("computeCtcToInHand", () => {
  it("derives PF from basic+DA when employee PF omitted", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      basicAndDaAnnual: 6_00_000,
      regime: "new",
      metroCity: true,
      professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
    });
    expect(out.employeePfMonthly).toBeGreaterThan(0);
    expect(out.inHandMonthly).toBeGreaterThan(0);
    expect(out.warnings.some((w) => w.includes("estimate"))).toBe(true);
  });

  it("uses explicit employee PF when provided", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      employeePfAnnual: 1_50_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 0,
    });
    expect(out.employeePfMonthly).toBeCloseTo(1_50_000 / 12, 5);
  });

  it("warns when PF and basic+DA absent", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      regime: "old",
      metroCity: true,
      professionalTaxAnnual: 0,
    });
    expect(out.warnings.some((w) => w.includes("PF"))).toBe(true);
  });

  it("handles zero gross", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 0,
      employeePfAnnual: 0,
      regime: "new",
      metroCity: true,
      professionalTaxAnnual: 0,
    });
    expect(out.inHandMonthly).toBe(0);
  });

  it("warns that monthly TDS line is a spread, not payslip schedule", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      employeePfAnnual: 1_08_000,
    });
    expect(out.warnings.some((w) => w.includes("annual tax ÷ 12"))).toBe(true);
  });

  it("warns on old regime that other 80C/HRA are not captured on this screen", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 8_00_000,
      regime: "old",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      employeePfAnnual: 50_000,
    });
    expect(out.warnings.some((w) => w.includes("Old regime on this screen"))).toBe(true);
  });
});

describe("deriveGrossFromCtc", () => {
  it("subtracts employer PF, gratuity, and insurance from CTC to get gross", () => {
    const out = deriveGrossFromCtc({
      annualCtc: 18_00_000,
      employerPfAnnual: 43_200,
      gratuityAnnual: 34_615,
      insuranceAndBenefitsAnnual: 12_000,
    });
    expect(out.employerSideCostsAnnual).toBe(43_200 + 34_615 + 12_000);
    expect(out.annualGrossSalary).toBe(18_00_000 - (43_200 + 34_615 + 12_000));
  });

  it("treats CTC as gross when no employer-side costs are provided", () => {
    const out = deriveGrossFromCtc({ annualCtc: 12_00_000 });
    expect(out.employerSideCostsAnnual).toBe(0);
    expect(out.annualGrossSalary).toBe(12_00_000);
  });

  it("never returns a negative gross when employer costs exceed CTC", () => {
    const out = deriveGrossFromCtc({ annualCtc: 1_00_000, employerPfAnnual: 2_00_000 });
    expect(out.annualGrossSalary).toBe(0);
  });

  it("clamps negative CTC input to zero", () => {
    const out = deriveGrossFromCtc({ annualCtc: -5_00_000 });
    expect(out.annualCtc).toBe(0);
    expect(out.annualGrossSalary).toBe(0);
  });
});
