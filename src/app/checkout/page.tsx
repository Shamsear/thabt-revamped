"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  ShieldCheck,
  Lock,
  ChevronRight,
  ArrowRight,
  Truck,
  Building,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { lang, cartItems, cartSubtotalQar, formatPrice } = useAppContext();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "Mohammed",
    lastName: "Al-Kuwari",
    email: "mohammed.alkuwari@gmail.com",
    phoneCode: "+974",
    phone: "5581 2940",
    country: "Qatar",
    city: "Doha",
    // Qatar Blue Plate fields
    zoneNumber: "52",
    streetNumber: "990",
    buildingNumber: "16",
    additionalNotes: "Old Rayan near Sports Roundabout",
    shippingMethod: "express_qatar",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If empty cart, allow browsing
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-md w-full bg-white rounded-3xl border border-neutral-200 p-8 text-center shadow-xs">
          <h2 className="text-lg font-bold text-neutral-900 mb-2">
            {lang === "ar" ? "سلة مشترياتك فارغة" : "Your cart is empty"}
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            {lang === "ar" ? "يرجى إضافة منتجات لمتابعة إتمام الطلب." : "Please add products to proceed with checkout."}
          </p>
          <Link
            href="/search"
            className="inline-block py-2.5 px-5 rounded-xl bg-neutral-950 text-white font-bold text-xs"
          >
            {lang === "ar" ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      </div>
    );
  }

  const shippingCostQar = formData.country === "Qatar" ? (cartSubtotalQar > 200 ? 0 : 15) : 35;
  const orderTotalQar = cartSubtotalQar + shippingCostQar;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Save shipping info in sessionStorage for /pay simulation
    if (typeof window !== "undefined") {
      sessionStorage.setItem("thabt_checkout_info", JSON.stringify(formData));
    }
    setTimeout(() => {
      router.push("/pay");
    }, 400);
  };

  return (
    <div className={`min-h-screen bg-[#fafaf9] text-neutral-900 ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Focused Checkout Minimal Header */}
      <header className="bg-white border-b border-neutral-200/80 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/user/images/black_logo.png" alt="Thabt" className="h-7 sm:h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-[#faf6ed] border border-[#c5a059]/30 px-3 py-1.5 rounded-full">
            <Lock size={13} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "إتمام الشراء الآمن والخاص" : "Secure Checkout Protocol"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative">
        {/* Subtle Ambient Gold Glow in Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#c5a059]/5 blur-[160px] pointer-events-none rounded-full" />

        {/* Progress Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 text-xs relative z-10">
          <div className="flex items-center gap-2 text-neutral-950 font-bold">
            <span className="w-7 h-7 rounded-full bg-neutral-950 text-[#c5a059] border border-[#c5a059]/40 flex items-center justify-center text-[11px] font-black shadow-xs">
              1
            </span>
            <span>{lang === "ar" ? "العنوان والشحن" : "Shipping & Address"}</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-[#c5a059]/40" />
          <div className="flex items-center gap-2 text-neutral-400 font-medium">
            <span className="w-7 h-7 rounded-full bg-white border border-neutral-200 text-neutral-400 flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            <span>{lang === "ar" ? "الدفع التوضيحي" : "Payment Simulation"}</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-neutral-200" />
          <div className="flex items-center gap-2 text-neutral-400 font-medium">
            <span className="w-7 h-7 rounded-full bg-white border border-neutral-200 text-neutral-400 flex items-center justify-center text-[11px] font-bold">
              3
            </span>
            <span>{lang === "ar" ? "تأكيد الطلب" : "Confirmation"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Form: Contact & Address (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <h2 className="text-base font-black text-neutral-950 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  <span>{lang === "ar" ? "بيانات العميل والتواصل" : "Contact Information"}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      {lang === "ar" ? "الاسم الأول" : "First Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/15 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      {lang === "ar" ? "اسم العائلة" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/15 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {lang === "ar" ? "البريد الإلكتروني للإشعار" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/15 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {lang === "ar" ? "رقم الهاتف للتوصيل" : "Mobile Phone Number"}
                  </label>
                  <div className="flex gap-2 items-stretch">
                    <div className="w-32 shrink-0">
                      <CustomSelect
                        value={formData.phoneCode}
                        onChange={(val) => setFormData({ ...formData, phoneCode: val })}
                        options={[
                          { value: "+974", label: "QA (+974)" },
                          { value: "+966", label: "KSA (+966)" },
                          { value: "+971", label: "UAE (+971)" },
                          { value: "+965", label: "KW (+965)" },
                          { value: "+973", label: "BH (+973)" },
                          { value: "+968", label: "OM (+968)" },
                        ]}
                        lang={lang}
                      />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone} = { ...formData, phone: e.target.value })}
                      className="flex-1 bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/15 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address (Qatar Blue Plate Format) */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-neutral-950 flex items-center gap-2">
                    <MapPin size={18} className="text-[#c5a059]" />
                    <span>{lang === "ar" ? "عنوان التوصيل" : "Delivery Address"}</span>
                  </h2>
                  <span className="text-[10px] text-[#9b7832] font-bold bg-[#faf6ed] px-2.5 py-1 rounded-full border border-[#c5a059]/30">
                    {formData.country === "Qatar"
                      ? lang === "ar"
                        ? "عنوان قطر الوطني الأزرق"
                        : "Qatar Blue Plate Standard"
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
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-[#faf6ed]/60 border border-blue-200/80 space-y-3">
                    <p className="text-[11px] font-bold text-blue-950 flex items-center gap-1.5">
                      <Building size={14} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "اللوحة الزرقاء لعنوان المبنى في قطر:" : "Qatar Blue Plate Address Numbers:"}</span>
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-900 mb-1">
                          {lang === "ar" ? "رقم المنطقة (Zone)" : "Zone No."}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 52"
                          value={formData.zoneNumber}
                          onChange={(e) => setFormData({ ...formData, zoneNumber: e.target.value })}
                          className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-950 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-900 mb-1">
                          {lang === "ar" ? "رقم الشارع (Street)" : "Street No."}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 990"
                          value={formData.streetNumber}
                          onChange={(e) => setFormData({ ...formData, streetNumber: e.target.value })}
                          className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-950 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-900 mb-1">
                          {lang === "ar" ? "رقم المبنى (Building)" : "Building No."}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 16"
                          value={formData.buildingNumber}
                          onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
                          className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-950 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard GCC Address Form */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "المدينة" : "City"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "الحي / المنطقة" : "District / Area"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {lang === "ar" ? "ملاحظات إضافية لمندوب التوصيل" : "Delivery Notes / Landmark"}
                  </label>
                  <input
                    type="text"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder={lang === "ar" ? "فيلا، شقة، علامة مميزة..." : "Villa no, landmark, preferred time..."}
                    className="w-full bg-neutral-50 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-70"
              >
                <span>{lang === "ar" ? "المتابعة لاختيار وسيلة الدفع" : "Continue to Payment Simulation"}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </button>
            </form>
          </div>

          {/* Right Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 sticky top-8 space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-black text-neutral-950 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>{lang === "ar" ? "طلبك" : "Your Order"} ({cartItems.length})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              </h3>

              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto py-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-xl bg-gradient-to-b from-neutral-50 to-white border border-neutral-200/80 p-1 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-neutral-950 line-clamp-1 max-w-[180px]">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price totals */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="font-bold text-neutral-950">{formatPrice(cartSubtotalQar)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "رسوم الشحن:" : "Shipping:"}</span>
                  <span className="font-bold text-neutral-950">
                    {shippingCostQar === 0 ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{lang === "ar" ? "مجاني" : "Free"}</span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900">{lang === "ar" ? "المجموع المستحق:" : "Total Payable:"}</span>
                  <span className="text-xl sm:text-2xl font-black text-neutral-950">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="p-4 rounded-2xl bg-[#faf6ed] border border-[#c5a059]/40 text-[11px] text-neutral-700 flex items-start gap-2.5 shadow-2xs">
              <ShieldCheck size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-950">{lang === "ar" ? "ضمان الاستبدال والتركيب" : "Official Fitment Guarantee"}</p>
                <p className="text-neutral-600 text-[10px] mt-0.5 leading-relaxed">
                  {lang === "ar"
                    ? "جميع قواعد برو كليبس وماونت إكس مغطاة بضمان رسمي من ثقة لمدة عام كامل."
                    : "All ProClips and MountX components include a 1-year replacement warranty across the GCC."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
