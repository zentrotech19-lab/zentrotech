import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { COMPARE_ENTRIES } from "@/lib/data/compare";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, GitCompare } from "lucide-react";

export const metadata = buildMetadata({
  title: "ZentroTECH vs HubSpot, WATI, Salesforce + 17 Others — Honest Comparisons",
  description:
    "ZentroTECH compared honestly against HubSpot, WATI, AiSensy, Salesforce, ManyChat, Zoho, Freshchat, Razorpay, and 12+ more tools Indian SMBs evaluate in 2026.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge>
              <GitCompare className="size-3" />
              <span>{COMPARE_ENTRIES.length} comparisons</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              ZentroTECH vs <span className="text-aurora">the alternatives</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed">
              Honest side-by-side comparisons against the major SaaS tools and agency models Indian SMBs evaluate. No marketing fluff — we tell you when the competitor wins, too.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPARE_ENTRIES.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors block"
              >
                <p className="text-text-muted text-xs uppercase tracking-widest mb-3">vs</p>
                <h3 className="text-white font-bold text-xl">{c.competitor}</h3>
                <p className="mt-3 text-text-muted text-sm line-clamp-3">{c.shortPitch}</p>
                <p className="mt-5 text-indigo-glow text-sm font-semibold flex items-center gap-1">
                  Read comparison <ArrowRight className="size-3" aria-hidden="true" />
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
