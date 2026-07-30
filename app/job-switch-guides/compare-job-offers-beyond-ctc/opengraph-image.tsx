import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "How to compare job offers beyond CTC — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Job switch & exit guides",
    title: "Comparing Job Offers Beyond CTC",
    subtitle: "A checklist beyond the biggest headline number",
  });
}
