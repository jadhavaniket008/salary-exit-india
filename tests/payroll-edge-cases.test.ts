import { describe, expect, it } from "vitest";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";

/**
 * Extra payroll-shaped scenarios — same engine as CTC→in-hand; guards regressions on edge inputs.
 */
describe("payroll edge cases (CTC → in-hand)", () => {
  it("very high gross: identity holds and components are non-negative", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 1_00_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 12_000,
      basicAndDaAnnual: 40_00_000,
    });
    const check =
      out.grossMonthly - out.employeePfMonthly - out.professionalTaxMonthly - out.tdsMonthly;
    expect(out.inHandMonthly).toBeCloseTo(check, 5);
    expect(out.employeePfMonthly).toBeGreaterThanOrEqual(0);
    expect(out.professionalTaxMonthly).toBeGreaterThanOrEqual(0);
    expect(out.tdsMonthly).toBeGreaterThanOrEqual(0);
  });

  it("minimal positive gross with explicit zero PF and zero PT", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 1,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 0,
      employeePfAnnual: 0,
    });
    expect(out.inHandMonthly).toBeGreaterThan(0);
    expect(out.employeePfMonthly).toBe(0);
  });

  it("explicit PF annual with zero basic+DA path", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 15_00_000,
      regime: "new",
      metroCity: true,
      professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
      employeePfAnnual: 1_08_000,
    });
    expect(out.employeePfMonthly).toBeCloseTo(1_08_000 / 12, 5);
  });

  it("CTC→in-hand includes smoothed-TDS (annual÷12) disclosure for payroll realism", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 15_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      basicAndDaAnnual: 7_50_000,
    });
    expect(out.warnings.some((w) => w.includes("annual tax ÷ 12"))).toBe(true);
  });

  it("new vs old regime at same gross differs mainly via tax path", () => {
    const input = {
      annualGrossSalary: 12_00_000,
      metroCity: false,
      professionalTaxAnnual: 2_400,
      employeePfAnnual: 72_000,
    } as const;
    const neu = computeCtcToInHand({ ...input, regime: "new" });
    const old = computeCtcToInHand({ ...input, regime: "old" });
    expect(neu.estimatedTotalTaxAnnual).not.toBe(old.estimatedTotalTaxAnnual);
  });
});
