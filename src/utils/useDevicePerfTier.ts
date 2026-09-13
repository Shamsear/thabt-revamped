"use client";

import { useState, useEffect } from "react";

export type DevicePerfTier = "high" | "medium" | "low";

export interface PerfTierConfig {
  hasBlur: boolean;
  navBg: string;
  enableComplexAnimations: boolean;
}

export const perfClasses: Record<DevicePerfTier, PerfTierConfig> = {
  high: {
    hasBlur: true,
    navBg: "bg-white/95 backdrop-blur-lg",
    enableComplexAnimations: true,
  },
  medium: {
    hasBlur: true,
    navBg: "bg-white/95 backdrop-blur-md",
    enableComplexAnimations: true,
  },
  low: {
    hasBlur: false,
    navBg: "bg-white",
    enableComplexAnimations: false,
  },
};

/**
 * Detects device performance tier to gracefully scale visual effects like
 * backdrop-blur, complex shadows, and heavy animations on lower-end devices.
 *
 * Defaults to 'high' during initial SSR to avoid layout flash, then tunes on client mount.
 */
export function useDevicePerfTier(): DevicePerfTier {
  const [tier, setTier] = useState<DevicePerfTier>("high");

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const nav = navigator as Navigator & { deviceMemory?: number };
      const cores = nav.hardwareConcurrency ?? 8;
      const memory = nav.deviceMemory ?? 8;

      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const supportsBackdropBlur =
        typeof CSS !== "undefined" &&
        (CSS.supports?.("backdrop-filter", "blur(10px)") ||
          CSS.supports?.("-webkit-backdrop-filter", "blur(10px)"));

      if (supportsBackdropBlur === false || cores <= 2 || memory <= 2) {
        setTier("low");
      } else if (prefersReducedMotion || cores <= 4 || memory <= 4) {
        setTier("medium");
      } else {
        setTier("high");
      }
    } catch {
      // Fallback safely to high if browser restrictions block detection
      setTier("high");
    }
  }, []);

  return tier;
}

export default useDevicePerfTier;
