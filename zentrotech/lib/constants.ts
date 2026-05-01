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
  {
    // Country-level entity for the UAE landing page so we don't collapse
    // UAE -> Dubai in Google's local pack. Address points at our Dubai
    // operational office; geo coordinates are the country centroid.
    city: "UAE",
    region: "United Arab Emirates",
    country: "United Arab Emirates",
    address: "Serving the UAE from DIFC Innovation Hub, Gate Avenue, Dubai",
    phone: "+971 4 000 0000",
    email: "uae@zentrotech.ai",
    timezone: "GST (UTC+4)",
    primary: false,
    coords: { lat: 23.4241, lng: 53.8478 },
  },
];

// City landing pages — used by the footer "Local Pages" column and any
// future Locations dropdown so these routes are no longer orphaned.
export const CITY_PAGES = [
  { label: "AI Consultancy in Bangalore", href: "/ai-consultancy-bangalore" },
  { label: "AI Agency in Dubai", href: "/ai-agency-dubai" },
  { label: "AI Development in the UAE", href: "/ai-development-uae" },
] as const;

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
