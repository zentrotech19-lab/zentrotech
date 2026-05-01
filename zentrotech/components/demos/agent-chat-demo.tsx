"use client";
import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { id: number; from: "user" | "agent"; text: string };

const SCRIPTED: Record<string, string> = {
  default: "I'm ZentroBot — a sample agent built by ZentroTECH. Try asking: 'What can you automate?', 'How do AI agents work?', or 'What's your pricing?'",
  automate: "We automate everything from document extraction to multi-step approval workflows. Most clients see 60-80% time savings on repetitive tasks within 30 days.",
  agents: "AI agents combine large language models with tools (APIs, databases, code execution) and memory. They can reason, plan, and act autonomously — like a tireless digital teammate.",
  pricing: "We offer fixed-scope sprints starting at $5K, retainer engagements from $8K/mo, and enterprise contracts. Book a discovery call and we'll scope your specific need.",
};

function reply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("automate")) return SCRIPTED.automate;
  if (lower.includes("agent")) return SCRIPTED.agents;
  if (lower.includes("pric") || lower.includes("cost")) return SCRIPTED.pricing;
  return "Great question. A real ZentroTECH agent would query our knowledge base and give you a tailored answer. Book a call and we'll show you our production agents in action.";
}

export function AgentChatDemo() {
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, from: "agent", text: SCRIPTED.default }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const id = messages.length;
    setMessages((prev) => [...prev, { id, from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: id + 1, from: "agent", text: reply(text) }]);
    }, 1100);
  };

  return (
    <div className="glass-glow rounded-3xl p-1 max-w-2xl w-full mx-auto">
      <div className="rounded-3xl bg-void/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <div className="relative size-10 rounded-full bg-linear-to-br from-indigo to-pink-pulse flex items-center justify-center">
            <Bot aria-hidden="true" className="size-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-cyan-glow border-2 border-void" />
          </div>
          <div>
            <p className="text-white font-semibold">ZentroBot</p>
            <p className="text-xs text-text-muted">Live demo · responds in {"<"}1s</p>
          </div>
        </div>

        <div className="px-6 py-6 h-80 overflow-y-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <m.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", msg.from === "user" ? "justify-end" : "justify-start")}
              >
                {msg.from === "agent" && (
                  <div className="size-8 rounded-full bg-indigo/20 flex items-center justify-center shrink-0">
                    <Bot aria-hidden="true" className="size-4 text-indigo-glow" />
                  </div>
                )}
                <div className={cn("max-w-[75%] px-4 py-3 rounded-2xl text-sm", msg.from === "user" ? "bg-indigo text-white" : "glass text-text-secondary")}>
                  {msg.text}
                </div>
                {msg.from === "user" && (
                  <div className="size-8 rounded-full bg-pink-pulse/20 flex items-center justify-center shrink-0">
                    <User aria-hidden="true" className="size-4 text-pink-pulse" />
                  </div>
                )}
              </m.div>
            ))}
            {typing && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-text-muted text-sm">
                <div className="size-8 rounded-full bg-indigo/20 flex items-center justify-center"><Bot aria-hidden="true" className="size-4 text-indigo-glow" /></div>
                <span className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce" />
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce [animation-delay:0.15s]" />
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce [animation-delay:0.3s]" />
                </span>
              </m.div>
            )}
            <div ref={endRef} />
          </AnimatePresence>
        </div>

        <div className="px-6 py-4 border-t border-white/5 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask the agent anything..."
            aria-label="Ask the agent"
            className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm text-white placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          />
          <button
            onClick={send}
            aria-label="Send message"
            className="size-11 min-w-11 min-h-11 rounded-full bg-linear-to-br from-indigo to-pink-pulse flex items-center justify-center hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            <Send aria-hidden="true" className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
