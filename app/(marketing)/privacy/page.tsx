import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { privacyPolicy } from "@/content/fallback/legal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "How Textileways handles the personal information submitted through this website, what is never sent to analytics, how long information is kept and how to exercise your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      lede="What this website collects, why, who it is shared with, and the things that are deliberately never sent anywhere."
      path="/privacy"
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
