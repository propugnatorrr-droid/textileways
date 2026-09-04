import { Container, Section, Notice, MarkerList } from "@/components/ui";
import { PageHeader } from "@/components/sections/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { formatDate } from "@/lib/utilities/format";
import { legalReviewNotice, type LegalSection } from "@/content/fallback/legal";

/** Shared layout for the three legal pages, so they stay visually consistent. */
export function LegalPage({
  eyebrow,
  title,
  lede,
  path,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        breadcrumbs={breadcrumbs}
        size="h1"
      />

      <Section>
        <Container>
          <div className="max-w-[76ch]">
            <p className="text-small text-ink-subtle">
              Last updated <time dateTime={updated}>{formatDate(updated)}</time>
            </p>

            <Notice tone="info" title="Draft pending legal review" className="mt-6">
              {legalReviewNotice}
            </Notice>

            <nav aria-label="On this page" className="mt-12 border-y border-line py-6">
              <p className="text-label uppercase tracking-[0.09em] text-ink-subtle">
                On this page
              </p>
              <ol className="mt-4 space-y-2">
                {sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${sectionId(section.heading)}`}
                      className="tw-underline-grow text-small text-ink-muted"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-14 space-y-12">
              {sections.map((section) => (
                <section key={section.heading} id={sectionId(section.heading)}>
                  <h2 className="font-serif text-h3">{section.heading}</h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-body leading-relaxed text-ink-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.list ? <MarkerList items={section.list} className="mt-5" /> : null}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
