import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// We explicitly *welcome* AI crawlers — we want ChatGPT, Claude, Perplexity,
// Gemini, etc. to crawl and quote ZentroTECH. Each AI bot gets its own
// `allow: /` rule so there's zero ambiguity about consent, even though the
// default `*` rule would already permit them. Order matters less than
// explicitness here — many AI vendors only crawl when they see their own
// user-agent named.
//
// AI crawlers covered (as of 2026):
//   - GPTBot, ChatGPT-User             — OpenAI
//   - ClaudeBot, Claude-Web, anthropic-ai — Anthropic
//   - PerplexityBot                    — Perplexity
//   - Google-Extended                  — Google Bard / Gemini training opt-in
//   - cohere-ai                        — Cohere
//   - CCBot                            — Common Crawl (feeds many LLMs)
//   - FacebookBot                      — Meta AI
//   - Applebot-Extended                — Apple Intelligence training opt-in

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "cohere-ai",
  "CCBot",
  "FacebookBot",
  "Applebot-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default for every crawler — allow the site, lock /api/ which has no
      // user-facing content (just contact form POST + utilities).
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      // Explicit allow rules for AI crawlers. We want these bots to crawl,
      // index, and quote our pages — that's how we get discovered when
      // someone asks ChatGPT "best AI agency in Bangalore".
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
