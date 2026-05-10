# Code Quality + Architecture Audit — ZentroTECH (2026-05-01)

## Overall Grade

**B-.** The codebase is small, well-organized, type-clean (`tsc --strict --noEmit` is silent), and shows good taste in directory structure (`ui/ layout/ animations/ 3d/ sections/ seo/ demos/`). Constants are centralized; SEO and metadata helpers are properly factored. However, ESLint surfaces 8 real errors — including 4 React 19 / Next 16 *correctness* violations (`react-hooks/purity`, `react-hooks/set-state-in-effect`) — the home-grown MDX renderer is fragile and silently drops markdown semantics, the contact form is a stub that resets state with `setTimeout`, several spec items are missing (FAQ/Article/Breadcrumb schemas, OG image, related posts, filterable work grid), there are zero tests, and one XSS vector exists in `text-scramble.tsx`. None of this is irrecoverable, but it should not ship as-is.

## Critical Bugs (must fix before launch)

1. **`components/animations/text-scramble.tsx:51` — XSS via `dangerouslySetInnerHTML` with unsanitized `text` prop.** The component injects `output` (built from `text` substrings interpolated into `<span>` HTML) into the DOM. Today `text` is a hard-coded `"AI of 2050"`, but the component is exported as a generic primitive, so any future caller passing user/CMS input opens a script-injection vector. **Fix:** render the chars as React nodes (array of `<span>`s) instead of an HTML string, or escape via a small `escapeHtml()` helper.

2. **`components/3d/particle-galaxy.tsx:13-15` — `Math.random()` called during render** inside `useMemo`. ESLint (React Hooks `react-hooks/purity`) errors out because under React 19 Strict/concurrent rendering the component may be invoked twice and produce two different particle clouds. **Fix:** seed with a stable PRNG, or move generation into a `useEffect` + `useState`, or wrap in `useEffect` that fills a `Float32Array` ref.

3. **`lib/hooks/use-reduced-motion.ts:9` — synchronous `setState` inside `useEffect`** (`react-hooks/set-state-in-effect` error). Causes an avoidable cascading render. **Fix:** use lazy initial state and `useSyncExternalStore` against `mq`, or read `mq.matches` once at mount via a ref-only path.

4. **`components/animations/text-scramble.tsx:6-49` — stale closure / race on `text` change.** Effect captures `output` at hook setup time (`Math.max(output.length, text.length)`) but then mutates `output` via `setOutput` inside the same effect — eslint disable masks the dependency bug. Rapid re-mounts also leave `frameRef` unused (warning) while `raf` is correctly cleaned up only on unmount, not on `text` change re-runs (the cancel happens, but the queue rewriting can interleave). **Fix:** derive `length` from `text` only, drop the unused `frameRef`, or rewrite using `requestAnimationFrame` driven by a `useRef` queue keyed to `text`.

5. **MDX renderer drops Markdown semantics** — `app/(marketing)/insights/[slug]/page.tsx:39-49` and `app/(marketing)/work/[slug]/page.tsx:52-56` split body on `\n\n` and pattern-match `## `, `- `, `1. `, `> ` only. The actual content uses `**bold**`, inline `` `code` ``, fenced ```` ``` ````, and Markdown links like `[book a call](/contact)` (visible in `agentic-ai-2026.mdx:29`, `how-to-deploy-ai-agents-in-production-safely.mdx:114`, plus 109 hits across insights). All of these render as literal text including the asterisks and brackets — so every "Book a call" CTA in every blog post is broken, and bold emphasis is lost. **Fix:** the project already depends on `next-mdx-remote@^6.0.0` — use it. `<MDXRemote source={p.body} components={{ a: Link, h2, ... }} />` replaces 30 lines of fragile regex with a real parser.

6. **`app/layout.tsx:54-66` — `<Header/>` wrapped in `<motion.header>` and `<MagneticCursor/>` are mounted globally as client components**, causing the entire layout to hydrate. Acceptable, but combined with `SmoothScrollProvider` running on every route there is no escape hatch for `prefers-reduced-motion` (Lenis check is correct, but `MagneticCursor` only checks `(pointer: coarse)`, not reduced motion). **Fix:** add `usePrefersReducedMotion()` short-circuit in `MagneticCursor` and `Header`'s motion wrapper.

7. **Contact form has no submission backend and lies to the user** — `app/(marketing)/contact/page.tsx:13-17`: `onSubmit` only `preventDefault`s, sets `sent=true` for 4 s, and then resets. The success message admits this in a parenthetical, but the form will report "sent" even when the user has filled in nothing meaningful. There is no rate-limiting, no honeypot, no CSRF protection, no email validation beyond `type="email"`, and `react-hook-form` + `zod` are installed but unused. **Fix:** wire to `app/api/contact/route.ts` with Resend + Zod validation + a hidden honeypot field; `react-hook-form`/`@hookform/resolvers` are already paid for in the bundle.

## Architectural Concerns

1. **Missing route group layout.** `app/(marketing)/` has no `layout.tsx`, so the route group adds zero value beyond URL grouping. Either delete the parens or add a marketing-specific layout (breadcrumbs, etc.) the spec hints at.

2. **City landings live at the app root, not under `(city)/`** as the spec §9 prescribes. Functional, but inconsistent with the documented architecture and harder to add city-shared chrome later.

3. **`Hero` over-mounts a client subtree** — most of `hero.tsx` is static markup; only `<TextScramble>`, the dynamically-imported `<NeuralOrb>`, and the framer wrapper actually need client. Could split into `hero-server.tsx` + a tiny `hero-animations.tsx` client child. Same pattern repeats in `cta-section.tsx` (no `"use client"` — good) vs. `services-bento.tsx` (`"use client"` only because of `motion.div`).

4. **No global error boundary or `error.tsx`.** If `getAllInsights()` throws (file system error, malformed frontmatter), the whole route 500s with the default Next overlay. Add `app/error.tsx` and per-segment `error.tsx` for `/insights` and `/work`.

5. **`MagneticCursor` queries `document.querySelectorAll("a, button, [data-magnetic]")` once on mount** (`magnetic-cursor.tsx:26`). Any `<Link>` rendered after mount (route changes, dynamic content, mobile-nav drawer) is invisible to the cursor. Because the listeners are also removed via the same fresh querySelectorAll on cleanup, elements that disappear leak listeners. Use event delegation on `document` with `event.target.closest("a, button, [data-magnetic]")`.

6. **`ProcessTimeline` GSAP setup uses `window.matchMedia` once** at mount (`process-timeline.tsx:27`); resizing across the 1024 px breakpoint will not re-init or tear down the ScrollTrigger pin. Either subscribe to the MQ or accept the mobile/desktop split with a key prop.

7. **`OFFICES`, `SERVICES`, `NAV_LINKS` exported as plain arrays** (only `SERVICES` uses `as const`). Tightening the others lets discriminated lookups (`SERVICES.find` returns the literal slug type) and avoids `string` widening.

## Code Smells

1. **`text-scramble.tsx:8` — `frameRef` declared, never read** (eslint warning). Dead.

2. **Unescaped apostrophes** (4 errors): `services/page.tsx:23`, `cta-section.tsx:17` (×2), `globe-section.tsx:30`. Use `&apos;` or curly quotes. The codebase escapes apostrophes elsewhere — these are inconsistent.

3. **`particle-galaxy.tsx` is imported nowhere** (grep confirms only its own file matches `ParticleGalaxy`). Dead component — either wire into hero/CTA per spec §7 (#4) or delete.

4. **`use-reduced-motion.ts` is exported but unused** in source — only referenced from itself. Either wire into `Hero`, `MagneticCursor`, `AnimatedCounter`, `TextScramble`, `ProcessTimeline` (all spec requirements) or delete.

5. **`AGENTS.md` literally instructs agents to read `node_modules/next/dist/docs/` before writing code** — fine as policy but means the foundation agent's choice of `motion/react` vs `framer-motion` etc. should be re-checked. Currently using `framer-motion@^12` which still works on Next 16 + React 19, but the official guidance points at the `motion` package in version-16.md. Low risk, worth a follow-up.

6. **Hard-coded "30+", "47+", "12+", "8M+", "99%"** metrics in `trust-signals.tsx:8-12` and "12+ countries" in `hero.tsx:70`. Move to `lib/constants.ts` so marketing can tune without diving into JSX.

7. **Hard-coded "ZentroBot" persona, pricing ("$5K", "$8K/mo"), and stub answers** in `agent-chat-demo.tsx:9-22`. Should at minimum live next to `lib/constants.ts` so SDR pricing is single-source.

8. **`Card` always applies `hover:border-indigo/40 hover:-translate-y-1`** (`card.tsx:15`) — there's no opt-out; static cards still lift on hover.

9. **`globals.css` declares `--font-display` = Geist Sans** but there is no Inter Display / Satoshi / JetBrains Mono as the spec §3 calls for. Fine if intentional, but the spec deviation is undocumented.

10. **`InsightsPreview` and `WorkPage` cards both render the same hand-rolled gradient placeholder** (`insights-preview.tsx:26-30`, `insights/page.tsx:34-36`, `work/page.tsx:35-37`). Extract a `<MediaPlaceholder category={...} />` component.

## Missing Features (vs spec)

- **`Article` JSON-LD on blog posts** (spec §8). Only `Organization`, `LocalBusiness`, and `Service` schemas exist.
- **`FAQPage` schema** — no FAQ section anywhere.
- **`BreadcrumbList` on inner pages** — absent.
- **OG images.** `lib/seo.ts` defaults to `/og/default.png`, but `public/og/` does not exist — every `og:image` URL 404s.
- **Logo asset.** `OrganizationSchema` references `/logo.png` (`organization-schema.tsx:10`) — file is absent from `public/`.
- **Filterable work grid** by industry/service (spec §6.4). Current `/work/page.tsx` is a flat 2-col grid.
- **Service template pieces** missing on `/services/[slug]`: problem statement, "Our approach" 3-4 cards, tech logo grid, mini case study (spec §6.2). Currently only "What you get" + "Typical engagement" card.
- **Showcase modals** — spec §6.3 calls for a card grid where each opens an interactive demo modal with categories (Sales, Support, Content, Code, Research). Currently a single shared `<AgentChatDemo>` plus 5 read-only cards; no modal, no per-agent personality.
- **Related posts at the bottom of insights** (spec §6.6).
- **Calendar booking embed (Cal.com / Calendly placeholder)** on `/contact` (spec §6.7).
- **Budget dropdown** on the contact form (spec §6.7).
- **WhatsApp / phone CTA** on `/contact` (spec §6.7).
- **Team section** on `/about` (spec §6.5) — placeholder profiles missing.
- **`i18n` routing scaffolding** (spec §8) — not present.
- **Page transitions** (spec §7 #6) — not implemented; route changes are bare.
- **Image reveal on scroll for case studies** (spec §7 #14).
- **`prefers-reduced-motion` plumbed through animations** (spec §7 / criterion #9). Only `SmoothScrollProvider` honors it; everything else animates regardless.
- **Tests.** Zero `.test.*` / `.spec.*` files; no Vitest/Jest/Playwright config. Add at minimum: `lib/content.ts` snapshot test (parses MDX with all frontmatter shapes), a Playwright smoke test per route.

## What's Done Well

- `tsc --strict --noEmit` is clean, no `any`, no `@ts-ignore`, no `as` casts.
- Constants are centralized and consistently consumed (`SITE`, `OFFICES`, `SERVICES`, `NAV_LINKS`, `SOCIAL`).
- 3D scenes correctly `dynamic(..., { ssr: false, loading: ... })` with graceful fallbacks.
- `JsonLd` is a clean primitive; SEO schemas compose it properly.
- `cn()` + `cva` pattern in `Button` is idiomatic and the variant typing is right.
- `Marquee` duplicates content with `aria-hidden` on the second copy — accessibility-conscious.
- `formatDate` uses `Intl` correctly.
- Sitemap covers static + service + insight + case-study URLs dynamically.

## Recommended Refactors (ordered by impact)

1. **Replace the hand-rolled MDX renderer with `next-mdx-remote/rsc`.** The dependency is already installed. This single change fixes broken links, lost bold/italic, missing inline code, fenced code blocks, and gives editors the freedom to write real Markdown.
2. **Wire the contact form** with `react-hook-form` + `zod` (already installed) and a Resend route handler at `app/api/contact/route.ts`. Add a honeypot. Stop showing "Message sent" for an unsent message.
3. **Fix the three eslint *errors* that React Hooks now flags as correctness bugs**: `Math.random` purity in `particle-galaxy.tsx`, `setState`-in-effect in `use-reduced-motion.ts`, and the `text-scramble` HTML injection.
4. **Add `app/error.tsx` plus per-segment error/loading boundaries** for `/insights`, `/work`, `/services/[slug]`, `/insights/[slug]`, `/work/[slug]`.
5. **Generate the missing assets**: `public/og/default.png` (1200×630), `public/logo.png`, per-page OG cards via Next 16's `opengraph-image.tsx` route convention.
6. **Add `Article`, `FAQPage`, `BreadcrumbList` schemas** and route them through `JsonLd`.
7. **Plumb `usePrefersReducedMotion()`** into `Hero`, `TextScramble`, `AnimatedCounter`, `MagneticCursor`, `ProcessTimeline` to satisfy spec criterion #9.
8. **Convert `MagneticCursor` to event delegation** on `document` so dynamic content participates without leaks.
9. **Split `Hero` into a server skeleton + small client island** for the scrambled headline and 3D orb; do the same for `services-bento` if motion can be moved to a child wrapper.
10. **Add at least one Playwright smoke spec** that loads `/`, `/services/ai-agents`, `/insights/agentic-ai-2026`, `/work/acme-corp-automation`, asserts H1 content and 200 status.
11. **Move marketing metrics, agent-demo persona, pricing strings** out of components into `lib/constants.ts`.
12. **Delete or use** `particle-galaxy.tsx` and `use-reduced-motion.ts`.

---

**Files referenced (absolute paths):**
`c:\Antigravity\TEMP projects\Zentro\zentrotech\app\layout.tsx`, `app\page.tsx`, `app\(marketing)\contact\page.tsx`, `app\(marketing)\insights\[slug]\page.tsx`, `app\(marketing)\work\[slug]\page.tsx`, `app\(marketing)\services\[slug]\page.tsx`, `app\(marketing)\services\page.tsx`, `app\(marketing)\showcase\page.tsx`, `app\ai-agency-dubai\page.tsx`, `app\ai-consultancy-bangalore\page.tsx`, `app\ai-development-uae\page.tsx`, `components\animations\text-scramble.tsx`, `components\animations\magnetic-cursor.tsx`, `components\animations\smooth-scroll.tsx`, `components\3d\particle-galaxy.tsx`, `components\3d\neural-orb.tsx`, `components\3d\globe-scene.tsx`, `components\sections\hero.tsx`, `components\sections\services-bento.tsx`, `components\sections\process-timeline.tsx`, `components\sections\trust-signals.tsx`, `components\sections\cta-section.tsx`, `components\sections\globe-section.tsx`, `components\sections\insights-preview.tsx`, `components\demos\agent-chat-demo.tsx`, `components\seo\json-ld.tsx`, `components\seo\organization-schema.tsx`, `components\layout\header.tsx`, `components\layout\footer.tsx`, `components\layout\mobile-nav.tsx`, `components\ui\button.tsx`, `components\ui\card.tsx`, `lib\constants.ts`, `lib\content.ts`, `lib\seo.ts`, `lib\utils.ts`, `lib\hooks\use-reduced-motion.ts`.
