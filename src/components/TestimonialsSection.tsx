"use client";

import React from "react";
import { Review } from "@/data/mockData";

interface TestimonialsSectionProps {
  reviews: Review[];
  lang: "en" | "ar";
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews, lang }) => {
  const cars = ["Nissan Patrol Y62", "Toyota Land Cruiser LC300", "Land Rover Defender"];

  return (
    <section className="py-20 md:py-28 bg-neutral-50 text-neutral-900 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-2">
            {lang === "ar" ? "آراء العملاء" : "Driver Feedback"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-7 border border-neutral-200/60 shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                "{lang === "ar" ? review.reviewar : review.review}"
              </p>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-neutral-900">{review.name}</h4>
                  <span className="text-[11px] text-neutral-400">{cars[idx % cars.length]}</span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">5.0 / 5.0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
