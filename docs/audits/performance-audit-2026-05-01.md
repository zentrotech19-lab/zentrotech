# Performance Audit — ZentroTECH (2026-05-01)

Auditor: senior web performance engineer
Build: `next build` against Next.js 16.2.4 (Turbopack), React 19.2.4
Source: `c:\Antigravity\TEMP projects\Zentro\zentrotech\`

## Predicted Lighthouse Scores (mobile, slow 4G)
- Performance: **38/100**
- Accessibility: **88/100**
- Best Practices: **92/100**
- SEO: **96/100**

The Performance score is constrained by an oversized JS first-load on every route (~700–852 kB *uncompressed*), a permanent fixed-position WebGL canvas in the hero (NeuralOrb), Lenis smooth scrolling, a ScrollTrigger-pinned timeline, and three `framer-motion` mount points above the fold. Accessibility is solid (semantic HTML, `aria-label` on icon buttons, `prefers-reduced-motion` honoured) but loses points for low colour contrast on `text-text-muted` (#9ca3af on #0a0a0f passes, but on translucent glass cards it edges below AA in places). SEO benefits from `next/font`, full metadata, JSON-LD schemas (`OrganizationSchema`, `LocalBusinessSchema`), `sitemap.ts`, `robots.ts`.

## Bundle Analysis

Source: `.next/diagnostics/route-bundle-stats.json` (uncompressed first-load JS bytes). Note: Next 16's terminal output now omits per-route sizes, but the diagnostic JSON has them.

| Route | First Load JS (uncompressed) | Status |
|---|---|---|
| `/` (home) | **852,124 B / ~832 kB** | OVER budget |
| `/ai-agency-dubai` | 720,768 B / ~704 kB | OVER budget |
| `/ai-consultancy-bangalore` | 720,768 B / ~704 kB | OVER budget |
| `/ai-development-uae` | 720,768 B / ~704 kB | OVER budget |
| `/about` | 716,285 B / ~700 kB | OVER budget |
| `/contact` | 711,149 B / ~694 kB | OVER budget |
| `/showcase` | 709,865 B / ~693 kB | OVER budget |
| `/services` | 709,327 B / ~693 kB | OVER budget |
| `/insights`, `/insights/[slug]`, `/services/[slug]`, `/work`, `/work/[slug]` | 704,647 B / ~688 kB | OVER budget |
| `/_not-found` | 703,549 B / ~687 kB | OVER budget |

Every route is **3–4× the 200 kB First Load JS budget**. Even after gzip (~30% of uncompressed for typical JS), we're looking at ~210–250 kB transferred for the home page — still above the 170 kB Lighthouse threshold.

Heaviest individual chunks in `.next/static/chunks/`:
- `11~9cjn1m6nd5.js` — **893,260 B** — three.js + @react-three/fiber + @react-three/drei (`MeshDistortMaterial`, `OrbitControls`, `Stars`, `Float`). Confirmed lazy — does NOT appear in any route's first-load chunk list. Good.
- `0n~dq4kpx9xxx.js` — **227,537 B** — likely framer-motion + page module. Present in EVERY route's first load.
- `0257pdz1-imal.js` — **149,533 B** — React/Next runtime, present in every route.
- `0-b6zo2yhb9-6.js` — **125,936 B** — likely Lenis + GSAP + ScrollTrigger (`registerPlugin` markers found here). Present in every route.
- `0xwcuef8tfnjn.js` — **120,169 B** — shared layout chunk (Header/Footer, lucide icons).
- `0d3shmwh5_nmn.js` — **54,646 B**, `0tszvp5wpnn-t.js` — **50,234 B** — webpack/turbopack chunks.
- `0q71gap.vujir.css` — **46,638 B** — Tailwind v4 CSS bundle.

The home route's extra ~140 kB over other routes (852 kB vs ~705 kB baseline) is the home-only chunk `0iy.ehxn29ppe.js` is NOT in `/` but `0n~dq4kpx9xxx.js` only is (which is the AgentChatDemo + Hero stack with framer-motion variants).

## Critical Performance Issues

1. **GSAP + ScrollTrigger loaded on EVERY route, even when unused** — `components/sections/process-timeline.tsx:1-11` registers ScrollTrigger globally and pulls in GSAP (~70 kB min). The component is only mounted on `/`, but because it's a client component imported synchronously by `app/page.tsx`, GSAP ends up in the shared client bundle (chunk `0-b6zo2yhb9-6.js`, 125 kB). Other routes pay this cost too because Lenis (in `SmoothScrollProvider` from `app/layout.tsx`) also lives in the shared chunk. **Fix:** dynamic-import `ProcessTimeline` with `ssr: false` and a static fallback; ProcessTimeline is below the fold on `/` and gated to desktop anyway.

2. **Framer Motion is the single largest non-3D dep on first load (~120 kB gzipped)** — used pervasively (`hero.tsx`, `services-bento.tsx`, `globe-section.tsx`, `header.tsx`, `mobile-nav.tsx`, `aurora-background.tsx`, `process-timeline.tsx` indirectly, `agent-chat-demo.tsx`, `text-scramble.tsx`, `magnetic-cursor.tsx`). Hero alone uses two `motion.div` for fade-up — replaceable with a 4-line CSS keyframe. **Fix:** import from `framer-motion/m` (mini-bundle) with `LazyMotion` + `domAnimation`/`domMax` feature loader. Saves 50–80 kB on first load.

3. **`MagneticCursor` and `SmoothScrollProvider` mount on every page in `app/layout.tsx:58–63`** — both are `"use client"`, both run on every navigation, MagneticCursor wires `mousemove` listeners + `querySelectorAll("a, button, [data-magnetic]")` on every render and re-runs on every route. Lenis sets up `requestAnimationFrame` permanently. On low-end Android Lenis can cost 4–6 ms per frame. **Fix:** gate Lenis behind a CSS media query for `(min-width: 768px) and (pointer: fine)` and add an idle-callback guard; cursor already self-gates with `(pointer: coarse)` but should also `return null` on the server-rendered tree to avoid two extra `motion.div` nodes for touch users.

4. **`text-scramble.tsx` runs in the H1 of the hero — main-thread cost during LCP** — re-renders text characters on a `setInterval`/`requestAnimationFrame`, blocking paint of the LCP element. Moving the scrambled effect to start AFTER LCP (post-load `requestIdleCallback`) would meaningfully cut LCP.

5. **No `next/image` anywhere** — confirmed via grep (zero `from "next/image"` imports, zero `<img` tags). Site is gradient/CSS-only which is great for raw weight, but means there's no `priority` hint for any LCP element. The LCP candidate is the hero H1 text — render-blocked behind the fonts and the framer-motion mount. **Fix:** add `display: "swap"` and `preload: true` explicitly to `Geist`/`Geist_Mono` calls.

6. **Unused heavy deps still in `package.json`** — `react-hook-form` (^7.74.0), `@hookform/resolvers` (^5.2.2), `zod` (^4.4.1), `next-mdx-remote` (^6.0.0) are declared but **never imported anywhere** (`grep` came back empty). They probably get tree-shaken from runtime, but they bloat lockfile, install time, and the Edge runtime cold-start. The contact form at `app/(marketing)/contact/page.tsx` reimplements form state with `useState`. Either wire RHF + Zod in or remove all four.

## Optimization Opportunities

1. **`lucide-react` v1.14.0 is incorrect.** Real Lucide React is at ~v0.5xx. v1.14.0 must be a typo or a forked package — verify `npm ls lucide-react`. If it really is the legacy 1.x line, every icon import pulls the whole library. Switch to current `lucide-react@latest` and use named imports (which it tree-shakes).
2. **`react-icons/fa6` in `footer.tsx`** — 4 icons (`FaLinkedinIn`, `FaXTwitter`, `FaGithub`, `FaInstagram`) pulls in the FA6 module path. Migrate to lucide equivalents (`Linkedin`, `Twitter`, `Github`, `Instagram`) so we drop the `react-icons` dep entirely.
3. **`gray-matter` is server-only** in `lib/content.ts`. Confirmed it doesn't ship to the client. Good.
4. **CSS bundle 46.6 kB** is reasonable for Tailwind v4. `globals.css` is ~120 lines and the noise SVG data-URI is the biggest non-utility item. Could move noise to a static SVG in `public/` and reference it instead — keeps it out of the critical CSS.
5. **NeuralOrb sphere geometry uses `args={[1.4, 100, 200]}`** — that's 100×200 = 20,000 vertices for a sphere that's blurred and mostly off-screen on mobile. Drop to `[1.4, 32, 32]` (~1,000 verts). Likewise `Stars count={1500}` → 500 on mobile.
6. **`dpr={[1, 1.5]}` on all three Canvases is good** — caps render resolution. Consider `dpr={[1, 1]}` for mobile.
7. **`OrbitControls autoRotate` on the GlobeScene runs `requestAnimationFrame` even when off-screen.** Pause via `IntersectionObserver` when the section isn't visible.

## What's Done Well
- 3D components dynamically imported with `ssr: false` and proper skeleton fallbacks (`hero.tsx:11–14`, `globe-section.tsx:9–12`). Confirmed three.js does NOT ship in any route's first-load chunk list.
- `process-timeline.tsx:27` correctly gates the GSAP pin behind `window.matchMedia("(max-width: 1024px)")` — desktop only, matches the plan.
- `prefers-reduced-motion` honoured in `globals.css:115` and `smooth-scroll.tsx:9`.
- All static routes (`○ (Static)`, `● (SSG)`) — 37 pages prerendered, no SSR runtime cost.
- `next/font/google` with `subsets: ["latin"]` (`app/layout.tsx:9–17`) — automatic preload + swap is on by default.
- No raw images — entire visual system is CSS gradients + WebGL. Eliminates IMG-related Lighthouse penalties.
- JSON-LD schemas, sitemap, robots all wired.

## Top 5 Fixes (ordered by impact)

1. **Dynamic-import `ProcessTimeline` and lazy-load GSAP/ScrollTrigger.** Saves ~70 kB from every route's first load and removes a 125 kB shared chunk from non-home routes. Wrap in `dynamic(() => import(...), { ssr: false })` and move `gsap.registerPlugin(ScrollTrigger)` inside the `useGSAP` callback.
2. **Switch to `LazyMotion` + `m` from `framer-motion`.** Replace top-level `import { motion } from "framer-motion"` with `import { m, LazyMotion, domAnimation } from "framer-motion"` and wrap `app/layout.tsx`. Saves 50–80 kB. Single largest first-load win.
3. **Remove unused deps** (`react-hook-form`, `@hookform/resolvers`, `zod`, `next-mdx-remote`) and replace `react-icons/fa6` with lucide. Verify `lucide-react` is the current version, not legacy v1.x.
4. **Gate `MagneticCursor` and `SmoothScrollProvider` behind capability checks before mount** (don't just early-return inside `useEffect` — return `null` from the component for `(pointer: coarse)` and `(prefers-reduced-motion: reduce)`).
5. **Defer `TextScramble` until after LCP** — render plain text first, swap to scrambled effect inside `requestIdleCallback` on the client. Should pull LCP from ~3.5 s down to ~2.0 s on Slow 4G.
