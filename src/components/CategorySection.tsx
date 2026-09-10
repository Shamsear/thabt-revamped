"use client";

import React from "react";
import { Category } from "@/data/mockData";
import { ArrowUpRight } from "lucide-react";

interface CategorySectionProps {
  categories: Category[];
  lang: "en" | "ar";
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories, lang }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
              {lang === "ar" ? "تشكيلة المنتجات" : "Product Catalog"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
              {lang === "ar" ? (
                <>
                  استكشف <span className="font-semibold">فئات التثبيت</span>
                </>
              ) : (
                <>
                  Explore <span className="font-semibold">Collections</span>
                </>
              )}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
            {lang === "ar"
              ? "حلول شاملة للدفع الرباعي، الهواتف الذكية، والدراجات النارية."
              : "Comprehensive mounting solutions for SUVs, smartphones, and motorcycles."}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              id={cat.slug}
              href={`#${cat.slug}`}
              className="group bg-neutral-50/60 hover:bg-white rounded-2xl p-6 border border-neutral-200/60 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between scroll-mt-24 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#c5a059] transition-colors duration-200">
                  {lang === "ar" ? cat.category_ar : cat.category}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-neutral-400 group-hover:text-[#c5a059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>

              <div className="h-44 flex items-center justify-center my-6 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.category}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                {lang === "ar" ? cat.descriptionar : cat.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
