import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

// Defensive: strip any trailing " | ZentroTECH" / " · ZentroTECH" suffix that
// older pSEO templates pre-pended. The root layout's title.template adds the
// brand suffix automatically — without this guard we get "... · ZentroTECH ·
// ZentroTECH" duplication in <title> and SERPs.
const BRAND_SUFFIX = /\s*[·|]\s*ZentroTECH(\s+Answers)?\s*$/i;
function stripBrandSuffix(title: string): string {
  return title.replace(BRAND_SUFFIX, "");
}

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og/default.png",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE.url}${path}`;
  const cleanTitle = stripBrandSuffix(title);
  return {
    title: cleanTitle,
    description,
    alternates: { canonical: url },
    // Phase-1 indexing strategy: large programmatic page sets (service×city,
    // 3-way matrix, tier-C/D locations, answers, compare) opt-in to noindex
    // so Google focuses crawl budget on ~100 high-value pages until the
    // domain earns more authority. See app/sitemap.ts for details.
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : undefined,
    openGraph: {
      title: cleanTitle,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: cleanTitle }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: [ogImage],
    },
  };
}
