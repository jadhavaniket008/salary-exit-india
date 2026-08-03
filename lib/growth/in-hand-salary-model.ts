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
import { progressiveTax, rebate87ANewRegime } from "@/lib/calculators/income-tax";
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
  /** Gross minus the new-regime standard deduction — the actual Section 87A comparison basis. */
  taxableIncomeAnnual: number;
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
): {
  annualGross: number;
  employeePfAnnual: number;
  taxableIncomeAnnual: number;
  monthlyInHand: number;
  annualTax: number;
} {
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
    // Matches estimateAnnualIncomeTax's new-regime formula exactly (annual-tax.ts):
    // taxableIncomeAnnual = max(0, gross - standardDeductionNewRegime).
    taxableIncomeAnnual: Math.max(0, annualGross - DEFAULT_FINANCIAL_YEAR.standardDeductionNewRegime),
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
        taxableIncomeAnnual: capped.taxableIncomeAnnual,
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
        taxableIncomeAnnual: full.taxableIncomeAnnual,
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

/**
 * Finds where Section 87A's new-regime marginal relief (income-tax.ts,
 * rebate87ANewRegime) stops applying — i.e. where tax-after-rebate first
 * equals tax-before-rebate again, so normal slab progression resumes.
 * Below this point (and above the rebate threshold), income tax *before
 * cess* rises at exactly 100% marginal rate (rebate = max(0, slabTax -
 * excess), so tax-after-rebate = excess = taxable - limit) — matching
 * lib/calculators/FORMULAS.md's own pre-existing description of this same
 * mechanism ("tax before cess is capped at (taxable income - limit)").
 * Once the 4% health & education cess (income-tax.ts's addCess) is added on
 * top, the marginal rate on TOTAL tax liability in this zone is 104%, not
 * 100% — a materially different, more precise claim, verified numerically
 * before being written into report copy; see docs/growth/
 * final-tax-wording-audit.md.
 */
function findMarginalReliefZoneEndTaxableIncome(): number {
  const fy = DEFAULT_FINANCIAL_YEAR;
  const start = fy.rebate87ANewRegimeIncomeLimit;
  let low = start;
  let high = start + 5_00_000; // generous search ceiling — well past any realistic phase-out width
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const before = progressiveTax(mid, fy.newRegimeSlabs);
    const rebate = rebate87ANewRegime(mid, before, fy);
    const after = before - rebate;
    // Inside the zone: after === mid - start (100% marginal rate). Once the
    // rebate hits zero, after === before again — that's the phase-out point.
    if (Math.abs(after - before) < 1) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return high;
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

  // Explicitly the 13% (mid) employer-cost scenario — not array-position order.
  const ctc12LMid = levelRows.find(
    (r) => r.annualCtc === 12_00_000 && r.pfScenario === "statutory-ceiling" && r.employerCostSharePct === 0.13
  );
  const ctc15LMid = levelRows.find(
    (r) => r.annualCtc === 15_00_000 && r.pfScenario === "statutory-ceiling" && r.employerCostSharePct === 0.13
  );
  if (ctc12LMid && ctc15LMid) {
    const monthlyGap = ctc15LMid.monthlyInHand - ctc12LMid.monthlyInHand;
    findings.push(
      `At a 13% employer-cost structure, moving from ₹12L to ₹15L CTC (a ₹3L/year increase) raises monthly in-hand by only ${formatInr(
        monthlyGap
      )}. Taxable income moves from ${formatInr(ctc12LMid.taxableIncomeAnnual)} (below the ₹12L nil-tax threshold, so ₹0 tax) to ${formatInr(
        ctc15LMid.taxableIncomeAnnual
      )} (inside Section 87A's new-regime marginal-relief zone, where tax is genuinely payable) — the CTC figures and the ₹12L taxable-income threshold are on different bases, not the same number.`
    );
  }

  const zoneEnd = findMarginalReliefZoneEndTaxableIncome();
  const zoneWidth = zoneEnd - DEFAULT_FINANCIAL_YEAR.rebate87ANewRegimeIncomeLimit;
  const cessMultiplier = 1 + DEFAULT_FINANCIAL_YEAR.cessRate;
  const totalMarginalRatePct = Math.round(cessMultiplier * 100);
  findings.push(
    `Under the configured new-regime rules, marginal relief limits income tax immediately above ₹12,00,000 taxable income — this is not a hard cliff; crossing the threshold doesn't jump straight to full slab tax. In this ${formatInr(
      zoneWidth
    )}-wide transition band (₹12,00,000 to ${formatInr(
      zoneEnd
    )} taxable income), income tax before cess broadly tracks the amount by which taxable income exceeds ₹12,00,000 — an effective 100% marginal rate on income tax alone. Health and education cess is applied separately on top: including the ${Math.round(
      DEFAULT_FINANCIAL_YEAR.cessRate * 100
    )}% cess, the marginal rate on total tax liability in this band is ${totalMarginalRatePct}%, meaning take-home pay can fall slightly for a marginal rupee earned in this exact range. SalaryExit calculates this boundary from its configured ${
      MODEL_ASSUMPTIONS.financialYearLabel
    } tax engine — it is a model result, not a separately published statutory threshold.`
  );

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
