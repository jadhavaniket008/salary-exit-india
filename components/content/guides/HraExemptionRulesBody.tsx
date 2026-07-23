import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function HraExemptionRulesBody() {
  return (
    <ArticleProse>
      <p>
        HRA exemption is the single largest deduction most salaried employees ever claim — and also the one
        people get wrong most often, either by underclaiming out of confusion or overclaiming in a way that
        creates trouble later. Here is the actual formula and the documentation it depends on.
      </p>

      <h2 id="old-regime-only">This only exists under the old regime</h2>
      <p>
        Section 10(13A) HRA exemption is <strong>not available under the new regime at all</strong>. If your
        employer has you on new-regime TDS by default (which is now the standard), your HRA allowance is
        fully taxable regardless of your actual rent. Claiming this exemption requires explicitly declaring
        the old regime — usually at the start of the financial year via your payroll portal or Form 12BB.
        Run both regimes through the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime calculator</Link> before deciding;
        HRA alone doesn't automatically make old regime better if your other deductions are thin.
      </p>

      <h2 id="the-formula">The exemption is the least of three numbers</h2>
      <p>Your exempt HRA amount is whichever of these three is smallest:</p>
      <ol>
        <li><strong>Actual HRA received</strong> from your employer during the year.</li>
        <li>
          <strong>Rent paid minus 10% of salary</strong> — "salary" here means Basic + Dearness Allowance
          (DA) only, not your gross.
        </li>
        <li>
          <strong>50% of salary</strong> if you live in Mumbai, Delhi, Kolkata, or Chennai (the four cities
          treated as metros for this rule); <strong>40% of salary</strong> everywhere else — including
          Bangalore, Pune, Hyderabad, and Gurgaon, which people often assume count as metros here but don't.
        </li>
      </ol>
      <p>
        Because it's the <em>least</em> of the three, a high HRA allowance from your employer doesn't
        guarantee a high exemption — your actual rent and city classification cap it. Use the{" "}
        <Link href={ROUTES.hraCalculator}>HRA exemption calculator</Link> with your real Basic, HRA, rent,
        and city to see which of the three numbers is actually binding for you.
      </p>

      <h2 id="documentation">What you need to actually claim it</h2>
      <ul>
        <li>
          <strong>Rent receipts</strong> for the year, submitted to payroll during the investment
          declaration window (typically January–February for the outgoing FY).
        </li>
        <li>
          <strong>Landlord's PAN</strong> is mandatory if your annual rent exceeds ₹1,00,000 (i.e., rent
          above ~₹8,333/month) — without it, payroll can reject the claim outright.
        </li>
        <li>
          A <strong>rental agreement</strong> is not always mandatory for payroll purposes but is standard
          practice, and is often asked for if the claim is scrutinized during assessment.
        </li>
      </ul>

      <h2 id="paying-rent-to-parents">Paying rent to parents: allowed, but do it properly</h2>
      <p>
        You can claim HRA exemption while paying rent to your parents, provided it's genuine — actual money
        transferred (not just a paper trail), a real rental agreement, and your parents declaring that rent
        as income in their own return. This is legal and commonly done, but treat it as seriously as renting
        from anyone else: sporadic or undocumented "payments" to parents is exactly the pattern that draws
        scrutiny. You cannot do this if you jointly own the property with your parents, or if you're paying
        rent for a home you already legally co-own.
      </p>

      <h2 id="owning-a-home">If you own a home in the same city</h2>
      <p>
        Claiming HRA exemption while owning a home you're not living in, in the same city where you're
        renting, is a common trigger for questions from the tax department — it's not automatically
        disallowed, but you need a genuine reason (the owned property is too far from your workplace, is
        under construction, is occupied by family, etc.) and should be prepared to explain it. If the owned
        home is vacant or rented out, you separately need to account for its notional/actual rental income
        under "Income from House Property" — a detail people frequently miss entirely.
      </p>

      <h2 id="hra-plus-home-loan">Can you claim HRA and home loan interest together?</h2>
      <p>
        Yes, in specific situations — most commonly when you rent near your workplace in one city while
        servicing a home loan on a property in another city (or one that isn't ready for possession yet).
        Both Section 10(13A) (HRA) and Section 24(b) (home loan interest, up to ₹2L for a self-occupied
        property) can apply simultaneously, but only under the old regime, and only if the facts genuinely
        support both claims. This is a common scenario for people who bought a home in their hometown while
        working in a different city — don't assume it's disallowed by default, but don't claim it
        mechanically either.
      </p>

      <p>
        For the full salary and tax picture with HRA factored in alongside PF and regime choice, use the{" "}
        <Link href={ROUTES.salaryCalculator}>salary & tax breakdown calculator</Link>.
      </p>
    </ArticleProse>
  );
}
