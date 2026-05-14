import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatIsGratuityBody() {
  return (
    <ArticleProse>
      <p>
        Gratuity is a lump-sum payment made by an employer to an employee as a recognition of long service.
        For many Indian salaried employees in the private sector, it is the first substantial sum they
        receive at the end of employment — but it is also among the most misunderstood: when you qualify,
        how the amount is calculated, what is taxable, and how to verify whether your employer&apos;s
        calculation is correct. This guide covers the practical mechanics.
      </p>
      <p>
        <strong>Disclaimer:</strong> Gratuity law in India (the Payment of Gratuity Act, 1972) has
        specific eligibility conditions, employer coverage criteria, and tax treatment that depend on
        your employment type and company status. This guide provides general educational context — it
        is not legal advice. Verify your specific entitlement with your HR team and, for complex
        situations, a labour law professional.
      </p>

      <h2 id="what-it-is">What gratuity is designed to do</h2>
      <p>
        The Payment of Gratuity Act was enacted to provide a defined benefit to employees who have spent
        meaningful time at an establishment. The intent is similar to a long-service bonus: employees who
        commit to an employer for multiple years receive a proportional benefit upon leaving (whether
        through resignation, retirement, or other separation). It is distinct from EPF — gratuity is paid
        by the employer as an obligation, while EPF is a shared contribution that accumulates in your
        individual account.
      </p>

      <h2 id="formula">The 15/26 formula: how the common estimate works</h2>
      <p>
        The most referenced formula for covered establishments under the Payment of Gratuity Act is:
      </p>
      <p>
        <strong>Gratuity = (Last drawn monthly salary × 15 × Years of service) / 26</strong>
      </p>
      <p>
        Where &quot;last drawn monthly salary&quot; is typically Basic + DA (Dearness Allowance) for
        covered employers under the Act. The &quot;26&quot; represents a notional 26 working days per
        month. The &quot;15&quot; represents 15 days of salary per year of service.
      </p>
      <p>
        Example: Basic + DA = ₹40,000/month, 6 years of service.
        Gratuity = (₹40,000 × 15 × 6) / 26 = ₹36,00,000 / 26 = ₹1,38,461.
      </p>
      <p>
        For partial years: under the Act, a service period of more than 6 months in the last year is
        rounded up to a full year. So 6 years and 7 months counts as 7 years; 6 years and 3 months
        counts as 6 years. Some employers apply more generous rounding — check your company policy.
      </p>

      <h2 id="what-counts-as-salary">What counts as &quot;last drawn salary&quot; — the definitional disputes</h2>
      <p>
        For the purpose of the Act, &quot;wages&quot; (which is used as the basis) includes Basic + DA +
        any commission based on percentage of turnover. It typically excludes HRA, special allowance,
        overtime pay, bonus, and other allowances. This is different from your gross salary.
      </p>
      <p>
        In practice, many companies have their own broader definition — especially for employees not
        formally covered under the Act. Some companies compute gratuity on a wider base (including
        special allowances) as an employee-friendly policy. Verify with HR what your company&apos;s
        specific definition is, and ask to see the computation basis if the amount seems off.
      </p>
      <p>
        A common employee error: expecting gratuity based on total gross. If your gross is ₹1,20,000/month
        but Basic + DA is only ₹42,000, your gratuity is computed on ₹42,000 — not ₹1,20,000. This
        creates a significant gap for employees with low-Basic salary structures.
      </p>

      <h2 id="eligibility">The five-year eligibility rule and its caveats</h2>
      <p>
        The most widely cited eligibility condition is continuous service of at least 5 years (4 years
        and 240 days in some interpretations, which has been the subject of court rulings for certain
        employment types). Key points:
      </p>
      <ul>
        <li>
          <strong>Death or disability:</strong> Gratuity is payable to the nominee or the employee
          regardless of service period if separation occurs due to death or disability. The 5-year
          rule does not apply here.
        </li>
        <li>
          <strong>Contractual vs regular employment:</strong> The Act applies to establishments with
          10 or more employees. Contract employees placed through third-party agencies may have
          different treatment depending on the arrangement.
        </li>
        <li>
          <strong>Startups and smaller companies:</strong> Establishments with fewer than 10 employees
          are not mandatorily covered under the Act. Some small employers voluntarily pay gratuity;
          others do not. If you work at a startup with fewer than 10 employees, your gratuity
          entitlement depends entirely on your employment contract, not the Act.
        </li>
        <li>
          <strong>Probation period:</strong> Probation typically counts toward service duration for
          gratuity purposes if the employee is confirmed. Verify with your appointment letter.
        </li>
      </ul>

      <h2 id="tax">Tax treatment: exempt up to a ceiling, taxable above</h2>
      <p>
        For employees covered under the Payment of Gratuity Act, the exemption from income tax on
        gratuity is the minimum of: (a) gratuity received, (b) 15 days&apos; salary for each year of
        service (as per the Act formula), and (c) ₹20 lakh (the statutory exemption ceiling as of
        2023 — verify the current limit). Gratuity received above the ceiling is taxable as salary income.
      </p>
      <p>
        For employees not covered under the Act (for example, those employed by non-covered
        establishments or those whose employment contract specifies a different arrangement), a
        separate exemption formula applies under the Income Tax Act. The calculation differs from
        the above.
      </p>
      <p>
        For the vast majority of private-sector employees whose gratuity is below ₹20L, the full
        amount is effectively tax-free. At very high salaries or very long tenures, the amount can
        exceed ₹20L — plan accordingly.
      </p>

      <h2 id="verify-with-hr">High-signal questions to ask HR at separation</h2>
      <ul>
        <li>Is my establishment covered under the Payment of Gratuity Act?</li>
        <li>What is the salary definition used for gratuity computation (Basic only, or Basic + DA, or broader)?</li>
        <li>How are partial years handled in my service calculation?</li>
        <li>Has the company funded gratuity through an LIC group gratuity scheme or similar, or is it paid from current revenues? (Relevant for company financial stability concerns.)</li>
        <li>When will the gratuity be processed — with F&amp;F, or separately within 30 days of separation?</li>
      </ul>
      <p>
        Use the <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link> to estimate your
        amount based on the 15/26 formula — then cross-check it against what HR provides. If the
        numbers differ significantly, ask for the computation basis in writing.
      </p>
      <p>
        For your full exit settlement picture, combine gratuity with notice period adjustments and
        leave encashment in the{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>.
      </p>
    </ArticleProse>
  );
}
