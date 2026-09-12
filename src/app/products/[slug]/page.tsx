"use client";

import React, { useState, useEffect, useRef, useMemo, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext, CURRENCY_MAP } from "@/context/AppContext";
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
  Clock,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Plus,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const {
    lang,
    formatPrice,
    addToCart,
    currency,
    setHasStickyBottomBar,
    setCustomWhatsAppMessage,
    setPreOrderProduct,
  } = useAppContext();

  // Find product by slug
  const product = useMemo(() => {
    return MOCK_ALL_PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    notFound();
  }

  // Gallery state
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const activeImage = images[activeImageIndex] || images[0];
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic currency & formatted amounts for high-impact display
  const curRate = CURRENCY_MAP[currency] || CURRENCY_MAP.QAR;
  const currentConverted = Number.isFinite(product.price) ? product.price * (curRate?.rate || 1) : 0;
  const formattedAmount = currentConverted % 1 === 0 ? currentConverted.toFixed(0) : currentConverted.toFixed(2);
  const currencySymbol = lang === "ar" ? (curRate?.symbol_ar || "ر.ق") : (curRate?.symbol || "QAR");

  const originalConverted = product.original_price && Number.isFinite(product.original_price)
    ? product.original_price * (curRate?.rate || 1)
    : null;
  const formattedOriginalAmount = originalConverted !== null
    ? (originalConverted % 1 === 0 ? originalConverted.toFixed(0) : originalConverted.toFixed(2))
    : null;
  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  // Keyboard navigation and body scroll lock for Zoom Modal
  useEffect(() => {
    if (!isZoomOpen) {
      setIsZoomedIn(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomOpen(false);
      } else if (e.key === "ArrowRight") {
        lang === "ar" ? prevImage() : nextImage();
      } else if (e.key === "ArrowLeft") {
        lang === "ar" ? nextImage() : prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomOpen, lang, images.length]);

  const handleShare = async () => {
    const shareData = {
      title: product ? (lang === "ar" ? product.name_ar : product.name) : "Thabt Mounts",
      text: lang === "ar" ? "قاعدة جوال أصلية من ثقة:" : "Custom mount from Thabt:",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share unsupported fallback
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      } catch (err) {
        // clipboard fallback
      }
    }
  };

  // Viewport scroll detection for Sticky Mobile Pill
  const addToCartRef = useRef<HTMLButtonElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const target = addToCartRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      // Only show sticky pill when user has scrolled past the top Add to Bag button
      const hasScrolledPast = rect.bottom < 0;
      setShowStickyBar(hasScrolledPast);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [product]);

  // Sync sticky bar state to Footer (so floating WhatsApp moves above it seamlessly)
  useEffect(() => {
    setHasStickyBottomBar(showStickyBar);
    return () => {
      setHasStickyBottomBar(false);
    };
  }, [showStickyBar, setHasStickyBottomBar]);

  // Sync WhatsApp custom message with current product name and SKU
  useEffect(() => {
    if (!product) return;
    const msg =
      lang === "ar"
        ? `مرحباً ثقة، أود الاستفسار عن منتج: ${product.name_ar} (رمز المنتج: ${product.product_id})`
        : `Hello Thabt, I'm inquiring about: ${product.name} (SKU: ${product.product_id})`;
    setCustomWhatsAppMessage(msg);
    return () => {
      setCustomWhatsAppMessage(null);
    };
  }, [product, lang, setCustomWhatsAppMessage]);

  // Related products recommendation
  const relatedProducts = useMemo(() => {
    return MOCK_ALL_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }, [slug]);

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

      <main className="flex-1 py-3 sm:py-8 pb-28 sm:pb-8">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 mb-3 sm:mb-6 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
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
            <span className="text-neutral-800 font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs">
              {lang === "ar" ? product.name_ar : product.name}
            </span>
          </nav>

          {/* Main Product Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 mb-10 sm:mb-12 items-start">
            {/* Left: Floating Gallery (6 cols) - Sticky & Viewport Height Fitted */}
            <div className="lg:col-span-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5.5rem)] flex flex-col justify-start space-y-2.5 sm:space-y-3">
              {/* Main Image Display with Touch Swipe and Left/Right Navigation Buttons */}
              <div
                onClick={() => setIsZoomOpen(true)}
                className="aspect-square max-h-[320px] xs:max-h-[380px] sm:max-h-[460px] lg:max-h-[min(480px,calc(100vh-13rem))] w-full flex items-center justify-center relative select-none touch-pan-y cursor-zoom-in overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Active Image */}
                <img
                  key={activeImageIndex}
                  src={activeImage}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain pointer-events-none select-none transition-transform duration-300"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = "/admin/banners/accessories.jpg";
                  }}
                />

                {/* Special Offer Badge */}
                {product.original_price && (
                  <span className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-neutral-900 text-[#c5a059] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs z-10 pointer-events-none">
                    {lang === "ar" ? "خصم خاص" : "Special Offer"}
                  </span>
                )}

                {/* Counter & Zoom Indicator Badge */}
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 flex items-center gap-1 z-10 pointer-events-none">
                  <span className="bg-neutral-900/75 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-full">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                  <span className="hidden sm:inline-flex bg-neutral-900/75 backdrop-blur-xs text-[#c5a059] text-[10px] px-1.5 py-0.5 rounded-full items-center gap-0.5">
                    <ZoomIn size={11} />
                  </span>
                </div>

                {/* Previous & Next Arrow Buttons on the Image (Sleek, minimal, touch-friendly) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        lang === "ar" ? nextImage() : prevImage();
                      }}
                      className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-xs transition-all z-20 outline-none focus:outline-none cursor-pointer"
                      aria-label={lang === "ar" ? "الصورة السابقة" : "Previous image"}
                    >
                      <ChevronLeft size={18} className="rtl:rotate-180" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        lang === "ar" ? prevImage() : nextImage();
                      }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-xs transition-all z-20 outline-none focus:outline-none cursor-pointer"
                      aria-label={lang === "ar" ? "الصورة التالية" : "Next image"}
                    >
                      <ChevronRight size={18} className="rtl:rotate-180" />
                    </button>

                    {/* Pagination Indicator Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-neutral-950/40 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer outline-none focus:outline-none ${
                            activeImageIndex === idx ? "w-4 sm:w-5 bg-[#c5a059]" : "w-1.5 bg-white/70 hover:bg-white"
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Thumbnails (Clean, borderless, highlight-free, Left-aligned) */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1 px-0.5 scrollbar-none justify-start">
                  {images.map((img, idx) => {
                    const isSelected = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 shrink-0 transition-opacity duration-150 cursor-pointer relative outline-none focus:outline-none p-0.5 ${
                          isSelected ? "opacity-100 ring-1 ring-neutral-950 rounded-lg" : "opacity-40 hover:opacity-75"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/admin/banners/accessories.jpg";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Buy Box & Product Details (6 cols) */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
              <div>
                {/* SKU, Stock & Share Action */}
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-mono text-neutral-400 font-medium text-[11px] sm:text-xs">{product.product_id}</span>
                    <span className="text-neutral-300">•</span>
                    <span
                      className={`font-semibold flex items-center gap-1 text-[11px] sm:text-xs ${
                        product.stock > 0
                          ? "text-emerald-700"
                          : "text-[#9b7832] bg-[#faf6ed] border border-[#c5a059]/30 px-2 py-0.5 rounded-md"
                      }`}
                    >
                      {product.stock > 0 ? (
                        <>
                          <CheckCircle2 size={12} />
                          <span>{lang === "ar" ? "متوفر بالمخزن" : "In Stock"}</span>
                        </>
                      ) : (
                        <>
                          <Clock size={12} />
                          <span>{lang === "ar" ? "طلب مسبق (نفدت الكمية)" : "Pre-Order (Out of Stock)"}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Share / Copy Link Button */}
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share product"
                    className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 transition-colors text-[11px] sm:text-xs font-semibold cursor-pointer shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={12} className="text-emerald-600 stroke-[2.5]" />
                        <span className="text-emerald-700 font-bold">{lang === "ar" ? "تم النسخ!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={12} />
                        <span>{lang === "ar" ? "مشاركة" : "Share"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 leading-snug mb-2.5 sm:mb-3">
                  {lang === "ar" ? product.name_ar : product.name}
                </h1>

                {/* Minimal Standout Price Display */}
                <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-neutral-950 tracking-tight leading-none">
                      {formattedAmount}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#c5a059] tracking-normal uppercase">
                      {currencySymbol}
                    </span>
                  </div>

                  {formattedOriginalAmount && (
                    <span className="text-sm sm:text-base text-neutral-400 line-through font-medium">
                      {formattedOriginalAmount} {currencySymbol}
                    </span>
                  )}

                  {discountPercent !== null && discountPercent > 0 && (
                    <span className="text-[11px] sm:text-xs font-semibold text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/25">
                      {discountPercent}% {lang === "ar" ? "خصم" : "OFF"}
                    </span>
                  )}
                </div>

                {/* Action Buttons: In Stock (Stepper + Add to Cart + Instant Buy) vs Out of Stock (Pre-Order) */}
                <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                  {product.stock > 0 ? (
                    <>
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-neutral-200 rounded-xl h-11 sm:h-12 bg-white text-sm shrink-0">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-9 sm:w-10 h-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold hover:bg-neutral-50 rounded-l-xl transition cursor-pointer text-base"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 sm:w-9 text-center font-bold text-neutral-900 text-sm font-mono">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-9 sm:w-10 h-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold hover:bg-neutral-50 rounded-r-xl transition cursor-pointer text-base"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          ref={addToCartRef}
                          type="button"
                          onClick={handleAddToCart}
                          className="flex-1 h-11 sm:h-12 px-3.5 sm:px-5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer shadow-xs active-press whitespace-nowrap"
                        >
                          {addedSuccess ? (
                            <>
                              <Check size={15} />
                              <span>{lang === "ar" ? "تمت الإضافة بنجاح!" : "Added to Cart!"}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={15} />
                              <span>{lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Instant Buy Button */}
                      <button
                        type="button"
                        onClick={handleInstantBuy}
                        className="w-full h-11 sm:h-12 px-4 sm:px-5 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer shadow-xs active-press"
                      >
                        <Zap size={15} />
                        <span>{lang === "ar" ? "شراء فوري مباشر" : "Instant Buy"}</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <button
                        ref={addToCartRef}
                        type="button"
                        onClick={() => setPreOrderProduct(product)}
                        className="w-full h-12 px-4 sm:px-5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active-press"
                      >
                        <Clock size={16} />
                        <span>{lang === "ar" ? "طلب حجز مسبق الآن" : "Pre-Order Now"}</span>
                      </button>
                      <p className="text-[11px] text-neutral-500 text-center">
                        {lang === "ar"
                          ? "المنتج غير متوفر حالياً بالمخزن — يمكنك طلب حجز مسبق وسنتواصل معك فور توفره"
                          : "Currently out of stock — submit a pre-order request and we will notify you immediately"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Minimalist Trust Badges (Optimized for narrow screens) */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2 py-3 border-y border-neutral-100 text-center text-neutral-600 mb-3.5 sm:mb-4">
                  <div className="flex flex-col xs:flex-row items-center justify-center gap-1 py-0.5">
                    <ShieldCheck size={14} className="text-[#c5a059] shrink-0" />
                    <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{lang === "ar" ? "ضمان سنة" : "1-Yr Warranty"}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row items-center justify-center gap-1 py-0.5 border-x border-neutral-100">
                    <Truck size={14} className="text-[#c5a059] shrink-0" />
                    <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{lang === "ar" ? "توصيل سريع" : "Fast Shipping"}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row items-center justify-center gap-1 py-0.5">
                    <RotateCcw size={14} className="text-[#c5a059] shrink-0" />
                    <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{lang === "ar" ? "إرجاع 14 يوم" : "14-Day Return"}</span>
                  </div>
                </div>

                {/* Verified Dashboard Fit Badge */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-100 flex items-center justify-between gap-2 text-xs sm:text-sm mb-3.5 sm:mb-4">
                  <div className="flex items-center gap-2 text-neutral-700 min-w-0">
                    <Car size={15} className="text-[#c5a059] shrink-0" />
                    <span className="font-medium text-[11px] sm:text-xs leading-snug">{lang === "ar" ? "تركيب أصلي بدون حفر أو إتلاف ديكور السيارة" : "100% Tool-Free Dashboard Snap Fit"}</span>
                  </div>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0 text-[11px] sm:text-xs">
                    <CheckCircle2 size={13} />
                    <span>{lang === "ar" ? "معتمد" : "Verified"}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3.5 sm:mb-4">
                  {lang === "ar" ? product.description_ar || product.description : product.description}
                </p>

                {/* Key Features List */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-700 pb-1">
                    {product.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={13} className="text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Complete System Pairing Banner */}
              <div className="mt-3 sm:mt-4 p-3 rounded-xl border border-neutral-200/70 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
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
                    <p className="text-xs font-bold text-neutral-900 font-mono">
                      {formatPrice(companionProduct.price)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCompanionCombo}
                  className="w-full sm:w-auto h-8 sm:h-9 px-3.5 rounded-lg bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold transition cursor-pointer shrink-0 shadow-2xs"
                >
                  {lang === "ar" ? "أضف الاثنين" : "Add Both"}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specs && (
            <div className="border-t border-neutral-100 pt-6 sm:pt-8 mb-6 sm:mb-8">
              <h2 className="text-sm font-bold text-neutral-950 mb-3 sm:mb-4 flex items-center gap-2">
                <Layers size={15} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "المواصفات الهندسية" : "Engineering Specifications"}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-2.5 sm:p-3 bg-neutral-50/70 rounded-xl border border-neutral-100 text-xs">
                    <span className="text-[10px] sm:text-[11px] text-neutral-500 block mb-0.5 truncate">{key}</span>
                    <span className="font-semibold text-neutral-900 block truncate text-xs">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility Strip */}
          {product.compatible_cars && (
            <div className="border-t border-neutral-100 pt-6 sm:pt-8">
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
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-neutral-100 text-neutral-800 text-[11px] sm:text-xs font-medium"
                  >
                    {car}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Hardware Section (Matching container-less luxury style with generous separation) */}
          <div className="border-t border-neutral-100 pt-8 sm:pt-14 mt-8 sm:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-1">
                  {lang === "ar" ? "قطع تكميلية موصى بها" : "Complete Your Rig"}
                </p>
                <h2 className="text-lg sm:text-2xl font-light text-neutral-900 tracking-tight">
                  {lang === "ar" ? "منتجات قد " : "You Might Also "}
                  <span className="font-semibold text-neutral-950">{lang === "ar" ? "تعجبك أيضاً" : "Like"}</span>
                </h2>
              </div>
              <Link
                href="/search"
                className="text-xs font-semibold text-neutral-700 hover:text-[#c5a059] flex items-center gap-1 transition-colors"
              >
                <span>{lang === "ar" ? "تصفح الكتالوج بالكامل" : "View All Hardware"}</span>
                <ChevronRight size={13} className="rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12">
              {relatedProducts.map((relProd) => (
                <div
                  key={relProd.id}
                  className="h-full flex flex-col justify-between group select-none"
                >
                  <div>
                    {/* Pure Container-less Image */}
                    <Link
                      href={`/products/${relProd.slug}`}
                      className="block relative w-full h-36 sm:h-48 flex items-center justify-center mb-2.5 sm:mb-3 overflow-hidden"
                    >
                      <img
                        src={relProd.image}
                        alt={relProd.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/admin/banners/accessories.jpg";
                        }}
                      />
                    </Link>
                    <p className="text-[10px] font-mono text-neutral-400 mb-0.5 truncate">{relProd.product_id}</p>
                    <Link href={`/products/${relProd.slug}`}>
                      <h3 className="text-xs sm:text-sm font-medium text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#c5a059] transition-colors mb-2">
                        {lang === "ar" ? relProd.name_ar : relProd.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-1.5 mt-auto">
                    <div className="shrink-0 whitespace-nowrap">
                      <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                        {relProd.price}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-[#c5a059] ms-1">
                        {currency}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(relProd, 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 flex items-center justify-center transition cursor-pointer shrink-0 active-press shadow-2xs"
                      title={lang === "ar" ? "أضف للسلة" : "Add to Cart"}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Purchase Pill (Floating rounded rectangle, appears only when main CTA is scrolled away) */}
      <div
        className={`sm:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 shadow-xl flex items-center justify-between gap-2.5 transition-all duration-300 transform ${
          showStickyBar
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-y-16 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={activeImage}
            alt={product.name}
            className="w-10 h-10 object-contain rounded-xl bg-neutral-50 border border-neutral-200/60 p-1 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 truncate">
              {lang === "ar" ? product.name_ar : product.name}
            </h4>
            <span className="text-xs font-bold text-neutral-950 font-mono">
              {product.price}{" "}
              <span className="text-[11px] text-[#c5a059] font-bold">{currency}</span>
            </span>
          </div>
        </div>

        {product.stock > 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-xs active-press ${
              addedSuccess
                ? "bg-[#25D366] text-white"
                : "bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950"
            }`}
          >
            {addedSuccess ? (
              <>
                <Check size={14} className="stroke-[2.5]" />
                <span>{lang === "ar" ? "تمت" : "Added"}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>{lang === "ar" ? "أضف" : "Add"}</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPreOrderProduct(product)}
            className="px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 shadow-xs cursor-pointer active-press"
          >
            <Clock size={14} />
            <span>{lang === "ar" ? "طلب مسبق" : "Pre-Order"}</span>
          </button>
        )}
      </div>

      {/* Studio Image Zoom Lightbox */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-neutral-950/96 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none touch-pan-y"
            onClick={() => setIsZoomOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-3 w-full max-w-6xl mx-auto z-20"
            >
              {/* Product Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-[11px] text-[#c5a059] bg-[#c5a059]/15 px-2 py-0.5 rounded-md shrink-0">
                  {product.product_id}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-md">
                  {lang === "ar" ? product.name_ar : product.name}
                </h3>
              </div>

              {/* Counter Pill */}
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono">
                <span>{activeImageIndex + 1}</span>
                <span className="text-neutral-500">/</span>
                <span>{images.length}</span>
              </div>

              {/* Actions: Zoom Scale Toggle & Close Button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomedIn((prev) => !prev)}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={isZoomedIn ? (lang === "ar" ? "تصغير" : "Zoom out") : (lang === "ar" ? "تكبير" : "Zoom in")}
                  aria-label="Toggle zoom scale"
                >
                  {isZoomedIn ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={lang === "ar" ? "إغلاق" : "Close"}
                  aria-label="Close zoom"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Central Studio Image Stage */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomedIn((prev) => !prev);
              }}
              className={`relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden ${
                isZoomedIn ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            >
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: isZoomedIn ? 1.6 : 1,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                src={activeImage}
                alt={product.name}
                className="max-h-[72vh] sm:max-h-[76vh] max-w-[92vw] sm:max-w-[85vw] object-contain select-none pointer-events-auto"
                draggable={false}
              />

              {/* Left & Right Edge Chevrons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      lang === "ar" ? nextImage() : prevImage();
                    }}
                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer z-30 outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} className="rtl:rotate-180 drop-shadow-md" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      lang === "ar" ? prevImage() : nextImage();
                    }}
                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer z-30 outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} className="rtl:rotate-180 drop-shadow-md" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none z-20"
              >
                {images.map((img, idx) => {
                  const isSelected = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 transition-all cursor-pointer p-1 ${
                        isSelected
                          ? "opacity-100 ring-2 ring-[#c5a059] bg-white/10 scale-105"
                          : "opacity-40 hover:opacity-80 bg-white/5"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
