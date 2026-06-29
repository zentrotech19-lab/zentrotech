import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { Reveal } from "@/components/animations/reveal";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { mdxComponents } from "@/lib/mdx-components";
import { ResultsGrid } from "./results-grid";
import { ArticleSpine } from "./article-spine";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.excerpt, path: `/work/${slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>{c.industry} · {c.service}</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl">{c.title}</h1>
          <Reveal delay={0.1}>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl">{c.excerpt}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <ResultsGrid results={c.results} />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="relative max-w-3xl mx-auto md:pl-8">
            <ArticleSpine />
            <article className="prose prose-invert">
              <MDXRemote source={c.body} components={mdxComponents} />
            </article>
          </div>
        </Container>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
