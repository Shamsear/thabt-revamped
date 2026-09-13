"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpItemVariants } from "@/utils/animations";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Building,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  ChevronDown,
  Sparkles,
  User,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { lang, cartItems, cartSubtotalQar, formatPrice, user, openAuthModal } = useAppContext();

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "Mohammed",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") || "Al-Kuwari" : "Al-Kuwari",
    email: user?.email || "mohammed.alkuwari@gmail.com",
    phoneCode: "+974",
    phone: user?.phone ? user.phone.replace("+974", "").trim() : "5581 2940",
    country: user?.country || "Qatar",
    city: user?.city || "Doha",
    // Qatar Blue Plate fields
    zoneNumber: "52",
    streetNumber: "990",
    buildingNumber: "16",
    additionalNotes: "Old Rayan near Sports Roundabout",
    shippingMethod: "express_qatar",
  });

  const handleAutoFillUser = () => {
    if (user?.isLoggedIn) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name ? user.name.split(" ")[0] : prev.firstName,
        lastName: user.name ? user.name.split(" ").slice(1).join(" ") || prev.lastName : prev.lastName,
        email: user.email || prev.email,
        phone: user.phone ? user.phone.replace("+974", "").trim() : prev.phone,
        country: user.country || prev.country,
        city: user.city || prev.city,
      }));
    } else {
      openAuthModal();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // #18: Form field touched state for inline validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));
  const fieldError = (field: string, value: string) => {
    if (!touched[field]) return null;
    if (!value.trim()) return lang === "ar" ? "هذا الحقل مطلوب" : "This field is required";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return lang === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email address";
    if (field === "phone" && value.replace(/\s/g, "").length < 7) return lang === "ar" ? "رقم هاتف غير صالح" : "Invalid phone number";
    return null;
  };

  // If empty cart, allow browsing
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200/80 p-8 text-center">
          <h2 className="text-xl font-light text-neutral-900 mb-2">
            {lang === "ar" ? "سلة مشترياتك فارغة" : "Your Cart is Empty"}
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            {lang === "ar" ? "يرجى إضافة منتجات لمتابعة إتمام الطلب." : "Please add products to proceed with checkout."}
          </p>
          <Link
            href="/search"
            className="inline-block py-2.5 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            {lang === "ar" ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      </div>
    );
  }

  const subtotalQar =
    Number.isFinite(cartSubtotalQar) && cartSubtotalQar >= 0
      ? cartSubtotalQar
      : cartItems.reduce(
        (acc, item) =>
          acc + (Number(item?.product?.price) || 0) * (Number(item?.quantity) || 1),
        0
      );
  const shippingCostQar = formData.country === "Qatar" ? (subtotalQar > 200 ? 0 : 15) : 35;
  const orderTotalQar = subtotalQar + shippingCostQar;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("thabt_checkout_info", JSON.stringify(formData));
    }
    setTimeout(() => {
      router.push("/pay");
    }, 400);
  };

  return (
    <div className={`min-h-screen bg-white text-neutral-900 ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Focused Checkout Minimal Header */}
      <header className="bg-white border-b border-neutral-200/80 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/user/images/black_logo.png" alt="Thabt" className="h-8 sm:h-9.5 md:h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#faf6ed] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full">
            <Lock size={13} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "إتمام الشراء المشفر والآمن" : "Encrypted Checkout"}</span>
          </div>
        </div>
      </header>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
        className="max-w-6xl mx-auto px-3.5 sm:px-8 py-5 sm:py-10 overflow-hidden"
      >
        {/* Responsive Checkout Stepper */}
        <motion.div variants={fadeUpItemVariants}>
          <CheckoutStepper currentStep={1} lang={lang} />
        </motion.div>

        {/* Mobile Compact Order Summary Collapsible (< lg) */}
        <div className="lg:hidden mb-5 bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setShowMobileSummary(!showMobileSummary)}
            className="w-full px-4 py-3 bg-neutral-50/70 hover:bg-neutral-100/60 flex items-center justify-between text-xs font-semibold text-neutral-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-neutral-800">
              <ShoppingBag size={15} className="text-[#c5a059]" />
              <span>
                {showMobileSummary
                  ? lang === "ar" ? "إخفاء تفاصيل الطلب" : "Hide order summary"
                  : lang === "ar" ? `عرض ملخص الطلب (${cartItems.length})` : `Show order summary (${cartItems.length})`}
              </span>
              <ChevronDown size={14} className={`text-neutral-500 transition-transform duration-200 ${showMobileSummary ? "rotate-180" : ""}`} />
            </div>
            <span className="font-bold text-neutral-950 font-mono">
              {formatPrice(orderTotalQar)}
            </span>
          </button>

          {showMobileSummary && (
            <div className="p-4 border-t border-neutral-100 divide-y divide-neutral-100">
              {/* Cart Items list */}
              <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto py-1 scrollbar-none">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-11 h-11 p-0.5 shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-950 truncate max-w-[160px]">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal breakdown */}
              <div className="pt-3 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="font-medium text-neutral-950">{formatPrice(subtotalQar)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "ar" ? "الشحن:" : "Shipping:"}</span>
                  <span className="font-medium text-neutral-950">
                    {shippingCostQar === 0 ? (
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        {lang === "ar" ? "مجاني" : "Free"}
                      </span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between font-semibold text-neutral-950">
                  <span>{lang === "ar" ? "المجموع المستحق:" : "Total Payable:"}</span>
                  <span className="text-sm font-bold text-neutral-950">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Form: Contact & Address (7 cols) */}
          <motion.div variants={fadeUpItemVariants} className="lg:col-span-7">
            {/* 1-Tap Fast Auth / Auto-Fill Banner */}
            <div className="mb-4 p-3.5 rounded-2xl bg-[#faf6ed]/90 border border-[#c5a059]/40 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white text-[#c5a059] border border-[#c5a059]/30 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-950 truncate">
                    {user?.isLoggedIn
                      ? (lang === "ar" ? `مرحباً ${user.name}` : `Fast Checkout as ${user.name}`)
                      : (lang === "ar" ? "تسجيل دخول سريع لـ 1-Step" : "Fast 1-Step Mobile Login")}
                  </p>
                  <p className="text-[11px] text-neutral-600 truncate">
                    {user?.isLoggedIn
                      ? (lang === "ar" ? "انقر لتعبئة بياناتك المحفوظة تلقائياً" : "Click to auto-fill your saved GCC details")
                      : (lang === "ar" ? "دخول برقم الجوال بدون كلمة سر للتعبئة الفورية" : "Sign in with phone OTP to auto-fill details")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoFillUser}
                className="shrink-0 text-xs font-bold text-neutral-950 bg-white hover:bg-[#c5a059] hover:text-neutral-950 px-3.5 py-2 rounded-xl border border-[#c5a059]/50 transition cursor-pointer shadow-2xs active:scale-95"
              >
                {user?.isLoggedIn
                  ? (lang === "ar" ? "⚡ تعبئة بياناتي" : "⚡ Auto-Fill")
                  : (lang === "ar" ? "⚡ دخول سريع" : "⚡ Fast Login")}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 space-y-3.5">
                <div className="border-b border-neutral-100 pb-2.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                    {lang === "ar" ? "المرحلة الأولى" : "Step 01"}
                  </span>
                  <h2 className="text-sm sm:text-base font-semibold text-neutral-950 mt-0.5">
                    {lang === "ar" ? "بيانات العميل والتواصل" : "Contact Information"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      {lang === "ar" ? "الاسم الأول" : "First Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      onBlur={() => markTouched("firstName")}
                      className={`w-full h-11 sm:h-10 bg-neutral-50/70 border rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:bg-white transition-all ${fieldError("firstName", formData.firstName) ? "border-rose-400 focus:border-rose-500" : "border-neutral-200/90 focus:border-neutral-950"}`}
                    />
                    {fieldError("firstName", formData.firstName) && (
                      <p className="text-[10px] text-rose-500 mt-0.5 font-medium">{fieldError("firstName", formData.firstName)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      {lang === "ar" ? "اسم العائلة" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      onBlur={() => markTouched("lastName")}
                      className={`w-full h-11 sm:h-10 bg-neutral-50/70 border rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:bg-white transition-all ${fieldError("lastName", formData.lastName) ? "border-rose-400 focus:border-rose-500" : "border-neutral-200/90 focus:border-neutral-950"}`}
                    />
                    {fieldError("lastName", formData.lastName) && (
                      <p className="text-[10px] text-rose-500 mt-0.5 font-medium">{fieldError("lastName", formData.lastName)}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    {lang === "ar" ? "البريد الإلكتروني للإشعار" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => markTouched("email")}
                    className={`w-full h-11 sm:h-10 bg-neutral-50/70 border rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:bg-white transition-all ${fieldError("email", formData.email) ? "border-rose-400 focus:border-rose-500" : "border-neutral-200/90 focus:border-neutral-950"}`}
                  />
                  {fieldError("email", formData.email) && (
                    <p className="text-[10px] text-rose-500 mt-0.5 font-medium">{fieldError("email", formData.email)}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    {lang === "ar" ? "رقم الهاتف للتوصيل" : "Mobile Phone Number"}
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="w-28 sm:w-32 shrink-0">
                      <CustomSelect
                        value={formData.phoneCode}
                        onChange={(val) => setFormData({ ...formData, phoneCode: val })}
                        options={[
                          { value: "+974", label: "🇶🇦 +974" },
                          { value: "+966", label: "🇸🇦 +966" },
                          { value: "+971", label: "🇦🇪 +971" },
                          { value: "+965", label: "🇰🇼 +965" },
                          { value: "+973", label: "🇧🇭 +973" },
                          { value: "+968", label: "🇴🇲 +968" },
                        ]}
                        lang={lang}
                      />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="5500 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onBlur={() => markTouched("phone")}
                      className={`flex-1 min-w-0 h-11 sm:h-10 bg-neutral-50/70 border rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:bg-white transition-all ${fieldError("phone", formData.phone) ? "border-rose-400 focus:border-rose-500" : "border-neutral-200/90 focus:border-neutral-950"}`}
                    />
                  </div>
                  {fieldError("phone", formData.phone) && (
                    <p className="text-[10px] text-rose-500 mt-0.5 font-medium">{fieldError("phone", formData.phone)}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address (Qatar Blue Plate Format) */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                      {lang === "ar" ? "المرحلة الثانية" : "Step 02"}
                    </span>
                    <h2 className="text-sm sm:text-base font-semibold text-neutral-950 mt-0.5 flex items-center gap-1.5">
                      <MapPin size={15} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "عنوان التوصيل" : "Delivery Address"}</span>
                    </h2>
                  </div>
                  <span className="text-[10px] text-[#9b7832] font-semibold bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    {formData.country === "Qatar"
                      ? lang === "ar"
                        ? "عنوان قطر الوطني الأزرق"
                        : "Qatar Blue Plate"
                      : "GCC Courier Address"}
                  </span>
                </div>

                <div>
                  <CustomSelect
                    label={lang === "ar" ? "الدولة" : "Country"}
                    value={formData.country}
                    onChange={(val) => setFormData({ ...formData, country: val })}
                    options={[
                      { value: "Qatar", label: lang === "ar" ? "دولة قطر" : "Qatar" },
                      { value: "Saudi Arabia", label: lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
                      { value: "United Arab Emirates", label: lang === "ar" ? "الإمارات العربية المتحدة" : "United Arab Emirates" },
                      { value: "Kuwait", label: lang === "ar" ? "دولة الكويت" : "Kuwait" },
                      { value: "Bahrain", label: lang === "ar" ? "مملكة البحرين" : "Bahrain" },
                      { value: "Oman", label: lang === "ar" ? "سلطنة عمان" : "Oman" },
                    ]}
                    lang={lang}
                  />
                </div>

                {formData.country === "Qatar" ? (
                  /* Qatar National Blue Plate 3-Box System */
                  <div className="p-3 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70 space-y-2.5">
                    <p className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                      <Building size={14} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "أرقام اللوحة الزرقاء لعنوان المبنى في قطر:" : "Qatar Blue Plate Address Numbers:"}</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-neutral-600 mb-1 text-center truncate">
                          {lang === "ar" ? "المنطقة" : "Zone"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="52"
                          value={formData.zoneNumber}
                          onChange={(e) => setFormData({ ...formData, zoneNumber: e.target.value })}
                          className="w-full h-11 sm:h-10 bg-white border border-neutral-200 rounded-xl px-2 text-sm sm:text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-950 text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-neutral-600 mb-1 text-center truncate">
                          {lang === "ar" ? "الشارع" : "Street"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="990"
                          value={formData.streetNumber}
                          onChange={(e) => setFormData({ ...formData, streetNumber: e.target.value })}
                          className="w-full h-11 sm:h-10 bg-white border border-neutral-200 rounded-xl px-2 text-sm sm:text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-950 text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-neutral-600 mb-1 text-center truncate">
                          {lang === "ar" ? "المبنى" : "Building"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="16"
                          value={formData.buildingNumber}
                          onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
                          className="w-full h-11 sm:h-10 bg-white border border-neutral-200 rounded-xl px-2 text-sm sm:text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-950 text-center"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard GCC Address Form */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1 font-medium">
                        {lang === "ar" ? "المدينة" : "City"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1 font-medium">
                        {lang === "ar" ? "الحي / المنطقة" : "District / Area"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-neutral-600 mb-1 font-medium">
                    {lang === "ar" ? "ملاحظات إضافية لمندوب التوصيل" : "Delivery Notes / Landmark"}
                  </label>
                  <input
                    type="text"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder={lang === "ar" ? "فيلا، شقة، علامة مميزة..." : "Villa no, landmark, preferred time..."}
                    className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-70"
              >
                <span>{lang === "ar" ? "المتابعة إلى بوابة الدفع" : "Proceed to Payment"}</span>
                <span className="text-xs opacity-80 font-mono">({formatPrice(orderTotalQar)})</span>
                <ArrowRight size={15} className="rtl:rotate-180" />
              </button>

              {/* Mobile Guarantee Bar */}
              <div className="lg:hidden p-3 rounded-xl bg-[#faf6ed]/60 border border-[#c5a059]/30 text-xs text-neutral-700 flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-[#c5a059] shrink-0" />
                <p className="text-[11px] text-neutral-600">
                  {lang === "ar"
                    ? "ضمان رسمي من ثقة لمدة عام كامل لجميع قواعد التثبيت."
                    : "Official 1-year replacement warranty on all vehicle mounts."}
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right Summary Sidebar (5 cols, desktop only) */}
          <motion.div variants={fadeUpItemVariants} className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
              <h3 className="text-sm font-semibold text-neutral-950 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>{lang === "ar" ? "طلبك" : "Your Order"} ({cartItems.length})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              </h3>

              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto py-1 scrollbar-none">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 p-0.5 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-950 line-clamp-1 max-w-[180px]">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price totals */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="font-semibold text-neutral-950">{formatPrice(subtotalQar)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "رسوم الشحن:" : "Shipping:"}</span>
                  <span className="font-semibold text-neutral-950">
                    {shippingCostQar === 0 ? (
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">{lang === "ar" ? "مجاني" : "Free"}</span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-900">{lang === "ar" ? "المجموع المستحق:" : "Total Payable:"}</span>
                  <span className="text-xl font-bold text-neutral-950">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="p-4 rounded-2xl bg-[#faf6ed]/60 border border-[#c5a059]/30 text-xs text-neutral-700 flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-950">{lang === "ar" ? "ضمان الاستبدال والتركيب" : "Official Fitment Guarantee"}</p>
                <p className="text-neutral-500 text-[11px] mt-0.5 leading-relaxed">
                  {lang === "ar"
                    ? "جميع قواعد برو كليبس وماونت إكس مغطاة بضمان رسمي من ثقة لمدة عام كامل."
                    : "All ProClips and MountX components include a 1-year replacement warranty across the GCC."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
