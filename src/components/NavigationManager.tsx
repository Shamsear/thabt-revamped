"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent landing at the bottom of the new page
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Force immediate scroll to top on every route and search parameter change
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [pathname, searchParams]);

  return null;
}
