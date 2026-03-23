import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

export function CompareOffersBody() {
  return (
    <ArticleProse>
      <p>
        CTC is an advertisement-friendly number. For life decisions — relocation, loan EMIs, savings rate — you
        usually care about cash timing, risk, and career upside. A useful comparison framework separates{" "}
        <strong>liquidity</strong> (what you can spend soon), <strong>risk</strong> (variable pay probability),
        and <strong>total reward</strong> (cash + benefits + learning).
      </p>

      <h2 id="in-hand-first">1) Build a credible in-hand estimate for each offer</h2>
      <p>
        Compare monthly take-home using the same methodology for every offer. If one offer includes aggressive
        variable pay, model a conservative and optimistic case rather than a single point estimate.
      </p>
      <p>
        Tools: <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand</Link> and{" "}
        <Link href={ROUTES.salaryCalculator}>salary breakdown</Link>.
      </p>

      <h2 id="regime">2) Tax regime and deductions: compare apples to apples</h2>
      <p>
        If you are comparing old vs new regime sensitivity, do it explicitly. A higher CTC with worse
        deductibility assumptions can lose to a lower CTC under a different regime choice — for some taxpayers.
      </p>
      <p>
        Tool: <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime comparison</Link>.
      </p>

      <h2 id="benefits">3) Benefits that matter: insurance, leave, retirement, and flexibility</h2>
      <p>
        Employer PF policy, health cover, parental leave, and remote flexibility can dominate quality of life
        even when monthly cash looks similar. This is not fluff — it is compensation design, just not always
        visible in CTC headlines.
      </p>

      <h2 id="exit">4) Exit economics: notice, buyouts, and joining bonuses</h2>
      <p>
        Joining bonuses often have clawbacks. Notice periods affect overlap and relocation timing. If you are
        exiting, model notice buyout risk explicitly.
      </p>
      <p>
        Tools: <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice buyout</Link>,{" "}
        <Link href={ROUTES.gratuityCalculator}>gratuity</Link>,{" "}
        <Link href={ROUTES.leaveEncashmentCalculator}>leave encashment</Link>.
      </p>

      <h2 id="ranking">5) Rank offers using a table, not vibes</h2>
      <p>
        Use a consistent scorecard: in-hand, expected variable, benefits, commute/remote, role growth, and
        manager quality. SalaryExit’s{" "}
        <Link href={ROUTES.offerComparisonCalculator}>offer comparison calculator</Link> helps rank offers by
        the numbers you supply — it does not replace judgment on non-cash factors.
      </p>

      <h2 id="city-rent">6) City and rent: compare the same gross honestly</h2>
      <p>
        If offers are in different cities, do not stop at CTC. Model in-hand for each, then subtract a realistic
        rent for where you actually plan to live — rent usually moves more than tax when you switch metros. The{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> is built for that second step.
      </p>
      <p>
        For quick scenario pages with fixed rent assumptions you can edit, see for example{" "}
        <Link href={salaryEnoughPath("is-15-lpa-good-in-bangalore")}>₹15 LPA in Bangalore</Link>,{" "}
        <Link href={salaryEnoughPath("is-20-lpa-good-in-pune")}>₹20 LPA in Pune</Link>, or{" "}
        <Link href={salaryEnoughPath("is-20-lpa-good-in-mumbai")}>₹20 LPA in Mumbai</Link> — then replace the
        rent field with your broker quote. The framework is in{" "}
        <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
          how to judge if a salary is good in India
        </Link>
        .
      </p>
    </ArticleProse>
  );
}
