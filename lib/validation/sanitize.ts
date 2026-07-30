/**
 * Numeric sanitization for calculator inputs — no UI dependency.
 *
 * Error messages are written for the person using the form, not for a
 * developer reading a schema-validation stack trace. Pass `label` (the
 * same text as the field's visible label) so a required/invalid field
 * produces "Enter notice days." rather than "Empty string is not a number."
 */

/**
 * Strips spaces and thousands separators so values like "1,00,000" parse as 100000.
 * Decimal comma (e.g. EU "1,5") is not supported — use a dot for decimals.
 */
export function normalizeNumericInputString(raw: string): string {
  return raw.trim().replace(/[\s,]/g, "");
}

function lowerFirst(label: string): string {
  return label.length > 0 ? label[0].toLowerCase() + label.slice(1) : label;
}

export function sanitizeNumber(
  value: unknown,
  options?: { fallback?: number; label?: string }
): { ok: true; value: number } | { ok: false; error: string } {
  const label = options?.label ?? "this field";
  const requiredMessage = `Enter ${lowerFirst(label)}.`;
  const invalidMessage = `${label} must be a number.`;

  if (value === null || value === undefined) {
    if (options?.fallback !== undefined) {
      return { ok: true, value: options.fallback };
    }
    return { ok: false, error: requiredMessage };
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return options?.fallback !== undefined
        ? { ok: true, value: options.fallback }
        : { ok: false, error: requiredMessage };
    }
    const normalized = normalizeNumericInputString(trimmed);
    if (normalized === "") {
      return options?.fallback !== undefined
        ? { ok: true, value: options.fallback }
        : { ok: false, error: requiredMessage };
    }
    const n = Number(normalized);
    if (!Number.isFinite(n)) {
      return { ok: false, error: invalidMessage };
    }
    return { ok: true, value: n };
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return { ok: false, error: invalidMessage };
    }
    return { ok: true, value: value };
  }
  return { ok: false, error: invalidMessage };
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
