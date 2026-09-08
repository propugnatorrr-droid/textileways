import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/configuration/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f6",
    theme_color: "#087a55",
    lang: "en",
    categories: ["business", "manufacturing"],
    icons: [
      {
        src: "/icon",
        sizes: "410x410",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
