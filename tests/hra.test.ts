import { describe, expect, it } from "vitest";
import { computeHraExemption, HRA_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/hra";

describe("computeHraExemption", () => {
  it("returns minimum of three tests (metro)", () => {
    const out = computeHraExemption({
      basicAnnual: 600_000,
      dearnessAllowanceAnnual: 0,
      hraReceivedAnnual: 300_000,
      rentPaidAnnual: 180_000,
      metroCity: true,
    });
    // rent - 10% salary = 180k - 60k = 120k
    // 50% salary = 300k
    // min(300k, 120k, 300k) = 120k
    expect(out.exemptionAnnual).toBe(120_000);
  });

  it("uses 40% cap for non-metro", () => {
    const out = computeHraExemption({
      basicAnnual: 600_000,
      dearnessAllowanceAnnual: 0,
      hraReceivedAnnual: 300_000,
      rentPaidAnnual: 500_000,
      metroCity: false,
    });
    const salaryCap = 0.4 * 600_000;
    const rentTest = 500_000 - 60_000;
    expect(out.exemptionAnnual).toBe(Math.min(300_000, rentTest, salaryCap));
  });

  it("clamps negative rent test to 0", () => {
    const out = computeHraExemption({
      basicAnnual: 600_000,
      dearnessAllowanceAnnual: 0,
      hraReceivedAnnual: 50_000,
      rentPaidAnnual: 40_000,
      metroCity: true,
    });
    expect(out.testRentMinus10Percent).toBe(0);
    expect(out.exemptionAnnual).toBe(0);
  });

  it("matches UI worked example (₹8L basic, metro)", () => {
    const out = computeHraExemption(HRA_WORKED_EXAMPLE_INPUT);
    // min(360k, 300k-80k, 400k) = 220k
    expect(out.exemptionAnnual).toBe(220_000);
  });

  it("includes DA in salary base", () => {
    const out = computeHraExemption({
      basicAnnual: 500_000,
      dearnessAllowanceAnnual: 100_000,
      hraReceivedAnnual: 200_000,
      rentPaidAnnual: 300_000,
      metroCity: true,
    });
    const salary = 600_000;
    const rentTest = 300_000 - 0.1 * salary;
    expect(out.testRentMinus10Percent).toBe(rentTest);
  });
});
