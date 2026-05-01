import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, OFFICES, NAV_LINKS, SOCIAL, CITY_PAGES } from "@/lib/constants";
import { FaLinkedinIn, FaXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";

export function Footer() {
  // Show only physical city offices in the "Offices" column;
  // the country-level "UAE" record exists for schema and is surfaced via
  // the "Local Pages" column instead.
  const physicalOffices = OFFICES.filter((o) => o.city !== "UAE");

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-void/50 backdrop-blur-md">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-indigo/40 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative size-8 rounded-lg bg-linear-to-br from-indigo to-pink-pulse">
                <div className="absolute inset-0.5 rounded-lg bg-void flex items-center justify-center">
                  <span className="text-aurora font-black text-sm">Z</span>
                </div>
              </div>
              <span className="text-white font-bold text-lg">{SITE.name}</span>
            </div>
            <p className="text-text-muted text-sm max-w-md leading-relaxed">{SITE.description}</p>
            <div className="flex gap-3 mt-6">
              <a href={SOCIAL.linkedin} aria-label="LinkedIn" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaLinkedinIn aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.twitter} aria-label="Twitter" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaXTwitter aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.github} aria-label="GitHub" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaGithub aria-hidden="true" className="size-4 text-text-muted" />
              </a>
              <a href={SOCIAL.instagram} aria-label="Instagram" className="size-11 min-w-11 min-h-11 rounded-full glass flex items-center justify-center hover:border-indigo/40 transition-colors">
                <FaInstagram aria-hidden="true" className="size-4 text-text-muted" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-secondary hover:text-white text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Offices</h4>
            <ul className="space-y-4">
              {physicalOffices.map((o) => (
                <li key={o.city} className="text-sm">
                  <p className="text-white font-medium">{o.city}</p>
                  <p className="text-text-muted text-xs mt-0.5">{o.region}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Local Pages</h4>
            <ul className="space-y-3">
              {CITY_PAGES.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-text-secondary hover:text-white text-sm">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built with Next.js. Hosted on Vercel.</p>
        </div>
      </Container>
    </footer>
  );
}
