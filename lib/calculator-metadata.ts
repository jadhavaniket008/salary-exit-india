import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculator-registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { CalculatorSlug } from "@/lib/routes";

export function calculatorMetadata(slug: CalculatorSlug): Metadata {
  const c = getCalculator(slug);
  return buildPageMetadata(c.seo, { canonicalPath: c.path });
}
