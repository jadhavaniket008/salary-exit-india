import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function FinalSettlementChecklistBody() {
  return (
    <ArticleProse>
      <p>
        Full and final (F&amp;F) settlement is the one payslip-adjacent document most people never learn to
        read carefully, because they only see it once — on their way out. That's exactly why mistakes in it
        go unnoticed: there's no next month's payslip to compare it against.
      </p>

      <h2 id="what-it-includes">What a full and final settlement should include</h2>
      <ul>
        <li><strong>Pro-rata salary</strong> for days worked in the final (partial) month.</li>
        <li>
          <strong>Leave encashment</strong> for your accumulated, unused earned leave — see the{" "}
          <Link href={ROUTES.leaveEncashmentCalculator}>leave encashment calculator</Link> for how this is
          computed and taxed.
        </li>
        <li>
          <strong>Gratuity</strong>, if you've completed 5+ years of continuous service — check the{" "}
          <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link> for your estimate.
        </li>
        <li>
          <strong>Notice pay adjustment</strong> — either a deduction (if you're leaving before your notice
          period ends and buying it out) or a payment (if the company is relieving you earlier than your
          notice period and waiving the balance). Verify which direction applies to you using the{" "}
          <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice buyout calculator</Link>.
        </li>
        <li>
          <strong>Pro-rata bonus or variable pay</strong>, if your offer letter or company policy provides
          for it on exit — many companies don't pay this out unless you're employed on the payout date, so
          check your specific policy rather than assuming.
        </li>
        <li><strong>Pending expense reimbursements</strong> — travel, medical, or other claims not yet processed.</li>
        <li>
          <strong>Deductions</strong> for any company property not returned (laptop, ID card, SIM), and
          recovery of any outstanding loans or salary advances.
        </li>
      </ul>

      <h2 id="timeline">How long it should take</h2>
      <p>
        Several states have moved to mandate faster F&amp;F settlement timelines under their Shops and
        Establishments Act amendments — commonly somewhere between 7 and 45 days from your last working day,
        depending on the state. This varies enough by jurisdiction that it's worth checking your specific
        state's rule rather than assuming a single national timeline; your HR policy document should state
        the company's committed timeline regardless of the statutory minimum.
      </p>

      <h2 id="what-people-miss">What to check before you sign the no-dues certificate</h2>
      <p>
        Companies typically ask you to sign a no-dues / full-and-final acceptance form before releasing the
        settlement amount or your relieving letter. Once signed, disputing line items becomes much harder.
        Before signing:
      </p>
      <ul>
        <li>
          Cross-check the <strong>leave balance</strong> used in the calculation against your own tracking
          (HRMS portals sometimes show stale balances) — this is the most common place F&amp;F settlements
          are quietly wrong.
        </li>
        <li>
          Verify the <strong>gratuity eligibility date</strong> if you're close to the 5-year mark — some
          companies calculate this incorrectly against your actual date of joining, especially if you had a
          probation period or a break in service.
        </li>
        <li>
          Confirm the <strong>notice buyout math</strong> matches your contract's stated formula (usually
          Basic, sometimes Basic + DA) — not a number HR quotes verbally.
        </li>
        <li>
          Check whether <strong>TDS</strong> on the settlement (especially a large leave encashment or
          bonus payout) looks reasonable — a partial-year Form 16 should follow separately for tax filing.
        </li>
        <li>
          List every <strong>pending reimbursement claim</strong> yourself before HR calculates the
          settlement — these are the line items most often simply forgotten rather than deliberately
          withheld.
        </li>
      </ul>

      <p>
        For the complete picture — all of these components modeled together against your actual salary
        structure — use the <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>.
      </p>
    </ArticleProse>
  );
}
