/**
 * Reusable validation helpers for dates and ranges.
 */

export function isValidMonthYear(month: number, year: number): boolean {
  if (!Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (year < 1900 || year > 2100) return false;
  return month >= 1 && month <= 12;
}

export function daysInMonth(month: number, year: number): number {
  if (!isValidMonthYear(month, year)) {
    return 0;
  }
  return new Date(year, month, 0).getDate();
}

export function assertNonNegative(
  name: string,
  value: number
): string | null {
  if (!Number.isFinite(value)) {
    return `${name} must be a finite number`;
  }
  if (value < 0) {
    return `${name} cannot be negative`;
  }
  return null;
}

export function assertPositive(
  name: string,
  value: number
): string | null {
  if (!Number.isFinite(value)) {
    return `${name} must be a finite number`;
  }
  if (value <= 0) {
    return `${name} must be positive`;
  }
  return null;
}
