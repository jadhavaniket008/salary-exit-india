import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { AdPlaceholder } from "@/components/content/AdPlaceholder";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { GUIDE_ARTICLES, GUIDE_HUBS, guideArticlePath } from "@/lib/content/guides-registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { ENGINE_FY_LABEL, SITE_CONTENT_LAST_UPDATED } from "@/lib/config/site-freshness";

export const metadata: Metadata = buildPageMetadata(GUIDE_HUBS.jobSwitch.seo, {
  canonicalPath: ROUTES.jobSwitchGuides,
});

export default function JobSwitchGuidesHubPage() {
  const articles = GUIDE_ARTICLES.filter((a) => a.hub === "jobSwitch");

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Full-width header ────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container className="py-8 sm:py-12">
          <BreadcrumbNav
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Job switch guides", href: ROUTES.jobSwitchGuides },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {GUIDE_HUBS.jobSwitch.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-secondary">
                {GUIDE_HUBS.jobSwitch.description}
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

          <div className="rounded-xl border border-border bg-surface-subtle p-5 text-sm">
            <p className="font-semibold text-foreground">High-signal calculators</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.offerComparisonCalculator}>
                  Offer comparison
                </Link>
              </li>
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.noticePeriodBuyoutCalculator}>
                  Notice buyout
                </Link>
              </li>
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.gratuityCalculator}>
                  Gratuity
                </Link>
              </li>
              <li>
                <Link className="text-foreground-secondary transition-colors hover:text-accent" href={ROUTES.methodology}>
                  Methodology — FY scope and engine limits
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
