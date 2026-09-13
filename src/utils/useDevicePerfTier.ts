"use client";

import { useState, useEffect } from "react";

export type DevicePerfTier = "full" | "mid" | "low";

export interface PerfTierStyles {
  blur: string;
  pillScrolledBg: string;
  pillScrolledBorder: string;
  pillScrolledShadow: string;
  transition: string;
  hudBlur: string;
  hudBg: string;
  hasBlur: boolean;
  enableMorph: boolean;
}

export const perfClasses: Record<DevicePerfTier, PerfTierStyles> = {
  full: {
    blur: "backdrop-blur-xl",
    pillScrolledBg: "bg-white/85",
    pillScrolledBorder: "border-[#c5a059]/25",
    pillScrolledShadow: "shadow-md",
    transition: "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    hudBlur: "backdrop-blur-3xl",
    hudBg: "bg-neutral-50/95",
    hasBlur: true,
    enableMorph: true,
  },
  mid: {
    blur: "backdrop-blur-md",
    pillScrolledBg: "bg-white/92",
    pillScrolledBorder: "border-neutral-200/80",
    pillScrolledShadow: "shadow-sm",
    transition: "transition-all duration-200 ease-out",
    hudBlur: "backdrop-blur-lg",
    hudBg: "bg-neutral-50/98",
    hasBlur: true,
    enableMorph: true,
  },
  low: {
    blur: "",
    pillScrolledBg: "bg-white",
    pillScrolledBorder: "border-neutral-200",
    pillScrolledShadow: "shadow-xs",
    transition: "transition-none",
    hudBlur: "",
    hudBg: "bg-white",
    hasBlur: false,
    enableMorph: false,
  },
};

const STORAGE_KEY = "thabt_perf_tier_v1";

export function useDevicePerfTier(): DevicePerfTier {
  // Start with 'mid' as safe default to avoid layout or render flash
  const [tier, setTier] = useState<DevicePerfTier>("mid");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check cached value first
    try {
      const cached = localStorage.getItem(STORAGE_KEY) as DevicePerfTier | null;
      if (cached && (cached === "full" || cached === "mid" || cached === "low")) {
        setTier(cached);
        return;
      }
    } catch {
      // Ignore localStorage access errors (e.g. private mode)
    }

    // Evaluate hardware signals
    const evaluate = (): DevicePerfTier => {
      try {
        const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (prefersReducedMotion) {
          return "low";
        }

        const supportsBackdrop =
          typeof CSS !== "undefined" &&
          (CSS.supports?.("backdrop-filter", "blur(10px)") ||
            CSS.supports?.("-webkit-backdrop-filter", "blur(10px)"));
        if (!supportsBackdrop) {
          return "low";
        }

        const nav = navigator as Navigator & { deviceMemory?: number };
        const cores = nav.hardwareConcurrency ?? 4;
        const memory = nav.deviceMemory ?? 4;

        if (cores >= 6 && memory >= 6) {
          return "full";
        }
        if (cores < 3 || memory < 3) {
          return "low";
        }
        return "mid";
      } catch {
        return "mid";
      }
    };

    let resolvedTier = evaluate();

    // If hardware is ambiguous (e.g. Safari hides concurrency/memory), run quick rAF probe
    if (resolvedTier === "mid" && typeof window.requestAnimationFrame === "function") {
      let frameCount = 0;
      let startTime = performance.now();

      const probe = () => {
        frameCount++;
        if (frameCount < 10) {
          requestAnimationFrame(probe);
        } else {
          const elapsed = performance.now() - startTime;
          const fps = (frameCount / elapsed) * 1000;
          // If running smoothly above 50fps, promote to full
          const finalTier: DevicePerfTier = fps > 50 ? "full" : fps < 30 ? "low" : "mid";
          setTier(finalTier);
          try {
            localStorage.setItem(STORAGE_KEY, finalTier);
          } catch {}
        }
      };

      requestAnimationFrame(probe);
    } else {
      setTier(resolvedTier);
      try {
        localStorage.setItem(STORAGE_KEY, resolvedTier);
      } catch {}
    }

    // Debounced resize / orientation change re-evaluation
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newTier = evaluate();
        setTier(newTier);
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return tier;
}

export default useDevicePerfTier;
