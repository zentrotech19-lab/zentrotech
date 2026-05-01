import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

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
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">{c.excerpt}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.results.map((r) => (
              <Card key={r.label} className="text-center">
                <p className="text-3xl font-black text-aurora">{r.value}</p>
                <p className="text-xs uppercase tracking-widest text-text-muted mt-2">{r.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <article className="prose prose-invert max-w-3xl mx-auto text-text-secondary [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-white [&>blockquote]:text-text-muted [&>blockquote]:border-indigo [&>p]:leading-relaxed">
            {c.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) return <h2 key={i}>{para.replace(/^##\s/, "")}</h2>;
              if (para.startsWith("> ")) return <blockquote key={i}>{para.replace(/^>\s/, "")}</blockquote>;
              return <p key={i}>{para}</p>;
            })}
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
