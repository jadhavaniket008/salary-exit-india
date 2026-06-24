import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function SalaryRealityCheckPromo() {
  return (
    <section
      aria-labelledby="salary-reality-heading"
      className="rounded-2xl border border-border bg-accent-light p-6 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Decision assistant
          </p>
          <h2
            id="salary-reality-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Salary Reality Check
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground-secondary">
            Enter <strong>CTC</strong>, <strong>rent</strong>, and a <strong>lifestyle band</strong>.
            We estimate in-hand with the same tax engine as our CTC calculator, layer transparent
            spend heuristics, and show <strong>savings ratio</strong> plus a plain verdict — so you
            can judge an offer or city move beyond a single net-pay number.
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-foreground-secondary">
            <li>In-hand from centralized FY + PF logic</li>
            <li>Modeled groceries, commute, utilities, discretionary</li>
            <li>Verdict: high / moderate / low / negative savings risk</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-semibold text-foreground">Start in under a minute</p>
          <Link
            href={ROUTES.salaryRealityCheck}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Run Salary Reality Check
          </Link>
          <Link
            href={ROUTES.ctcToInHandCalculator}
            className="text-center text-xs font-medium text-foreground-secondary hover:text-foreground transition-colors underline underline-offset-2"
          >
            Or open classic CTC → in-hand only
          </Link>
        </div>
      </div>
    </section>
  );
}
