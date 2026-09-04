"use client";

import type { ContactChannel } from "@/content/configuration/site";
import { track } from "@/lib/analytics/track";

/** Contact link that records the channel used without transmitting its value. */
export function ContactChannelLink({
  channel,
  location,
  className = "tw-underline-grow text-ink-muted",
}: {
  channel: ContactChannel;
  location: string;
  className?: string;
}) {
  return (
    <a
      href={channel.href}
      className={className}
      rel={channel.event === "whatsapp_click" ? "noopener noreferrer" : undefined}
      target={channel.event === "whatsapp_click" ? "_blank" : undefined}
      onClick={() => track(channel.event, { cta_location: location })}
    >
      {channel.value}
    </a>
  );
}
