/**
 * Cloudflare Turnstile verification.
 *
 * Behaviour when Turnstile is not configured is a deliberate decision rather
 * than an oversight: the site must build and accept inquiries before the keys
 * exist, so a missing secret means verification is skipped and the fact is
 * logged. The honeypot, timing check, rate limit and Zod validation all still
 * apply, so an unconfigured deployment is not unprotected.
 *
 * Once TURNSTILE_SECRET_KEY is set, a token becomes mandatory.
 */

const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  success: boolean;
  /** True when verification was skipped because no secret is configured. */
  skipped: boolean;
  /** Short code for server logs. Never shown to the visitor. */
  reason?: string;
}

export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { success: true, skipped: true, reason: "not-configured" };
  }

  if (!token || token.trim().length === 0) {
    return { success: false, skipped: false, reason: "missing-token" };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

    const response = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // A hung verification must not hold a form submission open indefinitely.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return { success: false, skipped: false, reason: `http-${response.status}` };
    }

    const result = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (result.success === true) return { success: true, skipped: false };

    return {
      success: false,
      skipped: false,
      reason: result["error-codes"]?.join(",") ?? "verification-failed",
    };
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown-error";
    return { success: false, skipped: false, reason: `request-failed:${reason}` };
  }
}
