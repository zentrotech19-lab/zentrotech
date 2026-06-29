import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { getAllInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ReadingProgressRail } from "./_components/reading-progress-rail";
import { InsightFeedGrid } from "./_components/insight-feed-grid";

export const metadata = buildMetadata({
  title: "Insights — Indian SMB AI, WhatsApp Business, Voice AI Analysis",
  description: "Operator-grade analysis from the ZentroTECH team on AI voice agents in Indian languages, WhatsApp Business pricing, lead generation for Indian SMBs, and Bangalore agency tactics.",
  path: "/insights",
});

export default async function InsightsPage() {
  const posts = await getAllInsights();
  return (
    <>
      <OrganizationSchema />
      <ReadingProgressRail />
      <section className="py-24">
        <Container>
          <Reveal>
            <Badge>Insights</Badge>
          </Reveal>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            From the <span className="text-aurora">lab</span>.
          </h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <InsightFeedGrid posts={posts} />
        </Container>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
