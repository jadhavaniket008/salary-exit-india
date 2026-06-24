import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { ROUTES } from "@/lib/routes";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { SITE_CONTENT_LAST_UPDATED } from "@/lib/config/site-freshness";

type Props = {
  title: string;
  intro?: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export function LegalPageLayout({ title, intro, breadcrumbs, children }: Props) {
  return (
    <Section className="pt-8 sm:pt-12">
      <Container className="max-w-3xl space-y-8">
        <BreadcrumbNav items={breadcrumbs} />
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {intro ? (
            <p className="text-base text-foreground-secondary">{intro}</p>
          ) : null}
        </header>
        <div className="space-y-5 text-[15px] leading-relaxed text-foreground-secondary [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:marker:text-foreground-muted [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:underline">
          {children}
        </div>
        <p className="text-xs text-foreground-muted">
          Page content last reviewed: {SITE_CONTENT_LAST_UPDATED}. For calculation scope and FY assumptions, see{" "}
          <Link href={ROUTES.methodology} className="underline">
            methodology
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}

export function legalBreadcrumbs(currentLabel: string, currentHref: string): BreadcrumbItem[] {
  return [
    { label: "Home", href: ROUTES.home },
    { label: currentLabel, href: currentHref },
  ];
}
