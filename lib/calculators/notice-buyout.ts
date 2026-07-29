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
    "Buyout formulas differ by employment contract and company policy — confirm which method and salary basis yours actually uses.",
    "Result is a gross buyout before tax, PF, or statutory deductions on notice pay.",
  ];

  const gross = clampNonNegative(input.grossMonthlySalary);
  const noticeDays = clampNonNegative(input.noticeDays);
  const dayCountMethod = input.dayCountMethod ?? "calendar";
  const salaryBasis = input.salaryBasis ?? "gross";

  if (salaryBasis !== "gross") {
    warnings.push(
      salaryBasis === "basic"
        ? "Using Basic (not gross) as the monthly amount — many contracts define notice pay on gross instead; check yours before relying on this."
        : "Using a custom monthly amount you defined — confirm it matches what your contract or HR actually uses for notice pay."
    );
  }

  let divisor: number;

  if (dayCountMethod === "fixed30") {
    divisor = 30;
  } else if (dayCountMethod === "workingDays") {
    divisor = clampNonNegative(input.workingDaysInMonth ?? 0);
    if (divisor <= 0) {
      return {
        buyoutAmount: 0,
        daysInMonth: 0,
        dailyRate: 0,
        warnings: [
          ...warnings,
          "Working days in the month must be greater than zero for this method.",
        ],
      };
    }
  } else if (dayCountMethod === "custom") {
    divisor = clampNonNegative(input.customDivisor ?? 0);
    if (divisor <= 0) {
      return {
        buyoutAmount: 0,
        daysInMonth: 0,
        dailyRate: 0,
        warnings: [...warnings, "Custom divisor must be greater than zero."],
      };
    }
  } else {
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
    divisor = daysInMonth(input.month, input.year);
  }

  const dailyRate = safeDivide(gross, divisor);
  const buyoutAmount = dailyRate * noticeDays;

  return {
    buyoutAmount,
    daysInMonth: divisor,
    dailyRate,
    warnings,
  };
}
