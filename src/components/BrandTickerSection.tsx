"use client";

import React from "react";
import { BrandLogo } from "@/data/mockData";

interface BrandTickerSectionProps {
  brands: BrandLogo[];
  lang: "en" | "ar";
}

export const BrandTickerSection: React.FC<BrandTickerSectionProps> = ({ brands, lang }) => {
  return (
    <section className="pt-8 sm:pt-10 pb-2 sm:pb-3 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-5 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold">
          {lang === "ar" ? "قواعد تثبيت مخصصة لموديلات" : "Bespoke Mounts Engineered For"}
        </p>
      </div>

      {/* Smooth Infinite Logo Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right subtle gradient masks */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker flex items-center gap-6 sm:gap-8 md:gap-9 pt-1 pb-1">
          {[...brands, ...brands, ...brands, ...brands].map((b, idx) => (
            <div
              key={`${b.id}-${idx}`}
              className="flex items-center justify-center h-14 sm:h-16 md:h-18 shrink-0 px-2 sm:px-3 opacity-80 hover:opacity-100 transition-all duration-200 filter grayscale hover:grayscale-0 cursor-pointer"
              title={b.name}
            >
              <img
                src={b.image}
                alt={b.name}
                className="max-h-12 sm:max-h-14 md:max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
