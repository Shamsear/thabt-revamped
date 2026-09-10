"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CartDrawer } from "@/components/CartDrawer";
import { PreOrderModal } from "@/components/PreOrderModal";

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
  } = useAppContext();

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
    </>
  );
};
