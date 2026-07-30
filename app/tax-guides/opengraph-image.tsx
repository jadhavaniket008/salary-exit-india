import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Income tax guides for salaried employees — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Guides",
    title: "Income Tax Guides for Salaried Employees",
    subtitle: "Old vs new regime, Form 16, and Section 87A",
  });
}
