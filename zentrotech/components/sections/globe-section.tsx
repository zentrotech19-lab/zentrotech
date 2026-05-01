"use client";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { OFFICES } from "@/lib/constants";
import { MapPin } from "lucide-react";

const GlobeScene = dynamic(() => import("@/components/3d/globe-scene").then((mod) => mod.GlobeScene), {
  ssr: false,
  loading: () => <div className="aspect-square w-full rounded-full bg-linear-to-br from-indigo/20 to-violet/10 animate-pulse" />,
});

export function GlobeSection() {
  return (
    <section className="relative py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge>Global presence</Badge>
            <h2 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight">
              From Bangalore to <span className="text-aurora">the world.</span>
            </h2>
            <p className="mt-6 text-text-muted text-lg">
              Headquartered in India's tech capital, with on-the-ground presence in Dubai and partnerships across the US, UK, and Singapore.
            </p>
            <div className="mt-8 space-y-4">
              {OFFICES.map((o) => (
                <div key={o.city} className="flex items-start gap-4 glass rounded-xl p-5">
                  <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${o.primary ? "bg-pink-pulse/20 text-pink-pulse" : "bg-cyan-glow/20 text-cyan-glow"}`}>
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{o.city} {o.primary && <span className="text-xs text-pink-pulse ml-2">HQ</span>}</p>
                    <p className="text-text-muted text-sm">{o.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          <div className="aspect-square relative">
            <GlobeScene className="size-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
