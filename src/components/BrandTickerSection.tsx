"use client";

import React from "react";
import { BrandLogo } from "@/data/mockData";

interface BrandTickerSectionProps {
  brands: BrandLogo[];
  lang: "en" | "ar";
}

export const BrandTickerSection: React.FC<BrandTickerSectionProps> = ({ brands, lang }) => {
  return (
    <section className="py-10 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
          {lang === "ar" ? "قواعد تثبيت مخصصة لموديلات" : "Bespoke Mounts Engineered For"}
        </p>
      </div>

      {/* Smooth Infinite Logo Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right subtle gradient masks */}
        <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker flex items-center gap-7 sm:gap-9 md:gap-11 py-2">
          {[...brands, ...brands, ...brands, ...brands].map((b, idx) => (
            <div
              key={`${b.id}-${idx}`}
              className="flex items-center justify-center h-12 sm:h-14 md:h-16 w-18 sm:w-22 md:w-24 shrink-0 opacity-80 hover:opacity-100 transition-all duration-200 filter grayscale hover:grayscale-0 cursor-pointer"
              title={b.name}
            >
              <img
                src={b.image}
                alt={b.name}
                className="max-h-10 sm:max-h-12 md:max-h-13 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
