import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "About SalaryExit India",
    description:
      "Who SalaryExit is for, what the calculators do, how estimates are maintained, and what we do not promise — an independent educational site.",
    keywords: ["SalaryExit India", "about", "salary calculator India"],
  },
  { canonicalPath: ROUTES.about }
);

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About SalaryExit India"
      intro="SalaryExit India is an independent, information-first site for salaried employees in India who want clearer intuition about pay, tax regimes, rent vs savings, and exit scenarios — with assumptions shown in the open."
      breadcrumbs={legalBreadcrumbs("About", ROUTES.about)}
    >
      <h2>Who this site is for</h2>
      <ul>
        <li>
          <strong>Employees comparing offers</strong> who need consistent in-hand math before they talk to HR
          or a CA.
        </li>
        <li>
          <strong>People switching cities</strong> who want to separate CTC headline from rent and lifestyle
          (see <Link href={ROUTES.salaryGuides}>salary guides</Link> and{" "}
          <Link href={`${ROUTES.salaryGuides}#enough-heading`}>city “enough salary” pages</Link>).
        </li>
        <li>
          <strong>Anyone learning payslip vocabulary</strong> — CTC, PF wage, regime choice — without mistaking
          a free calculator for a compliance audit.
        </li>
      </ul>
      <p>
        We are not a substitute for your employer’s payroll team, a chartered accountant, or a tax filing
        product.
      </p>

      <h2>What the calculators do</h2>
      <p>
        Each tool runs on the same core calculation layer (TypeScript, with
        tests): you supply inputs, the engine applies published formulas and config (e.g. slabs for the
        configured financial year, PF rules, heuristics for lifestyle spend on the{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link>). Results are labeled as estimates
        where the real world introduces variation (TDS timing, state professional tax tables, bonuses).
      </p>
      <p>
        Browse the full list on the{" "}
        <Link href={ROUTES.calculators} className="font-medium">
          calculators hub
        </Link>
        . For a single map of limits and FY scope, read{" "}
        <Link href={ROUTES.methodology} className="font-medium">
          methodology
        </Link>
        .
      </p>

      <h2>How estimates are maintained</h2>
      <p>
        Tax slabs, standard deductions, and related constants live in versioned config. When India’s Union
        Budget changes rules, we update code and documentation — not silently. The{" "}
        <Link href={ROUTES.methodology}>methodology</Link> page and freshness badges on calculator pages state
        the financial year the engine targets and the last time content was reviewed.
      </p>
      <p>
        If you find a bug or a mismatch with a cited rule, use the{" "}
        <Link href={ROUTES.contact}>contact</Link> page. We do not promise instant fixes, but we treat
        accuracy in scope as a serious obligation.
      </p>

      <h2>What we do not promise</h2>
      <ul>
        <li>
          <strong>Not legal, tax filing, or investment advice</strong> — educational outputs only; use Form 16,
          AIS, and a qualified professional for filing and compliance.
        </li>
        <li>
          <strong>Not a guarantee that your payslip will match</strong> — employers use their own PF wage,
          TDS smoothing, and component definitions.
        </li>
        <li>
          <strong>Not a regulated advisory service</strong> — we are not a law firm, CA firm, or SEBI-registered
          investment adviser.
        </li>
        <li>
          <strong>No paid testimonials, fake reviews, or “as seen on” claims</strong> — we do not add
          credibility theater.
        </li>
      </ul>

      <h2>How to use the site responsibly</h2>
      <p>
        Treat every number as an <strong>estimate</strong> with stated assumptions. Cross-check material
        decisions with official documents and professionals where consequences matter.
      </p>

      <TrustMethodologyNotice className="mt-6" />

      <p className="mt-6">
        <Link href={ROUTES.disclaimer} className="font-medium">
          Full disclaimer
        </Link>{" "}
        ·{" "}
        <Link href={ROUTES.privacyPolicy} className="font-medium">
          Privacy policy
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
