import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Methodology — how SalaryExit India estimates salary & tax";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Methodology",
    title: "How We Estimate Salary & Tax",
    subtitle: "Transparent assumptions behind every calculator",
  });
}
