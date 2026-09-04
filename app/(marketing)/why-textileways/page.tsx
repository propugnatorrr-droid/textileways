import type { Metadata } from "next";
import { Container, Section, ButtonLink } from "@/components/ui";
import { PageHeader, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { whyTextilewaysReasons, productionScaleSteps } from "@/content/fallback/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Why Textileways",
  description:
    "Why brands choose a manufacturer that covers both a 50 piece validation run and a 100,000 piece programme, with the same specification discipline at each end.",
  path: "/why-textileways",
});

export default function WhyTextilewaysPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Why Textileways", path: "/why-textileways" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="Why Textileways"
        title="Startup flexibility. Enterprise manufacturing discipline."
        lede="You should not have to replace your manufacturer every time you grow. Every supplier change costs a season in re establishing fit, fabric, colour and trust."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/capabilities" variant="secondary">
              See the capabilities
            </ButtonLink>
          </>
        }
      />

      <SplitSection
        eyebrow="Reasons"
        title="Six reasons buyers work with us"
        intro="Written as claims a buyer can test in the first conversation rather than as slogans."
      >
        <ul className="grid gap-px bg-line sm:grid-cols-2">
          {whyTextilewaysReasons.map((reason, index) => (
            <Reveal key={reason.title} as="li" delay={(index % 2) * 55} className="bg-paper p-7">
              <span aria-hidden="true" className="block h-px w-8 bg-clay" />
              <h2 className="mt-6 text-body font-semibold text-ink">{reason.title}</h2>
              <p className="mt-3 text-small leading-relaxed text-ink-muted">
                {reason.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </SplitSection>

      <Section tight className="border-b border-line bg-cotton">
        <Container>
          <h2 className="max-w-[18ch] font-serif text-h2">The range, stated plainly</h2>
          <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {productionScaleSteps.map((step, index) => (
              <Reveal key={step.title} as="li" delay={index * 60} className="bg-cotton p-6">
                <p className="font-serif text-h3 text-forest">{step.quantity}</p>
                <p className="mt-0.5 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  {step.unit}
                </p>
                <p className="mt-5 text-small font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-small leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <PageCta
        title="Already have a manufacturer?"
        description="You do not have to move an existing programme to start a conversation about one new style, one new category, or a quantity your current supplier will not quote for."
        location="why_page"
        whatsapp={{ pageLabel: "Why Textileways", path: "/why-textileways" }}
      />
    </>
  );
}
