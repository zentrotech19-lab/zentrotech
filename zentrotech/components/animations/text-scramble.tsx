"use client";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  text,
  className,
  duration = 1800,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const [output, setOutput] = useState(text);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    const length = Math.max(text.length, output.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < length; i++) {
      const from = output[i] ?? "";
      const to = text[i] ?? "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * (duration / 50));
      queue.push({ from, to, start, end });
    }
    let frame = 0;
    let raf: number;
    const tick = () => {
      let out = "";
      let complete = 0;
      for (const item of queue) {
        if (frame >= item.end) {
          complete++;
          out += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += `<span class="text-indigo-glow">${item.char}</span>`;
        } else {
          out += item.from;
        }
      }
      setOutput(out);
      if (complete < queue.length) {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduce]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: output }} />;
}
