"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ROUTES } from "@/lib/routes";

const deductions = [
  { label: "Monthly gross", value: "₹1,00,000", type: "base" as const },
  { label: "PF employee (12% on ₹15k ceiling)", value: "−₹1,800", type: "deduct" as const },
  { label: "Professional tax", value: "−₹200", type: "deduct" as const },
  { label: "Income tax (Section 87A rebate)", value: "₹0", type: "zero" as const },
];

function SalaryPreviewCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-foreground-muted">Example calculation</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">
            ₹12 LPA · New regime · FY 2026–27
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
          Zero income tax
        </span>
      </div>

      {/* Primary result */}
      <div className="mb-5">
        <p className="text-xs text-foreground-secondary">Estimated monthly in-hand</p>
        <p className="mt-1 font-mono text-4xl font-bold text-accent tracking-tight">
          ₹98,000
        </p>
        <p className="mt-1 text-xs text-foreground-muted">₹11,76,000 per year</p>
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-border bg-surface-subtle p-4">
        <p className="mb-3 text-xs font-semibold text-foreground-secondary">
          Monthly breakdown
        </p>
        <div className="space-y-2">
          {deductions.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <span className="text-foreground-secondary">{row.label}</span>
              <span
                className={`font-mono font-medium ${
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
          <div className="flex items-center justify-between border-t border-border pt-2 text-sm">
            <span className="font-semibold text-foreground">Monthly in-hand</span>
            <span className="font-mono font-bold text-positive">₹98,000</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-foreground-muted">
        Estimate · New regime · PF on ₹15k statutory ceiling · PT ₹200/mo ·
        Section 87A rebate covers full income tax liability at ₹12L CTC
      </p>
    </div>
  );
}

export function HomeHeroSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      {/* Left — headline + CTAs */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            For Indian salaried employees
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            Know your real in-hand salary — before you accept, switch, or resign.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-foreground-secondary">
            Free calculators with transparent assumptions. CTC to take-home, tax regime
            comparison, offer analysis, and exit calculations — built for Indian payslips,
            not generic salary tools.
          </p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <Link
            href={ROUTES.ctcToInHandCalculator}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Calculate my in-hand salary
          </Link>
          <Link
            href={ROUTES.salaryRealityCheck}
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
          >
            Salary Reality Check
          </Link>
          <Link
            href={ROUTES.offerComparisonCalculator}
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
          >
            Compare offers
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          className="text-xs text-foreground-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          FY 2026–27 engine · No login required · Not tax advice · Assumptions always visible
        </motion.p>
      </motion.div>

      {/* Right — preview card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SalaryPreviewCard />
      </motion.div>
    </div>
  );
}
