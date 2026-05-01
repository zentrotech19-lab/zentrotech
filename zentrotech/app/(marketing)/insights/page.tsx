import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Insights — AI, Automation & Industry Analysis",
  description: "Original research, case stories, and operator-grade analysis from the ZentroTECH team on agentic AI, automation, and the future of work.",
  path: "/insights",
});

export default async function InsightsPage() {
  const posts = await getAllInsights();
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Insights</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            From the <span className="text-aurora">lab</span>.
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
                <article className="h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-indigo/40 group-hover:-translate-y-1">
                  <div className="aspect-video bg-linear-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/10">{p.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-widest text-indigo-glow">{p.category} · {p.readingTime}</p>
                    <h2 className="text-xl font-bold text-white mt-2 group-hover:text-aurora">{p.title}</h2>
                    <p className="text-text-muted text-sm mt-3 line-clamp-2">{p.excerpt}</p>
                    <p className="text-xs text-text-muted mt-4">{formatDate(p.date)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
