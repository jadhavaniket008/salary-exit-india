import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "SalaryExit India In-Hand Salary Model 2026 — CTC to in-hand, modeled";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return buildOgImageResponse({
    category: "Data report",
    title: "India In-Hand Salary Model 2026",
    subtitle: "₹5L–₹50L CTC, modeled to real monthly in-hand — free CSV, citable methodology",
  });
}
