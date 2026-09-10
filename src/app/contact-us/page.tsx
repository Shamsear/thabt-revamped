"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  MapPin,
  Phone,
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
    inquiryType: "fitment",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", vehicle: "", inquiryType: "fitment", message: "" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "تواصل معنا والمعارض" : "Contact & Showrooms"}
            </span>
          </nav>

          {/* Heading */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
              {lang === "ar" ? "فريق خدمة العملاء والتركيب" : "Customer Support & Fitment"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-3">
              {lang === "ar" ? "معارض الدوحة و " : "Doha Showrooms & "}
              <span className="font-semibold text-neutral-950">{lang === "ar" ? "خدمة العملاء" : "Support"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {lang === "ar"
                ? "تفضل بزيارة معارضنا في الريان القديم وأم صلال لمعاينة قواعد برو كليبس وماونت إكس وتركيبها فورياً لسيارتك، أو تواصل مع فريقنا عبر واتساب."
                : "Visit our flagship Doha showrooms for free fitment consultation, or contact our dedicated WhatsApp concierge team across Qatar and the GCC."}
            </p>
          </div>

          {/* Showroom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Showroom 1: Old Rayan */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    {lang === "ar" ? "الفرع الرئيسي والمستودع" : "Main Hub"}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Zone 52</span>
                </div>

                <h3 className="text-base font-semibold text-neutral-950">
                  {lang === "ar" ? "معرض الريان القديم" : "Old Rayan Showroom"}
                </h3>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>Unit 16, Building 419, Street 990, Zone 52 (Al Rayyan, Qatar)</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock size={15} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م" : "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 4:00 PM - 10:00 PM"}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone size={15} className="text-[#c5a059] shrink-0" />
                    <span dir="ltr" className="font-mono text-neutral-900 font-semibold">+974 4483 2731</span>
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=25.2951,51.4502"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{lang === "ar" ? "فتح الموقع في خرائط Google" : "Open in Google Maps"}</span>
                <ExternalLink size={13} className="text-[#c5a059]" />
              </a>
            </div>

            {/* Showroom 2: Umm Salal */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    {lang === "ar" ? "فرع الشمال والخور" : "North Branch"}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Zone 71</span>
                </div>

                <h3 className="text-base font-semibold text-neutral-950">
                  {lang === "ar" ? "معرض أم صلال محمد" : "Umm Salal Muhammed Showroom"}
                </h3>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>Unit 10, Building 191, Street 750, Zone 71 (Umm Salal, Qatar)</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock size={15} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "السبت - الخميس: 9:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م" : "Sat - Thu: 9:00 AM - 10:00 PM | Fri: 4:00 PM - 10:00 PM"}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone size={15} className="text-[#c5a059] shrink-0" />
                    <span dir="ltr" className="font-mono text-neutral-900 font-semibold">+974 4483 2731</span>
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=25.4050,51.4110"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{lang === "ar" ? "فتح الموقع في خرائط Google" : "Open in Google Maps"}</span>
                <ExternalLink size={13} className="text-[#c5a059]" />
              </a>
            </div>
          </div>

          {/* Form & WhatsApp Concierge Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8">
              <h3 className="text-base font-semibold text-neutral-950 mb-1">
                {lang === "ar" ? "أرسل استفسارك لفريقنا الفني" : "Send Us an Inquiry"}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                {lang === "ar"
                  ? "سنرد عليك خلال ساعات العمل عبر الواتساب أو البريد الإلكتروني."
                  : "We typically respond within 2 to 4 business hours."}
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#faf6ed]/60 border border-[#c5a059]/30 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-[#9b7832] mx-auto" />
                  <h4 className="text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {lang === "ar"
                      ? "شكراً لتواصلك معنا. سيتواصل معك أحد أخصائيي التجهيز قريباً."
                      : "Thank you for reaching out. One of our fitment specialists will contact you shortly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-3 text-xs font-semibold text-[#9b7832] hover:underline cursor-pointer"
                  >
                    {lang === "ar" ? "إرسال استفسار آخر" : "Send another inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "الاسم الكريم" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+974..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "نوع وموديل سيارتك" : "Vehicle Make & Year"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Land Cruiser LC300 2024"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "نوع الاستفسار أو الخدمة المطلوبة" : "Inquiry Subject & Service"}
                      value={formData.inquiryType}
                      onChange={(val) => setFormData({ ...formData, inquiryType: val })}
                      options={[
                        {
                          value: "fitment",
                          label: lang === "ar" ? "استشارة توافق وتجهيز طبلون السيارة" : "Vehicle Fitment & Dashboard Consultation",
                        },
                        {
                          value: "installation",
                          label: lang === "ar" ? "حجز موعد تركيب بالمعرض (الريان القديم / أم صلال)" : "Showroom Fitting Appointment",
                        },
                        {
                          value: "order",
                          label: lang === "ar" ? "متابعة شحنة وطلب متجر إلكتروني" : "Online Order & Express Shipping Tracking",
                        },
                        {
                          value: "fleet",
                          label: lang === "ar" ? "تجهيز أساطيل وطلبات الشركات" : "Corporate & Fleet Solutions",
                        },
                        {
                          value: "warranty",
                          label: lang === "ar" ? "الضمان والاستبدال الفوري" : "Warranty & Technical Support",
                        },
                      ]}
                      lang={lang}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      {lang === "ar" ? "تفاصيل الرسالة أو الاستفسار" : "Message or Inquiry"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === "ar" ? "كيف يمكننا مساعدتك بخصوص التثبيت أو الشحن..." : "How can our team assist you regarding fitment or delivery..."}
                      className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send size={14} className="text-[#c5a059]" />
                    <span>{lang === "ar" ? "إرسال الاستفسار الآن" : "Submit Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct WhatsApp Concierge Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-bold">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-950">
                    {lang === "ar" ? "خدمة واتساب الفورية" : "WhatsApp Concierge"}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {lang === "ar"
                      ? "هل تحتاج لمساعدة فورية في اختيار القطعة المناسبة لطبلون سيارتك؟ تواصل مباشرة مع مهندس التجهيزات في الدوحة."
                      : "Chat directly with our fitment technicians. Send a photo of your dashboard and phone model for immediate guidance."}
                  </p>
                </div>

                <a
                  href="https://api.whatsapp.com/send?phone=97450400314"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>{lang === "ar" ? "بدء المحادثة (+974 5040 0314)" : "Start Chat (+974 5040 0314)"}</span>
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-2 text-xs">
                <h4 className="font-semibold text-neutral-950 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                  {lang === "ar" ? "معلومات الشركة الرسمية:" : "Official Company Credentials:"}
                </h4>
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
