import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Embed salary calculators on your platform — SalaryExit for Businesses";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "For businesses",
    title: "Embed Salary Calculators on Your Platform",
    subtitle: "Iframe, white-label, and API options",
  });
}
