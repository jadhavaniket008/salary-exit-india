import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "EPF wage ceiling: capped vs full Basic — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Salary guides",
    title: "EPF Wage Ceiling: Capped vs Full Basic",
    subtitle: "Why PF deductions vary at the same gross salary",
  });
}
