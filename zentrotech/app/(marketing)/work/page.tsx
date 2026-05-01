import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Work — Case Studies",
  description: "Explore our portfolio of AI agents, automation systems, and AI-native websites we've shipped for clients across India, UAE, and globally.",
  path: "/work",
});

export default async function WorkPage() {
  const cases = await getAllCaseStudies();
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Selected work</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Work that <span className="text-aurora">ships</span>.
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="group block">
                <Card className="h-full">
                  <div className="aspect-[16/9] rounded-xl bg-linear-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 mb-6 flex items-center justify-center">
                    <span className="text-6xl font-black text-white/10">{c.client.split(" ")[0]}</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-indigo-glow">{c.industry} · {c.service}</p>
                  <h2 className="text-2xl font-bold text-white mt-2 group-hover:text-aurora flex items-start gap-2">
                    {c.title}
                    <ArrowUpRight className="size-5 shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h2>
                  <p className="text-text-muted mt-3">{c.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
