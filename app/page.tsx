import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { SalaryRealityCheckPromo } from "@/components/home/SalaryRealityCheckPromo";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/content/JsonLd";
import { FaqSection } from "@/components/calculators/FaqSection";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { HOME_FAQ } from "@/lib/content/home-content";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { faqPageJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath } from "@/lib/routes/landing-routes";
import { SiteSearchClient } from "@/components/home/SiteSearchClient";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "SalaryExit India — real in-hand salary calculator (FY 2026–27)",
    description:
      "Know your actual take-home salary before accepting or switching jobs. Free calculators for Indian salaried employees: CTC to in-hand, tax regime comparison, offer analysis, HRA, PF, gratuity, and exit calculations — with transparent assumptions.",
    keywords: [
      "India salary calculator",
      "CTC to in hand salary",
      "old vs new tax regime India",
      "take home salary calculator India",
      "notice buyout calculator",
      "gratuity India",
    ],
  },
  { canonicalPath: ROUTES.home }
);

const secondaryCalculators = [
  "taxRegime",
  "salaryRealityCheck",
  "offerComparison",
  "hra",
  "finalSettlement",
] as const;

const realQuestions = [
  {
    question: "Is ₹12 LPA enough in Mumbai?",
    answer:
      "After new-regime tax (₹0 at ₹12L with Section 87A rebate), PF, and PT, monthly in-hand is around ₹98,000. Mumbai rents for a 1BHK typically start at ₹25,000–₹45,000. So the answer depends heavily on rent and lifestyle.",
    cta: { href: ROUTES.salaryRealityCheck, label: "Run Salary Reality Check" },
  },
  {
    question: "How much will I take home from a ₹15 LPA offer?",
    answer:
      "Under the new regime: taxable income ₹13.75L (after ₹75k std. deduction) → estimated tax ~₹1,01,400/yr. Monthly in-hand ≈ ₹1,10,000 after PF ₹1,800 and PT ₹200.",
    cta: { href: ROUTES.ctcToInHandCalculator, label: "Calculate ₹15L in-hand" },
  },
  {
    question: "Old or new tax regime — which saves more?",
    answer:
      "Below ₹15L, the new regime almost always wins unless you have significant HRA + 80C + home loan interest. Run the comparison with your actual deductions to be sure.",
    cta: { href: ROUTES.oldVsNewTaxRegimeCalculator, label: "Compare regimes" },
  },
] as const;

export default function Home() {
  const primaryCalc = CALCULATOR_REGISTRY["ctcToInHand"];
  const secondary = secondaryCalculators.map((s) => CALCULATOR_REGISTRY[s]);
  const popularLpa = LPA_LANDING_PAGES.slice(0, 8);

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={faqPageJsonLd(
          HOME_FAQ.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-surface py-10 sm:py-14" aria-label="Hero">
          <Container>
            <HomeHeroSection />
          </Container>
        </section>

        {/* ── Trust strip ────────────────────────────────────────────── */}
        <section className="border-b border-border bg-surface-subtle py-3.5" aria-label="Trust indicators">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-foreground-secondary">
              {[
                "FY 2026–27 engine",
                "No login required",
                "Estimates — not tax filing advice",
                "Assumptions always visible",
                "Built for Indian salary structure",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg className="h-3 w-3 shrink-0 text-positive" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M10.28 2.28L4.5 8.06 1.72 5.28a1 1 0 0 0-1.42 1.44l3.5 3.5a1 1 0 0 0 1.42 0l6.5-6.5a1 1 0 0 0-1.44-1.44z"/>
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <Container className="space-y-14 py-10 sm:py-14">

          {/* ── Calculator grid — featured primary + secondary grid ─── */}
          <section aria-labelledby="calculators-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 id="calculators-heading" className="text-xl font-bold text-foreground sm:text-2xl">
                  Calculators
                </h2>
                <p className="mt-1 text-sm text-foreground-secondary">
                  Every one uses the same FY 2026–27 engine and states its assumptions.
                </p>
              </div>
              <Link
                href={ROUTES.calculators}
                className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                See all →
              </Link>
            </div>

            {/* Featured card — CTC to in-hand */}
            <Link
              href={primaryCalc.path}
              className="group mb-3 flex flex-col gap-3 rounded-2xl border-2 border-accent/30 bg-accent-light p-6 shadow-sm transition-all hover:border-accent/60 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    Most used
                  </span>
                </div>
                <span className="block text-base font-bold text-foreground group-hover:text-accent transition-colors">
                  {primaryCalc.label}
                </span>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground-secondary">
                  {primaryCalc.seo.description}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-accent group-hover:underline">
                Calculate now →
              </span>
            </Link>

            {/* Secondary 5 calculators */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {secondary.map((c) => (
                <Link
                  key={c.slug}
                  href={c.path}
                  className="group rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong hover:bg-surface-subtle hover:shadow-sm"
                >
                  <span className="block text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {c.label}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary line-clamp-2">
                    {c.seo.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <AdSlot position="mid-content" label="Advertisement" />

          {/* ── Salary Reality Check promo ──────────────────────────── */}
          <SalaryRealityCheckPromo />

          {/* ── Real questions — 2-col grid ─────────────────────────── */}
          <section aria-labelledby="real-questions-heading">
            <h2 id="real-questions-heading" className="mb-1 text-xl font-bold text-foreground sm:text-2xl">
              Real questions, real numbers
            </h2>
            <p className="mb-5 text-sm text-foreground-secondary">
              Specific answers — not generic tax-website boilerplate.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {realQuestions.map((q) => (
                <div
                  key={q.question}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-foreground">{q.question}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-foreground-secondary">
                    {q.answer}
                  </p>
                  <Link
                    href={q.cta.href}
                    className="self-start text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    {q.cta.label} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── Guide hubs — horizontal cards ───────────────────────── */}
          <section aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="mb-5 text-xl font-bold text-foreground sm:text-2xl">
              Plain-English guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  href: ROUTES.salaryGuides,
                  label: "Salary guides",
                  desc: "CTC components, in-hand structure, and what actually moves your take-home.",
                  icon: "₹",
                },
                {
                  href: ROUTES.taxGuides,
                  label: "Tax guides",
                  desc: "Old vs new regime, standard deduction, HRA, 87A rebate — educational only, not filing advice.",
                  icon: "📋",
                },
                {
                  href: ROUTES.jobSwitchGuides,
                  label: "Job switch guides",
                  desc: "Notice buyouts, gratuity eligibility, leave encashment, and offer evaluation.",
                  icon: "→",
                },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-subtle text-base font-bold text-foreground">
                      {g.icon}
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                      {g.label}
                    </span>
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-foreground-secondary">
                    {g.desc}
                  </p>
                  <span className="text-xs font-semibold text-accent">
                    Open guides →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Popular LPA pages ───────────────────────────────────── */}
          <section aria-labelledby="lpa-pages-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 id="lpa-pages-heading" className="text-xl font-bold text-foreground sm:text-2xl">
                Popular salary pages
              </h2>
            </div>
            <p className="mb-4 text-sm text-foreground-secondary">
              Each salary band has estimated in-hand, city cost breakdowns, regime comparison, and tax impact.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {popularLpa.map((p) => (
                <Link
                  key={p.slug}
                  href={lpaLandingPath(p.slug)}
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground-secondary transition-all hover:border-accent/40 hover:bg-accent-light hover:text-accent"
                >
                  ₹{p.lpa} LPA
                  <span className="block text-xs font-normal text-foreground-muted">
                    in-hand breakdown
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <AdSlot position="before-footer" label="Advertisement" />

          {/* ── FAQ ─────────────────────────────────────────────────── */}
          <FaqSection items={HOME_FAQ} />

          {/* ── Site search ─────────────────────────────────────────── */}
          <section aria-labelledby="site-search-heading">
            <h2 id="site-search-heading" className="mb-4 text-xl font-bold text-foreground">
              Search calculators and guides
            </h2>
            <SiteSearchClient />
          </section>
        </Container>
      </main>
    </div>
  );
}
