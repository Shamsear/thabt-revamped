"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { MOCK_JOBS, JobOpening } from "@/data/mockData";
import {
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Users,
  Heart,
  Zap,
  X,
  Send,
} from "lucide-react";

export default function CareersPage() {
  const { lang } = useAppContext();

  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [preferredLocation, setPreferredLocation] = useState("Salwa Road HQ, Doha");
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
    }, 2500);
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
              {lang === "ar" ? "الوظائف وبيئة العمل" : "Careers at Thabt"}
            </span>
          </nav>

          {/* Great Place to Work Award Minimal Banner */}
          <div className="bg-neutral-950 text-white rounded-2xl p-8 sm:p-10 mb-14 border border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 text-xs font-semibold">
                  <Award size={14} />
                  <span>Great Place to Work® Qatar 2026</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-light tracking-tight leading-snug">
                  {lang === "ar" ? (
                    <>المركز الرابع كأفضل <span className="font-semibold text-[#c5a059]">بيئة عمل في قطر</span> لعام 2026</>
                  ) : (
                    <>Ranked #4 Best <span className="font-semibold text-[#c5a059]">Workplace in Qatar</span> for 2026</>
                  )}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                  {lang === "ar"
                    ? "نفتخر بحصول شركة ثقة (Gulf Digital Solution) على اعتماد بيئات العمل العالمية كواحدة من أفضل الشركات في قطر. نؤمن بأن شغف فريقنا بالابتكار ودقة الهندسة هو سر تميزنا."
                    : "Proudly certified by the global Great Place to Work® authority as the #4 best workplace in the State of Qatar. We cultivate a culture of trust, precision, and continuous empowerment."}
                </p>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-neutral-900 border border-neutral-800 p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-bold text-[#c5a059]">#4</span>
                  <p className="text-[11px] font-semibold text-white uppercase tracking-wider mt-1">Qatar Best</p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-0.5">2026 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Culture Values Pillars */}
          <div className="mb-14">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "قيمنا ومبادئنا" : "Our Core Values"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 mb-2">
                {lang === "ar" ? "ثقافة العمل في " : "Culture & Values at "}
                <span className="font-semibold text-neutral-950">Thabt</span>
              </h2>
              <p className="text-xs text-neutral-500">
                {lang === "ar" ? "الركائز الأساسية التي تقود فريقنا كل يوم لتقديم الأفضل لعملائنا في الخليج" : "The values that shape how we work, grow, and build together"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Zap size={18} className="text-[#c5a059]" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "الدقة والكمال الهندسي" : "Precision & Perfection"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === "ar"
                    ? "نلتزم بمعايير صارمة في كل قطعة وتجهيز سيارة نقدمه لعملائنا بدون أي مجال للخطأ."
                    : "Zero compromise on quality. Every mount must fit seamlessly and endure desert conditions."}
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Users size={18} className="text-[#c5a059]" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "فريق عمل متماسك وداعم" : "Empowered Team"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === "ar"
                    ? "بيئة عمل تشجع على التعلم المستمر، المبادرة الفردية، وتكريم المتميزين."
                    : "We invest in training, professional development, and career pathways for all team members."}
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Heart size={18} className="text-[#c5a059]" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "شغف بخدمة العميل" : "Customer Obsession"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === "ar"
                    ? "هدفنا هو إسعاد ملاك السيارات بحلول مبتكرة تحافظ على جمال سياراتهم."
                    : "We treat every customer's vehicle as our own, delivering care and authentic support."}
                </p>
              </div>
            </div>
          </div>

          {/* Open Roles Listing */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-neutral-950">
                  {lang === "ar" ? "الوظائف المتاحة حالياً" : "Current Open Roles"}
                </h2>
                <p className="text-xs text-neutral-500">
                  {lang === "ar" ? "انضم لفريقنا في الدوحة وساهم في ابتكار تجربة القيادة" : "Join our team in Doha and accelerate your automotive career"}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#9b7832] bg-[#faf6ed] px-3 py-1 rounded-full border border-[#c5a059]/30">
                {MOCK_JOBS.length} {lang === "ar" ? "وظائف مفتوحة" : "Open Positions"}
              </span>
            </div>

            <div className="space-y-4">
              {MOCK_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-neutral-950 bg-neutral-100 px-2.5 py-0.5 rounded-md text-[11px]">
                        {job.department}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <MapPin size={13} className="text-[#c5a059]" /> {job.location}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock size={13} className="text-[#c5a059]" /> {job.type}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-neutral-950">
                      {lang === "ar" ? job.title_ar : job.title}
                    </h3>

                    <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
                      {lang === "ar" ? job.description_ar : job.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{lang === "ar" ? "التقديم على الوظيفة" : "Apply for Role"}</span>
                    <ArrowRight size={13} className="rtl:rotate-180" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-neutral-200 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md">
                  {selectedJob.department}
                </span>
                <h3 className="text-base font-semibold text-neutral-950 mt-1">
                  {lang === "ar" ? selectedJob.title_ar : selectedJob.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer transition"
              >
                <X size={15} />
              </button>
            </div>

            {applySuccess ? (
              <div className="text-center py-8 space-y-2 bg-[#faf6ed]/60 rounded-xl border border-[#c5a059]/30 p-6">
                <CheckCircle2 size={32} className="text-[#9b7832] mx-auto" />
                <h4 className="text-sm font-semibold text-neutral-950">
                  {lang === "ar" ? "تم إرسال طلب التوظيف بنجاح!" : "Application Submitted!"}
                </h4>
                <p className="text-xs text-neutral-600">
                  {lang === "ar" ? "شكراً لاهتمامك بالانضمام لثقة. سنتواصل معك قريباً." : "Thank you for your application. Our team will review and contact you."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                    {lang === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      {lang === "ar" ? "رقم الهاتف" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+974..."
                      className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <CustomSelect
                    label={lang === "ar" ? "مقر العمل المفضل" : "Preferred Work Location"}
                    value={preferredLocation}
                    onChange={(val) => setPreferredLocation(val)}
                    options={[
                      { value: "Salwa Road HQ, Doha", label: lang === "ar" ? "المقر الرئيسي - الريان القديم، الدوحة" : "Old Rayan Showroom & HQ, Doha" },
                      { value: "Umm Salal Muhammed Branch", label: lang === "ar" ? "فرع أم صلال محمد، الدوحة" : "Umm Salal Muhammed Showroom" },
                      { value: "Logistics & Fulfillment Center", label: lang === "ar" ? "مركز التجهيز والشحن اللوجستي" : "Logistics & Fulfillment Center" },
                      { value: "Hybrid / Remote GCC", label: lang === "ar" ? "عمل عن بعد / هجين بالخليج" : "Remote / Hybrid (GCC)" },
                    ]}
                    lang={lang}
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                    {lang === "ar" ? "نبذة عن خبرتك أو رابط لينكد إن" : "LinkedIn Profile or Summary"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={lang === "ar" ? "اكتب نبذة مختصرة عن مؤهلاتك..." : "Share a brief summary of your background..."}
                    className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send size={14} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "إرسال طلب التقديم" : "Submit Application"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
