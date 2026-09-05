import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
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
 * One sans family across the whole site, self hosted by next/font so there is no
 * external font request. The weight range covers body text through to the
 * display headings, which carry tight negative tracking.
 */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
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
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-dvh bg-white text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[12px] focus:border focus:border-forest focus:bg-white focus:px-5 focus:py-3 focus:text-small focus:font-semibold focus:text-forest focus:shadow-xl"
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
