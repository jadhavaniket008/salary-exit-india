import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Privacy policy",
    description:
      "How SalaryExit India handles calculator inputs, newsletter emails, website analytics, cookies and advertising.",
    keywords: ["privacy policy", "cookies", "analytics"],
  },
  { canonicalPath: ROUTES.privacyPolicy }
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy policy"
      intro="This policy explains the information involved when you use SalaryExit India, read our content, or subscribe to updates."
      breadcrumbs={legalBreadcrumbs("Privacy policy", ROUTES.privacyPolicy)}
      contentUpdatedAt="22 October 2026"
    >
      <h2>Who operates SalaryExit India</h2>
      <p>
        SalaryExit India is an independently operated salary and tax education website maintained by Aniket
        Jadhav. For questions about this policy or the information you have provided, contact{" "}
        <a href="mailto:salaryexitindia@gmail.com">salaryexitindia@gmail.com</a>.
      </p>

      <h2>Calculator inputs</h2>
      <p>
        SalaryExit&apos;s salary and tax calculators process the values you enter to produce estimates.
        Our standard calculators do not require an account, and we do not create a personal salary profile
        from those inputs. Your browser processes the calculator values; ordinary hosting and security
        logs may still be generated when you visit a page.
      </p>

      <h2>Newsletter subscriptions and email</h2>
      <p>
        If you submit an email address to our salary and tax updates form, SalaryExit sends that address
        to Brevo, our email-list service provider, to manage the subscription. We use subscribed addresses
        to send the updates requested. To ask us to unsubscribe your address or delete it from our mailing
        list, email <a href="mailto:salaryexitindia@gmail.com">salaryexitindia@gmail.com</a>.
      </p>
      <p>
        If you contact us directly, we receive the details you choose to include in your message and may
        retain the conversation as needed to respond, investigate a problem, or maintain the service.
        Please avoid sending passwords, payslips, account numbers, or other sensitive documents.
      </p>

      <h2>Hosting and website analytics</h2>
      <p>
        Vercel hosts SalaryExit India and may process request information such as IP address, browser
        details, requested pages, timestamps, and security logs to deliver and protect the site.
      </p>
      <p>
        We use Vercel Web Analytics for basic, cookie-free website measurement, including page visits and
        referring sources. This operates independently of the separate choice for optional analytics in
        our consent banner. Depending on the site configuration and your consent, Google Analytics
        and/or Plausible Analytics may also be used to understand website usage.
      </p>

      <h2>Cookies, browser storage, and consent</h2>
      <p>
        SalaryExit uses browser storage to remember whether you accepted or rejected optional analytics
        and advertising processing. The consent banner offers those choices. Optional analytics scripts
        that use our consent settings load only after consent where enabled; rejecting them does not
        disable essential hosting requests or the separate cookie-free Vercel Web Analytics script.
        You can clear this site&apos;s browser storage to see the consent choice again.
      </p>

      <h2>Advertising services</h2>
      <p>
        SalaryExit may use Google AdSense or another advertising provider if enabled. A provider&apos;s
        verification script may be present even if the site is not approved to display ads. If advertising
        is activated, providers may process information to deliver ads, measure performance, prevent fraud,
        and meet legal requirements. Advertising-related processing depends on the provider, region, and
        the site&apos;s enabled settings and consent controls.
      </p>

      <h2>Children</h2>
      <p>
        SalaryExit is intended for adults researching salaries, jobs, and taxes; it is not directed at children.
      </p>

      <h2>Your choices and questions</h2>
      <ul>
        <li>Use the site without subscribing to the newsletter or creating an account.</li>
        <li>Accept or reject optional analytics and advertising in the consent banner when shown.</li>
        <li>Use your browser controls to clear stored site data or restrict cookies.</li>
        <li>
          Contact <a href="mailto:salaryexitindia@gmail.com">salaryexitindia@gmail.com</a> to request help
          with an email subscription or a privacy question.
        </li>
      </ul>

      <h2>Updates to this policy</h2>
      <p>
        We may update this policy when the website or its services change. The update date shown on this
        page identifies the latest revision to this policy; it is not a claim that every other website
        page was reviewed on the same date.
      </p>

      <p>
        For the limitations of SalaryExit&apos;s calculations, see the{" "}
        <Link href={ROUTES.disclaimer} className="font-medium">
          disclaimer
        </Link>.
      </p>
    </LegalPageLayout>
  );
}
