"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { analyticsEnabled } from "@/lib/analytics/track";
import { useStoredString, useIsHydrated } from "@/lib/hooks/use-browser-storage";

/**
 * Consent handling.
 *
 * Analytics only loads after an explicit accept. Declining is a single click of
 * equal prominence, and the choice can be changed later from the footer. When no
 * analytics provider is configured, the banner never appears at all, because
 * there is nothing to consent to.
 *
 * The stored choice is read through `useSyncExternalStore`, so the banner never
 * flashes on a repeat visit and no state update runs inside an effect.
 */

const STORAGE_KEY = "textileways.consent.analytics";

type ConsentValue = "granted" | "denied";

interface ConsentContextValue {
  consent: ConsentValue | null;
  grant: () => void;
  deny: () => void;
  reopen: () => void;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  grant: () => {},
  deny: () => {},
  reopen: () => {},
});

export function useCookieConsent(): ConsentContextValue {
  return useContext(ConsentContext);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const hydrated = useIsHydrated();
  const { value: stored, write, clear } = useStoredString("local", STORAGE_KEY);
  /* Set only when the visitor reopens the banner after having already chosen. */
  const [reopened, setReopened] = useState(false);

  const consent: ConsentValue | null =
    stored === "granted" || stored === "denied" ? stored : null;

  const grant = useCallback(() => {
    setReopened(false);
    write("granted");
  }, [write]);

  const deny = useCallback(() => {
    setReopened(false);
    write("denied");
  }, [write]);

  const reopen = useCallback(() => {
    if (!analyticsEnabled()) return;
    clear();
    setReopened(true);
  }, [clear]);

  const value = useMemo(
    () => ({ consent, grant, deny, reopen }),
    [consent, grant, deny, reopen],
  );

  /* Shown only after hydration, only when analytics exists, and only when unanswered. */
  const visible = hydrated && analyticsEnabled() && (consent === null || reopened);

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {visible ? <ConsentBanner onGrant={grant} onDeny={deny} /> : null}
    </ConsentContext.Provider>
  );
}

function ConsentBanner({ onGrant, onDeny }: { onGrant: () => void; onDeny: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white"
    >
      <div className="tw-container flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-[62ch]">
          <p id="cookie-consent-title" className="text-small font-semibold text-ink">
            Analytics cookies
          </p>
          <p className="mt-1.5 text-small text-ink-muted">
            We would like to measure which pages are useful to buyers. Nothing you type into a
            form is ever sent to analytics. See our{" "}
            <Link href="/cookie-policy" className="tw-underline-grow font-medium text-ink">
              cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={onDeny}
            className="min-h-[44px] rounded-[14px] border border-line-strong px-5 text-small font-medium text-ink transition-colors duration-200 hover:border-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onGrant}
            className="min-h-[44px] rounded-[14px] border border-forest bg-forest px-5 text-small font-medium text-white transition-colors duration-200 hover:bg-forest-deep"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Loads analytics scripts, but only after consent has been granted and only when
 * a provider id is configured. Appending script elements to the document is a
 * genuine external side effect, which is what an effect is for.
 */
export function AnalyticsScripts() {
  const { consent } = useCookieConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    if (consent !== "granted") return;
    if (typeof document === "undefined") return;

    if (gaId && !document.getElementById("ga-script")) {
      const loader = document.createElement("script");
      loader.id = "ga-script";
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(loader);

      const inline = document.createElement("script");
      inline.id = "ga-init";
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`;
      document.head.appendChild(inline);
    }

    if (clarityId && !document.getElementById("clarity-script")) {
      const inline = document.createElement("script");
      inline.id = "clarity-script";
      inline.textContent = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`;
      document.head.appendChild(inline);
    }
  }, [consent, gaId, clarityId]);

  return null;
}
