"use client";

import { useCookieConsent } from "@/components/layout/cookie-consent";

/** Reopens the consent choice so a visitor can change their mind later. */
export function CookieSettingsButton() {
  const { reopen } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={reopen}
      className="tw-underline-grow text-small transition-colors duration-200 hover:text-white"
    >
      Cookie settings
    </button>
  );
}
