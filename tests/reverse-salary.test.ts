import { describe, expect, it } from "vitest";
import { computeRequiredCtcForInHand } from "@/lib/calculators/reverse-salary";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";

describe("computeRequiredCtcForInHand", () => {
  it("round-trips: the solved gross actually produces close to the target in-hand", () => {
    const out = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 1_00_000,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    });
    const check = computeCtcToInHand({
      annualGrossSalary: out.requiredAnnualGross,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_400,
      basicAndDaAnnual: Math.round(out.requiredAnnualGross * 0.45),
    });
    expect(Math.abs(check.inHandMonthly - 1_00_000)).toBeLessThan(100);
    expect(out.achievedMonthlyInHand).toBeCloseTo(check.inHandMonthly, 0);
  });

  it("required CTC is always more than required gross (employer costs added back)", () => {
    const out = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 80_000,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    });
    expect(out.requiredAnnualCtc).toBeGreaterThan(out.requiredAnnualGross);
  });

  it("low/high range brackets the point estimate", () => {
    const out = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 1_50_000,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
      employerCostShareOfCtc: 0.1,
    });
    expect(out.requiredAnnualCtcLow).toBeLessThanOrEqual(out.requiredAnnualCtc);
    expect(out.requiredAnnualCtc).toBeLessThanOrEqual(out.requiredAnnualCtcHigh);
  });

  it("is monotonic: a higher target in-hand requires a higher CTC", () => {
    const lower = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 60_000,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    });
    const higher = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 1_20_000,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    });
    expect(higher.requiredAnnualCtc).toBeGreaterThan(lower.requiredAnnualCtc);
  });

  it("returns zero for a zero or negative target", () => {
    const out = computeRequiredCtcForInHand({
      desiredMonthlyInHand: 0,
      regime: "new",
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    });
    expect(out.requiredAnnualGross).toBe(0);
    expect(out.requiredAnnualCtc).toBe(0);
  });

  it("old regime requires a higher CTC than new regime for the same in-hand target (no HRA/80C entered)", () => {
    const base = {
      desiredMonthlyInHand: 1_00_000,
      professionalTaxAnnual: 2_400,
      basicDaShareOfGross: 0.45,
    };
    const newRegime = computeRequiredCtcForInHand({ ...base, regime: "new" });
    const oldRegime = computeRequiredCtcForInHand({ ...base, regime: "old" });
    expect(oldRegime.requiredAnnualCtc).toBeGreaterThanOrEqual(newRegime.requiredAnnualCtc);
  });
});
