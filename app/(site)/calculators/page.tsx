import Link from "next/link";
import { Container } from "@/components/ui";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONTENT_LAST_UPDATED, ENGINE_FY_LABEL } from "@/lib/config/site-freshness";
import { MethodologyLink } from "@/components/trust/MethodologyLink";

export const metadata = buildPageMetadata(
  {
    title: "Calculators hub",
    description:
      "India salary, tax regime, PF, HRA, gratuity, leave encashment, notice buyout, final settlement, offer comparison, and hike calculators — powered by a centralized engine.",
    keywords: [
      "India salary calculator",
      "CTC to in-hand",
      "old vs new tax regime",
      "HRA exemption",
      "EPF",
    ],
  },
  { canonicalPath: ROUTES.calculators }
);

export default function CalculatorsHubPage() {
  const items = Object.values(CALCULATOR_REGISTRY).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Full-width page header ──────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container className="py-10 sm:py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Calculators
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-secondary">
                Each page uses the same core calculation code with explicit
                assumptions, validation, and estimate labeling.
              </p>
              <p className="mt-4 text-sm text-foreground-secondary">
                Prefer reading first?{" "}
                <Link
                  className="font-medium text-accent underline-offset-2 hover:underline"
                  href={ROUTES.salaryGuides}
                >
                  Salary guides
                </Link>
                {", "}
                <Link
                  className="font-medium text-accent underline-offset-2 hover:underline"
                  href={ROUTES.taxGuides}
                >
                  tax guides
                </Link>
                {", or "}
                <Link
                  className="font-medium text-accent underline-offset-2 hover:underline"
                  href={ROUTES.jobSwitchGuides}
                >
                  job switch guides
                </Link>
                . Formula scope: <MethodologyLink inline />.
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-right text-xs">
              <p className="font-semibold text-foreground-secondary">
                {ENGINE_FY_LABEL}
              </p>
              <p className="mt-0.5 text-foreground-muted">
                Reviewed {SITE_CONTENT_LAST_UPDATED}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Calculator card grid ────────────────────────────────────────── */}
      <div className="py-10 sm:py-14">
        <Container className="max-w-5xl">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <li
                key={c.slug}
                className="animate-in"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <Link
                  href={c.path}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  <p className="text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                    {c.label}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary line-clamp-3">
                    {c.seo.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Open calculator →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
