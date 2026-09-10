"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </span>
          </nav>

          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-10 space-y-8">
            <div className="border-b border-neutral-100 pb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "حماية البيانات" : "Data Protection"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                {lang === "ar" ? "سياسة الخصوصية وأمان " : "Privacy Policy & "}
                <span className="font-semibold text-neutral-950">{lang === "ar" ? "البيانات" : "Data Security"}</span>
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                {lang === "ar" ? "معتمد طبقاً لقانون حماية البيانات الشخصية في دولة قطر" : "Compliant with Qatar Personal Data Privacy Protection Law (PDPPL)"}
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "1. البيانات التي نجمعها" : "1. Personal Information We Collect"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "نجمع المعلومات اللازمة فقط لمعالجة وتوصيل طلباتك، مثل: الاسم، رقم الهاتف، عنوان التوصيل في قطر (رقم المنطقة، الشارع، المبنى) أو عنوان الشحن في الخليج، والبريد الإلكتروني لإرسال الفاتورة وتتبع الشحنة."
                    : "We collect only the minimum required information to fulfill and deliver your orders, including full name, contact phone number, shipping address (such as Qatar Blue Plate details), and email for invoice receipts."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "2. أمان المعاملات المالية" : "2. Payment Security & Encryption"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "لا نقوم بتخزين أو الاحتفاظ بأي أرقام بطاقات ائتمانية على خوادمنا. تتم جميع عمليات الدفع عبر بوابات مشفرة متوافقة مع معايير PCI-DSS العالمية."
                    : "We do not store or process sensitive credit card numbers directly. All transactions are securely routed through certified payment gateways complying with international PCI-DSS protocols."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "3. سرية معلومات العميل" : "3. Non-Disclosure & Third Parties"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "نحن لا نبيع أو نؤجر أي بيانات شخصية لأطراف ثالثة لأغراض دعائية. يتم مشاركة معلومات العنوان ورقم الهاتف فقط مع شركات الشحن والتوصيل لإتمام وصول الطلب إليك."
                    : "We never sell or rent your personal information to third parties. Customer contact details are strictly shared with certified logistics partners solely for package dispatch and fitment concierge."}
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
