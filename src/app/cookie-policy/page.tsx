"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpItemVariants, viewportOnce } from "@/utils/animations";

export default function CookiePolicyPage() {
  const { lang } = useAppContext();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpItemVariants}
          className="max-w-4xl mx-auto px-4 sm:px-8"
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium">
              {lang === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
            </span>
          </nav>

          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-10 space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "إدارة التفضيلات" : "Preferences & Storage"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                {lang === "ar" ? "سياسة ملفات تعريف الارتباط " : "Cookie & Storage "}
                <span className="font-semibold text-neutral-950">{lang === "ar" ? "(Cookies)" : "Policy"}</span>
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "كيف نستخدم الذاكرة المحلية لتحسين تجربة تصفحك" : "How we utilize local storage to preserve your cart and language preferences"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "1. ما هي ملفات تعريف الارتباط؟" : "1. What are Cookies & Local Storage?"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "ملفات تعريف الارتباط هي ملفات نصية صغيرة تحفظ على جهازك لنتذكر تفضيلاتك مثل اللغة المفضلة (العربية أو الإنجليزية)، العملة المختارة، ومحتويات سلة مشترياتك حتى لا تفقدها عند إغلاق المتصفح."
                    : "Cookies and browser local storage allow our application to remember essential preferences, including selected language (Arabic/English), active currency (QAR, SAR, AED, USD), and persistent cart contents."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "2. أنواع الملفات المستخدمة" : "2. Types of Storage We Use"}
                </h2>
                <ul className="space-y-2 list-disc list-inside text-neutral-600">
                  <li>
                    <strong className="text-neutral-900 font-medium">{lang === "ar" ? "ملفات أساسية: " : "Essential State: "}</strong>
                    {lang === "ar"
                      ? "لحفظ عناصر سلة المشتريات ومعلومات جلسة الشراء."
                      : "Preserving your shopping cart and active checkout progression."}
                  </li>
                  <li>
                    <strong className="text-neutral-900 font-medium">{lang === "ar" ? "ملفات التفضيلات: " : "Preference State: "}</strong>
                    {lang === "ar"
                      ? "لحفظ اختيار العملة واللغة (عربي / إنجليزي)."
                      : "Remembering your active language and regional currency preference."}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
