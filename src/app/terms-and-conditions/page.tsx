"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight, ShieldCheck, Scale, FileText } from "lucide-react";

export default function TermsPage() {
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
              {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </span>
          </nav>

          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6ed] text-[#9b7832] text-xs font-semibold mb-3 border border-[#c5a059]/30">
                <Scale size={14} />
                <span>{lang === "ar" ? "اللوائح القانونية المعتمدة" : "GCC E-Commerce Compliance"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                {lang === "ar" ? "الشروط والأحكام لمتجر ثقة" : "Terms & Conditions"}
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "آخر تحديث: سبتمبر 2026 • وزارة التجارة والصناعة، دولة قطر" : "Last updated: September 2026 • Ministry of Commerce & Industry, State of Qatar"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "1. مقدمة وتعريف بالخدمة" : "1. Introduction & Acceptance of Terms"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "مرحباً بكم في متجر ثقة الإلكتروني (المملوك والمدار بواسطة Gulf Digital Solution ذ.م.م، سجل تجاري رقم 159281، دولة قطر). تنظم هذه الشروط والأحكام استخدامكم للموقع وعمليات شراء حلول وقواعد التثبيت الأصلية."
                    : "Welcome to Thabt (operated by Gulf Digital Solution W.L.L, Commercial Registration No. 159281, Doha, Qatar). By accessing our platform or purchasing precision vehicle mounts, you agree to these legal terms."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "2. دقة التركيب والتوافق مع المركبات" : "2. Vehicle Fitment & Compatibility Guarantee"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تلتزم ثقة بتقديم قواعد تثبيت مطابقة 100% لموديل وسنة صنع السيارة المحددة من قبل العميل عند الطلب. نضمن عدم إحداث أي ثقوب أو تشويه لديكور لوحة القيادة الأصلية."
                    : "Thabt guarantees 100% vehicle compatibility when products are ordered according to the specific car make, model, and year selected via our fitment matcher. No drilling or dashboard trim damage is required."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "3. سياسة الضمان والاستبدال (سنة كاملة)" : "3. 1-Year Official Replacement Warranty"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تشمل جميع منتجات برو كليبس وماونت إكس الأصلية ضمان استبدال رسمي لمدة 365 يوماً من تاريخ الفاتورة ضد أي عيب مصنعي أو كسر ناتج عن المواد. يتم الاستبدال مباشرة في معارضنا أو عبر الشحن في دول الخليج."
                    : "All authentic ProClips and MountX components are backed by an official 365-day warranty covering material defects or mechanical failure under normal GCC operating conditions."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "4. سياسة الإرجاع والاسترجاع (14 يوماً)" : "4. 14-Day Returns & Exchange Policy"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "يحق للعميل إرجاع أو استبدال أي منتج غير مستخدم وبحالته وتغليفه الأصلي خلال 14 يوماً من استلام الشحنة وفقاً لقوانين حماية المستهلك المعمول بها في دولة قطر."
                    : "Customers may return or exchange unopened, uninstalled items in their original packaging within 14 calendar days of delivery in compliance with Qatar Consumer Protection laws."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "5. الشحن والتوصيل لدول مجلس التعاون" : "5. GCC Express Shipping & Logistics"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "يتم التوصيل داخل دولة قطر خلال 24 ساعة، ويتم الشحن إلى المملكة العربية السعودية، الإمارات، الكويت، البحرين، وعمان خلال 2 إلى 4 أيام عمل عبر شركاء الشحن المعتمدين (DHL Express / Aramex)."
                    : "Orders in Qatar are delivered within 24 hours. Cross-border GCC deliveries (Saudi Arabia, UAE, Kuwait, Bahrain, Oman) are handled via DHL Express and Aramex within 2 to 4 business days."}
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
