import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/constants";
import { getAllInsights, getAllCaseStudies } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insights = await getAllInsights();
  const work = await getAllCaseStudies();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
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
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
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

  return [...staticRoutes, ...servicePages, ...insightPages, ...workPages];
}
