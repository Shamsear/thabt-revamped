"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterSignupProps {
  lang: "en" | "ar";
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setEmail("");
  };

  return (
    <div className="pt-6 border-t border-neutral-800/60">
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles size={13} className="text-[#c5a059]" />
        <h4 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-semibold">
          {lang === "ar" ? "ابقَ على اطلاع" : "Stay Updated"}
        </h4>
      </div>
      <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">
        {lang === "ar"
          ? "اشترك ليصلك إشعار عند توفر منتجات جديدة أو عروض خاصة."
          : "Get notified about new arrivals and exclusive offers."}
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium py-2.5"
          >
            <CheckCircle2 size={14} />
            <span>{lang === "ar" ? "تم الاشتراك بنجاح!" : "You're subscribed!"}</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onSubmit={handleSubmit}
            className="flex items-center gap-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "ar" ? "بريدك الإلكتروني..." : "your@email.com"}
              className="flex-1 bg-neutral-800/60 border border-neutral-700/50 rounded-xl px-3 py-2 text-[11px] text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/30 transition"
            />
            <button
              type="submit"
              className="shrink-0 h-[34px] px-3 rounded-xl bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer active-press"
            >
              <Send size={11} className="rtl:rotate-180" />
              <span className="hidden xs:inline">{lang === "ar" ? "اشترك" : "Subscribe"}</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
