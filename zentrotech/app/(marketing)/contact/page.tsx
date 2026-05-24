import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get a Custom Quote in 1 Business Day",
  description:
    "Tell ZentroTECH what you need — lead-engine website, AI chatbot, voice agent, payment recovery, or all of the above. We quote in 1 business day. Bangalore-based, serving 138 South India cities.",
  path: "/contact",
  ogImage: "/og/default.png",
});

export default function ContactPage() {
  return <ContactForm />;
}
