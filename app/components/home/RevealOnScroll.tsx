"use client";

import { useEffect } from "react";

/**
 * Fades [data-reveal] blocks in as they scroll into view. Only blocks that
 * start below the fold are hidden first, so the first screen (and the page
 * without JavaScript) is always fully visible.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-visible");
            observer.unobserve(el);
            // Drop the reveal classes once done so they don't override the
            // element's own hover transitions.
            window.setTimeout(() => el.classList.remove("reveal", "is-visible"), 800);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
