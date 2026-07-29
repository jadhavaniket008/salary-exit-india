"use client";

import type { CalculatorSlug } from "@/lib/routes";
import type { AffiliateContext } from "@/lib/content/affiliate-links";

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

/** First meaningful input change in a session — fires once per mount, before a result exists. */
export function trackCalculatorStarted(slug: CalculatorSlug): void {
  const params = { calculator_slug: slug };
  gtagEvent("calculator_started", params);
  plausibleEvent("calculator_started", { calculator_slug: slug });
}

/** User switched between "I know my CTC" and "I know my gross salary" input modes. */
export function trackInputModeSelected(
  slug: CalculatorSlug,
  fromMode: string,
  toMode: string
): void {
  const params = { calculator_slug: slug, from_mode: fromMode, to_mode: toMode };
  gtagEvent("salary_input_mode_selected", params);
  plausibleEvent("salary_input_mode_selected", {
    calculator_slug: slug,
    from_mode: fromMode,
    to_mode: toMode,
  });
}

/** Click toward another calculator from within a result/next-steps block. */
export function trackNextToolClicked(sourceTool: CalculatorSlug, destinationTool: string): void {
  const params = { source_tool: sourceTool, destination_tool: destinationTool };
  gtagEvent("next_tool_clicked", params);
  plausibleEvent("next_tool_clicked", { source_tool: sourceTool, destination_tool: destinationTool });
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

/** Outbound click on a partner (affiliate) link — investing or tax-filing CTA blocks. */
export function trackAffiliateClick(partnerName: string, context: AffiliateContext): void {
  const params = { partner_name: partnerName, affiliate_context: context };
  gtagEvent("affiliate_link_click", params);
  plausibleEvent("affiliate_link_click", { partner_name: partnerName, affiliate_context: context });
}

/** Outbound click on the footer "Buy me a coffee" support link. */
export function trackSupportClick(): void {
  gtagEvent("support_link_click");
  plausibleEvent("support_link_click");
}
