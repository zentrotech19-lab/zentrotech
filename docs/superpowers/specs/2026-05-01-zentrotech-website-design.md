# ZentroTECH — AI Consultancy Website Design Spec

**Date:** 2026-05-01
**Status:** Approved by user, ready for implementation planning
**Owner:** ZentroTECH (Bangalore HQ, expanding to Dubai and global)

## 1. Vision

ZentroTECH is a new AI consultancy company headquartered in Bangalore, India, with target markets in Dubai/UAE, USA, UK, and globally. The website must:

- Project a **2050-future aesthetic** (mind-blowing animations, premium feel)
- Establish **global credibility** to compete with G42, Fractal, GeekyAnts, Mrkhan Digital, JADA Squad
- Generate **inbound leads** via SEO (local Bangalore + global reach)
- Showcase services: AI Agent development, AI Automation, AI-Powered Websites, Agentic Coding, LLM Integration, AI Strategy Consulting

## 1.1 Market Gap & Positioning

Analysis of competitors reveals a clear gap ZentroTECH owns:

| Competitor | Strength | Weakness |
|---|---|---|
| Fractal / Mu Sigma | Enterprise scale, brand trust | Slow, expensive, not agentic-first |
| GeekyAnts | Strong design + engineering | Not AI-native positioning |
| Mrkhan Digital | Affordable, AI automation niche | Boutique scale, regional brand |
| Agentic India | Pure agentic AI focus | Narrow service line |
| G42 / Presight (UAE) | Govt-scale infrastructure | Inaccessible to SMBs |
| JADA Squad (UAE) | Agentic AI specialists | Regional only |

**The gap ZentroTECH fills:** The only AI consultancy combining (1) agentic-AI-first expertise, (2) full-service AI consultancy breadth, (3) SMB-accessible engagement model, AND (4) award-worthy global design + premium brand.

**Tagline candidates** (user can pick):
- "Engineering the AI of 2050, today."
- "Where agentic AI meets human imagination."
- "Future-built. Globally trusted."

**Positioning statement (used in meta + about page):** *ZentroTECH is a Bangalore-headquartered AI consultancy building agentic systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.*

This positioning must show through every page — copy, animations, and visual hierarchy.

## 2. Target Audience

| Segment | Region | What they care about |
|---|---|---|
| Mid-market businesses | Bangalore, India | Local trust, automation ROI, affordable expertise |
| Enterprise | Dubai/UAE, KSA | Premium feel, security, compliance, agentic AI |
| Tech startups | USA, UK | Cutting-edge, fast execution, AI-native team |
| SMBs | Global | Simple onboarding, clear pricing tier, demos |

## 3. Visual Design Direction

**Vibe:** Dark Glass / Indigo Futurism with vibrant accents (user-approved blend of options A + B + D from brainstorming).

**Color Palette:**
- `#0a0a0f` — Void Black (primary background)
- `#1a0f2e` — Deep Violet (secondary background)
- `#6366f1` — Indigo (primary brand)
- `#8b5cf6` — Violet (accent)
- `#ec4899` — Pink Pulse (CTA / highlight)
- `#06b6d4` — Cyan Glow (data / agent indicator)
- `#ffffff` / `#e5e7eb` — Text on dark
- `#9ca3af` — Subtle / muted text

**Typography:**
- Headings: Bold sans-serif (suggestion: **Geist** or **Inter Display** or **Satoshi**)
- Body: Modern sans (suggestion: **Inter** or **Geist Sans**)
- Mono accents: **JetBrains Mono** for code/AI demos

**Visual elements:**
- Aurora gradient mesh backgrounds
- Glassmorphism (frosted) cards
- Bento grid layouts for services & features
- Subtle noise/grain texture overlay
- Glowing accents on hover states

## 4. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Best-in-class SEO via SSR/SSG, React 19, image optimization |
| Language | **TypeScript** | Type safety for a long-lived production site |
| Styling | **Tailwind CSS v4** | Fast, design-system tokens, zero runtime |
| UI Animations | **Framer Motion** | Smooth React-native transitions, page morphs |
| Scroll Animations | **GSAP + ScrollTrigger** | Cinematic scroll-pinned scenes, the "magic" effect |
| Smooth Scroll | **Lenis** | Buttery scroll for premium feel |
| 3D / WebGL | **Three.js + React Three Fiber + drei** | Neural orb, particle galaxy, 3D globe |
| Icons | **Lucide React** | Clean, consistent icon set |
| Forms | **React Hook Form + Zod** | Validated contact form |
| SEO | **next-sitemap + JSON-LD schemas** | Sitemap + LocalBusiness/Organization/Service/FAQ |
| Analytics | **Vercel Analytics + Plausible** (optional) | Privacy-friendly tracking |
| Deployment | **Vercel** | Zero-config Next.js, edge network, global CDN |

## 5. Site Architecture

```
/                              → Home (cinematic single-scroll experience)
/services                      → Services overview
/services/ai-agents            → AI Agent development
/services/ai-automation        → Workflow automation
/services/ai-websites          → AI-powered websites
/services/agentic-coding       → Agentic coding services
/services/llm-integration      → LLM integration
/services/ai-strategy          → AI strategy consulting
/showcase                      → AI Agents Showcase (live demos)
/work                          → Case studies / portfolio
/work/[slug]                   → Individual case study
/about                         → Vision, mission, team, "Our 2050 promise"
/insights                      → Blog index
/insights/[slug]               → Blog post
/contact                       → Contact form + offices

# SEO landing pages
/ai-consultancy-bangalore      → Bangalore-focused landing
/ai-agency-dubai               → Dubai-focused landing
/ai-development-uae            → UAE-focused landing
```

## 6. Page-by-Page Specifications

### 6.1 Home (`/`)

**Hero section:**
- Full-viewport 3D neural network orb (Three.js / R3F), reactive to mouse position
- Headline: "We Build the AI Future." (or similar — placeholder, user can change)
- Sub-headline: One-line positioning
- Two CTAs: "Explore Services" (primary indigo) · "Book a Call" (ghost)
- Animated aurora gradient mesh in background
- Floating particle field

**Sections (single-scroll, GSAP-pinned):**
1. **What We Do** — Bento grid of 6 services with hover glow + icon animations
2. **Live AI Agent Demo** — Embedded chat agent visitor can interact with
3. **Our Process** — Horizontal scroll-pinned timeline (4 steps)
4. **Selected Work** — Marquee scroll of case study thumbnails
5. **Trust Signals** — Client logos marquee + key metrics counters (animated)
6. **Global Presence** — 3D rotating globe with Bangalore + Dubai pin highlights
7. **Insights Preview** — Latest 3 blog posts
8. **CTA Section** — "Ready to build?" with bold gradient background

### 6.2 Services Pages

Each service page follows the same template:
- Hero with service name + animated icon
- Problem statement
- Our approach (3-4 cards in glassmorphism)
- What you get (deliverables list)
- Tech we use (logo grid)
- Mini case study
- CTA → Contact

### 6.3 AI Agents Showcase (`/showcase`)

- Grid of agent demo cards
- Each card opens an interactive demo modal
- Categories: Sales agent, Support agent, Content agent, Code agent, Research agent
- "Try it now" inline experiences (basic chat UI; backend stubbed initially, can be wired to OpenAI/Anthropic later)

### 6.4 Work / Case Studies (`/work`)

- Filterable grid (by industry, by service)
- Hover reveals project mockup with magnetic cursor effect
- Individual case study pages: problem, approach, solution, results, gallery

### 6.5 About (`/about`)

- Vision: "Building the AI world of 2050, today"
- Mission statement
- Story / timeline
- Team section (placeholder for now, easy to fill later)
- Values: 4 cards
- "Our 2050 Promise" — distinctive futuristic manifesto block

### 6.6 Insights / Blog (`/insights`)

- Grid of blog post cards
- Categories: AI Trends, Case Studies, Tutorials, Industry Insights
- Individual posts: MDX-based for easy authoring
- Reading time, publish date, author
- Related posts at bottom

### 6.7 Contact (`/contact`)

- Two columns: contact form + office info
- Office cards: Bangalore HQ, Dubai office (placeholder address)
- Calendar booking embed (Cal.com or Calendly placeholder)
- Form: name, email, company, service interest (dropdown), message, budget (dropdown)
- Form submission → email via Resend (or similar) — implementation can stub initially
- WhatsApp / phone CTA

### 6.8 City Landing Pages

Identical structure, locally-optimized content + LocalBusiness schema for each city.

## 7. Animations Specification

| # | Animation | Where | Library |
|---|---|---|---|
| 1 | 3D neural network orb | Hero | R3F + drei |
| 2 | Magnetic cursor | Global, on interactive elements | Custom (Framer Motion) |
| 3 | Scroll-pinned scenes | Home process timeline | GSAP ScrollTrigger |
| 4 | Floating particle galaxy | Background of dark sections | R3F |
| 5 | Glassmorphism hover glow | All cards | CSS + Framer Motion |
| 6 | Page transitions | Between routes | Framer Motion + Next.js |
| 7 | Text scramble + typewriter | Headlines | Custom or use `react-type-animation` |
| 8 | Aurora gradient mesh | Hero, CTA backgrounds | CSS animated gradients |
| 9 | Live AI agent chat demo | Home + Showcase | Custom React component |
| 10 | 3D rotating globe | Global presence section | R3F + drei (`<Sphere />`) |
| 11 | Marquee scroll | Logos, work | Framer Motion `useAnimation` |
| 12 | Animated counters | Metrics | Framer Motion `useMotionValue` |
| 13 | Smooth scroll | Site-wide | Lenis |
| 14 | Image reveal on scroll | Case studies | Framer Motion `whileInView` |
| 15 | Hover button ripple | CTAs | CSS + Framer Motion |

**Performance budget:** Hero 3D scene must lazy-load and gracefully fallback to a static gradient on low-end devices. Respect `prefers-reduced-motion`.

## 8. SEO Strategy

**Technical SEO:**
- All pages server-rendered (Next.js App Router default)
- `metadata` exports per page (title, description, OG, Twitter)
- `app/sitemap.ts` auto-generated
- `app/robots.ts` configured
- Canonical URLs on all pages

**Structured data (JSON-LD):**
- `Organization` schema on every page
- `LocalBusiness` schema on `/contact` and city landing pages (one per city)
- `Service` schema on each service page
- `Article` schema on blog posts
- `FAQPage` schema in FAQ sections
- `BreadcrumbList` on inner pages

**Content SEO:**
- City landing pages: `/ai-consultancy-bangalore`, `/ai-agency-dubai`, `/ai-development-uae`
- Long-form blog posts targeting long-tail keywords (e.g., "how to deploy AI agents in retail")
- Internal linking strategy: services ↔ case studies ↔ blog posts
- Image alt text everywhere
- Semantic HTML (proper h1-h6 hierarchy)

**Performance (Core Web Vitals):**
- LCP < 2.5s (lazy-load 3D)
- CLS < 0.1 (reserve space for media)
- INP < 200ms (debounce scroll handlers)
- Image optimization via `next/image`
- Font subsetting via `next/font`

**Multi-language ready:**
- `i18n` routing prepared (English default, Arabic for Dubai market as future addition)

## 9. Component Architecture

```
app/
├── layout.tsx                 → Root layout, fonts, theme provider
├── page.tsx                   → Home
├── (marketing)/               → Marketing pages route group
│   ├── services/
│   ├── work/
│   ├── about/
│   ├── insights/
│   ├── showcase/
│   └── contact/
├── (city)/                    → City landing pages
│   ├── ai-consultancy-bangalore/
│   └── ai-agency-dubai/
├── sitemap.ts
└── robots.ts

components/
├── ui/                        → Reusable UI primitives (Button, Card, Input)
├── layout/                    → Header, Footer, Navigation
├── animations/                → MagneticCursor, TextScramble, AuroraBackground
├── 3d/                        → NeuralOrb, ParticleGalaxy, GlobeScene
├── sections/                  → Hero, Services, Process, Globe, CTA
├── seo/                       → JsonLd schemas
└── demos/                     → AI agent demo components

lib/
├── utils.ts
├── seo.ts                     → Metadata helpers
└── content.ts                 → MDX content loaders

content/
├── insights/                  → Blog posts as .mdx
└── work/                      → Case studies as .mdx

public/
├── fonts/
├── images/
└── og/                        → OG image templates
```

## 10. Content (Placeholder Strategy)

The user does not have final copy or branding yet. We'll ship with **professional placeholder content** that's coherent and on-brand, clearly marked where the user should customize:

- Company tagline + mission: AI-generated, on-brand, easy to swap
- Service descriptions: Written generically, ready to customize
- Case studies: 3-4 fictional but realistic placeholders (clearly labeled "Sample case study")
- Team: Placeholder profiles
- Logos: Use generic industry logos with note to swap

A `CONTENT.md` file at the repo root will list every place the user needs to fill in real content.

## 11. Out of Scope for This Sprint

To keep scope tight and ship fast, the following are deferred:

- Real backend for AI agent demos (use stubbed responses initially; OpenAI/Anthropic wiring later)
- Actual contact form email sending (use stub; wire Resend later)
- Real CMS (Sanity, Contentful) — using MDX files for blog/case studies
- Authentication / client portal
- Pricing page (mentioned in research but not requested)
- Multi-language Arabic translation (structure ready, content English-only initially)
- Cal.com / Calendly real integration (placeholder embed)
- E-commerce or paid courses
- Live chat widget (can add later)

## 12. Success Criteria

The site is ready to ship when:

1. ✅ All 7 page types render correctly with proper content
2. ✅ At least 5 of the 15 mind-blowing animations work smoothly (hero orb, scroll-pin, magnetic cursor, aurora, glassmorphism)
3. ✅ Lighthouse scores: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
4. ✅ Mobile responsive (all breakpoints: 360px, 768px, 1024px, 1440px+)
5. ✅ All meta tags + JSON-LD schemas validate
6. ✅ Sitemap + robots.txt generated
7. ✅ City landing pages live with LocalBusiness schema
8. ✅ Site deploys cleanly to Vercel
9. ✅ `prefers-reduced-motion` respected
10. ✅ `CONTENT.md` documents what user needs to customize

## 13. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| 3D animations slow on low-end devices | Detect device capability, fallback to static gradients |
| Bundle size bloat from Three.js | Code-split 3D scenes via dynamic imports |
| User has no real content | Ship with high-quality placeholders + CONTENT.md guide |
| SEO ranking takes months | Set expectation upfront; ship with technical SEO solid from day 1 |
| Animation feels overwhelming | Stagger reveals, respect reduced-motion, performance-test |
| Building all in one session is large scope | Break into clear phases; ship working MVP first, polish iteratively |

## 14. Next Steps

After spec approval:
1. Use `superpowers:writing-plans` skill to create a detailed step-by-step implementation plan
2. Plan will sequence the build into reviewable phases (scaffold → layout → home → services → other pages → animations → SEO → deploy)
3. Each phase will have its own verification checkpoint before moving on
