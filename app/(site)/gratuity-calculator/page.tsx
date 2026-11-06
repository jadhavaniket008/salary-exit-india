import { GratuityCalculatorClient } from "@/components/calculators/clients/GratuityCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("gratuity");

export default function GratuityCalculatorPage() {
  return (
    <>
      <GratuityCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Gratuity eligibility under the current labour codes
          </h2>
          <p className="text-foreground-secondary">
            Gratuity is an employer-funded statutory benefit governed by the Code on Social
            Security, 2020, in force from 21 November 2025. The earlier Payment of Gratuity
            Act, 1972 is historical legislation, not the governing present-law reference.
            Coverage depends on the establishment and applicable provisions.
          </p>
          <p className="text-foreground-secondary">
            Five years of continuous service is the usual threshold, but it is not universal.
            Death and disablement are exceptions, and qualifying fixed-term employees have
            a separate rule: Ministry of Labour guidance specifies eligibility after one year
            of service under the fixed-term contract. Do not assume a blanket rule that
            &quot;four years and 240 days always counts as five years&quot;.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            How the 15/26 estimate works
          </h2>
          <p className="rounded-lg border border-border bg-surface-subtle p-4 font-mono text-sm text-foreground">
            Illustrative gratuity = (15 × Last Drawn Monthly Statutory Wages × Years Used) ÷ 26
          </p>
          <p className="text-foreground-secondary">
            The 15/26 method estimates 15 days&apos; wages for a year of service.
            Actual service-year rounding and special categories, including certain
            fixed-term and seasonal arrangements, require separate verification.
            The calculator accepts the monthly wage basis you supply; it does not
            derive your statutory wage base from a full salary breakup.
          </p>
          <p className="text-foreground-secondary">
            For the current Code on Social Security wage definition, Basic, dearness
            allowance and retaining allowance (if any) generally form the starting point.
            When specified excluded allowances or payments exceed 50% of relevant remuneration,
            the excess may have to be added back to statutory wages. So &quot;Basic + DA
            only&quot; is not universally correct. Confirm the wage base with payroll before
            entering it here.
          </p>
          <p className="text-foreground-secondary">
            Example: if the applicable last-drawn monthly statutory wage base is ₹50,000 and
            eight years are counted, this simplified model returns approximately ₹2,30,769
            before any legally applicable ceiling, rounding, entitlement and tax checks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Tax exemption and CTC</h2>
          <p className="text-foreground-secondary">
            The calculator shows a <strong>rough</strong> tax-exempt split using its configured
            ₹20 lakh cap for the covered-employer model. This is not an assessment of your
            actual income-tax exemption: employer category, applicable tax law, prior
            gratuity receipts, salary history and entitlement can change the result.
            A statutory benefit ceiling and an income-tax exemption limit are not the same claim.
          </p>
          <p className="text-foreground-secondary">
            Employers may include an estimated gratuity accrual in CTC. That provision is not
            monthly take-home cash, and leaving before five years does not invariably
            eliminate entitlement because legal exceptions exist. Check the contract,
            employment category and current wage definition rather than relying on a CTC
            percentage alone.
          </p>
          <p className="text-sm text-foreground-secondary">
            Official sources:{" "}
            <a className="underline" href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2192463" target="_blank" rel="noopener noreferrer">labour-code commencement</a>,
            {" "}<a className="underline" href="https://www.labour.gov.in/static/uploads/2026/01/de4758d5bfeffc456d7de97a801891b0.pdf" target="_blank" rel="noopener noreferrer">Ministry FAQ on wages and gratuity</a>,
            {" "}and{" "}<a className="underline" href="https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf" target="_blank" rel="noopener noreferrer">March 2026 clarifications</a>.
          </p>
        </section>
      </div>
    </>
  );
}
