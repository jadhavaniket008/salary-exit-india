import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Is your salary good? A practical framework — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Salary guides",
    title: "Is Your Salary Good? A Practical Framework",
    subtitle: "In-hand vs costs, city rent, and lifestyle",
  });
}
