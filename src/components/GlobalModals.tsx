"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { CartDrawer } from "@/components/CartDrawer";
import { PreOrderModal } from "@/components/PreOrderModal";
import { AuthModal } from "@/components/AuthModal";
import { ToastContainer } from "@/components/ToastContainer";
import { AnimatePresence, motion } from "framer-motion";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const GlobalModals: React.FC = () => {
  const {
    cartDrawerOpen,
    setCartDrawerOpen,
    cartItems,
    removeFromCart,
    updateQty,
    currency,
    lang,
    preOrderProduct,
    setPreOrderProduct,
    authModalOpen,
    setAuthModalOpen,
    hideToast,
  } = useAppContext();

  // Body scroll lock when any modal/drawer is open (#2)
  const anyOverlayOpen = cartDrawerOpen || !!preOrderProduct || authModalOpen;
  useEffect(() => {
    if (anyOverlayOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [anyOverlayOpen]);

  // Close active modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (cartDrawerOpen) setCartDrawerOpen(false);
        if (preOrderProduct) setPreOrderProduct(null);
        if (authModalOpen) setAuthModalOpen(false);
        hideToast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartDrawerOpen, preOrderProduct, authModalOpen, setCartDrawerOpen, setPreOrderProduct, setAuthModalOpen, hideToast]);

  return (
    <>
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQty={updateQty}
        currency={currency}
        lang={lang}
      />
      <PreOrderModal
        product={preOrderProduct}
        onClose={() => setPreOrderProduct(null)}
        lang={lang}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        lang={lang}
      />
      <ToastContainer />
      <MobileBottomNav />
    </>
  );
};
