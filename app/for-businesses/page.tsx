import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Embed salary calculators on your platform — SalaryExit for Businesses",
    description:
      "License the SalaryExit salary and tax calculator engine for your HR tech product, job board, or payroll software. Iframe embed, API, or white-label options available.",
    keywords: [
      "salary calculator API India",
      "embed salary calculator",
      "HR tech salary tool India",
      "payroll calculator API India",
    ],
  },
  { canonicalPath: ROUTES.forBusinesses }
);

const USE_CASES = [
  {
    role: "Job boards & recruitment platforms",
    description:
      "Show candidates their estimated in-hand salary alongside a CTC figure in the JD. Reduces 'in-hand shock' after offer acceptance and increases applicant trust.",
    examples: "Job postings, offer letter preview screens, salary range widgets.",
  },
  {
    role: "HR tech & HRMS software",
    description:
      "Embed a CTC → in-hand breakdown inside your onboarding or offer-letter module. Let HR teams give candidates a live estimate without building tax logic from scratch.",
    examples: "Offer management, onboarding flows, compensation planning dashboards.",
  },
  {
    role: "Payroll software vendors",
    description:
      "Let employees cross-check their payslip against an independent estimate — reduces support tickets and builds product trust.",
    examples: "Employee self-service portals, payslip explanations, TDS reconciliation screens.",
  },
  {
    role: "Fintech & personal finance apps",
    description:
      "Add a salary reality check or tax-regime comparison as a contextual feature inside a budgeting or savings app.",
    examples: "Budget onboarding, savings goal calculators, EMI affordability checks.",
  },
];

const WHAT_YOU_GET = [
  {
    title: "Iframe embed",
    body: "Drop a single <iframe> tag on your page. Calculator renders fully, no maintenance on your side. We handle tax slab updates with each Budget.",
  },
  {
    title: "White-label option",
    body: "Your branding, your domain. We can strip SalaryExit branding and style the calculator to match your design system.",
  },
  {
    title: "API access",
    body: "POST a salary input, receive a structured JSON response: in-hand, tax breakdown, regime comparison, PF lines. Integrate into your own UI.",
  },
  {
    title: "Budget-cycle maintenance",
    body: "Tax slabs, standard deductions, and rebate thresholds are updated with each Union Budget. You don't need to track CBDT notifications.",
  },
];

export default function ForBusinessesPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@salaryexit.in";

  return (
    <main>
      <Section className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-12">

          <header className="space-y-4">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
              For businesses
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Embed India's salary calculator engine on your platform
            </h1>
            <p className="text-lg leading-relaxed text-foreground-secondary">
              SalaryExit's calculator engine handles CTC → in-hand conversion, old vs new tax regime
              comparison, PF, HRA, gratuity, and settlement math for Indian salaried employees —
              maintained against each Union Budget. License it for your product instead of building
              and maintaining tax logic yourself.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=B2B calculator embed inquiry`}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Contact us to discuss →
            </a>
          </header>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Who this is for</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.role}
                  className="space-y-2 rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold text-foreground">{uc.role}</h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">{uc.description}</p>
                  <p className="text-xs text-foreground-muted">{uc.examples}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">What you get</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {WHAT_YOU_GET.map((item) => (
                <div key={item.title} className="space-y-1.5">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface-subtle p-6">
            <h2 className="text-xl font-semibold text-foreground">What's under the hood</h2>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              The calculation engine is written in TypeScript, unit-tested against worked examples from
              Finance Act publications, and covers: CTC → in-hand conversion, old vs new tax regime
              comparison (FY 2025-26 slabs), PF (statutory ceiling and actual Basic+DA modes), HRA
              exemption under Section 10(13A), professional tax, Section 87A rebate, and payslip line
              breakdown. Tax slabs and thresholds are version-controlled and updated with each Budget.
            </p>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              You can review the public calculator at{" "}
              <Link href={ROUTES.ctcToInHandCalculator} className="font-medium underline">
                CTC → in-hand calculator
              </Link>{" "}
              and{" "}
              <Link href={ROUTES.oldVsNewTaxRegimeCalculator} className="font-medium underline">
                old vs new tax regime
              </Link>{" "}
              — the same engine powers the API.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              Pricing is based on use case, integration type, and request volume. We offer:
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-foreground-secondary">
              <li>
                <strong>Iframe embed (light branding):</strong> Flat monthly fee, unlimited usage on your domain.
              </li>
              <li>
                <strong>White-label:</strong> Custom branding and domain, annual license.
              </li>
              <li>
                <strong>API access:</strong> Per-request pricing or monthly flat rate by volume tier.
              </li>
            </ul>
            <p className="text-sm text-foreground-secondary">
              Reach out with your use case and approximate monthly usage and we'll respond within 2 business days.
            </p>
          </section>

          <section className="rounded-2xl border border-accent bg-accent p-7 text-white">
            <h2 className="text-xl font-semibold">Interested? Let's talk.</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Email us with your company name, product type, and the integration you're exploring.
              We'll send back a demo and pricing within 2 business days.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=B2B calculator embed inquiry`}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-white/90"
            >
              {contactEmail}
            </a>
          </section>

        </Container>
      </Section>
    </main>
  );
}
