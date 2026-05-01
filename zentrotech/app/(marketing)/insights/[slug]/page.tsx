import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights, getInsight } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

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
          <article className="prose prose-invert max-w-none text-text-secondary text-lg leading-relaxed [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-12 [&>h2]:mb-4 [&>p]:mb-6 [&>ul>li]:my-2">
            {p.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) return <h2 key={i}>{para.replace(/^##\s/, "")}</h2>;
              if (para.match(/^\d+\.\s/)) {
                const items = para.split("\n").map((line) => line.replace(/^\d+\.\s/, ""));
                return <ol key={i} className="list-decimal pl-6">{items.map((it, j) => <li key={j}>{it}</li>)}</ol>;
              }
              if (para.startsWith("- ")) {
                const items = para.split("\n").map((line) => line.replace(/^-\s/, ""));
                return <ul key={i} className="list-disc pl-6">{items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
              }
              return <p key={i}>{para}</p>;
            })}
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
