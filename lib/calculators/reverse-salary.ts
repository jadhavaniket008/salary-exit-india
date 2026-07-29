/**
 * Reverse salary: given a target monthly in-hand, find the required annual
 * gross (via binary search against the CTC→in-hand engine) and convert that
 * to a required CTC range using an employer-cost-share assumption.
 */

import type { TaxRegime } from "@/types/salary";
import type { ReverseSalaryInput, ReverseSalaryOutput } from "@/types/reverse-salary";
import { clampNonNegative } from "@/lib/validation/sanitize";
import { computeCtcToInHand } from "./ctc-to-inhand";

const EMPLOYER_COST_SHARE_LOW = 0.08;
const EMPLOYER_COST_SHARE_HIGH = 0.18;
const DEFAULT_EMPLOYER_COST_SHARE = 0.1;

const MAX_SEARCH_GROSS = 10_00_00_000; // 10 crore search ceiling
const SEARCH_ITERATIONS = 60;
const TOLERANCE_RUPEES = 25;

function inHandForGross(
  gross: number,
  regime: TaxRegime,
  professionalTaxAnnual: number,
  basicDaShareOfGross: number
): number {
  const out = computeCtcToInHand({
    annualGrossSalary: gross,
    regime,
    metroCity: false,
    professionalTaxAnnual,
    basicAndDaAnnual: Math.round(gross * basicDaShareOfGross),
  });
  return out.inHandMonthly;
}

/** In-hand is monotonically non-decreasing in gross, so binary search converges. */
function solveGrossForInHand(
  target: number,
  regime: TaxRegime,
  professionalTaxAnnual: number,
  basicDaShareOfGross: number
): { gross: number; achieved: number } {
  if (target <= 0) return { gross: 0, achieved: 0 };

  let low = 0;
  let high = MAX_SEARCH_GROSS;
  let mid = 0;
  let achieved = 0;

  for (let i = 0; i < SEARCH_ITERATIONS; i++) {
    mid = (low + high) / 2;
    achieved = inHandForGross(mid, regime, professionalTaxAnnual, basicDaShareOfGross);
    if (Math.abs(achieved - target) < TOLERANCE_RUPEES) break;
    if (achieved < target) low = mid;
    else high = mid;
  }

  return { gross: mid, achieved };
}

function grossToCtc(gross: number, employerCostShare: number): number {
  const share = Math.min(0.4, Math.max(0, employerCostShare));
  if (share >= 0.999) return gross;
  return gross / (1 - share);
}

export function computeRequiredCtcForInHand(input: ReverseSalaryInput): ReverseSalaryOutput {
  const target = clampNonNegative(input.desiredMonthlyInHand);
  const regime = input.regime;
  const professionalTaxAnnual = clampNonNegative(input.professionalTaxAnnual);
  const basicDaShareOfGross = Math.min(0.6, Math.max(0.1, input.basicDaShareOfGross));
  const employerCostShare = input.employerCostShareOfCtc ?? DEFAULT_EMPLOYER_COST_SHARE;

  const { gross, achieved } = solveGrossForInHand(
    target,
    regime,
    professionalTaxAnnual,
    basicDaShareOfGross
  );

  const requiredAnnualCtc = grossToCtc(gross, employerCostShare);
  const requiredAnnualCtcLow = grossToCtc(gross, EMPLOYER_COST_SHARE_LOW);
  const requiredAnnualCtcHigh = grossToCtc(gross, EMPLOYER_COST_SHARE_HIGH);

  const warnings: string[] = [
    "This is a reverse estimate: we search for the gross salary that produces your target in-hand, then convert to CTC using an employer-cost assumption (PF + gratuity + insurance as a share of CTC).",
    "The required-CTC range reflects typical employer-cost shares (8%–18% of CTC), not a statistical confidence interval — your actual employer's structure may fall outside it.",
    "Does not model variable pay, ESOPs, joining bonus, or state-specific professional tax beyond the annual figure you enter.",
  ];

  if (gross >= MAX_SEARCH_GROSS * 0.99) {
    warnings.push("Target in-hand is unusually high for this model — treat the result as unreliable.");
  }

  return {
    requiredAnnualGross: gross,
    requiredAnnualCtc,
    requiredAnnualCtcLow,
    requiredAnnualCtcHigh,
    achievedMonthlyInHand: achieved,
    warnings,
  };
}
