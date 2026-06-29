"use client";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { PathRouterCard, type PathRoute } from "./path-router-card";

/**
 * PathPicker — "Diagnose → Branch path router".
 * On scroll-in the 3 diagnostic cards reveal as a Stagger, reading as forks.
 * Heading animates via Reveal. Each card is an interactive PathRouterCard.
 */
export function PathPicker({ paths }: { paths: PathRoute[] }) {
  return (
    <section className="py-20" id="pick-your-path">
      <Container>
        <Reveal className="max-w-3xl">
          <Badge>Not sure where to start?</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
            Three paths most clients take.
          </h2>
          <p className="mt-5 text-text-secondary text-lg">
            We don&apos;t sell ten services to one buyer. We sell the right two or three for
            what&apos;s actually broken. Pick the path that sounds like you.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid md:grid-cols-3 gap-6">
          {paths.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <PathRouterCard path={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
