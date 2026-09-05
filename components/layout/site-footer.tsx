import Link from "next/link";
import { footerNavigation, legalNavigation } from "@/content/configuration/navigation";
import { contactChannels, siteConfig, socialProfiles } from "@/content/configuration/site";
import { verifiedFactValue } from "@/content/configuration/company-facts";
import { Wordmark } from "@/components/layout/wordmark";
import { ContactChannelLink } from "@/components/layout/contact-channel-link";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { WhatsappInlineLink } from "@/components/layout/whatsapp-button";
import { whatsappEnabled } from "@/lib/utilities/whatsapp";

/**
 * Site footer.
 *
 * A contained dark panel sitting on the white page rather than a full bleed
 * block. Contact details render only when they exist in the verified fact
 * register, so no placeholder address, phone number or email is ever published.
 * There is no newsletter signup because no email marketing integration is
 * configured, and an inert form would be worse than none.
 */
export function SiteFooter() {
  const channels = contactChannels();
  const country = verifiedFactValue("country");
  const legalName = verifiedFactValue("legal-entity-name") ?? siteConfig.legalNameFallback;
  const address = verifiedFactValue("factory-address");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="overflow-hidden rounded-[28px] bg-ink text-white md:rounded-[36px]">
        <div className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <Wordmark className="text-[24px] text-white [&>span]:text-white/55" />

              <p className="mt-8 max-w-[18ch] font-sans text-h3 font-semibold leading-[1.1] tracking-[-0.035em] text-white">
                One manufacturing partner from first sample to scaled production.
              </p>

              <p className="mt-6 max-w-[42ch] text-small leading-relaxed text-white/65">
                Textile and apparel manufacturing for brands and organisations across the
                USA and Europe. Start with 50 pieces and scale beyond 100,000.
              </p>

              {whatsappEnabled() ? (
                <WhatsappInlineLink
                  context={{ pageLabel: "Footer", path: "/" }}
                  location="footer"
                  variant="inverse"
                  className="mt-9"
                >
                  Message us on WhatsApp
                </WhatsappInlineLink>
              ) : null}

              <dl className="mt-10 grid gap-4 text-small sm:grid-cols-2">
                {country ? (
                  <div>
                    <dt className="text-label font-semibold uppercase tracking-[0.1em] text-white/45">
                      Country
                    </dt>
                    <dd className="mt-1.5 text-white/80">{country}</dd>
                  </div>
                ) : null}

                {address ? (
                  <div>
                    <dt className="text-label font-semibold uppercase tracking-[0.1em] text-white/45">
                      Address
                    </dt>
                    <dd className="mt-1.5 text-white/80">{address}</dd>
                  </div>
                ) : null}

                {channels.map((channel) => (
                  <div key={channel.event}>
                    <dt className="text-label font-semibold uppercase tracking-[0.1em] text-white/45">
                      {channel.label}
                    </dt>
                    <dd className="mt-1.5">
                      <ContactChannelLink
                        channel={channel}
                        location="footer"
                        className="tw-underline-grow text-white/80"
                      />
                    </dd>
                  </div>
                ))}
              </dl>

              {channels.length === 0 ? (
                <p className="mt-8 max-w-[44ch] rounded-[16px] border border-white/10 bg-white/[0.04] px-5 py-4 text-small leading-relaxed text-white/65">
                  Email and telephone details are published here once the business
                  confirms them. In the meantime, the quote and contact forms deliver
                  inquiries directly and you receive a reference by email.
                </p>
              ) : null}

              {socialProfiles.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {socialProfiles.map((profile) => (
                    <li key={profile.href}>
                      <a
                        href={profile.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="tw-underline-grow text-small text-white/70"
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
                    <h2 className="text-label font-semibold uppercase tracking-[0.1em] text-white/45">
                      {column.title}
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="text-small text-white/75 transition-colors duration-200 hover:text-white"
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
        </div>

        <div className="border-t border-white/10 px-6 py-7 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-4 text-small text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>{`© ${year} ${legalName}. All rights reserved.`}</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalNavigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
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
        </div>
      </div>
    </footer>
  );
}
