import { describe, expect, it } from "vitest";
import { FY2024_25, FY2025_26 } from "@/lib/config/financial-year";
import {
  addCess,
  progressiveTax,
  rebate87ANewRegime,
  rebate87AOldRegime,
  totalTaxWithCess,
} from "@/lib/calculators/income-tax";

describe("progressiveTax", () => {
  it("returns 0 for non-positive income", () => {
    expect(progressiveTax(-1, FY2024_25.oldRegimeSlabs)).toBe(0);
    expect(progressiveTax(0, FY2024_25.oldRegimeSlabs)).toBe(0);
  });

  it("computes old regime tax for mid slab", () => {
    // 6L taxable: 0 + 12.5k + 20k = 32.5k
    expect(progressiveTax(600_000, FY2024_25.oldRegimeSlabs)).toBe(32_500);
  });

  it("handles very high salary", () => {
    const tax = progressiveTax(5_00_00_000, FY2024_25.oldRegimeSlabs);
    expect(tax).toBeGreaterThan(1_00_00_000);
    expect(Number.isFinite(tax)).toBe(true);
  });
});

describe("rebate87AOldRegime", () => {
  it("applies capped rebate up to income limit", () => {
    const tax = 10_000;
    const r = rebate87AOldRegime(400_000, tax, FY2024_25);
    expect(r).toBe(10_000);
  });

  it("does not apply above income limit", () => {
    const tax = 50_000;
    expect(rebate87AOldRegime(600_000, tax, FY2024_25)).toBe(0);
  });
});

describe("rebate87ANewRegime", () => {
  it("rebates full tax when taxable within limit", () => {
    const taxBefore = 25_000;
    const r = rebate87ANewRegime(700_000, taxBefore, FY2024_25);
    expect(r).toBe(25_000);
  });

  it("does not rebate above income limit", () => {
    const taxBefore = 40_000;
    expect(rebate87ANewRegime(800_000, taxBefore, FY2024_25)).toBe(0);
  });
});

describe("cess and totalTaxWithCess", () => {
  it("adds 4% cess", () => {
    expect(addCess(10_000, FY2024_25)).toBe(400);
    expect(totalTaxWithCess(10_000, FY2024_25)).toBe(10_400);
  });
});

describe("FY2025_26 new regime slabs", () => {
  it("computes progressive tax for ₹15L taxable (no rebate)", () => {
    // 0–4L:0 + 4–8L:5% of 4L=20k + 8–12L:10% of 4L=40k + 12–15L:15% of 3L=45k => 105k
    expect(progressiveTax(1_500_000, FY2025_26.newRegimeSlabs)).toBe(105_000);
  });

  it("rebates full tax when taxable within ₹12L under new regime", () => {
    const taxBefore = progressiveTax(1_200_000, FY2025_26.newRegimeSlabs);
    expect(taxBefore).toBe(60_000);
    expect(rebate87ANewRegime(1_200_000, taxBefore, FY2025_26)).toBe(60_000);
  });

  it("does not rebate above ₹12L taxable", () => {
    const taxBefore = progressiveTax(1_200_001, FY2025_26.newRegimeSlabs);
    expect(rebate87ANewRegime(1_200_001, taxBefore, FY2025_26)).toBe(0);
  });
});
