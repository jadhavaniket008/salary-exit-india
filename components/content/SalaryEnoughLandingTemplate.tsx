import Link from "next/link";
import { SalaryRealityCheckCalculatorClient } from "@/components/calculators/clients/SalaryRealityCheckCalculatorClient";
import { FaqSection } from "@/components/calculators/FaqSection";
import { DisclaimerBlock } from "@/components/calculators/DisclaimerBlock";
import { AdSlot } from "@/components/ads/AdSlot";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { JsonLd } from "@/components/content/JsonLd";
import { Container, Section } from "@/components/ui";
import { computeSalaryRealityCheck } from "@/lib/calculators/salary-reality-check";
import { DEFAULT_BASIC_DA_SHARE_OF_GROSS } from "@/lib/config/salary-reality-heuristics";
import { faqPageJsonLd } from "@/lib/jsonld";
import {
  getRelatedSalaryEnoughPages,
  type SalaryEnoughAnswerKind,
  type SalaryEnoughPageConfig,
} from "@/lib/content/salary-enough-pages.config";
import { getLpaLandingPageConfig } from "@/lib/content/lpa-pages.config";
import { formatInr } from "@/lib/format-inr";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import type { FaqItem } from "@/types/faq";

type Props = {
  config: SalaryEnoughPageConfig;
};

function answerBadgeClass(kind: SalaryEnoughPageConfig["answerKind"]): string {
  switch (kind) {
    case "yes":
      return "border-emerald-400 bg-emerald-50 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-50";
    case "no":
      return "border-red-300 bg-red-50 text-red-950 dark:border-red-800 dark:bg-red-950/35 dark:text-red-50";
    default:
      return "border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/35 dark:text-amber-50";
  }
}

function answerLabel(kind: SalaryEnoughPageConfig["answerKind"]): string {
  switch (kind) {
    case "yes":
      return "Yes — on this model";
    case "no":
      return "No — on this model";
    default:
      return "It depends";
  }
}

const GLANCE_TYPICAL_FOR: Record<SalaryEnoughAnswerKind, string[]> = {
  yes: [
    "Single earner or couple where modeled spend matches a moderate lifestyle",
    "Building savings or an emergency buffer if real spend stays near this tier",
  ],
  no: [
    "After lowering rent or lifestyle tier in the calculator to match your lease",
    "Dual-income households where a partner covers major fixed costs",
  ],
  depends: [
    "Shared housing, lower rent than this anchor, or a disciplined moderate tier",
    "Single earners who track discretionary spend and avoid large hidden EMIs",
  ],
};

const GLANCE_TIGHT_IF: Record<SalaryEnoughAnswerKind, string[]> = {
  yes: [
    "Premium housing or premium lifestyle tier on the same gross",
    "Supporting parents, school fees, or big EMIs on one salary without slack",
  ],
  no: [
    "Solo flat at this rent on one income without cutting tier or rent",
    "Family medical costs or childcare not reflected in the default model",
  ],
  depends: [
    "Solo 1BHK in an expensive corridor at this rent line",
    "Household costs outside the model (medical, childcare, heavy loans)",
  ],
};

export function SalaryEnoughLandingTemplate({ config }: Props) {
  const path = salaryEnoughPath(config.slug);
  const relatedEnoughPages = getRelatedSalaryEnoughPages(config.slug, 3);
  const preview = computeSalaryRealityCheck({
    annualCtc: config.annualCtc,
    monthlyRent: config.monthlyRent,
    metroCity: config.city.metro,
    lifestyle: config.lifestyle,
    regime: "new",
    basicDaShareOfGross: DEFAULT_BASIC_DA_SHARE_OF_GROSS,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: ROUTES.home },
    { label: "Salary guides", href: ROUTES.salaryGuides },
    { label: `₹${config.lpa} LPA · ${config.city.name}`, href: path },
  ];

  const faq: FaqItem[] = config.faq.map((f) => ({ question: f.question, answer: f.answer }));

  const initialScenario = {
    annualCtc: config.annualCtc,
    monthlyRent: config.monthlyRent,
    metroCity: config.city.metro,
    lifestyle: config.lifestyle,
  };

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={faqPageJsonLd(faq.map((f) => ({ question: f.question, answer: f.answer })))} />

      <Section className="pt-6 sm:pt-10">
        <Container className="max-w-3xl space-y-8">
          <BreadcrumbNav items={breadcrumbs} />

          <header className="space-y-4">
            <div
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${answerBadgeClass(config.answerKind)}`}
            >
              {answerLabel(config.answerKind)}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {config.seo.title}
            </h1>
            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">{config.answerHeadline}</p>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{config.leadParagraph}</p>
          </header>

          <section
            aria-labelledby="real-numbers-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h2 id="real-numbers-heading" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Real numbers for this scenario
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              At <strong>₹{config.lpa} LPA</strong> gross in <strong>{config.city.name}</strong>, with{" "}
              <strong>{formatInr(config.monthlyRent)}/month</strong> rent, <strong className="capitalize">{config.lifestyle}</strong>{" "}
              lifestyle, new tax regime, and the same PF assumptions as the calculator below:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">Est. in-hand:</span>{" "}
                ~{formatInr(preview.inHandMonthly)}/month
              </li>
              <li>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">Rent (this page):</span>{" "}
                {formatInr(config.monthlyRent)}/month
              </li>
              <li>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">Est. savings after modeled spend:</span>{" "}
                ~{formatInr(preview.monthlySavings)}/month — <em>{preview.verdictTitle}</em>
              </li>
            </ul>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Often workable for</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {GLANCE_TYPICAL_FOR[config.answerKind].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Often tight if</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {GLANCE_TIGHT_IF[config.answerKind].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              Figures come from the same engine as the embedded calculator — not your payslip. Adjust rent and tier below
              to match your life.
            </p>
          </section>

          <AdSlot position="below-hero" label="Advertisement" />

          <section aria-labelledby="who-heading" className="space-y-3">
            <h2 id="who-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Who this page is for
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{config.whoThisWorksFor}</p>
          </section>

          <section aria-labelledby="enough-not-heading" className="space-y-3">
            <h2 id="enough-not-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              When it looks “enough” vs when it breaks
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{config.whenEnoughVsNot}</p>
          </section>

          <section aria-labelledby="tradeoffs-heading" className="space-y-3">
            <h2 id="tradeoffs-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Major tradeoffs
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {config.majorTradeoffs.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="city-heading" className="space-y-3">
            <h2 id="city-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {config.city.name}-specific reality
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {config.cityRealityNotes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="solo-family-heading"
            className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <h2 id="solo-family-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Solo earner vs family budget
            </h2>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">{config.soloVsFamilyCaveat}</p>
          </section>

          <section aria-labelledby="why-heading" className="space-y-3">
            <h2 id="why-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Why we say that
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{config.whyParagraph}</p>
          </section>

          <section aria-labelledby="snapshot-heading" className="space-y-4">
            <h2 id="snapshot-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Snapshot for this scenario
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong>{config.city.name}</strong>, metro commute band:{" "}
              <strong>{config.city.metro ? "on" : "off"}</strong> · Rent:{" "}
              <strong>{formatInr(config.monthlyRent)}/mo</strong> · Lifestyle:{" "}
              <strong className="capitalize">{config.lifestyle}</strong> · New regime · Basic+DA{" "}
              {Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100)}% of gross (PF).
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase text-zinc-500">Est. in-hand / mo</p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {formatInr(preview.inHandMonthly)}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase text-zinc-500">Est. savings / mo</p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {formatInr(preview.monthlySavings)}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase text-zinc-500">Takeaway</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {preview.verdictTitle}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">What the verdict means here</p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">{preview.verdictWhy}</p>
            </div>
          </section>

          <section aria-labelledby="expenses-heading" className="space-y-3">
            <h2 id="expenses-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Typical expenses in this model
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Rent is your input; groceries, commute, utilities, and discretionary follow the{" "}
              <span className="capitalize">{config.lifestyle}</span> tier table (metro commute when checked).
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {config.typicalSpendNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <dl className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2">
              {preview.expenseLines.map((line) => (
                <div key={line.label} className="flex justify-between gap-4">
                  <dt className="text-zinc-500">{line.label}</dt>
                  <dd className="font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                    {formatInr(line.amount)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="flex flex-wrap gap-3">
            <a
              href="#salary-reality-embed"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Adjust inputs in the calculator
            </a>
            <Link
              href={ROUTES.salaryRealityCheck}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Open full Salary Reality Check
            </Link>
          </div>

          <section aria-labelledby="calc-heading" className="space-y-3 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <h2 id="calc-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Run your own numbers
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Same engine as above — this block is pre-filled for ₹{config.lpa} LPA in {config.city.name}. Change rent,
              tier, or expense lines to match your life.
            </p>
            <SalaryRealityCheckCalculatorClient initial={initialScenario} embed />
          </section>

          <section aria-labelledby="links-heading" className="space-y-3">
            <h2 id="links-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Calculators & related pages
            </h2>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                <Link className="font-medium text-zinc-900 underline dark:text-zinc-100" href={ROUTES.salaryRealityCheck}>
                  Salary Reality Check
                </Link>{" "}
                — full-page version with methodology and FAQs.
              </li>
              <li>
                <Link className="font-medium text-zinc-900 underline dark:text-zinc-100" href={ROUTES.salaryCalculator}>
                  Salary calculator
                </Link>{" "}
                — taxable income, tax slabs, and in-hand breakdown.
              </li>
              <li>
                <Link
                  className="font-medium text-zinc-900 underline dark:text-zinc-100"
                  href={ROUTES.oldVsNewTaxRegimeCalculator}
                >
                  Old vs new tax regime
                </Link>{" "}
                — compare net in-hand when deductions matter.
              </li>
              <li>
                <Link className="font-medium text-zinc-900 underline dark:text-zinc-100" href={ROUTES.ctcToInHandCalculator}>
                  CTC → in-hand
                </Link>{" "}
                — detailed PF/PT/TDS lines.
              </li>
              <li>
                <Link className="font-medium text-zinc-900 underline dark:text-zinc-100" href={ROUTES.offerComparisonCalculator}>
                  Offer comparison
                </Link>{" "}
                — two offers side by side.
              </li>
            </ul>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Same gross, tax-only view (compare to this page)
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {config.relatedLpaSlugs.map((slug) => {
                const lpaPage = getLpaLandingPageConfig(slug);
                const label = lpaPage
                  ? `₹${lpaPage.lpa} LPA in-hand estimate (gross scenario)`
                  : slug.replace(/-/g, " ");
                return (
                  <li key={slug}>
                    <Link className="text-zinc-700 underline dark:text-zinc-300" href={lpaLandingPath(slug)}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {relatedEnoughPages.length > 0 ? (
              <>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  More “is this salary enough?” pages
                </p>
                <ul className="mb-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {relatedEnoughPages.map((p) => (
                    <li key={p.slug}>
                      <Link
                        className="font-medium text-zinc-900 underline dark:text-zinc-100"
                        href={salaryEnoughPath(p.slug)}
                      >
                        {p.seo.title}
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> — {p.city.name}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Guides that pair with this check</p>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                <Link
                  className="underline"
                  href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}
                >
                  What moves in-hand pay beyond the CTC number
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/salary-structure-in-india`}>
                  How Indian salary structure and CTC components work
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
                  How to judge if a salary is good in India (framework)
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`}>
                  How rent changes your monthly savings
                </Link>
              </li>
              <li>
                <Link className="underline" href={`${ROUTES.taxGuides}/old-vs-new-tax-regime-basics`}>
                  Old vs new tax regime basics (when deductions matter)
                </Link>
              </li>
            </ul>
            <p className="text-sm">
              <Link href={ROUTES.salaryGuides} className="text-zinc-700 underline dark:text-zinc-300">
                All salary guides
              </Link>
              {" · "}
              <Link href={`${ROUTES.salaryGuides}#enough-heading`} className="text-zinc-700 underline dark:text-zinc-300">
                More city “enough salary” pages
              </Link>
            </p>
          </section>

          <TrustMethodologyNotice variant="compact" />

          <FaqSection items={faq} />

          <DisclaimerBlock />
        </Container>
      </Section>
    </div>
  );
}
