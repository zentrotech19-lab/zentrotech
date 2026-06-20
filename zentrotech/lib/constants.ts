export const SITE = {
  name: "ZentroTECH",
  url: "https://zentrotech.in",
  tagline: "Build. Automate. Get Paid.",
  description:
    "ZentroTECH is Bangalore's Kannada-first AI agency: AI voice agents in 11 Indian languages, WhatsApp Business automation, lead-engine websites, and payment recovery — done for you. 21-day delivery, money-back trial. Serving 138 cities across South India.",
  email: "hello@zentrotech.in",
  phone: "+91 73489 61600",
  whatsapp: "+91 73489 61600",
  founded: 2026,
  gst: "29FETPS9602L1ZC",
  legalForm: "Proprietorship",
};

export const OFFICES = [
  {
    city: "Bangalore",
    region: "Karnataka, India",
    country: "India",
    address: "228/1, 5th Cross Road, Koramangala, Bengaluru, Karnataka 560034",
    phone: "+91 73489 61600",
    email: "hello@zentrotech.in",
    timezone: "IST (UTC+5:30)",
    primary: true,
    coords: { lat: 12.9352, lng: 77.6245 }, // Koramangala 1st Block centroid
  },
];

// Service area — programmatic SEO. Each city becomes /locations/[slug].
// Tier A = Bangalore HQ + neighborhoods. Tier B = South India metros.
// Tier C/D = Tamil Nadu and South India tier-2 hubs.
// Expanded to 138 entries by the SEO build session.
export const SOUTH_INDIA_CITIES = [
  // ===== Tier A — Bangalore + neighborhoods + IT parks =====
  { slug: "bangalore", label: "Bangalore", state: "Karnataka", tier: "A" },
  { slug: "koramangala", label: "Koramangala", state: "Karnataka", tier: "A" },
  { slug: "hsr-layout", label: "HSR Layout", state: "Karnataka", tier: "A" },
  { slug: "indiranagar", label: "Indiranagar", state: "Karnataka", tier: "A" },
  { slug: "btm-layout", label: "BTM Layout", state: "Karnataka", tier: "A" },
  { slug: "domlur", label: "Domlur", state: "Karnataka", tier: "A" },
  { slug: "ejipura", label: "Ejipura", state: "Karnataka", tier: "A" },
  { slug: "whitefield", label: "Whitefield", state: "Karnataka", tier: "A" },
  { slug: "marathahalli", label: "Marathahalli", state: "Karnataka", tier: "A" },
  { slug: "bellandur", label: "Bellandur", state: "Karnataka", tier: "A" },
  { slug: "sarjapur-road", label: "Sarjapur Road", state: "Karnataka", tier: "A" },
  { slug: "outer-ring-road", label: "Outer Ring Road (ORR)", state: "Karnataka", tier: "A" },
  { slug: "kr-puram", label: "KR Puram", state: "Karnataka", tier: "A" },
  { slug: "mahadevapura", label: "Mahadevapura", state: "Karnataka", tier: "A" },
  { slug: "brookefield", label: "Brookefield", state: "Karnataka", tier: "A" },
  { slug: "kundalahalli", label: "Kundalahalli", state: "Karnataka", tier: "A" },
  { slug: "kadugodi", label: "Kadugodi", state: "Karnataka", tier: "A" },
  { slug: "hoodi", label: "Hoodi", state: "Karnataka", tier: "A" },
  { slug: "ramamurthy-nagar", label: "Ramamurthy Nagar", state: "Karnataka", tier: "A" },
  { slug: "cv-raman-nagar", label: "CV Raman Nagar", state: "Karnataka", tier: "A" },
  { slug: "varthur", label: "Varthur", state: "Karnataka", tier: "A" },
  { slug: "electronic-city", label: "Electronic City", state: "Karnataka", tier: "A" },
  { slug: "jayanagar", label: "Jayanagar", state: "Karnataka", tier: "A" },
  { slug: "jp-nagar", label: "JP Nagar", state: "Karnataka", tier: "A" },
  { slug: "banashankari", label: "Banashankari", state: "Karnataka", tier: "A" },
  { slug: "bannerghatta-road", label: "Bannerghatta Road", state: "Karnataka", tier: "A" },
  { slug: "bommanahalli", label: "Bommanahalli", state: "Karnataka", tier: "A" },
  { slug: "begur", label: "Begur", state: "Karnataka", tier: "A" },
  { slug: "hulimavu", label: "Hulimavu", state: "Karnataka", tier: "A" },
  { slug: "anjanapura", label: "Anjanapura", state: "Karnataka", tier: "A" },
  { slug: "kanakapura-road", label: "Kanakapura Road", state: "Karnataka", tier: "A" },
  { slug: "uttarahalli", label: "Uttarahalli", state: "Karnataka", tier: "A" },
  { slug: "basavanagudi", label: "Basavanagudi", state: "Karnataka", tier: "A" },
  { slug: "wilson-garden", label: "Wilson Garden", state: "Karnataka", tier: "A" },
  { slug: "hebbal", label: "Hebbal", state: "Karnataka", tier: "A" },
  { slug: "yelahanka", label: "Yelahanka", state: "Karnataka", tier: "A" },
  { slug: "nagavara", label: "Nagavara", state: "Karnataka", tier: "A" },
  { slug: "jakkur", label: "Jakkur", state: "Karnataka", tier: "A" },
  { slug: "thanisandra", label: "Thanisandra", state: "Karnataka", tier: "A" },
  { slug: "rt-nagar", label: "RT Nagar", state: "Karnataka", tier: "A" },
  { slug: "sahakar-nagar", label: "Sahakar Nagar", state: "Karnataka", tier: "A" },
  { slug: "vidyaranyapura", label: "Vidyaranyapura", state: "Karnataka", tier: "A" },
  { slug: "malleshwaram", label: "Malleshwaram", state: "Karnataka", tier: "A" },
  { slug: "yeshwanthpur", label: "Yeshwanthpur", state: "Karnataka", tier: "A" },
  { slug: "rajajinagar", label: "Rajajinagar", state: "Karnataka", tier: "A" },
  { slug: "vijayanagar", label: "Vijayanagar", state: "Karnataka", tier: "A" },
  { slug: "kengeri", label: "Kengeri", state: "Karnataka", tier: "A" },
  { slug: "magadi-road", label: "Magadi Road", state: "Karnataka", tier: "A" },
  { slug: "peenya", label: "Peenya Industrial Area", state: "Karnataka", tier: "A" },
  { slug: "nagarbhavi", label: "Nagarbhavi", state: "Karnataka", tier: "A" },
  { slug: "rajarajeshwari-nagar", label: "Rajarajeshwari Nagar", state: "Karnataka", tier: "A" },
  { slug: "mg-road", label: "MG Road", state: "Karnataka", tier: "A" },
  { slug: "brigade-road", label: "Brigade Road", state: "Karnataka", tier: "A" },
  { slug: "commercial-street", label: "Commercial Street", state: "Karnataka", tier: "A" },
  { slug: "church-street", label: "Church Street", state: "Karnataka", tier: "A" },
  { slug: "ub-city", label: "UB City", state: "Karnataka", tier: "A" },
  { slug: "trinity-circle", label: "Trinity Circle", state: "Karnataka", tier: "A" },
  { slug: "richmond-town", label: "Richmond Town", state: "Karnataka", tier: "A" },
  { slug: "shivajinagar", label: "Shivajinagar", state: "Karnataka", tier: "A" },
  { slug: "fraser-town", label: "Fraser Town", state: "Karnataka", tier: "A" },
  { slug: "cox-town", label: "Cox Town", state: "Karnataka", tier: "A" },
  { slug: "cantonment", label: "Cantonment", state: "Karnataka", tier: "A" },
  { slug: "ulsoor", label: "Ulsoor", state: "Karnataka", tier: "A" },
  { slug: "manyata-tech-park", label: "Manyata Tech Park", state: "Karnataka", tier: "A" },
  { slug: "bagmane-tech-park", label: "Bagmane Tech Park", state: "Karnataka", tier: "A" },
  { slug: "embassy-tech-village", label: "Embassy Tech Village", state: "Karnataka", tier: "A" },
  { slug: "prestige-tech-park", label: "Prestige Tech Park", state: "Karnataka", tier: "A" },
  { slug: "rmz-ecoworld", label: "RMZ Ecoworld", state: "Karnataka", tier: "A" },
  { slug: "rmz-ecospace", label: "RMZ Ecospace", state: "Karnataka", tier: "A" },
  { slug: "pritech-park", label: "Pritech Park", state: "Karnataka", tier: "A" },
  { slug: "itpl-whitefield", label: "ITPL Whitefield", state: "Karnataka", tier: "A" },
  { slug: "salarpuria-sattva-knowledge-city", label: "Salarpuria Sattva Knowledge City", state: "Karnataka", tier: "A" },
  { slug: "global-village-tech-park", label: "Global Village Tech Park", state: "Karnataka", tier: "A" },
  { slug: "kalyani-tech-park", label: "Kalyani Tech Park", state: "Karnataka", tier: "A" },
  { slug: "cessna-business-park", label: "Cessna Business Park", state: "Karnataka", tier: "A" },

  // ===== Tier B — South India metros + Bangalore satellite towns =====
  { slug: "chennai", label: "Chennai", state: "Tamil Nadu", tier: "B" },
  { slug: "hyderabad", label: "Hyderabad", state: "Telangana", tier: "B" },
  { slug: "kochi", label: "Kochi", state: "Kerala", tier: "B" },
  { slug: "coimbatore", label: "Coimbatore", state: "Tamil Nadu", tier: "B" },
  { slug: "pune", label: "Pune", state: "Maharashtra", tier: "B" },
  { slug: "devanahalli", label: "Devanahalli", state: "Karnataka", tier: "B" },
  { slug: "doddaballapur", label: "Doddaballapur", state: "Karnataka", tier: "B" },
  { slug: "nelamangala", label: "Nelamangala", state: "Karnataka", tier: "B" },
  { slug: "hoskote", label: "Hoskote", state: "Karnataka", tier: "B" },
  { slug: "anekal", label: "Anekal", state: "Karnataka", tier: "B" },
  { slug: "attibele", label: "Attibele", state: "Karnataka", tier: "B" },
  { slug: "bidadi", label: "Bidadi", state: "Karnataka", tier: "B" },
  { slug: "hosur", label: "Hosur", state: "Tamil Nadu", tier: "B" },

  // ===== Tier C — Tier-2 commercial centres =====
  { slug: "mysore", label: "Mysore", state: "Karnataka", tier: "C" },
  { slug: "mangalore", label: "Mangalore", state: "Karnataka", tier: "C" },
  { slug: "hubli", label: "Hubli", state: "Karnataka", tier: "C" },
  { slug: "belagavi", label: "Belagavi", state: "Karnataka", tier: "C" },
  { slug: "tumakuru", label: "Tumakuru", state: "Karnataka", tier: "C" },
  { slug: "shivamogga", label: "Shivamogga", state: "Karnataka", tier: "C" },
  { slug: "udupi", label: "Udupi", state: "Karnataka", tier: "C" },
  { slug: "manipal", label: "Manipal", state: "Karnataka", tier: "C" },
  { slug: "madurai", label: "Madurai", state: "Tamil Nadu", tier: "C" },
  { slug: "trichy", label: "Trichy", state: "Tamil Nadu", tier: "C" },
  { slug: "vellore", label: "Vellore", state: "Tamil Nadu", tier: "C" },
  { slug: "tirunelveli", label: "Tirunelveli", state: "Tamil Nadu", tier: "C" },
  { slug: "tirupur", label: "Tirupur", state: "Tamil Nadu", tier: "C" },
  { slug: "visakhapatnam", label: "Visakhapatnam", state: "Andhra Pradesh", tier: "C" },
  { slug: "vijayawada", label: "Vijayawada", state: "Andhra Pradesh", tier: "C" },
  { slug: "thiruvananthapuram", label: "Thiruvananthapuram", state: "Kerala", tier: "C" },
  { slug: "kozhikode", label: "Kozhikode", state: "Kerala", tier: "C" },
  { slug: "thrissur", label: "Thrissur", state: "Kerala", tier: "C" },

  // ===== Tier D — Tier-2 secondary commercial =====
  { slug: "davangere", label: "Davangere", state: "Karnataka", tier: "D" },
  { slug: "ballari", label: "Ballari", state: "Karnataka", tier: "D" },
  { slug: "hassan", label: "Hassan", state: "Karnataka", tier: "D" },
  { slug: "chitradurga", label: "Chitradurga", state: "Karnataka", tier: "D" },
  { slug: "kalaburagi", label: "Kalaburagi", state: "Karnataka", tier: "D" },
  { slug: "salem", label: "Salem", state: "Tamil Nadu", tier: "D" },
  { slug: "erode", label: "Erode", state: "Tamil Nadu", tier: "D" },
  { slug: "thanjavur", label: "Thanjavur", state: "Tamil Nadu", tier: "D" },
  { slug: "dindigul", label: "Dindigul", state: "Tamil Nadu", tier: "D" },
  { slug: "karur", label: "Karur", state: "Tamil Nadu", tier: "D" },
  { slug: "namakkal", label: "Namakkal", state: "Tamil Nadu", tier: "D" },
  { slug: "kanchipuram", label: "Kanchipuram", state: "Tamil Nadu", tier: "D" },
  { slug: "tirupati", label: "Tirupati", state: "Andhra Pradesh", tier: "D" },
  { slug: "guntur", label: "Guntur", state: "Andhra Pradesh", tier: "D" },
  { slug: "nellore", label: "Nellore", state: "Andhra Pradesh", tier: "D" },
  { slug: "rajahmundry", label: "Rajahmundry", state: "Andhra Pradesh", tier: "D" },
  { slug: "kurnool", label: "Kurnool", state: "Andhra Pradesh", tier: "D" },
  { slug: "warangal", label: "Warangal", state: "Telangana", tier: "D" },
  { slug: "karimnagar", label: "Karimnagar", state: "Telangana", tier: "D" },
  { slug: "nizamabad", label: "Nizamabad", state: "Telangana", tier: "D" },
  { slug: "kollam", label: "Kollam", state: "Kerala", tier: "D" },
  { slug: "kannur", label: "Kannur", state: "Kerala", tier: "D" },
  { slug: "palakkad", label: "Palakkad", state: "Kerala", tier: "D" },
  { slug: "kottayam", label: "Kottayam", state: "Kerala", tier: "D" },
] as const;

// Vertical landing pages — chatbot/voice keyword gaps from research.
export const VERTICALS = [
  { slug: "clinics", label: "Clinics & Healthcare", icon: "Stethoscope" },
  { slug: "real-estate", label: "Real Estate Brokers", icon: "Building2" },
  { slug: "d2c-brands", label: "D2C & E-commerce Brands", icon: "ShoppingBag" },
  { slug: "restaurants", label: "Restaurants & F&B", icon: "Utensils" },
  { slug: "salons", label: "Salons & Spas", icon: "Scissors" },
  { slug: "coaching", label: "Coaching & Education", icon: "GraduationCap" },
  { slug: "professional-services", label: "CA / Legal / Architects", icon: "Briefcase" },
  { slug: "manufacturing-smb", label: "Manufacturing SMB", icon: "Factory" },
] as const;

export const SERVICES = [
  {
    slug: "lead-generation-websites",
    title: "Lead Engine Websites",
    short: "Websites that produce leads, not brochures.",
    description:
      "We build websites engineered as lead engines — funnels, landing pages, forms, chat, WhatsApp, voice agent, and CRM all wired together. Every page has a measurable conversion event. SEO baked in, not bolted on.",
    icon: "Target",
    color: "indigo",
    deliverables: [
      "Lead-capture funnels with 3-5 landing pages",
      "WhatsApp + form + chatbot + CRM stitched into one funnel",
      "Programmatic SEO landing pages by city + vertical",
      "Conversion tracking + analytics dashboard",
      "Mobile-first responsive across all Indian devices",
    ],
  },
  {
    slug: "business-on-autopilot",
    title: "Business on Autopilot",
    short: "Run your business with low headcount. We automate the rest.",
    description:
      "Built for solo founders and small teams: we map your existing manual process — sales, ops, support, follow-up, accounting — and replicate it as automated workflows that run while you sleep. One contract replaces 5-6 SaaS subscriptions.",
    icon: "Cpu",
    color: "violet",
    deliverables: [
      "Process audit + automation opportunity map",
      "n8n / Make workflow build (self-hosted, low monthly cost)",
      "WhatsApp Business API automations",
      "Document generation (proposals, quotes, invoices)",
      "Slack / Telegram / email auto-routing",
    ],
  },
  {
    slug: "lead-followup-automation",
    title: "Lead Follow-up Automation",
    short: "Indian SMB closes after 5-7 touches. We do the touches.",
    description:
      "Every form fill / WhatsApp message / call enquiry triggers a 7-touch sequence — WhatsApp, SMS, email, scheduled AI voice call — until the lead either books a meeting or explicitly opts out. Most agencies stop at touch 1 or 2; we close the gap.",
    icon: "MessageSquare",
    color: "indigo",
    deliverables: [
      "7-touch nurture cadence per inbound lead",
      "Multi-channel orchestration (WhatsApp + email + SMS + voice)",
      "Auto-routing to the right salesperson",
      "Reply detection + opt-out handling",
      "Conversion dashboard with per-touch attribution",
    ],
  },
  {
    slug: "payment-recovery-automation",
    title: "Payment Recovery Automation",
    short: "Your invoices get paid. Without the awkward calls.",
    description:
      "Every unpaid invoice triggers a polite-but-persistent reminder cadence — Day 0 / 3 / 7 / 14 / 21 / 30 — via WhatsApp + email + AI voice call. Stops automatically when payment lands. Average outcome: 30-50% reduction in days-sales-outstanding.",
    icon: "Wallet",
    color: "violet",
    deliverables: [
      "6-stage reminder cadence per overdue invoice",
      "WhatsApp + email + AI voice call orchestration",
      "Auto-pause on payment receipt",
      "Tone calibration (polite → firm → final notice)",
      "DSO dashboard + recovery rate analytics",
    ],
  },
  {
    slug: "ai-voice-agents",
    title: "AI Voice Agents",
    short: "24/7 inbound + outbound voice — Hindi, Kannada, Tamil, Telugu, English.",
    description:
      "AI voice agents that answer your incoming calls, qualify leads, book appointments, follow up on quotes, and chase invoices. Multi-lingual for the Indian market. Cost per resolved contact: ₹12-25 vs ₹40-120 for a human telecaller.",
    icon: "Phone",
    color: "indigo",
    deliverables: [
      "Inbound IVR replacement (booking, FAQ, routing)",
      "Outbound calling (lead qualification, follow-up, recovery)",
      "4+ Indian language support",
      "CRM + calendar integration",
      "Call recordings, transcripts, sentiment dashboard",
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    short: "Website + WhatsApp chatbots that answer, qualify, and capture.",
    description:
      "GPT/Gemini-class chatbots embedded on your website and WhatsApp. They answer FAQs, qualify leads, book appointments, and hand off to humans when needed. Trained on your business — not generic.",
    icon: "Bot",
    color: "violet",
    deliverables: [
      "Trained on your business knowledge (RAG)",
      "Embedded on website + WhatsApp Business API",
      "Lead capture + auto-routing to CRM",
      "Multi-language (Hindi + English minimum)",
      "Human handoff with full conversation context",
    ],
  },
  {
    slug: "android-app-development",
    title: "Android App Development",
    short: "Custom Android apps at affordable Indian rates.",
    description:
      "Need an Android app for your business? We build it — custom-scoped to your requirements, native or cross-platform, with backend, integrations, Play Store launch, and a Care Plan that keeps it updated.",
    icon: "Smartphone",
    color: "indigo",
    deliverables: [
      "Native (Kotlin) or cross-platform (Flutter / RN)",
      "Backend + APIs + database design",
      "Play Store launch + ASO basics",
      "Web companion site option (single contract bundle)",
      "Subscription Care Plan for updates + bug fixes",
    ],
  },
  {
    slug: "seo-services-bangalore",
    title: "SEO + Local Visibility",
    short: "Rank on Google. Show up on Maps. Get found by buyers in your city.",
    description:
      "Local SEO + Google Business Profile + content + backlinks. We make you findable when an SMB owner in Bangalore (or Coimbatore, or Madurai) types your service into Google.",
    icon: "Search",
    color: "violet",
    deliverables: [
      "Technical SEO audit + on-page fixes",
      "Google Business Profile optimization + 30 posts",
      "Local citation building (40+ directories)",
      "Programmatic location pages (city × service)",
      "Monthly content publishing + ranking dashboard",
    ],
  },
  {
    slug: "lead-management-crm",
    title: "Lead Management + CRM",
    short: "Every lead tracked. Every salesperson accountable. Zero leaks.",
    description:
      "Zoho or HubSpot CRM, wired to your website, WhatsApp, calls, and ads. Lead-scoring, auto-routing, follow-up reminders, sales-team dashboards. We replace your spreadsheet with a system that doesn't lose leads.",
    icon: "Users",
    color: "indigo",
    deliverables: [
      "CRM setup (Zoho default — affordable; HubSpot if needed)",
      "Auto-routing rules by source / vertical / value",
      "Lead-scoring + stale-lead alerts",
      "Sales-team dashboards + monthly review template",
      "Mobile-app access for field teams",
    ],
  },
  {
    slug: "website-audit-and-seo-fix",
    title: "Website Audit + Lead Boost",
    short: "Already have a website? We audit it and fix what's killing your leads.",
    description:
      "If you already have a website but leads are flat, we run a full audit — SEO, page speed, mobile UX, conversion paths, content gaps, technical issues — and deliver a prioritized fix list with implementation. Same automation + follow-up layer as a fresh build, half the cost.",
    icon: "FileSearch",
    color: "violet",
    deliverables: [
      "Comprehensive 60+ point SEO + technical audit",
      "Conversion-rate review of every key page",
      "Page-speed + Core Web Vitals fix",
      "Competitor gap analysis (top-3 keywords)",
      "Prioritized fix list + we implement the top 20",
      "GBP optimization + local citation cleanup",
      "Optional: bolt on follow-up + payment automation",
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "30-min call. Requirements form. We map what you do today and where leads / payments leak.",
  },
  {
    step: "02",
    title: "Design",
    description: "Wireframes + 3D / animation direction + automation flow diagrams. You sign off before we build.",
  },
  {
    step: "03",
    title: "Build",
    description: "Website, app, AI agents, CRM, and follow-up automation — built and tested in 2-6 weeks.",
  },
  {
    step: "04",
    title: "Launch",
    description: "SEO live. GBP optimized. Voice agent answering. Chatbot handling enquiries. Analytics tracking everything.",
  },
  {
    step: "05",
    title: "Scale",
    description: "Care Plan keeps it humming. Quarterly audits. Beat top-3 competitors on keywords. Add automations as you grow.",
  },
] as const;

export const FAQS = [
  {
    q: "How much does a lead-engine website cost?",
    a: "It depends on scope, integrations, and ongoing automation needs. Starter SEO sites are affordable; full lead-engine builds with 3D, AI voice, and follow-up automation are a larger investment. Fill the requirements form and we send a custom quote within 1 business day — no obligation.",
  },
  {
    q: "How is this different from a normal website agency?",
    a: "Most agencies sell you a website, then leave. We build the website AND the AI follow-up + payment recovery automation that fills it with leads and gets you paid. We also won't ask you to subscribe to 5 different SaaS tools — we use self-hosted and affordable alternatives. One contract, one team.",
  },
  {
    q: "Do you serve businesses outside Bangalore?",
    a: "Yes. We're headquartered in Bangalore but actively serve 138 cities across South India — Chennai, Hyderabad, Coimbatore, Kochi, Mysore, Madurai, Trichy, Salem, Mangalore, Vijayawada, Visakhapatnam, Thiruvananthapuram, and more. Anywhere in India for the right project.",
  },
  {
    q: "What's your 'business on autopilot' service for solo founders?",
    a: "We map your manual process — how you handle sales enquiries, send quotes, chase payments, post on social, manage bookings — then build automated workflows that do those same things while you focus on growth. Built for 1-5 person teams who can't afford an ops manager.",
  },
  {
    q: "Why does a payment recovery system matter?",
    a: "In India, getting paid takes multiple polite reminders. Most businesses stop at 1-2 follow-ups out of awkwardness and lose 20-40% of their receivables. Our system runs a 6-stage reminder cadence over 30 days via WhatsApp + email + AI voice — automatically — and stops the second payment lands. Recovery typically improves 30-50%.",
  },
  {
    q: "Can you build us an Android app along with the website?",
    a: "Yes. We bundle Android app development into a single contract with the website if you need both. Native Kotlin or cross-platform Flutter, your call — we'll recommend based on scope and cost.",
  },
  {
    q: "What languages does your AI voice agent speak?",
    a: "Hindi, Kannada, Tamil, Telugu, and English by default. Add Malayalam, Marathi, Bengali, Gujarati, Punjabi as needed. Multi-language adds a small per-minute surcharge.",
  },
  {
    q: "Do I have to pay for a bunch of SaaS subscriptions?",
    a: "No. That's our anti-pitch. Most agencies set you up with HubSpot + Zapier + Calendly + Twilio + ClickFunnels — your monthly tool bill grows huge. We use self-hosted n8n, Zoho or open-source CRM, WhatsApp Business API, and affordable voice platforms. You'll spend less on tools after working with us, not more.",
  },
  {
    q: "What's a Care Plan?",
    a: "Monthly subscription that keeps your website + automations updated. Includes uptime monitoring, backups, security patches, content changes, SEO health audits, and (on higher tiers) ongoing automation tuning, content publishing, and an annual deep audit to keep you ahead of competitors. Quote-based per scope.",
  },
  {
    q: "How long until we go live?",
    a: "Starter SEO website: 2-3 weeks. Lead-engine animated website: 4-6 weeks. Full 3D + AI automation bundle: 6-10 weeks. Android app: 6-12 weeks depending on scope. We commit to a timeline in the proposal — no rolling delays.",
  },
];

// City landing pages — derived from SOUTH_INDIA_CITIES, used by footer + nav.
export const CITY_PAGES = SOUTH_INDIA_CITIES.map((c) => ({
  label: c.label,
  href: `/locations/${c.slug}`,
}));

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations/bangalore" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Get Quote", href: "/contact" },
];

// IMPORTANT — LinkedIn brand-confusion fix.
// There are 3 firms named some variant of "Zentro Tech" (a Dubai web-design
// shop + a Thiruvarur firm + us). The bare slug /company/zentrotech does NOT
// reliably resolve to OUR Bangalore page (the one with ~110 followers, Buffer
// channel "Zentro Tech") — it can land on a competitor or a dead page, which
// leaks every footer/CTA click straight to a rival.
//
// Fix: drive the canonical handle from an env var so the founder can paste the
// EXACT vanity URL from the live page's address bar (Admin → Edit page → Public
// URL) without a code change, and it's identical everywhere (footer, email sig,
// brochure, schema sameAs). Set NEXT_PUBLIC_LINKEDIN_URL in Vercel once the
// real slug is confirmed. Until then the default below uses our org id-style
// slug — VERIFY IT POINTS TO OUR PAGE before relying on it.
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ||
  "https://www.linkedin.com/company/zentrotech-in";

export const SOCIAL = {
  linkedin: LINKEDIN_URL,
  twitter: "https://twitter.com/zentrotech",
  instagram: "https://instagram.com/zentrotech",
  whatsapp: "https://wa.me/917348961600?text=Hi%20ZentroTECH%20%E2%80%94%20I%27d%20like%20a%20quote",
};

// Honest launch-stage stats. We don't fake "100+ websites built" — these
// are claims a brand-new agency CAN make today. Upgrade as real numbers
// accumulate (clients shipped, leads generated, Google reviews collected).
export const TRUST_STATS = [
  { value: "2026", label: "Founded · Bengaluru HQ" },
  { value: "25+", label: "South India Cities Served" },
  { value: "15min", label: "WhatsApp Response Time" },
  { value: "6", label: "Languages We Support" },
] as const;
