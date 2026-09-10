"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function ContactUsPage() {
  const { lang } = useAppContext();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", vehicle: "", message: "" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "تواصل معنا والمعارض" : "Contact & Showrooms"}
            </span>
          </nav>

          {/* Heading */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-3 py-1 rounded-full border border-[#c5a059]/30">
              {lang === "ar" ? "فريق خدمة العملاء والتركيب" : "Concierge & Fitment Experts"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 mt-3 mb-3">
              {lang === "ar" ? "معارض الدوحة وخدمة العملاء" : "Doha Showrooms & Customer Support"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {lang === "ar"
                ? "تفضل بزيارة معارضنا في الريان القديم وأم صلال لمعاينة قواعد برو كليبس وماونت إكس وتركيبها فورياً لسيارتك، أو تواصل مع فريقنا عبر واتساب."
                : "Visit our flagship Doha showrooms for free fitment consultation, or contact our dedicated WhatsApp concierge team across Qatar and the GCC."}
            </p>
          </div>

          {/* Showroom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Showroom 1: Old Rayan */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {lang === "ar" ? "الفرع الرئيسي والمستودع" : "Main Showroom & Hub"}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Doha Zone 52</span>
                </div>

                <h3 className="text-lg font-extrabold text-neutral-950">
                  {lang === "ar" ? "معرض الريان القديم" : "Old Rayan Showroom"}
                </h3>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>Unit 16, Building 419, Street 990, Zone 52 (Al Rayyan, Qatar)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={15} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م" : "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 4:00 PM - 10:00 PM"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-[#c5a059] shrink-0" />
                    <span dir="ltr" className="font-mono text-neutral-800 font-bold">+974 4483 2731</span>
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=25.2951,51.4502"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>{lang === "ar" ? "فتح الموقع في خرائط Google" : "Open in Google Maps"}</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Showroom 2: Umm Salal */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-3 py-1 rounded-full border border-[#c5a059]/30">
                    {lang === "ar" ? "فرع الشمال والخور" : "North Branch"}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Doha Zone 71</span>
                </div>

                <h3 className="text-lg font-extrabold text-neutral-950">
                  {lang === "ar" ? "معرض أم صلال محمد" : "Umm Salal Muhammed Showroom"}
                </h3>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>Unit 10, Building 191, Street 750, Zone 71 (Umm Salal, Qatar)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={15} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م" : "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 4:00 PM - 10:00 PM"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-[#c5a059] shrink-0" />
                    <span dir="ltr" className="font-mono text-neutral-800 font-bold">+974 4483 2731</span>
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=25.4050,51.4110"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>{lang === "ar" ? "فتح الموقع في خرائط Google" : "Open in Google Maps"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Form & WhatsApp Concierge Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-extrabold text-neutral-950 mb-1">
                {lang === "ar" ? "أرسل استفسارك لفريقنا" : "Send Us an Inquiry"}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                {lang === "ar"
                  ? "سنرد عليك خلال ساعات العمل عبر الواتساب أو البريد الإلكتروني."
                  : "We typically respond within 2 to 4 business hours."}
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-700 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950">
                    {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {lang === "ar"
                      ? "شكراً لتواصلك معنا. سيتواصل معك أحد أخصائيي التجهيز قريباً."
                      : "Thank you for reaching out. One of our fitment specialists will contact you shortly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-3 text-xs font-bold text-emerald-950 underline cursor-pointer"
                  >
                    {lang === "ar" ? "إرسال استفسار آخر" : "Send another inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "الاسم الكريم" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+974..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "نوع وموديل سيارتك" : "Vehicle Make & Year"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Land Cruiser LC300 2024"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      {lang === "ar" ? "تفاصيل الرسالة أو الاستفسار" : "Message or Inquiry"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === "ar" ? "كيف يمكننا مساعدتك بخصوص التثبيت أو الشحن..." : "How can our team assist you regarding fitment or delivery..."}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Send size={14} className="text-[#c5a059]" />
                    <span>{lang === "ar" ? "إرسال الاستفسار الآن" : "Submit Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct WhatsApp Concierge Card (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-bold">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-950">
                    {lang === "ar" ? "خدمة واتساب الفورية" : "WhatsApp Concierge"}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {lang === "ar"
                      ? "هل تحتاج لمساعدة فورية في اختيار القطعة المناسبة لطبلون سيارتك؟ تواصل مباشرة مع مهندس التجهيزات في الدوحة."
                      : "Chat directly with our fitment technicians. Send a photo of your dashboard and phone model for immediate guidance."}
                  </p>
                </div>

                <a
                  href="https://api.whatsapp.com/send?phone=97450400314"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>{lang === "ar" ? "بدء المحادثة (+974 5040 0314)" : "Start Chat (+974 5040 0314)"}</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-3 text-xs">
                <h4 className="font-bold text-neutral-900">{lang === "ar" ? "معلومات التواصل الرسمية:" : "Official Contact Info:"}</h4>
                <p className="text-neutral-500">Thabt (Gulf Digital Solution W.L.L)</p>
                <p className="text-neutral-700">Email: info@thabt.qa</p>
                <p className="text-neutral-700">CR No. 159281 (Ministry of Commerce & Industry, Qatar)</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
