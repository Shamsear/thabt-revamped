"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight, Shield, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </span>
          </nav>

          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6ed] text-[#9b7832] text-xs font-semibold mb-3 border border-[#c5a059]/30">
                <Shield size={14} />
                <span>{lang === "ar" ? "حماية خصوصية بيانات العملاء" : "Customer Data Protection"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                {lang === "ar" ? "سياسة الخصوصية وأمان البيانات" : "Privacy Policy & Data Security"}
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "معتمد طبقاً لقانون حماية البيانات الشخصية في دولة قطر" : "Compliant with Qatar Personal Data Privacy Protection Law (PDPPL)"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "1. البيانات التي نجمعها" : "1. Personal Information We Collect"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "نجمع المعلومات اللازمة فقط لمعالجة وتوصيل طلباتك، مثل: الاسم، رقم الهاتف، عنوان التوصيل في قطر (رقم المنطقة، الشارع، المبنى) أو عنوان الشحن في الخليج، والبريد الإلكتروني لإرسال الفاتورة وتتبع الشحنة."
                    : "We collect only the minimum required information to fulfill and deliver your orders, including full name, contact phone number, shipping address (such as Qatar Blue Plate details), and email for invoice receipts."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "2. أمان المعاملات المالية" : "2. Payment Security & Encryption"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "لا نقوم بتخزين أي أرقام بطاقات ائتمانية أو رموز CVV على خوادمنا. تتم جميع المعالجات المالية بتشفير 256-bit SSL القياسي البنكي عبر بوابات دفع معتمدة من مصرف قطر المركزي."
                    : "No full credit card numbers or security CVV codes are stored on our servers. All financial transactions utilize standard bank-grade 256-bit SSL encryption via authorized payment providers."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-neutral-950">
                  {lang === "ar" ? "3. عدم مشاركة البيانات مع أطراف خارجية" : "3. Zero Third-Party Selling"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "نلتزم بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف تسويقية خارجية. يتم مشاركة عنوانك ورقم هاتفك فقط مع شركة الشحن المعتمدة لتسليم الطرد لك."
                    : "We strictly never sell or trade your personal data. Customer contact information is solely shared with our licensed couriers (DHL/Aramex) for the express purpose of package delivery."}
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
