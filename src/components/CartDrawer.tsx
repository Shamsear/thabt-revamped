"use client";

import React from "react";
import { Product } from "@/data/mockData";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

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
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-amber-400" />
              <h3 className="font-bold text-lg">{lang === "ar" ? "سلة التسوق" : "Shopping Cart"}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400 space-y-3">
                <ShoppingBag size={48} className="mx-auto text-gray-300 stroke-1" />
                <p className="font-semibold text-base">{lang === "ar" ? "السلة فارغة حالياً" : "Your cart is empty"}</p>
                <p className="text-xs text-gray-400">{lang === "ar" ? "تصفح المنتجات وأضف ما يناسب مركبتك." : "Browse products and add items to your cart."}</p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200/70 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-neutral-900 line-clamp-1">{lang === "ar" ? product.name_ar : product.name}</h4>
                    <p className="text-xs font-black text-amber-600 mt-1">
                      {product.price} {currency}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white text-xs">
                        <button
                          onClick={() => onUpdateQty(product.id, -1)}
                          className="px-2 py-0.5 font-bold hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(product.id, 1)}
                          className="px-2 py-0.5 font-bold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-base font-bold text-neutral-900">
                <span>{lang === "ar" ? "المجموع الكلي:" : "Subtotal:"}</span>
                <span className="text-xl text-amber-600 font-black">
                  {totalAmount} {currency}
                </span>
              </div>

              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition shadow-lg text-sm"
              >
                <span>{lang === "ar" ? "إتمام الطلب" : "Proceed to Checkout"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
