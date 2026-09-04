import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/content/configuration/site";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsentProvider, AnalyticsScripts } from "@/components/layout/cookie-consent";
import { WhatsappFloatingButton } from "@/components/layout/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  manufacturerSchema,
  websiteSchema,
} from "@/lib/seo/structured-data";

/**
 * Display serif for headings and precise sans for body and interface text.
 * Both are self hosted by next/font, so there is no external font request.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: siteConfig.url },
};

export const viewport: Viewport = {
  themeColor: "#fcfaf5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[3px] focus:border focus:border-forest focus:bg-paper focus:px-5 focus:py-3 focus:text-small focus:font-medium focus:text-forest"
        >
          Skip to main content
        </a>

        <CookieConsentProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <WhatsappFloatingButton />
          <AnalyticsScripts />
        </CookieConsentProvider>

        <JsonLd data={[organizationSchema(), manufacturerSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
