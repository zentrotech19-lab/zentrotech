import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
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
              Ready to ship the <span className="text-aurora">future</span>?
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              30-minute discovery call. Zero pressure. We'll show you exactly where AI delivers ROI for your business — or tell you honestly if it doesn't.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Book a discovery call <ArrowRight className="size-4" />
              </Button>
              <Button href="/showcase" variant="secondary" size="lg">
                See live demos
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
