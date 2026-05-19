import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { SOCIAL } from "@/lib/constants";
import { en } from "@/lib/i18n/dictionaries/en";
import type { Dictionary } from "@/lib/i18n/types";

interface CTASectionProps {
  dict?: Dictionary["cta"];
}

// Falls back to English so the legacy English-only pages
// (services index, about, work, etc.) keep rendering while the rest of
// the site finishes its multilingual migration.
export function CTASection({ dict = en.cta }: CTASectionProps) {
  return (
    <section className="relative py-32">
      <Container>
        <div className="relative rounded-3xl glass-glow p-12 md:p-20 text-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 size-[800px] rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)" }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
              {dict.title1} <span className="text-aurora">{dict.title2}</span> {dict.title3}
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">{dict.sub}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                {dict.ctaWhatsapp}
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {dict.ctaQuote} <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
