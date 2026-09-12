"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { MOCK_FAQS, FAQ } from "@/data/mockData";
import {
  ChevronDown,
  Search,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
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
            <span className="text-neutral-900 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "الأسئلة الشائعة والضمان" : "FAQs & Support"}
            </span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
              {lang === "ar" ? "مركز المساعدة والدعم" : "Help & Knowledge Base"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-3">
              {lang === "ar" ? "الأسئلة " : "Frequently Asked "}
              <span className="font-semibold text-neutral-950">{lang === "ar" ? "الشائعة" : "Questions"}</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600">
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
            <div className="sm:col-span-7 relative flex items-center">
              <Search size={15} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "ابحث بالكلمات المفتاحية..." : "Search questions or keywords..."}
                className="w-full h-11 sm:h-10 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-xl pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-sm sm:text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          {/* Accordion FAQ List - Clean minimalist divide-y style like Home Page */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`faqs-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="divide-y divide-neutral-200/70 border-y border-neutral-200/70 mb-12"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-4 sm:py-5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left rtl:text-right py-1 cursor-pointer group"
                      >
                        <span className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-neutral-600 transition">
                          {lang === "ar" ? faq.question_ar : faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-neutral-400 transition-transform duration-200 shrink-0 ml-4 rtl:ml-0 rtl:mr-4 ${
                            isOpen ? "rotate-180 text-neutral-900" : ""
                          }`}
                        />
                      </button>

                      <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
                        <div className="accordion-inner">
                          <div className="pt-3 pb-1 pr-8 rtl:pr-0 rtl:pl-8 text-sm sm:text-sm text-neutral-600 leading-relaxed">
                            <p>{lang === "ar" ? faq.answer_ar : faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-sm text-neutral-500">
                  {lang === "ar" ? "لم يتم العثور على أي أسئلة مطابقة لبحثك." : "No questions matched your search query."}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* WhatsApp Concierge Card */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-semibold block">
                {lang === "ar" ? "خدمة استشارية فورية" : "Thabt Concierge Assistance"}
              </span>
              <h3 className="text-base font-semibold text-neutral-950">
                {lang === "ar" ? "لم تجد إجابة لاستفسارك أو موديل سيارتك؟" : "Have a specific question about your car or phone?"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-lg">
                {lang === "ar"
                  ? "فريق المهندسين المتخصصين متاح لمساعدتك في مطابقة طبلون سيارتك وحامل جوالك بالصورة والقياس الفوري عبر واتساب."
                  : "Chat directly with our installation technicians on WhatsApp for instant confirmation with photos and measurements."}
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=97450400314"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-[#25D366] text-white font-semibold text-xs flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>{lang === "ar" ? "تواصل مع خبير التركيب" : "Contact Fitment Expert"}</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
