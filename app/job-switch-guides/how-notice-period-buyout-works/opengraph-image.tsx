import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "How notice period buyout works — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Job switch & exit guides",
    title: "How Notice Period Buyout Works",
    subtitle: "What employers usually compute, and why",
  });
}
