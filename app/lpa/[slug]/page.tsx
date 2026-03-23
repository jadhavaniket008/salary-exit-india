import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LpaLandingTemplate } from "@/components/content/LpaLandingTemplate";
import { getAllLpaSlugs, getLpaLandingPageConfig } from "@/lib/content/lpa-pages.config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { lpaLandingPath } from "@/lib/routes/landing-routes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLpaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getLpaLandingPageConfig(slug);
  if (!config) return {};
  return buildPageMetadata(config.seo, { canonicalPath: lpaLandingPath(config.slug) });
}

export default async function LpaLandingPage({ params }: Props) {
  const { slug } = await params;
  const config = getLpaLandingPageConfig(slug);
  if (!config) notFound();
  return <LpaLandingTemplate config={config} />;
}
