import { describe, expect, it } from "vitest";
import {
  assertNonNegative,
  assertPositive,
  daysInMonth,
  isValidMonthYear,
} from "@/lib/validation/validators";

describe("isValidMonthYear", () => {
  it("rejects invalid month/year", () => {
    expect(isValidMonthYear(0, 2025)).toBe(false);
    expect(isValidMonthYear(13, 2025)).toBe(false);
    expect(isValidMonthYear(6, 1.5)).toBe(false);
  });

  it("accepts valid month/year", () => {
    expect(isValidMonthYear(2, 2024)).toBe(true);
  });
});

describe("daysInMonth", () => {
  it("returns 0 for invalid month", () => {
    expect(daysInMonth(0, 2025)).toBe(0);
  });

  it("handles leap year February", () => {
    expect(daysInMonth(2, 2024)).toBe(29);
    expect(daysInMonth(2, 2025)).toBe(28);
  });
});

describe("assertNonNegative", () => {
  it("returns error for negative", () => {
    expect(assertNonNegative("x", -1)).toContain("cannot be negative");
  });
});

describe("assertPositive", () => {
  it("returns error for zero", () => {
    expect(assertPositive("x", 0)).toContain("must be positive");
  });
});
