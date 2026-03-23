"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ROUTES } from "@/lib/routes";

export function HomeHeroSection() {
  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        India · salaried employees · planning & education
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
        SalaryExit India: calculators built to show their assumptions
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        We connect <strong>transparent estimates</strong> (a tested engine in{" "}
        <code className="text-xs">lib/calculators</code>) with <strong>plain-English guides</strong> so you can
        reason about CTC, in-hand pay, tax regimes, and exit scenarios — without mistaking a blog for tax filing
        advice.
      </p>
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        <Link
          href={ROUTES.salaryRealityCheck}
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Salary Reality Check
        </Link>
        <Link
          href={ROUTES.calculators}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          All calculators
        </Link>
        <Link
          href={ROUTES.salaryGuides}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          Salary guides
        </Link>
        <Link
          href={ROUTES.methodology}
          className="inline-flex items-center justify-center rounded-lg border border-transparent px-2 py-2 text-sm font-medium text-zinc-600 underline-offset-4 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          How we calculate
        </Link>
      </motion.div>
    </motion.div>
  );
}
