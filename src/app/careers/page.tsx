"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  staggerContainerVariants,
  fadeUpItemVariants,
  viewportOnce,
} from "@/utils/animations";
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Users,
  Send,
} from "lucide-react";

export default function CareersPage() {
  const { lang } = useAppContext();

  const jobs = [
    {
      id: "fitment-technician",
      title: "Senior Automotive Fitment Specialist",
      title_ar: "أخصائي وفني أول تجهيز وتركيب سيارات",
      dept: "Showroom & Operations",
      dept_ar: "المعارض والتجهيز الفني",
      location: "Doha, Qatar (Al Rayyan)",
      type: "Full-Time",
      type_ar: "دوام كامل",
      desc: "Lead vehicle cockpit fitment consultations, perform precision tool-free ProClips and MountX assemblies inside luxury SUVs, and deliver exceptional concierge customer service.",
      desc_ar: "قيادة استشارات تجهيز مقصورة السيارات الفاخرة والدفع الرباعي، وتركيب قواعد برو كليبس وماونت إكس بدون حفر مع تقديم خدمة عملاء استشارية راقية.",
    },
    {
      id: "ecommerce-specialist",
      title: "GCC E-Commerce & Logistics Coordinator",
      title_ar: "منسق التجارة الإلكترونية والشحن لدول الخليج",
      dept: "Operations & Fulfillment",
      dept_ar: "العمليات واللوجستيات",
      location: "Doha, Qatar",
      type: "Full-Time",
      type_ar: "دوام كامل",
      desc: "Manage order fulfillment pipelines, oversee DHL express dispatches across GCC territories (KSA, UAE, Kuwait, Bahrain, Oman), and maintain 100% SKU inventory accuracy.",
      desc_ar: "إدارة ومتابعة شحنات المتجر الإلكتروني السريعة عبر DHL لكافة دول الخليج ومطابقة المخزون والتجهيز الفوري.",
    },
    {
      id: "customer-concierge",
      title: "WhatsApp Fitment Concierge & Support",
      title_ar: "أخصائي استشارات التجهيز وخدمة العملاء (واتساب)",
      dept: "Customer Experience",
      dept_ar: "تجربة العملاء والدعم",
      location: "Doha, Qatar / Hybrid",
      type: "Full-Time",
      type_ar: "دوام كامل",
      desc: "Provide instantaneous, technical dashboard pairing advice to automotive enthusiasts and high-net-worth clients via live WhatsApp channels.",
      desc_ar: "تقديم الاستشارات الهندسية الفورية للعملاء عبر واتساب لمطابقة طبلون سياراتهم ونوع هواتفهم بأعلى معايير اللباقة والسرعة.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
          {/* Hero Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainerVariants}
          >
            {/* Breadcrumb */}
            <motion.nav variants={fadeUpItemVariants} className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
              <Link href="/" className="hover:text-neutral-900 transition">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
              <span className="text-neutral-900 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                {lang === "ar" ? "الوظائف وبيئة العمل" : "Careers & Culture"}
              </span>
            </motion.nav>

            {/* Hero Section */}
            <motion.div variants={fadeUpItemVariants} className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "انضم إلى فريق التميز الهندسي" : "Work with Thabt"}
              </span>
              <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-3">
                {lang === "ar" ? "اصنع مستقبلك مع " : "Build Your Career at "}
                <span className="font-semibold text-neutral-950">Thabt</span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
                {lang === "ar"
                  ? "نحن نبحث عن الكفاءات الشغوفة بالسيارات والتكنولوجيا لتقديم أرقى حلول التثبيت الميكانيكي وتجربة العملاء في قطر والخليج."
                  : "Join a fast-growing luxury automotive accessories brand delivering Swedish precision mounting solutions across the GCC."}
              </p>
            </motion.div>
          </motion.div>

          {/* Culture / Perks Grid - Independent Scroll Observer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <motion.div variants={fadeUpItemVariants} className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#c5a059] flex items-center justify-center font-bold">
                <Sparkles size={18} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-950">
                {lang === "ar" ? "بيئة عمل حديثة ومبتكرة" : "Premium Automotive Culture"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === "ar"
                  ? "العمل مع أحدث سيارات الدفع الرباعي الفارهة وتجهيزات قمرات القيادة الأكثر تطوراً."
                  : "Direct engagement with flagship SUV platforms, desert cruisers, and cutting-edge mobile gear."}
              </p>
            </motion.div>

            <motion.div variants={fadeUpItemVariants} className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#c5a059] flex items-center justify-center font-bold">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-950">
                {lang === "ar" ? "مزايا وحوافز تنافسية" : "Competitive GCC Package"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === "ar"
                  ? "رواتب مجزية، تأمين صحي شامل، ومكافآت أداء دورية في قلب الدوحة."
                  : "Attractive tax-free compensation, comprehensive health insurance, and performance bonuses in Doha."}
              </p>
            </motion.div>

            <motion.div variants={fadeUpItemVariants} className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#c5a059] flex items-center justify-center font-bold">
                <Users size={18} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-950">
                {lang === "ar" ? "تطوير مهني مستمر" : "Rapid Growth & Upskilling"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === "ar"
                  ? "تدريب عملي على الهندسة الميكانيكية للسيارات وإدارة التجارة الإلكترونية وسلاسل الإمداد."
                  : "Continuous training on automotive engineering standards, operations, and leadership pathways."}
              </p>
            </motion.div>
          </motion.div>

          {/* Open Roles Section - Independent Scroll Observer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainerVariants}
            className="space-y-4"
          >
            <motion.div variants={fadeUpItemVariants} className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-950">
                {lang === "ar" ? "الشواغر المتاحة حالياً" : "Current Open Positions"}
              </h2>
              <span className="text-xs font-mono font-semibold text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-full border border-[#c5a059]/30">
                {jobs.length} {lang === "ar" ? "وظائف" : "Roles Open"}
              </span>
            </motion.div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeUpItemVariants}
                  className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-5 sm:p-7 transition-all duration-300 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#c5a059]/30">
                        {lang === "ar" ? job.dept_ar : job.dept}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {lang === "ar" ? job.type_ar : job.type}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-neutral-950">
                      {lang === "ar" ? job.title_ar : job.title}
                    </h3>

                    <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl">
                      {lang === "ar" ? job.desc_ar : job.desc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#c5a059]" />
                        <span>{job.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    <Link
                      href={`/careers/apply?job=${job.id}`}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs transition-colors cursor-pointer w-full sm:w-auto shadow-xs"
                    >
                      <span>{lang === "ar" ? "التقديم على الوظيفة" : "Apply for Position"}</span>
                      <ArrowRight size={13} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* General Application Callout - Independent Scroll Observer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUpItemVariants}
            className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-3"
          >
            <h3 className="text-base font-semibold text-neutral-950">
              {lang === "ar" ? "لم تجد التخصص المناسب لخبرتك؟" : "Don't see an exact match for your skills?"}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-lg mx-auto">
              {lang === "ar"
                ? "نرحب دائماً بالكفاءات الاستثنائية. أرسل سيرتك الذاتية وسيتواصل معك قسم الموارد البشرية عند توفر شاغر ملائم."
                : "We are always eager to connect with exceptional automotive and digital talents. Submit a general application."}
            </p>
            <Link
              href="/careers/apply?job=general"
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Send size={13} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "تقديم طلب عام" : "Submit General Application"}</span>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
