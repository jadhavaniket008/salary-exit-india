import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Terms of use",
    description:
      "Terms governing use of SalaryExit India: educational estimates, no professional advice, limitation of liability, and acceptable use.",
    keywords: ["terms of use", "terms and conditions"],
  },
  { canonicalPath: ROUTES.terms }
);

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of use"
      intro="By using SalaryExit India, you agree to these terms. If you do not agree, please do not use the site."
      breadcrumbs={legalBreadcrumbs("Terms of use", ROUTES.terms)}
    >
      <h2>Educational purpose</h2>
      <p>
        The website provides general information, calculators, and guides for learning and planning. Nothing on
        this site is a substitute for professional advice tailored to your situation.
      </p>

      <h2>No professional relationship</h2>
      <p>
        Use of the site does not create a client relationship with any chartered accountant, lawyer, tax
        preparer, or financial adviser. Communications (including email) do not constitute professional
        advice unless separately engaged under a formal agreement with a qualified provider.
      </p>

      <h2>No warranty</h2>
      <p>
        Content and software are provided “as is” without warranties of any kind, including accuracy,
        completeness, fitness for a particular purpose, or non-infringement. Tax laws, payroll practices, and
        product features change; the site may contain errors or outdated information.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, the operator shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill,
        arising from your use of the site or reliance on estimates.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not attempt to disrupt the site, scrape it in ways that degrade service, or bypass security.</li>
        <li>Do not use automated means to abuse calculators or generate misleading traffic.</li>
        <li>Do not misrepresent affiliation with SalaryExit India.</li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        The site may link to third parties (including calculators’ documentation and official resources). We
        do not control third-party content or policies.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated. Continued use after changes constitutes acceptance of the revised terms.
      </p>

      <p>
        See also:{" "}
        <Link href={ROUTES.disclaimer} className="font-medium">
          Disclaimer
        </Link>{" "}
        and{" "}
        <Link href={ROUTES.privacyPolicy} className="font-medium">
          Privacy policy
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
