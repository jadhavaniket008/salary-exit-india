import { describe, expect, it } from "vitest";
import {
  clampNonNegative,
  normalizeNumericInputString,
  safeDivide,
  sanitizeNumber,
} from "@/lib/validation/sanitize";

describe("sanitizeNumber", () => {
  it("parses strings and rejects NaN", () => {
    expect(sanitizeNumber("12.5").ok && sanitizeNumber("12.5").value).toBe(12.5);
    expect(sanitizeNumber("").ok).toBe(false);
    expect(sanitizeNumber("nan").ok).toBe(false);
    expect(sanitizeNumber(Number.NaN).ok).toBe(false);
  });

  it("accepts Indian-style grouping commas", () => {
    const r = sanitizeNumber("1,00,000");
    expect(r.ok && r.value).toBe(100_000);
    const r2 = sanitizeNumber("12,34,567");
    expect(r2.ok && r2.value).toBe(12_34_567);
  });

  it("normalizes whitespace around grouped numbers", () => {
    const r = sanitizeNumber("  50,000  ");
    expect(r.ok && r.value).toBe(50_000);
  });

  it("uses fallback when provided", () => {
    const r = sanitizeNumber(undefined, { fallback: 0 });
    expect(r.ok && r.value).toBe(0);
  });
});

describe("normalizeNumericInputString", () => {
  it("strips commas and spaces", () => {
    expect(normalizeNumericInputString("1,00,000")).toBe("100000");
  });
});

describe("clampNonNegative", () => {
  it("clamps negative and NaN", () => {
    expect(clampNonNegative(-1)).toBe(0);
    expect(clampNonNegative(Number.NaN)).toBe(0);
  });
});

describe("safeDivide", () => {
  it("returns 0 for non-finite or zero denominator", () => {
    expect(safeDivide(10, 0)).toBe(0);
    expect(safeDivide(Number.NaN, 2)).toBe(0);
  });
});
