/**
 * Notice period buyout: gross monthly × (notice days / days in calendar month).
 */

import { daysInMonth, isValidMonthYear } from "@/lib/validation/validators";
import type { NoticeBuyoutInput, NoticeBuyoutOutput } from "@/types/notice";
import { clampNonNegative, safeDivide } from "@/lib/validation/sanitize";

/** March 2025, 45 days, ₹90k gross — matches notice buyout calculator worked example. */
export const NOTICE_WORKED_EXAMPLE_INPUT: NoticeBuyoutInput = {
  grossMonthlySalary: 90_000,
  noticeDays: 45,
  month: 3,
  year: 2025,
};

export function computeNoticeBuyout(input: NoticeBuyoutInput): NoticeBuyoutOutput {
  const warnings: string[] = [
    "Buyout formulas differ by employment contract and company policy. This uses a simple calendar proration.",
    "Result is gross buyout before tax, PF, or statutory deductions on notice pay.",
  ];

  const gross = clampNonNegative(input.grossMonthlySalary);
  const noticeDays = clampNonNegative(input.noticeDays);

  if (!isValidMonthYear(input.month, input.year)) {
    return {
      buyoutAmount: 0,
      daysInMonth: 0,
      dailyRate: 0,
      warnings: [
        ...warnings,
        "Invalid month/year combination — cannot compute days in month.",
      ],
    };
  }

  const dim = daysInMonth(input.month, input.year);
  const dailyRate = safeDivide(gross, dim);
  const buyoutAmount = dailyRate * noticeDays;

  return {
    buyoutAmount,
    daysInMonth: dim,
    dailyRate,
    warnings,
  };
}
