import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Privacy policy",
    description:
      "How SalaryExit India handles data, cookies, analytics, and advertising — written to support future Google AdSense and analytics in a policy-friendly way.",
    keywords: ["privacy policy", "cookies", "AdSense", "analytics"],
  },
  { canonicalPath: ROUTES.privacyPolicy }
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy policy"
      intro="This policy describes how information may be collected and used when you visit SalaryExit India. It is written for a small content + calculator site and is intended to be updated as features are added."
      breadcrumbs={legalBreadcrumbs("Privacy policy", ROUTES.privacyPolicy)}
    >
      <h2>Who operates this site</h2>
      <p>
        SalaryExit India is operated as an independent publishing project. The operator is responsible for
        hosting configuration and any third-party services enabled in production (see your deployment
        documentation).
      </p>

      <h2>Information you provide voluntarily</h2>
      <p>
        Calculator and tool inputs are processed in your browser session to show results. This project is
        designed to avoid a custom login and avoid collecting salary data on a server for personalization,
        unless you later add backend features. If you contact us by email, we may retain messages only as
        needed to respond and improve the service.
      </p>

      <h2>Technical data (logs and hosting)</h2>
      <p>
        Hosting providers (for example Vercel) may collect standard server and request metadata such as IP
        address, user agent, timestamps, and error logs for security and reliability. Refer to your host’s
        privacy documentation for details.
      </p>

      <h2>Cookies, local storage, and consent</h2>
      <p>
        The site may store small amounts of data in your browser using cookies (first-party or third-party) and{" "}
        <strong>local storage</strong> (for example to remember a consent choice). Essential cookies may be
        needed for security or basic site operation; <strong>analytics and advertising</strong> integrations
        are typically treated as non-essential in many jurisdictions and may require consent before they run.
      </p>
      <p>
        When <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">NEXT_PUBLIC_ENABLE_CONSENT_BANNER=true</code>, SalaryExit
        shows an on-site banner that lets you accept or reject non-essential processing. Your choice is stored
        in <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">localStorage</code> under a
        project-specific key and is used to gate optional script loading (for example Google Analytics, Plausible,
        or AdSense) in <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">ThirdPartyRootScripts</code>.
        Rejecting non-essential limits those scripts; it does not guarantee zero network requests from embedded
        content you choose to load elsewhere.
      </p>
      <p>
        If the banner is disabled in configuration, the implementation may behave like “allow all” for gating so
        development is straightforward — production deployments in regulated regions should enable the banner or
        a full CMP before turning on measurement and ads.
      </p>

      <h2>Google Analytics (optional)</h2>
      <p>
        If the site operator configures Google Analytics via environment variables, Google may process
        aggregated usage statistics, device/browser data, and approximate location. Review Google’s documentation
        for Analytics data collection, retention, and opt-out tools. In this codebase, the measurement script is
        intended to load only after consent when the consent banner is enabled.
      </p>

      <h2>Plausible Analytics (optional)</h2>
      <p>
        If <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">NEXT_PUBLIC_PLAUSIBLE_DOMAIN</code> is set, a lightweight
        script may record page views. Plausible is often configured for privacy-friendly, aggregate statistics;
        confirm the operator’s Plausible project settings and data flow for your deployment.
      </p>

      <h2>Google AdSense / advertising (optional)</h2>
      <p>
        If the site operator enables Google AdSense or similar networks, advertisements may be shown and
        vendors may process data to measure delivery, cap frequency, and prevent fraud. Personalized ads may
        use additional signals; that processing may require consent under applicable law and Google’s policies.
        Ad slots are placed in the layout so primary calculator content remains readable; adjust slot CSS and
        auto-ad settings if ads ever crowd the UI.
      </p>
      <p>
        SalaryExit does not embed hard-coded publisher IDs. Integrations should be enabled only through
        environment configuration after approval by the ad network.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        This site is intended for working adults researching salary and tax topics. It is not directed at
        children.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Use browser controls to block or delete cookies.</li>
        <li>Use privacy-focused browsers or extensions if you want additional protections.</li>
        <li>Disable optional analytics/ads in deployment configuration if you self-host experiments.</li>
      </ul>

      <h2>Changes</h2>
      <p>
        This policy may be updated when features change (for example adding accounts, newsletters, or new
        analytics). Material changes should be reflected in the “Last updated” notice on legal pages.
      </p>

      <p>
        For the site disclaimer regarding calculations, see{" "}
        <Link href={ROUTES.disclaimer} className="font-medium">
          Disclaimer
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
