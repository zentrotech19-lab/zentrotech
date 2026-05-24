import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZentroTECH — Bangalore's Lead Engine Website Agency",
    short_name: "ZentroTECH",
    description:
      "Lead-engine websites + AI automation for Indian SMBs. Bangalore HQ, serving 138 cities across South India.",
    start_url: "/en",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#6366f1",
    orientation: "portrait-primary",
    lang: "en-IN",
    scope: "/",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
