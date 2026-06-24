import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { AdPlaceholder } from "@/components/content/AdPlaceholder";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import { GUIDE_HUBS, GUIDE_ARTICLES, guideArticlePath } from "@/lib/content/guides-registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import { ENGINE_FY_LABEL, SITE_CONTENT_LAST_UPDATED } from "@/lib/config/site-freshness";

export const metadata: Metadata = buildPageMetadata(GUIDE_HUBS.salary.seo, {
  canonicalPath: ROUTES.salaryGuides,
});

export default function SalaryGuidesHubPage() {
  const articles = GUIDE_ARTICLES.filter((a) => a.hub === "salary");
  const popularLpa = LPA_LANDING_PAGES.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Full-width header ────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container className="py-8 sm:py-12">
          <BreadcrumbNav
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Salary guides", href: ROUTES.salaryGuides },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {GUIDE_HUBS.salary.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-secondary">
                {GUIDE_HUBS.salary.description}
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-right text-xs">
              <p className="font-semibold text-foreground-secondary">{ENGINE_FY_LABEL}</p>
              <p className="mt-0.5 text-foreground-muted">Reviewed {SITE_CONTENT_LAST_UPDATED}</p>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="py-10 sm:py-14">
        <Container className="max-w-3xl space-y-10">
          <AdPlaceholder />

          <section aria-labelledby="articles-heading" className="space-y-4">
            <h2 id="articles-heading" className="text-xl font-bold text-foreground">
              Core guides
            </h2>
            <ul className="space-y-3">
              {articles.map((a, i) => (
                <li key={a.segment} className="animate-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link
                    href={guideArticlePath(a)}
                    className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                  >
                    <span className="font-bold text-foreground transition-colors group-hover:text-accent">
                      {a.title}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">
                      {a.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="lpa-heading" className="space-y-4">
            <h2 id="lpa-heading" className="text-xl font-bold text-foreground">
              Popular in-hand salary pages
            </h2>
            <p className="text-sm text-foreground-secondary">
              Scenario-based estimates with explicit assumptions — we expand coverage by adding new LPA
              scenarios to our content catalogue as we publish them.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {popularLpa.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={lpaLandingPath(p.slug)}
                    className="block rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm"
                  >
                    ₹{p.lpa} LPA in-hand (estimate)
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={ROUTES.ctcToInHandCalculator} className="text-sm font-medium text-accent hover:underline">
              Open the full CTC → in-hand calculator
            </Link>
          </section>

          <section aria-labelledby="enough-heading" className="space-y-4">
            <h2 id="enough-heading" className="text-xl font-bold text-foreground">
              Is this salary enough? (city + rent)
            </h2>
            <p className="text-sm text-foreground-secondary">
              Decision-intent pages with a clear answer, realistic rent assumptions, and an embedded{" "}
              <Link href={ROUTES.salaryRealityCheck} className="font-medium text-accent hover:underline">
                Salary Reality Check
              </Link>
              . More city and salary combinations are added over time as we publish them.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {SALARY_ENOUGH_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={salaryEnoughPath(p.slug)}
                    className="block rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm"
                  >
                    {p.seo.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-xl border border-border bg-surface-subtle p-5 text-sm">
            <p className="font-semibold text-foreground">Related hubs</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.taxGuides}>
                  Tax guides
                </Link>
              </li>
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.jobSwitchGuides}>
                  Job switch &amp; exit guides
                </Link>
              </li>
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.calculators}>
                  Calculators hub
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
