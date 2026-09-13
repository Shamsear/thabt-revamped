"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface UseNavigationConfirmationOptions {
  enabled: boolean;
  onConfirmLeave?: () => void;
  defaultTargetUrl?: string;
  beforeUnloadMessage?: string;
}

export function useNavigationConfirmation({
  enabled,
  onConfirmLeave,
  defaultTargetUrl,
  beforeUnloadMessage = "You have unsaved progress. Are you sure you want to leave?",
}: UseNavigationConfirmationOptions) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<string | null>(null);
  const isNavigatingAwayRef = useRef(false);

  // 1. Browser BeforeUnload (Tab Close / Reload)
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isNavigatingAwayRef.current) return;
      e.preventDefault();
      e.returnValue = beforeUnloadMessage;
      return beforeUnloadMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [enabled, beforeUnloadMessage]);

  // 2. Browser Back Button (popstate interception)
  useEffect(() => {
    if (!enabled) return;

    // Push dummy history entry so the first Back press is caught
    try {
      window.history.pushState({ thabtGuard: true }, "", window.location.href);
    } catch {
      // ignore
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isNavigatingAwayRef.current) return;

      // Re-push state so user stays on current page until they confirm
      try {
        window.history.pushState({ thabtGuard: true }, "", window.location.href);
      } catch {
        // ignore
      }

      setPendingTarget(defaultTargetUrl || null);
      setShowConfirmModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, defaultTargetUrl]);

  // 3. Programmatic Navigation request (e.g. clicking "Return to Cart" or Logo)
  const requestNavigation = useCallback(
    (targetUrl: string) => {
      if (!enabled) {
        router.push(targetUrl);
        return;
      }
      setPendingTarget(targetUrl);
      setShowConfirmModal(true);
    },
    [enabled, router]
  );

  // 4. Confirm action handler
  const handleConfirm = useCallback(() => {
    isNavigatingAwayRef.current = true;
    setShowConfirmModal(false);

    if (onConfirmLeave) {
      onConfirmLeave();
    }

    if (pendingTarget) {
      router.push(pendingTarget);
    } else if (defaultTargetUrl) {
      router.push(defaultTargetUrl);
    } else {
      router.back();
    }
  }, [onConfirmLeave, pendingTarget, defaultTargetUrl, router]);

  // 5. Cancel action handler
  const handleCancel = useCallback(() => {
    setShowConfirmModal(false);
    setPendingTarget(null);
  }, []);

  return {
    showConfirmModal,
    requestNavigation,
    handleConfirm,
    handleCancel,
  };
}
