import { NextResponse } from "next/server";
import { consume, clientIdentifier, type RateLimitResult } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";
import { completedTooQuickly } from "@/lib/validation/shared";

/**
 * Shared pre checks for every public form endpoint.
 *
 * Rate limit, honeypot, timing and Turnstile are applied in one place so no
 * endpoint can accidentally skip one. Rejections return a deliberately generic
 * message: telling an automated client which check it failed helps it get past
 * the next one.
 */

export interface GuardInput {
  headers: Headers;
  endpoint: "rfq" | "sample" | "contact" | "upload";
  limit: number;
  windowMs: number;
  honeypotValue?: string;
  formStartedAt?: number;
  turnstileToken?: string;
}

export interface GuardFailure {
  response: NextResponse;
  reason: string;
}

const GENERIC_REJECTION =
  "We could not accept this submission. Please try again, or contact us directly if the problem continues.";

/** Runs every pre check. Returns null when the request may proceed. */
export async function guardSubmission(input: GuardInput): Promise<GuardFailure | null> {
  const client = clientIdentifier(input.headers);

  const rate: RateLimitResult = consume(
    `${input.endpoint}:${client}`,
    input.limit,
    input.windowMs,
  );

  if (!rate.allowed) {
    return {
      reason: "rate-limited",
      response: NextResponse.json(
        {
          ok: false,
          error:
            "You have sent several submissions recently. Please wait a little before trying again, or email us directly.",
        },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
      ),
    };
  }

  if (input.honeypotValue && input.honeypotValue.trim().length > 0) {
    return {
      reason: "honeypot-filled",
      response: NextResponse.json({ ok: false, error: GENERIC_REJECTION }, { status: 400 }),
    };
  }

  if (typeof input.formStartedAt === "number" && completedTooQuickly(input.formStartedAt)) {
    return {
      reason: "completed-too-quickly",
      response: NextResponse.json({ ok: false, error: GENERIC_REJECTION }, { status: 400 }),
    };
  }

  const turnstile = await verifyTurnstile(input.turnstileToken, client);
  if (!turnstile.success) {
    return {
      reason: `turnstile:${turnstile.reason ?? "failed"}`,
      response: NextResponse.json(
        {
          ok: false,
          error:
            "The spam check did not pass. Please reload the page and try again, or contact us directly.",
        },
        { status: 400 },
      ),
    };
  }

  return null;
}

/**
 * Logs a server side failure without leaking anything sensitive.
 * Only the endpoint, a short reason code and a reference are recorded.
 */
export function logFailure(endpoint: string, reason: string, reference?: string): void {
  console.error(
    `[${endpoint}] rejected: ${reason}${reference ? ` reference=${reference}` : ""}`,
  );
}

export const genericErrorMessage = GENERIC_REJECTION;
