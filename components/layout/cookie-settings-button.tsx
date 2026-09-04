"use client";

import { useCookieConsent } from "@/components/layout/cookie-consent";

/** Reopens the consent choice so a visitor can change their mind later. */
export function CookieSettingsButton() {
  const { reopen } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={reopen}
      className="tw-underline-grow text-small text-ink-subtle transition-colors duration-200 hover:text-forest"
    >
      Cookie settings
    </button>
  );
}
