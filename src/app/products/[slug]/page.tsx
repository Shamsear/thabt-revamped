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
  ShieldCheck,
  Zap,
  ShoppingBag,
  CheckCircle2,
  Car,
  Layers,
  ArrowRight,
  Sparkles,
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
  const [activeImage, setActiveImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Companion recommended combo product
  const companionProduct: Product =
    product.category_slug === "pro-clips"
      ? MOCK_ALL_PRODUCTS.find((p) => p.slug === "magsafe-wireless-holder") || MOCK_ALL_PRODUCTS[1]
      : MOCK_ALL_PRODUCTS.find((p) => p.slug === "proclip-land-cruiser-lc300") || MOCK_ALL_PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <Link
              href={`/categories/${product.category_slug || "pro-clips"}`}
              className="hover:text-neutral-900 transition"
            >
              {lang === "ar" ? "الفئة" : "Category"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold line-clamp-1 max-w-xs">
              {lang === "ar" ? product.name_ar : product.name}
            </span>
          </nav>

          {/* Main Product Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-square bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm flex items-center justify-center p-6 sm:p-10">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
                />

                {product.original_price && (
                  <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {lang === "ar" ? "خصم خاص" : "Special Offer"}
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 rounded-2xl bg-white border-2 p-2 shrink-0 transition-all cursor-pointer ${
                        activeImage === img
                          ? "border-[#c5a059] shadow-xs"
                          : "border-neutral-200 hover:border-neutral-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Features Pill Strip */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2">
                  <ShieldCheck size={20} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-bold text-neutral-900 text-[11px]">{lang === "ar" ? "ضمان سنة" : "1-Year Warranty"}</p>
                  <p className="text-[9px] text-neutral-400">{lang === "ar" ? "استبدال رسمي بالخليج" : "Official GCC coverage"}</p>
                </div>
                <div className="p-2 border-x border-neutral-100">
                  <Truck size={20} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-bold text-neutral-900 text-[11px]">{lang === "ar" ? "توصيل 24 ساعة" : "24h Express"}</p>
                  <p className="text-[9px] text-neutral-400">{lang === "ar" ? "في جميع مناطق قطر" : "Same-day Qatar delivery"}</p>
                </div>
                <div className="p-2">
                  <RotateCcw size={20} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-bold text-neutral-900 text-[11px]">{lang === "ar" ? "إرجاع 14 يوم" : "14-Day Returns"}</p>
                  <p className="text-[9px] text-neutral-400">{lang === "ar" ? "بدون أي تعقيد" : "Hassle-free guarantee"}</p>
                </div>
              </div>
            </div>

            {/* Right: Buy Box & Product Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                {/* SKU & Category & Stock */}
                <div className="flex items-center gap-3 text-xs mb-2">
                  <span className="font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {product.product_id}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 size={12} />
                    <span>{product.stock > 0 ? (lang === "ar" ? "متوفر بالمخزن" : "In Stock") : (lang === "ar" ? "حجز مسبق" : "Pre-Order")}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug mb-3">
                  {lang === "ar" ? product.name_ar : product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-sm font-semibold text-neutral-400 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  {product.original_price && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% {lang === "ar" ? "وفر" : "OFF"}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4">
                  {lang === "ar" ? product.description_ar || product.description : product.description}
                </p>
              </div>

              {/* Highlights Bullet Points */}
              {product.features && product.features.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    {lang === "ar" ? "أهم المميزات التقنية" : "Key Engineering Highlights"}
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700">
                    {lang === "ar" ? "الكمية المطلوبة:" : "Quantity:"}
                  </span>
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-neutral-600 hover:text-neutral-950 font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-neutral-900 bg-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-neutral-600 hover:text-neutral-950 font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag size={16} className="text-[#c5a059]" />
                    <span>
                      {addedSuccess
                        ? lang === "ar"
                          ? "تمت الإضافة بنجاح!"
                          : "Added to Cart!"
                        : lang === "ar"
                        ? "أضف إلى السلة"
                        : "Add to Cart"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantBuy}
                    className="w-full py-3 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
                  >
                    <Zap size={16} />
                    <span>{lang === "ar" ? "شراء فوري ومباشر" : "Instant Buy"}</span>
                  </button>
                </div>
              </div>

              {/* Two-Part Complete Fitment Pairing Box */}
              <div className="bg-[#faf6ed] rounded-2xl border border-[#c5a059]/40 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9b7832] flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>{lang === "ar" ? "أكمل منظومة التثبيت الثنائية" : "Complete the 2-Part Fitment"}</span>
                  </span>
                  <span className="text-[10px] font-bold bg-[#c5a059] text-white px-2 py-0.5 rounded-full">
                    -10% {lang === "ar" ? "خصم الباقة" : "Bundle"}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.name}
                    className="w-14 h-14 object-contain rounded-xl bg-white border border-[#c5a059]/30 p-1 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {lang === "ar" ? companionProduct.name_ar : companionProduct.name}
                    </h4>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      {formatPrice(companionProduct.price)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCompanionCombo}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-50 text-neutral-900 border border-[#c5a059]/60 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>{lang === "ar" ? "أضف القطعتين معاً (وفر 10%)" : "Add Both Items to Cart (Save 10%)"}</span>
                  <ArrowRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specs && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 mb-16">
              <h2 className="text-base font-extrabold text-neutral-950 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "المواصفات الهندسية والمواد" : "Technical Specifications & Materials"}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-medium">{key}</span>
                    <span className="text-xs font-bold text-neutral-900 text-right rtl:text-left">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility Banner */}
          {product.compatible_cars && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <h2 className="text-base font-extrabold text-neutral-950 mb-3 flex items-center gap-2">
                <Car size={18} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "توافق المركبات المعتمدة" : "Verified Vehicle Compatibility"}</span>
              </h2>
              <p className="text-xs text-neutral-500 mb-4">
                {lang === "ar"
                  ? "تم اختبار هذه القطعة واعتمادها هندسياً لتركب في المقصورات التالية بمقاييس الخليج:"
                  : "Tested and verified for seamless installation on the following GCC-specification vehicles:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.compatible_cars.map((car, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold"
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
