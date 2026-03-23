import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function OldVsNewRegimeBody() {
  return (
    <ArticleProse>
      <p>
        India’s personal income tax rules for individuals include multiple regimes and annual updates. This
        guide is educational: it explains how to think about regime choice as a salaried employee — not how to
        file your return. Always verify slab rates, thresholds, and rebate conditions for the assessment year
        you are dealing with.
      </p>

      <h2 id="what-regimes-mean">What “old” vs “new” usually means in conversation</h2>
      <p>
        In common usage, salaried employees compare a <strong>legacy-style computation</strong> that may allow
        certain deductions and exemptions (subject to eligibility) against a <strong>newer simplified slab
        structure</strong> (often referenced as Section 115BAC for individuals) with its own standard deduction
        and rules about which deductions are disallowed.
      </p>
      <p>
        The precise rates and thresholds change with Union Budgets — calculators on SalaryExit pin assumptions to
        a configured financial year in code so you can see what was modeled.
      </p>

      <h2 id="deductions">Why deductions are not “free money”</h2>
      <p>
        Deductions under Chapter VI-A reduce taxable income only if you are eligible and actually incur the
        underlying expense/contribution. For example, HRA exemption has specific tests (rent paid, salary
        definition, metro vs non-metro). If you cannot substantiate a claim, your realized benefit may be lower
        than a back-of-the-envelope estimate.
      </p>
      <p>
        If HRA is central to your planning, use the dedicated{" "}
        <Link href={ROUTES.hraCalculator}>HRA exemption calculator</Link> and treat the output as an input to
        broader tax planning — not a standalone verdict.
      </p>

      <h2 id="rebates">Rebates and cess: where “tax before cess” confuses people</h2>
      <p>
        Income tax computations often involve tax before rebate, rebate applicability, then health and education
        cess on the tax after rebate. Small differences in taxable income can move rebate eligibility in ways
        that feel abrupt — this is why “marginal” thinking matters, and why tools should label what they
        modeled.
      </p>

      <h2 id="how-to-compare">How to compare regimes responsibly</h2>
      <ol>
        <li>Start from the same gross salary definition for both sides.</li>
        <li>Include PF and standard deductions consistently with the regime rules you are applying.</li>
        <li>
          Compare annual tax + cess, not just one month’s TDS — especially if your income is lumpy across the
          year.
        </li>
        <li>
          If you are close to a threshold, treat results as sensitive — rounding and proofs matter.
        </li>
      </ol>

      <p>
        Use SalaryExit’s{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new tax regime comparison calculator</Link> as a
        structured estimator — then confirm with Form 16 / AIS and a qualified tax professional for filing
        decisions.
      </p>
    </ArticleProse>
  );
}
