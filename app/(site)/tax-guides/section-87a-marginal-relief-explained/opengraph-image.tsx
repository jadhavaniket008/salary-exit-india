import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt =
  "Section 156 rebate marginal relief (earlier Section 87A) explained — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Tax guides",
    title: "Section 156 Rebate Marginal Relief",
    subtitle: "Earlier Section 87A · the ₹12 lakh cliff, worked out",
  });
}
