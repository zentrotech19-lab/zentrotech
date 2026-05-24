import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { MagneticCursor } from "@/components/animations/magnetic-cursor";
import { Starfield } from "@/components/animations/starfield";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCta } from "@/components/ui/floating-cta";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentrotech.in"),
  title: {
    default: "ZentroTECH — Bangalore's #1 Lead Engine Website Agency",
    template: "%s · ZentroTECH",
  },
  description:
    "Lead-engine websites + AI automation for Bangalore SMBs. We follow up on every lead and chase your unpaid invoices for you. Serving 25+ cities across South India.",
  keywords: [
    "AI agency Bangalore",
    "lead generation website",
    "AI automation Bangalore",
    "AI voice agent India",
    "AI chatbot Bangalore",
    "Android app development Bangalore",
    "lead follow up automation",
    "payment recovery automation",
    "website design Bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zentrotech.in",
    siteName: "ZentroTECH",
    title: "ZentroTECH — Build. Automate. Get Paid.",
    description:
      "Lead-engine websites + AI automation for Indian SMBs. Bangalore HQ, serving 25+ cities across South India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZentroTECH — Build. Automate. Get Paid.",
    description: "Lead-engine websites + AI automation. Bangalore HQ.",
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      "en-IN": "/en",
      "ta-IN": "/ta",
      "kn-IN": "/kn",
      "x-default": "/en",
    },
  },
};

function detectLocale(pathname: string): Locale {
  // /en, /ta, /kn — first segment is the locale
  const seg = pathname.split("/")[1];
  if (seg && isLocale(seg)) return seg;
  return DEFAULT_LOCALE;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/";
  const locale = detectLocale(pathname);
  const htmlLang = LOCALE_META[locale].htmlLang;
  const dict = await getDictionary(locale);

  return (
    <html lang={htmlLang} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-indigo focus:text-white"
        >
          Skip to main content
        </a>
        <Starfield />
        <LazyMotion features={domAnimation} strict>
          <SmoothScrollProvider>
            <MagneticCursor />
            <Header locale={locale} dict={dict} />
            <main id="main" className="pt-20">{children}</main>
            <Footer locale={locale} dict={dict} />
          </SmoothScrollProvider>
        </LazyMotion>
        <FloatingCta />
        <Analytics />
        <SpeedInsights />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ww07o8n3d7");`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T55FHNYHSM"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T55FHNYHSM');`}
        </Script>
      </body>
    </html>
  );
}
