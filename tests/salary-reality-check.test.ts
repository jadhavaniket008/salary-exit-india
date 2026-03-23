import { describe, expect, it } from "vitest";
import { computeSalaryRealityCheck } from "@/lib/calculators/salary-reality-check";

describe("computeSalaryRealityCheck", () => {
  it("combines CTC engine with expenses and savings identity", () => {
    const out = computeSalaryRealityCheck({
      annualCtc: 18_00_000,
      metroCity: true,
      monthlyRent: 28_000,
      lifestyle: "moderate",
    });
    expect(out.inHandMonthly).toBe(out.ctcEngine.inHandMonthly);
    expect(out.monthlySavings).toBeCloseTo(out.inHandMonthly - out.totalMonthlyExpenses, 5);
    expect(out.totalMonthlyExpenses).toBeGreaterThan(out.expenseLines[0].amount);
    expect(["high", "moderate", "low", "negative"]).toContain(out.verdict);
  });

  it("flags negative savings when rent and lifestyle exceed in-hand", () => {
    const out = computeSalaryRealityCheck({
      annualCtc: 4_00_000,
      metroCity: true,
      monthlyRent: 35_000,
      lifestyle: "premium",
    });
    expect(out.verdict).toBe("negative");
    expect(out.monthlySavings).toBeLessThan(0);
  });

  it("premium lifestyle increases modeled spend vs basic at same rent", () => {
    const base = {
      annualCtc: 20_00_000,
      metroCity: true,
      monthlyRent: 15_000,
    };
    const b = computeSalaryRealityCheck({ ...base, lifestyle: "basic" });
    const p = computeSalaryRealityCheck({ ...base, lifestyle: "premium" });
    expect(p.totalMonthlyExpenses).toBeGreaterThan(b.totalMonthlyExpenses);
  });

  it("uses explicit monthly expense overrides when provided", () => {
    const out = computeSalaryRealityCheck({
      annualCtc: 18_00_000,
      metroCity: true,
      monthlyRent: 28_000,
      lifestyle: "premium",
      monthlyExpenses: {
        groceries: 5_000,
        commute: 2_000,
        utilities: 1_000,
        discretionary: 3_000,
      },
    });
    expect(out.totalMonthlyExpenses).toBe(28_000 + 5_000 + 2_000 + 1_000 + 3_000);
  });

  it("returns regime and Basic+DA metadata", () => {
    const out = computeSalaryRealityCheck({
      annualCtc: 10_00_000,
      metroCity: false,
      monthlyRent: 8_000,
      lifestyle: "basic",
      regime: "old",
      basicDaShareOfGross: 0.5,
    });
    expect(out.regime).toBe("old");
    expect(out.basicDaShareOfGross).toBe(0.5);
    expect(out.basicAndDaAnnual).toBe(5_00_000);
  });

  it("returns verdict narrative: why, driving factors, suggestions", () => {
    const out = computeSalaryRealityCheck({
      annualCtc: 18_00_000,
      metroCity: true,
      monthlyRent: 28_000,
      lifestyle: "moderate",
    });
    expect(out.verdictWhy.length).toBeGreaterThan(30);
    expect(out.verdictDrivingFactors.map((f) => f.id).sort()).toEqual(["lifestyle", "rent", "tax"]);
    expect(out.verdictSuggestions.length).toBeGreaterThan(0);
    expect(out.verdictTitle).toMatch(/savings|balanced|cost|unsustainable/i);
  });
});
