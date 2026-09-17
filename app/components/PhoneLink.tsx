"use client";

import type { ReactNode } from "react";
import { trackPhoneClick } from "../lib/analytics";
import { PHONE_DISPLAY, PHONE_TEL_HREF } from "../lib/whatsapp";

/** A tap-to-call link to the EFLOOR line that records the tap. */
export default function PhoneLink({
  source,
  className = "",
  children,
}: {
  source: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={PHONE_TEL_HREF}
      className={`hover:cursor-pointer ${className}`}
      onClick={() => trackPhoneClick({ source })}
    >
      {children ?? `Telepon ${PHONE_DISPLAY}`}
    </a>
  );
}
