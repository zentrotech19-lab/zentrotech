import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getRecentInsights } from "@/lib/content";

export async function InsightsPreview() {
  const posts = await getRecentInsights(3);
  return (
    <section className="relative py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge>Insights</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">From the lab.</h2>
          </div>
          <Link href="/insights" className="hidden md:flex items-center gap-2 text-indigo-glow hover:text-white text-sm font-medium">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
              <article className="h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-indigo/40 group-hover:-translate-y-1">
                <div className="aspect-video bg-linear-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-black text-white/10">{p.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-indigo-glow">{p.category}</p>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-aurora">{p.title}</h3>
                  <p className="text-text-muted text-sm mt-3 line-clamp-2">{p.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
