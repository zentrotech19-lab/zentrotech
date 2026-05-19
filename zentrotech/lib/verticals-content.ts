// Vertical landing pages — `/verticals/[slug]`. Targets the keyword gaps
// surfaced in the Bangalore case study (e.g., "AI chatbot for clinics
// Bangalore", "lead generation website for real estate India").
//
// Each vertical inherits the same template but renders unique copy + pain
// points + use cases + city-keyword stuffing for SEO. Pages are
// understandable by humans (concrete pains + outcomes), Google (long-tail
// keyword coverage), and LLMs (clear structured data the model can quote).

export type VerticalContent = {
  slug: string;
  label: string; // full human label
  shortLabel: string; // for tight grids
  icon: string; // lucide-react component name
  // SEO hero
  h1: string;
  sub: string;
  // Vertical-specific pains we solve
  pains: { headline: string; body: string }[];
  // Concrete use cases — what we actually build for this vertical
  useCases: { title: string; body: string }[];
  // Subset of services most-relevant to this vertical (slug references)
  services: string[];
  // Long-tail city × vertical keywords we want to rank for
  // — Surface in body copy and metadata so Google + LLMs catch them.
  keywords: string[];
  // Vertical-specific FAQ (city-agnostic — city pages handle city-specific FAQs)
  faqs: { q: string; a: string }[];
};

export const VERTICALS_CONTENT: Record<string, VerticalContent> = {
  clinics: {
    slug: "clinics",
    label: "Clinics & Healthcare",
    shortLabel: "Clinics",
    icon: "Stethoscope",
    h1: "Lead Engine Websites + AI Receptionist for Clinics in India",
    sub: "Every missed call is a lost patient. We build websites + AI voice agents + WhatsApp chatbots that book appointments 24/7 in Hindi, Kannada, Tamil, Telugu, and English — so your front desk handles 10× the patients without 10× the staff.",
    pains: [
      { headline: "30-40% of inbound calls go unanswered", body: "Reception is busy with walk-ins, lunch breaks, after-hours rings — every missed call is a patient who books with the next clinic on Google." },
      { headline: "WhatsApp enquiries pile up unanswered", body: "Patients prefer WhatsApp for appointments but staff can't keep up. Slow responses lose bookings to faster competitors." },
      { headline: "No-show rate destroys revenue", body: "Without automated reminders, 20-30% of booked patients no-show. That's pure lost revenue with no recourse." },
      { headline: "Treatment FAQs eat hours daily", body: "Same 30 questions about pricing, packages, insurance, prep — asked 50 times a day. Staff spend half their day repeating answers." },
    ],
    useCases: [
      { title: "AI voice receptionist (24/7)", body: "Answers every call in your patient's language. Books appointments directly into your calendar. Confirms in WhatsApp. Handles common FAQs without escalating." },
      { title: "WhatsApp chatbot for enquiries", body: "Trained on your treatments, doctors, packages, and policies. Captures lead → qualifies intent → books slot → confirms in WhatsApp. Hands off complex cases to humans with full context." },
      { title: "Automated appointment reminders", body: "Patient gets WhatsApp reminder 24h before + 2h before. No-show rate typically drops 40-60% within 30 days of going live." },
      { title: "Treatment package landing pages", body: "Programmatic SEO pages for each treatment + city (e.g., 'dental implants in Koramangala', 'IVF treatment Bengaluru'). Captures the high-intent buyer search before competitors do." },
    ],
    services: ["ai-voice-agents", "ai-chatbots", "lead-followup-automation", "lead-generation-websites", "seo-services-bangalore", "lead-management-crm"],
    keywords: [
      "AI chatbot for clinics Bangalore",
      "AI receptionist for clinics India",
      "appointment booking system for clinics",
      "WhatsApp chatbot for dental clinics",
      "lead generation website for clinics India",
      "AI voice agent for hospitals Bangalore",
      "treatment package landing pages clinics",
      "no-show reduction system for clinics",
      "patient follow-up automation India",
      "Google Business Profile for dental clinics Bangalore",
    ],
    faqs: [
      { q: "How does the AI receptionist book appointments?", a: "It listens to the patient's preferred slot in their preferred language, checks your live calendar (Google Calendar / Practo / your custom system), books the slot, sends WhatsApp confirmation. All within the call." },
      { q: "Will my patients trust an AI voice?", a: "Patients are notified at call-start that they're speaking with an AI assistant. For routine bookings + FAQs, most prefer it (no hold music, no language barrier). For sensitive cases — pain, second opinions, complications — we configure auto-handoff to your human staff." },
      { q: "Can the system handle Hindi + my regional language?", a: "Yes. Hindi + Kannada + Tamil + Telugu + English by default. Add Malayalam, Marathi, Bengali, Gujarati, Punjabi as add-ons. Mixed-language conversations (Hinglish) handled natively." },
      { q: "What about EMR/PMS integration?", a: "We integrate with Practo, Cliniify, eHospital, or your custom system. If you don't have one, we recommend Zoho Health or open-source alternatives — no expensive enterprise EMR required for most clinics." },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    label: "Real Estate Brokers & Developers",
    shortLabel: "Real Estate",
    icon: "Building2",
    h1: "Lead Engine Websites + AI Sales Agents for Real Estate in India",
    sub: "Real estate leads close after 7-12 touches. Most brokers stop at 2. We build websites + AI follow-up + automated site-visit booking that nurtures every enquiry until they show up at the property — without a single broker manually chasing.",
    pains: [
      { headline: "Leads go cold in 48 hours", body: "Real estate enquiries decay fast. By Day 3, half your leads are calling competitors. Manual follow-up at scale is impossible." },
      { headline: "Site visits don't get scheduled", body: "Site-visit booking is friction: phone tag, calendar conflicts, last-minute cancellations. Most enquiries die in this gap." },
      { headline: "Property pages rank for nothing", body: "Generic property listings don't match the long-tail buyer searches ('3BHK in Whitefield under 1.5cr', '2BHK rental Koramangala metro nearby')." },
      { headline: "Investors want instant answers", body: "Yields, registration costs, ROI projections — investors ghost brokers who can't answer in real time. Slow response = lost commission." },
    ],
    useCases: [
      { title: "AI WhatsApp + chatbot for property enquiries", body: "Captures lead, qualifies budget + locality + family size + timeline, sends matching property cards, books a site visit — all on WhatsApp without broker involvement." },
      { title: "AI voice agent for inbound calls", body: "Answers in the buyer's language, qualifies hot vs cold, books site visits. Cold leads go into a 7-touch nurture cadence; hot ones route to the broker's phone instantly." },
      { title: "Auto-nurture for unresponsive leads", body: "Day 1: WhatsApp. Day 3: SMS. Day 7: voice call with new listings. Day 14: WhatsApp price-drop alerts. Day 21: 'still interested?' check. Day 30: final close + handoff." },
      { title: "Programmatic location × budget landing pages", body: "Generate 50+ landing pages combining locality (Whitefield, Koramangala, Sarjapur) × budget (under 1cr, 1-2cr, 2-5cr) × type (BHK, villa, plot). Captures the buyer search before listing portals do." },
    ],
    services: ["lead-followup-automation", "ai-voice-agents", "ai-chatbots", "lead-generation-websites", "lead-management-crm", "seo-services-bangalore"],
    keywords: [
      "lead generation website for real estate Bangalore",
      "AI chatbot for real estate India",
      "AI sales agent for property brokers",
      "real estate WhatsApp automation Bangalore",
      "site visit booking automation real estate",
      "real estate broker CRM India",
      "lead nurture system for real estate",
      "property landing pages SEO Bangalore",
      "Whitefield property website",
      "Koramangala real estate broker website",
    ],
    faqs: [
      { q: "Can it handle 100+ leads/day?", a: "Yes. Multi-channel cadence runs in parallel — chatbot handles website, voice agent handles calls, WhatsApp nurture runs for everyone. Brokers only see the hot leads ready to visit." },
      { q: "Will it integrate with my CRM?", a: "We support Zoho, HubSpot, Pipedrive, Freshworks, Bitrix24. For most brokers we recommend Zoho (cheap, India-native, mobile-app ready for field teams)." },
      { q: "How do site visits get booked into broker calendars?", a: "Two-way sync with Google Calendar / Outlook. Brokers see new visits in their phone calendar within seconds of booking. Buyer gets WhatsApp confirmation + reminders the day before." },
      { q: "What about RERA compliance?", a: "RERA disclosures and project IDs are embedded on every property landing page automatically. Compliance team reviews the schema before launch." },
    ],
  },
  "d2c-brands": {
    slug: "d2c-brands",
    label: "D2C / E-commerce Brands",
    shortLabel: "D2C / E-commerce",
    icon: "ShoppingBag",
    h1: "Lead Engine Websites + AI Automation for D2C Brands in India",
    sub: "Paid ads send the traffic. Most D2C sites lose 60-80% of those visitors to clunky checkouts, abandoned carts, and zero post-purchase nurture. We build the conversion + retention layer that doubles ROAS on the same ad spend.",
    pains: [
      { headline: "Cart abandonment is killing ROAS", body: "60-70% of D2C shoppers abandon cart. Without automated recovery (WhatsApp + email + offer), all that paid traffic is wasted." },
      { headline: "Pre-purchase questions go unanswered", body: "Sizing, fabric, ingredients, delivery — buyers ask, your team is slow, the sale dies. Most brands lose 20-30% of conversions to slow Q&A." },
      { headline: "Repeat purchase rate is flat", body: "Indian D2C average repeat rate is 15-25%. Without post-purchase nurture (review request → upsell → loyalty), CAC eats every order." },
      { headline: "Customer support eats founder time", body: "Order status, delivery delays, returns — founder or co-founder spending 3+ hours/day on WhatsApp answering the same things." },
    ],
    useCases: [
      { title: "AI WhatsApp chatbot for pre-purchase + support", body: "Answers sizing, fabric, ingredient, delivery, return questions in real time. Trained on your product catalog. Hands off complex returns to humans with full context." },
      { title: "Cart abandonment recovery cadence", body: "Day 0 (1hr): WhatsApp 'still thinking?'. Day 1: WhatsApp + email with social proof. Day 3: discount code if eligible. Industry-standard 20-30% recovery rate." },
      { title: "Post-purchase nurture flow", body: "Day 0: order confirmation. Day 3: shipped + delivery ETA. Day 7: delivered + review request. Day 14: usage tips. Day 30: cross-sell. Day 60: loyalty/repeat purchase prompt." },
      { title: "AI voice agent for delivery + return calls", body: "Inbound call asks for order status → AI checks Shiprocket/Delhivery → tells customer ETA. Or routes return request to ops team with reason captured." },
    ],
    services: ["ai-chatbots", "lead-followup-automation", "payment-recovery-automation", "ai-voice-agents", "lead-generation-websites", "seo-services-bangalore"],
    keywords: [
      "AI chatbot for D2C brands India",
      "cart abandonment automation Shopify India",
      "WhatsApp chatbot for ecommerce Bangalore",
      "post-purchase nurture automation India",
      "D2C website conversion rate optimization",
      "AI customer support for ecommerce",
      "Shopify automation agency Bangalore",
      "ecommerce SEO Bangalore",
      "abandoned cart recovery India",
      "ROAS optimization D2C brands",
    ],
    faqs: [
      { q: "Do you work with Shopify / WooCommerce / Magento?", a: "All three, plus Wix, Dukaan, Instamojo, and custom builds. We integrate at the platform level — no migration needed." },
      { q: "Will the chatbot recommend products?", a: "Yes — trained on your product catalog with RAG, so it surfaces real SKUs from current inventory, never invented items. Updates as you add products." },
      { q: "How fast is cart recovery setup?", a: "Live in 2-3 weeks. Webhook from your cart → WhatsApp Business API → email backup. Recovery emails start the same day. Full cadence (3 touches) configured on Day 1." },
      { q: "What about ad-creative automation?", a: "Add-on service. We can generate ad creatives (image, video, copy) at scale tied to your product catalog. Separate retainer." },
    ],
  },
  restaurants: {
    slug: "restaurants",
    label: "Restaurants & F&B",
    shortLabel: "Restaurants",
    icon: "Utensils",
    h1: "Websites + AI Booking + WhatsApp Automation for Restaurants in India",
    sub: "Reservations, table availability, party-size queries, special-occasion bookings — Indian restaurant guests want answers in WhatsApp now, not after the host gets off the phone. We build the AI host that books seats while your team focuses on the kitchen.",
    pains: [
      { headline: "Reservations come on phone — and get missed", body: "Hostess on a call = next caller goes to a busy line = next caller books your neighbour." },
      { headline: "WhatsApp menu requests eat staff time", body: "Same menu PDF sent 200 times a week, manually. Same dietary questions answered repeatedly. No system." },
      { headline: "No-show rate kills weekend revenue", body: "20-30% of reserved tables don't show. Without WhatsApp confirmations + reminders, that's lost margin on prime nights." },
      { headline: "Reviews don't happen automatically", body: "Happy diners forget. Unhappy ones write Google reviews unprompted. Without a review request system, your Google rating slowly erodes." },
    ],
    useCases: [
      { title: "AI WhatsApp reservation system", body: "Guest WhatsApps 'table for 4 Saturday 8pm'. AI checks your booking calendar, confirms the slot, sends location + parking + menu. Done." },
      { title: "Auto menu + dietary chat", body: "Guest asks 'do you have Jain food?' or 'gluten-free options?'. AI answers from your menu data, suggests dishes." },
      { title: "Reservation reminders + no-show recovery", body: "Reminder 24h before. Confirmation request 4h before. If unconfirmed, table releases automatically to walk-ins. No-show rate typically drops to <10%." },
      { title: "Post-meal review automation", body: "WhatsApp goes out 2-3h after bill closing: 'How was your evening? Share a Google review for ₹100 off next visit'. Most restaurants see 3-5× more Google reviews within 60 days." },
    ],
    services: ["ai-chatbots", "ai-voice-agents", "lead-followup-automation", "seo-services-bangalore", "lead-generation-websites"],
    keywords: [
      "AI WhatsApp reservation for restaurants Bangalore",
      "AI booking system for restaurants India",
      "Google Business Profile for restaurants Bangalore",
      "restaurant website with reservations India",
      "no-show reduction restaurants India",
      "AI menu chatbot restaurants",
      "review automation for restaurants Bangalore",
      "restaurant SEO Indiranagar",
      "Koramangala restaurant website design",
      "Whitefield restaurant booking system",
    ],
    faqs: [
      { q: "Does it integrate with Eazydiner / Dineout / Zomato?", a: "Yes — webhook integrations available. Bookings sync both ways. We can also replace these platforms entirely if you want direct customer relationships (no commission cuts)." },
      { q: "What if reservations are mostly walk-in?", a: "Then we focus on the menu chatbot, review automation, GBP optimization, and a great mobile menu page. Different mix, same outcome — more diners through the door." },
      { q: "Can it handle multiple locations?", a: "Yes — each location gets its own routing, calendar, menu, GBP. Centrally managed via a single dashboard." },
    ],
  },
  salons: {
    slug: "salons",
    label: "Salons & Spas",
    shortLabel: "Salons & Spas",
    icon: "Scissors",
    h1: "AI Booking + Website + WhatsApp Automation for Salons & Spas in India",
    sub: "Walk-ins are nice. Walk-outs because nobody answered the phone are catastrophic. We build the AI assistant that books haircuts, manicures, facials, and spa appointments 24/7 — in your customer's language — while your stylists focus on hair, not phones.",
    pains: [
      { headline: "Stylists are on the floor — phones ring forever", body: "Every missed call is a customer booking at the salon next door." },
      { headline: "WhatsApp booking is chaos", body: "Different customers, different stylists, different services, different times — managed manually on WhatsApp is a recipe for double-bookings and forgotten appointments." },
      { headline: "No-show + last-minute cancellation rate is brutal", body: "Salons run on chair-time utilization. A no-show kills margin on that slot." },
      { headline: "Loyalty/membership upsell is manual", body: "Customers who'd happily prepay for a 6-visit package never get offered one. Founder doesn't have time to pitch it." },
    ],
    useCases: [
      { title: "AI booking on WhatsApp + website", body: "Customer says 'haircut + colour for me + manicure for my friend tomorrow 4pm'. AI checks stylist availability, books both, sends confirmation with stylist names + address." },
      { title: "AI voice agent for missed calls", body: "Ring rolls to AI after 4 rings. Books the appointment, captures the contact, sends WhatsApp confirmation." },
      { title: "Reminder + no-show recovery cadence", body: "WhatsApp 24h, 2h, 30min before. If no-show, auto-message to fill the slot from a 'next available' waitlist." },
      { title: "Membership + retail upsell automation", body: "After 3rd visit: WhatsApp offers a 6-visit package. After product use detected: WhatsApp retails the product they liked. Reorder reminders for consumables." },
    ],
    services: ["ai-chatbots", "ai-voice-agents", "lead-followup-automation", "lead-generation-websites", "seo-services-bangalore"],
    keywords: [
      "AI booking system for salons Bangalore",
      "WhatsApp booking salon India",
      "salon website with appointments Bangalore",
      "AI voice agent for spas India",
      "salon CRM India",
      "no-show recovery salons",
      "spa booking website Bangalore",
      "salon membership automation India",
      "Koramangala salon website",
      "Indiranagar salon SEO",
    ],
    faqs: [
      { q: "What if I run multiple stylists with different specialties?", a: "The AI knows which stylist does what — and offers only valid combinations. (e.g., colour goes to your senior colourist, manicures to your nail tech.)" },
      { q: "Can the AI handle commission tracking?", a: "Yes — bookings are tagged with stylist + service for daily commission calculations. We integrate with your existing POS or set one up if you don't have one." },
      { q: "Will it work with my existing booking software?", a: "Salon Iris, Phorest, Vagaro, Fresha, Zenoti — we integrate via API. Or replace with a simpler self-hosted setup if you want to cut their monthly fee." },
    ],
  },
  coaching: {
    slug: "coaching",
    label: "Coaching & Education",
    shortLabel: "Coaching & Edu",
    icon: "GraduationCap",
    h1: "Lead Engine Websites + AI Counsellor for Coaching Institutes in India",
    sub: "Demo class bookings, parent enquiries, batch info, fee queries, syllabus questions — coaching enquiries are high-touch and high-stakes. We build the AI counsellor that answers parents at 11pm, books demo slots, and nurtures every lead until they enrol.",
    pains: [
      { headline: "Parents research late at night", body: "Most enquiries arrive 9pm-12am after parents finish work. Counsellors are off. Enquiries die in the inbox by morning." },
      { headline: "Demo class no-show rate is 40%+", body: "Without WhatsApp reminders + value-rich pre-demo content, half of booked demos don't happen." },
      { headline: "Fee-shopping kills conversions", body: "Parents compare 4-5 institutes. Without nurture (success stories, faculty intros, testimonials), the cheapest wins regardless of quality." },
      { headline: "Counsellors burn out chasing leads", body: "Same 5 questions answered 100 times a day. Same follow-up calls made manually. Burnout → high counsellor turnover → bad customer experience." },
    ],
    useCases: [
      { title: "24/7 AI counsellor on website + WhatsApp", body: "Answers fee, batch timing, syllabus, faculty, demo class, fee plan questions in the parent's language. Books demo slots into the calendar. Captures lead with full context." },
      { title: "Demo class nurture flow", body: "Demo booked → WhatsApp confirmation with location/Zoom link. Day -1: reminder + 'meet the teacher' video. Day -1h: reminder. Day 0 after demo: feedback form + next steps." },
      { title: "Fee-shopper nurture cadence", body: "Day 1: 'differences from cheaper institutes' WhatsApp. Day 3: parent testimonial video. Day 5: alumni outcomes. Day 7: limited-seat urgency. Day 14: 'last batch starting' close." },
      { title: "Parent + student segmented messaging", body: "Different tone for parents (results, value, future) vs students (atmosphere, faculty personality, peer group). AI routes the right message to the right inbox." },
    ],
    services: ["ai-chatbots", "lead-followup-automation", "ai-voice-agents", "lead-generation-websites", "lead-management-crm", "seo-services-bangalore"],
    keywords: [
      "AI counsellor for coaching institutes India",
      "AI chatbot for tuition centres Bangalore",
      "coaching website India",
      "demo class booking automation",
      "JEE coaching website Bangalore",
      "NEET coaching automation India",
      "online tuition lead generation",
      "parent enquiry chatbot coaching",
      "edtech CRM India",
      "coaching institute SEO Bangalore",
    ],
    faqs: [
      { q: "Can the AI answer subject-level questions?", a: "Yes — trained on your faculty bios, syllabus, batch sizes, fees, success stories. For deep academic Q&A (e.g., 'help my child with this physics problem'), we route to faculty WhatsApp." },
      { q: "What about online + offline batch handling?", a: "Both. AI knows which batches are online vs offline + which faculty teach what + which slots have seats. Parent gets matching options in seconds." },
      { q: "Can it handle multiple branches?", a: "Yes — branch-aware routing. Parent enters area or pincode, AI suggests the nearest branch with the requested course." },
    ],
  },
  "professional-services": {
    slug: "professional-services",
    label: "CA / Legal / Architects / Doctors (Solo)",
    shortLabel: "Professionals",
    icon: "Briefcase",
    h1: "Websites + AI Front Office for Solo Professionals in India",
    sub: "One doctor, one lawyer, one CA, one architect — running a practice without an ops team. We build the website + AI front office that handles enquiries, books consultations, sends quotes, and chases payments — so you focus on clients, not admin.",
    pains: [
      { headline: "Solo practice = founder is the bottleneck", body: "Enquiries, scheduling, follow-ups, billing — all on you. No time to grow because admin eats every spare hour." },
      { headline: "No reception means missed enquiries", body: "Without a staff member, every call you can't answer is a lost client. WhatsApp queries pile up unanswered." },
      { headline: "Quote follow-up doesn't happen", body: "You send a quote, then bury it under client work. 50% of qualified prospects never get a follow-up call. They go to someone who chases." },
      { headline: "Payment recovery is awkward + slow", body: "Chasing professional fees personally is embarrassing. Months pass before you ask for unpaid invoices. Cash flow suffers." },
    ],
    useCases: [
      { title: "AI front office on WhatsApp + voice", body: "Inbound calls/WhatsApp handled 24/7. AI books consultations into your calendar, sends pricing, captures case details, sends prep materials before the appointment." },
      { title: "Auto-quote + 7-touch follow-up", body: "After a consultation, system sends quote within 30 min. If unsigned, auto-cadence: Day 1 WhatsApp, Day 3 'still considering?', Day 7 'happy to clarify anything', Day 14 final nudge with limited-time offer." },
      { title: "Payment recovery for unpaid invoices", body: "Polite WhatsApp reminders on Day 0/3/7/14/21/30. Stops the second payment lands. You never have to chase personally — but the cash comes in faster." },
      { title: "Programmatic 'service in city' SEO pages", body: "Generate landing pages for every service + locality combination ('GST filing for SMEs in Koramangala', 'will drafting lawyer Indiranagar', 'home architect Whitefield'). Captures local long-tail search." },
    ],
    services: ["business-on-autopilot", "ai-voice-agents", "ai-chatbots", "lead-followup-automation", "payment-recovery-automation", "lead-generation-websites", "seo-services-bangalore"],
    keywords: [
      "website for CA practice Bangalore",
      "AI receptionist for lawyers India",
      "solo doctor website India",
      "architect website Bangalore",
      "CA firm lead generation",
      "freelance professional website India",
      "professional services automation India",
      "consultation booking automation",
      "professional fee recovery automation",
      "CA chatbot Bangalore",
    ],
    faqs: [
      { q: "I bill per hour. Can the system track time?", a: "We integrate with Toggl, Harvest, Clockify, or set up a simple WhatsApp-based time logger. Time → invoice → recovery — all automated." },
      { q: "Is client confidentiality handled?", a: "Yes. All conversations are encrypted at rest, no third-party AI sees identifying data unless you configure it. Privacy policy templates included for India DPDPA compliance." },
      { q: "Will it work for a multi-partner firm?", a: "Yes — partner-aware routing. Enquiries route based on practice area + availability. Each partner gets their own calendar + WhatsApp inbox." },
    ],
  },
  "manufacturing-smb": {
    slug: "manufacturing-smb",
    label: "Manufacturing SMB / B2B",
    shortLabel: "Manufacturing",
    icon: "Factory",
    h1: "Lead Engine Websites + AI Automation for B2B Manufacturing SMBs in India",
    sub: "RFQs sit in inboxes for days. Sales follow-up is inconsistent. Distributor payment delays kill cash flow. We build the website + AI sales automation + payment recovery system that turns Indian B2B manufacturing into a predictable pipeline.",
    pains: [
      { headline: "RFQ response is slow", body: "Inbound enquiries from distributors, traders, end-buyers wait 24-48 hours for a response. Faster competitors win the business." },
      { headline: "Sales follow-up dies after 1-2 calls", body: "B2B closes after 8-12 touches. Sales team gives up at 2. Massive pipeline leakage." },
      { headline: "Distributor payments stretch 60-120 days", body: "Without systematic follow-up, receivables age into bad debt. Working capital strangled." },
      { headline: "Trade show / exhibition leads die in a spreadsheet", body: "100+ business cards collected at an expo. By the time someone enters them into the CRM, half are cold." },
    ],
    useCases: [
      { title: "AI WhatsApp + email for RFQ response", body: "RFQ received → AI acknowledges within 5 min, asks clarifying questions, hands warm leads to sales rep with full context." },
      { title: "B2B sales nurture cadence (8-12 touches)", body: "Mix of WhatsApp, email, scheduled AI voice calls over 60 days. Different content per stage: technical specs early, social proof middle, urgency late." },
      { title: "Distributor payment recovery", body: "Aged invoices trigger polite reminders on Day 30/45/60/75/90 — WhatsApp + email + AI voice call. Tone calibrated for B2B relationships (firm but never aggressive)." },
      { title: "Trade show lead capture + auto-nurture", body: "Scan business card → details into CRM → AI sends personalized WhatsApp within 24h → 7-touch nurture cadence runs automatically." },
    ],
    services: ["lead-followup-automation", "payment-recovery-automation", "ai-chatbots", "lead-generation-websites", "lead-management-crm", "seo-services-bangalore", "ai-voice-agents"],
    keywords: [
      "B2B website for manufacturers India",
      "RFQ automation system manufacturing",
      "distributor payment recovery India",
      "B2B lead nurture automation Bangalore",
      "trade show lead automation",
      "manufacturing SMB website India",
      "industrial SEO Bangalore",
      "B2B WhatsApp automation India",
      "manufacturing CRM India",
      "Peenya manufacturer website",
    ],
    faqs: [
      { q: "Can the system handle GST invoicing + e-invoice?", a: "Yes — integrates with Tally, Zoho Books, Vyapar. E-invoice (IRN) generation and IRP push handled automatically for invoices above ₹5cr turnover threshold." },
      { q: "What about export buyers?", a: "Multi-currency, multi-language (English + Spanish + Arabic available for export markets). Export documentation templates included." },
      { q: "Does it work with my ERP?", a: "SAP, Oracle, Microsoft Dynamics, Tally, Zoho, custom — we integrate via API or webhook. No rip-and-replace required." },
    ],
  },
};
