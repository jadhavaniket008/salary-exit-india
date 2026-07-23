import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function LeaveEncashmentRulesBody() {
  return (
    <ArticleProse>
      <p>
        Leave encashment tax treatment depends entirely on <em>when</em> you're encashing — during active
        service, or as part of exiting the company — and most people only learn the difference the year
        they resign, when it's too late to plan around it.
      </p>

      <h2 id="which-leave-counts">Which leave is even encashable</h2>
      <p>
        Only <strong>earned leave / privilege leave (EL/PL)</strong> is typically encashable. Casual leave
        (CL) and sick leave (SL) almost always lapse at year-end or on exit with no cash value — this is
        set by your company's leave policy, not by tax law, so check your HR policy document rather than
        assuming. Most companies cap how much earned leave you can accumulate (commonly 30–45 days), and
        anything above the cap is typically forfeited, not carried forward or paid out.
      </p>

      <h2 id="during-service">Encashing while still employed: fully taxable</h2>
      <p>
        If your company allows annual leave encashment as a policy (some do, as a retention or flexibility
        perk), any amount you encash while still employed is added to your salary income for that year and
        taxed at your normal slab rate — no exemption applies. This is straightforward but often causes a
        TDS surprise in whichever month the encashment is paid out, since it's a lump sum on top of your
        regular salary.
      </p>

      <h2 id="at-exit">Encashing at resignation or retirement: exemption applies, with limits</h2>
      <p>
        Leave encashment received at the time of leaving a job — resignation, retirement, or termination —
        gets more favorable treatment, but the rules differ by employer type:
      </p>
      <ul>
        <li>
          <strong>Government employees</strong>: leave encashment at retirement is <strong>fully exempt</strong>{" "}
          from tax under Section 10(10AA)(i), no upper limit.
        </li>
        <li>
          <strong>Private/non-government employees</strong>: exempt only up to the <strong>least</strong> of
          these four amounts:
          <ol>
            <li>Actual leave encashment amount received</li>
            <li>Average salary of the last 10 months before leaving</li>
            <li>Cash equivalent of earned leave standing to your credit (capped at 30 days per completed year of service)</li>
            <li>A statutory ceiling — ₹25,00,000 (revised upward from the earlier ₹3,00,000 limit)</li>
          </ol>
        </li>
      </ul>
      <p>
        Whatever exceeds the least of these four is taxed as regular salary income in the year you receive
        it. For most people at typical salary levels, the binding constraint is usually the 30-day-per-year
        cap on leave standing to credit, not the ₹25L ceiling — so the actual exempt amount is often smaller
        than people assume going in.
      </p>

      <h2 id="common-mistakes">Where people get this wrong</h2>
      <ul>
        <li>
          Assuming <strong>all</strong> leave encashment at resignation is tax-free — it's exempt only up to
          the calculated limit above, not automatically in full.
        </li>
        <li>
          Not tracking their actual accumulated leave balance before resigning — the payout is based on
          your real balance capped at company policy, not on assumption or memory.
        </li>
        <li>
          Confusing the encashment calculation basis — some companies calculate it on Basic + DA only,
          others on a fuller gross figure. This is a policy choice, not a legal requirement, so it varies
          company to company and materially changes the payout.
        </li>
      </ul>

      <p>
        To estimate your actual leave encashment payout, use the{" "}
        <Link href={ROUTES.leaveEncashmentCalculator}>leave encashment calculator</Link>. If you're modeling
        a full exit — leave encashment alongside gratuity, notice pay, and final dues — run it through the{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link> for the complete
        picture.
      </p>
    </ArticleProse>
  );
}
