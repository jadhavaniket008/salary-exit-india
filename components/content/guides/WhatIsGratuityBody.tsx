import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatIsGratuityBody() {
  return (
    <ArticleProse>
      <p>
        Gratuity is a statutory benefit for many employees in India, designed as a lump-sum recognition for
        long service. The exact law, eligibility, and tax treatment depend on employer type, coverage under the
        Payment of Gratuity Act, and salary definitions used by your organization.
      </p>

      <h2 id="intuition">The intuition behind the common formula</h2>
      <p>
        A widely referenced form scales with <strong>last drawn salary</strong> (typically Basic + DA in covered
        cases) and <strong>years of service</strong>, using a month-length convention (often 26 days in the
        standard fraction people quote). This is why gratuity grows super-linearly with tenure for the same
        salary — longer service increases the multiplier.
      </p>

      <h2 id="eligibility">Eligibility: why “5 years” comes up constantly</h2>
      <p>
        Many employees first hear about a multi-year eligibility threshold. There are exceptions (for example,
        in cases of death/disability under law) — do not treat internet summaries as a substitute for your HR
        policy or legal counsel for edge cases.
      </p>

      <h2 id="tax">Tax treatment: exempt up to limits for many covered employers</h2>
      <p>
        Tax law includes exemption thresholds for gratuity for eligible employees, subject to conditions and caps
        that change with amendments. Non-covered employers may follow different rules. SalaryExit’s gratuity
        calculator includes a simplified exempt/taxable split for planning — not a determination for filing.
      </p>

      <h2 id="what-to-verify">What to verify with HR (high signal)</h2>
      <ul>
        <li>Whether your establishment is covered under the Act for gratuity computation purposes.</li>
        <li>What counts as “salary” for gratuity (Basic only vs Basic+DA, and other components).</li>
        <li>How partial years are treated in your employer’s internal policy.</li>
      </ul>

      <p>
        Run a planning estimate with the{" "}
        <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link>, then validate inputs against your
        appointment letter and HR policy.
      </p>
    </ArticleProse>
  );
}
