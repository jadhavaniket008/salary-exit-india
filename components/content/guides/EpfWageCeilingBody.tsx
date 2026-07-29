import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function EpfWageCeilingBody() {
  return (
    <ArticleProse>
      <p>
        Two employees on the exact same gross salary can have PF deductions that differ by ₹5,000/month or
        more — not because either one is wrong, but because their employers made a different policy choice
        about one number: the <strong>PF wage</strong>. Here is what that choice actually means for your
        in-hand pay.
      </p>

      <h2 id="what-is-pf-wage">PF wage is not your gross salary</h2>
      <p>
        Employee Provident Fund contributions are calculated as 12% of your <strong>PF wage</strong>, and PF
        wage is defined as Basic + Dearness Allowance (DA) — not gross salary, and not CTC. Two people with
        the same ₹18 LPA gross can have very different PF wages if one company sets Basic at 40% of gross and
        another sets it at 55%.
      </p>

      <h2 id="the-statutory-ceiling">The statutory wage ceiling — where the real split happens</h2>
      <p>
        The EPFO's statutory wage ceiling is ₹15,000/month. Employers can choose one of two approaches:
      </p>
      <ul>
        <li>
          <strong>Capped at the ceiling:</strong> PF wage is treated as min(Basic+DA, ₹15,000/month),
          regardless of how much higher your actual Basic+DA is. Employee PF contribution is capped at 12% ×
          ₹15,000 = <strong>₹1,800/month</strong>, no matter how high your salary goes.
        </li>
        <li>
          <strong>Full Basic+DA (uncapped):</strong> PF wage is your actual monthly Basic+DA with no ceiling
          applied. On a Basic+DA of ₹60,000/month, employee PF is 12% × ₹60,000 ={" "}
          <strong>₹7,200/month</strong> — four times higher than the capped scenario, even at identical
          gross salary.
        </li>
      </ul>
      <p>
        Neither approach is illegal or unusual — both are common in practice, and the choice is the
        employer's, not yours to elect individually in most cases. The gap this creates is real: at the same
        gross salary, a capped-PF employer can leave you with roughly ₹5,400/month more in-hand than an
        uncapped one, purely from this one policy difference.
      </p>

      <h2 id="why-it-isnt-free-money">Why the capped option isn't simply "better"</h2>
      <p>
        Higher monthly in-hand from a capped PF wage comes at a cost: a smaller EPF corpus at retirement, and
        — since gratuity is also calculated from Basic+DA — a smaller gratuity accrual if your Basic is kept
        artificially low relative to gross. An uncapped, higher-Basic structure trades monthly liquidity for
        larger locked-in, tax-advantaged long-term savings. Which is "better" depends on how much you value
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
        When comparing two job offers at similar CTC, this is one of the details that "same CTC, different
        take-home" complaints usually trace back to — see{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          comparing job offers beyond CTC
        </Link>{" "}
        for the fuller picture.
      </p>
    </ArticleProse>
  );
}
