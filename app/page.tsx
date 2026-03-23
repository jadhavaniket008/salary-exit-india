import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section, Card } from "@/components/ui";
import { SiteSearchClient } from "@/components/home/SiteSearchClient";
import { AdSlot } from "@/components/ads/AdSlot";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { SalaryRealityCheckPromo } from "@/components/home/SalaryRealityCheckPromo";
import { JsonLd } from "@/components/content/JsonLd";
import { FaqSection } from "@/components/calculators/FaqSection";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { HOME_FAQ } from "@/lib/content/home-content";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { faqPageJsonLd } from "@/lib/jsonld";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath } from "@/lib/routes/landing-routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "SalaryExit India — India salary, tax & exit estimates you can audit",
    description:
      "SEO-first calculators and plain-English guides for Indian salaried employees: CTC to in-hand, tax regimes, PF/HRA, notice buyouts, gratuity, and offer comparison — with explicit assumptions.",
    keywords: [
      "India salary calculator",
      "CTC to in hand",
      "old vs new tax regime India",
      "notice buyout calculator",
      "gratuity India",
    ],
  },
  { canonicalPath: ROUTES.home }
);

const featuredSlugs = [
  "salaryRealityCheck",
  "ctcToInHand",
  "salary",
  "taxRegime",
  "offerComparison",
] as const;

export default function Home() {
  const featured = featuredSlugs.map((s) => CALCULATOR_REGISTRY[s]);
  const popularLpa = LPA_LANDING_PAGES.slice(0, 6);

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={faqPageJsonLd(
          HOME_FAQ.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />

      <main className="flex-1">
        <Section className="pt-8 sm:pt-14">
          <Container className="space-y-12">
            <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <HomeHeroSection />

              <Card className="space-y-4 p-5">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Search the site
                </h2>
                <SiteSearchClient />
              </Card>
            </header>

            <AdSlot position="below-hero" label="Advertisement" className="w-full" />

            <SalaryRealityCheckPromo />

            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(240px,280px)] lg:items-start">
              <div className="min-w-0 space-y-12">
            <section aria-labelledby="featured-calculators-heading" className="space-y-4">
              <h2
                id="featured-calculators-heading"
                className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Most used calculators
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {featured.map((c) => (
                  <Link
                    key={c.slug}
                    href={c.path}
                    className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                  >
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">{c.label}</span>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.seo.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <AdSlot position="mid-content" label="Advertisement" />

            <section aria-labelledby="clusters-heading" className="grid gap-6 lg:grid-cols-3">
              <h2 className="sr-only" id="clusters-heading">
                Guide clusters
              </h2>
              <Card className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Salary</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Structure, components, and what moves in-hand pay.
                </p>
                <Link className="text-sm font-medium underline" href={ROUTES.salaryGuides}>
                  Open salary guides
                </Link>
              </Card>
              <Card className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tax</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Regime basics for salaried employees — educational context.
                </p>
                <Link className="text-sm font-medium underline" href={ROUTES.taxGuides}>
                  Open tax guides
                </Link>
              </Card>
              <Card className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Job switch</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Notice buyouts, gratuity, and comparing offers beyond CTC.
                </p>
                <Link className="text-sm font-medium underline" href={ROUTES.jobSwitchGuides}>
                  Open job switch guides
                </Link>
              </Card>
            </section>

            <section aria-labelledby="popular-salary-pages-heading" className="space-y-4">
              <h2
                id="popular-salary-pages-heading"
                className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Popular salary landing pages
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Generated from <code className="text-xs">lib/content/lpa-pages.config.ts</code> — add rows to
                scale to many pages without duplicating templates.
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {popularLpa.map((p) => (
                  <Link
                    key={p.slug}
                    href={lpaLandingPath(p.slug)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  >
                    ₹{p.lpa} LPA in-hand (estimate)
                  </Link>
                ))}
              </div>
            </section>

            <section aria-labelledby="why-vary-heading" className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h2 id="why-vary-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Why estimates vary (and why we publish assumptions)
              </h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>
                  <strong>Financial year settings</strong> change slabs, standard deductions, and rebate
                  thresholds — we version them in config.
                </li>
                <li>
                  <strong>PF wage definitions</strong> differ by employer; we avoid “magic accuracy” by letting
                  you supply payslip-aligned inputs where possible.
                </li>
                <li>
                  <strong>Professional tax</strong> is state-specific — we use placeholders unless you replace
                  them.
                </li>
                <li>
                  <strong>TDS smoothing</strong> means monthly net pay may not equal annual tax ÷ 12 every month.
                </li>
              </ul>
            </section>

            <TrustMethodologyNotice />

            <AdSlot position="before-footer" label="Advertisement" />

            <FaqSection items={HOME_FAQ} />
              </div>

              <div className="hidden lg:block lg:self-start">
                <AdSlot position="sidebar-desktop" label="Advertisement" />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
