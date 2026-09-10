"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
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
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  // Extended FAQ dataset for complete public reference
  const allFaqs: FAQ[] = [
    ...MOCK_FAQS,
    {
      id: "5",
      question: "Will installing a ProClip base damage or scratch my car's dashboard?",
      question_ar: "هل يسبب تركيب قاعدة برو كليبس أي خدوش أو تلف لطبلون السيارة؟",
      answer: "No. ProClip bases are custom-molded to snap precisely into existing dashboard seams and panel gaps. There is zero drilling, no screws into trim, and no harsh glues or sticky suction cups that melt under GCC sun.",
      answer_ar: "لا على الإطلاق. قواعد برو كليبس مصبوبة بدقة لتركب في فواصل الطبلون الموجودة أصلاً. لا يوجد أي حفر أو مسامير، ولا نستخدم أي لواصق أو قواعد شفط تذوب تحت شمس الخليج.",
    },
    {
      id: "6",
      question: "What is your official GCC replacement warranty policy?",
      question_ar: "ما هي سياسة الضمان والاستبدال الرسمية في دول الخليج؟",
      answer: "All genuine Thabt products include a 1-year official replacement warranty. If any mechanical defect or manufacturing flaw occurs, we replace the component free of charge at our Doha showroom or via courier across the GCC.",
      answer_ar: "تشمل جميع منتجات ثقة الأصلية ضمان استبدال رسمي لمدة عام كامل ضد أي عيوب مصنعية في معارضنا بقطر أو عبر الشحن في الخليج.",
    },
    {
      id: "7",
      question: "Can I transfer my device holder if I buy a new car?",
      question_ar: "هل يمكنني نقل حامل الهاتف إلى سيارة جديدة إذا غيرت سيارتي؟",
      answer: "Yes! That is the primary advantage of our 2-part modular system. You only need to purchase a new vehicle-specific base for your new car; your existing phone holder easily screws onto the new base.",
      answer_ar: "نعم! هذه هي الميزة الكبرى لنظام ثقة المزدوج. عند تغيير سيارتك، تحتاج فقط لشراء قاعدة التثبيت المخصصة للسيارة الجديدة وتركيب حامل هاتفك الحالي عليها بكل سهولة.",
    },
    {
      id: "8",
      question: "What payment methods do you support in Qatar and the GCC?",
      question_ar: "ما هي وسائل الدفع المدعومة في قطر ودول الخليج؟",
      answer: "We support Visa, MasterCard, QPay / NAPS debit cards, Apple Pay, and Cash/Card on Delivery within Qatar.",
      answer_ar: "ندعم الدفع عبر بطاقات فيزا وماستركارد، وبطاقات الصراف الآلي المحلية كيو باي (NAPS)، وApple Pay، والدفع عند الاستلام داخل قطر.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return allFaqs;
    const q = searchQuery.toLowerCase().trim();
    return allFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.question_ar.includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.answer_ar.includes(q)
    );
  }, [searchQuery, allFaqs]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

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
              {lang === "ar" ? "الأسئلة الشائعة والضمان" : "FAQs & Support"}
            </span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-semibold mb-3">
              <HelpCircle size={14} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مركز المساعدة والدعم" : "Help & Knowledge Base"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3">
              {lang === "ar" ? "الأسئلة الشائعة والمواصفات" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              {lang === "ar"
                ? "إجابات شاملة حول تركيب قواعد برو كليبس، الشحن لدول الخليج، الضمان، والتوافق."
                : "Find instant answers regarding vehicle fitment, installation, GCC express shipping, and warranty."}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-12">
            <Search size={16} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5 text-neutral-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ar" ? "ابحث في الأسئلة الشائعة..." : "Search questions or topics..."}
              className="w-full bg-white border border-neutral-300 rounded-2xl pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c5a059] shadow-xs"
            />
          </div>

          {/* Accordion FAQ Cards */}
          <div className="space-y-3 mb-12">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left rtl:text-right gap-4 cursor-pointer hover:bg-neutral-50/70 transition"
                  >
                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                      {lang === "ar" ? faq.question_ar : faq.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#c5a059] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/40">
                      {lang === "ar" ? faq.answer_ar : faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* WhatsApp Concierge Card */}
          <div className="bg-[#faf6ed] rounded-3xl border border-[#c5a059]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                {lang === "ar" ? "لم تجد إجابة لاستفسارك؟" : "Have a question about your car model?"}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {lang === "ar"
                  ? "فريق التركيب والدعم متاح على مدار اليوم عبر محادثة واتساب المباشرة للمساعدة الفورية."
                  : "Chat directly with our fitment specialists on WhatsApp for instant guidance."}
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=97450400314"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-2 shrink-0 transition shadow-sm"
            >
              <MessageCircle size={16} />
              <span>{lang === "ar" ? "تواصل عبر واتساب" : "WhatsApp Concierge"}</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
