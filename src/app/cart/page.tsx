"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  Trash2,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Compass,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    lang,
    cartItems,
    removeFromCart,
    updateQty,
    clearCart,
    cartSubtotalQar,
    formatPrice,
  } = useAppContext();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Shipping destination country
  const [destination, setDestination] = useState<"QA" | "GCC">("QA");

  // Shipping calculation
  const shippingCostQar =
    destination === "QA"
      ? cartSubtotalQar > 200 || cartSubtotalQar === 0
        ? 0
        : 15
      : 35; // GCC DHL Express

  const discountAmountQar = (cartSubtotalQar * discountPercent) / 100;
  const finalTotalQar = Math.max(0, cartSubtotalQar - discountAmountQar + (cartItems.length > 0 ? shippingCostQar : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleaned = couponCode.trim().toUpperCase();
    if (cleaned === "THABT10" || cleaned === "QATAR10") {
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
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12 relative">
        {/* Subtle Ambient Gold Glow in Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#c5a059]/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-[#9b7832] transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              {lang === "ar" ? "سلة المشتريات" : "Shopping Cart"}
            </span>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 flex items-center gap-3">
              <span>{lang === "ar" ? "سلة المشتريات" : "Shopping Cart"}</span>
              <span className="text-xs font-bold text-[#9b7832] bg-[#faf6ed] border border-[#c5a059]/30 px-3 py-1 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {lang === "ar" ? "قطع" : "items"}
              </span>
            </h1>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items Table (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* 2-Part Fitment Advice Banner */}
                {showTwoPartWarning && (
                  <div className="p-5 rounded-3xl bg-gradient-to-r from-[#faf6ed] to-white border border-[#c5a059]/50 flex items-start gap-3.5 shadow-xs">
                    <Sparkles size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-xs font-extrabold text-neutral-950">
                        {lang === "ar"
                          ? "تذكير مهندسي ثقة: هل نسيت القطعة الثانية؟"
                          : "ProClips Engineering Tip: Complete Your 2-Part Pair"}
                      </h4>
                      <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                        {hasBase
                          ? lang === "ar"
                            ? "لديك قاعدة تثبيت للسيارة في السلة. ستحتاج أيضاً إلى حامل هاتف لتثبيته عليها."
                            : "You have a vehicle dashboard base in your cart. You will also need a device holder to complete the setup."
                          : lang === "ar"
                          ? "لديك حامل هاتف في السلة. ستحتاج أيضاً إلى قاعدة تثبيت مخصصة لسيارتك بدون حفر."
                            : "You have a device holder in your cart. You will also need a custom vehicle base to attach it to your dashboard."}
                      </p>
                      <Link
                        href="/find"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9b7832] hover:underline mt-2"
                      >
                        <Compass size={13} />
                        <span>{lang === "ar" ? "فتح مطابق السيارات الذكي" : "Launch 2-Step Fitment Matcher"}</span>
                        <ArrowRight size={12} className="rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Items Container */}
                <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="divide-y divide-neutral-100">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/40 transition-colors"
                      >
                        {/* Image & Title */}
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-neutral-50 to-white border border-neutral-200/90 p-2 shrink-0 flex items-center justify-center shadow-2xs hover:border-[#c5a059]/40 transition"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </Link>

                          <div>
                            <span className="text-[10px] font-mono text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md border border-[#c5a059]/20 font-semibold">
                              {item.product.product_id}
                            </span>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="block text-xs sm:text-sm font-bold text-neutral-950 hover:text-[#9b7832] transition-colors mt-1 line-clamp-1"
                            >
                              {lang === "ar" ? item.product.name_ar : item.product.name}
                            </Link>
                            <p className="text-xs sm:text-sm font-black text-neutral-950 mt-1">
                              {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Stepper & Subtotal & Delete */}
                        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQty(item.product.id, -1)}
                              className="px-2.5 py-1 text-neutral-600 hover:text-neutral-950 font-bold text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-neutral-950 bg-neutral-50/70">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.product.id, 1)}
                              className="px-2.5 py-1 text-neutral-600 hover:text-neutral-950 font-bold text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Line total */}
                          <p className="text-xs sm:text-sm font-black text-neutral-950 min-w-[70px] text-right rtl:text-left">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer rounded-lg hover:bg-neutral-50"
                            title={lang === "ar" ? "حذف المنتج" : "Remove item"}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clear Cart Footer Button */}
                  <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <Link
                      href="/search"
                      className="text-neutral-700 hover:text-[#9b7832] font-bold flex items-center gap-1.5 transition"
                    >
                      <ArrowRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                      <span>{lang === "ar" ? "متابعة التسوق" : "Continue Shopping"}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-neutral-400 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                    >
                      {lang === "ar" ? "إفراغ السلة بالكامل" : "Clear Entire Cart"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout (4 cols) */}
              <div className="lg:col-span-4 space-y-4 sticky top-24">
                <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <h3 className="text-base font-black text-neutral-950">
                      {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
                    </h3>
                    <Sparkles size={16} className="text-[#c5a059]" />
                  </div>

                  {/* Delivery Country Selector */}
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
                        <Tag size={13} className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 text-[#c5a059]" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder={lang === "ar" ? "كود الخصم (مثال: THABT10)" : "Promo code (e.g. THABT10)"}
                          className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl pl-8 pr-3 rtl:pl-3 rtl:pr-8 py-2 text-xs uppercase font-semibold focus:outline-none focus:border-[#c5a059] focus:bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs"
                      >
                        {lang === "ar" ? "تطبيق" : "Apply"}
                      </button>
                    </div>

                    {couponApplied && (
                      <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 pt-1">
                        <CheckCircle2 size={12} />
                        {lang === "ar" ? "تم تطبيق خصم 10% بنجاح!" : "10% discount applied successfully!"}
                      </p>
                    )}
                    {couponError && <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>}
                  </form>

                  {/* Calculations breakdown */}
                  <div className="space-y-2.5 text-xs pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                      <span className="font-bold text-neutral-950">{formatPrice(cartSubtotalQar)}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-bold">
                        <span>{lang === "ar" ? `خصم الكوبون (${discountPercent}%):` : `Coupon Discount (${discountPercent}%):`}</span>
                        <span>-{formatPrice(discountAmountQar)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>{lang === "ar" ? "رسوم الشحن والتوصيل:" : "Estimated Shipping:"}</span>
                      <span className="font-bold text-neutral-950">
                        {shippingCostQar === 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{lang === "ar" ? "مجاني" : "Free"}</span>
                        ) : (
                          formatPrice(shippingCostQar)
                        )}
                      </span>
                    </div>

                    <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-bold text-neutral-900">{lang === "ar" ? "الإجمالي الكلي:" : "Total Amount:"}</span>
                      <span className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">{formatPrice(finalTotalQar)}</span>
                    </div>
                  </div>

                  {/* Primary CTA: Checkout */}
                  <button
                    type="button"
                    onClick={() => router.push("/checkout")}
                    className="w-full py-4 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <span>{lang === "ar" ? "المتابعة إلى الدفع والشحن" : "Proceed to Checkout"}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </button>

                  <div className="space-y-1 text-[10px] text-neutral-400 text-center">
                    <p>{lang === "ar" ? "الدفع الإلكتروني الآمن وتأكيد الطلب الفوري" : "Encrypted checkout & simulated instant order confirmation"}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200/90 p-8 max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-[#faf6ed] border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                {lang === "ar" ? "سلة مشترياتك فارغة حالياً" : "Your cart is currently empty"}
              </h3>
              <p className="text-xs text-neutral-500 mb-6 max-w-sm mx-auto leading-relaxed">
                {lang === "ar"
                  ? "استكشف أحدث قواعد برو كليبس وحوامل الأجهزة الأصلية، أو استخدم مطابق السيارات لاختيار التجهيز المناسب."
                  : "Explore our precision Swedish ProClips vehicle mounts or launch the vehicle matcher to find your fit."}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/search"
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#9b7832] text-xs font-bold transition border border-neutral-200"
                >
                  {lang === "ar" ? "تصفح الكتالوج" : "Browse Catalog"}
                </Link>
                <Link
                  href="/find"
                  className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles size={13} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "مطابق السيارات" : "Fitment Matcher"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>

      <Footer />
    </div>
  );
}
