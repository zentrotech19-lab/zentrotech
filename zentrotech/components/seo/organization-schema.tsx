import { JsonLd } from "./json-ld";
import {
  SITE,
  OFFICES,
  SOCIAL,
  SERVICES,
  SOUTH_INDIA_CITIES,
} from "@/lib/constants";

// Fuller Organization schema for ZentroTECH — gives Google + AI assistants
// a structured understanding of the business: who, where, what we do, what
// languages we support, which cities we serve, and how to reach us.
//
// Type is ProfessionalService (a subtype of Organization + LocalBusiness)
// because we are a quote-driven service business with a physical HQ — this
// makes us eligible for richer local-business surfacing.
//
// Brand-only: no founder name is exposed anywhere in this schema.

export function OrganizationSchema() {
  const office = OFFICES[0];

  // Top 6 priority cities for areaServed — Bangalore HQ + South metros.
  // Sitemap + city pages already cover the full 24-city list for crawlers.
  const TOP_CITIES = ["Bangalore", "Chennai", "Hyderabad", "Coimbatore", "Kochi", "Mysore"];
  const topCityData = TOP_CITIES.map((label) =>
    SOUTH_INDIA_CITIES.find((c) => c.label === label)
  ).filter((c): c is (typeof SOUTH_INDIA_CITIES)[number] => Boolean(c));

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: "Zentro Tech",
    alternateName: ["Zentro Tech", "ZentroTECH Bangalore"],
    url: SITE.url,
    // /icon.tsx is the Next 16 dynamic icon route; we link the PNG fallback
    // for crawlers that expect a static asset URL.
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon`,
      width: 512,
      height: 512,
    },
    image: `${SITE.url}/icon`,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    taxID: SITE.gst,
    vatID: SITE.gst,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "228/1, 5th Cross Road, Koramangala",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.coords.lat,
      longitude: office.coords.lng,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "kn", "ta", "te", "ml"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "kn", "ta", "te", "ml"],
      },
    ],
    sameAs: Object.values(SOCIAL),
    areaServed: [
      { "@type": "Country", name: "India" },
      ...topCityData.map((c) => ({
        "@type": "City",
        name: c.label,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: c.state,
        },
      })),
    ],
    knowsAbout: SERVICES.map((s) => s.title),
    knowsLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam"],
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        url: `${SITE.url}/services/${s.slug}`,
      },
    })),
  };

  return <JsonLd data={data} />;
}
