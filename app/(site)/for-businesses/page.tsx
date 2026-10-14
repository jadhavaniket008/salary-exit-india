import { PfModelNotice } from "@/components/content/PfModelNotice";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { BusinessInquiryLink } from "@/components/monetization/BusinessInquiryLink";
import { CopyIframeSnippet } from "@/components/growth/CopyIframeSnippet";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Salary Calculator Embeds for Businesses",
    description:
      "Try SalaryExit’s free salary-model table embed. Discuss a paid setup and support pilot for your job board, careers resource or HR product.",
    keywords: [
      "salary table embed India",
      "embed salary calculator",
      "HR tech salary tool India",
      "salary calculator integration India",
    ],
  },
  { canonicalPath: ROUTES.forBusinesses }
);

const USE_CASES = [
  {
    role: "Job boards & recruitment platforms",
    description:
      "Show candidates their estimated in-hand salary alongside a CTC figure in the JD. Make the assumptions visible before a candidate compares offers.",
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
      "Let employees cross-check their payslip against an independent estimate — with the model’s limitations clearly stated.",
    examples: "Employee self-service portals, payslip explanations, TDS reconciliation screens.",
  },
  {
    role: "Fintech & personal finance apps",
    description:
      "Add a salary reality check or tax-regime comparison as a contextual feature inside a budgeting or savings app.",
    examples: "Budget onboarding, savings goal calculators, EMI affordability checks.",
  },
];

export default function ForBusinessesPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@salaryexit.in";

  const embedUrl = absoluteUrl(ROUTES.inHandSalaryTableEmbed);
  const embedCode = `<iframe src="${embedUrl}" title="SalaryExit India in-hand salary model" width="100%" height="760" loading="lazy" style="border:0"></iframe>`;

  return (
    <div>
      <Section className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-12">

          <header className="space-y-4">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
              For businesses
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Help your audience understand what CTC becomes
            </h1>
            <p className="text-lg leading-relaxed text-foreground-secondary">
              Add a transparent salary example to a careers resource, job board or HR product.
              Try the free model-table embed below. If you need help integrating it, discuss a paid
              setup and support pilot with a written scope and quote before any work starts.
            </p>
            <BusinessInquiryLink email={contactEmail} placement="business_hero"
              className="inline-flex items-center justify-center rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Discuss a paid embed pilot →
            </BusinessInquiryLink>
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

          <section aria-labelledby="embed-demo-heading" className="space-y-4">
            <h2 id="embed-demo-heading" className="text-xl font-semibold text-foreground">Try the free embed</h2>
            <p className="text-sm text-foreground-secondary">
              This is the existing 72-scenario model table: CTC, employer-cost assumptions and PF modes.
              It is an educational model, not payroll software or a salary survey. The free embed keeps
              SalaryExit branding. <Link href={ROUTES.inHandSalaryModelReport} className="underline">Read the methodology and download the data</Link>.
            </p>
            <PfModelNotice />
            <iframe src={ROUTES.inHandSalaryTableEmbed} title="SalaryExit in-hand salary model demo"
              loading="lazy" className="h-[760px] w-full rounded-xl border border-border" />
            <CopyIframeSnippet snippet={embedCode} trackCopy />
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface-subtle p-6">
            <h2 className="text-xl font-semibold text-foreground">What&apos;s under the hood</h2>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              The calculation engine is written in TypeScript, unit-tested against worked examples from
              Finance Act publications, and covers: CTC → in-hand conversion, old vs new tax regime
              comparison (FY 2026-27 slabs), PF (statutory ceiling and actual Basic+DA modes), HRA
              exemption under Section 10(13A), professional tax, Section 156 rebate (earlier 87A), and payslip line
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
              — the public tools demonstrate the calculation model. There is no self-service hosted API offered on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Paid pilot: setup and support</h2>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              The public table embed is free. A paid pilot is for a team that needs an integration review,
              installation help and an agreed support scope. Start with one page and one use case.
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-foreground-secondary">
              <li>A review of your page and the salary assumptions your audience needs.</li>
              <li>Embed installation guidance and checks on mobile and desktop.</li>
              <li>A written scope for support, update responsibilities, price and renewal terms.</li>
            </ul>
            <p className="text-sm text-foreground-secondary">
              Share your website, audience, approximate monthly visitors and integration needs to request
              a quote. Custom branding or API delivery requires separate scoping; neither is available
              through an instant checkout. We agree deliverables before accepting payment.
            </p>
          </section>

          <section className="rounded-2xl border border-accent-solid bg-accent-solid p-7 text-white">
            <h2 className="text-xl font-semibold">Interested? Let&apos;s talk.</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Email your company name, website and use case to request a scoped quote.
              The button opens your email app; send the message there to complete your inquiry.
            </p>
            <BusinessInquiryLink email={contactEmail} placement="business_footer"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-white/90"
            >
              {contactEmail}
            </BusinessInquiryLink>
          </section>

        </Container>
      </Section>
    </div>
  );
}
