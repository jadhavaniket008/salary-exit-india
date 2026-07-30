import {
  buildOgImageResponse,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/seo/og-image";

export const alt = "Leave encashment calculator — SalaryExit India";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return buildOgImageResponse({
    category: "Calculator",
    title: "Leave Encashment Calculator",
    subtitle: "Estimate payout from unused earned leave",
  });
}
