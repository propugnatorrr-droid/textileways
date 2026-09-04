import type { Metadata } from "next";
import { Container, DisplayHeading, Eyebrow, Lede, ButtonLink, Section } from "@/components/ui";
import { notFoundMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata: Metadata = notFoundMetadata;

const suggestions = [
  { label: "Product families", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Materials", href: "/materials" },
  { label: "Manufacturing process", href: "/manufacturing-process" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="max-w-[62ch]">
          <Eyebrow>Error 404</Eyebrow>
          <DisplayHeading level={1} size="h1" className="mt-6">
            This page does not exist
          </DisplayHeading>
          <Lede className="mt-6">
            The address may have changed, or the link that brought you here may be out of
            date. The sections below cover everything on the site.
          </Lede>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">Return to the homepage</ButtonLink>
            <ButtonLink href="/request-a-quote" variant="secondary">
              Request a quote
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="tw-underline-grow text-small font-medium text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
