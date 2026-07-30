import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "SalaryExit India — real in-hand salary calculator";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    title: "Know Your Real In-Hand Salary",
    subtitle: "Free India salary, tax & exit calculators · FY 2026–27",
  });
}
