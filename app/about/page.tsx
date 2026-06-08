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
      <h2>Why this site exists</h2>
      <p>
        SalaryExit was built after a frustrating experience that many Indian salaried employees will recognize:
        HR sent an offer letter showing ₹12 LPA CTC, and the first payslip showed an in-hand amount nearly
        ₹15,000 lower than expected. The gap came from three compounding factors — a professional tax
        deduction nobody mentioned, a PF wage calculation based on a percentage of Basic rather than a flat
        amount, and TDS front-loaded to cover the full year. No fraud, no error in HR&apos;s math — just
        assumptions that were never made visible.
      </p>
      <p>
        That experience surfaced a real gap: most Indian salary calculators give you a single number with no
        assumptions attached. When the number differs from your payslip (and it often does), there is no way
        to understand why or how to correct it. SalaryExit is the attempt to fix that — starting from the
        principle that a useful estimate shows its work.
      </p>

      <h2>Who this site is for</h2>
      <ul>
        <li>
          <strong>Employees comparing offers</strong> who need consistent in-hand math before they talk to HR
          or a CA. A 20% CTC hike can mean a 10% in-hand hike once tax, PF, and regime choice interact.
        </li>
        <li>
          <strong>People switching cities</strong> who want to separate CTC headline from rent and lifestyle
          (see <Link href={ROUTES.salaryGuides}>salary guides</Link> and{" "}
          <Link href={`${ROUTES.salaryGuides}#enough-heading`}>city &quot;enough salary&quot; pages</Link>).
        </li>
        <li>
          <strong>Anyone learning payslip vocabulary</strong> — CTC, PF wage, regime choice — without mistaking
          a free calculator for a compliance audit.
        </li>
        <li>
          <strong>Employees planning an exit</strong> who want a rough figure for notice buyout, gratuity,
          leave encashment, and full and final settlement before the conversation with HR.
        </li>
      </ul>
      <p>
        We are not a substitute for your employer&apos;s payroll team, a chartered accountant, or a tax filing
        product.
      </p>

      <h2>What the calculators do</h2>
      <p>
        Each tool runs on the same core calculation layer (TypeScript, with unit tests): you supply inputs,
        the engine applies published formulas and config — tax slabs for the configured financial year, PF
        rules under the Employees&apos; Provident Funds Act, Payment of Gratuity Act calculations, HRA exemption
        under Section 10(13A). Results are labeled as estimates where the real world introduces variation
        (TDS timing, state professional tax tables, employer-specific PF wage definitions, bonuses).
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

      <h2>How we maintain accuracy</h2>
      <p>
        Tax slabs, standard deductions, rebate thresholds, and EPF ceiling figures live in versioned
        configuration files in the codebase. When India&apos;s Union Budget changes rules, the config is updated
        and the change is documented — not made silently. The{" "}
        <Link href={ROUTES.methodology}>methodology</Link> page and freshness badges on calculator pages
        state the financial year the engine targets and the last time content was reviewed.
      </p>
      <p>
        Calculator logic is covered by unit tests that run against worked examples. Any change to the core
        calculation functions requires tests to pass. This does not guarantee that your employer uses the same
        assumptions — but it does mean the formulas we publish match what the calculator actually computes.
      </p>
      <p>
        Tax slab data is sourced from Finance Act publications and CBDT notifications. PF rules reference
        the Employees&apos; Provident Funds and Miscellaneous Provisions Act, 1952. Gratuity calculations follow
        the Payment of Gratuity Act, 1972. Where rules are complex, we document the simplification we made
        and why.
      </p>
      <p>
        If you find a bug or a mismatch with a cited rule, use the{" "}
        <Link href={ROUTES.contact}>contact</Link> page. We treat accuracy within stated scope as a serious
        obligation.
      </p>

      <h2>What we do not promise</h2>
      <ul>
        <li>
          <strong>Not legal, tax filing, or investment advice</strong> — educational outputs only; use Form 16,
          AIS, and a qualified professional for filing and compliance.
        </li>
        <li>
          <strong>Not a guarantee that your payslip will match</strong> — employers use their own PF wage
          definitions, TDS smoothing calendars, and component structures.
        </li>
        <li>
          <strong>Not a regulated advisory service</strong> — we are not a law firm, CA firm, or SEBI-registered
          investment adviser.
        </li>
      </ul>

      <h2>How to use the site responsibly</h2>
      <p>
        Treat every number as an <strong>estimate</strong> with stated assumptions. Cross-check material
        decisions — a job switch, a city move, a tax filing — with official documents and qualified
        professionals where consequences matter. The goal of this site is to help you ask better questions
        of your payroll team and CA, not to replace them.
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
