"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/mockData";
import { X, Send, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreOrderModalProps {
  product: Product | null;
  onClose: () => void;
  lang: "en" | "ar";
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ product, onClose, lang }) => {
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 26, stiffness: 350 }}
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl border border-neutral-100 z-10"
          >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-neutral-400 hover:text-neutral-950 p-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 text-[#c5a059] mb-1">
          <Clock size={20} />
          <h3 className="font-semibold text-lg text-neutral-900">
            {lang === "ar" ? "طلب مسبق للمنتج" : "Pre-Order Notification"}
          </h3>
        </div>

        <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
          {lang === "ar"
            ? "المنتج قيد التوريد حالياً. سجل بياناتك وسنقوم بالتواصل معك فور وصول الشحنة."
            : "This model is currently in restocking. Leave your contact information to be notified on arrival."}
        </p>

        {/* Selected Product Card Summary */}
        <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60 mb-5">
          <div className="w-14 h-14 bg-white rounded-lg p-1.5 border border-neutral-100 shrink-0 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h4 className="font-medium text-xs text-neutral-900 line-clamp-1">{lang === "ar" ? product.name_ar : product.name}</h4>
            <p className="text-[11px] font-mono text-[#c5a059] mt-0.5">{product.product_id}</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-[#faf6ed] text-[#b38e46] p-4 rounded-xl text-center text-xs font-semibold border border-[#c5a059]/30">
            {lang === "ar" ? "تم تسجيل طلبك المسبق بنجاح!" : "Pre-order notification request submitted successfully."}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 mb-1">{lang === "ar" ? "الاسم الكامل" : "Full Name"}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "ar" ? "أدخل اسمك..." : "Your full name..."}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-600 mb-1">{lang === "ar" ? "رقم الجوال" : "Phone Number"}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+974 ..."
                className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-600 mb-1">{lang === "ar" ? "البريد الإلكتروني" : "Email Address"}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs uppercase tracking-wider mt-4 shadow-2xs active:scale-[0.98]"
            >
              <Send size={14} className="rtl:rotate-180" />
              <span>{lang === "ar" ? "تأكيد الطلب المسبق" : "Notify Me Upon Restock"}</span>
            </button>
            </form>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};
