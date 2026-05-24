// 20 competitor / alternative pages — ZentroTECH positioned against the
// main SaaS tools / agencies Indian SMBs evaluate. Each captures
// "[competitor] alternative india" and "zentrotech vs [competitor]" searches.

export type CompareEntry = {
  slug: string;
  competitor: string;
  category: "saas-chatbot" | "saas-crm" | "saas-marketing" | "agency" | "no-code";
  shortPitch: string; // SEO description (≤160 chars)
  competitorOverview: string;
  whenCompetitorWins: string[];
  whenZentroWins: string[];
  pricingCompare: { competitor: string; zentro: string; verdict: string };
  faqs: { q: string; a: string }[];
};

export const COMPARE_ENTRIES: CompareEntry[] = [
  {
    slug: "hubspot",
    competitor: "HubSpot",
    category: "saas-crm",
    shortPitch:
      "HubSpot vs ZentroTECH for Indian SMBs: when HubSpot's $1,800-$3,600/year wins, and when a custom Indian agency engagement beats it on cost + fit.",
    competitorOverview:
      "HubSpot is the US-market-leader inbound marketing + CRM platform — strong free tier, excellent template ecosystem, but priced for US/EU buyers. For Indian SMBs, the Starter plan starts at ~₹1,800/month and Professional jumps to ~₹6,500-13,000/month per seat. The CRM is free but useful features (sequences, lead scoring, attribution) are paywalled behind Marketing Hub Pro.",
    whenCompetitorWins: [
      "You have an in-house marketing team that wants to self-serve and your budget allows ₹5L+/year just on tooling.",
      "You're scaling from 50 → 500 employees rapidly and need ecosystem integrations (Salesforce, Slack, Zoom) out of the box.",
      "Your customer base is US/Europe and HubSpot's email deliverability + templates speak that audience.",
    ],
    whenZentroWins: [
      "Your buyer is on WhatsApp, not email — HubSpot WhatsApp integration is clunky in 2026; we build native WhatsApp Business API agents.",
      "You need Hindi, Tamil, Kannada, Telugu, or Malayalam voice + chat — HubSpot's regional language support is basically zero.",
      "You want one bill (us) for website + automation + CRM + voice agent, instead of stitching HubSpot + Twilio + WhatsApp BSP + agency.",
      "You're under 100 employees and ₹3-8L total Y1 cost beats HubSpot's ₹6-15L Y1.",
    ],
    pricingCompare: {
      competitor: "HubSpot Marketing + Sales Hub Pro: ₹6,500-13,000/seat/month + onboarding ₹1.5L+",
      zentro: "ZentroTECH full bundle: ₹3-8L one-off + ₹15-25K/month ongoing",
      verdict: "For under-100-employee Indian SMBs, ZentroTECH is 40-60% cheaper Y1 with native WhatsApp + Indian-language AI.",
    },
    faqs: [
      {
        q: "Is ZentroTECH a HubSpot replacement?",
        a: "For SMBs under 100 employees, mostly yes — we replace HubSpot Marketing Hub + Sales Hub + bolt-on tools with one engagement. Above 200 employees, HubSpot's ecosystem depth wins.",
      },
      {
        q: "Can ZentroTECH migrate existing HubSpot data?",
        a: "Yes — we extract contacts, deals, sequences via HubSpot API and rebuild equivalent flows in Zoho or self-hosted n8n. Typical migration: 3-5 weeks.",
      },
    ],
  },
  {
    slug: "wati",
    competitor: "WATI",
    category: "saas-chatbot",
    shortPitch:
      "WATI vs ZentroTECH: WATI is great as a WhatsApp BSP, but limited as a complete lead engine. Here's when each wins for Indian SMBs.",
    competitorOverview:
      "WATI is one of India's most-used WhatsApp Business Solution Providers — affordable (₹1,999-₹14,999/month), simple shared-inbox UI, and shopify/Razorpay integrations. But WATI is a tool, not a strategy: it doesn't build your funnel, doesn't write your prompts, and doesn't connect to a CRM or voice agent without bolt-ons.",
    whenCompetitorWins: [
      "You already have a working funnel and just need a WhatsApp inbox + broadcast tool for ₹2-5K/month.",
      "Your team is technical enough to self-build flows in WATI's no-code builder.",
      "You don't need voice AI or multi-channel orchestration — WhatsApp alone is your whole strategy.",
    ],
    whenZentroWins: [
      "You want the funnel built FOR you (landing pages + CRM + WhatsApp + voice agent stitched together as one engine).",
      "You need AI prompt engineering — WATI lets you connect ChatGPT but doesn't tune prompts to your business voice.",
      "You want one team accountable for outcomes (leads, revenue), not just for tool uptime.",
    ],
    pricingCompare: {
      competitor: "WATI Standard: ₹2,499/mo + WhatsApp message fees + your own dev + agency time",
      zentro: "ZentroTECH bundle includes WATI/AiSensy/Interakt subscription + funnel design + prompt engineering + ongoing optimisation",
      verdict: "If you have an in-house team, WATI is cheaper. If you want done-for-you, ZentroTECH is the strategic layer WATI doesn't provide.",
    },
    faqs: [
      {
        q: "Does ZentroTECH use WATI under the hood?",
        a: "Sometimes — we recommend WATI, AiSensy, or Interakt depending on your channel needs and integrations. We're BSP-agnostic.",
      },
    ],
  },
  {
    slug: "aisensy",
    competitor: "AiSensy",
    category: "saas-chatbot",
    shortPitch:
      "AiSensy vs ZentroTECH: AiSensy is a top Indian WhatsApp BSP. Here's when their SaaS wins vs a complete ZentroTECH engagement.",
    competitorOverview:
      "AiSensy is one of India's largest WhatsApp BSPs — strong for broadcasting, campaign analytics, and Razorpay/Shopify integrations. Pricing ₹2K-7K/month + WhatsApp message fees. Excellent if you're comfortable owning the funnel build yourself.",
    whenCompetitorWins: [
      "You have an in-house marketer who'll build your campaigns + flows in AiSensy.",
      "You're sending mostly broadcasts (e-commerce, D2C) and need the cheapest sane BSP.",
      "Your funnel + creative is already proven — you just need delivery.",
    ],
    whenZentroWins: [
      "You don't have the in-house bandwidth to build flows + write copy + manage WhatsApp templates.",
      "You want AI agent capabilities (multi-step conversations, RAG, voice handoff) beyond AiSensy's chatbot builder.",
      "You need outcome-tied reporting (qualified leads, revenue) not just message delivery metrics.",
    ],
    pricingCompare: {
      competitor: "AiSensy Pro: ₹3,499/mo + message fees + your own funnel work",
      zentro: "ZentroTECH bundle: ₹1.5-3L one-off + ₹15-25K/month (includes AiSensy/equivalent subscription + funnel + AI prompts)",
      verdict: "AiSensy alone is cheaper. ZentroTECH delivers a complete engine — typically 2-4× the ROI for SMBs without in-house marketing capacity.",
    },
    faqs: [
      {
        q: "Can ZentroTECH replace my AiSensy account?",
        a: "We typically work WITH AiSensy (or WATI/Interakt) — they handle WhatsApp Business API plumbing, we handle strategy, prompts, funnels, and outcomes.",
      },
    ],
  },
  {
    slug: "interakt",
    competitor: "Interakt",
    category: "saas-chatbot",
    shortPitch:
      "Interakt vs ZentroTECH for Indian SMBs: Interakt's WhatsApp commerce platform is strong; here's when our full engagement makes sense.",
    competitorOverview:
      "Interakt (Jio Haptik) is a WhatsApp commerce platform with strong catalog + cart flows for Shopify/WooCommerce stores. Pricing ₹2-8K/month + WhatsApp fees. Built mainly for D2C and e-commerce — less suited for B2B services.",
    whenCompetitorWins: [
      "You're an e-commerce / D2C brand running on Shopify or WooCommerce.",
      "You need WhatsApp catalog + cart + abandoned-cart automation as your primary use case.",
      "Your team self-builds campaigns.",
    ],
    whenZentroWins: [
      "You're service-based (clinic, real-estate, coaching, consulting) where Interakt's e-commerce focus is overkill.",
      "You need voice AI alongside WhatsApp — Interakt doesn't ship voice agents natively.",
      "You want a single agency owning website + WhatsApp + CRM + ongoing growth.",
    ],
    pricingCompare: {
      competitor: "Interakt Growth: ₹2,499/mo + WhatsApp fees + your funnel work",
      zentro: "ZentroTECH full bundle ₹1.5-3L + ₹15K/mo (includes Interakt or alternative subscription)",
      verdict: "Interakt for D2C self-serve. ZentroTECH for service businesses + done-for-you.",
    },
    faqs: [],
  },
  {
    slug: "manychat",
    competitor: "ManyChat",
    category: "saas-chatbot",
    shortPitch:
      "ManyChat vs ZentroTECH for Indian businesses in 2026: ManyChat is strong on Instagram DM automation but limited for WhatsApp + India localisation.",
    competitorOverview:
      "ManyChat is the global leader for Instagram + Facebook Messenger automation. Strong for D2C brands running Meta ads. Weaker on WhatsApp (the dominant Indian channel) and almost zero Indian-language native support.",
    whenCompetitorWins: [
      "Your primary lead source is Instagram DMs (D2C, beauty, fashion).",
      "Your audience is global (English-speaking).",
      "You need a $15-25/month tool, not a full agency engagement.",
    ],
    whenZentroWins: [
      "Your primary channel is WhatsApp (true for 90%+ of Indian SMBs).",
      "You need Hindi/Tamil/Kannada/Telugu support — ManyChat doesn't speak these natively.",
      "You want website + WhatsApp + voice + CRM stitched together, not just Instagram automation.",
    ],
    pricingCompare: {
      competitor: "ManyChat Pro: ₹1,250-3,500/month + your funnel work",
      zentro: "ZentroTECH bundle: includes WhatsApp + Instagram + cross-channel orchestration",
      verdict: "ManyChat for Insta-only brands. ZentroTECH for India + multi-channel + service businesses.",
    },
    faqs: [],
  },
  {
    slug: "zoho-bigin",
    competitor: "Zoho Bigin",
    category: "saas-crm",
    shortPitch:
      "Zoho Bigin vs ZentroTECH: when Zoho's ₹400/user CRM wins, and when a complete agency engagement makes sense.",
    competitorOverview:
      "Zoho Bigin is the India-priced CRM for under-10-person sales teams — ₹400/user/month, simple Kanban UI, native Zoho ecosystem (Books, Mail, Forms). Excellent value if your team self-builds workflows.",
    whenCompetitorWins: [
      "You're under 10 sales reps and want a cheap, India-native CRM you can configure yourself.",
      "You already use Zoho Books/Mail and want unified billing.",
      "You don't need WhatsApp/voice/website integration — just a place to track deals.",
    ],
    whenZentroWins: [
      "You need a CRM wired into WhatsApp + website + voice agent + payment recovery as one engine.",
      "You want done-for-you setup + custom field strategy + 30/60/90 day optimisation.",
      "Your sales team is non-technical and won't self-build automation.",
    ],
    pricingCompare: {
      competitor: "Zoho Bigin Premier: ₹650/user/month + your setup time",
      zentro: "ZentroTECH includes Zoho/HubSpot/other CRM subscription + complete setup + integrations + ongoing optimisation",
      verdict: "Zoho if you have time + technical capacity. ZentroTECH if you want results faster.",
    },
    faqs: [],
  },
  {
    slug: "freshchat",
    competitor: "Freshchat",
    category: "saas-chatbot",
    shortPitch:
      "Freshchat vs ZentroTECH for Indian SMBs: Freshchat is a strong helpdesk-style chat tool; here's when our full engagement makes more sense.",
    competitorOverview:
      "Freshchat (Freshworks) is a helpdesk-grade chat tool with strong Freshworks ecosystem integration. Pricing ₹1,500-7,000/agent/month. Strong for inbound support; weaker for outbound + WhatsApp marketing.",
    whenCompetitorWins: [
      "You have a dedicated customer support team and need a Zendesk-style helpdesk.",
      "You're already on Freshdesk/Freshsales/CRM and want unified ecosystem.",
      "Your conversations are mostly inbound support, not outbound marketing.",
    ],
    whenZentroWins: [
      "You need WhatsApp marketing + lead-gen funnel (Freshchat is support-focused).",
      "You want voice AI alongside chat.",
      "You're under 100 employees and ₹3-7K/agent/month feels steep for support alone.",
    ],
    pricingCompare: {
      competitor: "Freshchat Pro: ₹3,000/agent/month + your funnel work",
      zentro: "ZentroTECH bundle includes equivalent capability at lower TCO for under-100-employee SMBs",
      verdict: "Freshchat for support-only mid-market. ZentroTECH for end-to-end SMB lead engine.",
    },
    faqs: [],
  },
  {
    slug: "razorpay",
    competitor: "Razorpay (payment recovery)",
    category: "saas-marketing",
    shortPitch:
      "Razorpay's built-in payment reminder vs ZentroTECH's AI payment recovery: when their free tool is enough, and when our 30-50% DSO reduction makes sense.",
    competitorOverview:
      "Razorpay's built-in payment reminder feature is free with any Razorpay account. It sends scheduled email + SMS reminders for unpaid invoices/payment links. Functional for basic use; lacks WhatsApp, voice, AI personalisation, and cadence intelligence.",
    whenCompetitorWins: [
      "Your invoice volume is under 50/month and Razorpay's free email/SMS is enough.",
      "Your customers are reliable corporate buyers who don't need follow-up.",
    ],
    whenZentroWins: [
      "Your DSO is 45-90+ days and you need to compress it (ZentroTECH agency typically cuts 30-50%).",
      "You want WhatsApp + voice reminders, not just email/SMS.",
      "You want AI personalisation (escalating tone, customer-specific language, payment-link smart-routing).",
    ],
    pricingCompare: {
      competitor: "Razorpay reminder: free with account",
      zentro: "ZentroTECH payment recovery automation: ₹50K-₹2L setup + ₹10K-25K/mo",
      verdict: "If unpaid receivables hurt cash flow, ZentroTECH ROI is typically 5-20× in first 90 days.",
    },
    faqs: [],
  },
  {
    slug: "leadsquared",
    competitor: "LeadSquared",
    category: "saas-crm",
    shortPitch:
      "LeadSquared vs ZentroTECH for Indian B2C lead businesses: when their ₹2K/user/month CRM wins, and when our full engagement does more.",
    competitorOverview:
      "LeadSquared is India's leading B2C lead-management CRM — built for ed-tech, real estate, BFSI. Strong sales-floor UX, prebuilt verticals. ₹1,500-3,000/user/month. Self-serve workflow building.",
    whenCompetitorWins: [
      "You're a 20+ person inside-sales team with a defined motion (ed-tech, real estate, lending).",
      "You have an in-house RevOps person to configure flows.",
      "You want a pure CRM, not website/funnel + CRM as one engagement.",
    ],
    whenZentroWins: [
      "You're a 5-20 person team without in-house RevOps capacity.",
      "You want WhatsApp + voice + website wired into the CRM, not standalone.",
      "You want fewer vendors — one team accountable for the whole lead-to-revenue journey.",
    ],
    pricingCompare: {
      competitor: "LeadSquared: ₹2,000/user/month + ₹1L+ implementation",
      zentro: "ZentroTECH bundle includes LeadSquared/Zoho/equivalent + complete setup + ongoing",
      verdict: "LeadSquared for mid-market inside-sales floors. ZentroTECH for under-50 SMBs wanting end-to-end.",
    },
    faqs: [],
  },
  {
    slug: "salesforce",
    competitor: "Salesforce",
    category: "saas-crm",
    shortPitch:
      "Salesforce vs ZentroTECH for Indian SMBs in 2026: when Salesforce's ₹15L+ engagement makes sense, and when an Indian agency engagement is 5-10× cheaper with comparable outcomes.",
    competitorOverview:
      "Salesforce is enterprise CRM gold standard — vast ecosystem, deep customisation, AI features (Agentforce). Pricing ₹10K-50K/user/month + ₹5L+ implementation. Built for 200+ employees. Massive overkill for under-100 SMBs.",
    whenCompetitorWins: [
      "You're a 500+ employee enterprise with multi-region requirements.",
      "You need deep ecosystem integrations (Slack, Tableau, Mulesoft).",
      "You have a dedicated Salesforce admin + budget for implementation partner.",
    ],
    whenZentroWins: [
      "You're under 100 employees — Salesforce is 10-20× more expensive than alternatives.",
      "You want WhatsApp-first, not enterprise-process-first.",
      "Your annual tooling + agency budget is ₹3-15L, not ₹30L+.",
    ],
    pricingCompare: {
      competitor: "Salesforce Pro Suite: ₹12K-30K/user/month + ₹5L-25L+ implementation",
      zentro: "ZentroTECH full Y1 cost: ₹3-15L total",
      verdict: "Salesforce for enterprise. ZentroTECH for SMBs where Salesforce is over-engineered.",
    },
    faqs: [],
  },
  // 10 more entries (lighter content) for compare/[slug]
  {
    slug: "shopify",
    competitor: "Shopify",
    category: "saas-marketing",
    shortPitch: "Shopify vs custom Next.js for Indian D2C — when Shopify's monthly fees beat custom, and when a ZentroTECH lead engine site wins.",
    competitorOverview: "Shopify is global e-commerce standard. ₹2K-25K/month + transaction fees. Strong app ecosystem, weak SEO for India SMBs, no native lead-engine capabilities.",
    whenCompetitorWins: ["Pure e-commerce with 1000+ SKUs", "Need 100+ app integrations", "International selling priority"],
    whenZentroWins: ["Service business (not pure e-commerce)", "Lead-gen is primary, transactions secondary", "Want SEO-optimised site, not Shopify SEO limits"],
    pricingCompare: { competitor: "Shopify Basic + apps + theme: ₹5-15K/month", zentro: "ZentroTECH custom site ₹1.5-3L one-off + ₹0 monthly hosting", verdict: "Custom wins for service businesses; Shopify wins for pure-product." },
    faqs: [],
  },
  {
    slug: "wix",
    competitor: "Wix",
    category: "no-code",
    shortPitch: "Wix vs ZentroTECH custom site: why Indian SMBs serious about lead-gen outgrow Wix in 6-12 months.",
    competitorOverview: "Wix is global drag-and-drop website builder. ₹500-2,500/month. Beautiful templates but limited SEO control, slow on mobile India bandwidth, no real automation.",
    whenCompetitorWins: ["Solo founder needing site in 2 days", "Budget is sub-₹50K total", "Not optimising for SEO/leads"],
    whenZentroWins: ["You want lead-gen, not just an online brochure", "Indian customers on slow mobile data need fast Next.js performance", "You're scaling past first 10 customers"],
    pricingCompare: { competitor: "Wix Business: ₹1,800/month + add-ons", zentro: "ZentroTECH starter: ₹35K-65K one-off, no monthly hosting fee", verdict: "Wix for hobby sites. ZentroTECH for business lead engines." },
    faqs: [],
  },
  {
    slug: "wordpress",
    competitor: "WordPress + Elementor",
    category: "no-code",
    shortPitch: "WordPress vs Next.js: when WordPress wins for Indian SMBs (rare in 2026), and when a custom ZentroTECH build wins (almost always).",
    competitorOverview: "WordPress + Elementor is the legacy default for small business sites. Lots of agencies still sell it cheap. Heavy, slow, security-prone, requires constant plugin maintenance. Lost ground to Next.js by 2026.",
    whenCompetitorWins: ["You already have a WordPress site and don't want to migrate", "You need a niche plugin not available elsewhere", "Budget is ₹15K and quality doesn't matter"],
    whenZentroWins: ["You want a fast, modern, secure site — WordPress fails on all three", "You want lead engine + automation, not a blog", "You don't want to pay ₹5K/month for hosting + ₹15K/year for plugin renewals"],
    pricingCompare: { competitor: "WordPress + Elementor + theme + hosting: ₹25-50K setup + ₹5-15K/mo ongoing", zentro: "ZentroTECH Next.js: ₹35-65K setup + ₹0/mo hosting on Vercel free tier", verdict: "Next.js wins on speed, security, scalability, and 5-year TCO." },
    faqs: [],
  },
  {
    slug: "freshdesk",
    competitor: "Freshdesk",
    category: "saas-crm",
    shortPitch: "Freshdesk vs ZentroTECH: helpdesk-focused vs full lead-engine. Different problems being solved.",
    competitorOverview: "Freshdesk is helpdesk standard for support teams. ₹1,500-7,000/agent/month. Strong ticket routing, weak on outbound marketing or WhatsApp lead-gen.",
    whenCompetitorWins: ["Pure customer support team with 5+ agents", "Already on Freshworks ecosystem", "Need omni-channel ticket management"],
    whenZentroWins: ["You want WhatsApp lead-gen, not just support tickets", "Under 5 support reps", "Want voice + chat + automation as one engagement"],
    pricingCompare: { competitor: "Freshdesk Growth: ₹2,000/agent/month + your funnel work", zentro: "ZentroTECH includes equivalent + outbound + voice in one bundle", verdict: "Different problems — pair them or choose by primary use case." },
    faqs: [],
  },
  {
    slug: "zendesk",
    competitor: "Zendesk",
    category: "saas-crm",
    shortPitch: "Zendesk vs ZentroTECH for Indian SMBs: when their enterprise helpdesk wins, when our SMB-optimised stack does more.",
    competitorOverview: "Zendesk is enterprise helpdesk leader. ₹5K-15K/agent/month + setup. Built for 50+ support teams. Massive overkill for under-100 SMBs.",
    whenCompetitorWins: ["500+ employee enterprise", "Need advanced SLA + routing", "Global support with regional teams"],
    whenZentroWins: ["Under 100 employees — Zendesk is 5-10× the cost of alternatives", "Service is just one of your priorities (lead-gen is bigger)", "Indian-language support matters"],
    pricingCompare: { competitor: "Zendesk Suite Pro: ₹7K-12K/agent/month + ₹2L+ setup", zentro: "ZentroTECH full Y1 cost: ₹3-8L total", verdict: "Zendesk for enterprise support. ZentroTECH for SMB end-to-end." },
    faqs: [],
  },
  {
    slug: "calendly",
    competitor: "Calendly",
    category: "saas-marketing",
    shortPitch: "Calendly vs ZentroTECH booking flows: when Calendly's $10/user wins, when integrated WhatsApp booking + AI qualification beats it.",
    competitorOverview: "Calendly is global meeting-scheduling leader. ₹800-2,500/user/month. Simple, polished, integrates with Google Calendar / Zoom. Lacks WhatsApp-first booking that Indian customers actually use.",
    whenCompetitorWins: ["B2B service team booking 1:1 calls with global prospects", "Already on US-style email-first workflows"],
    whenZentroWins: ["Indian customer base prefers WhatsApp over email for booking", "Need AI qualification before the call (BANT scoring)", "Want voice agent confirmation alongside chat booking"],
    pricingCompare: { competitor: "Calendly Pro: ₹1,000/user/month", zentro: "ZentroTECH booking module included in lead-engine bundle (no separate fee)", verdict: "Both can coexist; ZentroTECH layer adds WhatsApp + AI qualification on top." },
    faqs: [],
  },
  {
    slug: "tawk-to",
    competitor: "Tawk.to",
    category: "saas-chatbot",
    shortPitch: "Tawk.to (free chat widget) vs ZentroTECH AI chatbot: when free is enough, when AI agentic wins.",
    competitorOverview: "Tawk.to is a free live chat widget — used by 5M+ websites globally. Free forever, paid add-ons for AI/automation start at $19/agent/month. Basic UI, weak on AI agentic capabilities.",
    whenCompetitorWins: ["Truly zero budget for chat", "You have 24/7 humans to answer", "Don't need automation"],
    whenZentroWins: ["You want a 24/7 AI agent that qualifies leads, not just a chat window", "You need WhatsApp + chat + voice as one system", "You want analytics tied to revenue, not just chat sessions"],
    pricingCompare: { competitor: "Tawk.to: free (paid AI ₹1,500/agent/mo)", zentro: "ZentroTECH AI chatbot: ₹40K-1.5L setup + ₹8-25K/mo ongoing", verdict: "Tawk.to for human-staffed chat. ZentroTECH for AI-first lead qualification." },
    faqs: [],
  },
  {
    slug: "intercom",
    competitor: "Intercom",
    category: "saas-chatbot",
    shortPitch: "Intercom vs ZentroTECH for Indian SaaS: Intercom's $39-139/seat wins for global SaaS, ZentroTECH wins for India-first SMBs.",
    competitorOverview: "Intercom is SaaS chat standard with Fin AI agent. $39-139/seat/month + AI resolutions priced separately. Strong for global SaaS, weak WhatsApp + Indian-language story.",
    whenCompetitorWins: ["Global SaaS targeting US/EU buyers", "Already on Intercom ecosystem", "Need Fin AI's specific feature set"],
    whenZentroWins: ["Indian buyers expect WhatsApp + voice + regional languages — Intercom is web-only", "₹3-12K/seat/month feels steep for under-50-employee Indian SMBs", "Want one team for chatbot + funnel + CRM"],
    pricingCompare: { competitor: "Intercom Pro + Fin AI: ₹6-15K/seat/month + AI resolution fees", zentro: "ZentroTECH bundle: includes equivalent + WhatsApp + voice + funnel", verdict: "Intercom for global SaaS. ZentroTECH for India-first SMBs." },
    faqs: [],
  },
  {
    slug: "drift",
    competitor: "Drift",
    category: "saas-chatbot",
    shortPitch: "Drift vs ZentroTECH for Indian B2B: Drift is conversation marketing leader for US enterprise; here's when ZentroTECH fits Indian SMB better.",
    competitorOverview: "Drift (now part of Salesloft) is conversational marketing platform for B2B. ₹15K-50K/seat/month + setup. Built for US enterprise sales motions; overkill for Indian SMBs.",
    whenCompetitorWins: ["B2B SaaS targeting US enterprise buyers", "Already on Salesloft ecosystem", "Need ABM playbooks at scale"],
    whenZentroWins: ["Indian B2B is mostly WhatsApp + voice, not web chat", "₹15K+/seat is 5-10× the alternative", "Want done-for-you, not platform-only"],
    pricingCompare: { competitor: "Drift Premium: ₹20K+/seat/month + ₹3L+ setup", zentro: "ZentroTECH B2B engagement: ₹3-8L Y1 total", verdict: "Drift for US enterprise B2B. ZentroTECH for Indian B2B SMBs." },
    faqs: [],
  },
  {
    slug: "indian-agency",
    competitor: "Generic Bangalore agency",
    category: "agency",
    shortPitch: "Why ZentroTECH outperforms generic Bangalore digital agencies for SMBs in 2026 — one team, AI-native, outcome-tied.",
    competitorOverview: "Generic Bangalore digital agencies often deliver website + SEO + social media as separate retainers (₹15-50K/month each). Few are AI-native. Few accountable for actual business outcomes. Most won't touch automation or voice.",
    whenCompetitorWins: ["You want a single specialty (just SEO, just social, just design)", "You have in-house CMO orchestrating multiple vendors", "Established relationship with a specific agency"],
    whenZentroWins: ["You want ONE team accountable for the whole lead-to-revenue journey", "AI-native is non-negotiable", "Outcome-tied reporting (qualified leads, revenue) not vanity (traffic, impressions)"],
    pricingCompare: { competitor: "Generic agency stack: ₹40-100K/month across 3-5 vendors", zentro: "ZentroTECH bundle: ₹15-30K/mo with one team owning all of it", verdict: "Stop stitching vendors. One team, one bill, one accountability line." },
    faqs: [],
  },
];
