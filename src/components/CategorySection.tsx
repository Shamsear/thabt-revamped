"use client";

import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/data/mockData";
import { ArrowRight, ChevronRight } from "lucide-react";

interface CategorySectionProps {
  categories: Category[];
  lang: "en" | "ar";
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories, lang }) => {
  return (
    <section id="categories" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <img
        src="https://www.thabt.qa/user/images/product-category/antenna-2.png"
        alt="Decorative"
        className="absolute right-0 bottom-0 opacity-10 pointer-events-none max-w-xs md:max-w-md"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            {lang === "ar" ? "فئات المنتجات" : "Product Categories"}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
        </motion.div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group bg-gray-50 border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="h-48 bg-white p-4 flex items-center justify-center overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.category}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-gray-100">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-2 group-hover:text-amber-500 transition-colors">
                    {lang === "ar" ? cat.category_ar : cat.category}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {lang === "ar" ? cat.descriptionar : cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-amber-500 group-hover:text-amber-600">
                  <span>{lang === "ar" ? "استكشف المنتجات" : "Explore Category"}</span>
                  <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
