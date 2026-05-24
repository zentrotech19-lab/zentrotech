import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, SOCIAL, SOUTH_INDIA_CITIES } from "@/lib/constants";
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

// Top 12 cities for footer — keeps the column scannable. Full 138-city
// list lives at /locations index page (linked at the bottom of the column).
const FOOTER_CITY_SLUGS = new Set([
  "bangalore",
  "koramangala",
  "hsr-layout",
  "indiranagar",
  "whitefield",
  "electronic-city",
  "jayanagar",
  "chennai",
  "hyderabad",
  "kochi",
  "coimbatore",
  "mysore",
]);

export function Footer({ locale, dict }: FooterProps) {
  const featuredCities = SOUTH_INDIA_CITIES.filter((c) => FOOTER_CITY_SLUGS.has(c.slug));

  const navItems = [
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.locations, href: "/locations/bangalore" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.insights, href: "/insights" },
    { label: dict.nav.getQuote, href: "/contact" },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-void/50 backdrop-blur-md">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-indigo/40 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4" aria-label="ZentroTECH home">
              <img
                src="/brand/logo-mark.svg"
                alt=""
                width={36}
                height={36}
                className="size-9 drop-shadow-[0_0_18px_rgba(139,92,246,0.4)]"
              />
              <span className="text-white font-bold text-lg">{SITE.name}</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">{dict.footer.tagline}</p>
            <p className="text-text-muted text-xs mt-3 leading-relaxed">
              {dict.footer.serviceArea}
            </p>
            <p className="text-text-muted text-xs mt-3 leading-relaxed">
              {dict.footer.note}
            </p>
            <div className="flex gap-3 mt-6">
              <a href={SOCIAL.whatsapp} aria-label="WhatsApp" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaWhatsapp aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.linkedin} aria-label="LinkedIn" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaLinkedinIn aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.twitter} aria-label="Twitter" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaXTwitter aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.instagram} aria-label="Instagram" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaInstagram aria-hidden="true" className="size-4 text-text-muted" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">{dict.footer.columns.navigate}</h4>
            <ul className="space-y-3">
              {navItems.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-secondary hover:text-white text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">{dict.footer.columns.areas}</h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {featuredCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/locations/${c.slug}`} className="text-text-secondary hover:text-white text-sm">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/locations" className="text-indigo-glow hover:text-white text-xs mt-3 inline-block">
              {dict.footer.viewAllCities}
            </Link>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">{dict.footer.columns.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-text-secondary hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-text-muted" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SOCIAL.whatsapp} className="flex items-center gap-2 text-text-secondary hover:text-white">
                  <FaWhatsapp aria-hidden="true" className="size-4 text-text-muted" />
                  {dict.footer.whatsappUs}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-text-secondary hover:text-white">
                  <Mail aria-hidden="true" className="size-4 text-text-muted" />
                  {dict.footer.emailUs}
                </a>
              </li>
              <li className="flex items-start gap-2 text-text-secondary">
                <MapPin aria-hidden="true" className="size-4 text-text-muted mt-0.5 shrink-0" />
                <span>{dict.footer.location}</span>
              </li>
            </ul>
            <Link href="/contact" className="mt-5 inline-flex items-center justify-center rounded-full bg-indigo px-5 py-2.5 text-white text-sm font-semibold hover:bg-indigo-glow transition-colors">
              {dict.footer.getQuote}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}</p>
          <p>GST: 29FETPS9602L1ZC · Proprietorship · Koramangala, Bengaluru</p>
        </div>
      </Container>
    </footer>
  );
}
