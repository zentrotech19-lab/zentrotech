import type { MetadataRoute } from "next";
import { SITE, SERVICES, SOUTH_INDIA_CITIES } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { LOCALES } from "@/lib/i18n/locales";
import { getAllInsights, getAllCaseStudies } from "@/lib/content";

// PHASE-1 SITEMAP (new-domain, pre-authority).
//
// Why this is so small (~100 URLs vs 5,050 total):
// Google's "Crawled - currently not indexed" status on a new domain (~11
// days old) almost always means: too many low-trust programmatic pages
// flooded the index queue. The standard remediation (per Google's John
// Mueller guidance) is to ship a small, high-quality sitemap first, prove
// quality + earn backlinks, then expand. We re-include the matrix pages
// in phases as indexing rate climbs.
//
// The programmatic pages (service×city, vertical×city, 3-way matrix,
// answers, compare, tier-C/D locations) are STILL LIVE — internal links
// from breadcrumbs/footer still work — they are just hidden from the
// sitemap AND marked noindex via page metadata so Google deprioritizes
// them while we build trust.

// Top-20 city slugs for Phase 1. The rest stay live but are excluded
// from sitemap + marked noindex. Re-include in Phase 2 (day 30+).
const PHASE_1_LOCATION_SLUGS = new Set([
  // Tier A — Bangalore + key neighborhoods + IT parks
  "bangalore",
  "koramangala",
  "hsr-layout",
  "indiranagar",
  "whitefield",
  "electronic-city",
  "jayanagar",
  "marathahalli",
  "bellandur",
  "sarjapur-road",
  "btm-layout",
  // Tier B — South India metros
  "chennai",
  "hyderabad",
  "mysore",
  "kochi",
  "coimbatore",
  "trivandrum",
  "mangalore",
  "hubli",
  "vijayawada",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insights = await getAllInsights();
  const work = await getAllCaseStudies();

  // Localized homepages with hreflang
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

  // Core marketing pages — top priority for Phase-1 indexing.
  const coreRoutes: MetadataRoute.Sitemap = [
    "/services",
    "/about",
    "/about/founders",
    "/contact",
    "/pricing",
    "/partners",
    "/process",
    "/case-studies",
    "/case-studies/sample-bangalore-dental-clinic",
    "/insights",
    "/showcase",
    "/work",
    "/ai-consultancy-bangalore",
    "/ai-agency-dubai",
    "/ai-development-uae",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Vertical landing pages (highest commercial intent).
  const verticalLandingPages: MetadataRoute.Sitemap = [
    "/for/dental-clinics-bangalore",
    "/for/coaching-institutes-bangalore",
    "/for/wedding-photographers-bangalore",
    "/for/sub-broker-real-estate-bangalore",
    "/for/contractors-bangalore",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Free tools — top-of-funnel + backlink magnets.
  const toolPages: MetadataRoute.Sitemap = [
    "/tools/whatsapp-pricing-calculator",
    "/tools/dso-impact-calculator",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Legal pages — required for footer.
  const legalPages: MetadataRoute.Sitemap = ["/privacy", "/terms", "/refund"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  // 10 service detail pages.
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 8 vertical hub pages — keep, /verticals/clinics is already indexed.
  const verticalPages: MetadataRoute.Sitemap = Object.keys(VERTICALS_CONTENT).map((slug) => ({
    url: `${SITE.url}/verticals/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog / insights — real content, keep.
  const insightPages: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${SITE.url}/insights/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Case-study pages from MDX.
  const workPages: MetadataRoute.Sitemap = work.map((c) => ({
    url: `${SITE.url}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Top-20 location pages only (not all 138).
  const locationPages: MetadataRoute.Sitemap = SOUTH_INDIA_CITIES
    .filter((c) => PHASE_1_LOCATION_SLUGS.has(c.slug))
    .map((c) => ({
      url: `${SITE.url}/locations/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.tier === "A" ? 0.75 : 0.65,
    }));

  // Locations index hub.
  const locationsIndex: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/locations`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  // ----- EXCLUDED FROM PHASE-1 SITEMAP (still live, marked noindex):
  //   • /services/[slug]/[city]                    — 1,380 URLs
  //   • /services/[slug]/for/[vertical]/[city]     — 2,400 URLs
  //   • /verticals/[vertical]/[city]               — 1,104 URLs
  //   • /locations/[city] (tier-C/D, ~118 URLs)
  //   • /answers + /answers/[slug]                 — 101 URLs
  //   • /compare + /compare/[slug]                 — 21 URLs
  // Re-include in Phase 2 once Phase-1 indexing > 60%.

  return [
    ...localizedHomepages,
    ...coreRoutes,
    ...verticalLandingPages,
    ...toolPages,
    ...legalPages,
    ...servicePages,
    ...verticalPages,
    ...insightPages,
    ...workPages,
    ...locationsIndex,
    ...locationPages,
  ];
}
