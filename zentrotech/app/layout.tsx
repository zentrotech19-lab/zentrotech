import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { MagneticCursor } from "@/components/animations/magnetic-cursor";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentrotech.ai"),
  title: {
    default: "ZentroTECH — AI Consultancy | Agents, Automation & AI-Powered Websites",
    template: "%s · ZentroTECH",
  },
  description:
    "ZentroTECH is a Bangalore-headquartered AI consultancy building agentic systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.",
  keywords: [
    "AI consultancy Bangalore",
    "AI agents",
    "AI automation",
    "agentic AI",
    "AI agency Dubai",
    "LLM integration",
    "AI website development",
    "agentic coding",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zentrotech.ai",
    siteName: "ZentroTECH",
    title: "ZentroTECH — Engineering the AI of 2050, today.",
    description:
      "Agentic systems, intelligent automation, and AI-native digital products for Bangalore, Dubai, and the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZentroTECH — AI Consultancy",
    description: "Agentic systems, intelligent automation, AI-native digital products.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScrollProvider>
          <MagneticCursor />
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
