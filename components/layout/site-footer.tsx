import Link from "next/link";
import { footerNavigation, legalNavigation } from "@/content/configuration/navigation";
import { contactChannels, siteConfig, socialProfiles } from "@/content/configuration/site";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/layout/wordmark";
import { ContactChannelLink } from "@/components/layout/contact-channel-link";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import { whatsappEnabled } from "@/lib/utilities/whatsapp";

/**
 * Site footer.
 *
 * Contact details render only when they exist in the verified fact register, so
 * no placeholder address, phone number or email is ever published. There is no
 * newsletter signup because no email marketing integration is configured, and an
 * inert form would be worse than none.
 */
export function SiteFooter() {
  const channels = contactChannels();
  const country = verifiedFactValue("country");
  const legalName = verifiedFactValue("legal-entity-name") ?? siteConfig.legalNameFallback;
  const address = verifiedFactValue("factory-address");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cotton">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16 lg:py-20">
          <div>
            <Wordmark className="h-[30px] w-auto text-ink" />
            <p className="mt-6 max-w-[38ch] text-small text-ink-muted">
              Textile and apparel manufacturing for brands and organisations across the USA
              and Europe. Start with 50 pieces and scale beyond 100,000.
            </p>

            <dl className="mt-8 space-y-3 text-small">
              {country ? (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-ink-subtle">Country</dt>
                  <dd className="text-ink-muted">{country}</dd>
                </div>
              ) : null}

              {address ? (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-ink-subtle">Address</dt>
                  <dd className="text-ink-muted">{address}</dd>
                </div>
              ) : null}

              {channels.map((channel) => (
                <div key={channel.event} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-ink-subtle">{channel.label}</dt>
                  <dd>
                    <ContactChannelLink channel={channel} location="footer" />
                  </dd>
                </div>
              ))}
            </dl>

            {whatsappEnabled() ? (
              <WhatsappInlineLink
                context={{ pageLabel: "Footer", path: "/" }}
                location="footer"
                variant="primary"
                className="mt-8"
              >
                Message us on WhatsApp
              </WhatsappInlineLink>
            ) : null}

            {channels.length === 0 ? (
              <p className="mt-8 border border-line bg-paper px-4 py-3 text-small text-ink-subtle">
                Contact details are published here once the business confirms them. In the
                meantime, the quote and contact forms deliver inquiries directly.
              </p>
            ) : null}

            {socialProfiles.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {socialProfiles.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="tw-underline-grow text-small text-ink-muted"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {footerNavigation.map((column) => (
                <div key={column.title}>
                  <h2 className="mb-4 border-b border-line pb-2.5 text-label font-medium uppercase tracking-[0.09em] text-ink-subtle">
                    {column.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-small text-ink-muted transition-colors duration-200 hover:text-forest"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 text-small text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            {`© ${year} ${legalName}. All rights reserved.`}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNavigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
