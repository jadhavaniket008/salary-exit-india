import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";
import { getAllLpaSlugs, getLpaLandingPageConfig } from "@/lib/content/lpa-pages.config";

type Props = {
  params: Promise<{ slug: string }>;
};

export const alt = "In-hand salary estimate — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllLpaSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const config = getLpaLandingPageConfig(slug);

  if (!config) {
    return buildOgImageResponse({
      category: "In-hand salary calculator",
      title: "In-Hand Salary Estimate",
      subtitle: "Editable CTC-to-in-hand breakdown for India",
    });
  }

  return buildOgImageResponse({
    category: "In-hand salary calculator",
    title: `₹${config.lpa} LPA — In-Hand Salary Estimate`,
    subtitle: "See the full breakdown with editable assumptions",
  });
}
