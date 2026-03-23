import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SalaryExit India",
    short_name: "SalaryExit",
    description:
      "Educational India salary, tax regime, PF, HRA, gratuity, and exit calculators — estimates only.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#18181b",
    lang: "en-IN",
    scope: "/",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
