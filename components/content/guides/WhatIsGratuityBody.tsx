import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatIsGratuityBody() {
  return (
    <ArticleProse>
      <p>
        Gratuity is an employer-funded benefit paid on qualifying employment-separation
        events. The Code on Social Security, 2020 has governed applicable gratuity
        provisions since 21 November 2025, replacing the former Payment of Gratuity Act,
        1972 as the current reference. This guide is educational, not an entitlement
        determination or legal or tax opinion.
      </p>

      <h2 id="what-it-is">What gratuity is designed to do</h2>
      <p>
        Gratuity rewards qualifying service and is distinct from employee and employer
        provident-fund contributions. Coverage depends on the establishment and employment
        arrangement. Better terms under an applicable contract or award may also matter.
      </p>

      <h2 id="formula">The 15/26 formula: a common estimate</h2>
      <p>
        A standard illustration for a regular covered employee uses:
        <strong> Gratuity = (last-drawn monthly statutory wages × 15 × counted years) ÷ 26</strong>.
        The relevant years typically include each completed year or part exceeding six
        months. Special rules may apply to seasonal workers, fixed-term employees and
        other categories. This site&apos;s arithmetic model does not decide eligibility
        or automatically implement every service-year and wage-base rule.
      </p>
      <p>
        If verified statutory wages are ₹40,000/month and the model uses six years, the
        arithmetic result is about ₹1,38,462 before any separate eligibility, cap and
        tax checks. Use the actual approved wage base rather than assuming gross pay.
      </p>

      <h2 id="what-counts-as-salary">What counts as last-drawn statutory wages?</h2>
      <p>
        The current wage definition starts with Basic, dearness allowance and retaining
        allowance (if any). If specified excluded allowances and payments exceed the
        statutory 50% remuneration threshold, the excess may be added back to wages.
        Therefore a blanket &quot;Basic + DA only&quot; rule is inaccurate.
        Your HR calculation should identify the last-drawn wage base and any add-back.
      </p>
      <p>
        SalaryExit does not infer the allowance add-back from a CTC breakup; enter the
        final monthly statutory wage basis as verified with payroll.
      </p>

      <h2 id="eligibility">The five-year rule and exceptions</h2>
      <p>
        Five years of continuous service is the general threshold, but death, disablement
        and qualifying expiration of a fixed-term contract have exceptions. The Ministry
        of Labour&apos;s March 2026 FAQ states that a fixed-term employee qualifies after
        one year of service under the contract. Avoid assuming that four years and
        240 days always qualifies; legal facts and applicable interpretation matter.
      </p>
      <p>
        Employer coverage, prior service, breaks, establishment classification and
        eligibility under applicable provisions need separate verification.
      </p>

      <h2 id="tax">Tax treatment is a separate calculation</h2>
      <p>
        A gratuity amount and a tax-exempt gratuity amount are not interchangeable.
        The site shows a simplified covered-employer ₹20 lakh cap assumption and a
        rough split, but actual exemption depends on current tax law, employment
        category, prior receipts and salary history. Do not use the displayed
        taxable balance directly as an ITR determination.
      </p>

      <h2 id="verify-with-hr">Questions worth asking HR</h2>
      <ul>
        <li>Is my employment covered by the Code on Social Security gratuity provisions?</li>
        <li>What last-drawn statutory wage base was used, including any 50% add-back?</li>
        <li>What service years and rounding method were counted, and do exceptions apply?</li>
        <li>When is gratuity payable and what tax treatment will payroll apply?</li>
      </ul>
      <p>
        Official references:{" "}
        <a href="https://www.labour.gov.in/static/uploads/2026/01/de4758d5bfeffc456d7de97a801891b0.pdf">
          Labour Ministry FAQs
        </a>
        {" "}and{" "}
        <a href="https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf">
          March 2026 clarifications
        </a>.
      </p>
      <p>
        Use the <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link> to
        estimate the 15/26 arithmetic, and the{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>
        {" "}to total your own verified line items. Neither tool certifies legal entitlement.
      </p>
    </ArticleProse>
  );
}
