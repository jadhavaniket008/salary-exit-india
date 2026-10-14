import { describe, expect, it } from "vitest";
import { DEFAULT_PF_ASSUMPTIONS } from "@/lib/config/pf";
import { computeEmployeePfAnnual, computeEmployeePfMonthly, computeEmployeePfFy2026Annual } from "@/lib/calculators/pf";

describe("computeEmployeePfMonthly", () => {
  it("uses 12% of capped wage when ceiling enabled", () => {
    const m = computeEmployeePfMonthly(20_000, DEFAULT_PF_ASSUMPTIONS);
    expect(m).toBeCloseTo(20_000 * 0.12, 5);
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


describe("September 2026 statutory revision (EPFO FAQ Q7–9)", () => {
  it.each([[0, 0], [15000, 1800], [20000, 2400], [25000, 3000], [60000, 3000]])(
    "current capped PF on wage %s is %s", (wage, expected) => {
      expect(computeEmployeePfMonthly(wage)).toBe(expected);
    });
  it("keeps full-Basic PF unchanged and distinct from capped PF", () => {
    const full = { ...DEFAULT_PF_ASSUMPTIONS, applyStatutoryWageCeiling: false };
    expect(computeEmployeePfMonthly(60000, full)).toBe(7200);
    expect(computeEmployeePfFy2026Annual(60000, full).annual).toBe(86400);
  });
  it("uses five old months, prorated September, six new months", () => {
    const fy = computeEmployeePfFy2026Annual(30000);
    expect(fy).toEqual({ aprilToAugustMonthly: 1800, september: 2360,
      octoberToMarchMonthly: 3000, annual: 29360 });
    expect(computeEmployeePfAnnual(30000)).toBe(36000);
  });
  it("reproduces the official 20k wage example for existing capped and new members", () => {
    expect(computeEmployeePfFy2026Annual(20000).september).toBe(2080);
    expect(computeEmployeePfFy2026Annual(20000).annual).toBe(25480);
    const newlyCovered = computeEmployeePfFy2026Annual(20000, DEFAULT_PF_ASSUMPTIONS, "new-from-2026-09-17");
    expect(newlyCovered.aprilToAugustMonthly).toBe(0);
    expect(newlyCovered.september).toBe(1120);
    expect(newlyCovered.annual).toBe(15520);
  });
  it("does not increase PF for wages at/below the old cap", () => {
    expect(computeEmployeePfFy2026Annual(15000).annual).toBe(21600);
    expect(computeEmployeePfFy2026Annual(-1).annual).toBe(0);
  });
});
