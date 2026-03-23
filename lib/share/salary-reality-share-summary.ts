/**
 * Compact, share-friendly strings for Salary Reality Check (organic spread / WhatsApp / X).
 */

function formatLakhsUnit(n: number): string {
  if (!Number.isFinite(n)) return "0";
  if (n >= 100) return n.toFixed(0);
  const rounded = Math.round(n * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return n.toFixed(2).replace(/\.?0+$/, "");
}

/** Annual CTC: ₹20L or ₹2.5Cr */
export function formatAnnualCtcCompact(annual: number): string {
  const a = Math.abs(annual);
  if (a >= 1_00_00_000) {
    const cr = annual / 1_00_00_000;
    return `₹${formatLakhsUnit(cr)}Cr`;
  }
  const L = annual / 1_00_000;
  return `₹${formatLakhsUnit(L)}L`;
}

/** Monthly amount: ₹1.25L or ₹87k */
export function formatMonthlyMoneyCompact(amount: number): string {
  const negative = amount < 0;
  const mag = Math.abs(amount);
  let core: string;
  if (mag >= 1_00_000) {
    core = `₹${formatLakhsUnit(mag / 1_00_000)}L`;
  } else if (mag >= 1_000) {
    core = `₹${Math.round(mag / 1000)}k`;
  } else {
    core = `₹${Math.round(mag)}`;
  }
  return negative ? `-${core}` : core;
}

/**
 * One-line summary, e.g. "₹20L CTC → ₹1.25L in-hand → ₹52k savings/month"
 */
export function formatSalaryRealityShareSummaryOneLine(params: {
  annualCtc: number;
  inHandMonthly: number;
  monthlySavings: number;
}): string {
  const c = formatAnnualCtcCompact(params.annualCtc);
  const h = formatMonthlyMoneyCompact(params.inHandMonthly);
  const s = formatMonthlyMoneyCompact(params.monthlySavings);
  return `${c} CTC → ${h} in-hand → ${s} savings/month`;
}

export const SALARY_REALITY_SHARE_BRAND = "SalaryExit India";

export function buildSalaryRealityShareText(params: {
  oneLine: string;
  verdictTitle: string;
  /** Full URL to the calculator; omitted from copy if empty. */
  pageUrl?: string;
}): string {
  const lines = [
    `Salary Reality Check — ${SALARY_REALITY_SHARE_BRAND}`,
    params.oneLine,
    `Takeaway: ${params.verdictTitle}`,
    "",
    "Estimates only — not tax advice.",
  ];
  const url = params.pageUrl?.trim();
  if (url) lines.push(url);
  return lines.join("\n");
}
