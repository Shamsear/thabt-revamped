"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/data/mockData";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpItemVariants, viewportOnce } from "@/utils/animations";

interface CategorySectionProps {
  categories: Category[];
  lang: "en" | "ar";
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories, lang }) => {
  return (
    <section id="categories" className="py-10 sm:py-16 lg:py-20 bg-white text-neutral-900 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpItemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-4"
        >
          <div>
            <p className="text-xs sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] font-semibold mb-1 sm:mb-2">
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
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
            {lang === "ar"
              ? "حلول شاملة للدفع الرباعي، الهواتف الذكية، والدراجات النارية."
              : "Comprehensive mounting solutions for SUVs, smartphones, and motorcycles."}
          </p>
        </motion.div>

        {/* Categories Grid: 2 columns on mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeUpItemVariants}>
              <Link
                id={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-neutral-50/60 hover:bg-white active:bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-neutral-200/60 hover:border-neutral-300 active:border-[#c5a059] hover:shadow-lg active:shadow-md hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col justify-between scroll-mt-24 cursor-pointer select-none h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#c5a059] group-active:text-[#c5a059] transition-colors duration-200 truncate">
                    {lang === "ar" ? cat.category_ar : cat.category}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-neutral-400 group-hover:text-[#c5a059] group-active:text-[#c5a059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                  />
                </div>

                <div className="h-28 sm:h-44 flex items-center justify-center my-2 sm:my-6 relative">
                  <img
                    src={cat.image}
                    alt={cat.category}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 group-active:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                  {lang === "ar" ? cat.descriptionar : cat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
