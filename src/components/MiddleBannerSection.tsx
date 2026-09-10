"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface MiddleBannerSectionProps {
  lang?: "en" | "ar";
}

export const MiddleBannerSection: React.FC<MiddleBannerSectionProps> = ({ lang = "en" }) => {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
          <img
            src="/user/images/home_page_Banner.png"
            alt="Thabt Interior Fit"
            className="w-full h-[280px] sm:h-[360px] md:h-[400px] object-cover opacity-50"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-2">
                {lang === "ar" ? "ثبات في كل ظرف" : "Uncompromised Hold"}
              </p>
              <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight mb-3">
                {lang === "ar"
                  ? "مختبرة في كثبان الصحراء. مصممة لأفخم المقصورات."
                  : "Desert dune tested. Luxury cockpit refined."}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                {lang === "ar"
                  ? "ثبات ميكانيكي تام بدون أي ارتخاء، مع حماية كاملة لديكور لوحة القيادة الأصلية."
                  : "Zero phone vibration on desert washboards while preserving factory dashboard leather and trim."}
              </p>
              <a
                href="#home-banner"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white hover:text-amber-300 transition"
              >
                <span>{lang === "ar" ? "حدد قاعدة سيارتك" : "Select Your Mount"}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
