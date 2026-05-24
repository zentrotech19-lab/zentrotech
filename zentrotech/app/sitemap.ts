import type { MetadataRoute } from "next";
import { SITE, SERVICES, SOUTH_INDIA_CITIES } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { LOCALES } from "@/lib/i18n/locales";
import { getAllInsights, getAllCaseStudies } from "@/lib/content";
import { ANSWERS } from "@/lib/data/answers";
import { COMPARE_ENTRIES } from "@/lib/data/compare";
import { TOP_30_CITIES } from "@/lib/data/top-cities";

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

  // 3-way matrix: Service × Vertical × Top-30-cities = 2,400 pages.
  // Lower priority than 2-way matrices since intent is narrower.
  const serviceVerticalCityPages: MetadataRoute.Sitemap = [];
  const verticalSlugs = Object.keys(VERTICALS_CONTENT);
  for (const s of SERVICES) {
    for (const v of verticalSlugs) {
      for (const citySlug of TOP_30_CITIES) {
        const c = SOUTH_INDIA_CITIES.find((x) => x.slug === citySlug);
        if (!c) continue;
        serviceVerticalCityPages.push({
          url: `${SITE.url}/services/${s.slug}/for/${v}/${c.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: TIER_PRIORITY[c.tier] ?? 0.5,
        });
      }
    }
  }

  // FAQ / Answers pages (100). High value — Q&A format ranks well + AI search citation-worthy.
  const answerPages: MetadataRoute.Sitemap = ANSWERS.map((a) => ({
    url: `${SITE.url}/answers/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  // Answers index hub
  const answersIndex: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/answers`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  // Compare / Alternatives pages (20). High commercial intent.
  const comparePages: MetadataRoute.Sitemap = COMPARE_ENTRIES.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const compareIndex: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/compare`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

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
    ...serviceVerticalCityPages,
    ...answerPages,
    ...answersIndex,
    ...comparePages,
    ...compareIndex,
  ];
}
