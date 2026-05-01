import { JsonLd } from "./json-ld";
import { SITE } from "@/lib/constants";

type BlogPostingSchemaProps = {
  /** Page URL path (relative, e.g. "/insights/agentic-ai-2026"). */
  path: string;
  /** Article headline (<= 110 chars per Google guidance). */
  headline: string;
  /** Short article description / dek. */
  description: string;
  /** ISO 8601 publish date (e.g. "2026-04-12"). */
  datePublished: string;
  /** Optional ISO 8601 last-modified date. Defaults to datePublished. */
  dateModified?: string;
  /** Plain-text author name. */
  author: string;
  /** Optional absolute or root-relative image URL. Defaults to a generic OG. */
  image?: string;
};

/**
 * Schema.org BlogPosting JSON-LD for insight / blog articles.
 *
 * NOTE: Intentionally not wired into the dynamic `[slug]` page yet — the MDX
 * agent will integrate this. Drop it into the article page like:
 *
 *   <BlogPostingSchema
 *     path={`/insights/${post.slug}`}
 *     headline={post.title}
 *     description={post.description}
 *     datePublished={post.publishedAt}
 *     dateModified={post.updatedAt}
 *     author={post.author}
 *     image={post.image}
 *   />
 */
export function BlogPostingSchema({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image = "/og/insights.png",
}: BlogPostingSchemaProps) {
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image: [imageUrl],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
  return <JsonLd data={data} />;
}
