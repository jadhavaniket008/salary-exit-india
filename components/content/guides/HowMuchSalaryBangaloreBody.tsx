import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowMuchSalaryBangaloreBody() {
  return (
    <ArticleProse>
      <p>
        &quot;You need at least ₹X LPA to live comfortably in Bangalore&quot; — this framing is everywhere
        and almost entirely useless. The number depends on where exactly in Bangalore you plan to live,
        whether you are renting solo or sharing, what your loan obligations are, and what you consider
        &quot;comfortable.&quot; This guide gives you a way to compute the answer for your specific
        situation instead of relying on someone else&apos;s vague benchmark.
      </p>

      <h2 id="ctc-to-inhand-first">Always translate CTC to monthly in-hand first</h2>
      <p>
        Bangalore rent is paid in rupees per month, not in LPA. A ₹20 LPA offer does not deposit
        ₹1,66,667 each month — it typically deposits ₹1,40,000–₹1,55,000 after employee PF and TDS,
        depending on your PF wage, tax regime, and professional tax. Before you decide whether any
        gross is &quot;enough&quot; for Bangalore, convert it to an in-hand figure you can stack against
        monthly costs. Use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with your specific
        offer structure.
      </p>

      <h2 id="rent-corridors">Bangalore&apos;s rent corridors: the same LPA feels different by location</h2>
      <p>
        Bangalore is not one rental market. Approximate 2025 rent ranges for 1BHK (fully furnished,
        solo occupant):
      </p>
      <ul>
        <li>
          <strong>Whitefield, Electronic City (outer east/south tech corridors):</strong> ₹14,000–₹22,000.
          Lower rent but long commutes if your office is in central Bangalore or north.
        </li>
        <li>
          <strong>Marathahalli, Sarjapur, HSR Layout:</strong> ₹18,000–₹28,000. Mid-range; popular
          with IT employees. Better commute balance for east/south offices.
        </li>
        <li>
          <strong>Indiranagar, Koramangala, Banaswadi:</strong> ₹22,000–₹38,000. Premium locations
          close to restaurants, social infrastructure. Higher rent for lifestyle access.
        </li>
        <li>
          <strong>Yelahanka, Hennur, Thanisandra (north):</strong> ₹12,000–₹20,000. Significantly
          cheaper but far from most IT clusters.
        </li>
      </ul>
      <p>
        The corridor you choose — driven by your office location and lifestyle preference — determines
        your rent more than your salary does. Model with your actual rent, not a city average.
      </p>

      <h2 id="at-10-lpa">What ₹10 LPA looks like in Bangalore</h2>
      <p>
        Monthly in-hand on ₹10 LPA gross (new regime, FY 2025-26): roughly ₹78,000–₹85,000. At outer
        corridor rent of ₹16,000, you have ~₹62,000–₹69,000 left for food, transport, utilities, and
        savings. If you are a first-jobber saving ₹15,000–₹20,000/month, this math works — but leaves
        little slack. A solo flat in Koramangala at ₹28,000 rent changes the picture entirely: only
        ₹50,000–₹57,000 for everything else. Sharing a flat or staying in a PG significantly
        improves savings at this band.
      </p>
      <p>
        Explore: <Link href={enough("is-10-lpa-good-in-bangalore")}>Is ₹10 LPA good in Bangalore?</Link>
      </p>

      <h2 id="at-15-lpa">What ₹15 LPA looks like in Bangalore</h2>
      <p>
        Monthly in-hand on ₹15 LPA gross: roughly ₹1,12,000–₹1,20,000. At ₹20,000 rent, approximately
        ₹92,000–₹100,000 left. A moderate lifestyle (groceries ~₹8,000, transport ~₹5,000, utilities
        ~₹3,000, discretionary ~₹15,000) totals about ₹31,000 — leaving ₹60,000–₹70,000 for savings,
        EMIs, or upgrades. This is the range where solo living in mid-tier Bangalore corridors becomes
        financially feasible without stress.
      </p>
      <p>
        Explore: <Link href={enough("is-15-lpa-good-in-bangalore")}>Is ₹15 LPA good in Bangalore?</Link>
      </p>

      <h2 id="at-20-lpa">What ₹20 LPA looks like in Bangalore</h2>
      <p>
        Monthly in-hand on ₹20 LPA: roughly ₹1,45,000–₹1,55,000. At ₹25,000 rent for a quality 1BHK,
        roughly ₹1,20,000–₹1,30,000 left. With moderate lifestyle spend, savings potential is
        ₹70,000–₹90,000/month depending on how much discretionary spend you allow. This is
        &quot;comfortable solo&quot; territory in most Bangalore corridors — though families or those
        with significant loan EMIs will find it tighter.
      </p>
      <p>
        Explore:{" "}
        <Link href={enough("is-20-lpa-enough-in-bangalore")}>Is ₹20 LPA enough in Bangalore?</Link>
      </p>

      <h2 id="commute-factor">The commute factor: Bangalore&apos;s hidden cost</h2>
      <p>
        Traffic in Bangalore is a real financial variable. A longer commute means either higher transport
        costs (cab aggregators for long distances) or more time lost. Many employees end up paying
        ₹5,000–₹12,000/month in commute costs if they choose distant lower-rent corridors. A simple test:
        if a cheaper flat saves ₹8,000/month on rent but costs ₹6,000/month more in cabs, the real
        saving is only ₹2,000. Run the full numbers, not just the rent line.
      </p>

      <h2 id="comparing-cities">Comparing Bangalore to other cities</h2>
      <p>
        Bangalore&apos;s rent is typically lower than Mumbai at equivalent quality, roughly comparable
        to premium Pune, and higher than Hyderabad or Chennai in similar-quality corridors. If you have
        offers in multiple cities, compare in-hand minus realistic rent for each — not headline CTC.
        A ₹20 LPA offer in Hyderabad with ₹14,000 rent may leave more monthly savings than a ₹22 LPA
        offer in Bangalore with ₹24,000 rent.
      </p>
      <p>
        The{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          compare job offers beyond CTC
        </Link>{" "}
        guide walks through a city-adjusted offer comparison. For the Salary Reality Check with your
        actual Bangalore rent:{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link>. See{" "}
        <Link href={enough("is-25-lpa-good-in-bangalore")}>Is ₹25 LPA good in Bangalore?</Link> for
        a higher-band worked example with a more premium rent assumption.
      </p>
    </ArticleProse>
  );
}
