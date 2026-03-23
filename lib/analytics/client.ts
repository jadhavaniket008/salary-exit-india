"use client";

import type { CalculatorSlug } from "@/lib/routes";

/**
 * Client-side measurement helpers. They **no-op** until GA4 and/or Plausible scripts are
 * present on `window` (injected by `ThirdPartyRootScripts` only when env vars are set and
 * consent allows analytics — see `docs/analytics.md`).
 */

function gtagEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const g = window.gtag;
  if (typeof g !== "function") return;
  g("event", name, params);
}

/** Plausible custom events accept string props in most setups. */
function plausibleEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const p = window.plausible;
  if (typeof p !== "function") return;
  p(name, props ? { props } : undefined);
}

/** Successful “Calculate” on any calculator that uses a submit button (not Salary Reality Check live model). */
export function trackCalculatorUse(slug: CalculatorSlug): void {
  const params = { calculator_slug: slug };
  gtagEvent("calculator_use", params);
  plausibleEvent("calculator_use", {
    calculator_slug: slug,
  });
}

/** First time inputs produce a valid modeled result in a session (live-updated tool). */
export function trackSalaryRealityCheckUse(options: { embed: boolean }): void {
  const params = { embed: options.embed ? "true" : "false" };
  gtagEvent("salary_reality_check_use", params);
  plausibleEvent("salary_reality_check_use", {
    embed: options.embed ? "embed" : "full",
  });
}

/** User ran a ranking on the offer comparison tool. */
export function trackOfferCompareSubmit(): void {
  gtagEvent("offer_compare_submit");
  plausibleEvent("offer_compare_submit");
}

/** User clicked a navigation CTA toward offer comparison (e.g. from Salary Reality Check “Next steps”). */
export function trackOfferCompareClick(source: string): void {
  const params = { source };
  gtagEvent("offer_compare_click", params);
  plausibleEvent("offer_compare_click", { source });
}

/** Share / copy actions on Salary Reality Check summary card. */
export function trackShareSummary(action: "copy" | "share_native"): void {
  const params = { action };
  gtagEvent("share_summary", params);
  plausibleEvent("share_summary", { action });
}
