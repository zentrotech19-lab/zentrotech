import { JsonLd } from "./json-ld";
import { SITE } from "@/lib/constants";

export type BreadcrumbItem = {
  /** Visible label, e.g. "Insights" or article title. */
  name: string;
  /** Root-relative path, e.g. "/insights" or "/insights/agentic-ai-2026". */
  path: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

/**
 * Schema.org BreadcrumbList JSON-LD per https://schema.org/BreadcrumbList.
 *
 * Pass items in trail order, including a leading Home item and ending with
 * the current page. Example:
 *
 *   <BreadcrumbSchema
 *     items={[
 *       { name: "Home", path: "/" },
 *       { name: "Insights", path: "/insights" },
 *       { name: post.title, path: `/insights/${post.slug}` },
 *     ]}
 *   />
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
