import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function SalaryStructureIndiaBody() {
  return (
    <ArticleProse>
      <p>
        When Indian companies quote a number as “CTC” (Cost to Company), they are usually describing an
        annualized cost envelope — not the amount that hits your bank account every month. Understanding the
        moving parts helps you interpret offer letters, variable pay schedules, and why two people with the
        same headline CTC can have different take-home amounts.
      </p>

      <h2 id="ctc-vs-gross-vs-in-hand">CTC, gross, and in-hand are different lenses</h2>
      <p>
        <strong>CTC</strong> often includes employer-side costs such as employer PF contributions, group
        insurance premiums, and sometimes gratuity accruals — depending on how the employer structures the
        letter. <strong>Gross salary</strong> (for payroll purposes) is closer to what income-tax calculations
        start from, but still before employee deductions. <strong>In-hand</strong> (take-home) is what remains
        after employee deductions like PF, professional tax, and income-tax withholding (TDS), plus any
        other recoveries your payslip applies.
      </p>
      <p>
        If you compare offers, do not rank on CTC alone — rank on assumptions you can defend: gross
        definition, PF wage, regime choice, and what is fixed vs variable.
      </p>

      <h2 id="common-components">Common components you will see in Indian salary structures</h2>
      <ul>
        <li>
          <strong>Basic salary:</strong> Usually the base for HRA and sometimes PF wage (depending on policy).
        </li>
        <li>
          <strong>HRA:</strong> An allowance for rent; tax treatment differs by regime and eligibility.
        </li>
        <li>
          <strong>Special allowance / flexible components:</strong> Often fully taxable as salary, but naming
          varies widely across employers.
        </li>
        <li>
          <strong>Employer PF:</strong> May appear in CTC as an employer cost — it is not your take-home.
        </li>
        <li>
          <strong>Bonus / variable pay:</strong> May be “target” or “eligible” — verify payout conditions and
          timing.
        </li>
      </ul>

      <h2 id="pf-and-statutory">PF, professional tax, and why deductions are not “hidden fees”</h2>
      <p>
        Employee PF is typically a percentage of PF wage (commonly tied to Basic + DA definitions). Professional
        tax is state-dependent. These are statutory or policy-driven cash flows — not optional UI toggles on a
        website — so any calculator must either ask you for the numbers or clearly state what it assumed.
      </p>
      <p>
        SalaryExit’s calculators keep assumptions explicit for this reason: the goal is not to pretend
        precision, but to show how sensitive your in-hand is to PF wage, PT, and tax regime.
      </p>

      <h2 id="practical-reading">How to read an offer letter like a practitioner</h2>
      <ol>
        <li>Identify what is fixed monthly vs paid quarterly/annually.</li>
        <li>Separate employer contributions listed for CTC completeness vs cash payable to you.</li>
        <li>Ask payroll for PF wage definition and PT state rules if you need payslip-level accuracy.</li>
        <li>
          Use a structured estimate for tax regime choice — then validate with Form 16 and a qualified advisor
          at filing time.
        </li>
      </ol>

      <p>
        Next: estimate your monthly in-hand using the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link>, or explore{" "}
        <Link href={ROUTES.epfCalculator}>EPF contribution estimates</Link> if PF dominates your questions.
      </p>

      <h2 id="methodology">Methodology and next guides</h2>
      <p>
        SalaryExit’s calculators state assumptions so you can compare scenarios without fake precision — see{" "}
        <Link href={ROUTES.methodology}>how we calculate</Link>. When you move from “what is CTC?” to “is this
        enough for rent?”, use{" "}
        <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
          how to judge if a salary is good in India
        </Link>{" "}
        and the <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link>.
      </p>
    </ArticleProse>
  );
}
