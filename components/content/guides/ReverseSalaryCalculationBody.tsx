import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function ReverseSalaryCalculationBody() {
  return (
    <ArticleProse>
      <p>
        Most salary questions run in one direction: "I have this CTC, what's my in-hand?" But when you're
        negotiating an offer, planning a move, or setting a savings goal, the more useful question runs
        backwards: "I need this much in my account every month — what CTC actually gets me there?"
      </p>

      <h2 id="why-reverse">Why this is harder than it looks</h2>
      <p>
        Going from CTC to in-hand is arithmetic: apply tax slabs, subtract PF and professional tax, and you
        have your answer. Going backwards — from a target in-hand to a required CTC — isn't a simple
        division, because income tax in India is progressive (the rate itself changes as income rises) and
        PF, gratuity, and insurance don't scale as a fixed percentage in every offer structure. There is no
        single formula you can invert; the honest approach is to search for the gross salary that actually
        produces your target in-hand, then work outward from there.
      </p>

      <h2 id="how-the-tool-does-it">How our reverse salary calculator does it</h2>
      <p>
        The <Link href={ROUTES.reverseSalaryCalculator}>reverse salary calculator</Link> runs a numeric
        search: it repeatedly tests candidate gross salaries against the same tax and PF engine used
        throughout this site, narrowing in until it finds the gross that produces your target monthly
        in-hand to within a few rupees. That gross is then converted into a required CTC by adding back
        estimated employer-side costs — employer PF, gratuity accrual, and insurance — using a share-of-CTC
        assumption you can adjust.
      </p>

      <h2 id="why-a-range-not-a-number">Why the answer is a range, not one number</h2>
      <p>
        Two employers can quote very different CTCs for the same actual in-hand cash, purely because they
        bundle different amounts of employer PF, gratuity, and insurance into the CTC figure. A company that
        keeps employer-side costs lean (around 8% of CTC) will quote a lower CTC for the same take-home than
        one that bundles more (up to 18% or more). Rather than pretend we know your specific future
        employer's structure, the tool shows a realistic range across that spread — a single precise number
        would imply more certainty than the underlying assumptions support.
      </p>

      <h2 id="using-it-well">Using this for negotiation, not just curiosity</h2>
      <p>
        If you know the cash you need — rent, EMIs, a savings target — anchor your negotiation on that
        number rather than a CTC headline. Once you have an actual offer, compare its stated CTC against the
        range this tool gives you: if the offer's CTC sits meaningfully above the high end of the range for
        your target in-hand, that's a signal the employer-side cost structure (or the fixed-vs-variable
        split) may be working against you. Check the specific breakdown with the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand calculator</Link>, or weigh it against another
        offer using the <Link href={ROUTES.offerComparisonCalculator}>offer comparison tool</Link>.
      </p>

      <h2 id="what-it-doesnt-model">What it doesn't model</h2>
      <p>
        This tool solves for fixed monthly in-hand only. It does not account for variable pay, joining
        bonuses, ESOPs, or clawback clauses — if part of your target income depends on a bonus or variable
        payout, treat the required-CTC figure here as an underestimate of what you'd need to negotiate for on
        paper.
      </p>
    </ArticleProse>
  );
}
