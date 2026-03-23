import Link from "next/link";
import { ROUTES } from "@/lib/routes";

/**
 * Homepage primary feature — decision assistant positioning.
 */
export function SalaryRealityCheckPromo() {
  return (
    <section
      aria-labelledby="salary-reality-heading"
      className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-indigo-50 via-white to-amber-50/80 p-6 shadow-sm dark:border-zinc-800 dark:from-indigo-950/40 dark:via-zinc-950 dark:to-amber-950/20 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />
      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            Decision assistant
          </p>
          <h2
            id="salary-reality-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Salary Reality Check
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Enter <strong>CTC</strong>, <strong>rent</strong>, and a <strong>lifestyle band</strong>. We estimate
            in-hand with the same tax engine as our CTC calculator, layer transparent spend heuristics, and show{" "}
            <strong>savings ratio</strong> plus a clear verdict — so you can judge an offer or city move beyond a
            single net-pay number.
          </p>
          <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>In-hand from centralized FY + PF logic</li>
            <li>Modeled groceries, commute, utilities, discretionary by lifestyle</li>
            <li>Verdict: high / moderate / low / negative savings risk</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/80">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Start in under a minute</p>
          <Link
            href={ROUTES.salaryRealityCheck}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Run Salary Reality Check
          </Link>
          <Link
            href={ROUTES.ctcToInHandCalculator}
            className="text-center text-xs font-medium text-zinc-600 underline underline-offset-2 dark:text-zinc-400"
          >
            Or open classic CTC → in-hand only
          </Link>
        </div>
      </div>
    </section>
  );
}
