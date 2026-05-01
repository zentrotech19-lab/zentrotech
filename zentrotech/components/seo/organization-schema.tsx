import { JsonLd } from "./json-ld";
import { SITE, OFFICES, SOCIAL } from "@/lib/constants";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/logo.svg`,
    description: SITE.description,
    foundingDate: "2026",
    email: SITE.email,
    sameAs: Object.values(SOCIAL),
    address: OFFICES.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: o.country,
    })),
  };
  return <JsonLd data={data} />;
}
