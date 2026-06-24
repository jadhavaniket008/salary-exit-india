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
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
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

const featuredCalculators = [
  "ctcToInHand",
  "taxRegime",
  "salaryRealityCheck",
  "offerComparison",
  "hra",
  "finalSettlement",
] as const;

const howItWorks = [
  {
    step: "1",
    title: "You enter inputs",
    body: "Gross CTC, PF wage, rent, regime choice — whatever the calculator needs. We ask only for what changes the result.",
  },
  {
    step: "2",
    title: "We state our assumptions",
    body: "Every estimate names what it assumes: which FY slab, whether 87A applies, how PF ceiling is handled. Nothing hidden.",
  },
  {
    step: "3",
    title: "Engine calculates",
    body: "A shared, versioned calculation engine applies tax slabs, standard deductions, and rebates — the same logic across every calculator.",
  },
  {
    step: "4",
    title: "Result with caveats",
    body: "You get a number plus a clear explanation of what it doesn't include — surcharge, perquisites, variable pay, payroll rounding.",
  },
];

const realQuestions = [
  {
    question: "Is ₹12 LPA enough in Mumbai?",
    answer:
      "After new-regime tax (₹0 at ₹12L with Section 87A rebate), PF, and PT, monthly in-hand is around ₹98,000. Mumbai rents for a 1BHK typically start at ₹25,000–₹45,000. So the answer depends heavily on rent and lifestyle.",
    cta: { href: ROUTES.salaryRealityCheck, label: "Run Salary Reality Check" },
  },
  {
    question: "How much will I actually take home from a ₹15 LPA offer?",
    answer:
      "Under the new regime: taxable income ₹13.75L (after ₹75k std. deduction) → estimated tax ₹97,500 + cess ₹3,900 = ~₹1,01,400/yr. Monthly in-hand ≈ ₹1,10,000 after PF ₹1,800 and PT ₹200.",
    cta: { href: ROUTES.ctcToInHandCalculator, label: "Calculate ₹15L in-hand" },
  },
  {
    question: "Should I choose old or new tax regime?",
    answer:
      "At most income levels below ₹15L, the new regime wins unless you have significant HRA exemption + 80C + home loan interest. Use the comparison calculator to see your specific numbers.",
    cta: { href: ROUTES.oldVsNewTaxRegimeCalculator, label: "Compare regimes" },
  },
  {
    question: "Is a higher CTC always better?",
    answer:
      "Not necessarily. A CTC with large variable components, stock grants, or retention bonds can be much less reliable than a smaller fixed CTC. Compare offers on estimated monthly in-hand, not headline CTC.",
    cta: { href: ROUTES.offerComparisonCalculator, label: "Compare two offers" },
  },
  {
    question: "What happens to my salary during notice buyout?",
    answer:
      "The most common method: (gross monthly ÷ calendar days in month) × notice days to buy out. But contract terms vary — some employers use working days or a fixed formula. Check your offer letter.",
    cta: { href: ROUTES.noticePeriodBuyoutCalculator, label: "Estimate notice buyout" },
  },
];

export default function Home() {
  const featured = featuredCalculators.map((s) => CALCULATOR_REGISTRY[s]);
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
        <section className="border-b border-border bg-surface py-12 sm:py-16" aria-label="Hero">
          <Container>
            <HomeHeroSection />
          </Container>
        </section>

        {/* ── Trust strip ────────────────────────────────────────────── */}
        <section className="border-b border-border bg-surface-subtle py-4" aria-label="Trust indicators">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-foreground-secondary">
              {[
                "FY 2026–27 engine",
                "No login required",
                "Estimates — not tax filing advice",
                "Assumptions always visible",
                "Built for Indian salary structure",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg className="h-3 w-3 text-positive" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M10.28 2.28L4.5 8.06 1.72 5.28a1 1 0 0 0-1.42 1.44l3.5 3.5a1 1 0 0 0 1.42 0l6.5-6.5a1 1 0 0 0-1.44-1.44z"/>
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <Container className="space-y-16 py-12 sm:py-16">

          {/* ── Featured calculators ────────────────────────────────── */}
          <section aria-labelledby="calculators-heading">
            <div className="mb-6">
              <h2 id="calculators-heading" className="text-xl font-bold text-foreground sm:text-2xl">
                Most useful calculators
              </h2>
              <p className="mt-1 text-sm text-foreground-secondary">
                Each one uses the same FY 2026–27 tax engine and states its assumptions.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <Link
                  key={c.slug}
                  href={c.path}
                  className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border-strong hover:shadow-md"
                >
                  <span className="block text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {c.label}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">
                    {c.seo.description}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href={ROUTES.calculators}
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors underline-offset-2 hover:underline"
              >
                See all 12 calculators →
              </Link>
            </div>
          </section>

          <AdSlot position="mid-content" label="Advertisement" />

          {/* ── Salary Reality Check promo ──────────────────────────── */}
          <SalaryRealityCheckPromo />

          {/* ── How we think ────────────────────────────────────────── */}
          <section aria-labelledby="how-it-works-heading">
            <div className="mb-6">
              <h2 id="how-it-works-heading" className="text-xl font-bold text-foreground sm:text-2xl">
                How SalaryExit thinks
              </h2>
              <p className="mt-1 text-sm text-foreground-secondary">
                Every estimate is built the same way — transparent, auditable, and honest about its limits.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-border bg-surface p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-sm font-bold text-accent">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={ROUTES.methodology}
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors underline-offset-2 hover:underline"
              >
                Read the full methodology →
              </Link>
            </div>
          </section>

          {/* ── Real questions ──────────────────────────────────────── */}
          <section aria-labelledby="real-questions-heading">
            <div className="mb-6">
              <h2 id="real-questions-heading" className="text-xl font-bold text-foreground sm:text-2xl">
                Real questions people ask
              </h2>
              <p className="mt-1 text-sm text-foreground-secondary">
                Specific answers with linked calculators — not generic tax-website boilerplate.
              </p>
            </div>
            <div className="space-y-4">
              {realQuestions.map((q) => (
                <div
                  key={q.question}
                  className="rounded-xl border border-border bg-surface p-5 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{q.question}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-foreground-secondary">{q.answer}</p>
                  <Link
                    href={q.cta.href}
                    className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    {q.cta.label} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── Guide hubs ──────────────────────────────────────────── */}
          <section aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="mb-6 text-xl font-bold text-foreground sm:text-2xl">
              Plain-English guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  href: ROUTES.salaryGuides,
                  title: "Salary guides",
                  body: "Structure, CTC components, and what moves your take-home.",
                  cta: "Open salary guides",
                },
                {
                  href: ROUTES.taxGuides,
                  title: "Tax guides",
                  body: "Old vs new regime basics for salaried employees — educational, not filing advice.",
                  cta: "Open tax guides",
                },
                {
                  href: ROUTES.jobSwitchGuides,
                  title: "Job switch guides",
                  body: "Notice buyouts, gratuity, leave encashment, and offer evaluation.",
                  cta: "Open job switch guides",
                },
              ].map((g) => (
                <div
                  key={g.href}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-foreground-secondary">{g.body}</p>
                  <Link
                    href={g.href}
                    className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    {g.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── Popular LPA pages ───────────────────────────────────── */}
          <section aria-labelledby="lpa-pages-heading">
            <h2 id="lpa-pages-heading" className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
              Popular salary pages
            </h2>
            <p className="mb-5 text-sm text-foreground-secondary">
              Each salary band is modeled with specific context: estimated in-hand, city cost
              breakdowns, tax impact, and regime comparison.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {popularLpa.map((p) => (
                <Link
                  key={p.slug}
                  href={lpaLandingPath(p.slug)}
                  className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong hover:bg-surface-subtle hover:text-foreground"
                >
                  ₹{p.lpa} LPA in-hand
                </Link>
              ))}
            </div>
          </section>

          {/* ── Why estimates vary ──────────────────────────────────── */}
          <section
            aria-labelledby="why-vary-heading"
            className="rounded-2xl border border-border bg-surface-subtle p-6"
          >
            <h2 id="why-vary-heading" className="mb-4 text-lg font-bold text-foreground">
              Why estimates vary — and why we publish assumptions
            </h2>
            <ul className="space-y-2">
              {[
                {
                  title: "Financial year settings",
                  body: "Slabs, standard deductions, and rebate thresholds change each Budget. We version them in config.",
                },
                {
                  title: "PF wage definitions",
                  body: "Differ by employer — some cap at ₹15k statutory ceiling, others deduct on full basic.",
                },
                {
                  title: "Professional tax",
                  body: "State-specific and employer-dependent. We use a ₹200/mo placeholder unless you supply the actual amount.",
                },
                {
                  title: "TDS smoothing",
                  body: "Monthly TDS varies through the year as projections update. Our flat-spread estimate is illustrative.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 text-sm">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent-light text-center text-[10px] font-bold leading-4 text-accent">
                    i
                  </span>
                  <span className="text-foreground-secondary">
                    <strong className="text-foreground">{item.title}</strong> — {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <TrustMethodologyNotice />

          <AdSlot position="before-footer" label="Advertisement" />

          {/* ── FAQ ─────────────────────────────────────────────────── */}
          <FaqSection items={HOME_FAQ} />

          {/* ── Site search ─────────────────────────────────────────── */}
          <section aria-labelledby="site-search-heading">
            <h2 id="site-search-heading" className="mb-4 text-lg font-bold text-foreground">
              Search calculators and guides
            </h2>
            <SiteSearchClient />
          </section>
        </Container>
      </main>
    </div>
  );
}
