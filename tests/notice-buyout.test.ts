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

  it("uses a fixed 30-day divisor when dayCountMethod is fixed30", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 30_000,
      noticeDays: 15,
      month: 2,
      year: 2025,
      dayCountMethod: "fixed30",
    });
    expect(out.daysInMonth).toBe(30);
    expect(out.dailyRate).toBeCloseTo(1_000, 5);
    expect(out.buyoutAmount).toBeCloseTo(15_000, 5);
  });

  it("uses working days as the divisor when dayCountMethod is workingDays", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 22_000,
      noticeDays: 11,
      month: 1,
      year: 2025,
      dayCountMethod: "workingDays",
      workingDaysInMonth: 22,
    });
    expect(out.daysInMonth).toBe(22);
    expect(out.dailyRate).toBeCloseTo(1_000, 5);
    expect(out.buyoutAmount).toBeCloseTo(11_000, 5);
  });

  it("rejects workingDays method with no working-days figure supplied", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 22_000,
      noticeDays: 11,
      month: 1,
      year: 2025,
      dayCountMethod: "workingDays",
    });
    expect(out.buyoutAmount).toBe(0);
    expect(out.warnings.some((w) => w.includes("Working days"))).toBe(true);
  });

  it("uses a custom divisor when dayCountMethod is custom", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 26_000,
      noticeDays: 13,
      month: 1,
      year: 2025,
      dayCountMethod: "custom",
      customDivisor: 26,
    });
    expect(out.daysInMonth).toBe(26);
    expect(out.dailyRate).toBeCloseTo(1_000, 5);
    expect(out.buyoutAmount).toBeCloseTo(13_000, 5);
  });

  it("warns when salary basis is not gross", () => {
    const out = computeNoticeBuyout({
      grossMonthlySalary: 20_000,
      noticeDays: 10,
      month: 1,
      year: 2025,
      salaryBasis: "basic",
    });
    expect(out.warnings.some((w) => w.includes("Basic"))).toBe(true);
  });
});
