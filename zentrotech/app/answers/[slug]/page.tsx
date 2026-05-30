import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ANSWERS } from "@/lib/data/answers";
import { SITE, SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, HelpCircle, BookOpen } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// 100 long-tail FAQ pages — high-intent buyer questions. Each ranks for
// "[question]" style searches and drives commercial-intent traffic.

export function generateStaticParams() {
  return ANSWERS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ANSWERS.find((x) => x.slug === slug);
  if (!a) return {};
  return buildMetadata({
    title: `${a.question} | ZentroTECH Answers`,
    description: a.shortAnswer,
    path: `/answers/${a.slug}`,
    noindex: true, // Phase-1 strategy — 100 answers pages hidden until domain earns authority
  });
}

const CATEGORY_LABEL: Record<string, string> = {
  cost: "Pricing & Costs",
  "how-to": "How-To Guides",
  comparison: "Tool Comparisons",
  regulation: "India Regulations",
  general: "General Knowledge",
};

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ANSWERS.find((x) => x.slug === slug);
  if (!a) notFound();

  // FAQPage schema — captures Google's rich snippet for Q&A
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: a.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: a.shortAnswer + " " + a.body.map((b) => b.text).join(" "),
        },
      },
    ],
  };

  // Related answers (same category) for internal links
  const related = ANSWERS.filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 5);

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Link href="/answers" className="text-text-muted text-sm hover:text-white transition-colors">
              ← All Answers
            </Link>
            <Badge>
              <HelpCircle className="size-3" />
              <span>{CATEGORY_LABEL[a.category]}</span>
            </Badge>
            <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              {a.question}
            </h1>
            <div className="mt-8 glass-glow rounded-2xl p-6 md:p-8">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-3">Quick answer</p>
              <p className="text-white text-lg md:text-xl leading-relaxed">{a.shortAnswer}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <article className="space-y-10">
              {a.body.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{section.heading}</h2>
                  <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">{section.text}</p>
                </div>
              ))}
            </article>
            <div className="mt-12 glass rounded-2xl p-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <p className="text-white font-bold">Have a follow-up question?</p>
                <p className="text-text-muted text-sm mt-1">Free 30-min audit. Quote within 1 business day.</p>
              </div>
              <div className="flex gap-3">
                <Button href={SOCIAL.whatsapp} external>
                  <FaWhatsapp className="size-4" />
                  WhatsApp us
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <Container>
            <div className="max-w-3xl">
              <Badge>
                <BookOpen className="size-3" />
                <span>Related questions</span>
              </Badge>
              <h2 className="mt-4 text-2xl md:text-3xl font-black text-white tracking-tight">
                More on {CATEGORY_LABEL[a.category].toLowerCase()}
              </h2>
              <div className="mt-8 space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/answers/${r.slug}`}
                    className="block glass rounded-xl p-5 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-white font-medium text-base">{r.question}</p>
                    <p className="text-text-muted text-sm mt-1 line-clamp-1">{r.shortAnswer}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
