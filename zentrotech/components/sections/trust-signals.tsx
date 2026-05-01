"use client";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/animations/marquee";
import { AnimatedCounter } from "@/components/animations/animated-counter";

const LOGOS = ["Acme Corp", "Vertex Labs", "Nimbus AI", "QuantumStack", "Lyra Systems", "Helix Cloud", "Radix Studios", "Orbit Finance"];
const METRICS = [
  { value: 47, suffix: "+", label: "AI agents in production" },
  { value: 12, suffix: "", label: "Countries served" },
  { value: 8, suffix: "M+", label: "Automated decisions / month" },
  { value: 99, suffix: "%", label: "Client retention" },
];

export function TrustSignals() {
  return (
    <section className="relative py-24">
      <Container>
        <p className="text-center text-xs uppercase tracking-widest text-text-muted mb-8">
          Trusted by ambitious teams worldwide
        </p>
      </Container>
      <Marquee speed={40} className="mb-24">
        {LOGOS.map((logo) => (
          <div key={logo} className="text-2xl font-bold text-white/30 hover:text-white/60 transition-colors">
            {logo}
          </div>
        ))}
      </Marquee>

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-5xl md:text-6xl font-black text-aurora">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </div>
              <p className="text-text-muted text-sm mt-3">{m.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
