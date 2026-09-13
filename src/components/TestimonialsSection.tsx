"use client";

import React from "react";
import { Review } from "@/data/mockData";
import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpItemVariants, viewportOnce } from "@/utils/animations";

interface TestimonialsSectionProps {
  reviews: Review[];
  lang: "en" | "ar";
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews, lang }) => {
  const cars = ["Nissan Patrol Y62", "Toyota Land Cruiser LC300", "Land Rover Defender"];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-neutral-50 text-neutral-900 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerVariants}
        >
          {/* Section Header */}
          <motion.div variants={fadeUpItemVariants} className="max-w-2xl mb-6 sm:mb-12">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1 sm:mb-2">
              {lang === "ar" ? "آراء العملاء" : "Driver Feedback"}
            </p>
            <h2 className="text-xl sm:text-4xl font-light tracking-tight text-neutral-900">
              {lang === "ar" ? (
                <>
                  تجارب سائقي <span className="font-semibold">الخليج</span>
                </>
              ) : (
                <>
                  Tested by <span className="font-semibold">GCC drivers</span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Mobile Horizontal Snap Scroll / Desktop 3-col Grid */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-3 gap-3 sm:gap-6 scrollbar-none">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                variants={fadeUpItemVariants}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center sm:w-auto bg-white rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-neutral-200/60 shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 sm:mb-6">
                  &ldquo;{lang === "ar" ? review.reviewar : review.review}&rdquo;
                </p>

                <div className="pt-3 sm:pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm">{review.name}</h4>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">{cars[idx % cars.length]}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#c5a059] font-mono font-semibold">5.0 ★</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
