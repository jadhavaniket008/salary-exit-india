"use client";

import Link from "next/link";
import { trackLpa12CalculatorEntry } from "@/lib/analytics/client";
import { LPA_12_GROSS_EXAMPLE_HREF } from "@/lib/growth/lpa12-entry";

/** Distinct tracked guide-to-tool action; link remains usable without analytics consent. */
export function Lpa12CalculatorLink() {
  return (
    <Link
      href={LPA_12_GROSS_EXAMPLE_HREF}
      onClick={() => trackLpa12CalculatorEntry()}
      className="inline-flex rounded-lg bg-accent-solid px-4 py-2 text-sm font-semibold text-white"
    >
      Try ₹12 LPA gross in the calculator →
    </Link>
  );
}
