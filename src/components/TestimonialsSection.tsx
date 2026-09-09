"use client";

import React from "react";
import { motion } from "framer-motion";
import { Review } from "@/data/mockData";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface TestimonialsSectionProps {
  reviews: Review[];
  lang: "en" | "ar";
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews, lang }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            {lang === "ar" ? "آراء العملاء" : "Customer Reviews"}
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {lang === "ar" ? "تعرّف على ما يقوله عملاؤنا الكرام في جميع دول الخليج." : "Hear what our verified clients say about Thabt mounts."}
          </p>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mt-3" />
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 px-2"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev.id}>
              <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all h-full flex flex-col justify-between relative">
                <Quote size={32} className="text-amber-200 absolute top-6 right-6 opacity-60 pointer-events-none" />
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 text-sm md:text-base leading-relaxed italic mb-6">
                    "{lang === "ar" ? rev.reviewar : rev.review}"
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-neutral-900 text-sm">{rev.name}</span>
                  <span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                    {lang === "ar" ? "مشتري موثق" : "Verified Buyer"}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
