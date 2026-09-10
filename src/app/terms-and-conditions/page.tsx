"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight, Scale } from "lucide-react";

export default function TermsPage() {
  const { lang } = useAppContext();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium">
              {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </span>
          </nav>

          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-10 space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "اللوائح القانونية" : "Legal Framework"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                {lang === "ar" ? "الشروط والأحكام لمتجر " : "Terms & Conditions for "}
                <span className="font-semibold text-neutral-950">Thabt</span>
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "آخر تحديث: سبتمبر 2026 • وزارة التجارة والصناعة، دولة قطر" : "Last updated: September 2026 • Ministry of Commerce & Industry, State of Qatar"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "1. مقدمة وتعريف بالخدمة" : "1. Introduction & Acceptance of Terms"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "مرحباً بكم في متجر ثقة الإلكتروني (المملوك والمدار بواسطة Gulf Digital Solution ذ.م.م، سجل تجاري رقم 159281، دولة قطر). تنظم هذه الشروط والأحكام استخدامكم للموقع وعمليات شراء حلول وقواعد التثبيت الأصلية."
                    : "Welcome to Thabt (operated by Gulf Digital Solution W.L.L, Commercial Registration No. 159281, Doha, Qatar). By accessing our platform or purchasing precision vehicle mounts, you agree to these legal terms."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "2. دقة التركيب والتوافق مع المركبات" : "2. Vehicle Fitment & Compatibility Guarantee"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تلتزم ثقة بتقديم قواعد تثبيت مطابقة 100% لموديل وسنة صنع السيارة المحددة من قبل العميل عند الطلب. نضمن عدم إحداث أي ثقوب أو تشويه لديكور لوحة القيادة الأصلية."
                    : "Thabt guarantees 100% vehicle compatibility when products are ordered according to the specific car make, model, and year selected via our fitment matcher. No drilling or dashboard trim damage is required."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "3. سياسة الضمان والاستبدال (سنة كاملة)" : "3. 1-Year Official Replacement Warranty"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تشمل جميع قواعد برو كليبس وماونت إكس ضمان استبدال رسمي لمدة عام كامل ضد أي عيب مصنعي أو كسر غير ناتج عن سوء استخدام."
                    : "All genuine ProClips and MountX assemblies are backed by our 1-year official replacement warranty against manufacturing flaws or structural failure."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "4. سياسة التوصيل والشحن لدول الخليج" : "4. Shipping & GCC Delivery"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "يتم توصيل الطلبات داخل قطر خلال 24 ساعة عبر مندوبي ثقة، ولدول الخليج (السعودية، الإمارات، الكويت، عمان، البحرين) خلال 2-4 أيام عمل عبر شركات الشحن السريع المعتمدة."
                    : "Orders inside Qatar are delivered within 24 hours. GCC express shipments (KSA, UAE, Kuwait, Oman, Bahrain) arrive within 2-4 business days via DHL Express."}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
