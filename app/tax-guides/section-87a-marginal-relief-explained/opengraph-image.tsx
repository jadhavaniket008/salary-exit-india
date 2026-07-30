import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Section 87A marginal relief explained — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Tax guides",
    title: "Section 87A Marginal Relief Explained",
    subtitle: "The ₹12 lakh cliff, worked out",
  });
}
