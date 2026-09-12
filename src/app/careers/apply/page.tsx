"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  Briefcase,
  ChevronRight,
  Send,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  FileText,
  Link2,
} from "lucide-react";

function CareersApplyForm() {
  const { lang } = useAppContext();
  const searchParams = useSearchParams();
  const initialJobId = searchParams.get("job") || "fitment-technician";

  const [selectedRole, setSelectedRole] = useState(initialJobId);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "+974",
    phone: "",
    experienceYears: "3-5",
    portfolioUrl: "",
    notes: "",
    fileName: "",
  });

  const jobOptions = [
    {
      value: "fitment-technician",
      label: lang === "ar" ? "أخصائي وفني أول تجهيز وتركيب سيارات" : "Senior Automotive Fitment Specialist",
    },
    {
      value: "ecommerce-specialist",
      label: lang === "ar" ? "منسق التجارة الإلكترونية والشحن لدول الخليج" : "GCC E-Commerce & Logistics Coordinator",
    },
    {
      value: "customer-concierge",
      label: lang === "ar" ? "أخصائي استشارات التجهيز وخدمة العملاء (واتساب)" : "WhatsApp Fitment Concierge & Support",
    },
    {
      value: "general",
      label: lang === "ar" ? "طلب توظيف عام (كافة التخصصات)" : "General Application (All Disciplines)",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
        <Link href="/" className="hover:text-neutral-900 transition">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
        <Link href="/careers" className="hover:text-neutral-900 transition">
          {lang === "ar" ? "الوظائف" : "Careers"}
        </Link>
        <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
        <span className="text-neutral-900 font-medium">
          {lang === "ar" ? "نموذج التقديم" : "Application Form"}
        </span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
          {lang === "ar" ? "بوابة التوظيف الرسمية" : "Thabt Talent Portal"}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 mb-2">
          {lang === "ar" ? "تقديم طلب " : "Apply for a Position at "}
          <span className="font-semibold text-neutral-950">Thabt</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          {lang === "ar"
            ? "يرجى تعبئة البيانات وإرفاق سيرتك الذاتية (PDF). سنتواصل معك خلال 48 ساعة."
            : "Complete the form below and attach your CV (PDF/Doc). Our HR team will review your application."}
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#faf6ed] text-[#c5a059] flex items-center justify-center mx-auto border border-[#c5a059]/30">
            <CheckCircle2 size={32} className="stroke-[2.2]" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-950">
            {lang === "ar" ? "تم استلام طلب التوظيف بنجاح!" : "Application Received Successfully!"}
          </h3>
          <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
            {lang === "ar"
              ? "شكراً لاهتمامك بالانضمام إلى فريق ثقة. سيقوم فريق الموارد البشرية بمراجعة ملفك والتواصل معك عبر البريد الإلكتروني أو الهاتف."
              : "Thank you for your interest in joining Thabt. Our recruitment team will review your portfolio and reach out via email or phone."}
          </p>
          <div className="pt-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold transition cursor-pointer"
            >
              <span>{lang === "ar" ? "العودة لصفحة الوظائف" : "Back to Careers"}</span>
              <ArrowRight size={13} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
          {/* Target Role Selector */}
          <div>
            <CustomSelect
              label={lang === "ar" ? "الوظيفة المتقدم لها" : "Position Applied For"}
              value={selectedRole}
              onChange={(val) => setSelectedRole(val)}
              options={jobOptions}
              lang={lang}
            />
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-700 font-medium mb-1.5">
                {lang === "ar" ? "الاسم الكامل" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={lang === "ar" ? "مثال: جاسم الكواري" : "e.g. Jassim Al-Kuwari"}
                className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200 rounded-xl px-3.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-700 font-medium mb-1.5">
                {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200 rounded-xl px-3.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Phone & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-700 font-medium mb-1.5">
                {lang === "ar" ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
              </label>
              <div className="flex gap-2">
                <div className="w-28 shrink-0">
                  <CustomSelect
                    value={formData.phoneCode}
                    onChange={(val) => setFormData({ ...formData, phoneCode: val })}
                    options={[
                      { value: "+974", label: "🇶🇦 +974" },
                      { value: "+966", label: "🇸🇦 +966" },
                      { value: "+971", label: "🇦🇪 +971" },
                      { value: "+965", label: "🇰🇼 +965" },
                      { value: "+973", label: "🇧🇭 +973" },
                      { value: "+968", label: "🇴🇲 +968" },
                    ]}
                    lang={lang}
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="5500 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 min-w-0 h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200 rounded-xl px-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <CustomSelect
                label={lang === "ar" ? "سنوات الخبرة العملية" : "Years of Experience"}
                value={formData.experienceYears}
                onChange={(val) => setFormData({ ...formData, experienceYears: val })}
                options={[
                  { value: "0-1", label: lang === "ar" ? "أقل من سنة (خريج جديد)" : "Less than 1 year (Fresh Graduate)" },
                  { value: "1-3", label: lang === "ar" ? "1 - 3 سنوات" : "1 - 3 years" },
                  { value: "3-5", label: lang === "ar" ? "3 - 5 سنوات" : "3 - 5 years" },
                  { value: "5+", label: lang === "ar" ? "أكثر من 5 سنوات" : "5+ years (Senior / Lead)" },
                ]}
                lang={lang}
              />
            </div>
          </div>

          {/* CV / Resume Upload Dropzone */}
          <div>
            <label className="block text-xs text-neutral-700 font-medium mb-1.5">
              {lang === "ar" ? "السيرة الذاتية (CV / Resume)" : "CV / Resume Document"}
            </label>
            <label className="relative border-2 border-dashed border-neutral-300 hover:border-neutral-900 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-neutral-50">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#c5a059] mb-2 shadow-2xs">
                {formData.fileName ? <FileText size={18} /> : <UploadCloud size={18} />}
              </div>
              {formData.fileName ? (
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-neutral-900 font-mono">{formData.fileName}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">{lang === "ar" ? "تم تحديد الملف بنجاح" : "File selected successfully"}</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-neutral-800">
                    {lang === "ar" ? "اضغط لرفع السيرة الذاتية" : "Click or drag to upload your CV"}
                  </p>
                  <p className="text-[10px] text-neutral-400">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>

          {/* Portfolio or LinkedIn Link */}
          <div>
            <label className="block text-xs text-neutral-700 font-medium mb-1.5">
              {lang === "ar" ? "رابط الملف المهني (LinkedIn أو معرض الأعمال)" : "LinkedIn or Portfolio URL (Optional)"}
            </label>
            <div className="relative flex items-center">
              <Link2 size={14} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200 rounded-xl pl-9 pr-3.5 rtl:pl-3.5 rtl:pr-9 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-neutral-700 font-medium mb-1.5">
              {lang === "ar" ? "رسالة تعريفية أو ملاحظات إضافية" : "Cover Note / Introduction"}
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={lang === "ar" ? "أخبرنا باختصار عن شغفك بالسيارات وخبرتك..." : "Briefly introduce yourself and your automotive experience..."}
              className="w-full bg-neutral-50/70 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Send size={14} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "إرسال طلب التوظيف" : "Submit Application"}</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default function CareersApplyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-14">
        <Suspense fallback={<div className="text-center py-20 text-xs text-neutral-400">Loading form...</div>}>
          <CareersApplyForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
