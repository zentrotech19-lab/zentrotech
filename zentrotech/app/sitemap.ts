import type { MetadataRoute } from "next";
import { SITE, SERVICES, SOUTH_INDIA_CITIES } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { LOCALES } from "@/lib/i18n/locales";
import { getAllInsights, getAllCaseStudies } from "@/lib/content";

// Priority by city tier — Bangalore + neighborhoods at top of Google crawl queue.
const TIER_PRIORITY: Record<string, number> = { A: 0.75, B: 0.65, C: 0.55, D: 0.5 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insights = await getAllInsights();
  const work = await getAllCaseStudies();

  // Localized homepages — one entry per supported language with hreflang
  // alternates so Google can serve the right one per region.
  const homepageAlternates = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE.url}/${l}`])
  );

  const localizedHomepages: MetadataRoute.Sitemap = LOCALES.map((lang) => ({
    url: `${SITE.url}/${lang}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: homepageAlternates },
  }));

  const englishOnlyRoutes: MetadataRoute.Sitemap = [
    "/services",
    "/showcase",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/ai-consultancy-bangalore",
    "/ai-agency-dubai",
    "/ai-development-uae",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const verticalPages: MetadataRoute.Sitemap = Object.keys(VERTICALS_CONTENT).map((slug) => ({
    url: `${SITE.url}/verticals/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${SITE.url}/insights/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const workPages: MetadataRoute.Sitemap = work.map((c) => ({
    url: `${SITE.url}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Programmatic location pages (Bangalore neighborhoods + South India metros).
  const locationPages: MetadataRoute.Sitemap = SOUTH_INDIA_CITIES.map((c) => ({
    url: `${SITE.url}/locations/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.tier === "A" ? 0.75 : 0.65,
  }));

  // Programmatic Service × City matrix — 10 services × 138 cities = 1,380 pages.
  const serviceCityPages: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    for (const c of SOUTH_INDIA_CITIES) {
      serviceCityPages.push({
        url: `${SITE.url}/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: TIER_PRIORITY[c.tier] ?? 0.5,
      });
    }
  }

  // Programmatic Vertical × City matrix — 8 verticals × 138 cities = 1,104 pages.
  const verticalCityPages: MetadataRoute.Sitemap = [];
  for (const v of Object.keys(VERTICALS_CONTENT)) {
    for (const c of SOUTH_INDIA_CITIES) {
      verticalCityPages.push({
        url: `${SITE.url}/verticals/${v}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: TIER_PRIORITY[c.tier] ?? 0.5,
      });
    }
  }

  return [
    ...localizedHomepages,
    ...englishOnlyRoutes,
    ...servicePages,
    ...verticalPages,
    ...insightPages,
    ...workPages,
    ...locationPages,
    ...serviceCityPages,
    ...verticalCityPages,
  ];
}
