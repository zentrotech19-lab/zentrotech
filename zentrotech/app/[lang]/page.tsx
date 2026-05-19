import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { UspStrip } from "@/components/sections/usp-strip";
import { ServicesBento } from "@/components/sections/services-bento";
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
  return buildMetadata({
    title: `${dict.meta.tagline} · ${dict.meta.siteName}`,
    description: dict.meta.description,
    path: `/${lang}`,
    ogImage: "/og/home.png",
  });
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
