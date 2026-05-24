import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { ANSWERS } from "@/lib/data/answers";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "100+ AI, Automation & SMB Answers — India 2026 | ZentroTECH",
  description:
    "100 high-intent answers for Indian SMBs: AI chatbot cost, WhatsApp Business pricing 2026, MCP server setup, voice AI in Indian languages, DPDP Act compliance, and more.",
  path: "/answers",
});

const CATEGORY_LABEL: Record<string, string> = {
  cost: "Pricing & Costs",
  "how-to": "How-To Guides",
  comparison: "Tool Comparisons",
  regulation: "India Regulations",
  general: "General Knowledge",
};

const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABEL> = [
  "cost",
  "how-to",
  "comparison",
  "regulation",
  "general",
];

export default function AnswersIndexPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABEL[cat],
    items: ANSWERS.filter((a) => a.category === cat),
  }));

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
              <HelpCircle className="size-3" />
              <span>100+ answers</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              Quick answers for <span className="text-aurora">Indian SMBs</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed">
              100+ high-intent answers on AI, automation, WhatsApp Business, India regulations, and SMB tooling — researched, sourced, and updated for 2026.
            </p>
          </div>
        </Container>
      </section>

      {grouped.map((g) => (
        <section key={g.category} className="py-12 border-t border-white/5">
          <Container>
            <div className="max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                {g.label}
                <span className="text-text-muted text-base font-normal ml-3">({g.items.length})</span>
              </h2>
              <div className="mt-8 grid md:grid-cols-2 gap-3">
                {g.items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/answers/${a.slug}`}
                    className="glass rounded-xl p-5 hover:bg-white/10 transition-colors block"
                  >
                    <p className="text-white font-medium text-sm leading-snug">{a.question}</p>
                    <p className="text-text-muted text-xs mt-1.5 line-clamp-2">{a.shortAnswer}</p>
                    <p className="text-indigo-glow text-xs font-semibold mt-3 flex items-center gap-1">
                      Read answer <ArrowRight className="size-3" aria-hidden="true" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CTASection />
    </>
  );
}
