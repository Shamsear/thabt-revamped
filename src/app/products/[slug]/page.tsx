"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
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

  const { lang, formatPrice, addToCart, currency } = useAppContext();

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
  const [checkedVehicle, setCheckedVehicle] = useState("Toyota Land Cruiser LC300");

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

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <Link
              href={`/categories/${product.category_slug || "pro-clips"}`}
              className="hover:text-neutral-900 transition"
            >
              {lang === "ar" ? "الفئة" : "Category"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <span className="text-neutral-900 font-semibold line-clamp-1 max-w-xs">
              {lang === "ar" ? product.name_ar : product.name}
            </span>
          </nav>

          {/* Main Product Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 items-start">
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="aspect-square bg-neutral-50 rounded-2xl border border-neutral-200/80 overflow-hidden flex items-center justify-center p-8 relative">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/admin/banners/accessories.jpg";
                  }}
                />

                {product.original_price && (
                  <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-neutral-900 text-[#c5a059] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {lang === "ar" ? "خصم خاص" : "Special Offer"}
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-18 h-18 rounded-xl bg-neutral-50 border p-2 shrink-0 transition-all cursor-pointer ${
                        activeImage === img
                          ? "border-neutral-900 ring-1 ring-neutral-900"
                          : "border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/admin/banners/accessories.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Reassurance Features Strip */}
              <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-3 text-center">
                <div className="p-2">
                  <ShieldCheck size={18} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-semibold text-neutral-900 text-xs sm:text-xs">{lang === "ar" ? "ضمان سنة" : "1-Year Warranty"}</p>
                  <p className="text-xs sm:text-[11px] text-neutral-500">{lang === "ar" ? "استبدال رسمي" : "GCC coverage"}</p>
                </div>
                <div className="p-2 border-x border-neutral-100">
                  <Truck size={18} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-semibold text-neutral-900 text-xs sm:text-xs">{lang === "ar" ? "توصيل سريع" : "Express Delivery"}</p>
                  <p className="text-xs sm:text-[11px] text-neutral-500">{lang === "ar" ? "جميع مناطق قطر" : "Same-day dispatch"}</p>
                </div>
                <div className="p-2">
                  <RotateCcw size={18} className="text-[#c5a059] mx-auto mb-1" />
                  <p className="font-semibold text-neutral-900 text-xs sm:text-xs">{lang === "ar" ? "إرجاع 14 يوم" : "14-Day Returns"}</p>
                  <p className="text-xs sm:text-[11px] text-neutral-500">{lang === "ar" ? "سهل وبسيط" : "Hassle-free"}</p>
                </div>
              </div>
            </div>

            {/* Right: Buy Box & Product Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                {/* SKU & Stock */}
                <div className="flex items-center gap-2.5 text-xs mb-3">
                  <span className="font-mono text-neutral-400">
                    {product.product_id}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className={`font-semibold flex items-center gap-1 ${product.stock > 0 ? "text-emerald-700" : "text-[#c5a059]"}`}>
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

                <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 leading-snug mb-3">
                  {lang === "ar" ? (
                    product.name_ar
                  ) : (
                    <>
                      {product.name.split(" - ")[0]}
                      {product.name.includes(" - ") && (
                        <span className="block font-semibold text-neutral-950 mt-1">
                          {product.name.split(" - ").slice(1).join(" - ")}
                        </span>
                      )}
                    </>
                  )}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-semibold text-neutral-950">
                    {product.price}{" "}
                    <span className="text-sm font-medium text-[#c5a059]">{currency}</span>
                  </span>
                  {product.original_price && (
                    <span className="text-sm font-normal text-neutral-400 line-through">
                      {product.original_price} {currency}
                    </span>
                  )}
                  {product.original_price && (
                    <span className="text-xs font-semibold text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md">
                      {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% {lang === "ar" ? "خصم" : "OFF"}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                  {lang === "ar" ? product.description_ar || product.description : product.description}
                </p>
              </div>

              {/* Highlights List (Direct on page, no boxed card) */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                    {lang === "ar" ? "المميزات الرئيسية" : "Key Features"}
                  </p>
                  <ul className="space-y-1.5 text-sm sm:text-xs text-neutral-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vehicle Compatibility Inline Selector */}
              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Car size={14} className="text-[#c5a059]" />
                    <span>{lang === "ar" ? "التحقق من التوافق:" : "Fitment Check:"}</span>
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{lang === "ar" ? "تطابق 100%" : "Verified Match"}</span>
                  </span>
                </div>
                <CustomSelect
                  value={checkedVehicle}
                  onChange={(val) => setCheckedVehicle(val)}
                  options={[
                    { value: "Toyota Land Cruiser LC300", label: "Toyota Land Cruiser LC300 (2022-2025)" },
                    { value: "Nissan Patrol Y62", label: "Nissan Patrol Y62 (2010-2025)" },
                    { value: "GMC Sierra / Yukon", label: "GMC Sierra / Yukon (2021-2025)" },
                    { value: "Lexus LX600", label: "Lexus LX600 (2022-2025)" },
                    { value: "Defender 110/130", label: "Land Rover Defender (2020-2025)" },
                    { value: "Universal GCC Fit", label: lang === "ar" ? "مقاس عام لجميع السيارات" : "Universal Fit for All Vehicles" },
                  ]}
                  placeholder={lang === "ar" ? "اختر سيارتك للتحقق..." : "Select vehicle to verify..."}
                  lang={lang}
                />
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-700">
                    {lang === "ar" ? "الكمية:" : "Quantity:"}
                  </span>
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-neutral-600 hover:text-neutral-900 font-bold cursor-pointer hover:bg-neutral-50"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 font-semibold text-neutral-900 bg-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-neutral-600 hover:text-neutral-900 font-bold cursor-pointer hover:bg-neutral-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3.5 sm:py-3 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-sm sm:text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
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

                  <button
                    type="button"
                    onClick={handleInstantBuy}
                    className="w-full py-3.5 sm:py-3 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 text-sm sm:text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Zap size={15} />
                    <span>{lang === "ar" ? "شراء فوري" : "Instant Buy"}</span>
                  </button>
                </div>
              </div>

              {/* Complete System Pairing Banner */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.name}
                    className="w-12 h-12 object-contain rounded-xl bg-white border border-neutral-200 p-1 shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/admin/banners/accessories.jpg";
                    }}
                  />
                  <div>
                    <p className="text-xs sm:text-[11px] text-neutral-500 font-medium">
                      {lang === "ar" ? "القطعة المكملة الموصى بها:" : "Recommended Companion:"}
                    </p>
                    <h4 className="text-sm sm:text-xs font-semibold text-neutral-900 line-clamp-1">
                      {lang === "ar" ? companionProduct.name_ar : companionProduct.name}
                    </h4>
                    <p className="text-sm sm:text-xs font-semibold text-neutral-900">
                      {companionProduct.price} <span className="text-xs text-[#c5a059]">{currency}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCompanionCombo}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border border-neutral-300 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {lang === "ar" ? "أضف الاثنين" : "Add Both"}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications & Materials */}
          {product.specs && (
            <div className="border-t border-neutral-100 pt-10 mb-12">
              <h2 className="text-base font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <Layers size={16} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "المواصفات الهندسية" : "Engineering Specifications"}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-sm sm:text-xs">
                    <span className="text-neutral-500">{key}</span>
                    <span className="font-semibold text-neutral-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility Strip */}
          {product.compatible_cars && (
            <div className="border-t border-neutral-100 pt-10">
              <h2 className="text-base font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Car size={16} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "السيارات المتوافقة المعتمدة" : "Verified Compatible Vehicles"}</span>
              </h2>
              <p className="text-xs text-neutral-500 mb-4">
                {lang === "ar"
                  ? "تم اختبار وتأكيد ملاءمة هذه القطعة للسيارات التالية بدون الحاجة إلى حفر:"
                  : "Verified tool-free snap fit for the following vehicle dashboards:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.compatible_cars.map((car, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium"
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
