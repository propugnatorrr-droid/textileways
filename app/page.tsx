import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import {
  ProductionScaleSection,
  ProductUniverseSection,
  PositioningSection,
  HowItWorksSection,
  CapabilitiesSection,
  FactorySection,
  QualitySection,
  MarketsSection,
  ProjectProcessSection,
  ResponsibilitySection,
  InsightsSection,
  FinalCtaSection,
} from "@/components/sections/home-sections";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/content/configuration/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description:
    "Textile and apparel manufacturing in Pakistan for brands across the USA and Europe. Custom apparel, uniforms, home textiles and specialist products from approximately 50 pieces, scaling beyond 100,000.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductionScaleSection />
      <ProductUniverseSection />
      <PositioningSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <FactorySection />
      <QualitySection />
      <MarketsSection />
      <ProjectProcessSection />
      <ResponsibilitySection />
      <InsightsSection />
      <FinalCtaSection />
    </>
  );
}
