import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readingTime: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  industry: string;
  service: string;
  results: { label: string; value: string }[];
  body: string;
};

async function readMdxDir<T>(dir: string, mapper: (slug: string, data: matter.GrayMatterFile<string>) => T): Promise<T[]> {
  const fullDir = path.join(CONTENT_ROOT, dir);
  try {
    const files = await fs.readdir(fullDir);
    const mdx = files.filter((f) => f.endsWith(".mdx"));
    return Promise.all(
      mdx.map(async (file) => {
        const raw = await fs.readFile(path.join(fullDir, file), "utf8");
        const slug = file.replace(/\.mdx$/, "");
        return mapper(slug, matter(raw));
      })
    );
  } catch {
    return [];
  }
}

export async function getAllInsights(): Promise<Insight[]> {
  const all = await readMdxDir<Insight>("insights", (slug, parsed) => ({
    slug,
    title: parsed.data.title ?? slug,
    excerpt: parsed.data.excerpt ?? "",
    category: parsed.data.category ?? "Insights",
    date: parsed.data.date ?? "",
    author: parsed.data.author ?? "ZentroTECH Team",
    readingTime: parsed.data.readingTime ?? "5 min read",
    body: parsed.content,
  }));
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getRecentInsights(n: number) {
  const all = await getAllInsights();
  return all.slice(0, n);
}

export async function getInsight(slug: string) {
  const all = await getAllInsights();
  return all.find((p) => p.slug === slug);
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return readMdxDir<CaseStudy>("work", (slug, parsed) => ({
    slug,
    client: parsed.data.client ?? slug,
    title: parsed.data.title ?? slug,
    excerpt: parsed.data.excerpt ?? "",
    industry: parsed.data.industry ?? "Tech",
    service: parsed.data.service ?? "AI Consulting",
    results: parsed.data.results ?? [],
    body: parsed.content,
  }));
}

export async function getCaseStudy(slug: string) {
  const all = await getAllCaseStudies();
  return all.find((c) => c.slug === slug);
}
