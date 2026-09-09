"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/mockData";
import { ShoppingCart, Clock, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface TopSellingSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenPreOrder: (product: Product) => void;
  currency: string;
  lang: "en" | "ar";
}

export const TopSellingSection: React.FC<TopSellingSectionProps> = ({
  products,
  onAddToCart,
  onOpenPreOrder,
  currency,
  lang,
}) => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            {lang === "ar" ? "الأكثر مبيعاً" : "Top Selling Products"}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12 px-2"
          >
            {products.map((prod) => (
              <SwiperSlide key={prod.id}>
                <div className="bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  {/* Image Container */}
                  <div className="h-56 bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.stock === 0 && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                        {lang === "ar" ? "طلب مسبق" : "Pre Order"}
                      </span>
                    )}
                  </div>

                  {/* Product Info Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 line-clamp-2 mb-2 group-hover:text-amber-600 transition">
                        {lang === "ar" ? prod.name_ar : prod.name}
                      </h3>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-lg font-black text-neutral-900">
                          {prod.price} <small className="text-xs font-semibold">{currency}</small>
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Item #: <strong className="text-gray-600">{prod.product_id}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                      {prod.stock > 0 ? (
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition shadow"
                        >
                          <ShoppingCart size={14} />
                          <span>{lang === "ar" ? "أضف للسلة" : "Add Cart"}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenPreOrder(prod)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition shadow"
                        >
                          <Clock size={14} />
                          <span>{lang === "ar" ? "طلب مسبق" : "Pre Order"}</span>
                        </button>
                      )}

                      <a
                        href="#"
                        className="bg-amber-400 hover:bg-amber-500 text-neutral-900 text-xs font-bold py-2.5 px-3 rounded-full flex items-center justify-center gap-1 transition shadow text-center"
                      >
                        <span>{lang === "ar" ? "تفاصيل" : "Details"}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
