"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, X } from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "warning" | "neutral";
  icon?: React.ReactNode;
  lang?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  confirmVariant = "warning",
  icon,
  lang = "en",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!mounted) return null;

  const isAr = lang === "ar";
  const defaultConfirmText = isAr ? "نعم، العودة" : "Yes, Go Back";
  const defaultCancelText = isAr ? "البقاء هنا والمتابعة" : "Stay & Continue";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmation-title"
          aria-describedby="confirmation-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none"
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Subtle Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer touch-none"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-2xl z-10 space-y-4"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
              aria-label={isAr ? "إغلاق" : "Close"}
            >
              <X size={16} />
            </button>

            {/* Header: Icon + Title */}
            <div className="flex items-start gap-3.5 pr-6 rtl:pr-0 rtl:pl-6">
              <div
                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                  confirmVariant === "danger"
                    ? "bg-rose-50 text-rose-600 border border-rose-200/60"
                    : "bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/30"
                }`}
              >
                {icon || (
                  <AlertCircle
                    size={22}
                    className={confirmVariant === "danger" ? "text-rose-600" : "text-[#c5a059]"}
                  />
                )}
              </div>

              <div className="space-y-1">
                <h3
                  id="confirmation-title"
                  className="text-base font-semibold text-neutral-950 leading-snug"
                >
                  {title}
                </h3>
                <p
                  id="confirmation-desc"
                  className="text-xs text-neutral-500 leading-relaxed"
                >
                  {description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onConfirm}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  confirmVariant === "danger"
                    ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200"
                }`}
              >
                <span>{confirmText || defaultConfirmText}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{cancelText || defaultCancelText}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
