"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { ShoppingBag, CheckCircle2, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toast, hideToast, setCartDrawerOpen, lang } = useAppContext();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 0.98, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-6 right-5 rtl:right-auto rtl:left-5 z-50 max-w-sm w-full bg-neutral-950 text-white border border-neutral-800 rounded-2xl shadow-2xl p-3.5 flex items-center justify-between gap-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            {toast.image ? (
              <div className="w-11 h-11 p-1 rounded-xl bg-white/10 shrink-0 flex items-center justify-center border border-white/10">
                <img
                  src={toast.image}
                  alt={toast.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0 border border-[#c5a059]/30">
                <CheckCircle2 size={18} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {lang === "ar" && toast.title_ar ? toast.title_ar : toast.title}
              </p>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                {toast.message || (lang === "ar" ? "تمت الإضافة بنجاح" : "Item added to your order")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                hideToast();
                setCartDrawerOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer active:scale-95"
            >
              <ShoppingBag size={12} />
              <span>{lang === "ar" ? "السلة" : "View"}</span>
            </button>

            <button
              type="button"
              onClick={hideToast}
              className="p-1 rounded-lg text-neutral-400 hover:text-white transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
