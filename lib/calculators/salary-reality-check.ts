/**
 * Salary Reality Check — combines CTC→in-hand engine with lifestyle expense heuristics.
 */

import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import {
  DEFAULT_BASIC_DA_SHARE_OF_GROSS,
  buildExpenseLinesFromMonthly,
  getHeuristicMonthlyExpenses,
} from "@/lib/config/salary-reality-heuristics";
import { formatInr } from "@/lib/format-inr";
import type {
  LifestyleLevel,
  MonthlyExpenseParts,
  SalaryRealityDrivingFactor,
  SalaryRealityInput,
  SalaryRealityOutput,
  SavingsVerdict,
} from "@/types/salary-reality";
import type { CtcToInHandOutput, TaxRegime } from "@/types/salary";
import { computeCtcToInHand } from "./ctc-to-inhand";

function clampBasicDaShare(raw: number): number {
  if (!Number.isFinite(raw)) return DEFAULT_BASIC_DA_SHARE_OF_GROSS;
  return Math.min(0.6, Math.max(0.1, raw));
}

const VERDICT_COPY: Record<
  SavingsVerdict,
  { title: string; body: string }
> = {
  high: {
    title: "Strong savings potential",
    body:
      "On these assumptions, a solid share of estimated in-hand remains after modeled spend — useful buffer for goals, emergencies, or EMIs.",
  },
  moderate: {
    title: "Balanced but limited growth",
    body:
      "You’re saving on paper, but there isn’t a large cushion for surprises — one-off costs or higher real spend can eat the margin quickly.",
  },
  low: {
    title: "Cost of living is high relative to income",
    body:
      "Little is left after modeled tax, PF, and spend — the mix of rent, lifestyle, and deductions is squeezing savings on this model.",
  },
  negative: {
    title: "Unsustainable spending pattern",
    body:
      "Modeled spend exceeds estimated in-hand — on paper this doesn’t close without higher income, lower fixed costs, or lower spend.",
  },
};

function lifestyleTierLabel(tier: LifestyleLevel): string {
  switch (tier) {
    case "basic":
      return "basic";
    case "moderate":
      return "moderate";
    case "premium":
      return "premium";
    default:
      return tier;
  }
}

function buildVerdictNarrative(params: {
  verdict: SavingsVerdict;
  monthlySavings: number;
  savingsRatio: number;
  inHandMonthly: number;
  totalMonthlyExpenses: number;
  monthlyRent: number;
  lifestyle: LifestyleLevel;
  regime: TaxRegime;
  ctcEngine: CtcToInHandOutput;
  expenseParts: MonthlyExpenseParts;
}): {
  verdictWhy: string;
  verdictDrivingFactors: SalaryRealityDrivingFactor[];
  verdictSuggestions: string[];
} {
  const {
    verdict,
    monthlySavings,
    savingsRatio,
    inHandMonthly,
    totalMonthlyExpenses,
    monthlyRent,
    lifestyle,
    regime,
    ctcEngine,
    expenseParts,
  } = params;

  const gross = ctcEngine.grossMonthly;
  const taxStack =
    ctcEngine.employeePfMonthly + ctcEngine.professionalTaxMonthly + ctcEngine.tdsMonthly;
  const taxPctGross = gross > 0 ? (taxStack / gross) * 100 : 0;

  const rentPctSpend =
    totalMonthlyExpenses > 0 ? (monthlyRent / totalMonthlyExpenses) * 100 : 0;
  const nonRentLiving =
    expenseParts.groceries +
    expenseParts.commute +
    expenseParts.utilities +
    expenseParts.discretionary;
  const nonRentPct =
    totalMonthlyExpenses > 0 ? (nonRentLiving / totalMonthlyExpenses) * 100 : 0;

  let verdictWhy: string;
  if (verdict === "negative") {
    const gap = Math.max(0, totalMonthlyExpenses - inHandMonthly);
    verdictWhy =
      `Modeled spend totals ${formatInr(totalMonthlyExpenses)}/month versus estimated in-hand of ${formatInr(inHandMonthly)} — a shortfall of about ${formatInr(gap)}/month on this model. ` +
      "That’s why we treat this as unsustainable unless income rises or spend falls.";
  } else if (verdict === "low") {
    const ratioLow = savingsRatio < 0.12;
    const absLow = monthlySavings < 8_000;
    const parts: string[] = [];
    if (ratioLow) {
      parts.push(
        `your savings rate is below about 12% of estimated in-hand (${(savingsRatio * 100).toFixed(1)}%)`
      );
    }
    if (absLow) {
      parts.push(`estimated monthly savings are below ₹8,000 (${formatInr(monthlySavings)}/month)`);
    }
    verdictWhy =
      "This verdict is cautious because " +
      (parts.length > 0 ? parts.join(" and ") + ". " : "savings are tight relative to in-hand. ") +
      "Rent, tax/PF/TDS, and non-rent lifestyle lines together leave little margin on these assumptions.";
  } else if (verdict === "moderate") {
    verdictWhy =
      `Estimated savings are about ${(savingsRatio * 100).toFixed(1)}% of in-hand (${formatInr(monthlySavings)}/month left after modeled spend). ` +
      "That sits in the moderate band (roughly 12–28% of in-hand, with at least ₹8,000/month left) — stable, but limited room for shocks.";
  } else {
    verdictWhy =
      `Estimated savings are about ${(savingsRatio * 100).toFixed(1)}% of in-hand (${formatInr(monthlySavings)}/month left). ` +
      "That meets the strong band (about 28%+ of in-hand and at least ₹8,000/month) on this model — meaningful headroom for goals or emergencies.";
  }

  const verdictDrivingFactors: SalaryRealityDrivingFactor[] = [
    {
      id: "tax",
      label: "Tax and statutory deductions",
      detail:
        gross > 0
          ? `PF, TDS, and professional tax total about ${formatInr(taxStack)}/month (~${taxPctGross.toFixed(0)}% of gross monthly) — taken before your modeled spend.`
          : "No gross in this scenario — tax and PF are minimal.",
    },
    {
      id: "rent",
      label: "Rent",
      detail:
        monthlyRent > 0
          ? `${formatInr(monthlyRent)}/month — about ${rentPctSpend.toFixed(0)}% of modeled spend.`
          : "No rent in the model (e.g. family home or owned) — compare discretionary and other lines to your real situation.",
    },
    {
      id: "lifestyle",
      label: "Lifestyle and essentials (non-rent)",
      detail: `${lifestyleTierLabel(lifestyle)} tier plus your inputs imply about ${formatInr(nonRentLiving)}/month on groceries, commute, utilities, and discretionary — about ${nonRentPct.toFixed(0)}% of modeled spend.`,
    },
  ];

  const rentPct = totalMonthlyExpenses > 0 ? monthlyRent / totalMonthlyExpenses : 0;
  const discPct = totalMonthlyExpenses > 0 ? expenseParts.discretionary / totalMonthlyExpenses : 0;

  const verdictSuggestions: string[] = [];

  if (monthlyRent > 0 && (verdict === "negative" || verdict === "low" || rentPct > 0.35)) {
    verdictSuggestions.push(
      "Reduce rent or share housing if possible — it’s usually the largest fixed lever in this model."
    );
  } else if (monthlyRent === 0 && (verdict === "negative" || verdict === "low")) {
    verdictSuggestions.push(
      "If you expect to pay rent soon, re-run with that number — it will materially change the story."
    );
  } else if (verdict === "moderate" && monthlyRent > 0 && rentPct > 0.28) {
    verdictSuggestions.push(
      "Even a modest rent reduction can noticeably improve monthly savings at this margin."
    );
  }

  verdictSuggestions.push(
    regime === "new"
      ? "Switch regime in the CTC → in-hand tool: if you claim 80C, HRA, or similar, the old regime may net more in-hand than this new-regime estimate."
      : "Switch regime in the CTC → in-hand tool: if you use few deductions, the new regime may beat the old one for net in-hand."
  );

  if (verdict === "negative" || verdict === "low" || verdict === "moderate") {
    verdictSuggestions.push(
      "Negotiate salary or variable pay — higher gross generally flows through to in-hand (after PF and tax)."
    );
  }

  if (verdict === "negative" || verdict === "low" || discPct > 0.18) {
    verdictSuggestions.push(
      "Reduce discretionary spend (dining, entertainment, subscriptions) — it’s the quickest dial that isn’t rent or tax law."
    );
  } else if (verdict === "high") {
    verdictSuggestions.push(
      "Keep discretionary in check — strong modeled savings can erode if lifestyle spend drifts up."
    );
  }

  const seen = new Set<string>();
  const deduped = verdictSuggestions.filter((s) => {
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });

  return {
    verdictWhy,
    verdictDrivingFactors,
    verdictSuggestions: deduped.slice(0, 5),
  };
}

function classifyVerdict(
  monthlySavings: number,
  savingsRatio: number,
  inHandMonthly: number
): SavingsVerdict {
  if (monthlySavings < 0) return "negative";
  if (inHandMonthly <= 0) return "negative";
  if (savingsRatio < 0.12 || monthlySavings < 8_000) return "low";
  if (savingsRatio < 0.28) return "moderate";
  return "high";
}

export function computeSalaryRealityCheck(input: SalaryRealityInput): SalaryRealityOutput {
  const annualCtc = Math.max(0, input.annualCtc);
  const monthlyRent = Math.max(0, input.monthlyRent);
  const regime: TaxRegime = input.regime ?? "new";
  const basicDaShareOfGross = clampBasicDaShare(
    input.basicDaShareOfGross ?? DEFAULT_BASIC_DA_SHARE_OF_GROSS
  );

  const basicAndDaAnnual =
    annualCtc > 0 ? Math.round(annualCtc * basicDaShareOfGross) : undefined;

  const ctcEngine = computeCtcToInHand({
    annualGrossSalary: annualCtc,
    regime,
    metroCity: input.metroCity,
    professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
    basicAndDaAnnual,
  });

  const inHandMonthly = ctcEngine.inHandMonthly;

  const parts = input.monthlyExpenses ?? getHeuristicMonthlyExpenses({
    metroCity: input.metroCity,
    lifestyle: input.lifestyle,
  });

  const { lines: expenseLines, total: totalMonthlyExpenses } = buildExpenseLinesFromMonthly({
    monthlyRent,
    metroCity: input.metroCity,
    groceries: Math.max(0, parts.groceries),
    commute: Math.max(0, parts.commute),
    utilities: Math.max(0, parts.utilities),
    discretionary: Math.max(0, parts.discretionary),
  });

  const monthlySavings = inHandMonthly - totalMonthlyExpenses;
  const savingsRatio = inHandMonthly > 0 ? monthlySavings / inHandMonthly : 0;

  const verdict = classifyVerdict(monthlySavings, savingsRatio, inHandMonthly);
  const { title: verdictTitle, body: verdictBody } = VERDICT_COPY[verdict];

  const { verdictWhy, verdictDrivingFactors, verdictSuggestions } = buildVerdictNarrative({
    verdict,
    monthlySavings,
    savingsRatio,
    inHandMonthly,
    totalMonthlyExpenses,
    monthlyRent,
    lifestyle: input.lifestyle,
    regime,
    ctcEngine,
    expenseParts: parts,
  });

  const warnings: string[] = [
    "Expense lines are heuristics (not your bank statement). Tune rent and category lines, or compare lifestyle tier to your real spend.",
    `CTC is treated as annual gross for tax/PF like the CTC→in-hand calculator (${regime} regime, PF from Basic+DA = ${(basicDaShareOfGross * 100).toFixed(0)}% of gross, default PT).`,
    ...ctcEngine.warnings,
  ];

  if (monthlyRent === 0) {
    warnings.push("Rent is zero — if you live with family or own a home, discretionary may need to absorb maintenance costs not modeled here.");
  }

  return {
    inHandMonthly,
    ctcEngine,
    regime,
    basicDaShareOfGross,
    basicAndDaAnnual,
    expenseLines,
    totalMonthlyExpenses,
    monthlySavings,
    savingsRatio,
    verdict,
    verdictTitle,
    verdictBody,
    verdictWhy,
    verdictDrivingFactors,
    verdictSuggestions,
    warnings,
  };
}
