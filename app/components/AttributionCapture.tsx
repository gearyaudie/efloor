"use client";

import { useEffect } from "react";
import { captureAttribution } from "../lib/attribution";

/** Records the ad click a visitor landed from. Renders nothing. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
