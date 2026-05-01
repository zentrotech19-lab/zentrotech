/**
 * FAQ content for ZentroTECH website.
 *
 * Used in:
 *  - Service detail pages   → FAQS_BY_SERVICE[slug]
 *  - General FAQ section    → FAQS_GENERAL (home, /faq, contact)
 *  - City landing pages     → FAQS_BANGALORE / FAQS_DUBAI
 *
 * Each list is rendered as an accordion AND emitted as FAQPage JSON-LD
 * for rich Google search results. Keep questions phrased the way real
 * users type them into search engines.
 *
 * Pricing numbers are PLACEHOLDER estimates — confirm with founders
 * before going live and remove the PLACEHOLDER markers.
 */

export type FAQ = { question: string; answer: string };

export const FAQS_BY_SERVICE: Record<string, FAQ[]> = {
  "ai-agents": [
    {
      question: "What is an AI agent and how is it different from a chatbot?",
      answer:
        "A chatbot answers questions inside a single conversation. An AI agent decides what to do, calls tools, queries databases, and completes multi-step tasks on its own — for example, qualifying a lead, updating your CRM, and booking a meeting end-to-end. We build agents that act, not just talk.",
    },
    {
      question: "How much does it cost to build a custom AI agent?",
      answer:
        "Production AI agent engagements at ZentroTECH typically start around $25K USD (PLACEHOLDER) for a single-domain agent and scale to $150K+ for multi-agent systems with deep enterprise integrations. Pricing depends on tool integrations, evaluation rigor, and compliance requirements. We give a fixed quote after a paid 1-2 week discovery sprint.",
    },
    {
      question: "How long does it take to deploy an AI agent to production?",
      answer:
        "A focused single-purpose agent (e.g., support triage, lead qualifier) ships in 4-6 weeks. Multi-agent systems with custom tool integrations and human-in-the-loop workflows typically take 8-12 weeks from kickoff to production. We always ship a working v1 before scaling scope.",
    },
    {
      question: "Which LLMs and frameworks do you build agents on?",
      answer:
        "We are model-agnostic. We use Claude (Anthropic), GPT-4 class models (OpenAI), and open-weight models (Llama, Qwen, Mistral) where they fit. Common frameworks: LangGraph, the Anthropic Agent SDK, Pydantic AI, and custom orchestration. Model choice is driven by task accuracy, latency, cost, and data residency — not hype.",
    },
    {
      question: "How do you stop AI agents from hallucinating or going off-script?",
      answer:
        "Three layers: (1) tool use and retrieval so agents work from real data, not guesses; (2) a written evaluation harness that runs on every change, scoring accuracy, refusals, and tool calls; (3) human-in-the-loop checkpoints for high-stakes actions (sending money, emailing customers, deleting records). No agent ships without an eval suite.",
    },
    {
      question: "Can the AI agent integrate with our CRM, Slack, or internal tools?",
      answer:
        "Yes. We routinely integrate agents with Salesforce, HubSpot, Zoho, Slack, Microsoft Teams, Notion, Jira, ServiceNow, internal Postgres/MongoDB, and bespoke REST/GraphQL APIs. If an API exists, the agent can use it. If it doesn't, we can build the bridge.",
    },
    {
      question: "Who owns the AI agent and the source code after the project?",
      answer:
        "You do. All code, prompts, evals, and infrastructure-as-code are delivered to your GitHub org under your IP. We retain no licensing claims on client-built agents.",
    },
    {
      question: "Do you offer ongoing support and improvement after launch?",
      answer:
        "Yes. After handover we offer a monthly retainer covering monitoring, eval regression checks, model upgrades (e.g., migrating from Claude 4.6 to 4.7), and incremental capability additions. Most clients keep us on for 6-12 months post-launch.",
    },
  ],

  "ai-automation": [
    {
      question: "What kinds of business workflows can AI automation replace?",
      answer:
        "Anything repetitive that touches text, documents, or structured data: invoice processing, lead routing, contract review, customer onboarding, ticket triage, content moderation, KYC checks, report generation, data entry between systems. If a human spends more than 30 minutes a day doing it, it's a candidate.",
    },
    {
      question: "How long does it take to deploy AI automation?",
      answer:
        "A single workflow (e.g., automated invoice extraction) typically goes live in 2-4 weeks. A department-wide automation program — multiple workflows, dashboards, and exception handling — runs 8-16 weeks. We ship in vertical slices so you see ROI inside the first month.",
    },
    {
      question: "What is the typical ROI of AI workflow automation?",
      answer:
        "Most of our clients see payback within 3-6 months. A common pattern: a 5-person ops team reclaiming 60-80% of their time on a target workflow, redeployed to higher-value work. We define the ROI metric in week one and report against it monthly.",
    },
    {
      question: "Do you use n8n, Zapier, Make, or build custom?",
      answer:
        "We use the right tool for the job. n8n and Make for fast, visual orchestration; Zapier for quick SaaS-to-SaaS glue; custom Python services when latency, cost, or complexity demand it. Most production deployments end up as a hybrid — visual orchestrator plus a few custom services for the heavy lifting.",
    },
    {
      question: "How much does AI automation cost?",
      answer:
        "Single-workflow automation projects start around $10K USD (PLACEHOLDER). A multi-workflow program for an SMB typically runs $40-120K (PLACEHOLDER). Enterprise programs scale from there. We always quote against expected savings so the business case is explicit.",
    },
    {
      question: "Will AI automation replace our employees?",
      answer:
        "Honestly: it replaces tasks, not people. The clients who get the biggest wins use the reclaimed hours to grow revenue, improve customer experience, or attack backlog work — not to cut headcount. We help you plan that transition explicitly so the team is on board.",
    },
    {
      question: "Is our data safe when running AI automation?",
      answer:
        "Yes. We deploy in your cloud (AWS, Azure, GCP) or in zero-retention modes with model providers. Sensitive PII is masked or processed by on-prem/open-weight models when required. SOC 2, GDPR, and DPDP-aware architectures are standard.",
    },
  ],

  "ai-websites": [
    {
      question: "What is an AI-powered website?",
      answer:
        "A website with intelligence built in: an embedded chat or voice agent that knows your product, dynamic personalization based on visitor intent, AI-generated content variations, and conversion optimization that learns continuously. It's a marketing asset that improves itself, not a static brochure.",
    },
    {
      question: "How is this different from just adding a chatbot to my site?",
      answer:
        "A chatbot is a feature. An AI-powered website is the entire experience. We rebuild the page architecture, content engine, personalization layer, and analytics so AI is woven through the whole funnel — not bolted on as a corner widget.",
    },
    {
      question: "How much does an AI-powered website cost?",
      answer:
        "AI-powered website builds at ZentroTECH typically range from $20K to $80K USD (PLACEHOLDER), depending on scope, integrations, and the depth of the AI personalization layer. We scope and price after a 1-week discovery, with a fixed quote for the build.",
    },
    {
      question: "How long does an AI website project take?",
      answer:
        "8-14 weeks end-to-end for a marketing site with embedded agents and personalization. Phase 1 (design + core build) ships in 6-8 weeks; phase 2 (AI agents + personalization + optimization loops) layers in over the following 4-6 weeks.",
    },
    {
      question: "Will an AI-powered website hurt my SEO?",
      answer:
        "No — done correctly, it helps. We build on Next.js with full server-side rendering, structured data, and Core Web Vitals tuning. AI-generated content is human-edited, schema-marked, and never used to mass-produce thin pages. Google ranks our builds well because the technical foundation is solid.",
    },
    {
      question: "Can the AI agent on my website actually qualify and book leads?",
      answer:
        "Yes. We connect the on-site agent to your CRM and calendar so it can ask qualification questions, score the lead, route it to the right rep, and book a meeting in real time — no human in the loop required for top-of-funnel conversations.",
    },
    {
      question: "What tech stack do you build AI websites on?",
      answer:
        "Next.js 15, TypeScript, Tailwind, Vercel for hosting, headless CMS (Sanity or Payload), and our own AI agent framework on the back end. The result: a site that scores 95+ on Lighthouse, is fully editable by your marketing team, and is wired for AI from day one.",
    },
  ],

  "agentic-coding": [
    {
      question: "What is agentic coding?",
      answer:
        "Engineering with AI agents inside the dev loop — Claude Code, Cursor, Aider, and custom code-generation/review agents that write, test, and refactor code semi-autonomously under engineer supervision. It is not 'AI replaces engineers'; it is 'each engineer ships 3-10x more, with higher quality'.",
    },
    {
      question: "How much faster will my engineering team really ship with agentic coding?",
      answer:
        "Honestly, it depends on the codebase and the team's discipline. Teams we've worked with see 2-5x throughput on greenfield work and 1.5-2x on legacy maintenance, after the 4-6 week adoption curve. The biggest gains come from culture and workflow changes, not just installing the tools.",
    },
    {
      question: "Do I need to replace my existing IDE or CI/CD pipeline?",
      answer:
        "No. Agentic coding tools sit alongside your existing setup. Engineers keep their IDE; we add Claude Code/Cursor as a parallel surface, plus optional CI agents (PR review, test generation, security scanning) that integrate into GitHub Actions or your existing pipeline.",
    },
    {
      question: "Is agentic coding safe for production code?",
      answer:
        "Yes, with the right guardrails. We enforce: typed code only, mandatory test generation, human PR review on all merges, branch protection, and secrets scanning. Agents accelerate engineers — they don't bypass your existing review and quality gates.",
    },
    {
      question: "How do you onboard a team to agentic coding?",
      answer:
        "Three phases: (1) tooling install + a 2-day hands-on workshop; (2) a 4-week pilot on a single team with weekly office hours; (3) rollout to the wider org with playbooks, custom slash commands, and measurement. Total adoption time: 6-10 weeks.",
    },
    {
      question: "How much does an agentic coding engagement cost?",
      answer:
        "Workshop + 4-week pilot programs start around $15K USD (PLACEHOLDER). Full org rollouts (training, custom tooling, measurement, 3-month support) typically run $50-120K (PLACEHOLDER), priced against expected throughput gains.",
    },
    {
      question: "Will my engineers' jobs be at risk?",
      answer:
        "No. Engineers who use these tools become more valuable, not less. Our clients use the productivity gains to ship more product, attack tech debt, and move faster — not to shrink the team. We help you frame the change so engineers are excited, not threatened.",
    },
  ],

  "llm-integration": [
    {
      question: "Which LLM should we use — OpenAI, Anthropic, Google, or open-source?",
      answer:
        "It depends on the task. For complex reasoning and tool use we usually default to Claude (Anthropic). For high-volume cheap classification, smaller open-weight models on your own infra. For multimodal vision, GPT-4o or Gemini. We benchmark 3-5 candidates against your real workload before we commit. Hype-driven model picks waste money.",
    },
    {
      question: "How do you control LLM costs in production?",
      answer:
        "Four levers: prompt caching (often 50-90% savings on cacheable workloads), model tiering (cheap model first, expensive model only on hard cases), aggressive context trimming, and per-request budget caps with alerts. We instrument cost per request and per outcome from day one.",
    },
    {
      question: "What is RAG and do we need it?",
      answer:
        "RAG (Retrieval-Augmented Generation) lets an LLM answer questions using your private documents — contracts, policies, product docs — without retraining. You need it if accuracy on internal knowledge matters. You don't need it if a well-prompted base model + tools is enough. We help you decide, not default to RAG for everything.",
    },
    {
      question: "Can we run LLMs on our own infrastructure for data privacy?",
      answer:
        "Yes. We deploy open-weight models (Llama, Qwen, Mistral, DeepSeek) on AWS Bedrock, Azure OpenAI Service, GCP Vertex, or your own GPUs. For regulated industries (finance, healthcare, government) this is often the right answer. We design the architecture, benchmark accuracy vs. hosted models, and operationalize it.",
    },
    {
      question: "How do you measure if an LLM integration is actually working?",
      answer:
        "Written evaluations on real production traffic. We define accuracy, latency, cost, and refusal-rate KPIs upfront, build an eval harness that runs on every prompt or model change, and report metrics weekly. 'It seems to work' is not a launch criterion at ZentroTECH.",
    },
    {
      question: "How much does LLM integration cost?",
      answer:
        "A focused integration (single use case, single system) typically runs $15-40K USD (PLACEHOLDER). Enterprise platform work — central LLM gateway, observability, cost controls, multi-team rollout — runs $75-250K (PLACEHOLDER). Hosting and inference costs are separate and pass-through.",
    },
    {
      question: "How long does an LLM integration project take?",
      answer:
        "Single use case: 3-6 weeks. Multi-team LLM platform with gateway, RAG, and observability: 10-16 weeks. We ship in slices so the first use case is in production inside the first month.",
    },
  ],

  "ai-strategy": [
    {
      question: "What does an AI strategy consulting engagement actually deliver?",
      answer:
        "A written 12-24 month AI roadmap, an opportunity portfolio with business cases for each initiative, build-vs-buy recommendations, an org and hiring plan, KPIs to measure success, and a 90-day execution plan. Concrete artifacts you can act on Monday — not a slide deck of platitudes.",
    },
    {
      question: "How long does an AI strategy engagement take?",
      answer:
        "A focused strategy sprint runs 4-6 weeks (interviews, opportunity scan, roadmap, board-ready readout). A deeper transformation engagement with workshops, financial modeling, and pilot scoping runs 8-12 weeks.",
    },
    {
      question: "How much does AI strategy consulting cost?",
      answer:
        "Strategy sprints start around $35K USD (PLACEHOLDER) for a 4-6 week engagement. Full transformation programs scale to $150K+ (PLACEHOLDER) depending on org size, number of business units, and depth of pilot work included.",
    },
    {
      question: "How is your AI strategy different from McKinsey, BCG, or Fractal?",
      answer:
        "We are operators, not slide-deck consultants. Every recommendation is grounded in what we have actually built. Our roadmaps are technically credible because the people writing them also ship production AI systems. And we are 30-60% the price of tier-1 strategy houses for comparable depth.",
    },
    {
      question: "Will you also build what you recommend?",
      answer:
        "If you want us to. Most clients who do strategy with us continue into a build engagement on the highest-ROI initiative. We are happy to hand over to your internal team or a different vendor too — the strategy stands on its own.",
    },
    {
      question: "Who in our organization should be involved?",
      answer:
        "CEO/COO sponsorship is non-negotiable. We typically interview 8-15 stakeholders across product, engineering, ops, sales, and finance, plus a small steering group (3-5 people) who meet weekly. The output is built for the C-suite but informed by the people who will execute.",
    },
  ],
};

export const FAQS_GENERAL: FAQ[] = [
  {
    question: "What does ZentroTECH do?",
    answer:
      "ZentroTECH is a Bangalore-headquartered AI consultancy. We design and deploy AI agents, AI automation, AI-powered websites, agentic coding programs, LLM integrations, and AI strategy roadmaps for ambitious businesses across India, the UAE, the US, and the UK.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes. Roughly half of our pipeline is international — primarily Dubai/UAE, the US, the UK, and Singapore. We run async-first, hold overlapping working hours with clients in those time zones, and travel on-site for kickoffs and quarterly reviews when it makes sense.",
  },
  {
    question: "How much does an AI project with ZentroTECH cost?",
    answer:
      "Most engagements fall between $15K and $150K USD (PLACEHOLDER), depending on scope. We do not work below ~$10K — anything smaller is better served by SaaS tooling than a custom build. After a 30-minute scoping call we send a written estimate range; firm fixed pricing comes after a paid discovery week.",
  },
  {
    question: "Do you offer fixed-price projects or only time-and-materials?",
    answer:
      "Both. Most clients prefer fixed-price for well-scoped builds (we run a paid 1-week discovery first to make the fixed price honest). For open-ended R&D or staff-augmentation engagements, we offer monthly retainers. We don't do unbounded hourly billing.",
  },
  {
    question: "What is your engagement model — discovery, build, support?",
    answer:
      "Three phases: (1) Discovery (1-2 paid weeks): we map the problem, validate feasibility, and produce a fixed-price proposal. (2) Build (4-16 weeks typical): vertical slices, weekly demos, you can stop after any slice. (3) Support (optional retainer): monitoring, evals, model upgrades, and incremental improvements.",
  },
  {
    question: "Who owns the IP and the source code?",
    answer:
      "The client. All deliverables — code, prompts, evals, IaC, documentation — are handed over under your ownership. We keep no licensing claims and we don't reuse client-specific code with other clients. We do reserve the right to discuss the engagement publicly only with written approval.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Yes — we sign mutual NDAs before any detailed discovery. We have a standard mutual NDA we can send in 24 hours, or we can review and sign yours.",
  },
  {
    question: "How is ZentroTECH different from Fractal, GeekyAnts, or Mrkhan Digital?",
    answer:
      "Fractal is enterprise-scale and slow; we are agentic-first and ship in weeks. GeekyAnts is strong on product engineering but not AI-native; every ZentroTECH engineer ships AI systems daily. Mrkhan and similar boutiques are solid on automation but lack our breadth across agents, LLMs, and strategy. We sit in the gap: agentic-native, full-service, SMB-accessible, premium delivery.",
  },
  {
    question: "Can you start next week?",
    answer:
      "Often, yes. We hold a small portion of capacity for fast-start discovery sprints. For larger build engagements lead time is typically 2-4 weeks from signed SOW to kickoff.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We have shipped work in fintech, e-commerce, SaaS, professional services, real estate, healthcare, and logistics. We deliberately avoid regulated work where we don't have the right compliance partners (e.g., clinical decision support, deep-defence). If we can't do it well, we'll tell you and refer you out.",
  },
  {
    question: "Do you provide training for our internal team?",
    answer:
      "Yes. Many engagements include a knowledge-transfer phase: hands-on workshops, runbooks, and pairing sessions so your team can own and extend the system. We can also deliver standalone training on agentic coding, LLM evaluation, or AI strategy for leadership teams.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a 30-minute intro call via the contact page or email hello@zentrotech.ai. We'll discuss the problem, share rough scope and pricing, and propose next steps — usually a paid discovery week. No long sales cycles, no slide-deck dance.",
  },
];

export const FAQS_BANGALORE: FAQ[] = [
  {
    question: "Where in Bangalore is ZentroTECH located?",
    answer:
      "Our Bangalore HQ is at WeWork Galaxy, Residency Road, Bangalore 560025 — central, with easy access from MG Road, Koramangala, Indiranagar, and Whitefield. We host client workshops on-site and meet locally for kickoffs.",
  },
  {
    question: "Do you work with Bangalore startups and SMBs, or only large enterprises?",
    answer:
      "Both. About 40% of our Bangalore clients are funded startups (Series A-C), 40% are SMBs and family-run businesses modernizing operations, and the remainder are mid-market enterprises. We deliberately keep an SMB-accessible engagement model — most cities-tier-1 boutique consultancies don't.",
  },
  {
    question: "Can we meet in person at your Bangalore office?",
    answer:
      "Yes — we encourage it. Most Bangalore engagements start with an in-person discovery workshop at our Residency Road office or at your office. For ongoing projects we run weekly on-site syncs when it adds value.",
  },
  {
    question: "Are you the best AI consultancy in Bangalore?",
    answer:
      "We'll let our clients answer that one, but here's the honest pitch: Bangalore has plenty of dev shops doing AI on the side. ZentroTECH is purpose-built around agentic AI, with senior engineers who ship production systems weekly. If you want a partner that does AI as the main act — not a side hustle — we're a strong fit.",
  },
  {
    question: "Do you hire AI engineers in Bangalore?",
    answer:
      "Yes — we are actively growing our Bangalore engineering team. Roles in AI engineering, full-stack, and applied research are listed on the careers page. We hire for taste, technical depth, and a bias for shipping.",
  },
  {
    question: "Do you offer AI consulting in Hindi or Kannada?",
    answer:
      "Yes. Our Bangalore team works fluently in English, Hindi, and Kannada. Project documentation is delivered in English by default, with translated summaries for stakeholders on request.",
  },
];

export const FAQS_DUBAI: FAQ[] = [
  {
    question: "Do you have an office in Dubai?",
    answer:
      "Yes. Our Dubai office is at the DIFC Innovation Hub, Gate Avenue, Dubai. The team there serves clients across the UAE, KSA, Qatar, and the wider GCC. UAE-trade-license-compliant contracting is available.",
  },
  {
    question: "Can ZentroTECH handle UAE data residency requirements?",
    answer:
      "Yes. For UAE clients with data residency needs, we deploy on AWS Middle East (Bahrain or UAE), Azure UAE North, or G42 Core42 infrastructure. We support UAE PDPL compliance and have signed DPAs available for review.",
  },
  {
    question: "Do you work with government and semi-government entities in the UAE?",
    answer:
      "We work with private-sector clients across the UAE today, and we partner with established systems integrators for government engagements that require local-entity prime contracting. Reach out via dubai@zentrotech.ai to discuss.",
  },
  {
    question: "How does ZentroTECH compare to G42, Presight, or JADA Squad?",
    answer:
      "G42 and Presight are infrastructure-scale partners — exceptional for nation-scale programs but not built for SMB or mid-market speed. JADA Squad is an excellent agentic-AI specialist with regional focus. ZentroTECH is the agentic-first, full-stack, SMB-and-mid-market-accessible alternative — premium delivery without the enterprise lead times.",
  },
  {
    question: "Do you support Arabic-language AI agents and content?",
    answer:
      "Yes. We build and evaluate agents in Modern Standard Arabic and major dialects (Gulf, Egyptian, Levantine). Our evaluation harness includes Arabic-specific accuracy and tone benchmarks so you don't ship an agent that 'kind of speaks Arabic'.",
  },
  {
    question: "Can you bill in AED and contract through a UAE entity?",
    answer:
      "Yes. We can contract through our UAE entity and invoice in AED, USD, or INR depending on what works for your finance team. VAT-compliant invoicing is standard.",
  },
];
