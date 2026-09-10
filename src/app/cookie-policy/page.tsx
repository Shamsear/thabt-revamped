"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight, Cookie, CheckCircle2 } from "lucide-react";

export default function CookiePolicyPage() {
  const { lang } = useAppContext();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
            </span>
          </nav>

          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6ed] text-[#9b7832] text-xs font-semibold mb-3 border border-[#c5a059]/30">
                <Cookie size={14} />
                <span>{lang === "ar" ? "إدارة التفضيلات والجلسات" : "Session & Storage Preferences"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                {lang === "ar" ? "سياسة ملفات تعريف الارتباط (Cookies)" : "Cookie Policy"}
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "كيف نستخدم الذاكرة المحلية لتحسين تجربة تصفحك" : "How we utilize local storage to preserve your cart and language preferences"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "1. ما هي ملفات تعريف الارتباط؟" : "1. What are Cookies & Local Storage?"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "ملفات تعريف الارتباط هي ملفات نصية صغيرة تحفظ على جهازك لنتذكر تفضيلاتك مثل اللغة المفضلة (العربية أو الإنجليزية)، العملة المختارة، ومحتويات سلة مشترياتك حتى لا تفقدها عند إغلاق المتصفح."
                    : "Cookies and browser local storage allow our application to remember essential preferences, including selected language (Arabic/English), active currency (QAR, SAR, AED, USD), and persistent cart contents."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "2. أنواع الملفات المستخدمة" : "2. Types of Cookies We Use"}
                </h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>{lang === "ar" ? "الملفات الضرورية للتشغيل: " : "Essential Cookies: "}</strong>
                    {lang === "ar" ? "لحفظ منتجات سلتك وتمكين إتمام عملية الشراء." : "Enables shopping cart persistence and checkout processing."}
                  </li>
                  <li>
                    <strong>{lang === "ar" ? "ملفات التفضيلات الشخصية: " : "Preference Cookies: "}</strong>
                    {lang === "ar" ? "لحفظ اختيارك للغة والعملة والسيارات المفضلة لديك." : "Remembers your active language and currency conversions."}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
