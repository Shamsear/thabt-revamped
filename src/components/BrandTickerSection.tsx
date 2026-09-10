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

        <div className="animate-ticker flex items-center gap-12 sm:gap-16 py-3">
          {[...brands, ...brands, ...brands].map((b, idx) => (
            <div
              key={`${b.id}-${idx}`}
              className="flex items-center justify-center h-12 w-28 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-200 filter grayscale hover:grayscale-0 cursor-pointer"
              title={b.name}
            >
              <img
                src={b.image}
                alt={b.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
