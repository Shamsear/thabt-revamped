"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { MOCK_FAQS, FAQ } from "@/data/mockData";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function FaqsPage() {
  const { lang } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  // Extended FAQ dataset for complete public reference
  const allFaqs: (FAQ & { category?: string })[] = [
    { ...MOCK_FAQS[0], category: "fitment" },
    { ...MOCK_FAQS[1], category: "shipping" },
    { ...MOCK_FAQS[2], category: "fitment" },
    { ...MOCK_FAQS[3], category: "shipping" },
    {
      id: "5",
      category: "fitment",
      question: "Will installing a ProClip base damage or scratch my car's dashboard?",
      question_ar: "هل يسبب تركيب قاعدة برو كليبس أي خدوش أو تلف لطبلون السيارة؟",
      answer: "No. ProClip bases are custom-molded to snap precisely into existing dashboard seams and panel gaps. There is zero drilling, no screws into trim, and no harsh glues or sticky suction cups that melt under GCC sun.",
      answer_ar: "لا على الإطلاق. قواعد برو كليبس مصبوبة بدقة لتركب في فواصل الطبلون الموجودة أصلاً. لا يوجد أي حفر أو مسامير، ولا نستخدم أي لواصق أو قواعد شفط تذوب تحت شمس الخليج.",
    },
    {
      id: "6",
      category: "warranty",
      question: "What is your official GCC replacement warranty policy?",
      question_ar: "ما هي سياسة الضمان والاستبدال الرسمية في دول الخليج؟",
      answer: "All genuine Thabt products include a 1-year official replacement warranty. If any mechanical defect or manufacturing flaw occurs, we replace the component free of charge at our Doha showroom or via courier across the GCC.",
      answer_ar: "تشمل جميع منتجات ثقة الأصلية ضمان استبدال رسمي لمدة عام كامل ضد أي عيوب مصنعية في معارضنا بقطر أو عبر الشحن في الخليج.",
    },
    {
      id: "7",
      category: "fitment",
      question: "Can I transfer my device holder if I buy a new car?",
      question_ar: "هل يمكنني نقل حامل الهاتف إلى سيارة جديدة إذا غيرت سيارتي؟",
      answer: "Yes! That is the primary advantage of our 2-part modular system. You only need to purchase a new vehicle-specific base for your new car; your existing phone holder easily screws onto the new base.",
      answer_ar: "نعم! هذه هي الميزة الكبرى لنظام ثقة المزدوج. عند تغيير سيارتك، تحتاج فقط لشراء قاعدة التثبيت المخصصة للسيارة الجديدة وتركيب حامل هاتفك الحالي عليها بكل سهولة.",
    },
    {
      id: "8",
      category: "payment",
      question: "What payment methods do you support in Qatar and the GCC?",
      question_ar: "ما هي وسائل الدفع المدعومة في قطر ودول الخليج؟",
      answer: "We support Visa, MasterCard, QPay / NAPS debit cards, Apple Pay, and Cash/Card on Delivery within Qatar.",
      answer_ar: "ندعم الدفع عبر بطاقات فيزا وماستركارد، وبطاقات الصراف الآلي المحلية كيو باي (NAPS)، وApple Pay، والدفع عند الاستلام داخل قطر.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((f) => {
      if (selectedCategory !== "all" && f.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        f.question.toLowerCase().includes(q) ||
        f.question_ar.includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.answer_ar.includes(q)
      );
    });
  }, [searchQuery, selectedCategory, allFaqs]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col relative overflow-hidden">
      {/* Ambient background gold glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />

      <Header />

      <main className="flex-1 py-8 sm:py-14 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-[#9b7832] transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "الأسئلة الشائعة والضمان" : "FAQs & Support"}
            </span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-bold mb-3 shadow-2xs">
              <HelpCircle size={14} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مركز المساعدة والدعم المعتمد" : "Official Knowledge & Fitment Base"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3">
              {lang === "ar" ? "الأسئلة الشائعة والمواصفات" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              {lang === "ar"
                ? "إجابات هندسية شاملة حول تركيب قواعد برو كليبس، الشحن السريع للخليج، والضمان الذهبي لمدة سنة."
                : "Find instant answers regarding vehicle fitment, tool-free installation, GCC express courier, and our 1-year replacement warranty."}
            </p>
          </div>

          {/* Search & Topic Custom Dropdown Bar */}
          <div className="max-w-2xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5">
              <CustomSelect
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                options={[
                  { value: "all", label: lang === "ar" ? "جميع أقسام الأسئلة" : "All FAQ Topics" },
                  { value: "fitment", label: lang === "ar" ? "التركيب والتوافق الهندسي" : "Installation & Fitment" },
                  { value: "shipping", label: lang === "ar" ? "الشحن والتوصيل للخليج" : "GCC Shipping & Delivery" },
                  { value: "warranty", label: lang === "ar" ? "الضمان والاستبدال الرسمي" : "Official Warranty & Policy" },
                  { value: "payment", label: lang === "ar" ? "الدفع والطلبات" : "Payments & Orders" },
                ]}
                lang={lang}
              />
            </div>
            <div className="sm:col-span-7 relative">
              <Search size={16} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "ابحث بالكلمات المفتاحية..." : "Search questions or keywords..."}
                className="w-full bg-white border border-neutral-200/90 rounded-xl pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Accordion FAQ Cards */}
          <div className="space-y-3 mb-12">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-[#c5a059]/60 ring-2 ring-[#c5a059]/15 shadow-md"
                      : "border-neutral-200/90 hover:border-[#c5a059]/40 shadow-2xs hover:shadow-xs"
                  } overflow-hidden`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left rtl:text-right gap-4 cursor-pointer hover:bg-[#faf6ed]/20 transition"
                  >
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-[#c5a059]" : "bg-neutral-300"}`} />
                      {lang === "ar" ? faq.question_ar : faq.question}
                    </span>
                    <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${isOpen ? "bg-[#faf6ed] text-[#9b7832]" : "text-neutral-400"}`}>
                      <ChevronDown
                        size={16}
                        className={`text-[#c5a059] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100/80 pt-4 bg-gradient-to-b from-[#faf6ed]/20 to-white">
                      {lang === "ar" ? faq.answer_ar : faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* WhatsApp Concierge Card */}
          <div className="bg-gradient-to-br from-white via-[#faf6ed] to-[#f5ebd4]/50 rounded-3xl border border-[#c5a059]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#9b7832] uppercase tracking-wider">
                <ShieldCheck size={14} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "خدمة استشارية فورية" : "Thabt Concierge Assistance"}</span>
              </div>
              <h3 className="text-base font-extrabold text-neutral-950">
                {lang === "ar" ? "لم تجد إجابة لاستفسارك أو موديل سيارتك؟" : "Have a specific question about your car or phone?"}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-lg">
                {lang === "ar"
                  ? "فريق المهندسين المتخصصين متاح لمساعدتك في مطابقة طبلون سيارتك وحامل جوالك بالصورة والقياس الفوري عبر واتساب."
                  : "Chat directly with our installation technicians on WhatsApp for instant confirmation with photos and measurements."}
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=97450400314"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-6 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-black text-xs flex items-center gap-2 shrink-0 transition-all duration-200 shadow-md cursor-pointer group"
            >
              <MessageCircle size={16} className="text-[#25D366] group-hover:text-neutral-950 transition-colors" />
              <span>{lang === "ar" ? "تواصل مع خبير التركيب" : "Contact Fitment Expert"}</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
