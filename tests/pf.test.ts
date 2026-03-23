import { describe, expect, it } from "vitest";
import { DEFAULT_PF_ASSUMPTIONS } from "@/lib/config/pf";
import { computeEmployeePfAnnual, computeEmployeePfMonthly } from "@/lib/calculators/pf";

describe("computeEmployeePfMonthly", () => {
  it("uses 12% of capped wage when ceiling enabled", () => {
    const m = computeEmployeePfMonthly(20_000, DEFAULT_PF_ASSUMPTIONS);
    expect(m).toBeCloseTo(15_000 * 0.12, 5);
  });

  it("uses full wage when ceiling disabled", () => {
    const m = computeEmployeePfMonthly(20_000, {
      ...DEFAULT_PF_ASSUMPTIONS,
      applyStatutoryWageCeiling: false,
    });
    expect(m).toBeCloseTo(20_000 * 0.12, 5);
  });

  it("treats negative wage as 0", () => {
    expect(computeEmployeePfMonthly(-100, DEFAULT_PF_ASSUMPTIONS)).toBe(0);
  });

  it("annual matches 12 × monthly", () => {
    const monthly = computeEmployeePfMonthly(15_000, DEFAULT_PF_ASSUMPTIONS);
    const annual = computeEmployeePfAnnual(15_000, DEFAULT_PF_ASSUMPTIONS);
    expect(annual).toBeCloseTo(monthly * 12, 5);
  });
});
