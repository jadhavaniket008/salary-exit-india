/**
 * Final settlement — aggregates user-provided credit and debit lines.
 */

import type { FinalSettlementInput, FinalSettlementOutput } from "@/types/settlement";
import { clampNonNegative } from "@/lib/validation/sanitize";

export function computeFinalSettlement(
  input: FinalSettlementInput
): FinalSettlementOutput {
  const warnings: string[] = [
    "Settlement components vary by employer. Add all components explicitly; this does not infer leave encashment or statutory dues.",
  ];

  let grossCredits = 0;
  for (const line of input.lines) {
    grossCredits += clampNonNegative(line.amount);
  }

  let totalDeductions = 0;
  for (const line of input.deductions ?? []) {
    totalDeductions += clampNonNegative(line.amount);
  }

  const netSettlement = grossCredits - totalDeductions;

  return {
    grossCredits,
    totalDeductions,
    netSettlement,
    warnings,
  };
}
