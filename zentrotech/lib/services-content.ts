// Rich content for /services/[slug] detail pages — overview prose, audience,
// process, per-service FAQs, related-service links, and the visual identity
// (gradient + art motif) that makes each page feel distinct rather than
// templated. Single source of truth so every component reads from here.

export type ServiceContent = {
  slug: string;
  outcomePromise: string;
  overview: string;
  whoItsFor: { vertical: string; body: string }[];
  howItWorks: { step: string; title: string; desc: string }[];
  whyZentro: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  // Visual identity
  gradient: { from: string; via: string; to: string }; // tailwind color tokens
  artMotif: ArtMotif;
  accentLabel: string; // e.g. "Conversion engineering"
};

export type ArtMotif =
  | "funnel"
  | "circuit"
  | "pulse"
  | "ascending"
  | "waveform"
  | "speech"
  | "phone"
  | "search"
  | "pipeline"
  | "magnifier";

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "lead-generation-websites": {
    slug: "lead-generation-websites",
    accentLabel: "Conversion engineering",
    outcomePromise:
      "A website that produces qualified leads every day — not a brochure that just sits there.",
    overview:
      "Most agencies sell you a 'beautiful' website and call it done. We build a system. Forms route into your CRM. WhatsApp captures the cold lead. Chatbot qualifies the warm one. Voice agent handles the missed call. Every page has one job — produce a measurable conversion event. Designed for Indian SMB buyers who want results, not aesthetics for their own sake.",
    whoItsFor: [
      { vertical: "Clinics & Healthcare", body: "Walk-in appointments, second-opinion enquiries, treatment-package leads." },
      { vertical: "Real Estate Brokers", body: "Site-visit bookings, property enquiries, investor lead capture." },
      { vertical: "D2C / E-commerce", body: "First-time buyer capture, abandoned-cart recovery, repeat-customer flows." },
      { vertical: "Coaching & Education", body: "Demo class signups, batch enrolment, parent enquiries." },
    ],
    howItWorks: [
      { step: "01", title: "Map your buyer", desc: "30-min call. We map who you sell to and where they currently get stuck before contacting you." },
      { step: "02", title: "Wireframe + funnels", desc: "Sketch the funnel paths first. Visual design is led by the funnel, not the other way around." },
      { step: "03", title: "Build + integrate", desc: "Mobile-first build. Forms wire to CRM. WhatsApp Business API connected. Tracking installed end-to-end." },
      { step: "04", title: "Launch + tune", desc: "Live in 4-6 weeks. First 30 days we tune copy, CTA placement, form length using real visitor data." },
    ],
    whyZentro: [
      "Lead-engine framing means every design decision traces back to a conversion event.",
      "WhatsApp + voice + chatbot wired in from day one — no 'phase 2' bolt-ons.",
      "We own the SEO + content layer too, so you're not paying a separate SEO retainer to make this work.",
    ],
    faqs: [
      { q: "How is this different from a Wix or WordPress site?", a: "Wix/WordPress give you a page builder; you still have to wire the conversion logic, integrations, automations, and SEO yourself. We deliver the entire system end-to-end with our automation layer baked in. You manage content; we handle the engine." },
      { q: "Do I own the website code?", a: "Yes. Full IP transfer on completion — you can move hosting, change agencies, do whatever. No vendor lock." },
      { q: "What if I already have a website?", a: "Look at our Website Audit + Lead Boost service — same outcome at lower cost without rebuilding from zero." },
      { q: "Can you migrate my existing content?", a: "Yes — content + SEO history + redirects all migrated as part of scope. No bonus charge." },
    ],
    relatedSlugs: ["website-audit-and-seo-fix", "seo-services-bangalore", "lead-followup-automation"],
    gradient: { from: "indigo", via: "violet", to: "indigo" },
    artMotif: "funnel",
  },
  "business-on-autopilot": {
    slug: "business-on-autopilot",
    accentLabel: "Operations replicated",
    outcomePromise:
      "Your business runs while you sleep — and on weekends, holidays, and when you're sick.",
    overview:
      "If you're a solo founder or running a 1-5 person team, your bottleneck isn't strategy — it's the daily grind of follow-ups, quotes, scheduling, posts, and admin. We map that grind, replicate it as automated workflows, and hand you a system that keeps moving when you can't. Not 'AI-powered productivity' fluff. Specific, measurable, daily-task automation built on self-hosted tools you actually own.",
    whoItsFor: [
      { vertical: "Single-doctor / single-lawyer practices", body: "Appointment booking, intake forms, follow-up reminders, document drafting." },
      { vertical: "Solo founders", body: "Lead-to-quote workflow, social posts, invoice generation, weekly review reports." },
      { vertical: "Small consultancy teams", body: "Client onboarding, status reports, time tracking, deliverable QA." },
      { vertical: "Field-service businesses", body: "Job scheduling, technician routing, customer notifications, invoice + payment." },
    ],
    howItWorks: [
      { step: "01", title: "Process audit", desc: "Half-day on-site or call. We watch you work and list every repeated task that takes >15 min/week." },
      { step: "02", title: "Automation map", desc: "We rank tasks by frequency × time saved × complexity, and pick the highest-ROI 8-12 to automate first." },
      { step: "03", title: "Build + train", desc: "We build the workflows in n8n, integrate your existing tools, and train you on the dashboard." },
      { step: "04", title: "Iterate quarterly", desc: "Every 90 days we revisit, retire the workflows that aren't useful, add new ones based on what's still manual." },
    ],
    whyZentro: [
      "Self-hosted n8n on your VPS (~₹2,000/mo) — not Zapier (~₹15,000/mo for the same usage).",
      "We map your actual process, not a generic template — so the automation matches how you really work.",
      "Quarterly tuning included — so the system evolves with your business, doesn't go stale.",
    ],
    faqs: [
      { q: "What tools do you use?", a: "Default stack: n8n (self-hosted), WhatsApp Business API, Zoho or open-source CRM, Google Workspace integrations, Telegram/Slack for ops alerts. We pick based on what you already use — minimal new subscriptions." },
      { q: "Do I need to learn to code?", a: "No. Workflows have visual dashboards. Day-to-day use is just clicking and reading." },
      { q: "What if my process changes?", a: "Quarterly tuning is included in our Care Plans. You can also pay-as-you-go for individual workflow changes." },
      { q: "Can this replace my virtual assistant?", a: "For the routine 60-70% of tasks — yes, completely. The remaining 30% (judgment calls, creative work) still benefit from a VA who's now spending 100% of time on them." },
    ],
    relatedSlugs: ["lead-followup-automation", "lead-management-crm", "ai-chatbots"],
    gradient: { from: "violet", via: "indigo", to: "violet" },
    artMotif: "circuit",
  },
  "lead-followup-automation": {
    slug: "lead-followup-automation",
    accentLabel: "Closing the gap",
    outcomePromise:
      "Every lead gets touched 7 times before you give up — automatically, in their language.",
    overview:
      "Indian SMB lead behaviour is well-documented: most close after 5-7 touches across multiple channels. Most agencies stop at 1-2. The gap is where 30-50% of your potential revenue dies. Our system runs the full nurture cadence — WhatsApp, SMS, email, scheduled AI voice call — for every inbound lead, intelligently spaced, until they either book a meeting or explicitly opt out. You get the closes; the awkward part runs in the background.",
    whoItsFor: [
      { vertical: "Service businesses with high consideration", body: "Real estate, premium clinics, coaching, consulting — anywhere buyers research before deciding." },
      { vertical: "B2B with long sales cycles", body: "SaaS demos, enterprise enquiries, manufacturing RFQs." },
      { vertical: "Education", body: "Demo class → batch enrolment funnels with parent and student touchpoints." },
      { vertical: "Anyone running paid ads", body: "Doubles your ad ROAS by closing the leads you're already paying for." },
    ],
    howItWorks: [
      { step: "01", title: "Define the cadence", desc: "We design the 7-touch sequence around your sales cycle and buyer psychology — not a generic template." },
      { step: "02", title: "Wire the channels", desc: "WhatsApp Business API, transactional SMS, email (DKIM-aligned), AI voice agent — all routed by lead source and stage." },
      { step: "03", title: "Connect to CRM", desc: "Every touch logged. Replies routed to humans. Hot leads escalated. Lost leads archived with reason." },
      { step: "04", title: "Optimize monthly", desc: "We A/B test message copy, timing, channel order monthly. The cadence gets sharper every quarter." },
    ],
    whyZentro: [
      "Multi-channel, not single-channel — most automation tools only do email or only do WhatsApp.",
      "AI voice agent is part of the cadence — most competitors don't have voice integrated.",
      "Reply detection that's smarter than 'autoresponder paused' — handles 'not interested', 'send later', 'wrong number' correctly.",
    ],
    faqs: [
      { q: "Will leads find this annoying?", a: "Done right, no. The cadence respects opt-outs immediately, varies channel + tone (helpful → conversational → urgent → soft-close), and uses the lead's preferred language. We A/B test relentlessly to keep open + reply rates healthy." },
      { q: "What's the typical conversion lift?", a: "Clients report 2-4x more qualified meetings booked from the same top-of-funnel volume — by closing the leads competitors leave on the table." },
      { q: "Can it integrate with my existing CRM?", a: "Yes. Native integrations with Zoho, HubSpot, Pipedrive, Salesforce, plus webhook support for anything else." },
      { q: "Is WhatsApp cold messaging legal in India?", a: "Cold WhatsApp messaging is restricted; our system only nurtures leads who've already opted in via your forms / chat / voice channels. Fully compliant with WhatsApp Business API policies." },
    ],
    relatedSlugs: ["payment-recovery-automation", "lead-management-crm", "ai-voice-agents"],
    gradient: { from: "indigo", via: "indigo", to: "violet" },
    artMotif: "pulse",
  },
  "payment-recovery-automation": {
    slug: "payment-recovery-automation",
    accentLabel: "Cash collected, not chased",
    outcomePromise:
      "30-50% lower DSO without a single awkward phone call from you.",
    overview:
      "In India, getting paid takes follow-up — and most founders quietly absorb 20-40% bad debt because manual chasing is unbearable. We turn the awkward part into a system. Every overdue invoice triggers a polite-but-persistent reminder cadence — Day 0, 3, 7, 14, 21, 30 — across WhatsApp, email, and AI voice call. Tone calibrated stage-by-stage, escalating only when it must. Stops the second payment lands.",
    whoItsFor: [
      { vertical: "B2B service providers", body: "Agencies, freelancers, consultants paid on 30-60-90 day terms." },
      { vertical: "Small manufacturing / wholesale", body: "Trade credit collection from distributors and retailers." },
      { vertical: "Premium services with EMI / installment payments", body: "Clinics, coaching, premium retail with payment plans." },
      { vertical: "Property / real estate rentals", body: "Recurring rent collection with persistent reminder needs." },
    ],
    howItWorks: [
      { step: "01", title: "Connect invoicing", desc: "Plug into Tally, Zoho Books, QuickBooks, Razorpay, or your spreadsheet — we work with what you have." },
      { step: "02", title: "Configure cadence", desc: "Design the 6-stage reminder schedule. Tone goes from polite reminder → friendly nudge → firm escalation, never harsh." },
      { step: "03", title: "Multi-channel wiring", desc: "WhatsApp + email + AI voice all connected. Customers get reached on the channel they're most likely to respond to." },
      { step: "04", title: "Watch DSO drop", desc: "Live dashboard tracks recovery rate, average days-to-pay, and the customers most likely to default." },
    ],
    whyZentro: [
      "Tone calibration is the secret sauce — too soft = ignored, too firm = relationship damaged. We've tuned this across 30+ Indian SMB scenarios.",
      "AI voice call as a stage matters — many invoices get ignored on email but answered on a call.",
      "Auto-pause when payment hits the bank (via UPI / NEFT webhook) — never an embarrassing reminder after they've already paid.",
    ],
    faqs: [
      { q: "Is this legal under RBI / payment regulations?", a: "Yes. Reminder cadences for legitimate outstanding invoices are entirely legal. We avoid threatening language and any tactics that could be classified as harassment under the Consumer Protection Act." },
      { q: "What if a customer disputes the invoice?", a: "Disputes auto-pause the cadence and route to you with full context. The system never escalates a disputed invoice." },
      { q: "Will customers find AI voice creepy?", a: "Customers are notified upfront that the call is automated. Tone is professional and friendly. Most prefer it to an awkward human chase call from a real employee." },
      { q: "What's the recovery rate I should expect?", a: "Typical: 30-50% reduction in days-sales-outstanding within 90 days. Bad-debt write-offs typically drop by 20-30% in the first year." },
    ],
    relatedSlugs: ["lead-followup-automation", "lead-management-crm", "ai-voice-agents"],
    gradient: { from: "violet", via: "violet", to: "indigo" },
    artMotif: "ascending",
  },
  "ai-voice-agents": {
    slug: "ai-voice-agents",
    accentLabel: "Voice that scales",
    outcomePromise:
      "24/7 inbound + outbound voice in 4 Indian languages, at ₹2-6 per minute.",
    overview:
      "Indian SMBs lose 30-40% of inbound calls to missed-rings, language barriers, and after-hours. AI voice agents fix all three. Our agents answer your phone 24/7, qualify enquiries, book appointments, follow up on quotes, and chase invoices — in Hindi, Kannada, Tamil, Telugu, English, or any combination. Cost per resolved contact: ₹12-25 versus ₹40-120 for a human telecaller. Ten-fold scale, fraction of cost.",
    whoItsFor: [
      { vertical: "Clinics with high call volume", body: "Appointment booking, treatment FAQs, follow-up call campaigns." },
      { vertical: "Real estate / property", body: "Inbound enquiry qualification, site-visit scheduling, post-visit follow-up." },
      { vertical: "D2C brands at scale", body: "Order status enquiries, delivery rescheduling, return / refund processing." },
      { vertical: "Salons / spas / restaurants", body: "Reservation booking, table confirmation, no-show recovery." },
    ],
    howItWorks: [
      { step: "01", title: "Define the playbook", desc: "What questions does your agent need to handle? What flows should it route? We map the conversation tree end-to-end." },
      { step: "02", title: "Voice + language tuning", desc: "Pick the voice (male/female, regional accent), tune for your industry vocabulary, configure language handoff rules." },
      { step: "03", title: "Integrate + soft launch", desc: "CRM, calendar, Tally, payment gateway — all wired. We soft-launch on 10% of calls first to validate before scaling." },
      { step: "04", title: "Scale + improve", desc: "Move to 100% inbound. Monthly review: which flows fail, which need new branches, which competitors' techniques to copy." },
    ],
    whyZentro: [
      "We integrate the best India-first voice platforms (Bolna, Tabbly, Caller Digital) — not lock you to one vendor.",
      "Multi-language with proper code-switching ('I want appointment please' triggers Tamil/Hindi correctly mid-call).",
      "Cost-per-resolved-contact dashboard — you see ROI per call, not just total minutes.",
    ],
    faqs: [
      { q: "Will it sound like a robot?", a: "Modern voice models sound 95%+ human. Listeners often don't realize until told. We use platforms with the most natural Indian-language voices available." },
      { q: "What if a call needs a human?", a: "Auto-handoff. The AI says 'Let me connect you to our team' and forwards seamlessly. Full context (intent + transcript) goes to the human who picks up." },
      { q: "How do customers feel about it?", a: "Customers are notified at call-start that they're speaking with an AI agent. Most prefer it for transactional needs (booking, status, FAQs) and request human handoff for nuanced needs." },
      { q: "What languages are included by default?", a: "Hindi, Kannada, Tamil, Telugu, English in the standard package. Add Malayalam, Marathi, Bengali, Gujarati, Punjabi for a small per-minute surcharge." },
    ],
    relatedSlugs: ["ai-chatbots", "lead-followup-automation", "payment-recovery-automation"],
    gradient: { from: "indigo", via: "violet", to: "indigo" },
    artMotif: "waveform",
  },
  "ai-chatbots": {
    slug: "ai-chatbots",
    accentLabel: "Conversation that converts",
    outcomePromise:
      "Trained on your business — answers, qualifies, books, and hands off cleanly.",
    overview:
      "A generic chatbot frustrates buyers. A bot trained on your specific business, products, pricing, policies, and FAQs converts. We build chatbots powered by GPT/Gemini-class models, embedded on your website AND WhatsApp, that know your business cold. They qualify leads against your ICP filter, book appointments into your calendar, capture context, and hand off to humans only when needed.",
    whoItsFor: [
      { vertical: "E-commerce / D2C", body: "Pre-purchase product queries, sizing/fit, return policy, order status." },
      { vertical: "Service businesses", body: "Booking flow, pricing FAQs, service eligibility, location coverage." },
      { vertical: "Education / coaching", body: "Course information, batch timings, fee structure, enrolment process." },
      { vertical: "Real estate", body: "Property feature Q&A, site-visit booking, financing FAQs." },
    ],
    howItWorks: [
      { step: "01", title: "Knowledge ingestion", desc: "We feed the bot your website, FAQs, brochures, pricing docs, policies, sample WhatsApp chats. It learns your specific business, not a generic template." },
      { step: "02", title: "Persona + flow design", desc: "Tone (warm/professional/casual), qualification rules, escalation triggers, lead-capture forms — all configured for your buyer." },
      { step: "03", title: "Deploy on web + WhatsApp", desc: "Embedded chat widget on website. WhatsApp Business API for the same brain on WhatsApp. Same context, same knowledge." },
      { step: "04", title: "Train monthly on real chats", desc: "We review failed conversations monthly and retrain the bot to handle them. Quality improves every quarter." },
    ],
    whyZentro: [
      "RAG architecture means the bot pulls from current pricing/policies, not a stale snapshot.",
      "WhatsApp + website synced — the same lead can start on web and continue on WhatsApp without losing context.",
      "Hand-off includes the full conversation, not just 'speak with a human' — your team picks up where the bot left off.",
    ],
    faqs: [
      { q: "Will it hallucinate (make things up)?", a: "RAG architecture grounds responses in your actual content. We add a 'I don't know — let me get a human' fallback for anything outside your knowledge. Hallucination rate in production typically <2%." },
      { q: "Can it handle multiple languages?", a: "Yes. Default Hindi + English on every deployment. Add regional languages as needed." },
      { q: "Does it work with my existing CRM?", a: "Standard integrations with Zoho, HubSpot, Pipedrive, Salesforce, Freshworks, Bitrix24. Custom CRMs via webhook." },
      { q: "What if my product info changes weekly?", a: "Easy. Connect the bot to your CMS / Google Sheet / inventory feed and it syncs automatically. No re-training needed." },
    ],
    relatedSlugs: ["ai-voice-agents", "lead-followup-automation", "lead-management-crm"],
    gradient: { from: "violet", via: "indigo", to: "indigo" },
    artMotif: "speech",
  },
  "android-app-development": {
    slug: "android-app-development",
    accentLabel: "Native or cross-platform",
    outcomePromise:
      "Custom Android app at affordable Indian rates — Play Store-ready in 6-12 weeks.",
    overview:
      "Need an Android app for your business? Customer-facing, internal tool, B2B utility — we build it. Native Kotlin for performance-critical apps, cross-platform Flutter when iOS parity matters, your call after we discuss scope. Backend, integrations, Play Store submission, and a Care Plan that keeps it updated through Android version cycles.",
    whoItsFor: [
      { vertical: "Service marketplaces", body: "Customer + provider apps with bookings, payments, ratings." },
      { vertical: "Loyalty / rewards programs", body: "Points, tiers, redemption, push notifications, referrals." },
      { vertical: "Internal field-team apps", body: "Job assignments, photo uploads, GPS tracking, daily reports." },
      { vertical: "Education / content businesses", body: "Course delivery, video streaming, quizzes, progress tracking." },
    ],
    howItWorks: [
      { step: "01", title: "Scope + spec", desc: "Discovery workshop. We map user flows, must-have vs nice-to-have features, third-party integrations needed." },
      { step: "02", title: "Design + prototype", desc: "Figma prototype before we write a line of code. You sign off on every screen and flow." },
      { step: "03", title: "Build + integrate", desc: "Iterative 2-week sprints. Backend, APIs, payment gateways, push notifications, analytics — all wired." },
      { step: "04", title: "Play Store + maintain", desc: "Submission, ASO basics, launch monitoring. Care Plan covers updates, OS-version compatibility, security patches." },
    ],
    whyZentro: [
      "We bundle Android with website if you need both — single contract, one project manager, faster delivery.",
      "Self-hosted backend on your VPS (₹2-5K/mo) instead of expensive Firebase scaling — you own the infrastructure.",
      "Care Plan keeps the app working through Android upgrades — Play Store policies, target SDK requirements, security patches.",
    ],
    faqs: [
      { q: "Native Kotlin or Flutter — which is right for me?", a: "Native Kotlin: best for graphics-heavy or hardware-intensive apps (camera AR, sensors, video). Flutter: best when you want iOS later, faster initial development, mostly UI-driven app. We recommend after the discovery call — no preference baked in." },
      { q: "Do you do iOS too?", a: "We build iOS via Flutter (cross-platform). For native iOS only, we partner with an iOS specialist team. Tell us upfront if iOS is critical." },
      { q: "What about app maintenance?", a: "Android pushes major changes yearly (target SDK requirements, permissions, etc.). Without maintenance, apps break. Our Care Plan covers this — typical cost is 10-15% of the build cost annually." },
      { q: "Will my app be on iOS too?", a: "Only if we build with Flutter or you commission a separate iOS build. Cross-platform is usually the cost-effective answer." },
    ],
    relatedSlugs: ["lead-generation-websites", "ai-chatbots", "lead-management-crm"],
    gradient: { from: "indigo", via: "indigo", to: "violet" },
    artMotif: "phone",
  },
  "seo-services-bangalore": {
    slug: "seo-services-bangalore",
    accentLabel: "Show up where buyers search",
    outcomePromise:
      "Rank on Google. Show up on Maps. Get found by buyers in your city — every month, more.",
    overview:
      "SEO for Indian SMB isn't keyword-stuffing or spammy backlinks anymore. It's: technical health (site speed, mobile, schema), local presence (Google Business Profile, citations, reviews), targeted content (the questions your buyers actually search), and patient consistency. We do all four, monthly, with a dashboard you can read.",
    whoItsFor: [
      { vertical: "Local services with city-specific buyers", body: "Clinics, salons, real estate, repair, fitness, professional services." },
      { vertical: "B2B service businesses", body: "Agencies, consultants, software vendors targeting India SMB or enterprise." },
      { vertical: "E-commerce / D2C with multiple SKUs", body: "Product page SEO, category SEO, schema markup, faceted search." },
      { vertical: "Anyone losing traffic to listicles", body: "Niches where 'top 10 X in Bangalore' listicles dominate the SERP." },
    ],
    howItWorks: [
      { step: "01", title: "Audit + baseline", desc: "Technical audit, current ranking, competitor gap analysis, Google Business Profile review. We document where you stand today." },
      { step: "02", title: "Fix the foundation", desc: "Schema markup, Core Web Vitals, mobile UX, internal linking, GBP optimization. The non-content fundamentals first." },
      { step: "03", title: "Content engine", desc: "4-8 articles/month targeting the long-tail keywords your buyers actually use. Programmatic location pages where they make sense." },
      { step: "04", title: "Measure + adjust", desc: "Monthly ranking + traffic + lead-source review. We adjust content focus quarterly based on what's converting (not just ranking)." },
    ],
    whyZentro: [
      "Programmatic SEO for city × service combinations — captures long-tail others ignore.",
      "Bangalore-specific knowledge: we know which directories drive citations and which competitors are paying for what.",
      "Outcome-tied: we report on leads (not just traffic) so you know SEO is paying back in pipeline.",
    ],
    faqs: [
      { q: "How long until I see results?", a: "First Google Business Profile improvements: 30-45 days. Organic ranking shifts: 3-6 months. Real lead-flow impact: 6-12 months. SEO is patient work — we publish a 90-day plan up front so expectations are clear." },
      { q: "Are backlinks part of this?", a: "Yes — but ethical, slow, citation-and-relationship-driven backlinks. Not paid PBN networks. Indian SMB SEO doesn't need spammy links and they're a long-term liability." },
      { q: "Do you do paid ads too?", a: "Paid Google + Meta ads are a separate service. Many clients run both — paid for fast lead flow, organic for sustainable cost-of-acquisition." },
      { q: "What if my competitor has 10,000 backlinks already?", a: "We don't compete on raw backlink count. We compete on long-tail-keyword coverage + local-pack dominance + content depth. That's where SMB SEO is winnable." },
    ],
    relatedSlugs: ["lead-generation-websites", "website-audit-and-seo-fix", "lead-management-crm"],
    gradient: { from: "violet", via: "indigo", to: "indigo" },
    artMotif: "search",
  },
  "lead-management-crm": {
    slug: "lead-management-crm",
    accentLabel: "No leak. No leak.",
    outcomePromise:
      "Every lead tracked. Every salesperson accountable. Zero leaks.",
    overview:
      "Most Indian SMBs run sales on a WhatsApp group + spreadsheet. It works until you scale — then leads get forgotten, salespeople blame each other, and pipeline visibility evaporates. We set up a real CRM (Zoho default; HubSpot if needed), wire it to every lead source, configure auto-routing, and give you the dashboards a 5-person sales team needs to operate.",
    whoItsFor: [
      { vertical: "Service businesses with 2-10 sales people", body: "Real estate brokerages, education consultancies, professional services, B2B sales teams." },
      { vertical: "Anyone running multi-channel inbound", body: "Website + WhatsApp + walk-ins + ads — needs a single place where everything lands." },
      { vertical: "Field sales teams", body: "Mobile-app CRM access, geo-tagged check-ins, daily activity reports." },
      { vertical: "Anyone outgrowing spreadsheet-based lead tracking", body: "If you have >50 leads/month, the spreadsheet is now a bottleneck." },
    ],
    howItWorks: [
      { step: "01", title: "Audit your sales process", desc: "How do leads come in today? Who responds? In what time? What gets dropped? We document the leaks before fixing them." },
      { step: "02", title: "CRM setup + import", desc: "Zoho or HubSpot configured. Existing data migrated. Lead-stages, custom fields, automation rules wired to your process." },
      { step: "03", title: "Wire every source", desc: "Website forms → CRM. WhatsApp → CRM. Calls → CRM. Ads → CRM. One inbox, full attribution." },
      { step: "04", title: "Sales-team training + reviews", desc: "We train the team, build daily / weekly / monthly review dashboards, and hand over runbooks for every routine task." },
    ],
    whyZentro: [
      "Zoho-first means much lower per-seat cost than HubSpot — we rarely upsell HubSpot unless the business case demands it.",
      "Mobile-first setup — most Indian field-sales teams live on their phone, not laptops.",
      "We bake in the follow-up + payment-recovery automation from day one if you want it.",
    ],
    faqs: [
      { q: "Zoho or HubSpot — which should I pick?", a: "Default: Zoho. ~10-15x cheaper than HubSpot for the same SMB feature set. We recommend HubSpot only if you need its specific marketing automation suite or already have a HubSpot ecosystem. Most SMBs are best served by Zoho." },
      { q: "What about Salesforce?", a: "Salesforce is enterprise-grade. For 2-25 person teams it's overkill and overpriced. We can integrate with it if you have it; we don't recommend installing it fresh." },
      { q: "How long until my team adopts it?", a: "With proper training + automation that makes their life easier (not harder), 2-4 weeks to consistent daily use. We design adoption like a UX challenge — minimum friction, maximum daily value." },
      { q: "Can I keep using WhatsApp groups?", a: "Yes — but with WhatsApp Business API integration so the conversation history syncs to the CRM automatically. Best of both worlds." },
    ],
    relatedSlugs: ["lead-followup-automation", "payment-recovery-automation", "ai-chatbots"],
    gradient: { from: "indigo", via: "violet", to: "violet" },
    artMotif: "pipeline",
  },
  "website-audit-and-seo-fix": {
    slug: "website-audit-and-seo-fix",
    accentLabel: "Fix what you have",
    outcomePromise:
      "Already have a website? We audit it and fix the issues killing your leads — at half the cost of a rebuild.",
    overview:
      "If your existing website looks fine but leads are flat, the problem is rarely the design — it's hidden technical issues, broken conversion paths, weak SEO foundations, or content that doesn't match what buyers search. We run a 60+ point audit, deliver a prioritized fix list, and implement the top 20 issues. You keep your existing site and brand; we make it work harder.",
    whoItsFor: [
      { vertical: "Businesses with 2+ year old websites", body: "Most pre-2024 sites have major Core Web Vitals + mobile + schema gaps." },
      { vertical: "Sites that rank but don't convert", body: "Traffic is fine; lead form is broken or buried. Quick fixes here." },
      { vertical: "Sites that don't rank", body: "Probably technical SEO + content — we surface where the gaps are." },
      { vertical: "Anyone considering a rebuild", body: "Before you spend ₹3-6L rebuilding, spend less and see if a fix will get you 80% of the way." },
    ],
    howItWorks: [
      { step: "01", title: "Full audit (week 1)", desc: "60+ point checklist covering technical SEO, on-page SEO, Core Web Vitals, mobile UX, conversion paths, content gaps, GBP, citations, competitor delta." },
      { step: "02", title: "Prioritized fix list", desc: "Every issue ranked by impact × effort. You see exactly what we'll fix and what the expected outcome is." },
      { step: "03", title: "Implementation (weeks 2-4)", desc: "We implement the top 20 issues. Schema markup added, page speed optimized, internal links restructured, GBP fixed, conversion paths repaired." },
      { step: "04", title: "Monitor + iterate", desc: "30-day post-launch review: rankings, traffic, leads. We adjust based on what moved and what didn't." },
    ],
    whyZentro: [
      "We audit conversion + SEO together — most agencies only audit one and miss the other.",
      "Implementation is included — not 'here's a 50-page report, good luck'.",
      "If a rebuild is genuinely the right answer, we tell you up front and credit the audit cost toward the rebuild.",
    ],
    faqs: [
      { q: "How much does this cost vs a full rebuild?", a: "Roughly half. The exact figure depends on how many of the top issues need our hands vs your existing dev team's. Quote-based after the audit phase." },
      { q: "What if my site is on Wix / WordPress / Shopify?", a: "All fine. We work in whatever stack you're on — we don't force a migration." },
      { q: "Do you guarantee ranking improvement?", a: "We guarantee implementation of the fix list. SEO ranking depends on competitor activity + content + time. We commit to a 90-day expected impact range upfront and report against it monthly." },
      { q: "Can I just buy the audit without implementation?", a: "Yes. Audit-only engagement available. Then you can choose to implement yourself, with your dev team, or have us do it." },
    ],
    relatedSlugs: ["seo-services-bangalore", "lead-generation-websites", "lead-management-crm"],
    gradient: { from: "violet", via: "violet", to: "indigo" },
    artMotif: "magnifier",
  },
};
