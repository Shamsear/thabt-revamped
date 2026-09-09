"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/data/mockData";

interface BrandTickerSectionProps {
  brands: BrandLogo[];
  lang: "en" | "ar";
}

export const BrandTickerSection: React.FC<BrandTickerSectionProps> = ({ brands, lang }) => {
  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2"
        >
          {lang === "ar" ? "مصممة للتميز وتناسب أشهر السيارات" : "Engineered for Excellence"}
        </motion.h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          {lang === "ar"
            ? "اكتشف قواعد مخصصة لأفخم السيارات ذات الأداء العالي والموثوقية المطلقة."
            : "Discover expertly designed mounts matching top vehicle brands."}
        </p>
      </div>

      {/* Infinite Logo Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 flex items-center">
        <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap min-w-full items-center">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200/60 shadow-sm min-w-[130px]"
            >
              <span className="font-bold text-gray-700 tracking-wider text-base">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
