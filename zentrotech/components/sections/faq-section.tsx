import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import type { FAQ } from "@/lib/faqs";
import { ChevronDown } from "lucide-react";

type FaqSectionProps = {
  faqs: FAQ[];
  /** Optional eyebrow badge text. Defaults to "FAQ". */
  eyebrow?: string;
  /** Optional heading. Defaults to "Frequently asked questions". */
  heading?: string;
  /** Optional supporting paragraph below the heading. */
  intro?: string;
  /** Optional id for in-page anchoring (e.g. "faq"). */
  id?: string;
};

/**
 * Server-rendered FAQ section.
 *
 * - Renders each Q&A as a native <details>/<summary> accordion (no client JS,
 *   keyboard-accessible, screen-reader friendly out of the box).
 * - Emits Schema.org FAQPage JSON-LD for Google rich-result eligibility.
 *
 * Example:
 *   import { FAQS_BANGALORE } from "@/lib/faqs";
 *   <FaqSection faqs={FAQS_BANGALORE} heading="Bangalore FAQs" id="faq" />
 */
export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  heading = "Frequently asked questions",
  intro,
  id,
}: FaqSectionProps) {
  if (!faqs.length) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section id={id} className="relative py-24">
      <JsonLd data={data} />
      <Container>
        <div className="max-w-2xl">
          <Badge>{eyebrow}</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-6 text-text-secondary text-lg">{intro}</p>
          ) : null}
        </div>

        <div className="mt-12 max-w-3xl divide-y divide-white/5 rounded-2xl glass">
          {faqs.map((faq, i) => (
            <details
              key={`${i}-${faq.question}`}
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-left text-white font-medium">
                <span className="text-base md:text-lg">{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
