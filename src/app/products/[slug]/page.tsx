"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS, Product } from "@/data/mockData";
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  ShoppingBag,
  CheckCircle2,
  Car,
  Layers,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const { lang, formatPrice, addToCart } = useAppContext();

  // Find product by slug
  const product = MOCK_ALL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Gallery state
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Gallery Navigation Functions
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch Swipe Gesture Handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (lang === "ar") {
      if (isLeftSwipe) prevImage();
      if (isRightSwipe) nextImage();
    } else {
      if (isLeftSwipe) nextImage();
      if (isRightSwipe) prevImage();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Companion recommended combo product
  const companionProduct: Product =
    product.category_slug === "pro-clips"
      ? MOCK_ALL_PRODUCTS.find((p) => p.slug === "magsafe-wireless-holder") || MOCK_ALL_PRODUCTS[1]
      : MOCK_ALL_PRODUCTS.find((p) => p.slug === "proclip-land-cruiser-lc300") || MOCK_ALL_PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleAddCompanionCombo = () => {
    addToCart(product, 1);
    addToCart(companionProduct, 1);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
            <Link href="/" className="hover:text-neutral-900 transition shrink-0">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180 shrink-0" />
            <Link
              href={`/categories/${product.category_slug || "pro-clips"}`}
              className="hover:text-neutral-900 transition shrink-0"
            >
              {lang === "ar" ? "الفئة" : "Category"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180 shrink-0" />
            <span className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-xs">
              {lang === "ar" ? product.name_ar : product.name}
            </span>
          </nav>

          {/* Main Product Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 items-start">
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              {/* Main Image Display with Touch Swipe and Left/Right Navigation Buttons */}
              <div
                className="aspect-square max-h-[360px] sm:max-h-[460px] w-full bg-neutral-50/70 rounded-2xl border border-neutral-100 overflow-hidden flex items-center justify-center px-8 sm:px-12 py-4 sm:py-8 relative select-none touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Active Image */}
                <img
                  key={activeImageIndex}
                  src={activeImage}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain transition-all duration-300 pointer-events-none select-none"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = "/admin/banners/accessories.jpg";
                  }}
                />

                {/* Special Offer Badge */}
                {product.original_price && (
                  <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-neutral-900 text-[#c5a059] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs z-10 pointer-events-none">
                    {lang === "ar" ? "خصم خاص" : "Special Offer"}
                  </span>
                )}

                {/* Counter Badge (e.g. 1 / 3) */}
                {images.length > 1 && (
                  <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-neutral-900/75 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-full z-10 pointer-events-none">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                )}

                {/* Previous & Next Arrow Buttons on the Image */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        lang === "ar" ? nextImage() : prevImage();
                      }}
                      className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-neutral-900 shadow-md border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-20 outline-none focus:outline-none"
                      aria-label={lang === "ar" ? "الصورة السابقة" : "Previous image"}
                      title={lang === "ar" ? "السابق" : "Previous"}
                    >
                      <ChevronLeft size={18} className="rtl:rotate-180" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        lang === "ar" ? prevImage() : nextImage();
                      }}
                      className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-neutral-900 shadow-md border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-20 outline-none focus:outline-none"
                      aria-label={lang === "ar" ? "الصورة التالية" : "Next image"}
                      title={lang === "ar" ? "التالي" : "Next"}
                    >
                      <ChevronRight size={18} className="rtl:rotate-180" />
                    </button>

                    {/* Pagination Indicator Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-neutral-950/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer outline-none focus:outline-none ${
                            activeImageIndex === idx ? "w-5 bg-[#c5a059]" : "w-1.5 bg-white/70 hover:bg-white"
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-neutral-50 shrink-0 transition-all cursor-pointer relative overflow-hidden outline-none focus:outline-none ${
                        activeImageIndex === idx
                          ? "border-2 border-[#c5a059] shadow-sm scale-102"
                          : "border border-neutral-200/80 hover:border-neutral-400 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/admin/banners/accessories.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Buy Box & Product Details (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                {/* SKU & Stock */}
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="font-mono text-neutral-400">{product.product_id}</span>
                  <span className="text-neutral-300">•</span>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      product.stock > 0 ? "text-emerald-700" : "text-[#c5a059]"
                    }`}
                  >
                    {product.stock > 0 ? (
                      <>
                        <CheckCircle2 size={12} />
                        <span>{lang === "ar" ? "متوفر بالمخزن" : "In Stock"}</span>
                      </>
                    ) : (
                      <span>{lang === "ar" ? "حجز مسبق" : "Pre-Order"}</span>
                    )}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-950 leading-snug mb-2">
                  {lang === "ar" ? product.name_ar : product.name}
                </h1>

                {/* Price Row */}
                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-neutral-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  {product.original_price && (
                    <span className="text-xs font-semibold text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md border border-[#c5a059]/20">
                      {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% {lang === "ar" ? "خصم" : "OFF"}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {lang === "ar" ? product.description_ar || product.description : product.description}
                </p>
              </div>

              {/* Key Features List */}
              {product.features && product.features.length > 0 && (
                <ul className="space-y-1.5 text-xs text-neutral-700 py-1">
                  {product.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={13} className="text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Verified Dashboard Fit Badge */}
              <div className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Car size={14} className="text-[#c5a059] shrink-0" />
                  <span>{lang === "ar" ? "تركيب أصلي بدون حفر أو إتلاف ديكور السيارة" : "100% Tool-Free Dashboard Snap Fit"}</span>
                </div>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 text-xs">
                  <CheckCircle2 size={12} />
                  <span>{lang === "ar" ? "معتمد" : "Verified"}</span>
                </span>
              </div>

              {/* Action Buttons: Stepper + Add to Cart + Instant Buy */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-200 rounded-xl h-11 bg-white text-xs shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold hover:bg-neutral-50 rounded-l-xl transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold hover:bg-neutral-50 rounded-r-xl transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 h-11 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    {addedSuccess ? (
                      <>
                        <Check size={14} />
                        <span>{lang === "ar" ? "تمت الإضافة بنجاح!" : "Added to Cart!"}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>{lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Buy Button */}
                <button
                  type="button"
                  onClick={handleInstantBuy}
                  className="w-full h-11 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Zap size={14} />
                  <span>{lang === "ar" ? "شراء فوري مباشر" : "Instant Buy"}</span>
                </button>
              </div>

              {/* Minimalist Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-center text-xs text-neutral-600">
                <div className="flex items-center justify-center gap-1.5 py-0.5">
                  <ShieldCheck size={13} className="text-[#c5a059]" />
                  <span className="text-[11px] sm:text-xs">{lang === "ar" ? "ضمان سنة" : "1-Yr Warranty"}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-0.5 border-x border-neutral-100">
                  <Truck size={13} className="text-[#c5a059]" />
                  <span className="text-[11px] sm:text-xs">{lang === "ar" ? "توصيل سريع" : "Fast Shipping"}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-0.5">
                  <RotateCcw size={13} className="text-[#c5a059]" />
                  <span className="text-[11px] sm:text-xs">{lang === "ar" ? "إرجاع 14 يوم" : "14-Day Return"}</span>
                </div>
              </div>

              {/* Complete System Pairing Banner */}
              <div className="mt-4 p-3 sm:p-3.5 rounded-xl border border-neutral-200/70 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.name}
                    className="w-11 h-11 object-contain rounded-lg bg-white border border-neutral-100 p-1 shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/admin/banners/accessories.jpg";
                    }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                      {lang === "ar" ? "القطعة المكملة للتركيب:" : "Recommended Companion:"}
                    </p>
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">
                      {lang === "ar" ? companionProduct.name_ar : companionProduct.name}
                    </h4>
                    <p className="text-xs font-bold text-neutral-900">
                      {formatPrice(companionProduct.price)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCompanionCombo}
                  className="w-full sm:w-auto h-9 px-3.5 rounded-lg bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border border-neutral-200 text-xs font-semibold transition cursor-pointer shrink-0 shadow-2xs"
                >
                  {lang === "ar" ? "أضف الاثنين" : "Add Both"}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specs && (
            <div className="border-t border-neutral-100 pt-8 mb-8">
              <h2 className="text-sm font-bold text-neutral-950 mb-4 flex items-center gap-2">
                <Layers size={15} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "المواصفات الهندسية" : "Engineering Specifications"}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3 bg-neutral-50/70 rounded-xl border border-neutral-100 text-xs">
                    <span className="text-neutral-500 block mb-0.5">{key}</span>
                    <span className="font-semibold text-neutral-900 block truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility Strip */}
          {product.compatible_cars && (
            <div className="border-t border-neutral-100 pt-8">
              <h2 className="text-sm font-bold text-neutral-950 mb-1.5 flex items-center gap-2">
                <Car size={15} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "السيارات المتوافقة المعتمدة" : "Verified Compatible Vehicles"}</span>
              </h2>
              <p className="text-xs text-neutral-500 mb-3">
                {lang === "ar"
                  ? "تم تأكيد ملاءمة هذه القطعة للسيارات التالية بدون الحاجة إلى حفر أو تعديل ديكور السيارة:"
                  : "Precision tool-free snap fit for the following vehicle dashboards:"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.compatible_cars.map((car, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium"
                  >
                    {car}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
