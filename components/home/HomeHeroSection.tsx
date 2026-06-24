"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ROUTES } from "@/lib/routes";

const deductions = [
  { label: "Monthly gross", value: "₹1,00,000", type: "base" as const },
  { label: "PF (12% on ₹15k ceiling)", value: "−₹1,800", type: "deduct" as const },
  { label: "Professional tax", value: "−₹200", type: "deduct" as const },
  { label: "Income tax (87A rebate)", value: "₹0", type: "zero" as const },
];

function SalaryPreviewCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg ring-1 ring-border/40">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-muted">
            Example · ₹12 LPA · New regime · FY 2026–27
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
          Zero tax
        </span>
      </div>

      {/* Big number */}
      <div className="mb-5 border-b border-border pb-5">
        <p className="text-xs text-foreground-muted">Monthly in-hand</p>
        <p className="mt-0.5 font-mono text-5xl font-bold tracking-tight text-accent">
          ₹98,000
        </p>
        <p className="mt-1 text-xs text-foreground-muted">₹11,76,000 per year</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-2">
        {deductions.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-foreground-secondary">{row.label}</span>
            <span
              className={`font-mono font-medium tabular-nums ${
                row.type === "base"
                  ? "text-foreground"
                  : row.type === "zero"
                    ? "text-positive"
                    : "text-foreground-secondary"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="text-sm font-bold text-foreground">Monthly in-hand</span>
          <span className="font-mono text-sm font-bold text-positive">₹98,000</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-foreground-muted">
        Estimate only · New regime · PF on ₹15k statutory ceiling · Section 87A rebate eliminates tax at ₹12L CTC
      </p>
    </div>
  );
}

export function HomeHeroSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
      {/* Left — headline + CTAs */}
      <motion.div
        className="space-y-6 py-2"
        initial={{ opacity: 1, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            For Indian salaried employees
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Know your real in-hand salary.
          </h1>
          <p className="text-lg font-medium text-foreground-secondary">
            Before you accept, switch, or resign.
          </p>
          <p className="max-w-lg text-sm leading-relaxed text-foreground-secondary">
            Free calculators with transparent assumptions — CTC to take-home, tax
            regime comparison, offer analysis, and exit maths. Built for Indian
            payslips.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="space-y-3">
          <Link
            href={ROUTES.ctcToInHandCalculator}
            className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-lg sm:w-auto"
          >
            Calculate my in-hand salary →
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ROUTES.salaryRealityCheck}
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
            >
              Salary Reality Check
            </Link>
            <Link
              href={ROUTES.offerComparisonCalculator}
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
            >
              Compare offers
            </Link>
            <Link
              href={ROUTES.oldVsNewTaxRegimeCalculator}
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
            >
              Old vs new regime
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right — preview card, hidden on small mobile to avoid dead zone */}
      <motion.div
        className="hidden sm:block"
        initial={{ opacity: 1, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <SalaryPreviewCard />
      </motion.div>
    </div>
  );
}
