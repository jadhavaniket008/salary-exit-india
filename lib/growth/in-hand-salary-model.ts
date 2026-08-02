/**
 * SalaryExit India In-Hand Salary Model 2026 — data generation.
 *
 * This is the single source of truth for the flagship report page
 * (app/reports/india-in-hand-salary-model-2026), the embed page
 * (app/embed/in-hand-salary-table), and the downloadable CSV/JSON exports
 * (scripts/growth/generate-in-hand-model-data.ts). All three consume this
 * module rather than duplicating numbers, so there is exactly one place
 * where the model's assumptions live.
 *
 * Every figure is computed live from the site's own calculation engine
 * (lib/calculators) and the active financial-year config
 * (lib/config/financial-year.ts) — nothing here is a hardcoded or
 * separately-sourced number.
 */

import { DEFAULT_FINANCIAL_YEAR } from "@/lib/config/financial-year";
import { DEFAULT_PF_ASSUMPTIONS, type PfAssumptions } from "@/lib/config/pf";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { computeEmployeePfAnnual } from "@/lib/calculators/pf";
import { computeRequiredCtcForInHand } from "@/lib/calculators/reverse-salary";
import type { TaxRegime } from "@/types/salary";

/** Model-wide assumptions, stated once so the report and CSV can cite the same numbers. */
export const MODEL_ASSUMPTIONS = {
  regime: "new" as TaxRegime,
  /** Matches the CTC-to-in-hand calculator's own worked example (₹18L CTC / ₹9L Basic+DA = 50%)
   *  and reverse-salary.ts's documented default (0.45) — we use reverse-salary's own default so
   *  this report is internally consistent with the live reverse-salary calculator. */
  basicDaShareOfGross: 0.45,
  /** Matches the default shown on /ctc-to-in-hand-calculator and used in CTC_WORKED_EXAMPLE_INPUT. */
  professionalTaxAnnual: 2_500,
  metroCity: false,
  employerCostShareScenarios: [0.08, 0.13, 0.18] as const,
  salaryLevelsAnnualCtc: [
    5_00_000, 6_00_000, 8_00_000, 10_00_000, 12_00_000, 15_00_000, 18_00_000, 20_00_000, 25_00_000,
    30_00_000, 40_00_000, 50_00_000,
  ] as const,
  targetMonthlyInHandLevels: [50_000, 75_000, 1_00_000, 1_50_000, 2_00_000] as const,
  financialYearLabel: DEFAULT_FINANCIAL_YEAR.label,
  financialYearId: DEFAULT_FINANCIAL_YEAR.id,
} as const;

const PF_CAPPED: PfAssumptions = { ...DEFAULT_PF_ASSUMPTIONS, applyStatutoryWageCeiling: true };
const PF_FULL_BASIC: PfAssumptions = { ...DEFAULT_PF_ASSUMPTIONS, applyStatutoryWageCeiling: false };

/** gross = ctc * (1 - employerCostShare) — same relationship reverse-salary.ts's grossToCtc uses. */
function grossFromCtc(annualCtc: number, employerCostShare: number): number {
  return annualCtc * (1 - employerCostShare);
}

export type SalaryLevelRow = {
  annualCtc: number;
  employerCostSharePct: number;
  annualGross: number;
  pfScenario: "statutory-ceiling" | "full-basic";
  employeePfAnnual: number;
  monthlyInHand: number;
  annualTaxEstimate: number;
  inHandAsPctOfCtc: number;
};

export type PfComparisonRow = {
  annualCtc: number;
  employerCostSharePct: number;
  cappedPfMonthlyInHand: number;
  fullBasicPfMonthlyInHand: number;
  monthlyCashDifference: number;
  annualCashDifference: number;
};

export type RequiredCtcRow = {
  targetMonthlyInHand: number;
  requiredAnnualGross: number;
  requiredAnnualCtcLow: number;
  requiredAnnualCtcPoint: number;
  requiredAnnualCtcHigh: number;
};

export type InHandSalaryModel = {
  generatedAtIso: string;
  assumptions: typeof MODEL_ASSUMPTIONS;
  salaryLevelRows: SalaryLevelRow[];
  pfComparisonRows: PfComparisonRow[];
  requiredCtcRows: RequiredCtcRow[];
  keyFindings: string[];
};

function computeInHandForCtc(
  annualCtc: number,
  employerCostShare: number,
  pf: PfAssumptions
): { annualGross: number; employeePfAnnual: number; monthlyInHand: number; annualTax: number } {
  const annualGross = grossFromCtc(annualCtc, employerCostShare);
  const basicAndDaAnnual = annualGross * MODEL_ASSUMPTIONS.basicDaShareOfGross;
  const employeePfAnnual = computeEmployeePfAnnual(basicAndDaAnnual / 12, pf);

  const out = computeCtcToInHand({
    annualGrossSalary: annualGross,
    regime: MODEL_ASSUMPTIONS.regime,
    metroCity: MODEL_ASSUMPTIONS.metroCity,
    professionalTaxAnnual: MODEL_ASSUMPTIONS.professionalTaxAnnual,
    employeePfAnnual,
  });

  return {
    annualGross,
    employeePfAnnual,
    monthlyInHand: out.inHandMonthly,
    annualTax: out.estimatedTotalTaxAnnual,
  };
}

/** Builds the full model. Pure function — same inputs always produce the same output. */
export function generateInHandSalaryModel(generatedAtIso: string = new Date().toISOString()): InHandSalaryModel {
  const salaryLevelRows: SalaryLevelRow[] = [];
  const pfComparisonRows: PfComparisonRow[] = [];

  for (const annualCtc of MODEL_ASSUMPTIONS.salaryLevelsAnnualCtc) {
    for (const employerCostShare of MODEL_ASSUMPTIONS.employerCostShareScenarios) {
      const capped = computeInHandForCtc(annualCtc, employerCostShare, PF_CAPPED);
      const full = computeInHandForCtc(annualCtc, employerCostShare, PF_FULL_BASIC);

      salaryLevelRows.push({
        annualCtc,
        employerCostSharePct: employerCostShare,
        annualGross: capped.annualGross,
        pfScenario: "statutory-ceiling",
        employeePfAnnual: capped.employeePfAnnual,
        monthlyInHand: capped.monthlyInHand,
        annualTaxEstimate: capped.annualTax,
        inHandAsPctOfCtc: (capped.monthlyInHand * 12) / annualCtc,
      });
      salaryLevelRows.push({
        annualCtc,
        employerCostSharePct: employerCostShare,
        annualGross: full.annualGross,
        pfScenario: "full-basic",
        employeePfAnnual: full.employeePfAnnual,
        monthlyInHand: full.monthlyInHand,
        annualTaxEstimate: full.annualTax,
        inHandAsPctOfCtc: (full.monthlyInHand * 12) / annualCtc,
      });

      pfComparisonRows.push({
        annualCtc,
        employerCostSharePct: employerCostShare,
        cappedPfMonthlyInHand: capped.monthlyInHand,
        fullBasicPfMonthlyInHand: full.monthlyInHand,
        monthlyCashDifference: capped.monthlyInHand - full.monthlyInHand,
        annualCashDifference: (capped.monthlyInHand - full.monthlyInHand) * 12,
      });
    }
  }

  const requiredCtcRows: RequiredCtcRow[] = MODEL_ASSUMPTIONS.targetMonthlyInHandLevels.map(
    (targetMonthlyInHand) => {
      const result = computeRequiredCtcForInHand({
        desiredMonthlyInHand: targetMonthlyInHand,
        regime: MODEL_ASSUMPTIONS.regime,
        professionalTaxAnnual: MODEL_ASSUMPTIONS.professionalTaxAnnual,
        basicDaShareOfGross: MODEL_ASSUMPTIONS.basicDaShareOfGross,
      });
      return {
        targetMonthlyInHand,
        requiredAnnualGross: result.requiredAnnualGross,
        requiredAnnualCtcLow: result.requiredAnnualCtcLow,
        requiredAnnualCtcPoint: result.requiredAnnualCtc,
        requiredAnnualCtcHigh: result.requiredAnnualCtcHigh,
      };
    }
  );

  const keyFindings = buildKeyFindings(pfComparisonRows, requiredCtcRows, salaryLevelRows);

  return {
    generatedAtIso,
    assumptions: MODEL_ASSUMPTIONS,
    salaryLevelRows,
    pfComparisonRows,
    requiredCtcRows,
    keyFindings,
  };
}

function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/** Findings are derived entirely from computed rows — no invented observed behaviour. */
function buildKeyFindings(
  pfRows: PfComparisonRow[],
  ctcRows: RequiredCtcRow[],
  levelRows: SalaryLevelRow[]
): string[] {
  const findings: string[] = [];

  const pfAt20L13pct = pfRows.find((r) => r.annualCtc === 20_00_000 && r.employerCostSharePct === 0.13);
  if (pfAt20L13pct) {
    findings.push(
      `At ₹20L CTC (13% employer-cost structure), choosing full-Basic PF instead of the statutory-ceiling default reduces monthly in-hand by ${formatInr(
        Math.abs(pfAt20L13pct.monthlyCashDifference)
      )} — ${formatInr(Math.abs(pfAt20L13pct.annualCashDifference))} a year — for a larger retirement corpus instead.`
    );
  }

  const ctcAt1L = ctcRows.find((r) => r.targetMonthlyInHand === 1_00_000);
  if (ctcAt1L) {
    findings.push(
      `To land ₹1,00,000/month in-hand, the required CTC ranges from ${formatInr(
        ctcAt1L.requiredAnnualCtcLow
      )} to ${formatInr(
        ctcAt1L.requiredAnnualCtcHigh
      )} a year depending only on how much of the offer is employer-side cost (8%–18% of CTC) — a spread of ${formatInr(
        ctcAt1L.requiredAnnualCtcHigh - ctcAt1L.requiredAnnualCtcLow
      )} for the identical take-home.`
    );
  }

  const level12L = levelRows.filter((r) => r.annualCtc === 12_00_000 && r.pfScenario === "statutory-ceiling");
  const level15L = levelRows.filter((r) => r.annualCtc === 15_00_000 && r.pfScenario === "statutory-ceiling");
  if (level12L.length && level15L.length) {
    const midCtc12 = level12L[Math.floor(level12L.length / 2)];
    const midCtc15 = level15L[Math.floor(level15L.length / 2)];
    const monthlyGap = midCtc15.monthlyInHand - midCtc12.monthlyInHand;
    findings.push(
      `Between ₹12L and ₹15L CTC, monthly in-hand rises by only ${formatInr(
        monthlyGap
      )} for a ₹3L/year jump in CTC — this is the ${MODEL_ASSUMPTIONS.financialYearLabel} Section 87A rebate cliff at ₹12L taxable income under the new regime.`
    );
  }

  const spreadAt10L = levelRows.filter((r) => r.annualCtc === 10_00_000 && r.pfScenario === "statutory-ceiling");
  if (spreadAt10L.length >= 2) {
    const low = Math.min(...spreadAt10L.map((r) => r.monthlyInHand));
    const high = Math.max(...spreadAt10L.map((r) => r.monthlyInHand));
    findings.push(
      `Two offers with the identical ₹10L CTC can differ by ${formatInr(
        high - low
      )}/month in-hand purely because of how much of the CTC is employer-side cost (PF, gratuity, insurance) versus fixed cash gross.`
    );
  }

  return findings;
}
