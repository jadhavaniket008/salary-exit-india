import { describe, expect, it } from "vitest";
import { computeSalaryHike } from "@/lib/calculators/salary-hike";

describe("computeSalaryHike", () => {
  it("computes percent increase", () => {
    const out = computeSalaryHike({ oldAnnualCtc: 10_00_000, newAnnualCtc: 12_00_000 });
    expect(out.absoluteIncreaseAnnual).toBe(2_00_000);
    expect(out.percentIncrease).toBeCloseTo(20, 5);
  });

  it("warns when old CTC is zero", () => {
    const out = computeSalaryHike({ oldAnnualCtc: 0, newAnnualCtc: 5_00_000 });
    expect(out.percentIncrease).toBe(0);
    expect(out.warnings.length).toBeGreaterThan(0);
  });

  it("handles decrease", () => {
    const out = computeSalaryHike({ oldAnnualCtc: 10_00_000, newAnnualCtc: 8_00_000 });
    expect(out.absoluteIncreaseAnnual).toBe(-2_00_000);
    expect(out.percentIncrease).toBeCloseTo(-20, 5);
  });
});
