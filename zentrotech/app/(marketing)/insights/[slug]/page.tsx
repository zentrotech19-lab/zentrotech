import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights, getInsight } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/lib/mdx-components";

export async function generateStaticParams() {
  const all = await getAllInsights();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getInsight(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/insights/${slug}` });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getInsight(slug);
  if (!p) notFound();

  return (
    <>
      <section className="py-24">
        <Container className="max-w-3xl">
          <Badge>{p.category} · {p.readingTime}</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight">{p.title}</h1>
          <p className="mt-6 text-text-muted">{p.author} · {formatDate(p.date)}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          <article className="prose prose-invert max-w-none">
            <MDXRemote source={p.body} components={mdxComponents} />
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
