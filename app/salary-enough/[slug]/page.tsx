import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SalaryEnoughLandingTemplate } from "@/components/content/SalaryEnoughLandingTemplate";
import {
  getAllSalaryEnoughSlugs,
  getSalaryEnoughPageConfig,
} from "@/lib/content/salary-enough-pages.config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSalaryEnoughSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getSalaryEnoughPageConfig(slug);
  if (!config) return {};
  return buildPageMetadata(config.seo, { canonicalPath: salaryEnoughPath(config.slug) });
}

export default async function SalaryEnoughLandingPage({ params }: Props) {
  const { slug } = await params;
  const config = getSalaryEnoughPageConfig(slug);
  if (!config) notFound();
  return <SalaryEnoughLandingTemplate config={config} />;
}
