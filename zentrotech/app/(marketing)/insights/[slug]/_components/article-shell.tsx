"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { ReadProgress } from "./read-progress";

/**
 * ArticleShell — owns articleRef and the SINGLE useScroll MotionValue for the
 * read-through. It tracks the article element from its top hitting the top of
 * the viewport (start start) to its bottom leaving (end end), then feeds that
 * one MotionValue to <ReadProgress> (top aurora bar + bottom-right dial).
 * The server component renders the MDX as children inside this <article>.
 */
export function ArticleShell({ children }: { children: ReactNode }) {
  const articleRef = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <ReadProgress progress={scrollYProgress} reduce={reduce} />
      <article ref={articleRef} className="prose prose-invert max-w-none">
        {children}
      </article>
    </>
  );
}
