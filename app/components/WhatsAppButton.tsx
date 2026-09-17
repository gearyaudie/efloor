"use client";

import type { ReactNode } from "react";
import { openWhatsApp } from "../lib/openWhatsApp";
import { buildWhatsAppUrl } from "../lib/whatsapp";

const variantClasses = {
  solid:
    "bg-brand-orange text-white px-4 py-2 rounded-2xl hover:opacity-90 transition inline-block text-center",
  plain: "",
};

/**
 * A WhatsApp CTA. Renders a real link (so it still works without JavaScript and
 * can be long-pressed or copied), and on click opens the chat with a
 * referenced message and records the lead.
 */
export default function WhatsAppButton({
  product,
  source,
  variant = "solid",
  className = "",
  children,
}: {
  /** What the visitor is asking about; appears in the first chat message. */
  product?: string;
  /** Where on the site the click happened, for reporting. */
  source: string;
  variant?: keyof typeof variantClasses;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={buildWhatsAppUrl({ product })}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClasses[variant]} hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${className}`}
      onClick={(event) => {
        event.preventDefault();
        openWhatsApp({ source, product });
      }}
    >
      {children}
    </a>
  );
}
