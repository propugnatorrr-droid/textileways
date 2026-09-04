"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsContext } from "@/lib/analytics/track";

/**
 * Records a page view event once per mount. Renders nothing, so it can sit
 * inside a server component page without affecting the markup.
 */
export function ViewTracker({
  event,
  context,
}: {
  event: AnalyticsEvent;
  context?: AnalyticsContext;
}) {
  useEffect(() => {
    track(event, context);
    // The event and context are static per page, so this runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
