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
        className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
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
              className="block rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
