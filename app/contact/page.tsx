import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

/** Public placeholder when NEXT_PUBLIC_CONTACT_EMAIL is unset — RFC 2606 example domain, not a real inbox. */
export const CONTACT_EMAIL_PLACEHOLDER = "contact@example.com";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Contact",
    description:
      "How to reach the operator of SalaryExit India. Expectations for response time and what we can help with.",
    keywords: ["contact", "SalaryExit India"],
  },
  { canonicalPath: ROUTES.contact }
);

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const displayEmail = email || CONTACT_EMAIL_PLACEHOLDER;

  return (
    <LegalPageLayout
      title="Contact"
      intro="Use this page for good-faith feedback about bugs, accessibility, or content accuracy. We are a small independent project — not a support desk with SLAs."
      breadcrumbs={legalBreadcrumbs("Contact", ROUTES.contact)}
    >
      <h2>Support email</h2>
      <p>
        Write to:{" "}
        <a href={`mailto:${displayEmail}`} className="font-medium break-all">
          {displayEmail}
        </a>
      </p>
      {!email ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50/90 p-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>Placeholder only.</strong> The address above is a documented default (
          <code className="text-xs">contact@example.com</code>) until you set a real inbox. Site operators
          should set{" "}
          <code className="rounded bg-white/80 px-1 text-xs dark:bg-zinc-900">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
          in the hosting environment (see <code className="text-xs">.env.example</code>) so visitors reach a
          monitored mailbox.
        </p>
      ) : null}

      <h2>What to expect</h2>
      <ul>
        <li>
          <strong>Response time:</strong> not guaranteed. We may not reply to every message; we read
          actionable bug reports and clear corrections.
        </li>
        <li>
          <strong>What we can help with:</strong> broken pages, unclear methodology, or accessibility issues on
          this site.
        </li>
        <li>
          <strong>What we cannot do:</strong> personalized tax planning, legal opinions, payroll disputes with
          your employer, or reviewing your Form 16 line by line.
        </li>
      </ul>

      <h2>What to include in bug reports</h2>
      <ul>
        <li>Page URL and inputs you entered (rounded numbers are fine).</li>
        <li>What you expected vs what you saw.</li>
        <li>Browser and device type (helps with UI issues).</li>
      </ul>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        For filing and compliance, consult a qualified professional in your jurisdiction.{" "}
        <Link href={ROUTES.disclaimer} className="font-medium underline">
          Disclaimer
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
