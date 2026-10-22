import Link from "next/link";
import { ROUTES } from "@/lib/routes";

/**
 * Homepage promo for the flagship modeled CTC→in-hand dataset.
 * Numbers are engine-generated scenarios — not observed salary-survey data.
 */
export function InHandModelReportPromo() {
  return (
    <section
      aria-labelledby="in-hand-model-report-heading"
      className="rounded-2xl border-2 border-accent/25 bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Free data report
          </p>
          <h2
            id="in-hand-model-report-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            72 modelled CTC → in-hand scenarios
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            Open the{" "}
            <strong className="font-semibold text-foreground">
              India In-Hand Salary Model 2026
            </strong>{" "}
            for a transparent dataset: how ₹5L–₹50L CTC converts to monthly take-home across
            employer-cost structures and PF bases — with stated assumptions and free{" "}
            <strong className="font-semibold text-foreground">CSV / JSON</strong> downloads.
          </p>
          <p className="max-w-2xl rounded-lg border border-border bg-surface-subtle px-3 py-2 text-xs leading-relaxed text-foreground-secondary">
            These figures are <strong className="text-foreground">modeled</strong> by
            SalaryExit&apos;s live tax and PF engine. They are{" "}
            <strong className="text-foreground">not observed salary survey data</strong>.
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-foreground-secondary">
            <li>72 distinct modelled scenarios (CTC × employer-cost × PF base)</li>
            <li>Transparent FY / PF assumptions published on the report</li>
            <li>Downloadable CSV and JSON for your own checks</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-accent-light p-5 shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            See the full modelled report
          </p>
          <Link
            href={ROUTES.inHandSalaryModelReport}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent-solid px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open India In-Hand Salary Model 2026
          </Link>
          <p className="text-center text-xs text-foreground-secondary">
            Modeled estimates · Educational use only
          </p>
        </div>
      </div>
    </section>
  );
}
