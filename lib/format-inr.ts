/**
 * Display helpers for INR — UI only; calculators return raw numbers.
 */

const compact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const detailed = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatInr(amount: number, options?: { decimals?: boolean }): string {
  if (!Number.isFinite(amount)) return compact.format(0);
  return options?.decimals ? detailed.format(amount) : compact.format(amount);
}

export function formatInrPlain(amount: number): string {
  if (!Number.isFinite(amount)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);
}
