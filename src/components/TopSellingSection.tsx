"use client";

import React, { useState } from "react";
import { Product } from "@/data/mockData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Plus, ChevronLeft, ChevronRight, Check } from "lucide-react";

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
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleAddClick = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="hardware" className="py-12 sm:py-16 lg:py-20 bg-white text-neutral-900 border-b border-neutral-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with Minimalist Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
              {lang === "ar" ? "حلول التثبيت الأكثر طلباً" : "Precision Equipment"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
              {lang === "ar" ? (
                <>
                  قواعد التثبيت <span className="font-semibold text-neutral-950">الأكثر طلباً</span>
                </>
              ) : (
                <>
                  Selected <span className="font-semibold text-neutral-950">Hardware</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <p className="hidden md:block text-xs text-neutral-500 max-w-xs leading-relaxed">
              {lang === "ar"
                ? "حلول مختارة تم اختبارها لضمان الثبات المطلق وسرعة الشحن."
                : "Rigid dash bases and MagSafe inductive holders tested for zero wobble."}
            </p>

            {/* Quiet, Minimalist Navigation Buttons with Subtle Gold Hover */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="custom-swiper-prev w-9 h-9 rounded-full border border-neutral-200 hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center text-neutral-700 transition-all duration-200 cursor-pointer active-press hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} className="rtl:rotate-180" />
              </button>
              <button
                type="button"
                className="custom-swiper-next w-9 h-9 rounded-full border border-neutral-200 hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center text-neutral-700 transition-all duration-200 cursor-pointer active-press hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next Slide"
              >
                <ChevronRight size={16} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={4}
            navigation={{
              prevEl: ".custom-swiper-prev",
              nextEl: ".custom-swiper-next",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-2"
          >
            {products.map((product) => {
              const inStock = product.stock > 0;
              const isAdded = justAddedId === product.id;

              return (
                <SwiperSlide key={product.id} className="h-auto">
                  <div className="h-full flex flex-col justify-between bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-neutral-900 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group">
                    <div>
                      {/* Product Photo Showcase */}
                      <div className="h-52 w-full flex items-center justify-center p-6 bg-neutral-50/80 rounded-xl mb-5 transition-colors group-hover:bg-neutral-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Model SKU & Fitment */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                        <span>{product.product_id}</span>
                        <span>{inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Backorder")}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-medium text-sm text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-neutral-950 transition-colors">
                        {lang === "ar" ? product.name_ar : product.name}
                      </h3>
                    </div>

                    {/* Pricing & Add to Bag */}
                    <div className="pt-4 border-t border-neutral-100 mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-neutral-900">
                          {product.price}{" "}
                          <span className="text-xs font-medium text-[#c5a059]">{currency}</span>
                        </span>
                      </div>

                      {inStock ? (
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 rounded-lg transition-all duration-200 cursor-pointer active-press ${
                            isAdded
                              ? "bg-[#25D366] text-white"
                              : "bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 hover:shadow-sm"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={13} className="stroke-[2.5]" />
                              <span>{lang === "ar" ? "تمت الإضافة" : "Added!"}</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>{lang === "ar" ? "إضافة" : "Add to Bag"}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenPreOrder(product)}
                          className="flex items-center gap-1.5 text-xs font-medium py-2 px-3.5 rounded-lg bg-neutral-100 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#c5a059] transition-colors cursor-pointer active-press"
                        >
                          <span>{lang === "ar" ? "طلب مسبق" : "Pre-Order"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
