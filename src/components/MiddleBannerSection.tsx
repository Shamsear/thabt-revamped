"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface MiddleBannerSectionProps {
  lang?: "en" | "ar";
}

export const MiddleBannerSection: React.FC<MiddleBannerSectionProps> = ({ lang = "en" }) => {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900">
          <img
            src="/user/images/home_page_Banner.png"
            alt="Thabt Interior Fit"
            className="w-full h-[200px] sm:h-[360px] md:h-[400px] object-cover opacity-50"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-12 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
            <div className="max-w-xl">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1 sm:mb-2">
                {lang === "ar" ? "ثبات في كل ظرف" : "Uncompromised Hold"}
              </p>
              <h3 className="text-base sm:text-3xl font-light text-white leading-snug sm:leading-tight mb-1.5 sm:mb-3">
                {lang === "ar"
                  ? "مختبرة في كثبان الصحراء. مصممة لأفخم المقصورات."
                  : "Desert dune tested. Luxury cockpit refined."}
              </h3>
              <p className="text-[11px] sm:text-sm text-neutral-300 mb-3 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {lang === "ar"
                  ? "ثبات ميكانيكي تام بدون أي ارتخاء، مع حماية كاملة لديكور لوحة القيادة الأصلية."
                  : "Zero phone vibration on desert washboards while preserving factory dashboard leather and trim."}
              </p>
              <a
                href="#home-hero"
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold text-[#c5a059] hover:text-white transition"
              >
                <span>{lang === "ar" ? "حدد قاعدة سيارتك" : "Select Your Mount"}</span>
                <ArrowRight size={12} className="rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
