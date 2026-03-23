/**
 * Leave encashment — gross payout estimate before tax.
 *
 * **Formula (estimate):** `dailyRate = (Basic + DA) monthly / dayBasis`;
 * `encashment = dailyRate × unusedLeaveDays`.
 *
 * Employers may use Basic only, include other components, or use a different
 * divisor (26 vs 30). Tax exemption under Section 10(10AA) for certain
 * government employees is **not** modeled here.
 */

import type { LeaveEncashmentInput, LeaveEncashmentOutput } from "@/types/leave-encashment";
import { clampNonNegative, safeDivide } from "@/lib/validation/sanitize";

export const LEAVE_WORKED_EXAMPLE_INPUT: LeaveEncashmentInput = {
  basicAndDaMonthly: 52_000,
  unusedLeaveDays: 8,
  dayBasis: 26,
};

export function computeLeaveEncashment(
  input: LeaveEncashmentInput
): LeaveEncashmentOutput {
  const warnings: string[] = [
    "Encashment rules, ceilings, and taxability depend on employer policy and employment type. This is a gross estimate only.",
    "Section 10(10AA) exemptions (where applicable) are not calculated here.",
  ];

  const monthly = clampNonNegative(input.basicAndDaMonthly);
  const days = clampNonNegative(input.unusedLeaveDays);
  const divisor = input.dayBasis === 30 ? 30 : 26;

  const dailyRate = safeDivide(monthly, divisor);
  const encashmentAmount = dailyRate * days;

  if (monthly === 0 && days > 0) {
    warnings.push("Basic+DA is zero — result will be zero.");
  }

  return {
    dailyRate,
    encashmentAmount,
    warnings,
  };
}
