import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatAffectsInHandBody() {
  return (
    <ArticleProse>
      <p>
        “In-hand salary” sounds like a single number, but it is the outcome of several independent systems:
        payroll policy, statutory deductions, tax regime selection, and timing effects (joining mid-month,
        arrears, bonus months). If you want reliable planning, separate <em>cash components</em> from{" "}
        <em>annualization effects</em> and <em>tax withholding behavior</em>.
      </p>

      <h2 id="payroll-definition">1) Payroll definition: what is included in “gross” for you</h2>
      <p>
        Employers differ on whether allowances are paid monthly, reimbursed, or accrued. Some components are
        taxable when paid, others when vested. For the same CTC headline, the realized gross in a given month
        can move — which changes TDS trajectories even if annual tax is similar.
      </p>

      <h2 id="pf-wage">2) PF wage base: employee contributions change take-home</h2>
      <p>
        Employee PF is often computed on Basic + DA (or a subset), sometimes subject to statutory ceilings
        depending on employer practice. A higher PF wage generally lowers immediate in-hand cash while
        increasing retirement contributions — it is not “good” or “bad” without your personal savings goals.
      </p>
      <p>
        If you are modeling PF, prefer payslip numbers over guesses — but if you must guess, keep the
        assumption visible and test sensitivity.
      </p>

      <h2 id="professional-tax">3) Professional tax: small line item, state-specific rules</h2>
      <p>
        Professional tax varies by state and salary slabs. It is usually small relative to income tax, but it
        should not be ignored when you are reconciling monthly net pay.
      </p>

      <h2 id="income-tax">4) Income tax regime and deductions: the biggest swing for many salaried employees</h2>
      <p>
        Old vs new regime trade-offs depend on whether you can utilize deductions meaningfully (for example,
        80C, HRA where applicable under old regime) versus the lower slab structure and standard deduction
        under the new regime for many taxpayers. This is not something to conclude from a single blog line —
        use a regime comparison tool, then validate with proofs.
      </p>
      <p>
        Start here:{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>Old vs new tax regime comparison calculator</Link>.
      </p>

      <h2 id="tds-timing">5) TDS smoothing vs month-to-month reality</h2>
      <p>
        Many employers smooth TDS across months, but your net pay can still jump in bonus months or when
        declarations change. A good annual estimate can still differ from any single month’s payslip.
      </p>

      <h2 id="what-to-do">What to do next (practical)</h2>
      <ul>
        <li>
          Build a baseline using <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand</Link> with explicit
          assumptions.
        </li>
        <li>
          Re-run when you change regime assumptions or PF inputs — sensitivity tells you what actually drives
          your cashflow.
        </li>
        <li>
          Use <Link href={ROUTES.salaryCalculator}>salary breakdown</Link> when you want a fuller annual tax + net
          sketch.
        </li>
      </ul>

      <h2 id="related">Related reading</h2>
      <p>
        Deduction-first checklist:{" "}
        <Link href={`${ROUTES.salaryGuides}/what-reduces-your-in-hand-salary`}>
          what reduces your in-hand salary
        </Link>
        . Rent vs savings:{" "}
        <Link href={`${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`}>
          how rent changes monthly savings
        </Link>
        . Calculation assumptions: <Link href={ROUTES.methodology}>methodology</Link>.
      </p>
    </ArticleProse>
  );
}
