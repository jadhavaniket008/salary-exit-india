import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function Section87AMarginalReliefBody() {
  return (
    <ArticleProse>
      <p>
        A common fear: "If I earn ₹1 more than ₹12 lakh, do I suddenly owe tens of thousands more in tax?"
        The honest answer is no — the law includes a specific mechanism, <strong>marginal relief</strong>,
        precisely to stop that cliff from happening. Here is exactly how it works, with the numbers our
        engine actually computes, not a simplified approximation.
      </p>

      <h2 id="the-cliff-fear">Why people worry about a cliff at ₹12 lakh</h2>
      <p>
        Under the new tax regime (FY 2025-26 and FY 2026-27), Section 87A gives a full rebate on tax when
        <strong> taxable income</strong> (gross salary minus the ₹75,000 standard deduction) is at or below
        ₹12,00,000 — meaning zero tax. Without any special rule, someone earning taxable income of exactly
        ₹12,00,000 pays ₹0, while someone at ₹12,00,001 would owe tax on the entire amount under the normal
        slab structure — over ₹60,000 for one extra rupee of income. That would be a genuine cliff.
      </p>

      <h2 id="how-relief-works">What marginal relief actually does</h2>
      <p>
        Marginal relief caps the tax you owe (before cess) at the amount by which your taxable income
        <em> exceeds</em> ₹12,00,000 — not the full slab-calculated tax. In other words:
      </p>
      <ul>
        <li>Taxable income ≤ ₹12,00,000: tax is fully rebated. You pay ₹0.</li>
        <li>
          Taxable income just above ₹12,00,000: tax payable = min(normal slab tax, income − ₹12,00,000).
          One extra rupee of income never costs you more than one extra rupee of tax.
        </li>
        <li>
          As income rises further above ₹12,00,000, the "excess over 12L" grows faster than relief can
          absorb, and relief phases out — you eventually pay ordinary slab tax with no rebate at all.
        </li>
      </ul>

      <h2 id="worked-example">A worked example</h2>
      <p>
        Take taxable income of <strong>₹12,50,000</strong> — ₹50,000 above the ₹12,00,000 threshold. Under
        the FY 2026-27 new-regime slabs, normal slab tax on this amount works out to roughly ₹67,500 before
        cess. Without marginal relief, that's what you'd owe. With marginal relief, tax payable is capped at
        the ₹50,000 excess over ₹12,00,000 — so you pay approximately <strong>₹50,000</strong>, not ₹67,500.
        Cess (4%) applies on top of whichever figure actually gets charged.
      </p>
      <p>
        Push taxable income high enough above ₹12,00,000 and the "excess" figure eventually exceeds the
        normal slab tax — at that point relief no longer reduces anything, and you pay ordinary slab tax with
        no rebate. The relief band is narrow: it matters for incomes close to the threshold, not for high
        earners well above it.
      </p>

      <h2 id="gross-vs-taxable">Remember: this is taxable income, not gross salary</h2>
      <p>
        The ₹12,00,000 threshold applies to <strong>taxable income</strong>, which is gross salary minus the
        ₹75,000 standard deduction (new regime). That means the relevant gross-salary threshold is closer to
        ₹12,75,000, not ₹12,00,000 — a distinction that trips people up when comparing offer letters against
        this rule. Run your actual gross through the{" "}
        <Link href={ROUTES.salaryCalculator}>salary &amp; tax breakdown calculator</Link> to see your exact
        taxable income and whether marginal relief applies to you at all.
      </p>

      <h2 id="old-regime">Does this apply under the old regime?</h2>
      <p>
        The old regime has its own, separate Section 87A rebate — full tax rebate up to ₹5,00,000 taxable
        income, capped at ₹12,500. It does not use the same marginal-relief mechanism described above; the
        old-regime rebate is a flat threshold check, not a sliding cap. Compare both regimes explicitly with
        the <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime calculator</Link> rather than
        assuming one rule applies to both.
      </p>

      <p>
        For the full picture — regime choice, PF, and professional tax together — use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand calculator</Link>, which applies this exact
        marginal-relief logic when computing your estimated tax.
      </p>
    </ArticleProse>
  );
}
