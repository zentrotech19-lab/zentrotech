"use client";
import { m } from "framer-motion";
import type { ArtMotif } from "@/lib/services-content";

// Per-service hero artwork. Each motif is a calm geometric SVG that hints at
// the service's metaphor (funnel, waveform, gear, etc.) without dominating
// the hero. Single accent color from the service's gradient — keeps the
// site coherent while making each detail page visually distinct.

interface ServiceArtProps {
  motif: ArtMotif;
  className?: string;
}

const stroke = "#a5b4fc"; // indigo-300 — visible on dark, muted enough to not shout
const accent = "#818cf8"; // indigo-400

export function ServiceArt({ motif, className }: ServiceArtProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {motif === "funnel" && <FunnelArt />}
        {motif === "circuit" && <CircuitArt />}
        {motif === "pulse" && <PulseArt />}
        {motif === "ascending" && <AscendingArt />}
        {motif === "waveform" && <WaveformArt />}
        {motif === "speech" && <SpeechArt />}
        {motif === "phone" && <PhoneArt />}
        {motif === "search" && <SearchArt />}
        {motif === "pipeline" && <PipelineArt />}
        {motif === "magnifier" && <MagnifierArt />}
      </svg>
    </div>
  );
}

// Funnel — three stacked rounded rects narrowing, with dots flowing through
function FunnelArt() {
  return (
    <g>
      <m.rect x="60" y="80" width="280" height="50" rx="12" fill="url(#gradFill)" stroke={stroke} strokeWidth="1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
      <m.rect x="100" y="170" width="200" height="50" rx="12" fill="url(#gradFill)" stroke={stroke} strokeWidth="1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} />
      <m.rect x="140" y="260" width="120" height="50" rx="12" fill="url(#gradFill)" stroke={stroke} strokeWidth="1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} />
      {[0, 1, 2, 3].map((i) => (
        <m.circle
          key={i}
          cx={120 + i * 50}
          cy={105}
          r={3}
          fill={accent}
          animate={{ y: [0, 200, 200, 0], opacity: [1, 1, 0, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeIn" }}
        />
      ))}
    </g>
  );
}

// Circuit — interconnected nodes (autopilot)
function CircuitArt() {
  const nodes = [
    [100, 100], [300, 100], [200, 200], [100, 300], [300, 300],
  ];
  return (
    <g>
      <line x1={100} y1={100} x2={200} y2={200} stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1={300} y1={100} x2={200} y2={200} stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1={200} y1={200} x2={100} y2={300} stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1={200} y1={200} x2={300} y2={300} stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1={100} y1={100} x2={300} y2={100} stroke={stroke} strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <line x1={100} y1={300} x2={300} y2={300} stroke={stroke} strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      {nodes.map(([x, y], i) => (
        <m.circle
          key={i}
          cx={x}
          cy={y}
          r={10}
          fill="url(#gradFill)"
          stroke={accent}
          strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </g>
  );
}

// Pulse — repeating rings (follow-up cadence)
function PulseArt() {
  return (
    <g>
      <circle cx={200} cy={200} r={20} fill={accent} />
      {[0, 1, 2, 3].map((i) => (
        <m.circle
          key={i}
          cx={200}
          cy={200}
          r={20}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          animate={{ r: [20, 150], opacity: [0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.75 }}
        />
      ))}
    </g>
  );
}

// Ascending bars (payment recovery — DSO trending down / collections up)
function AscendingArt() {
  const bars = [
    { x: 60, h: 60 }, { x: 120, h: 100 }, { x: 180, h: 150 }, { x: 240, h: 200 }, { x: 300, h: 260 },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <m.rect
          key={i}
          x={b.x}
          y={340 - b.h}
          width={40}
          height={b.h}
          rx={6}
          fill="url(#gradFill)"
          stroke={stroke}
          strokeWidth="1"
          initial={{ height: 0, y: 340 }}
          animate={{ height: b.h, y: 340 - b.h }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
      <line x1={50} y1={340} x2={350} y2={340} stroke={stroke} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

// Waveform — sine wave (voice agent)
function WaveformArt() {
  const points: string[] = [];
  for (let x = 0; x <= 400; x += 4) {
    const y = 200 + Math.sin(x / 30) * 60 * Math.exp(-Math.abs(x - 200) / 200);
    points.push(`${x},${y}`);
  }
  return (
    <g>
      <m.polyline
        points={points.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const baseHeight = 30 + Math.random() * 60;
        return (
          <m.rect
            key={i}
            x={140 + i * 20}
            y={200 - baseHeight / 2}
            width={6}
            height={baseHeight}
            rx={3}
            fill={accent}
            animate={{ height: [baseHeight, baseHeight * 1.6, baseHeight] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}
    </g>
  );
}

// Speech bubbles (chatbot)
function SpeechArt() {
  return (
    <g>
      <m.path
        d="M 60 100 Q 60 80 80 80 L 220 80 Q 240 80 240 100 L 240 140 Q 240 160 220 160 L 110 160 L 90 180 L 95 160 L 80 160 Q 60 160 60 140 Z"
        fill="url(#gradFill)"
        stroke={stroke}
        strokeWidth="1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
      <m.path
        d="M 180 200 Q 180 180 200 180 L 340 180 Q 360 180 360 200 L 360 240 Q 360 260 340 260 L 230 260 L 210 280 L 215 260 L 200 260 Q 180 260 180 240 Z"
        fill="url(#gradFill)"
        stroke={stroke}
        strokeWidth="1"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      {[0, 1, 2].map((i) => (
        <m.circle
          key={`a-${i}`}
          cx={100 + i * 25}
          cy={120}
          r={3}
          fill={accent}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </g>
  );
}

// Phone (Android app)
function PhoneArt() {
  return (
    <g>
      <m.rect
        x={140}
        y={60}
        width={120}
        height={240}
        rx={16}
        fill="url(#gradFill)"
        stroke={stroke}
        strokeWidth="1.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />
      <line x1={180} y1={75} x2={220} y2={75} stroke={stroke} strokeWidth="1" opacity="0.6" />
      <rect x={155} y={95} width={90} height={40} rx={6} fill={accent} opacity="0.3" />
      <rect x={155} y={145} width={90} height={20} rx={4} fill={stroke} opacity="0.4" />
      <rect x={155} y={175} width={60} height={20} rx={4} fill={stroke} opacity="0.4" />
      <rect x={155} y={205} width={90} height={20} rx={4} fill={stroke} opacity="0.4" />
      <m.rect
        x={155}
        y={245}
        width={90}
        height={32}
        rx={6}
        fill={accent}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx={200} cy={290} r={4} fill={stroke} opacity="0.6" />
    </g>
  );
}

// Search rays (SEO)
function SearchArt() {
  return (
    <g>
      <circle cx={200} cy={180} r={70} fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx={200} cy={180} r={70} fill="url(#gradFill)" opacity="0.5" />
      <line x1={250} y1={230} x2={310} y2={290} stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 200 + Math.cos(angle) * 90;
        const y1 = 180 + Math.sin(angle) * 90;
        const x2 = 200 + Math.cos(angle) * 110;
        const y2 = 180 + Math.sin(angle) * 110;
        return (
          <m.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}
    </g>
  );
}

// Pipeline columns (CRM lead stages)
function PipelineArt() {
  const cols = [
    { x: 50, label: "New" },
    { x: 140, label: "Qualified" },
    { x: 230, label: "Proposal" },
    { x: 320, label: "Won" },
  ];
  return (
    <g>
      {cols.map((c, ci) => (
        <g key={ci}>
          <rect x={c.x} y={80} width={60} height={240} rx={8} fill="url(#gradFill)" stroke={stroke} strokeWidth="1" />
          {[0, 1, 2].map((j) => (
            <m.rect
              key={j}
              x={c.x + 6}
              y={100 + j * 36}
              width={48}
              height={26}
              rx={4}
              fill={accent}
              opacity="0.7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: ci * 0.1 + j * 0.05 }}
            />
          ))}
        </g>
      ))}
      <m.circle
        cx={80}
        cy={220}
        r={5}
        fill="#fff"
        animate={{ x: [0, 90, 180, 270], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}

// Magnifier over a checklist (audit)
function MagnifierArt() {
  return (
    <g>
      {/* Page outline */}
      <rect x={70} y={60} width={200} height={260} rx={8} fill="url(#gradFill)" stroke={stroke} strokeWidth="1" />
      {/* Checklist lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={88} y={92 + i * 36} width={12} height={12} rx={2} fill={accent} opacity="0.7" />
          <rect x={108} y={94 + i * 36} width={140} height={8} rx={2} fill={stroke} opacity="0.4" />
        </g>
      ))}
      {/* Magnifier */}
      <m.g
        animate={{ x: [0, -30, 30, 0], y: [0, 20, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx={260} cy={250} r={48} fill="none" stroke={accent} strokeWidth="3" />
        <circle cx={260} cy={250} r={48} fill="url(#gradFill)" opacity="0.4" />
        <line x1={295} y1={285} x2={335} y2={325} stroke={accent} strokeWidth="6" strokeLinecap="round" />
      </m.g>
    </g>
  );
}
