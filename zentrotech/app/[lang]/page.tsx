import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { UspStrip } from "@/components/sections/usp-strip";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { ProcessTimeline } from "@/components/sections/process-timeline-lazy";
import { ServiceAreas } from "@/components/sections/service-areas";
import { FaqSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  // Brand-first absolute title. Google's title-rewriting algorithm appends
  // the site name automatically when a title ends in the brand — that's
  // what produced the "· ZentroTECH · ZentroTECH" duplication seen in SERPs.
  // Brand-first format ("ZentroTECH — ...") prevents the re-append.
  const meta = buildMetadata({
    title: "ZentroTECH — Kannada-First AI Agency for Bangalore SMBs",
    description: dict.meta.description,
    path: `/${lang}`,
    ogImage: "/og/home.png",
  });
  return {
    ...meta,
    title: { absolute: "ZentroTECH — Kannada-First AI Agency for Bangalore SMBs" },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <OrganizationSchema />
      <Hero dict={dict.hero} />
      <UspStrip dict={dict.usps} />
      <ServicesBento dict={dict.servicesBento} />
      <TrustSignals />
      <ProcessTimeline dict={dict.process} />
      <ServiceAreas dict={dict.serviceAreas} />
      <FaqSection
        faqs={dict.faqSection.items}
        eyebrow={dict.faqSection.badge}
        heading={dict.faqSection.title}
        intro={dict.faqSection.intro}
        id="faq"
      />
      <CTASection dict={dict.cta} />
    </>
  );
}
