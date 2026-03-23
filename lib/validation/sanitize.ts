/**
 * Numeric sanitization for calculator inputs — no UI dependency.
 */

const NON_FINITE_MESSAGE = "Value must be a finite number";

/**
 * Strips spaces and thousands separators so values like "1,00,000" parse as 100000.
 * Decimal comma (e.g. EU "1,5") is not supported — use a dot for decimals.
 */
export function normalizeNumericInputString(raw: string): string {
  return raw.trim().replace(/[\s,]/g, "");
}

export function sanitizeNumber(
  value: unknown,
  options?: { fallback?: number }
): { ok: true; value: number } | { ok: false; error: string } {
  if (value === null || value === undefined) {
    if (options?.fallback !== undefined) {
      return { ok: true, value: options.fallback };
    }
    return { ok: false, error: "Value is required" };
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return options?.fallback !== undefined
        ? { ok: true, value: options.fallback }
        : { ok: false, error: "Empty string is not a number" };
    }
    const normalized = normalizeNumericInputString(trimmed);
    if (normalized === "") {
      return options?.fallback !== undefined
        ? { ok: true, value: options.fallback }
        : { ok: false, error: "Empty string is not a number" };
    }
    const n = Number(normalized);
    if (!Number.isFinite(n)) {
      return { ok: false, error: NON_FINITE_MESSAGE };
    }
    return { ok: true, value: n };
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return { ok: false, error: NON_FINITE_MESSAGE };
    }
    return { ok: true, value: value };
  }
  return { ok: false, error: "Unsupported type for numeric input" };
}

export function clampNonNegative(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n;
}

export function safeDivide(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return 0;
  }
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}
