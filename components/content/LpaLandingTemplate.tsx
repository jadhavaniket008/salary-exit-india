import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { JsonLd } from "@/components/content/JsonLd";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqSection } from "@/components/calculators/FaqSection";
import { DisclaimerBlock } from "@/components/calculators/DisclaimerBlock";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { getAdjacentLpa, type LpaLandingPageConfig } from "@/lib/content/lpa-pages.config";
import { getLpaBandGuideDeepLinks } from "@/lib/content/lpa-band-guide-links";
import { getSalaryEnoughSpotlightForLpa } from "@/lib/content/salary-enough-pages.config";
import { InHandBreakdownBars } from "@/components/charts/InHandBreakdownBars";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { MethodologyLink } from "@/components/trust/MethodologyLink";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { articleJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { formatInr } from "@/lib/format-inr";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import type { FaqItem } from "@/types/faq";

type Props = {
  config: LpaLandingPageConfig;
};

export function LpaLandingTemplate({ config }: Props) {
  const result = computeCtcToInHand(config.scenario);
  const path = lpaLandingPath(config.slug);
  const adjacent = getAdjacentLpa(config.slug);
  const salaryEnoughSpotlight = getSalaryEnoughSpotlightForLpa(config.lpa, 3);
  const bandGuides = getLpaBandGuideDeepLinks(config.lpa);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: ROUTES.home },
    { label: "Salary in-hand estimates", href: ROUTES.salaryGuides },
    { label: `${config.lpa} LPA in-hand`, href: path },
  ];

  const genericFaq: FaqItem[] = [
    {
      question: `${config.lpa} LPA का मतलब क्या होता है? In-hand salary कितनी होगी?`,
      answer: `${config.lpa} LPA यानी ₹${config.lpa} लाख (${formatInr(config.lpa * 1_00_000)}) सालाना gross CTC। FY 2026-27 में नई tax regime के अनुसार, अनुमानित in-hand salary लगभग ${formatInr(result.inHandMonthly)} प्रति माह होती है — employee PF (Basic+DA का 12%) और professional tax काटने के बाद। यह एक estimate है; actual payslip आपके employer की salary structure पर depend करती है।`,
    },
    {
      question: `Is ₹${config.lpa} LPA gross the same as ₹${config.lpa} LPA CTC?`,
      answer:
        "Not always. CTC may include employer contributions and non-cash costs. This page interprets the band as annual gross salary for the illustrated scenario unless you change inputs in the calculator.",
    },
    {
      question: "Why does my payslip differ from this estimate?",
      answer:
        "Payslips reflect actual TDS smoothing, proofs, perquisites, bonuses, and employer-specific PF definitions. This page shows a single transparent scenario using the centralized engine.",
    },
    {
      question: "Should I choose old or new tax regime based on this page?",
      answer:
        "This illustration uses the new regime for a common baseline. Compare regimes explicitly using the tax regime calculator and validate with a qualified professional for filing.",
    },
  ];
  const faq: FaqItem[] = [...(config.faq ?? []), ...genericFaq];

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={articleJsonLd({ headline: config.seo.title, description: config.seo.description, urlPath: path })} />
      <JsonLd data={faqPageJsonLd(faq.map((f) => ({ question: f.question, answer: f.answer })))} />

      <Section className="pt-6 sm:pt-10">
        <Container className="max-w-3xl space-y-8">
          <BreadcrumbNav items={breadcrumbs} />

          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              ₹{config.lpa} LPA in India: estimated monthly in-hand salary
            </h1>
            <p className="text-base leading-relaxed text-foreground-secondary">
              Quick answer: under SalaryExit's default scenario for this page (new regime, state PT placeholder,
              PF derived from an assumed Basic+DA split), estimated monthly in-hand is roughly{" "}
              <strong>{formatInr(result.inHandMonthly, { decimals: true })}</strong> before any additional payroll
              items not modeled here.
            </p>
            <p className="text-base leading-relaxed text-foreground-secondary">{config.angleParagraph}</p>
            {/* Hindi-language answer for Hindi search queries (12 lpa ka matlab, kitna hota hai, etc.) */}
            <div
              lang="hi"
              className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-4 text-sm dark:border-amber-900/30 dark:bg-amber-950/20"
            >
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                हिंदी में जानकारी
              </p>
              <p className="leading-relaxed text-amber-950/90 dark:text-amber-100/85">
                <strong>{config.lpa} LPA का मतलब</strong> है {formatInr(config.lpa * 1_00_000)} सालाना —
                यानी {formatInr(result.grossMonthly)} प्रति माह (gross CTC)। FY 2026-27 में नई tax
                regime के अनुसार, अनुमानित{" "}
                <strong>in-hand salary लगभग {formatInr(result.inHandMonthly)} प्रति माह</strong> होती
                है — employee PF और professional tax काटने के बाद।
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <FreshnessBadges />
              <MethodologyLink />
            </div>
          </header>

          {config.realityCheckParagraphs && config.realityCheckParagraphs.length > 0 ? (
            <section
              aria-labelledby="lpa-reality-check-heading"
              className="space-y-3 rounded-2xl border border-sky-200/90 bg-sky-50/60 p-5 dark:border-sky-900/40 dark:bg-sky-950/25"
            >
              <h2 id="lpa-reality-check-heading" className="text-lg font-semibold text-sky-950 dark:text-sky-100">
                Reality check
              </h2>
              {config.realityCheckParagraphs.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-sky-950/90 dark:text-sky-100/90">
                  {para}
                </p>
              ))}
            </section>
          ) : null}

          <AdSlot position="below-hero" label="Advertisement" />

          <section aria-labelledby="breakdown-heading" className="space-y-3">
            <h2 id="breakdown-heading" className="text-xl font-semibold text-foreground">
              Monthly breakdown (illustrative)
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead className="bg-surface-subtle text-foreground-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Line</th>
                    <th className="px-4 py-3 font-medium">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 text-foreground">Gross</td>
                    <td className="px-4 py-3 tabular-nums">{formatInr(result.grossMonthly, { decimals: true })}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground">Employee PF (estimate)</td>
                    <td className="px-4 py-3 tabular-nums">
                      {formatInr(result.employeePfMonthly, { decimals: true })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground">Professional tax (placeholder)</td>
                    <td className="px-4 py-3 tabular-nums">
                      {formatInr(result.professionalTaxMonthly, { decimals: true })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground">TDS spread (estimate)</td>
                    <td className="px-4 py-3 tabular-nums">{formatInr(result.tdsMonthly, { decimals: true })}</td>
                  </tr>
                  <tr className="bg-surface-subtle font-semibold">
                    <td className="px-4 py-3 text-foreground">Estimated in-hand</td>
                    <td className="px-4 py-3 tabular-nums text-foreground">
                      {formatInr(result.inHandMonthly, { decimals: true })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InHandBreakdownBars
              grossMonthly={result.grossMonthly}
              rows={[
                { label: "Est. in-hand", amount: result.inHandMonthly, tone: "net" },
                { label: "Employee PF", amount: result.employeePfMonthly, tone: "deduct" },
                { label: "Professional tax", amount: result.professionalTaxMonthly, tone: "deduct" },
                { label: "TDS (spread)", amount: result.tdsMonthly, tone: "deduct" },
              ]}
            />
            <p className="text-sm text-foreground-secondary">
              Annual tax + cess (engine estimate):{" "}
              <strong>{formatInr(result.estimatedTotalTaxAnnual)}</strong>.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="text-base font-semibold text-foreground">
              At ₹{config.lpa} LPA — what usually matters
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Band-specific context (not duplicated on other LPA pages). Still illustrative — tune the calculators for your
              payslip.
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground-secondary">
              {config.bandInsights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/25 dark:text-amber-50">
            <h2 className="text-base font-semibold">Assumptions used on this page</h2>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Gross salary: ₹{config.lpa.toLocaleString("en-IN")},00,000 per year.</li>
              <li>Tax regime: new (115BAC-style modeling as configured in SalaryExit).</li>
              <li>
                Professional tax: ₹{config.scenario.professionalTaxAnnual.toLocaleString("en-IN")}/year placeholder
                — replace with your state.
              </li>
              <li>
                PF: derived from assumed Basic+DA annual of ₹
                {(config.scenario.basicAndDaAnnual ?? 0).toLocaleString("en-IN")} (45% of gross) unless your
                employer uses a different PF wage.
              </li>
              {config.scenarioNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              Engine warnings:{" "}
              {result.warnings.length > 0 ? result.warnings.join(" ") : "None beyond standard estimate notes."}
            </p>
          </section>

          <section className="flex flex-wrap gap-3">
            <Link
              href={ROUTES.ctcToInHandCalculator}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Open CTC → in-hand calculator
            </Link>
            <Link
              href={ROUTES.salaryCalculator}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
            >
              Open salary breakdown calculator
            </Link>
            <Link
              href={ROUTES.oldVsNewTaxRegimeCalculator}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
            >
              Compare tax regimes
            </Link>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="text-base font-semibold text-foreground">After tax — what about rent and city?</h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              This band page is gross → in-hand only. To stress-test{" "}
              <strong>rent, commute, and lifestyle spend</strong> in a real city scenario, use the tools below — same
              engines, different question.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground-secondary">
              <li>
                <Link className="font-medium underline" href={ROUTES.salaryRealityCheck}>
                  Salary Reality Check
                </Link>{" "}
                — CTC, rent, and tiered monthly spend to see modeled savings.
              </li>
              <li>
                <Link className="font-medium underline" href={`${ROUTES.salaryGuides}#enough-heading`}>
                  "Is this salary enough?" city pages
                </Link>{" "}
                — decision-intent examples (Bengaluru, Pune, Hyderabad) with embedded checks.
              </li>
              <li>
                <Link className="font-medium underline" href={ROUTES.offerComparisonCalculator}>
                  Compare two offers
                </Link>{" "}
                — when you're choosing between employers, not just cities.
              </li>
            </ul>
            {salaryEnoughSpotlight.length > 0 ? (
              <div className="mt-4 border-t border-border pt-4">
                <h3 className="text-sm font-semibold text-foreground">
                  City "enough salary?" checks near ₹{config.lpa} LPA
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-foreground-secondary">
                  {salaryEnoughSpotlight.map((p) => (
                    <li key={p.slug}>
                      <Link className="font-medium underline" href={salaryEnoughPath(p.slug)}>
                        {p.seo.title}
                      </Link>
                      <span className="text-foreground-muted"> — {p.city.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="text-base font-semibold text-foreground">Nearby salary bands</h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Compare similar LPA pages (same engine assumptions across bands).
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm">
              {adjacent.prev ? (
                <li>
                  <Link
                    className="font-medium text-foreground underline underline-offset-2"
                    href={lpaLandingPath(adjacent.prev.slug)}
                  >
                    ← ₹{adjacent.prev.lpa} LPA in-hand estimate
                  </Link>
                </li>
              ) : null}
              {adjacent.next ? (
                <li>
                  <Link
                    className="font-medium text-foreground underline underline-offset-2"
                    href={lpaLandingPath(adjacent.next.slug)}
                  >
                    ₹{adjacent.next.lpa} LPA in-hand estimate →
                  </Link>
                </li>
              ) : null}
            </ul>
          </section>

          <section className="rounded-xl border border-blue-200/80 bg-blue-50/40 p-4 dark:border-blue-900/35 dark:bg-blue-950/20">
            <h2 className="text-base font-semibold text-foreground">
              Guides that match ₹{config.lpa}L offers
            </h2>
            <p className="mt-1 text-xs text-foreground-secondary">
              Picked by band so similar LPA pages don't all push the exact same reading order.
            </p>
            <ul className="mt-3 space-y-3 text-sm text-foreground-secondary">
              {bandGuides.map((g) => (
                <li key={g.href}>
                  <Link className="font-medium text-foreground underline" href={g.href}>
                    {g.label}
                  </Link>
                  <p className="mt-0.5 text-xs text-foreground-muted">{g.hint}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="text-base font-semibold text-foreground">Read next</h2>
            <ul className="mt-2 space-y-2 text-sm text-foreground-secondary">
              <li>
                <Link className="font-medium underline" href={ROUTES.methodology}>
                  Methodology — slabs, PF, and what the engine does not model
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}>
                  What affects in-hand salary beyond your CTC number
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/salary-structure-in-india`}>
                  Salary structure in India (CTC vs components vs in-hand)
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
                  How to judge if a salary is good in India (rent + household reality)
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`}>
                  How rent changes your monthly savings
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.taxGuides}/old-vs-new-tax-regime-basics`}>
                  Old vs new tax regime basics for salaried income
                </Link>
              </li>
            </ul>
          </section>

          <TrustMethodologyNotice variant="compact" />

          <AdSlot position="mid-content" label="Advertisement" />

          <FaqSection items={faq} />
          <DisclaimerBlock />
        </Container>
      </Section>
    </div>
  );
}
