import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Disclaimer",
    description:
      "SalaryExit India disclaimer: estimates only — not tax, legal, or financial advice. Read before relying on calculator outputs.",
    keywords: ["disclaimer", "not tax advice", "estimates only"],
  },
  { canonicalPath: ROUTES.disclaimer }
);

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      intro="Please read this disclaimer carefully. It applies to all calculators, guides, and tools on SalaryExit India."
      breadcrumbs={legalBreadcrumbs("Disclaimer", ROUTES.disclaimer)}
    >
      <h2>Estimates, not statements of fact</h2>
      <p>
        All numerical outputs are <strong>estimates</strong> produced by simplified models with explicit
        assumptions (including financial year settings, rebate modeling choices, and omitted items such as
        surcharge and many perquisites). They are not payroll computations from your employer and not an
        income-tax return.
      </p>

      <h2>Not tax, legal, or financial advice</h2>
      <p>
        Nothing on this website constitutes tax advice, legal advice, accounting advice, or personalized
        financial advice. Laws and employer policies vary; you are responsible for verifying information with
        qualified professionals and official documents (for example Form 16, AIS, offer letters, and company
        policies).
      </p>

      <h2>No guarantee of accuracy</h2>
      <p>
        Despite efforts to implement formulas carefully and test core engine functions, errors can occur and
        laws change. The operator does not warrant that any estimate matches your actual tax, PF, or pay slip.
      </p>

      <h2>Not a substitute for official filing</h2>
      <p>
        Do not use SalaryExit outputs as the sole basis for filing income tax returns, responding to notices,
        negotiating legal settlements, or making high-stakes financial commitments.
      </p>

      <h2>Advertising</h2>
      <p>
        If advertisements are enabled in the future, they may be served by third-party networks. Ads are not
        endorsements. See the{" "}
        <Link href={ROUTES.privacyPolicy} className="font-medium">
          privacy policy
        </Link>{" "}
        for how optional ad and analytics integrations may work.
      </p>

      <h2>Where assumptions are documented</h2>
      <p>
        The <Link href={ROUTES.methodology}>methodology</Link> page describes the financial year baked into the
        engine, what is exact arithmetic vs simplified, and what is out of scope (for example surcharge). It is
        the companion to this disclaimer — read both before treating any number as authoritative.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the operator disclaims liability for any loss or damage arising
        from reliance on this website. See also the{" "}
        <Link href={ROUTES.terms} className="font-medium">
          terms of use
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
