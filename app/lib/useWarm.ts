"use client";

import { useState } from "react";

/**
 * For galleries that stack every photo and fade between them: only the photo
 * on screen should download with the page. `warm` flips on the first sign of
 * interest (pointer, touch or keyboard focus inside `warmProps`' element), and
 * then the other photos load, well before the visitor actually switches.
 */
export function useWarm() {
  const [warm, setWarm] = useState(false);
  const heat = () => setWarm(true);
  return {
    warm,
    warmProps: warm ? {} : { onPointerEnter: heat, onTouchStart: heat, onFocusCapture: heat },
  };
}
