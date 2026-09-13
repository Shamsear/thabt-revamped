"use client";

import { useEffect, useRef } from "react";

/**
 * #12: Focus trap hook for modal dialogs.
 * Traps Tab/Shift+Tab focus cycling within the container while active.
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    // Auto-focus the first focusable element
    const timer = setTimeout(() => {
      const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 50);

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isActive]);

  return containerRef;
}
