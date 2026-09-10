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
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
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
              {lang === "ar" ? "الوظائف وبيئة العمل" : "Careers at Thabt"}
            </span>
          </nav>

          {/* Great Place to Work #4 Qatar Award Banner */}
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-3xl p-8 sm:p-12 mb-14 relative overflow-hidden border border-neutral-800 shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#c5a059]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 text-xs font-bold">
                  <Award size={15} />
                  <span>Great Place to Work® Qatar 2026</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                  {lang === "ar"
                    ? "المركز الرابع كأفضل بيئة عمل في دولة قطر لعام 2026"
                    : "Ranked #4 Best Workplace in Qatar for 2026"}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  {lang === "ar"
                    ? "نفتخر بحصول شركة ثقة (Gulf Digital Solution) على اعتماد بيئات العمل العالمية كواحدة من أفضل الشركات في قطر. نؤمن بأن شغف فريقنا بالابتكار ودقة الهندسة هو سر تميزنا."
                    : "Proudly certified by the global Great Place to Work® authority as the #4 best workplace in the State of Qatar. We cultivate a culture of trust, precision, and continuous empowerment."}
                </p>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col items-center justify-center text-center shadow-lg">
                  <span className="text-3xl sm:text-4xl font-black text-[#c5a059]">#4</span>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mt-1">Qatar Best Workplaces</p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1">2026 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Culture Values Pillars */}
          <div className="mb-14">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 mb-2">
                {lang === "ar" ? "ثقافة العمل في ثقة" : "Life & Culture at Thabt"}
              </h2>
              <p className="text-xs text-neutral-500">
                {lang === "ar" ? "الركائز الأساسية التي تقود فريقنا كل يوم" : "The values that shape how we work, grow, and build together"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#9b7832] flex items-center justify-center font-bold">
                  <Zap size={20} />
                </div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {lang === "ar" ? "الدقة والكمال الهندسي" : "Precision & Perfection"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === "ar"
                    ? "نلتزم بمعايير صارمة في كل قطعة وتجهيز سيارة نقدمه لعملائنا."
                    : "Zero compromise on quality. Every mount must fit seamlessly and endure desert conditions."}
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {lang === "ar" ? "فريق عمل متماسك وداعم" : "Empowered Team"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === "ar"
                    ? "بيئة عمل تشجع على التعلم المستمر، المبادرة الفردية، وتكريم المتميزين."
                    : "We invest in training, professional development, and career pathways for all team members."}
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Heart size={20} />
                </div>
                <h3 className="text-sm font-bold text-neutral-900">
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
                <h2 className="text-xl font-extrabold text-neutral-950">
                  {lang === "ar" ? "الوظائف المتاحة حالياً" : "Current Open Roles"}
                </h2>
                <p className="text-xs text-neutral-500">
                  {lang === "ar" ? "انضم لفريقنا في الدوحة وساهم في نجاحنا" : "Join our team in Doha and accelerate your automotive career"}
                </p>
              </div>
              <span className="text-xs font-bold text-[#9b7832] bg-[#faf6ed] px-3 py-1 rounded-full border border-[#c5a059]/30">
                {MOCK_JOBS.length} {lang === "ar" ? "وظائف مفتوحة" : "Positions Open"}
              </span>
            </div>

            <div className="space-y-4">
              {MOCK_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-7 shadow-xs hover:border-[#c5a059] transition flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                        {job.department}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <MapPin size={13} className="text-[#c5a059]" /> {job.location}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock size={13} className="text-[#c5a059]" /> {job.type}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-neutral-950">
                      {lang === "ar" ? job.title_ar : job.title}
                    </h3>

                    <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                      {lang === "ar" ? job.description_ar : job.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="py-3 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shrink-0 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>{lang === "ar" ? "التقديم على الوظيفة" : "Apply for Role"}</span>
                    <ArrowRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md">
                  {selectedJob.department}
                </span>
                <h3 className="text-base font-bold text-neutral-950 mt-1">
                  {lang === "ar" ? selectedJob.title_ar : selectedJob.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {applySuccess ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle2 size={36} className="text-emerald-700 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">
                  {lang === "ar" ? "تم إرسال طلب التوظيف بنجاح!" : "Application Submitted!"}
                </h4>
                <p className="text-xs text-emerald-800">
                  {lang === "ar" ? "شكراً لاهتمامك بالانضمام لثقة. سنتواصل معك عبر الهاتف أو الإيميل." : "Thank you for your application. Our recruitment team will review and contact you."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                    {lang === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                      {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                      {lang === "ar" ? "رقم الهاتف" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+974..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <CustomSelect
                      label={lang === "ar" ? "مقر العمل المفضل" : "Preferred Work Location"}
                      value={preferredLocation}
                      onChange={(val) => setPreferredLocation(val)}
                      options={[
                        { value: "Salwa Road HQ, Doha", label: lang === "ar" ? "المقر الرئيسي - طريق سلوى، الدوحة" : "Salwa Road HQ, Doha" },
                        { value: "Umm Salal Muhammed Branch", label: lang === "ar" ? "فرع أم صلال محمد، الدوحة" : "Umm Salal Muhammed Showroom" },
                        { value: "Logistics & Fulfillment Center", label: lang === "ar" ? "مركز التجهيز والشحن اللوجستي" : "Logistics & Fulfillment Center" },
                        { value: "Hybrid / Remote GCC", label: lang === "ar" ? "عمل عن بعد / هجين بالخليج" : "Remote / Hybrid (GCC)" },
                      ]}
                      lang={lang}
                    />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">
                    {lang === "ar" ? "نبذة عن خبرتك أو رابط لينكد إن" : "LinkedIn Profile or Summary"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={lang === "ar" ? "اكتب نبذة مختصرة عن مؤهلاتك..." : "Share a brief summary of your background..."}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
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
