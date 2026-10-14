import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function EpfWageCeilingBody() {
  return (
    <ArticleProse>
      <p>
        Two employees on the exact same gross salary can have PF deductions that differ by ₹5,000/month or
        more — not because either one is wrong, but because their PF wage treatment and Basic+DA structure
        differ. Here is what that actually means for your in-hand pay.
      </p>

      <h2 id="what-is-pf-wage">PF wage is not your gross salary</h2>
      <p>
        Employee Provident Fund contributions are calculated as 12% of your <strong>PF wage</strong>.
        SalaryExit models PF wages using the Basic + Dearness Allowance (DA) input — not gross salary, and
        not CTC. Actual statutory wages and payroll treatment can depend on applicable EPFO rules and
        payroll circumstances. Two people with the same ₹18 LPA gross can still have very different PF
        deductions if one company&apos;s Basic is 40% of gross and another&apos;s is 55%.
      </p>

      <h2 id="the-statutory-ceiling">The statutory wage ceiling — where the real split happens</h2>
      <p>
        The EPFO statutory wage ceiling is ₹25,000/month from 17 September 2026. Treatment above that
        ceiling depends on the member&apos;s existing contribution arrangement and applicable EPFO
        provisions / scheme rules — it is not an arbitrary employer choice. In practice, payslips often
        fall into one of two common patterns SalaryExit can model:
      </p>
      <ul>
        <li>
          <strong>Capped at the ceiling:</strong> PF wage is treated as min(Basic+DA, ₹25,000/month),
          regardless of how much higher your actual Basic+DA is. Employee PF contribution is capped at 12% ×
          ₹25,000 = <strong>₹3,000/month</strong>, no matter how high your salary goes.
        </li>
        <li>
          <strong>Full Basic+DA (uncapped):</strong> PF wage is your actual monthly Basic+DA with no ceiling
          applied. On a Basic+DA of ₹60,000/month, employee PF is 12% × ₹60,000 ={" "}
          <strong>₹7,200/month</strong> — 2.4 times the capped contribution, even at identical
          gross salary.
        </li>
      </ul>
      <p>
        Neither pattern is unusual. Which one applies to you depends on your membership / contribution
        arrangement and how payroll implements EPFO rules — not a personal election you make each month.
        The gap this creates is real: at the same gross salary, a capped-PF arrangement can leave you with
        roughly ₹4,200/month more in-hand than an uncapped one, purely from this one difference.
      </p>

      <h2 id="why-it-isnt-free-money">Why the capped option isn&apos;t simply &quot;better&quot;</h2>
      <p>
        Higher monthly in-hand from a capped PF wage comes at a cost: a smaller EPF corpus at retirement, and
        — since gratuity is also calculated from Basic+DA — a smaller gratuity accrual if your Basic is kept
        artificially low relative to gross. An uncapped, higher-Basic structure trades monthly liquidity for
        larger locked-in, tax-advantaged long-term savings. Which is &quot;better&quot; depends on how much you value
        cash now versus a larger retirement corpus later — not a simple ranking.
      </p>

      <h2 id="how-to-check-yours">How to find out which one applies to you</h2>
      <p>
        Check your payslip for the PF deduction line directly, or ask HR or payroll for your PF wage
        definition and current Basic+DA split. If you only know your CTC and want to model both scenarios,
        use the <Link href={ROUTES.epfCalculator}>EPF contribution estimator</Link> with your actual Basic+DA
        figure, or toggle it in the <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand calculator</Link>
        {" "}to see the in-hand difference directly.
      </p>
      <p>
        When comparing two job offers at similar CTC, this is one of the details that &quot;same CTC, different
        take-home&quot; complaints usually trace back to — see{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          comparing job offers beyond CTC
        </Link>{" "}
        for the fuller picture.
      </p>
    </ArticleProse>
  );
}
