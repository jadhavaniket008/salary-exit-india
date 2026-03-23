/**
 * Monthly expense heuristics for Salary Reality Check — illustrative ranges, not a budget app.
 * Amounts are in INR; tuned for a single-earner household mental model.
 */

export type LifestyleLevel = "basic" | "moderate" | "premium";

type CategoryRow = {
  groceries: number;
  commuteMetro: number;
  commuteNonMetro: number;
  utilities: number;
  discretionary: number;
};

const TABLE: Record<LifestyleLevel, CategoryRow> = {
  basic: {
    groceries: 9_000,
    commuteMetro: 4_500,
    commuteNonMetro: 3_500,
    utilities: 3_000,
    discretionary: 6_000,
  },
  moderate: {
    groceries: 14_000,
    commuteMetro: 7_500,
    commuteNonMetro: 5_500,
    utilities: 4_500,
    discretionary: 15_000,
  },
  premium: {
    groceries: 22_000,
    commuteMetro: 12_000,
    commuteNonMetro: 9_000,
    utilities: 7_000,
    discretionary: 32_000,
  },
};

/** Used with CTC→in-hand to derive Basic+DA from gross when payslip splits are unknown. */
export const DEFAULT_BASIC_DA_SHARE_OF_GROSS = 0.45;

export type ExpenseLine = { label: string; amount: number; kind: "rent" | "modeled" };

export type MonthlyExpenseParts = {
  groceries: number;
  commute: number;
  utilities: number;
  discretionary: number;
};

/** Table-driven defaults for a metro/non-metro + lifestyle tier (single-earner household heuristic). */
export function getHeuristicMonthlyExpenses(params: {
  metroCity: boolean;
  lifestyle: LifestyleLevel;
}): MonthlyExpenseParts {
  const row = TABLE[params.lifestyle];
  const commute = params.metroCity ? row.commuteMetro : row.commuteNonMetro;
  return {
    groceries: row.groceries,
    commute,
    utilities: row.utilities,
    discretionary: row.discretionary,
  };
}

/** Build line items + totals from explicit monthly amounts (including user overrides). */
export function buildExpenseLinesFromMonthly(params: {
  monthlyRent: number;
  metroCity: boolean;
  groceries: number;
  commute: number;
  utilities: number;
  discretionary: number;
}): { lines: ExpenseLine[]; subtotalNonRent: number; total: number } {
  const lines: ExpenseLine[] = [
    { label: "Rent (your input)", amount: params.monthlyRent, kind: "rent" },
    { label: "Groceries & essentials", amount: params.groceries, kind: "modeled" },
    {
      label: params.metroCity ? "Commute (metro band)" : "Commute (non-metro band)",
      amount: params.commute,
      kind: "modeled",
    },
    { label: "Utilities (power, internet, phone)", amount: params.utilities, kind: "modeled" },
    { label: "Discretionary (dining, entertainment, misc.)", amount: params.discretionary, kind: "modeled" },
  ];

  const subtotalNonRent =
    params.groceries + params.commute + params.utilities + params.discretionary;
  const total = params.monthlyRent + subtotalNonRent;

  return { lines, subtotalNonRent, total };
}

export function estimateLifestyleExpenses(params: {
  monthlyRent: number;
  metroCity: boolean;
  lifestyle: LifestyleLevel;
}): { lines: ExpenseLine[]; subtotalNonRent: number; total: number } {
  const parts = getHeuristicMonthlyExpenses({
    metroCity: params.metroCity,
    lifestyle: params.lifestyle,
  });
  return buildExpenseLinesFromMonthly({
    monthlyRent: params.monthlyRent,
    metroCity: params.metroCity,
    ...parts,
  });
}

/** Short copy for the calculator UI — why numbers exist and how they move with inputs. */
export const SALARY_REALITY_EXPENSE_METHODOLOGY = {
  summary:
    "Defaults are rounded monthly bands for a single-earner household — not a budget app. They scale with lifestyle tier (how you eat, travel, and spend) and use a higher commute band in metro areas where distances and fares tend to run higher.",
  metroVsNonMetro:
    "Metro uses the higher commute figure from our internal table; non-metro uses the lower one. Groceries, utilities, and discretionary still follow the tier you pick — city size mainly shifts the commute line.",
  tiers:
    "Basic assumes lean essentials; moderate is a balanced mix; premium assumes higher food quality, comfort-first commute, and more dining/entertainment. Edit any line to match your reality.",
} as const;

export function lifestyleDescription(
  lifestyle: LifestyleLevel
): { title: string; body: string } {
  switch (lifestyle) {
    case "basic":
      return {
        title: "Basic",
        body: "Lean essentials: home cooking, minimal discretionary spend, modest commute assumptions.",
      };
    case "moderate":
      return {
        title: "Moderate",
        body: "Balanced mix: occasional dining out, reasonable commute, typical household utilities.",
      };
    case "premium":
      return {
        title: "Premium",
        body: "Higher spend on food quality, commute comfort, and lifestyle / entertainment — still a heuristic.",
      };
    default:
      return { title: lifestyle, body: "" };
  }
}
