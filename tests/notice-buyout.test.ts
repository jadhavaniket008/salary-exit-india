import { describe, expect, it } from "vitest";
import { computeNoticeBuyout } from "@/lib/calculators/notice-buyout";

describe("computeNoticeBuyout", () => {
  it("prorates by calendar days in month", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 30_000,
      noticeDays: 30,
      month: 1,
      year: 2025,
    });
    expect(out.daysInMonth).toBe(31);
    expect(out.dailyRate).toBeCloseTo(30_000 / 31, 5);
    expect(out.buyoutAmount).toBeCloseTo((30_000 / 31) * 30, 5);
  });

  it("returns 0 for invalid month/year", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 50_000,
      noticeDays: 10,
      month: 13,
      year: 2025,
    });
    expect(out.buyoutAmount).toBe(0);
    expect(out.daysInMonth).toBe(0);
    expect(out.warnings.some((w) => w.includes("Invalid"))).toBe(true);
  });

  it("handles zero notice days", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 60_000,
      noticeDays: 0,
      month: 6,
      year: 2024,
    });
    expect(out.buyoutAmount).toBe(0);
  });

  it("avoids division by zero in daily rate", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 0,
      noticeDays: 5,
      month: 4,
      year: 2025,
    });
    expect(out.dailyRate).toBe(0);
    expect(out.buyoutAmount).toBe(0);
  });
});
