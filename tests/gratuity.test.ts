import { describe, expect, it } from "vitest";
import {
  computeGratuity,
  GRATUITY_WORKED_EXAMPLE_INPUT,
} from "@/lib/calculators/gratuity";

describe("computeGratuity", () => {
  it("computes 15/26 * monthly * years", () => {
    const out = computeGratuity({
      lastDrawnMonthlySalary: 26_000,
      yearsOfService: 10,
      coveredUnderGratuityAct: true,
    });
    // (15/26) * 26000 * 10 = 150000
    expect(out.gratuityAmount).toBeCloseTo(150_000, 5);
  });

  it("warns when service below minimum years", () => {
    const out = computeGratuity({
      lastDrawnMonthlySalary: 50_000,
      yearsOfService: 2,
      coveredUnderGratuityAct: true,
    });
    expect(out.warnings.some((w) => w.includes("5"))).toBe(true);
  });

  it("caps exempt amount for covered employer", () => {
    const out = computeGratuity({
      lastDrawnMonthlySalary: 10_00_000,
      yearsOfService: 30,
      coveredUnderGratuityAct: true,
    });
    expect(out.exemptGratuityEstimate).toBeLessThanOrEqual(20_00_000);
    expect(out.taxableGratuityEstimate).toBeGreaterThanOrEqual(0);
  });

  it("treats negative salary as 0", () => {
    const out = computeGratuity({
      lastDrawnMonthlySalary: -100,
      yearsOfService: 10,
      coveredUnderGratuityAct: false,
    });
    expect(out.gratuityAmount).toBe(0);
  });

  it("matches UI worked example (₹1L × 7yr, covered)", () => {
    const out = computeGratuity(GRATUITY_WORKED_EXAMPLE_INPUT);
    const expected = (15 / 26) * 100_000 * 7;
    expect(out.gratuityAmount).toBeCloseTo(expected, 5);
    expect(out.exemptGratuityEstimate).toBeCloseTo(Math.min(expected, 20_00_000), 5);
    expect(out.taxableGratuityEstimate).toBeCloseTo(Math.max(0, expected - out.exemptGratuityEstimate), 5);
  });
});
