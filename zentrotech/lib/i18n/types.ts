// Shape of every dictionary file. Adding a new homepage section?
// Add the keys here, in en.ts (canonical), then in ta.ts and kn.ts.

export type Dictionary = {
  meta: {
    siteName: string;
    tagline: string;
    description: string;
  };
  nav: {
    services: string;
    locations: string;
    about: string;
    insights: string;
    getQuote: string;
    languageLabel: string;
  };
  languageBand: {
    label: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    sub: string;
    ctaWhatsapp: string;
    ctaQuote: string;
    ctaSubtext: string;
    videoLabel: string;
    videoBody: string;
    trustStats: Array<{ value: string; label: string }>;
  };
  usps: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    sub: string;
    items: Array<{ title: string; body: string }>;
  };
  servicesBento: {
    badge: string;
    title1: string;
    title2: string;
    sub: string;
    learnMore: string;
    services: Record<string, { title: string; short: string }>;
  };
  process: {
    badge: string;
    title1: string;
    title2: string;
    steps: Array<{ num: string; title: string; desc: string }>;
  };
  serviceAreas: {
    badge: string;
    title1: string;
    title2: string;
    sub: string;
    tierLabels: { A: string; B: string; C: string; D: string };
  };
  faqSection: {
    badge: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: {
    title1: string;
    title2: string;
    title3: string;
    sub: string;
    ctaWhatsapp: string;
    ctaQuote: string;
  };
  footer: {
    tagline: string;
    serviceArea: string;
    columns: { navigate: string; areas: string; contact: string };
    viewAllCities: string;
    callPhone: string;
    whatsappUs: string;
    emailUs: string;
    location: string;
    getQuote: string;
    rights: string;
    note: string;
  };
};
