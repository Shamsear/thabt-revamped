"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/mockData";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { product: Product; quantity: number }[];
  onRemoveItem: (productId: string) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  currency: string;
  lang: "en" | "ar";
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQty,
  currency,
  lang,
}) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
          {/* Dark Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex">
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 350 }}
              className="w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col border-l rtl:border-l-0 rtl:border-r border-neutral-100 h-full"
            >
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} className="text-[#c5a059]" />
              <h3 className="font-semibold text-base text-neutral-900">
                {lang === "ar" ? "حقيبة التسوق" : "Shopping Bag"}
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-neutral-400 space-y-2">
                <ShoppingBag size={40} className="mx-auto text-neutral-300 stroke-[1.25]" />
                <p className="font-medium text-sm text-neutral-900">
                  {lang === "ar" ? "الحقيبة فارغة حالياً" : "Your bag is empty"}
                </p>
                <p className="text-xs text-neutral-500">
                  {lang === "ar" ? "اختر قاعدة سيارتك وأضفها للطلب." : "Browse vehicle mounts to add products."}
                </p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 items-center justify-between"
                >
                  <div className="w-16 h-16 bg-white rounded-lg p-2 border border-neutral-100 shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                    <h4 className="font-medium text-xs text-neutral-900 line-clamp-1">
                      {lang === "ar" ? product.name_ar : product.name}
                    </h4>
                    <p className="text-xs font-semibold text-neutral-900 mt-0.5">
                      {product.price} <span className="text-[10px] font-normal text-[#c5a059]">{currency}</span>
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="flex items-center border border-neutral-200 rounded-md bg-white text-xs">
                        <button
                          onClick={() => onUpdateQty(product.id, -1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 transition cursor-pointer text-neutral-600"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-neutral-900">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(product.id, 1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 transition cursor-pointer text-neutral-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-neutral-400 hover:text-neutral-900 transition p-1 cursor-pointer"
                        title={lang === "ar" ? "حذف" : "Remove"}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-white space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500">{lang === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
                <span className="text-lg font-semibold text-neutral-900">
                  {totalAmount} <span className="text-xs font-normal text-[#c5a059]">{currency}</span>
                </span>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="w-full bg-neutral-900 hover:bg-[#c5a059] hover:text-neutral-950 text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingBag size={15} />
                  <span>{lang === "ar" ? "الانتقال إلى سلة المشتريات" : "Go to Cart Page"}</span>
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </Link>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-[#faf6ed] hover:bg-[#f3ead3] text-[#9b7832] border border-[#c5a059]/40 text-xs uppercase tracking-wider font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
                >
                  <span>{lang === "ar" ? "الدفع والشراء المباشر" : "Proceed to Checkout"}</span>
                  <ArrowRight size={13} className="rtl:rotate-180" />
                </Link>
              </div>

              <p className="text-[10px] text-neutral-400 text-center">
                {lang === "ar"
                  ? "توصيل سريع لكافة دول الخليج • ضمان سلامة الديكور"
                  : "Express GCC delivery • 100% Damage-free warranty"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )}
</AnimatePresence>
);
};
