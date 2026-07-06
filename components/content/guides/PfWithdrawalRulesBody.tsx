import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function PfWithdrawalRulesBody() {
  return (
    <ArticleProse>
      <p>
        Your EPF corpus doesn&apos;t behave like a savings account you can dip into whenever you like —
        withdrawal is governed by specific eligibility rules, and getting them wrong costs you either tax
        (TDS on an early withdrawal) or retirement corpus (withdrawing instead of transferring between
        jobs). This guide covers what you can withdraw, when, and what stays taxable.
      </p>

      <h2 id="transfer-vs-withdraw">When you switch jobs: transfer, don&apos;t withdraw</h2>
      <p>
        The single most common mistake is withdrawing PF at every job change instead of transferring it to
        the new employer&apos;s account via the UAN (Universal Account Number) portal. Transferring keeps
        your continuous service clock running — which matters for two separate things: the 5-year rule
        that makes withdrawal tax-free, and your eligible service for the pension component (EPS). Withdraw
        and restart at a new employer, and both clocks reset.
      </p>

      <h2 id="full-withdrawal">Full withdrawal after leaving employment</h2>
      <p>
        If you are not transferring — because you are exiting the workforce, moving abroad, or simply done
        with formal employment — EPFO allows:
      </p>
      <ul>
        <li><strong>75% of the corpus</strong> after one month of continuous unemployment.</li>
        <li>
          <strong>The remaining 25%</strong> after two months of unemployment (or you can withdraw the full
          balance in one go once the two-month mark is reached).
        </li>
        <li><strong>Full withdrawal</strong> is unconditional at retirement (58 years).</li>
      </ul>

      <h2 id="partial-withdrawal">Partial withdrawals (advances) while still employed</h2>
      <p>
        EPFO permits advances against your own corpus for specific life events, each with its own
        eligibility window and cap — you do not need to leave your job to access these:
      </p>
      <ul>
        <li>
          <strong>Medical treatment</strong> (self, spouse, children, or dependent parents) — no minimum
          service requirement. This is the only advance with no waiting period.
        </li>
        <li>
          <strong>House purchase or construction</strong> — after 5 years of contribution, up to 90% of the
          corpus (typically a one-time facility).
        </li>
        <li>
          <strong>Marriage</strong> (self, children, or siblings) or <strong>education</strong> (self or
          children) — after 7 years of service, capped around 50% of your own contribution plus interest.
        </li>
        <li>
          <strong>Home loan repayment</strong> and a few other purposes (natural calamity, lockout) have
          their own separate eligibility conditions.
        </li>
      </ul>
      <p>
        Each purpose has a distinct claim form and documentation requirement — check the current EPFO
        member portal for the exact caps applicable to your case, since these are revised periodically.
      </p>

      <h2 id="eps-separate">The pension component (EPS) is a separate pot</h2>
      <p>
        Part of your employer&apos;s contribution doesn&apos;t go into your withdrawable EPF balance at
        all — it routes into the Employees&apos; Pension Scheme (EPS), which behaves completely
        differently:
      </p>
      <ul>
        <li>
          <strong>Under 10 years of eligible service</strong> — you can withdraw the EPS corpus as a lump
          sum (Form 10C) when you exit.
        </li>
        <li>
          <strong>10 years or more of eligible service</strong> — the EPS corpus is no longer withdrawable
          as a lump sum. You become entitled to a monthly pension starting at age 58 (Form 10D), or a
          reduced early pension from age 50 if you choose to claim it sooner.
        </li>
      </ul>
      <p>
        This is why job-hoppers who withdraw PF instead of transferring can accidentally forfeit pension
        eligibility they were close to earning — the EPS service clock only survives a transfer, not a
        withdrawal and rejoin.
      </p>

      <h2 id="tax-treatment">Is your withdrawal actually tax-free?</h2>
      <p>
        The headline rule: EPF withdrawal is <strong>tax-free if you have completed 5 years of continuous
        service</strong> — continuity that survives a PF transfer across employers, so job changes alone
        don&apos;t reset it as long as you transfer rather than withdraw at each switch.
      </p>
      <p>If you withdraw before completing 5 years of continuous service:</p>
      <ul>
        <li>
          <strong>TDS applies at 10%</strong> (with PAN on file) if the withdrawal amount is{" "}
          <strong>₹50,000 or more</strong>. Without PAN, TDS is deducted at the maximum marginal rate.
        </li>
        <li>
          <strong>No TDS</strong> if the amount is below ₹50,000, if you submit Form 15G/15H (declaring no
          taxable income, where eligible), or if the exit was for reasons beyond your control — such as
          ill health, discontinuation of the employer&apos;s business, or other causes specified by EPFO —
          rather than a voluntary resignation.
        </li>
        <li>
          Even where TDS is deducted at withdrawal, the amount is added to your taxable income for that
          year and taxed at your slab rate; TDS is only an advance collection, not the final liability.
        </li>
      </ul>

      <h2 id="how-to-withdraw">How to actually file a claim</h2>
      <p>
        Withdrawals and transfers are filed online through the UAN member portal, provided your UAN is
        KYC-seeded — Aadhaar, PAN, and bank account linked and verified. With KYC in place, EPFO&apos;s
        composite claim forms let you file for final settlement, pension withdrawal, or an advance in a
        single online submission, without needing employer countersignature for most Aadhaar-verified
        claims. If your UAN isn&apos;t KYC-seeded, expect the claim to be rejected or routed through a
        slower offline process with employer attestation.
      </p>

      <h2 id="mistakes">Mistakes that cost people the most</h2>
      <ul>
        <li>
          Withdrawing (instead of transferring) at every job change, resetting both the 5-year tax-free
          clock and EPS pensionable service.
        </li>
        <li>Letting UAN KYC seeding lapse or stay incomplete, which delays or blocks claims entirely.</li>
        <li>
          Taking frequent partial advances against house/education/marriage purposes, which quietly erodes
          the compounding base of your retirement corpus — advances don&apos;t earn interest once withdrawn.
        </li>
      </ul>
      <p>
        To see how your monthly PF contribution builds up before you get anywhere near withdrawal, use the{" "}
        <Link href={ROUTES.epfCalculator}>EPF contribution calculator</Link>. If you&apos;re modeling a
        job exit and want the full cash picture — PF, gratuity, leave encashment, notice pay — run it
        through the <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>.
      </p>
    </ArticleProse>
  );
}
