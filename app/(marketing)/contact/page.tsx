import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Notice } from "@/components/ui";
import { PageHeader } from "@/components/sections/page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactChannelLink } from "@/components/layout/contact-channel-link";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import { whatsappEnabled } from "@/lib/utilities/whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { contactChannels } from "@/content/configuration/site";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Textileways about a new project, an existing order, a materials question, certification and compliance, or a partnership inquiry.",
  path: "/contact",
});

const routes = [
  {
    label: "A quick question, answered fastest",
    description:
      "WhatsApp reaches the team directly. The message opens with the page you were on, so nobody has to ask what you were looking at.",
    href: "",
    action: "",
  },
  {
    label: "A new product or project",
    description:
      "The quote request form collects everything needed to give you a useful answer first time.",
    href: "/request-a-quote",
    action: "Request a quote",
  },
  {
    label: "A physical sample or swatches",
    description: "The sample request form covers swatches, stock samples and custom development.",
    href: "/request-a-sample",
    action: "Request a sample",
  },
  {
    label: "A general question",
    description: "The form on this page reaches the team directly.",
    href: "#contact-form",
    action: "Use the form below",
  },
];

export default function ContactPage() {
  const channels = contactChannels();
  const country = verifiedFactValue("country");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Contact"
        title="Talk to the people who would make your product"
        lede="Whatever you send reaches the team directly rather than a general inbox. Specific questions get specific answers, so include the product, the quantity and the market if you can."
        breadcrumbs={breadcrumbs}
        aside={
          <div className="border border-line bg-cotton/50 p-6">
            <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
              Direct channels
            </p>

            {channels.length > 0 ? (
              <dl className="mt-5 space-y-3 text-small">
                {channels.map((channel) => (
                  <div key={channel.event} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-ink-subtle">{channel.label}</dt>
                    <dd>
                      <ContactChannelLink channel={channel} location="contact_page" />
                    </dd>
                  </div>
                ))}
                {country ? (
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 text-ink-subtle">Country</dt>
                    <dd className="text-ink-muted">{country}</dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <p className="mt-5 text-small leading-relaxed text-ink-muted">
                Direct email and telephone details are published here once the business
                confirms them for publication. Until then, the forms on this site deliver
                inquiries straight to the team, and you receive a reference and a confirmation
                by email.
              </p>
            )}
          </div>
        }
      />

      <Section tight className="border-b border-line">
        <Container>
          <h2 className="mb-8 border-b border-line pb-3 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
            Where to send what
          </h2>
          <ul className="grid gap-px bg-line lg:grid-cols-2 xl:grid-cols-4">
            {routes.map((route) => (
              <li key={route.label} className="flex flex-col bg-paper p-7">
                <h3 className="text-body font-semibold text-ink">{route.label}</h3>
                <p className="mt-3 flex-1 text-small leading-relaxed text-ink-muted">
                  {route.description}
                </p>
                {route.href ? (
                  <Link
                    href={route.href}
                    className="tw-underline-grow mt-6 inline-block self-start text-small font-medium text-ink"
                  >
                    {route.action}
                  </Link>
                ) : whatsappEnabled() ? (
                  <WhatsappInlineLink
                    context={{ pageLabel: "Contact", path: "/contact" }}
                    location="contact_page_route"
                    variant="primary"
                    className="mt-6 self-start"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="contact-form">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-serif text-h3">Send a message</h2>
              <p className="mt-4 max-w-[42ch] text-small leading-relaxed text-ink-muted">
                You will receive a confirmation with a reference number. Nothing you type here
                is sent to analytics.
              </p>
              <Notice tone="info" className="mt-8">
                For a project inquiry, the{" "}
                <Link href="/request-a-quote" className="tw-underline-grow font-medium text-ink">
                  quote request form
                </Link>{" "}
                collects the details we need in one pass and saves a round of questions.
              </Notice>
            </div>

            <div className="max-w-[70ch]">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
