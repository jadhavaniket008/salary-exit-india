import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";
import {
  getAllSalaryEnoughSlugs,
  getSalaryEnoughPageConfig,
} from "@/lib/content/salary-enough-pages.config";

type Props = {
  params: Promise<{ slug: string }>;
};

export const alt = "Is this salary enough? — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSalaryEnoughSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const config = getSalaryEnoughPageConfig(slug);

  if (!config) {
    return buildOgImageResponse({
      category: "Is this salary enough?",
      title: "Is Your Salary Enough?",
      subtitle: "City rent vs in-hand — a real answer, not a rule of thumb",
    });
  }

  return buildOgImageResponse({
    category: "Is this salary enough?",
    title: `Is ₹${config.lpa} LPA Enough in ${config.city.name}?`,
    subtitle: "City rent vs in-hand — a real answer, not a rule of thumb",
  });
}
