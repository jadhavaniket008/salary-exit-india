/**
 * Rank offers by in-hand and by CTC.
 */

import type {
  OfferComparisonInput,
  OfferComparisonOutput,
  OfferComparisonRow,
} from "@/types/offer";

function rankBy<T>(
  items: T[],
  key: (x: T) => number,
  order: "desc" | "asc"
): Map<T, number> {
  const sorted = [...items].sort((a, b) =>
    order === "desc" ? key(b) - key(a) : key(a) - key(b)
  );
  const map = new Map<T, number>();
  sorted.forEach((item, idx) => {
    map.set(item, idx + 1);
  });
  return map;
}

export function compareOffers(input: OfferComparisonInput): OfferComparisonOutput {
  const warnings: string[] = [
    "Ranks use the estimated in-hand and CTC you supply — ensure each offer used the same methodology.",
    "Variable pay, RSUs, joining bonus, and employer PF are not modeled separately. Enter CTC and in-hand so they are comparable (e.g. all annualized the same way).",
  ];

  if (input.offers.length === 0) {
    return {
      rows: [],
      bestByInHand: "",
      bestByCtc: "",
      warnings: [...warnings, "No offers to compare."],
    };
  }

  const rankInHand = rankBy(input.offers, (o) => o.estimatedInHandMonthly, "desc");
  const rankCtc = rankBy(input.offers, (o) => o.annualCtc, "desc");

  const rows: OfferComparisonRow[] = input.offers.map((o) => ({
    ...o,
    rankByInHand: rankInHand.get(o) ?? 0,
    rankByCtc: rankCtc.get(o) ?? 0,
  }));

  const bestByInHand = [...input.offers].sort(
    (a, b) => b.estimatedInHandMonthly - a.estimatedInHandMonthly
  )[0]?.label ?? "";
  const bestByCtc = [...input.offers].sort(
    (a, b) => b.annualCtc - a.annualCtc
  )[0]?.label ?? "";

  return { rows, bestByInHand, bestByCtc, warnings };
}
