import type { Metadata } from "next";
import { Container, Section, ButtonLink, Notice } from "@/components/ui";
import { PageHeader, ProseBlock, SplitSection, PageCta } from "@/components/sections/page-shell";
import { Media } from "@/components/content/media";
import { Reveal } from "@/components/content/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { factoryNarrative } from "@/content/fallback/company";
import { factoryMedia } from "@/content/fallback/media";
import { verifiedFactValue, getFact } from "@/content/configuration/company-facts";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "The factory",
  description:
    "The working environment where Textileways products are made, covering the production floor, cutting, sewing, printing, embroidery, inspection and packing.",
  path: "/factory",
});

const gallery = [
  { asset: factoryMedia.exterior, label: "Factory exterior" },
  { asset: factoryMedia.productionFloor, label: "Production floor" },
  { asset: factoryMedia.fabricStore, label: "Fabric store" },
  { asset: factoryMedia.sampling, label: "Sample room" },
  { asset: factoryMedia.cutting, label: "Cutting room" },
  { asset: factoryMedia.sewing, label: "Sewing line" },
  { asset: factoryMedia.printing, label: "Printing" },
  { asset: factoryMedia.embroidery, label: "Embroidery" },
  { asset: factoryMedia.laboratory, label: "Testing equipment" },
  { asset: factoryMedia.inspection, label: "Inspection" },
  { asset: factoryMedia.packing, label: "Packing" },
  { asset: factoryMedia.hero, label: "Overview" },
];

export default function FactoryPage() {
  const address = verifiedFactValue("factory-address");
  const machineFact = getFact("machine-count");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "The factory", path: "/factory" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow="The factory"
        title="Where your product would be made"
        lede="Buyers are entitled to see the environment their product comes from. This page is built to show exactly that, and to say plainly what has not been supplied yet."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href="/quality" variant="secondary">
              How quality is controlled
            </ButtonLink>
          </>
        }
      />

      <Section tight className="">
        <Container>
          <ProseBlock paragraphs={factoryNarrative.intro} />

          {address ? (
            <p className="mt-8 text-small text-ink-muted">
              <span className="text-ink-subtle">Facility address: </span>
              {address}
            </p>
          ) : (
            <Notice tone="info" title="Address not yet published" className="mt-10 max-w-[70ch]">
              The facility address has not been supplied for publication. Rather than
              publishing an approximate location, it is left out until the business confirms
              what it wants disclosed. Buyers conducting due diligence can request the full
              address directly.
            </Notice>
          )}
        </Container>
      </Section>

      <Section tight className="bg-cotton">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[16ch] font-sans text-h2 font-semibold tracking-[-0.045em]">Twelve views of the facility</h2>
            <p className="max-w-[42ch] text-small text-ink-subtle">
              Each panel below is a reserved slot with a written brief for the photograph
              required. No image of another factory is used as a substitute.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <Reveal key={item.label} as="li" delay={(index % 3) * 55}>
                <Media
                  asset={item.asset}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                />
                <p className="mt-3 text-label uppercase tracking-[0.09em] text-ink-subtle">
                  {item.label}
                </p>
                <p className="mt-2 text-small leading-relaxed text-ink-muted">
                  {item.asset.caption}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <SplitSection
        eyebrow="Equipment"
        title="Machinery and capacity"
        intro="The most common question a serious buyer asks, and the one we cannot yet answer with evidence."
      >
        <Notice tone="info" title="Awaiting a verified equipment list">
          <p>{factoryNarrative.equipmentNote}</p>
          {machineFact?.note ? (
            <p className="mt-3 text-ink-subtle">{machineFact.note}</p>
          ) : null}
          <p className="mt-3">
            We would rather publish nothing here than publish a machine count that a buyer
            could arrive and find to be wrong.
          </p>
        </Notice>
      </SplitSection>

      <SplitSection
        eyebrow="Visiting"
        title="Audits and factory visits"
        intro="Verification beats description. If you are placing a significant programme, come and look."
        className="tw-card tw-card-interactive overflow-hidden rounded-[22px]"
      >
        <ul className="divide-y divide-line border-y border-line text-small text-ink-muted">
          <li className="py-5">
            <span className="font-semibold text-ink">Buyer visits</span>
            <p className="mt-2">
              Buyers and their representatives are welcome to visit. Give us notice so the
              right people are available and so you see production rather than an empty floor.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Third party inspection</span>
            <p className="mt-2">
              Buyer appointed inspectors and third party inspection agencies are supported.
              Tell us the standard and sampling plan so the schedule allows for inspection and
              any rework it identifies.
            </p>
          </li>
          <li className="py-5">
            <span className="font-semibold text-ink">Social compliance audits</span>
            <p className="mt-2">
              Audits are supported and the information an audit requires is provided. No
              social compliance certification is claimed on this site, because none has been
              supplied for publication.
            </p>
          </li>
        </ul>
      </SplitSection>

      <PageCta
        title="Want to see more before you commit?"
        description="Ask for whatever evidence you need in your inquiry: specific photographs, a video walkthrough, or a visit. We would rather answer questions early than be judged on a website alone."
        location="factory_page"
        whatsapp={{ pageLabel: "The factory", path: "/factory" }}
        primaryLabel="Ask about the facility"
      />
    </>
  );
}
