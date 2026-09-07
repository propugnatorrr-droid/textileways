import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, Notice } from "@/components/ui";
import { PageHeader, HeaderAside } from "@/components/sections/page-shell";
import { RfqForm } from "@/components/forms/rfq-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Request a quote",
  description:
    "Request a manufacturing quotation from Textileways. Share your product details, materials, decoration, quantity and delivery requirements in a structured seven step form.",
  path: "/request-a-quote",
});

export default function RequestAQuotePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Request a quote", path: "/request-a-quote" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need to make"
        lede="Seven short steps. Only the first two are strictly required to start a conversation, and everything you enter is kept in this browser as you go, so you can leave and come back."
        breadcrumbs={breadcrumbs}
        aside={
          <HeaderAside title="What to expect">
            <p>
              We reply with technical questions before a price. A quotation given before the
              questions are answered is a guess.
            </p>
            <p>
              No minimum quantity is refused on principle. Projects can begin from
              approximately 50 pieces per style following technical review.
            </p>
            <p>
              Files you submit are used only to quote, sample and produce your order. A non
              disclosure agreement can be signed before you share original designs.
            </p>
          </HeaderAside>
        }
      />

      <Section>
        <Container>
          <Suspense
            fallback={
              <p role="status" className="text-small text-ink-subtle">
                Loading the quote request form
              </p>
            }
          >
            <RfqForm />
          </Suspense>

          <Notice tone="info" className="mt-16 max-w-[74ch]">
            Prefer to send a specification by email instead? Use the contact form and describe
            what you need. The structured form simply reduces the number of follow up
            questions.
          </Notice>
        </Container>
      </Section>
    </>
  );
}
