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
import { motion } from "framer-motion";
import { fadeUpItemVariants, viewportOnce } from "@/utils/animations";

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
    <section id="hardware" className="py-12 sm:py-16 lg:py-20 bg-white text-neutral-900 border-b border-neutral-100 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with Minimalist Carousel Controls */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpItemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6"
        >
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

            {/* Sleek, Minimalist Navigation Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                className="custom-swiper-prev p-2 text-neutral-400 hover:text-neutral-950 transition-all duration-200 cursor-pointer hover:scale-115 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} className="rtl:rotate-180" />
              </button>
              <button
                type="button"
                className="custom-swiper-next p-2 text-neutral-400 hover:text-neutral-950 transition-all duration-200 cursor-pointer hover:scale-115 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </motion.div>

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
              0: { slidesPerView: 1.2, spaceBetween: 24 },
              640: { slidesPerView: 2.2, spaceBetween: 28 },
              1024: { slidesPerView: 3.2, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 36 },
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
                    className="h-full flex flex-col justify-between group select-none cursor-pointer p-1"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block focus:outline-none"
                    >
                      {/* Pure Container-less Product Photo Showcase */}
                      <div className="relative w-full h-48 sm:h-56 flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain object-center group-hover:scale-105 group-active:scale-95 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = "/admin/banners/accessories.jpg";
                          }}
                        />
                        {/* Minimal In-Stock / Pre-Order Pill Badge */}
                        <div className="absolute top-1 start-1 px-2 py-0.5 rounded-full bg-neutral-100/90 text-[10px] sm:text-[11px] font-medium shadow-2xs">
                          <span className={inStock ? "text-neutral-700" : "text-[#b38e46]"}>
                            {inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Pre-Order")}
                          </span>
                        </div>
                      </div>

                      {/* Model SKU */}
                      <p className="text-[10px] sm:text-xs font-mono text-neutral-400 mb-1 truncate">
                        {product.product_id}
                      </p>

                      {/* Product Title */}
                      <h3 className="font-medium text-xs sm:text-sm text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#c5a059] transition-colors">
                        {lang === "ar" ? product.name_ar : product.name}
                      </h3>
                    </Link>

                    {/* Pricing & Add to Bag */}
                    <div
                      className="pt-2 flex items-center justify-between gap-2 mt-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href={`/products/${product.slug}`} className="shrink-0 whitespace-nowrap">
                        <span className="text-sm sm:text-base font-bold text-neutral-950 hover:text-[#c5a059] transition-colors font-mono">
                          {product.price}
                        </span>
                        <span className="text-[11px] sm:text-xs font-semibold text-[#c5a059] ms-1">{currency}</span>
                      </Link>

                      {inStock ? (
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className={`flex items-center gap-1 text-xs sm:text-xs font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl transition-all duration-200 cursor-pointer active-press shadow-2xs shrink-0 ${
                            isAdded
                              ? "bg-[#25D366] text-white"
                              : "bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950"
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
                          className="flex items-center gap-1 text-xs sm:text-xs font-medium py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl bg-neutral-100 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#c5a059] transition-colors cursor-pointer active-press shrink-0"
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
