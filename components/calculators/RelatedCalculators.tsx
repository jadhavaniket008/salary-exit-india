"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CalculatorSlug } from "@/lib/routes";
import { relatedCalculatorLinks } from "@/lib/calculator-registry";

type Props = {
  currentSlug: CalculatorSlug;
};

export function RelatedCalculators({ currentSlug }: Props) {
  const links = relatedCalculatorLinks(currentSlug);
  return (
    <nav aria-labelledby="related-heading" className="space-y-3">
      <h2
        id="related-heading"
        className="text-lg font-semibold text-foreground"
      >
        Related calculators
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.04 }}
          >
            <Link
              href={l.href}
              className="block rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm active:scale-[0.99]"
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
