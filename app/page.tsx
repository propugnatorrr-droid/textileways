import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import {
  ProductionScaleSection,
  ProductUniverseSection,
  HowItWorksSection,
  CapabilitiesSection,
  FactorySection,
  QualitySection,
  MarketsSection,
  InsightsSection,
  FinalCtaSection,
} from "@/components/sections/home-sections";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Clothing Manufacturer in Pakistan | TextileWays",
  description:
    "Clothing manufacturer in Pakistan for private label apparel, uniforms and activewear, from approximately 50 pieces per style, scaling beyond 100,000.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductionScaleSection />
      <ProductUniverseSection />
      <CapabilitiesSection />
      <FactorySection />
      <HowItWorksSection />
      <QualitySection />
      <MarketsSection />
      <InsightsSection />
      <FinalCtaSection />
    </>
  );
}
