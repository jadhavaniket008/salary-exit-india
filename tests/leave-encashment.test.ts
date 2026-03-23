import { describe, expect, it } from "vitest";
import { computeLeaveEncashment } from "@/lib/calculators/leave-encashment";

describe("computeLeaveEncashment", () => {
  it("uses 26-day basis by default formula", () => {
    const out = computeLeaveEncashment({
      basicAndDaMonthly: 26_000,
      unusedLeaveDays: 10,
      dayBasis: 26,
    });
    expect(out.dailyRate).toBe(1000);
    expect(out.encashmentAmount).toBe(10_000);
  });

  it("uses 30-day basis when selected", () => {
    const out = computeLeaveEncashment({
      basicAndDaMonthly: 30_000,
      unusedLeaveDays: 15,
      dayBasis: 30,
    });
    expect(out.dailyRate).toBe(1000);
    expect(out.encashmentAmount).toBe(15_000);
  });

  it("treats negative inputs as zero", () => {
    const out = computeLeaveEncashment({
      basicAndDaMonthly: -100,
      unusedLeaveDays: 5,
      dayBasis: 26,
    });
    expect(out.encashmentAmount).toBe(0);
  });

  it("never divides by zero — divisor fixed", () => {
    const out = computeLeaveEncashment({
      basicAndDaMonthly: 10_000,
      unusedLeaveDays: 1,
      dayBasis: 26,
    });
    expect(Number.isFinite(out.dailyRate)).toBe(true);
  });
});
