import { JsonLd } from "./json-ld";
import { SITE, OFFICES } from "@/lib/constants";

export function LocalBusinessSchema({ city }: { city: string }) {
  const office = OFFICES.find((o) => o.city.toLowerCase() === city.toLowerCase());
  if (!office) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${office.city}`,
    description: SITE.description,
    url: SITE.url,
    telephone: office.phone,
    email: office.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressRegion: office.region,
      addressCountry: office.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.coords.lat,
      longitude: office.coords.lng,
    },
    openingHours: "Mo-Fr 09:00-19:00",
    priceRange: "$$$",
  };
  return <JsonLd data={data} />;
}
