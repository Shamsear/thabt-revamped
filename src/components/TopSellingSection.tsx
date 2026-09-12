"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/mockData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
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
  const router = useRouter();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleAddClick = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const handleProductNavigate = (slug: string) => {
    router.push(`/products/${slug}`);
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
            key={lang}
            dir={lang === "ar" ? "rtl" : "ltr"}
            modules={[Navigation, Autoplay, Mousewheel, FreeMode]}
            spaceBetween={24}
            slidesPerView={4}
            navigation={{
              prevEl: ".custom-swiper-prev",
              nextEl: ".custom-swiper-next",
            }}
            autoplay={{ delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            simulateTouch={false}
            allowTouchMove={true}
            preventClicks={false}
            preventClicksPropagation={false}
            touchStartPreventDefault={false}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            freeMode={{
              enabled: true,
              sticky: true,
              momentum: true,
              momentumRatio: 0.7,
              momentumVelocityRatio: 0.7,
            }}
            touchEventsTarget="container"
            touchRatio={1}
            threshold={5}
            resistance={true}
            resistanceRatio={0.85}
            speed={500}
            breakpoints={{
              0: { slidesPerView: 1.15, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!pt-4 !pb-6 !px-1 -mt-3 -mb-4"
          >
            {products.map((product) => {
              const inStock = product.stock > 0;
              const isAdded = justAddedId === product.id;

              return (
                <SwiperSlide key={product.id} className="h-auto">
                  <div
                    onClick={() => handleProductNavigate(product.slug)}
                    className="h-full flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 hover:border-neutral-900 active:border-[#c5a059] hover:shadow-xl active:shadow-md hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 ease-out group select-none cursor-pointer"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block focus:outline-none"
                    >
                      {/* Product Photo Showcase */}
                      <div className="h-48 sm:h-52 w-full rounded-xl mb-4 sm:mb-5 bg-neutral-100 relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 group-active:scale-105 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = "/admin/banners/accessories.jpg";
                          }}
                        />
                      </div>

                      {/* Model SKU & Fitment */}
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5">
                        <span>{product.product_id}</span>
                        <span className={inStock ? "text-neutral-600" : "text-[#b38e46] font-medium"}>
                          {inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Backorder")}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-medium text-sm sm:text-sm text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#c5a059] transition-colors">
                        {lang === "ar" ? product.name_ar : product.name}
                      </h3>
                    </Link>

                    {/* Pricing & Add to Bag */}
                    <div
                      className="pt-4 border-t border-neutral-100 mt-3 flex items-center justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href={`/products/${product.slug}`}>
                        <span className="text-base font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors">
                          {product.price}{" "}
                          <span className="text-xs font-medium text-[#c5a059]">{currency}</span>
                        </span>
                      </Link>

                      {inStock ? (
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className={`flex items-center gap-1.5 text-sm sm:text-xs font-semibold py-2.5 sm:py-2 px-3.5 rounded-lg transition-all duration-200 cursor-pointer active-press ${
                            isAdded
                              ? "bg-[#25D366] text-white"
                              : "bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 hover:shadow-sm"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} className="stroke-[2.5]" />
                              <span>{lang === "ar" ? "تمت الإضافة" : "Added!"}</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>{lang === "ar" ? "إضافة" : "Add to Bag"}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenPreOrder(product)}
                          className="flex items-center gap-1.5 text-sm sm:text-xs font-medium py-2.5 sm:py-2 px-3.5 rounded-lg bg-neutral-100 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#c5a059] transition-colors cursor-pointer active-press"
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
