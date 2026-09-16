"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackWhatsAppClick } from "../lib/analytics";

export default function WhatsAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        void trackWhatsAppClick({ source: "whatsapp-link" });
      }}
    >
      {children}
    </Link>
  );
}
