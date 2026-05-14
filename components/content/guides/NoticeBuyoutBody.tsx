import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function NoticeBuyoutBody() {
  return (
    <ArticleProse>
      <p>
        A notice period buyout — sometimes called &quot;notice pay&quot; or &quot;notice shortfall payment&quot;
        — is the amount you pay (or the employer deducts) when you leave before completing the contractual
        notice period. It comes up in nearly every job switch in India&apos;s tech and services sector, where
        60–90 day notice periods are common. Understanding how employers calculate it, what is negotiable, and
        how it flows through your full-and-final settlement prevents expensive surprises.
      </p>

      <h2 id="what-it-tries">What a notice buyout is trying to do</h2>
      <p>
        The notice period exists so your employer has time to find a replacement, manage knowledge transfer,
        and avoid operational disruption. When you leave early, the buyout is meant to compensate for that
        shortfall — in theory, it should approximately equal the cost of hiring a temporary replacement or
        the productivity lost during the gap. In practice, the formula is contractual and may not directly
        track the actual cost to the employer.
      </p>

      <h2 id="per-day-calculation">The per-day salary problem: where most disputes start</h2>
      <p>
        Most contracts phrase the buyout as &quot;X days of salary for each day of notice not served.&quot;
        The dispute is always in the definition of &quot;one day of salary.&quot; Common approaches:
      </p>
      <ul>
        <li>
          <strong>Annual gross divided by 365:</strong> Monthly gross × 12 / 365. Results in a lower
          per-day figure because it uses actual calendar days.
        </li>
        <li>
          <strong>Monthly gross divided by 30:</strong> A round-number convention. Slightly higher than
          365-day basis in most months.
        </li>
        <li>
          <strong>Monthly gross divided by actual calendar days in the month:</strong> For February
          departures, this is the most expensive basis (28 or 29 days); for 31-day months, slightly
          lower. SalaryExit&apos;s calculator uses this method explicitly.
        </li>
        <li>
          <strong>Basic salary only (not gross):</strong> Some contracts specify that buyout is computed
          on Basic rather than full gross. This is significantly more employee-friendly and produces a
          30–50% lower buyout at typical Basic ratios.
        </li>
      </ul>
      <p>
        Read your contract carefully. The phrase &quot;salary&quot; without qualification typically
        means gross, but &quot;basic salary&quot; or &quot;basic pay&quot; means only the base component.
        If your contract is ambiguous, ask HR to clarify in writing before you resign.
      </p>

      <h2 id="worked-example">A worked example: 45 days short on 90-day notice</h2>
      <p>
        Gross ₹15 LPA → monthly gross = ₹1,25,000. If notice shortfall is 45 days and employer uses
        monthly/30 basis: per-day pay = ₹1,25,000 / 30 = ₹4,167. Buyout = ₹4,167 × 45 = ₹1,87,500.
      </p>
      <p>
        Same scenario on Basic-only basis (Basic = 40% of gross = ₹50,000/month): per-day = ₹50,000 / 30
        = ₹1,667. Buyout = ₹1,667 × 45 = ₹75,000. The difference — ₹1,12,500 — is purely definitional.
        Always verify which basis your contract uses.
      </p>

      <h2 id="gross-vs-net">Gross vs net: how buyout is processed through payroll</h2>
      <p>
        Buyout amounts are generally recoverable from your full-and-final settlement gross — which means
        they are deducted before the final payout is computed. Whether the recovery is treated as a
        salary deduction (affecting TDS calculation) or a separate adjustment depends on your
        employer&apos;s payroll processing. In most cases, the F&amp;F settlement is processed together:
        your earned but unpaid salary, leave encashment, and gratuity (if applicable) are credited; PF
        deductions, notice recovery, tax, and other adjustments are debited; and you receive the net.
      </p>
      <p>
        It is not uncommon for F&amp;F settlements at companies with 90-day notice periods to result in
        near-zero or even negative payout in the final settlement if the notice shortfall is large and
        gross is low. Model this before you resign. The{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link> lets you
        add notice recovery as a debit alongside your credits.
      </p>

      <h2 id="what-you-can-negotiate">What employees actually negotiate</h2>
      <p>
        Notice buyouts are more negotiable than most employees assume, particularly for:
      </p>
      <ul>
        <li>
          <strong>Waiver for mutual convenience:</strong> If your employer has no immediate backfill
          planned and is happy with an early exit, they may waive the notice period (and buyout) entirely.
          Many do, especially at companies with ongoing cost-management — ask the HR business partner,
          not just the hiring manager.
        </li>
        <li>
          <strong>Partial waiver:</strong> If you can serve 30 of 90 days before the new company needs
          you, you may negotiate to serve the partial period and buy out only the remainder.
        </li>
        <li>
          <strong>Leave adjustment:</strong> Unused earned leave can be applied against notice period
          shortfall in many company policies. If you have 15 days of EL, the effective buyout period
          may be 30 days instead of 45.
        </li>
        <li>
          <strong>Garden leave:</strong> Some employers accept a &quot;garden leave&quot; arrangement
          where you are technically employed (and paid) during the notice period but not required to
          work. This benefits you because no buyout is needed, but you cannot start the new role until
          the notice period is fully served.
        </li>
      </ul>

      <h2 id="new-employer-paying">When the new employer offers to pay the buyout</h2>
      <p>
        Many companies, particularly in competitive hiring markets, offer a &quot;joining bonus&quot;
        or &quot;buyout reimbursement&quot; to cover the notice buyout cost. Important caveats:
      </p>
      <ul>
        <li>
          The joining bonus almost always has a clawback clause — if you leave within 12–18 months,
          you repay it (often in full, sometimes prorated). Model the net cost if you leave early.
        </li>
        <li>
          The bonus is taxable in the year it is received — it increases your TDS in that financial
          year. Plan for the tax impact before assuming the full amount offsets your buyout.
        </li>
        <li>
          The reimbursement is usually conditional on receipt of a relieving letter from your current
          employer. If there is a dispute about notice buyout with your current employer, the relieving
          letter may be delayed.
        </li>
      </ul>

      <h2 id="legal-reality">What happens if you just leave without paying</h2>
      <p>
        In practice, most Indian employment contracts include a buyout clause but enforcement is civil,
        not criminal. An employer can sue you for breach of contract in civil court — but the cost of
        litigation versus the buyout amount makes this rare for amounts below ₹5–10L. More
        practically, your employer may:
      </p>
      <ul>
        <li>Withhold your relieving letter and experience letter.</li>
        <li>Delay or withhold your full-and-final settlement.</li>
        <li>Give an unfavorable reference if contacted for background verification.</li>
      </ul>
      <p>
        For most tech professionals, the relieving letter is the most important practical concern —
        many new employers require it for background verification. Negotiate a resolution rather than
        simply walking out.
      </p>
      <p>
        Estimate your notice buyout with the{" "}
        <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice period buyout calculator</Link>, and
        model your complete exit package with the{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>.
      </p>
    </ArticleProse>
  );
}
