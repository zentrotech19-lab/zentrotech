"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bot, MessageSquare, FileSearch, Code, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";

type Agent = { icon: LucideIcon; name: string; category: string };

const AGENTS: Agent[] = [
  { icon: Bot, name: "Sales SDR Agent", category: "Outreach" },
  { icon: MessageSquare, name: "Support Triage Agent", category: "Customer success" },
  { icon: FileSearch, name: "Research Agent", category: "Knowledge work" },
  { icon: Code, name: "Code Review Agent", category: "Engineering" },
  { icon: BarChart3, name: "Analytics Agent", category: "Data" },
];

/** One agent card — Tilt on desktop hover, icon tile ignites .pulse-glow on hover. */
function ShowcaseCard({ agent }: { agent: Agent }) {
  const [hover, setHover] = useState(false);
  const Icon = agent.icon;
  return (
    <Tilt className="h-full">
      <div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="h-full"
      >
        <Card className="h-full">
          <div className="size-12 rounded-xl bg-linear-to-br from-indigo/20 to-pink-pulse/20 flex items-center justify-center">
            <Icon className={`size-5 text-indigo-glow${hover ? " pulse-glow" : ""}`} aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-white mt-4">{agent.name}</h3>
          <p className="text-text-muted text-sm mt-2">{agent.category}</p>
          <p className="text-xs text-indigo-glow mt-4">Available on engagement</p>
        </Card>
      </div>
    </Tilt>
  );
}

/** ShowcaseCards — the 5 production-agent cards Stagger in, each with Tilt + icon hover. */
export function ShowcaseCards() {
  return (
    <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {AGENTS.map((a) => (
        <StaggerItem key={a.name} className="h-full">
          <ShowcaseCard agent={a} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
