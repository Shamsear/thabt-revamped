"use client";

import React, { useState } from "react";
import { FAQ } from "@/data/mockData";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  faqs: FAQ[];
  lang: "en" | "ar";
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, lang }) => {
  const [openId, setOpenId] = useState<string | null>("1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
            {lang === "ar" ? "إجابات شائعة" : "Specifications & FAQ"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
            {lang === "ar" ? (
              <>
                الأسئلة <span className="font-semibold">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="font-semibold">Questions</span>
              </>
            )}
          </h2>
        </div>

        <div className="divide-y divide-neutral-200/70">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left rtl:text-right py-2 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-neutral-600 transition">
                    {lang === "ar" ? faq.question_ar : faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-neutral-400 transition-transform duration-200 shrink-0 ml-4 rtl:ml-0 rtl:mr-4 ${
                      isOpen ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>

                <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
                  <div className="accordion-inner">
                    <div className="pt-3 pb-2 pr-8 rtl:pr-0 rtl:pl-8 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      <p>{lang === "ar" ? faq.answer_ar : faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
