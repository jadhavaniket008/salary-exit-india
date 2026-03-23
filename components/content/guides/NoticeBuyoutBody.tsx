import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function NoticeBuyoutBody() {
  return (
    <ArticleProse>
      <p>
        A notice period buyout is money you pay (or the employer deducts) when you want to leave earlier than
        the contractual notice duration. The goal is usually to compensate the employer for the shortfall in
        time — but the exact formula is contractual and can differ materially across companies.
      </p>

      <h2 id="what-buyout-tries">What a buyout is trying to approximate</h2>
      <p>
        Many policies approximate “one day of pay” and multiply by the number of notice days not served. The
        definition of “one day of pay” is where disputes creep in: some employers use calendar days in a month,
        others use fixed 30-day months, and others use working days.
      </p>
      <p>
        SalaryExit’s buyout calculator uses a transparent calendar-month proration so you can see the
        sensitivity to month length — then you can compare against your contract language.
      </p>

      <h2 id="gross-vs-net">Gross vs net: taxes and recoveries still apply</h2>
      <p>
        A buyout amount computed on gross pay is not necessarily what you “feel” financially if it is processed
        through payroll with TDS or other recoveries. If your HR team quotes a number, ask whether it is gross,
        taxable, or net after standard payroll treatment.
      </p>

      <h2 id="negotiation">What employees negotiate in practice</h2>
      <ul>
        <li>Whether buyout is calculated on basic only vs full gross.</li>
        <li>Whether unused leave can offset part of the notice shortfall.</li>
        <li>Whether the employer waives partially for retention or business reasons (policy-dependent).</li>
      </ul>

      <h2 id="related">Related tools and reading</h2>
      <p>
        Estimate a calendar-prorated buyout using the{" "}
        <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice period buyout calculator</Link>. If you are
        modeling a full exit package, pair it with the{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link> for line-item credits and
        deductions you can name explicitly.
      </p>
    </ArticleProse>
  );
}
