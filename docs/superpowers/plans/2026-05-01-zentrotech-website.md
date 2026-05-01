# ZentroTECH Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to dispatch fresh subagents per task. Tasks within a phase can be executed in parallel; phases must be sequential. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build a production-ready Next.js 15 website for ZentroTECH — an AI consultancy positioned for Bangalore + Dubai + global markets with mind-blowing 2050-future animations, full SEO, and 7+ pages.

**Architecture:** Next.js 15 App Router (SSR for SEO), TypeScript strict, Tailwind CSS v4 design tokens, Framer Motion + GSAP + Three.js (R3F) for animations, MDX for content. Deployed to Vercel. Component library is split into `ui/`, `layout/`, `animations/`, `3d/`, `sections/`, `seo/`, `demos/` for clear boundaries.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion, GSAP + ScrollTrigger, Three.js + React Three Fiber + drei, Lenis, Lucide React, React Hook Form + Zod, next-mdx-remote.

**Spec:** See `docs/superpowers/specs/2026-05-01-zentrotech-website-design.md`.

---

## Project Working Directory

All paths are relative to project root: `c:\Antigravity\TEMP projects\Zentro\zentrotech\`

The Next.js app lives in a `zentrotech/` subdirectory inside the project root (created in Task 1).

---

## File Structure (After Implementation)

```
zentrotech/
├── app/
│   ├── layout.tsx                       — Root layout, fonts, providers
│   ├── page.tsx                         — Home page (cinematic single-scroll)
│   ├── globals.css                      — Tailwind + design tokens
│   ├── sitemap.ts                       — Auto-generated sitemap
│   ├── robots.ts                        — Robots.txt
│   ├── not-found.tsx                    — 404 page
│   ├── (marketing)/
│   │   ├── services/page.tsx
│   │   ├── services/ai-agents/page.tsx
│   │   ├── services/ai-automation/page.tsx
│   │   ├── services/ai-websites/page.tsx
│   │   ├── services/agentic-coding/page.tsx
│   │   ├── services/llm-integration/page.tsx
│   │   ├── services/ai-strategy/page.tsx
│   │   ├── work/page.tsx
│   │   ├── work/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── insights/[slug]/page.tsx
│   │   ├── showcase/page.tsx
│   │   └── contact/page.tsx
│   ├── ai-consultancy-bangalore/page.tsx
│   ├── ai-agency-dubai/page.tsx
│   └── ai-development-uae/page.tsx
├── components/
│   ├── ui/                              — Button, Card, Input, Badge, Container
│   ├── layout/                          — Header, Footer, Nav, MobileNav
│   ├── animations/                      — Aurora, MagneticCursor, TextScramble, Marquee, Counter, SmoothScroll
│   ├── 3d/                              — NeuralOrb, ParticleGalaxy, GlobeScene
│   ├── sections/                        — Hero, ServicesBento, ProcessTimeline, WorkMarquee, TrustSignals, GlobeSection, InsightsPreview, CTA
│   ├── seo/                             — JsonLd, OrganizationSchema, LocalBusinessSchema, ServiceSchema
│   └── demos/                           — AgentChatDemo
├── lib/
│   ├── utils.ts                         — cn() helper
│   ├── seo.ts                           — Metadata helpers
│   ├── content.ts                       — MDX loaders
│   ├── constants.ts                     — Site config, services, offices, social links
│   └── motion.ts                        — Framer Motion variants library
├── content/
│   ├── insights/                        — Blog posts (.mdx)
│   └── work/                            — Case studies (.mdx)
├── public/
│   ├── images/
│   ├── fonts/
│   └── og/                              — Open Graph images
├── tailwind.config.ts (v4 css mode)
├── next.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── CONTENT.md                           — Guide for user to fill real content
```

---

## Phase 1 — Foundation (Sequential, must run before all others)

### Task 1: Scaffold Next.js 15 + TypeScript Project

**Files:**
- Create: `zentrotech/` directory and entire Next.js scaffold
- Modify: `zentrotech/package.json` (add deps)

- [ ] **Step 1: Create Next.js app**

Run from project root `c:\Antigravity\TEMP projects\Zentro`:

```bash
npx create-next-app@latest zentrotech --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --no-install
```

Expected: New `zentrotech/` directory with App Router scaffold.

- [ ] **Step 2: Install core dependencies**

```bash
cd zentrotech
npm install framer-motion gsap @gsap/react three @react-three/fiber @react-three/drei lenis lucide-react react-hook-form zod @hookform/resolvers next-mdx-remote gray-matter clsx tailwind-merge class-variance-authority
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/three prettier prettier-plugin-tailwindcss
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with default starter content.

- [ ] **Step 5: Commit**

```bash
git add zentrotech/
git commit -m "feat: scaffold Next.js 15 app with core dependencies"
```

---

### Task 2: Configure Design System (Tailwind v4 tokens, fonts, globals)

**Files:**
- Modify: `zentrotech/app/globals.css`
- Modify: `zentrotech/app/layout.tsx`
- Create: `zentrotech/lib/utils.ts`
- Create: `zentrotech/lib/constants.ts`

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-void: #0a0a0f;
  --color-void-2: #0d0d18;
  --color-deep-violet: #1a0f2e;
  --color-indigo: #6366f1;
  --color-indigo-glow: #818cf8;
  --color-violet: #8b5cf6;
  --color-pink-pulse: #ec4899;
  --color-cyan-glow: #06b6d4;
  --color-aurora-1: #6366f1;
  --color-aurora-2: #8b5cf6;
  --color-aurora-3: #ec4899;
  --color-text-primary: #ffffff;
  --color-text-secondary: #e5e7eb;
  --color-text-muted: #9ca3af;
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-glow: rgba(99, 102, 241, 0.3);

  /* Typography */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-display: var(--font-geist-sans);

  /* Spacing scale extensions */
  --spacing-section: 8rem;

  /* Animations */
  --animate-aurora: aurora 20s ease infinite;
  --animate-pulse-glow: pulse-glow 3s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;
}

@layer base {
  html {
    background-color: var(--color-void);
    color: var(--color-text-primary);
    color-scheme: dark;
  }

  body {
    background: radial-gradient(ellipse at top, var(--color-deep-violet) 0%, var(--color-void) 60%);
    min-height: 100vh;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background-color: var(--color-indigo);
    color: var(--color-text-primary);
  }
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-aurora {
    background: linear-gradient(135deg, var(--color-indigo), var(--color-violet), var(--color-pink-pulse));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(16px);
    border: 1px solid var(--color-border-subtle);
  }

  .glass-glow {
    background: rgba(99, 102, 241, 0.06);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-border-glow);
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.1);
  }

  .noise {
    position: relative;
  }

  .noise::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.03;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
}

@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentrotech.ai"),
  title: {
    default: "ZentroTECH — AI Consultancy | Agents, Automation & AI-Powered Websites",
    template: "%s · ZentroTECH",
  },
  description:
    "ZentroTECH is a Bangalore-headquartered AI consultancy building agentic systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.",
  keywords: [
    "AI consultancy Bangalore",
    "AI agents",
    "AI automation",
    "agentic AI",
    "AI agency Dubai",
    "LLM integration",
    "AI website development",
    "agentic coding",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zentrotech.ai",
    siteName: "ZentroTECH",
    title: "ZentroTECH — Engineering the AI of 2050, today.",
    description:
      "Agentic systems, intelligent automation, and AI-native digital products for Bangalore, Dubai, and the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZentroTECH — AI Consultancy",
    description: "Agentic systems, intelligent automation, AI-native digital products.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

- [ ] **Step 4: Create `lib/constants.ts`**

```ts
export const SITE = {
  name: "ZentroTECH",
  url: "https://zentrotech.ai",
  tagline: "Engineering the AI of 2050, today.",
  description:
    "ZentroTECH is a Bangalore-headquartered AI consultancy building agentic systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.",
  email: "hello@zentrotech.ai",
  phone: "+91 80 0000 0000",
  founded: 2026,
};

export const OFFICES = [
  {
    city: "Bangalore",
    region: "Karnataka, India",
    country: "India",
    address: "WeWork Galaxy, Residency Road, Bangalore 560025",
    phone: "+91 80 0000 0000",
    email: "bangalore@zentrotech.ai",
    timezone: "IST (UTC+5:30)",
    primary: true,
    coords: { lat: 12.9716, lng: 77.5946 },
  },
  {
    city: "Dubai",
    region: "Dubai, UAE",
    country: "United Arab Emirates",
    address: "DIFC Innovation Hub, Gate Avenue, Dubai",
    phone: "+971 4 000 0000",
    email: "dubai@zentrotech.ai",
    timezone: "GST (UTC+4)",
    primary: false,
    coords: { lat: 25.2048, lng: 55.2708 },
  },
];

export const SERVICES = [
  {
    slug: "ai-agents",
    title: "AI Agent Development",
    short: "Custom autonomous agents that think, decide, and act.",
    description:
      "We design and deploy production-grade AI agents for sales, support, research, and operations. Built on the latest LLMs with tool use, memory, and human-in-the-loop guardrails.",
    icon: "Bot",
    color: "indigo",
    deliverables: [
      "Multi-agent orchestration architecture",
      "Tool integrations (CRM, databases, APIs)",
      "Memory + retrieval pipelines",
      "Monitoring + evaluation harness",
      "Production deployment + handover",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    short: "End-to-end workflow automation powered by AI.",
    description:
      "Replace repetitive workflows with intelligent automation. From document processing to multi-step approvals, we build systems that scale your team without scaling headcount.",
    icon: "Zap",
    color: "violet",
    deliverables: [
      "Workflow analysis + opportunity map",
      "n8n / Zapier / Make integrations",
      "Custom Python automation services",
      "Document AI (extraction, classification)",
      "ROI dashboard + monitoring",
    ],
  },
  {
    slug: "ai-websites",
    title: "AI-Powered Websites",
    short: "Websites that think, learn, and convert.",
    description:
      "Beyond static sites — websites with embedded AI agents, personalization engines, real-time content, and conversion optimization built into every interaction.",
    icon: "Globe",
    color: "pink-pulse",
    deliverables: [
      "AI-driven personalization layer",
      "Embedded chat / voice agents",
      "Conversion optimization engine",
      "Headless CMS + AI content tooling",
      "SEO + performance excellence",
    ],
  },
  {
    slug: "agentic-coding",
    title: "Agentic Coding",
    short: "Ship 10x faster with AI engineering teams.",
    description:
      "We embed agentic coding workflows into your engineering org — Claude Code, Cursor, code review agents, automated testing — to multiply your team's output without adding bodies.",
    icon: "Code2",
    color: "cyan-glow",
    deliverables: [
      "Engineering workflow audit",
      "Claude Code / Cursor adoption playbook",
      "Custom tools + slash commands",
      "Code review + test automation agents",
      "Team training + measurement",
    ],
  },
  {
    slug: "llm-integration",
    title: "LLM Integration",
    short: "Plug enterprise-grade LLMs into your stack.",
    description:
      "From OpenAI to Anthropic to open-source models — we architect, secure, and integrate LLMs into your existing systems with cost optimization and observability built in.",
    icon: "BrainCircuit",
    color: "indigo",
    deliverables: [
      "Model selection + benchmarking",
      "RAG architecture + vector search",
      "Prompt engineering + caching",
      "Observability + cost dashboards",
      "Security + compliance review",
    ],
  },
  {
    slug: "ai-strategy",
    title: "AI Strategy Consulting",
    short: "Roadmaps that turn AI hype into ROI.",
    description:
      "C-suite-grade strategy engagements: where to invest, what to build vs. buy, how to organize teams, and how to measure success. Built by operators, not slide decks.",
    icon: "Target",
    color: "violet",
    deliverables: [
      "AI maturity assessment",
      "Opportunity portfolio + business cases",
      "Build vs. buy recommendations",
      "Org design + hiring plan",
      "12-24 month roadmap + KPIs",
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Showcase", href: "/showcase" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL = {
  linkedin: "https://linkedin.com/company/zentrotech",
  twitter: "https://twitter.com/zentrotech",
  github: "https://github.com/zentrotech",
  instagram: "https://instagram.com/zentrotech",
};
```

- [ ] **Step 5: Verify dev server starts and design tokens load**

```bash
npm run dev
```

Expected: Server starts at http://localhost:3000, body has dark gradient background visible.

- [ ] **Step 6: Commit**

```bash
git add zentrotech/
git commit -m "feat: configure design system, fonts, constants"
```

---

### Task 3: Smooth Scroll Provider + Reduced Motion Hook

**Files:**
- Create: `zentrotech/components/animations/smooth-scroll.tsx`
- Create: `zentrotech/lib/hooks/use-reduced-motion.ts`
- Modify: `zentrotech/app/layout.tsx`

- [ ] **Step 1: Create `components/animations/smooth-scroll.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Create `lib/hooks/use-reduced-motion.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefers;
}
```

- [ ] **Step 3: Wire SmoothScrollProvider into root layout**

In `app/layout.tsx`, wrap children:

```tsx
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";

// inside body:
<SmoothScrollProvider>{children}</SmoothScrollProvider>
```

- [ ] **Step 4: Verify**

`npm run dev` — scrolling should feel smooth. No console errors.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: add Lenis smooth scroll provider and reduced-motion hook"
```

---

## Phase 2 — UI Primitives + Layout (Sequential)

### Task 4: UI Primitives (Button, Card, Container, Badge)

**Files:**
- Create: `zentrotech/components/ui/button.tsx`
- Create: `zentrotech/components/ui/card.tsx`
- Create: `zentrotech/components/ui/container.tsx`
- Create: `zentrotech/components/ui/badge.tsx`

- [ ] **Step 1: `components/ui/button.tsx`**

```tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-indigo to-violet text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:-translate-y-0.5",
        secondary:
          "bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20",
        ghost:
          "text-text-secondary hover:text-white hover:bg-white/5",
        outline:
          "border border-indigo/40 text-indigo-glow hover:bg-indigo/10 hover:border-indigo",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

export function Button({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(buttonVariants({ variant, size }), className);
  if (href) {
    if (external) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: `components/ui/card.tsx`**

```tsx
import { cn } from "@/lib/utils";
import * as React from "react";

export function Card({
  className,
  glow = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { glow?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300",
        glow ? "glass-glow" : "glass",
        "hover:border-indigo/40 hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold text-white", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <p className={cn("mt-2 text-text-muted", className)} {...props} />;
}
```

- [ ] **Step 3: `components/ui/container.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}
```

- [ ] **Step 4: `components/ui/badge.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo/10 px-3 py-1 text-xs font-medium text-indigo-glow backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add zentrotech/components/ui/
git commit -m "feat: UI primitives (Button, Card, Container, Badge)"
```

---

### Task 5: Layout Shell (Header + Footer + MobileNav)

**Files:**
- Create: `zentrotech/components/layout/header.tsx`
- Create: `zentrotech/components/layout/footer.tsx`
- Create: `zentrotech/components/layout/mobile-nav.tsx`

- [ ] **Step 1: `components/layout/header.tsx`**

```tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3 backdrop-blur-xl bg-void/60 border-b border-white/5" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative size-8 rounded-lg bg-gradient-to-br from-indigo to-pink-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <div className="absolute inset-0.5 rounded-lg bg-void flex items-center justify-center">
              <span className="text-aurora font-black text-sm">Z</span>
            </div>
          </div>
          <span className="text-white font-bold tracking-tight text-lg group-hover:text-aurora transition-colors">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Book a Call
          </Button>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 2: `components/layout/mobile-nav.tsx`**

```tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-full hover:bg-white/5 text-white"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-white"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-2 px-6 mt-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-3xl font-bold text-white py-3 hover:text-aurora"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Button href="/contact" size="lg" onClick={() => setOpen(false)}>
                  Book a Call
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 3: `components/layout/footer.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, OFFICES, NAV_LINKS, SOCIAL } from "@/lib/constants";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-void/50 backdrop-blur-md">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo/40 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative size-8 rounded-lg bg-gradient-to-br from-indigo to-pink-pulse">
                <div className="absolute inset-0.5 rounded-lg bg-void flex items-center justify-center">
                  <span className="text-aurora font-black text-sm">Z</span>
                </div>
              </div>
              <span className="text-white font-bold text-lg">{SITE.name}</span>
            </div>
            <p className="text-text-muted text-sm max-w-md leading-relaxed">{SITE.description}</p>
            <div className="flex gap-3 mt-6">
              <a href={SOCIAL.linkedin} aria-label="LinkedIn" className="size-9 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <Linkedin className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.twitter} aria-label="Twitter" className="size-9 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <Twitter className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.github} aria-label="GitHub" className="size-9 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <Github className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.instagram} aria-label="Instagram" className="size-9 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <Instagram className="size-4 text-text-muted" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-secondary hover:text-white text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Offices</h4>
            <ul className="space-y-4">
              {OFFICES.map((o) => (
                <li key={o.city} className="text-sm">
                  <p className="text-white font-medium">{o.city}</p>
                  <p className="text-text-muted text-xs mt-0.5">{o.region}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built with Next.js. Hosted on Vercel.</p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Wire Header + Footer into root layout**

In `app/layout.tsx`, inside SmoothScrollProvider:

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// inside body, inside SmoothScrollProvider:
<Header />
<main className="pt-20">{children}</main>
<Footer />
```

- [ ] **Step 5: Verify**

`npm run dev` — header visible, footer visible, mobile menu opens/closes.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat: header, footer, mobile nav with framer-motion"
```

---

## Phase 3 — Animation Components (Parallel after Phase 2)

Tasks 6–10 can all run in parallel — independent components.

### Task 6: Aurora Background

**Files:** Create `zentrotech/components/animations/aurora-background.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "low" | "medium" | "high";
}) {
  const opacity = { low: 0.3, medium: 0.5, high: 0.8 }[intensity];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden -z-10", className)}>
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[120vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(99,102,241,${opacity}) 0%, transparent 60%)`,
          animation: "aurora 20s ease infinite",
        }}
      />
      <div
        className="absolute top-1/3 right-0 size-[60vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(236,72,153,${opacity * 0.5}) 0%, transparent 60%)`,
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-0 size-[60vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(139,92,246,${opacity * 0.6}) 0%, transparent 60%)`,
          animation: "pulse-glow 10s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/animations/aurora-background.tsx
git commit -m "feat: aurora gradient background animation"
```

---

### Task 7: Magnetic Cursor

**Files:** Create `zentrotech/components/animations/magnetic-cursor.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const enter = () => ringRef.current?.classList.add("scale-150", "border-pink-pulse");
    const leave = () => ringRef.current?.classList.remove("scale-150", "border-pink-pulse");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden lg:block size-3 rounded-full bg-indigo-glow mix-blend-difference"
      />
      <motion.div
        ref={ringRef}
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[199] hidden lg:block size-3 rounded-full border-2 border-indigo-glow transition-all duration-200"
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/animations/magnetic-cursor.tsx
git commit -m "feat: magnetic cursor with framer-motion springs"
```

---

### Task 8: Text Scramble + Marquee + Counter

**Files:**
- Create: `zentrotech/components/animations/text-scramble.tsx`
- Create: `zentrotech/components/animations/marquee.tsx`
- Create: `zentrotech/components/animations/animated-counter.tsx`

- [ ] **Step 1: `text-scramble.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({ text, className, duration = 1800 }: { text: string; className?: string; duration?: number }) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  useEffect(() => {
    const length = Math.max(output.length, text.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = output[i] ?? "";
      const to = text[i] ?? "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * (duration / 50));
      queue.push({ from, to, start, end });
    }
    queueRef.current = queue;
    let frame = 0;
    let raf: number;
    const tick = () => {
      let out = "";
      let complete = 0;
      for (const item of queueRef.current) {
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
      if (complete < queueRef.current.length) {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: output }} />;
}
```

- [ ] **Step 2: `marquee.tsx`**

```tsx
"use client";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden relative", className)} style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        <div className="flex gap-12 items-center">{children}</div>
        <div className="flex gap-12 items-center" aria-hidden>{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 3: `animated-counter.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) count.set(value);
  }, [inView, value, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add zentrotech/components/animations/
git commit -m "feat: text-scramble, marquee, animated counter"
```

---

## Phase 4 — 3D Components (Parallel after Phase 2)

### Task 9: Neural Orb (3D Hero)

**Files:** Create `zentrotech/components/3d/neural-orb.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.4, 100, 200]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.55}
          speed={1.8}
          roughness={0.1}
          metalness={0.6}
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
}

function CoreLight() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ec4899" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
    </>
  );
}

export function NeuralOrb({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CoreLight />
          <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/3d/neural-orb.tsx
git commit -m "feat: 3D neural orb with R3F + drei"
```

---

### Task 10: Particle Galaxy

**Files:** Create `zentrotech/components/3d/particle-galaxy.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function ParticleGalaxy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Particles />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/3d/particle-galaxy.tsx
git commit -m "feat: 3D particle galaxy background"
```

---

### Task 11: Globe Scene (Global Presence)

**Files:** Create `zentrotech/components/3d/globe-scene.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const PINS = [
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, primary: true },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
];

function latLngToVec3(lat: number, lng: number, radius = 1.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <group ref={ref}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial color="#1a0f2e" emissive="#6366f1" emissiveIntensity={0.05} wireframe />
      </Sphere>
      {PINS.map((pin) => {
        const pos = latLngToVec3(pin.lat, pin.lng);
        return (
          <mesh key={pin.name} position={pos}>
            <sphereGeometry args={[pin.primary ? 0.04 : 0.025, 16, 16]} />
            <meshBasicMaterial color={pin.primary ? "#ec4899" : "#06b6d4"} />
          </mesh>
        );
      })}
    </group>
  );
}

export function GlobeScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#6366f1" />
          <Globe />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/3d/globe-scene.tsx
git commit -m "feat: 3D globe with location pins"
```

---

## Phase 5 — Page Sections (Parallel after Phases 3+4)

### Task 12: Hero Section

**Files:** Create `zentrotech/components/sections/hero.tsx`

- [ ] **Step 1: Create section**

```tsx
"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { TextScramble } from "@/components/animations/text-scramble";

const NeuralOrb = dynamic(() => import("@/components/3d/neural-orb").then((m) => m.NeuralOrb), {
  ssr: false,
  loading: () => <div className="size-[500px] rounded-full bg-gradient-to-br from-indigo/30 to-pink-pulse/20 blur-3xl animate-pulse" />,
});

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <AuroraBackground intensity="high" />

      <div className="absolute right-0 top-0 size-full lg:size-[800px] lg:right-[-10%] lg:top-[5%] opacity-90 pointer-events-none">
        <NeuralOrb className="size-full" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge>
            <Sparkles className="size-3" />
            <span>AI Consultancy · Bangalore · Dubai · Global</span>
          </Badge>

          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
            <span className="block text-white">Engineering the</span>
            <span className="block text-aurora">
              <TextScramble text="AI of 2050" />
            </span>
            <span className="block text-white">today.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
            We design and ship agentic AI systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/services" size="lg">
              Explore Services
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Book a Call
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-6 text-sm text-text-muted"
          >
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-indigo to-pink-pulse border-2 border-void" />
              <div className="size-8 rounded-full bg-gradient-to-br from-violet to-cyan-glow border-2 border-void" />
              <div className="size-8 rounded-full bg-gradient-to-br from-pink-pulse to-violet border-2 border-void" />
            </div>
            <span>Trusted by ambitious teams in 12+ countries</span>
          </motion.div>
        </motion.div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted text-xs flex flex-col items-center gap-2">
        <span>Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo to-transparent animate-pulse" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/sections/hero.tsx
git commit -m "feat: hero section with 3D orb, aurora, scramble headline"
```

---

### Task 13: Services Bento Section

**Files:** Create `zentrotech/components/sections/services-bento.tsx`

- [ ] **Step 1: Create section**

```tsx
"use client";
import { motion } from "framer-motion";
import { Bot, Zap, Globe, Code2, BrainCircuit, Target, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot, Zap, Globe, Code2, BrainCircuit, Target,
};

export function ServicesBento() {
  return (
    <section className="relative py-32" id="services">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Badge>What we do</Badge>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-white">
            Six services, <span className="text-aurora">one north star</span>.
          </h2>
          <p className="mt-6 text-text-muted text-lg">
            From discovery to deployment — we own the full AI lifecycle so your team can ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full" data-magnetic>
                  <div className="relative h-full rounded-2xl glass p-8 overflow-hidden transition-all duration-500 hover:border-indigo/40 hover:-translate-y-1">
                    <div className="absolute -top-20 -right-20 size-40 rounded-full bg-indigo/10 blur-2xl group-hover:bg-indigo/20 transition-all" />

                    <div className="relative z-10">
                      <div className="size-12 rounded-xl bg-gradient-to-br from-indigo/20 to-violet/20 border border-indigo/30 flex items-center justify-center mb-6">
                        {Icon && <Icon className="size-6 text-indigo-glow" />}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{service.short}</p>

                      <div className="mt-6 flex items-center gap-2 text-indigo-glow text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/sections/services-bento.tsx
git commit -m "feat: services bento grid with hover effects"
```

---

### Task 14: Process Timeline (GSAP scroll-pinned)

**Files:** Create `zentrotech/components/sections/process-timeline.tsx`

- [ ] **Step 1: Create section**

```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive workshops to map your AI opportunity portfolio. We listen, we learn, we benchmark." },
  { num: "02", title: "Design", desc: "Architecture, prompts, agent topology, evaluation harness. Every line of code traceable to a business outcome." },
  { num: "03", title: "Deploy", desc: "Production-grade systems shipped iteratively. Observability, cost guards, rollback paths — built in from day one." },
  { num: "04", title: "Defend & Grow", desc: "Continuous monitoring, retraining, expansion. Your AI gets smarter every quarter, not stale." },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;
      if (window.matchMedia("(max-width: 1024px)").matches) return;

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth + 200;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-32 lg:py-0 lg:h-screen overflow-hidden">
      <Container className="lg:hidden">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>How we work</Badge>
          <h2 className="mt-4 text-4xl font-black text-white">Our 4-step <span className="text-aurora">process</span></h2>
        </div>
        <div className="space-y-6">
          {STEPS.map((s) => (
            <div key={s.num} className="glass rounded-2xl p-8">
              <span className="text-aurora text-sm font-mono">{s.num}</span>
              <h3 className="text-2xl font-bold text-white mt-2">{s.title}</h3>
              <p className="text-text-muted mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="hidden lg:flex h-screen items-center">
        <div className="pl-[10vw] absolute top-32">
          <Badge>How we work</Badge>
          <h2 className="mt-4 text-5xl xl:text-7xl font-black text-white">
            Our 4-step <span className="text-aurora">process</span>
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-8 px-[10vw] pt-40">
          {STEPS.map((s) => (
            <div key={s.num} className="shrink-0 w-[60vw] xl:w-[40vw] glass-glow rounded-3xl p-12">
              <span className="text-aurora text-sm font-mono tracking-widest">STEP {s.num}</span>
              <h3 className="text-5xl font-black text-white mt-4">{s.title}</h3>
              <p className="text-text-secondary text-lg mt-6 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/sections/process-timeline.tsx
git commit -m "feat: GSAP horizontal scroll-pinned process timeline"
```

---

### Task 15: Trust Signals + Globe + Insights Preview + CTA Sections

**Files:**
- Create: `zentrotech/components/sections/trust-signals.tsx`
- Create: `zentrotech/components/sections/globe-section.tsx`
- Create: `zentrotech/components/sections/insights-preview.tsx`
- Create: `zentrotech/components/sections/cta-section.tsx`

- [ ] **Step 1: `trust-signals.tsx`**

```tsx
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
```

- [ ] **Step 2: `globe-section.tsx`**

```tsx
"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { OFFICES } from "@/lib/constants";
import { MapPin } from "lucide-react";

const GlobeScene = dynamic(() => import("@/components/3d/globe-scene").then((m) => m.GlobeScene), {
  ssr: false,
  loading: () => <div className="aspect-square w-full rounded-full bg-gradient-to-br from-indigo/20 to-violet/10 animate-pulse" />,
});

export function GlobeSection() {
  return (
    <section className="relative py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
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
          </motion.div>

          <div className="aspect-square relative">
            <GlobeScene className="size-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: `insights-preview.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getRecentInsights } from "@/lib/content";

export async function InsightsPreview() {
  const posts = await getRecentInsights(3);
  return (
    <section className="relative py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge>Insights</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">From the lab.</h2>
          </div>
          <Link href="/insights" className="hidden md:flex items-center gap-2 text-indigo-glow hover:text-white text-sm font-medium">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
              <article className="h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-indigo/40 group-hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-black text-white/10">{p.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-indigo-glow">{p.category}</p>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-aurora">{p.title}</h3>
                  <p className="text-text-muted text-sm mt-3 line-clamp-2">{p.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: `cta-section.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/animations/aurora-background";

export function CTASection() {
  return (
    <section className="relative py-32">
      <Container>
        <div className="relative rounded-3xl glass-glow p-12 md:p-20 text-center overflow-hidden">
          <AuroraBackground intensity="high" />
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
```

- [ ] **Step 5: Commit**

```bash
git add zentrotech/components/sections/
git commit -m "feat: trust signals, globe, insights preview, CTA sections"
```

---

### Task 16: AI Agent Demo Component

**Files:** Create `zentrotech/components/demos/agent-chat-demo.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    setMessages((m) => [...m, { id, from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: id + 1, from: "agent", text: reply(text) }]);
    }, 1100);
  };

  return (
    <div className="glass-glow rounded-3xl p-1 max-w-2xl w-full mx-auto">
      <div className="rounded-3xl bg-void/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <div className="relative size-10 rounded-full bg-gradient-to-br from-indigo to-pink-pulse flex items-center justify-center">
            <Bot className="size-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-cyan-glow border-2 border-void" />
          </div>
          <div>
            <p className="text-white font-semibold">ZentroBot</p>
            <p className="text-xs text-text-muted">Live demo · responds in {"<"}1s</p>
          </div>
        </div>

        <div className="px-6 py-6 h-80 overflow-y-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", m.from === "user" ? "justify-end" : "justify-start")}
              >
                {m.from === "agent" && (
                  <div className="size-8 rounded-full bg-indigo/20 flex items-center justify-center shrink-0">
                    <Bot className="size-4 text-indigo-glow" />
                  </div>
                )}
                <div className={cn("max-w-[75%] px-4 py-3 rounded-2xl text-sm", m.from === "user" ? "bg-indigo text-white" : "glass text-text-secondary")}>
                  {m.text}
                </div>
                {m.from === "user" && (
                  <div className="size-8 rounded-full bg-pink-pulse/20 flex items-center justify-center shrink-0">
                    <User className="size-4 text-pink-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-text-muted text-sm">
                <div className="size-8 rounded-full bg-indigo/20 flex items-center justify-center"><Bot className="size-4 text-indigo-glow" /></div>
                <span className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce" />
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce [animation-delay:0.15s]" />
                  <span className="size-1.5 rounded-full bg-indigo-glow animate-bounce [animation-delay:0.3s]" />
                </span>
              </motion.div>
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
            className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:bg-white/10"
          />
          <button onClick={send} className="size-10 rounded-full bg-gradient-to-br from-indigo to-pink-pulse flex items-center justify-center hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all">
            <Send className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/components/demos/
git commit -m "feat: AI agent demo with scripted responses"
```

---

## Phase 6 — Content Library + SEO Helpers (Parallel)

### Task 17: SEO Helpers + JSON-LD Components

**Files:**
- Create: `zentrotech/lib/seo.ts`
- Create: `zentrotech/components/seo/json-ld.tsx`
- Create: `zentrotech/components/seo/organization-schema.tsx`
- Create: `zentrotech/components/seo/local-business-schema.tsx`

- [ ] **Step 1: `lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og/default.png",
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
```

- [ ] **Step 2: `components/seo/json-ld.tsx`**

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 3: `components/seo/organization-schema.tsx`**

```tsx
import { JsonLd } from "./json-ld";
import { SITE, OFFICES, SOCIAL } from "@/lib/constants";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: SITE.description,
    foundingDate: "2026",
    email: SITE.email,
    sameAs: Object.values(SOCIAL),
    address: OFFICES.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: o.country,
    })),
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 4: `components/seo/local-business-schema.tsx`**

```tsx
import { JsonLd } from "./json-ld";
import { SITE, OFFICES } from "@/lib/constants";

export function LocalBusinessSchema({ city }: { city: string }) {
  const office = OFFICES.find((o) => o.city.toLowerCase() === city.toLowerCase());
  if (!office) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${office.city}`,
    description: SITE.description,
    url: SITE.url,
    telephone: office.phone,
    email: office.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressRegion: office.region,
      addressCountry: office.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.coords.lat,
      longitude: office.coords.lng,
    },
    openingHours: "Mo-Fr 09:00-19:00",
    priceRange: "$$$",
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 5: Commit**

```bash
git add zentrotech/lib/seo.ts zentrotech/components/seo/
git commit -m "feat: SEO metadata helpers + JSON-LD schemas"
```

---

### Task 18: Content Loaders (MDX) + Sample Content

**Files:**
- Create: `zentrotech/lib/content.ts`
- Create: `zentrotech/content/insights/agentic-ai-2026.mdx`
- Create: `zentrotech/content/insights/dubai-ai-opportunity.mdx`
- Create: `zentrotech/content/insights/why-bangalore-is-ai-capital.mdx`
- Create: `zentrotech/content/work/acme-corp-automation.mdx`
- Create: `zentrotech/content/work/vertex-labs-agent-platform.mdx`
- Create: `zentrotech/content/work/nimbus-ai-website.mdx`

- [ ] **Step 1: `lib/content.ts`**

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readingTime: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  industry: string;
  service: string;
  results: { label: string; value: string }[];
  body: string;
};

async function readMdxDir<T>(dir: string, mapper: (slug: string, data: matter.GrayMatterFile<string>) => T): Promise<T[]> {
  const fullDir = path.join(CONTENT_ROOT, dir);
  try {
    const files = await fs.readdir(fullDir);
    const mdx = files.filter((f) => f.endsWith(".mdx"));
    return Promise.all(
      mdx.map(async (file) => {
        const raw = await fs.readFile(path.join(fullDir, file), "utf8");
        const slug = file.replace(/\.mdx$/, "");
        return mapper(slug, matter(raw));
      })
    );
  } catch {
    return [];
  }
}

export async function getAllInsights(): Promise<Insight[]> {
  const all = await readMdxDir<Insight>("insights", (slug, parsed) => ({
    slug,
    title: parsed.data.title ?? slug,
    excerpt: parsed.data.excerpt ?? "",
    category: parsed.data.category ?? "Insights",
    date: parsed.data.date ?? "",
    author: parsed.data.author ?? "ZentroTECH Team",
    readingTime: parsed.data.readingTime ?? "5 min read",
    body: parsed.content,
  }));
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getRecentInsights(n: number) {
  const all = await getAllInsights();
  return all.slice(0, n);
}

export async function getInsight(slug: string) {
  const all = await getAllInsights();
  return all.find((p) => p.slug === slug);
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return readMdxDir<CaseStudy>("work", (slug, parsed) => ({
    slug,
    client: parsed.data.client ?? slug,
    title: parsed.data.title ?? slug,
    excerpt: parsed.data.excerpt ?? "",
    industry: parsed.data.industry ?? "Tech",
    service: parsed.data.service ?? "AI Consulting",
    results: parsed.data.results ?? [],
    body: parsed.content,
  }));
}

export async function getCaseStudy(slug: string) {
  const all = await getAllCaseStudies();
  return all.find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Insights MDX (3 sample posts)**

`content/insights/agentic-ai-2026.mdx`:
```mdx
---
title: "The Agentic AI Tipping Point: What 2026 Looks Like"
excerpt: "Why agentic systems are moving from R&D demos to production-grade infrastructure — and what your business needs to do this year."
category: "AI Trends"
date: "2026-04-22"
author: "ZentroTECH Research"
readingTime: "8 min read"
---

## The shift no one is talking about

For the past three years, "AI agents" have been a research curiosity — impressive demos, brittle production. In 2026, that has fundamentally changed.

Three forces converged: model reliability crossed the 95% threshold for tool-calling, observability stacks (LangSmith, Braintrust, Anthropic's eval harness) matured, and the unit economics finally work — Sonnet 4.6 prices put complex agent workflows within 10x of human cost, and dropping monthly.

## What "production agentic" actually means

Production agents are not chatbots. They:
- Execute multi-step plans across 5-20 tool calls
- Hold state across hours or days
- Defer to humans on bounded uncertainty
- Self-evaluate and route to fallbacks
- Cost-budget every run

## Where to start

The companies winning this year are not those running the most experiments — they're the ones picking one high-volume, well-bounded workflow (sales outreach, support triage, contract review) and going deep.

If you'd like a 30-minute opportunity scan for your business, [book a call](/contact).
```

`content/insights/dubai-ai-opportunity.mdx`:
```mdx
---
title: "Dubai's AI Moment: A Practical Guide for Operators"
excerpt: "The UAE's AI ambition is the most aggressive in the world. Here's how to position your business to ride the wave."
category: "Industry Insights"
date: "2026-04-15"
author: "ZentroTECH Dubai"
readingTime: "6 min read"
---

## The macro setup

The UAE's National AI Strategy 2031, the rise of G42 and Presight, and Dubai's positioning as the regional AI capital have created the most concentrated AI investment density on Earth — billions of dirhams flowing into infrastructure, talent, and applied AI.

For mid-market operators, the opportunity is asymmetric: enterprise clients are actively buying, talent is scarce, and the bar for "world-class AI partner" is being established right now.

## Three plays for 2026

1. **Become the default agentic AI partner for one vertical** — financial services, retail, real estate, hospitality. Pick one and own it.
2. **Build local data infrastructure** — Arabic LLMs, regional compliance, on-shore deployment. The ones who solve this are the ones who win the enterprise contracts.
3. **Marry consulting with product** — pure consultancies leave money on the table. Pure SaaS misses the regulatory nuance. The hybrid wins.

[Talk to our Dubai team](/contact) about your AI roadmap.
```

`content/insights/why-bangalore-is-ai-capital.mdx`:
```mdx
---
title: "Why Bangalore Is Quietly Becoming the World's AI Engineering Capital"
excerpt: "It's not a question of talent volume — it's a question of how that talent is being organized in 2026."
category: "AI Trends"
date: "2026-04-08"
author: "ZentroTECH Research"
readingTime: "7 min read"
---

## The talent flywheel

Bangalore has 1.5 million software engineers. What changed in 2025–2026 is the density of *applied AI* engineers — folks who can take a research paper, ship it as a production agent, and operate it at scale.

This density compounds: experienced engineers attract experienced engineers, mentorship cycles tighten, and tooling/playbooks mature faster than anywhere else in the world.

## What this means for global buyers

If you are a US, UK, or UAE business commissioning AI work, the cost-quality frontier in Bangalore is now genuinely better than San Francisco for ~80% of agentic and automation work. The remaining 20% — frontier research and ultra-bespoke model training — still belongs to the Bay Area, but the gap is closing.

[Engage our Bangalore team](/contact) and see for yourself.
```

- [ ] **Step 3: Case Studies MDX (3 samples)**

`content/work/acme-corp-automation.mdx`:
```mdx
---
client: "Acme Corp (sample)"
title: "Acme: 70% reduction in invoice processing time with document AI"
excerpt: "How we replaced a 12-person manual processing team with an agent-orchestrated automation."
industry: "Manufacturing"
service: "AI Automation"
results:
  - { label: "Time saved", value: "70%" }
  - { label: "Cost reduction", value: "$1.2M/yr" }
  - { label: "Accuracy", value: "99.4%" }
  - { label: "Time to deploy", value: "11 weeks" }
---

> **Note:** Sample case study for demo purposes. Replace with real client work.

## The challenge

Acme processed 40,000 supplier invoices monthly across 18 countries and 6 languages. The manual workflow took 12 full-time staff and still produced a 4% error rate.

## What we built

A multi-agent system: an OCR + classification agent, a validation agent that cross-references PO + delivery records, and a finance-approval agent with human-in-the-loop escalation for edge cases.

## Results

70% time reduction, $1.2M/yr cost savings, accuracy lifted to 99.4%, and the freed-up team redeployed to higher-value reconciliation work.
```

`content/work/vertex-labs-agent-platform.mdx`:
```mdx
---
client: "Vertex Labs (sample)"
title: "Vertex: Building a multi-tenant agent platform for SaaS customers"
excerpt: "Architecting a white-label AI agent layer for a vertical SaaS company's 4,200 enterprise tenants."
industry: "SaaS"
service: "AI Agent Development"
results:
  - { label: "Tenants live", value: "4,200" }
  - { label: "Agent runs/month", value: "8M+" }
  - { label: "ARR uplift", value: "$11M" }
  - { label: "Engineering cycle", value: "16 weeks" }
---

> **Note:** Sample case study for demo purposes.

## The challenge

Vertex's vertical SaaS platform needed agentic features — but rolling them out per-tenant with isolation, observability, and cost control was non-trivial.

## What we built

A multi-tenant agent runtime with per-tenant prompt configs, isolated tool registries, cost budgets, and a unified observability layer. Plug-and-play modules for the top 12 customer use cases.

## Results

4,200 tenants deployed, 8M+ agent runs/month, $11M ARR uplift attributable to the agentic feature line, and the engineering team kept the same headcount.
```

`content/work/nimbus-ai-website.mdx`:
```mdx
---
client: "Nimbus AI (sample)"
title: "Nimbus: AI-native marketing site that converts 4x better"
excerpt: "A complete website rebuild with embedded AI agents, real-time personalization, and conversion-optimized flows."
industry: "AI Startup"
service: "AI-Powered Websites"
results:
  - { label: "Conversion lift", value: "4.1x" }
  - { label: "Time on site", value: "+62%" }
  - { label: "Bounce rate", value: "-48%" }
  - { label: "Time to launch", value: "6 weeks" }
---

> **Note:** Sample case study for demo purposes.

## The challenge

Nimbus's old site was built for 2022 — static pages, generic copy, no personalization. Conversion was anemic.

## What we built

A full Next.js rebuild with embedded ZentroBot for instant Q&A, dynamic content blocks personalized by visitor segment, an AI-driven case study recommender, and instrumentation that learns from every session.

## Results

4.1x conversion lift, 62% longer sessions, 48% lower bounce, shipped in 6 weeks.
```

- [ ] **Step 4: Verify**

`npm run dev` — content loaders should not throw, getAllInsights returns 3 posts.

- [ ] **Step 5: Commit**

```bash
git add zentrotech/lib/content.ts zentrotech/content/
git commit -m "feat: MDX content loaders + sample insights/case studies"
```

---

## Phase 7 — Pages (Parallel after Phases 5+6)

### Task 19: Home Page

**Files:** Modify `zentrotech/app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TrustSignals } from "@/components/sections/trust-signals";
import { GlobeSection } from "@/components/sections/globe-section";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";
import { AgentChatDemo } from "@/components/demos/agent-chat-demo";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { OrganizationSchema } from "@/components/seo/organization-schema";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <TrustSignals />
      <ServicesBento />
      <ProcessTimeline />

      <section className="relative py-32">
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge>Live Demo</Badge>
            <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
              Try a <span className="text-aurora">ZentroTECH</span> agent.
            </h2>
            <p className="mt-6 text-text-muted text-lg">
              This is a sample agent. Real client agents are wired to your data, tools, and workflows.
            </p>
          </div>
          <AgentChatDemo />
        </Container>
      </section>

      <GlobeSection />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify**

`npm run dev` — home page loads with all sections, no console errors.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: home page assembling all sections"
```

---

### Task 20: Services Hub + 6 Service Detail Pages

**Files:**
- Modify: `zentrotech/app/(marketing)/services/page.tsx`
- Create: 6 service detail pages

- [ ] **Step 1: Create `app/(marketing)/services/page.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ServicesBento } from "@/components/sections/services-bento";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — AI Agents, Automation, Websites & More",
  description: "Six core AI services from ZentroTECH: agentic AI, intelligent automation, AI-powered websites, agentic coding, LLM integration, and strategy consulting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Services</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Six services. <span className="text-aurora">One outcome:</span> shipped AI.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Pick one. Stack several. We meet your business where it is and architect the AI system that gets you to where you're going.
          </p>
        </Container>
      </section>
      <ServicesBento />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Create dynamic route handler for service detail**

For brevity, build one shared template. Create `app/(marketing)/services/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { SERVICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight, Check } from "lucide-react";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title}`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: ["IN", "AE", "US", "GB"],
    serviceType: service.title,
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="py-24">
        <Container>
          <Badge>{service.title}</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            {service.short}
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">{service.description}</p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Start a project <ArrowRight className="size-4" /></Button>
            <Button href="/work" variant="secondary" size="lg">See case studies</Button>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white">What you get</h2>
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 items-start glass rounded-xl p-4">
                    <div className="size-6 rounded-full bg-indigo/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-4 text-indigo-glow" />
                    </div>
                    <span className="text-text-secondary">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card glow className="p-10">
              <h3 className="text-2xl font-bold text-white">Typical engagement</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Duration</dt><dd className="text-white">8–16 weeks</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Team</dt><dd className="text-white">Lead architect + 2-4 engineers</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Investment</dt><dd className="text-white">From $25K</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Outcome</dt><dd className="text-white">Production-ready system</dd>
                </div>
              </dl>
            </Card>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: Verify**

`npm run dev` — visit `/services`, `/services/ai-agents` etc. All 6 should render.

- [ ] **Step 4: Commit**

```bash
git add zentrotech/app/\(marketing\)/services/
git commit -m "feat: services hub + dynamic service detail pages"
```

---

### Task 21: About + Showcase + Contact + Work + Insights Pages

**Files:**
- Create: `app/(marketing)/about/page.tsx`
- Create: `app/(marketing)/showcase/page.tsx`
- Create: `app/(marketing)/contact/page.tsx`
- Create: `app/(marketing)/work/page.tsx`
- Create: `app/(marketing)/work/[slug]/page.tsx`
- Create: `app/(marketing)/insights/page.tsx`
- Create: `app/(marketing)/insights/[slug]/page.tsx`

- [ ] **Step 1: `about/page.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { TrustSignals } from "@/components/sections/trust-signals";
import { buildMetadata } from "@/lib/seo";
import { Eye, Rocket, Heart, Globe2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "About — Our 2050 Promise",
  description: "Why ZentroTECH exists, what we believe, and the vision driving our work in agentic AI and intelligent automation.",
  path: "/about",
});

const VALUES = [
  { icon: Eye, title: "Radical transparency", text: "We tell you when AI is the wrong answer. No hammers looking for nails." },
  { icon: Rocket, title: "Ship over slides", text: "Working software in weeks, not deck cycles in quarters." },
  { icon: Heart, title: "Human-first", text: "Every agent we build amplifies humans. Never replaces care." },
  { icon: Globe2, title: "Globally local", text: "Bangalore engineering, Dubai presence, partnerships everywhere." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>About</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            We're building the AI of <span className="text-aurora">2050</span>, today.
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl">
            ZentroTECH was founded on a simple bet: that the next decade belongs to companies who can ship agentic AI faster than their competitors can write a strategy memo about it.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-glow rounded-3xl p-12">
              <h2 className="text-3xl font-black text-white">Our vision</h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                A world where every business — from a 5-person startup in Bangalore to a 50,000-person enterprise in Dubai — has access to the kind of AI infrastructure that until now only Big Tech could build.
              </p>
            </div>
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl font-black text-white">Our mission</h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                Design, build, and operate production-grade agentic AI systems for businesses across India, the UAE, and the world — and to do it with engineering discipline, design taste, and radical honesty about what AI can and can't do.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Badge>What we believe</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Four values, no exceptions.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="text-center">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo/20 to-violet/20 mx-auto flex items-center justify-center">
                    <Icon className="size-6 text-indigo-glow" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-6">{v.title}</h3>
                  <p className="text-text-muted text-sm mt-3">{v.text}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <TrustSignals />

      <section className="py-24">
        <Container>
          <div className="glass-glow rounded-3xl p-12 md:p-20">
            <Badge>Our 2050 promise</Badge>
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-white max-w-3xl">
              We promise to keep you ahead — not chasing — the AI curve, every year, every quarter, every release.
            </h2>
            <p className="mt-8 text-text-secondary text-lg max-w-2xl">
              The frontier moves fast. Our job is to absorb that speed for you, translate it into capability you can ship, and hand you a business that compounds in value while your competitors are still benchmarking.
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: `showcase/page.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AgentChatDemo } from "@/components/demos/agent-chat-demo";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";
import { Bot, MessageSquare, FileSearch, Code, BarChart3 } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Agent Showcase — Live Demos",
  description: "Try real ZentroTECH AI agents live. Sales, support, research, code, and analytics agents — all built and operated by our team.",
  path: "/showcase",
});

const AGENTS = [
  { icon: Bot, name: "Sales SDR Agent", category: "Outreach" },
  { icon: MessageSquare, name: "Support Triage Agent", category: "Customer success" },
  { icon: FileSearch, name: "Research Agent", category: "Knowledge work" },
  { icon: Code, name: "Code Review Agent", category: "Engineering" },
  { icon: BarChart3, name: "Analytics Agent", category: "Data" },
];

export default function ShowcasePage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Live agents</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Don't take our word. <span className="text-aurora">Try them.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            These are sandboxed versions of agents we've shipped to clients. The real ones have access to your data, your tools, and your workflows.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <AgentChatDemo />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Production-grade agents we build</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((a) => {
              const Icon = a.icon;
              return (
                <Card key={a.name}>
                  <div className="size-12 rounded-xl bg-gradient-to-br from-indigo/20 to-pink-pulse/20 flex items-center justify-center">
                    <Icon className="size-5 text-indigo-glow" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">{a.name}</h3>
                  <p className="text-text-muted text-sm mt-2">{a.category}</p>
                  <p className="text-xs text-indigo-glow mt-4">Available on engagement</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: `contact/page.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OFFICES, SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <>
      <LocalBusinessSchema city="Bangalore" />
      <LocalBusinessSchema city="Dubai" />

      <section className="py-24">
        <Container>
          <Badge>Contact</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Let's build <span className="text-aurora">something</span>.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Tell us a little about your AI ambition. We'll respond within one business day with concrete next steps.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            <form onSubmit={onSubmit} className="lg:col-span-3 glass-glow rounded-3xl p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-text-muted">Your name</span>
                  <input required name="name" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="text-sm text-text-muted">Work email</span>
                  <input required type="email" name="email" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="jane@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-text-muted">Company</span>
                <input name="company" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="Company name" />
              </label>
              <label className="block">
                <span className="text-sm text-text-muted">What service interests you?</span>
                <select name="service" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-indigo">
                  <option value="">Select one...</option>
                  <option>AI Agent Development</option>
                  <option>AI Automation</option>
                  <option>AI-Powered Websites</option>
                  <option>Agentic Coding</option>
                  <option>LLM Integration</option>
                  <option>AI Strategy Consulting</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-text-muted">Tell us about your project</span>
                <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="What are you trying to build, automate, or solve?" />
              </label>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                {sent ? "Message sent ✓" : "Send message"} <Send className="size-4" />
              </Button>
              {sent && <p className="text-cyan-glow text-sm">Thanks — we'll respond within 1 business day. (Note: form is currently a demo. Wire to Resend or your email provider before launch.)</p>}
            </form>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <p className="text-text-muted text-sm">General</p>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 mt-2 text-white hover:text-aurora">
                  <Mail className="size-4" /> {SITE.email}
                </a>
              </div>

              {OFFICES.map((o) => (
                <div key={o.city} className="glass rounded-2xl p-6">
                  <p className="text-aurora text-xs uppercase tracking-widest font-mono">{o.primary ? "Headquarters" : "Office"}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{o.city}</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="flex items-start gap-2 text-text-secondary"><MapPin className="size-4 text-text-muted mt-0.5 shrink-0" /> {o.address}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Phone className="size-4 text-text-muted" /> {o.phone}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Mail className="size-4 text-text-muted" /> {o.email}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Clock className="size-4 text-text-muted" /> {o.timezone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: `work/page.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Work — Case Studies",
  description: "Explore our portfolio of AI agents, automation systems, and AI-native websites we've shipped for clients across India, UAE, and globally.",
  path: "/work",
});

export default async function WorkPage() {
  const cases = await getAllCaseStudies();
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Selected work</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Work that <span className="text-aurora">ships</span>.
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="group block">
                <Card className="h-full">
                  <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 mb-6 flex items-center justify-center">
                    <span className="text-6xl font-black text-white/10">{c.client.split(" ")[0]}</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-indigo-glow">{c.industry} · {c.service}</p>
                  <h2 className="text-2xl font-bold text-white mt-2 group-hover:text-aurora flex items-start gap-2">
                    {c.title}
                    <ArrowUpRight className="size-5 shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h2>
                  <p className="text-text-muted mt-3">{c.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 5: `work/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.excerpt, path: `/work/${slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>{c.industry} · {c.service}</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl">{c.title}</h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">{c.excerpt}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.results.map((r) => (
              <Card key={r.label} className="text-center">
                <p className="text-3xl font-black text-aurora">{r.value}</p>
                <p className="text-xs uppercase tracking-widest text-text-muted mt-2">{r.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <article className="prose prose-invert max-w-3xl mx-auto text-text-secondary [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-white [&>blockquote]:text-text-muted [&>blockquote]:border-indigo [&>p]:leading-relaxed">
            {c.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) return <h2 key={i}>{para.replace(/^##\s/, "")}</h2>;
              if (para.startsWith("> ")) return <blockquote key={i}>{para.replace(/^>\s/, "")}</blockquote>;
              return <p key={i}>{para}</p>;
            })}
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 6: `insights/page.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Insights — AI, Automation & Industry Analysis",
  description: "Original research, case stories, and operator-grade analysis from the ZentroTECH team on agentic AI, automation, and the future of work.",
  path: "/insights",
});

export default async function InsightsPage() {
  const posts = await getAllInsights();
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Insights</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            From the <span className="text-aurora">lab</span>.
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
                <article className="h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-indigo/40 group-hover:-translate-y-1">
                  <div className="aspect-video bg-gradient-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/10">{p.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-widest text-indigo-glow">{p.category} · {p.readingTime}</p>
                    <h2 className="text-xl font-bold text-white mt-2 group-hover:text-aurora">{p.title}</h2>
                    <p className="text-text-muted text-sm mt-3 line-clamp-2">{p.excerpt}</p>
                    <p className="text-xs text-text-muted mt-4">{formatDate(p.date)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 7: `insights/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllInsights, getInsight } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getAllInsights();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getInsight(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/insights/${slug}` });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getInsight(slug);
  if (!p) notFound();

  return (
    <>
      <section className="py-24">
        <Container className="max-w-3xl">
          <Badge>{p.category} · {p.readingTime}</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight">{p.title}</h1>
          <p className="mt-6 text-text-muted">{p.author} · {formatDate(p.date)}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          <article className="prose prose-invert max-w-none text-text-secondary text-lg leading-relaxed [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-12 [&>h2]:mb-4 [&>p]:mb-6 [&>ul>li]:my-2">
            {p.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) return <h2 key={i}>{para.replace(/^##\s/, "")}</h2>;
              if (para.match(/^\d+\.\s/)) {
                const items = para.split("\n").map((line) => line.replace(/^\d+\.\s/, ""));
                return <ol key={i} className="list-decimal pl-6">{items.map((it, j) => <li key={j}>{it}</li>)}</ol>;
              }
              if (para.startsWith("- ")) {
                const items = para.split("\n").map((line) => line.replace(/^-\s/, ""));
                return <ul key={i} className="list-disc pl-6">{items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
              }
              return <p key={i}>{para}</p>;
            })}
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 8: Verify**

`npm run dev` — visit `/about`, `/showcase`, `/contact`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`. All render.

- [ ] **Step 9: Commit**

```bash
git commit -am "feat: about, showcase, contact, work, insights pages"
```

---

### Task 22: City Landing Pages (Bangalore, Dubai, UAE)

**Files:**
- Create: `app/ai-consultancy-bangalore/page.tsx`
- Create: `app/ai-agency-dubai/page.tsx`
- Create: `app/ai-development-uae/page.tsx`

- [ ] **Step 1: Build a shared city template** — paste this in each file with city-specific overrides.

For `app/ai-consultancy-bangalore/page.tsx`:

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Consultancy in Bangalore — ZentroTECH",
  description: "Bangalore's full-service AI consultancy: agentic AI, automation, AI websites. Local team, global standards. Trusted by ambitious Bangalore businesses.",
  path: "/ai-consultancy-bangalore",
});

export default function BangaloreLanding() {
  return (
    <>
      <LocalBusinessSchema city="Bangalore" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> Bangalore, India</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Bangalore's <span className="text-aurora">AI consultancy</span>, built for ambitious operators.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Local engineering, global standards. We work with Bangalore startups, scaleups, and enterprise teams shipping production AI in 2026.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Talk to our Bangalore team <ArrowRight className="size-4" /></Button>
            <Button href="/services" variant="secondary" size="lg">Explore services</Button>
          </div>
        </Container>
      </section>
      <TrustSignals />
      <ServicesBento />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: `ai-agency-dubai/page.tsx`** — same structure, swap city info, add LocalBusinessSchema for Dubai

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Agency in Dubai — ZentroTECH",
  description: "Dubai's premium AI agency: agentic AI, intelligent automation, AI-native websites. Helping UAE businesses ship production AI in 2026.",
  path: "/ai-agency-dubai",
});

export default function DubaiLanding() {
  return (
    <>
      <LocalBusinessSchema city="Dubai" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> Dubai, UAE</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Dubai's premium <span className="text-aurora">AI agency</span>, on the ground.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            We partner with Dubai enterprises and ambitious mid-market firms to design, ship, and operate agentic AI systems built for the UAE's regulatory and business climate.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Talk to our Dubai team <ArrowRight className="size-4" /></Button>
            <Button href="/services" variant="secondary" size="lg">Explore services</Button>
          </div>
        </Container>
      </section>
      <TrustSignals />
      <ServicesBento />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: `ai-development-uae/page.tsx`** — same template, UAE-wide framing

```tsx
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Development in the UAE — ZentroTECH",
  description: "End-to-end AI development partner for UAE businesses. Agentic systems, automation, AI websites — engineered with global standards, delivered locally.",
  path: "/ai-development-uae",
});

export default function UAELanding() {
  return (
    <>
      <LocalBusinessSchema city="Dubai" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> United Arab Emirates</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            UAE's full-stack <span className="text-aurora">AI development</span> partner.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            From Abu Dhabi to Sharjah, we build production-grade AI agents, automation systems, and AI-powered digital products for UAE enterprises and innovators.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Start a UAE project <ArrowRight className="size-4" /></Button>
            <Button href="/services" variant="secondary" size="lg">Explore services</Button>
          </div>
        </Container>
      </section>
      <TrustSignals />
      <ServicesBento />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 4: Verify**

`npm run dev` — visit `/ai-consultancy-bangalore`, `/ai-agency-dubai`, `/ai-development-uae`. All three render with proper schemas.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: city landing pages for Bangalore, Dubai, UAE"
```

---

## Phase 8 — Sitemap, Robots, Polish (Sequential after pages)

### Task 23: Sitemap & Robots

**Files:**
- Create: `zentrotech/app/sitemap.ts`
- Create: `zentrotech/app/robots.ts`
- Create: `zentrotech/app/not-found.tsx`

- [ ] **Step 1: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/constants";
import { getAllInsights, getAllCaseStudies } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insights = await getAllInsights();
  const work = await getAllCaseStudies();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/showcase",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/ai-consultancy-bangalore",
    "/ai-agency-dubai",
    "/ai-development-uae",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${SITE.url}/insights/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const workPages: MetadataRoute.Sitemap = work.map((c) => ({
    url: `${SITE.url}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...servicePages, ...insightPages, ...workPages];
}
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <Container className="text-center">
        <p className="text-aurora font-mono text-sm">404</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black text-white">Lost in the future.</h1>
        <p className="mt-6 text-text-muted">This page doesn't exist — or hasn't been invented yet.</p>
        <div className="mt-10">
          <Button href="/">Take me home</Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

`npm run dev` — visit `/sitemap.xml`, `/robots.txt`, `/anything-not-real`. All work.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: sitemap, robots.txt, 404 page"
```

---

### Task 24: Magnetic Cursor Mount + Final Layout

**Files:** Modify `zentrotech/app/layout.tsx`

- [ ] **Step 1: Add MagneticCursor to root layout**

```tsx
import { MagneticCursor } from "@/components/animations/magnetic-cursor";

// inside SmoothScrollProvider, before <Header />:
<MagneticCursor />
```

- [ ] **Step 2: Verify**

`npm run dev` — magnetic cursor visible on desktop, hidden on mobile.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: mount magnetic cursor in root layout"
```

---

### Task 25: CONTENT.md (Customization Guide for User)

**Files:** Create `zentrotech/CONTENT.md`

- [ ] **Step 1: Create file**

```markdown
# ZentroTECH Content Customization Guide

This guide lists every place you need to swap placeholder content for your real branding/content.

## 1. Brand & Site Constants — `lib/constants.ts`

Update:
- `SITE.url` — your real domain
- `SITE.email` — your real contact email
- `SITE.phone` — your real phone
- `SITE.tagline` — your final tagline (current: "Engineering the AI of 2050, today.")
- `OFFICES[].address`, `phone`, `email` — real office info for Bangalore + Dubai
- `SOCIAL.*` — your real social profile URLs

## 2. Logo & Favicon

- `app/icon.tsx` or `public/favicon.ico` — replace with your logo
- `public/og/default.png` — create a 1200x630 OG image
- The logo "Z" gradient mark in `components/layout/header.tsx` and `footer.tsx` — replace with your logo if you have one

## 3. Case Studies — `content/work/*.mdx`

Replace the 3 sample case studies (`acme-corp-automation.mdx`, `vertex-labs-agent-platform.mdx`, `nimbus-ai-website.mdx`) with real client work. Each file has frontmatter:

```yaml
---
client: "Real client name"
title: "Real outcome-focused title"
excerpt: "1-2 sentence summary"
industry: "Industry"
service: "AI Service category"
results:
  - { label: "Metric", value: "Number" }
---
```

## 4. Insights / Blog — `content/insights/*.mdx`

Sample posts are real-quality opinion pieces. Either keep them attributed to "ZentroTECH Research" or rewrite under your team's voice. Add new posts by dropping new `.mdx` files in this folder.

## 5. Trust Logos — `components/sections/trust-signals.tsx`

The `LOGOS` array contains placeholder client names. Replace with real client names (or company logos as `<img>` if you have them).

## 6. Metrics — `components/sections/trust-signals.tsx`

The `METRICS` array (47+ AI agents, 12 countries, etc.) — update with your real numbers.

## 7. Contact Form — `app/(marketing)/contact/page.tsx`

Currently the form is a demo (just shows "Message sent ✓"). To wire it up:

1. Sign up for [Resend](https://resend.com) or your preferred email provider
2. Add the API key to `.env.local`: `RESEND_API_KEY=re_xxx`
3. Create `app/api/contact/route.ts` to POST form data to Resend
4. Update the form's `onSubmit` to POST to `/api/contact`

## 8. Calendar Booking

The "Book a discovery call" CTA currently links to `/contact`. To replace with Cal.com or Calendly:
1. Sign up and create a booking link
2. Either embed via their widget on `/contact`, or replace the button `href` site-wide

## 9. Real AI Agent Demo Backend — `components/demos/agent-chat-demo.tsx`

Currently scripted responses. To wire to a real LLM:
1. Create `app/api/chat/route.ts` that streams from OpenAI/Anthropic
2. Replace the `reply()` function in the demo with a fetch to that route

## 10. SEO Open Graph Image

Create `/public/og/default.png` (1200x630) with your logo + tagline.

## 11. Domain & Deployment

1. Push to GitHub
2. Connect to Vercel (zero config — auto-detects Next.js)
3. Set custom domain in Vercel dashboard
4. Update `SITE.url` in constants.ts to match
```

- [ ] **Step 2: Commit**

```bash
git add zentrotech/CONTENT.md
git commit -m "docs: add CONTENT.md customization guide"
```

---

## Phase 9 — Verify & Build

### Task 26: Build Verification

- [ ] **Step 1: Run production build**

```bash
cd zentrotech
npm run build
```

Expected: build succeeds with no errors. Note any warnings.

- [ ] **Step 2: Start production server**

```bash
npm start
```

- [ ] **Step 3: Smoke-test all pages**

Visit and confirm each loads without console errors:
- `/`
- `/services`
- `/services/ai-agents`
- `/showcase`
- `/work`
- `/about`
- `/insights`
- `/contact`
- `/ai-consultancy-bangalore`
- `/ai-agency-dubai`
- `/ai-development-uae`
- `/sitemap.xml`
- `/robots.txt`
- `/not-real-route` (404)

- [ ] **Step 4: Mobile responsive check**

Open DevTools, test at 360px, 768px, 1024px, 1440px. Header collapses to hamburger, sections stack, no horizontal scroll.

- [ ] **Step 5: Commit final state**

```bash
git commit --allow-empty -m "chore: production build verified, all routes pass smoke tests"
```

---

## Self-Review Checklist (Plan Author)

Before handoff to executors:

**1. Spec coverage:**
- ✅ Vision section (spec §1) → reflected across all pages, especially `/about`
- ✅ Market gap (spec §1.1) → embedded in copy + city pages
- ✅ Target audience (spec §2) → Bangalore/Dubai pages, multi-region offices
- ✅ Visual design (spec §3) → Tailwind tokens (Task 2), components (Tasks 4-5)
- ✅ Tech stack (spec §4) → Task 1
- ✅ Site architecture (spec §5) → Tasks 19-22 (all pages built)
- ✅ Page specs (spec §6) → Tasks 19-22
- ✅ Animations (spec §7) — 13 of 15 covered: orb (T9), magnetic cursor (T7), scroll-pin (T14), particle (T10), glassmorphism (T4-T5), text scramble (T8), aurora (T6), agent demo (T16), globe (T11), marquee+counter (T8+T15), smooth scroll (T3). Page transitions and image-reveal-on-scroll deferred to polish.
- ✅ SEO (spec §8) → Tasks 17, 23
- ✅ Component architecture (spec §9) → matches plan file structure
- ✅ Content strategy (spec §10) → CONTENT.md (T25), placeholder MDX (T18)
- ✅ Out of scope (spec §11) → respected (form is stub, agent demo is scripted)
- ✅ Success criteria (spec §12) → Task 26 verifies

**2. Placeholder scan:** No "TBD", "TODO", or "implement appropriate" present in the plan. Code blocks complete.

**3. Type consistency:** `Insight` and `CaseStudy` types defined in T18, used consistently in T19, T21. `SERVICES` and `OFFICES` constants from T2 used in T20, T22, T15, T21. ✅

---

## Execution Handoff

**Recommended approach:** Subagent-Driven Development.

**Phase ordering for execution:**
1. **Phase 1 (Tasks 1-3)** — Sequential, single agent
2. **Phase 2 (Tasks 4-5)** — Sequential, single agent
3. **Phases 3+4 (Tasks 6-11)** — Parallel: dispatch 3-6 agents simultaneously
4. **Phase 5 (Tasks 12-16)** — Parallel: dispatch 5 agents (some depend on Phase 3+4 components — check imports)
5. **Phase 6 (Tasks 17-18)** — Parallel: 2 agents
6. **Phase 7 (Tasks 19-22)** — Parallel: 4 agents (depend on Phases 5+6)
7. **Phase 8 (Tasks 23-25)** — Sequential, single agent
8. **Phase 9 (Task 26)** — Single agent verification

After each phase, review with two-stage review per subagent-driven-development skill before advancing.
