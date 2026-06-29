"use client";

import { CountUp } from "@/components/animations/count-up";

const STATS = [
  { value: 50, suffix: "%", label: "of unpaid invoices recovered" },
  { value: 7, suffix: "", label: "follow-up touches per lead" },
  { value: 72, suffix: "h", label: "to first follow-up sequence" },
  { value: 21, suffix: "", label: "days to first measurable result" },
  { value: 11, suffix: "", label: "Indian languages supported" },
  { value: 138, suffix: "", label: "cities served" },
];

/**
 * RealNumbers — the measurable proof-point card. Each figure counts up once on
 * scroll-in via CountUp. Tabular-nums + reserved width keep CLS at zero.
 */
export function RealNumbers() {
  return (
    <div className="glass-glow rounded-3xl p-8 md:p-10">
      <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono font-black">
        Real numbers
      </p>
      <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl">
        We repeat the same figures everywhere because they&rsquo;re measurable,
        and you can hold us to them.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
        {STATS.map((s) => (
          <div key={s.label}>
            <CountUp
              value={s.value}
              suffix={s.suffix}
              className="block text-4xl md:text-5xl font-black text-white tabular-nums min-w-[3ch]"
            />
            <p className="mt-2 text-xs text-text-muted leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
