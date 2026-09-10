"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomSelect } from "@/components/CustomSelect";
import { useAppContext } from "@/context/AppContext";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Tag,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    updateQty,
    removeFromCart,
    clearCart,
    cartSubtotalQar,
    formatPrice,
    lang,
    currency,
  } = useAppContext();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Delivery estimation state
  const [destination, setDestination] = useState<"QA" | "GCC">("QA");

  // Safeguarded subtotal calculation:
  // Calculate directly from cartItems with fallback to cartSubtotalQar, always defaulting to 0
  const subtotalQar =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (acc, item) =>
            acc + (Number(item?.product?.price) || 0) * (Number(item?.quantity) || 1),
          0
        )
      : Number.isFinite(cartSubtotalQar) && cartSubtotalQar >= 0
      ? cartSubtotalQar
      : 0;

  const discountAmountQar = Math.round((subtotalQar * (discountPercent || 0)) / 100);
  const shippingCostQar = destination === "QA" ? 0 : 50; // Free in Qatar, 50 QAR for GCC
  const finalTotalQar = Math.max(0, subtotalQar - discountAmountQar + shippingCostQar);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleaned = couponCode.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === "THABT10" || cleaned === "QATAR" || cleaned === "GCC10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      setCouponError(lang === "ar" ? "كوبون غير صالح. جرب THABT10" : "Invalid coupon. Try THABT10");
    }
  };

  // Check if user has only bases or only holders
  const hasBase = cartItems.some(
    (item) => item.product.category_slug === "pro-clips" || item.product.slug.includes("mount")
  );
  const hasHolder = cartItems.some(
    (item) => item.product.category_slug === "device-holders" || item.product.slug.includes("holder")
  );
  const showTwoPartWarning = cartItems.length > 0 && ((hasBase && !hasHolder) || (!hasBase && hasHolder));

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "سلة المشتريات" : "Shopping Cart"}
            </span>
          </nav>

          {/* Minimalist Section Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
                {lang === "ar" ? "الحقيبة الشخصية" : "Shopping Bag"}
              </p>
              <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
                {lang === "ar" ? (
                  <>
                    سلة <span className="font-semibold text-neutral-950">المشتريات</span>
                  </>
                ) : (
                  <>
                    Your Shopping <span className="font-semibold text-neutral-950">Cart</span>
                  </>
                )}
              </h1>
            </div>
            {cartItems.length > 0 && (
              <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {lang === "ar" ? "منتجات" : "items"}
              </span>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Cart Items (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* 2-Part Fitment Advice Banner */}
                {showTwoPartWarning && (
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3 text-xs">
                    <Sparkles size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900">
                        {lang === "ar"
                          ? "تذكير مهندسي ثقة: هل نسيت القطعة المكملة؟"
                          : "ProClips Engineering Tip: Complete Your 2-Part Setup"}
                      </h4>
                      <p className="text-neutral-500 mt-0.5 leading-relaxed text-[11px]">
                        {hasBase
                          ? lang === "ar"
                            ? "لديك قاعدة تثبيت في السلة. ستحتاج أيضاً إلى حامل هاتف لتثبيته عليها."
                            : "You have a dashboard base in your cart. You will also need a device holder to complete the setup."
                          : lang === "ar"
                          ? "لديك حامل هاتف في السلة. ستحتاج أيضاً إلى قاعدة تثبيت مخصصة لسيارتك بدون حفر."
                          : "You have a device holder in your cart. You will also need a custom vehicle base for your dashboard."}
                      </p>
                      <Link
                        href="/find"
                        className="inline-flex items-center gap-1 font-semibold text-[#c5a059] hover:underline mt-1.5"
                      >
                        <Compass size={12} />
                        <span>{lang === "ar" ? "فتح مطابق السيارات" : "Launch Vehicle Matcher"}</span>
                        <ArrowRight size={11} className="rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Items Container */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Image & Title */}
                      <div className="flex items-center gap-3.5">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-neutral-50 border border-neutral-100 p-2 shrink-0 flex items-center justify-center hover:border-neutral-300 transition"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>

                        <div>
                          <span className="text-xs font-mono text-neutral-500">
                            {item.product.product_id}
                          </span>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="block text-sm sm:text-sm font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors mt-0.5 line-clamp-1"
                          >
                            {lang === "ar" ? item.product.name_ar : item.product.name}
                          </Link>
                          <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper & Line Total & Delete */}
                      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden text-sm">
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.id, -1)}
                            className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900 font-bold cursor-pointer hover:bg-neutral-50"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-semibold text-neutral-900 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.id, 1)}
                            className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900 font-bold cursor-pointer hover:bg-neutral-50"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Total */}
                        <p className="text-sm sm:text-base font-semibold text-neutral-900 min-w-[70px] text-right rtl:text-left">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer rounded-lg hover:bg-neutral-50"
                          title={lang === "ar" ? "حذف" : "Remove"}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Cart Footer Actions */}
                  <div className="p-4 bg-neutral-50/50 flex items-center justify-between text-xs">
                    <Link
                      href="/search"
                      className="text-neutral-700 hover:text-neutral-950 font-semibold flex items-center gap-1.5 transition"
                    >
                      <ArrowRight size={12} className="rtl:rotate-180" />
                      <span>{lang === "ar" ? "متابعة التسوق" : "Continue Shopping"}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-neutral-400 hover:text-neutral-700 font-medium transition-colors cursor-pointer"
                    >
                      {lang === "ar" ? "إفراغ السلة" : "Clear Cart"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="lg:col-span-4 space-y-4 sticky top-24">
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 space-y-4">
                  <h3 className="text-sm font-bold text-neutral-950 pb-3 border-b border-neutral-100">
                    {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
                  </h3>

                  {/* Delivery Destination */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "وجهة التوصيل" : "Delivery Destination"}
                      value={destination}
                      onChange={(val) => setDestination(val as any)}
                      options={[
                        {
                          value: "QA",
                          label: lang === "ar" ? "دولة قطر (توصيل فوري 24 ساعة)" : "Qatar (24h Express Delivery)",
                        },
                        {
                          value: "GCC",
                          label: lang === "ar" ? "دول الخليج (DHL Express 2-4 أيام)" : "GCC Countries (DHL Express 2-4 Days)",
                        },
                      ]}
                      lang={lang}
                    />
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder={lang === "ar" ? "كود الخصم (THABT10)" : "Promo code (THABT10)"}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-8 pr-3 rtl:pl-3 rtl:pr-8 py-2.5 text-sm sm:text-xs uppercase font-medium focus:outline-none focus:border-[#c5a059] focus:bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm sm:text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        {lang === "ar" ? "تطبيق" : "Apply"}
                      </button>
                    </div>

                    {couponApplied && (
                      <p className="text-xs text-emerald-700 font-medium flex items-center gap-1 pt-0.5">
                        <CheckCircle2 size={12} />
                        {lang === "ar" ? "تم تطبيق خصم 10%!" : "10% discount applied!"}
                      </p>
                    )}
                    {couponError && <p className="text-xs text-neutral-500">{couponError}</p>}
                  </form>

                  {/* Calculations */}
                  <div className="space-y-2.5 text-sm sm:text-xs pt-3 border-t border-neutral-100">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                      <span className="font-semibold text-neutral-900">
                        {formatPrice(subtotalQar)}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-medium">
                        <span>{lang === "ar" ? `خصم الكوبون (${discountPercent}%):` : `Discount (${discountPercent}%):`}</span>
                        <span>-{formatPrice(discountAmountQar)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>{lang === "ar" ? "الشحن والتوصيل:" : "Shipping:"}</span>
                      <span className="font-semibold text-neutral-900">
                        {shippingCostQar === 0 ? (
                          <span className="text-emerald-700 font-medium">{lang === "ar" ? "مجاني" : "Free"}</span>
                        ) : (
                          formatPrice(shippingCostQar)
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900">{lang === "ar" ? "الإجمالي:" : "Total:"}</span>
                      <span className="text-xl font-semibold text-neutral-950">
                        {formatPrice(finalTotalQar)}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA: Checkout */}
                  <button
                    type="button"
                    onClick={() => router.push("/checkout")}
                    className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-sm sm:text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{lang === "ar" ? "المتابعة لإتمام الشراء" : "Proceed to Checkout"}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </button>

                  <p className="text-xs text-neutral-500 text-center">
                    {lang === "ar" ? "دفع آمن وتوصيل مباشر في قطر والخليج" : "Secure payment & fast GCC delivery"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="text-center py-20 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {lang === "ar" ? "سلة مشترياتك فارغة حالياً" : "Your cart is currently empty"}
              </h3>
              <p className="text-xs text-neutral-500 mb-5">
                {lang === "ar"
                  ? "استكشف أحدث قواعد برو كليبس الأصلية أو استخدم مطابق السيارات لاختيار التجهيز المناسب."
                  : "Explore our precision vehicle mounts or launch the vehicle matcher to find your fit."}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/search"
                  className="px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition"
                >
                  {lang === "ar" ? "تصفح الكتالوج" : "Browse Catalog"}
                </Link>
                <Link
                  href="/find"
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles size={12} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "مطابق السيارات" : "Fitment Matcher"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
