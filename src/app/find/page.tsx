"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  VEHICLE_BRANDS,
  VEHICLE_MODELS,
  VEHICLE_YEARS,
  DEVICE_BRANDS,
  DEVICE_MODELS,
  MOCK_ALL_PRODUCTS,
  Product,
} from "@/data/mockData";
import {
  Car,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function FindPage() {
  const { lang, formatPrice, addToCart } = useAppContext();

  // Step 1: Vehicle State
  const [selectedBrand, setSelectedBrand] = useState("Toyota");
  const [selectedModel, setSelectedModel] = useState("Land Cruiser LC300");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Step 2: Device State
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("Apple");
  const [selectedDeviceModel, setSelectedDeviceModel] = useState("iPhone 15 Pro Max");
  const [holderType, setHolderType] = useState<"magsafe" | "adjustable" | "offroad">("magsafe");

  // Matched Base: Land Cruiser or Patrol or fallback
  const matchedBase: Product =
    selectedBrand === "Nissan"
      ? MOCK_ALL_PRODUCTS.find((p) => p.slug === "nissan-patrol-y62-mount") || MOCK_ALL_PRODUCTS[0]
      : MOCK_ALL_PRODUCTS.find((p) => p.slug === "proclip-land-cruiser-lc300") || MOCK_ALL_PRODUCTS[0];

  // Matched Holder: MagSafe, Adjustable, or Heavy-Duty Off-Road
  const matchedHolder: Product =
    holderType === "magsafe"
      ? MOCK_ALL_PRODUCTS.find((p) => p.slug === "magsafe-wireless-holder") || MOCK_ALL_PRODUCTS[1]
      : holderType === "offroad"
      ? MOCK_ALL_PRODUCTS.find((p) => p.slug === "heavy-duty-tablet-mount") || MOCK_ALL_PRODUCTS[3]
      : MOCK_ALL_PRODUCTS.find((p) => p.slug === "luxury-leather-dashboard-mount") || MOCK_ALL_PRODUCTS[1];

  const comboSubtotal = matchedBase.price + matchedHolder.price;
  const comboDiscount = Math.round(comboSubtotal * 0.1); // 10% combo discount
  const comboTotal = comboSubtotal - comboDiscount;

  const handleAddComboToCart = () => {
    addToCart(matchedBase, 1);
    addToCart(matchedHolder, 1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "مطابق التثبيت الذكي" : "Vehicle & Device Matcher"}
            </span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-semibold mb-3">
              <Sparkles size={14} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "نظام التركيب الثنائي المتكامل" : "The 2-Part Precision Mounting System"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3">
              {lang === "ar"
                ? "اختر سيارتك وهاتفك للحصول على التركيب المثالي"
                : "Find the Perfect Mount for Your Vehicle & Phone"}
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              {lang === "ar"
                ? "قواعد برو كليبس تصنع بدقة متناهية لكل سيارة لتركب في فواصل الطبلون بدون أي حفر أو مسامير، وتتكامل مع حوامل الهواتف الذكية مع شحن ماج سيف السريع."
                : "Swedish-engineered vehicle bases snap directly into your dashboard seams without drilling, screws, or suction cups, perfectly pairing with our vibration-tested wireless phone holders."}
            </p>
          </div>

          {/* 2-Step Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Column: Step 1 & Step 2 Selectors (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: Vehicle Base Selection */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                      <Car size={18} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "الخطوة الأولى: حدد سيارتك" : "Step 1: Select Your Vehicle"}</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      {lang === "ar" ? "اختر الماركة، الموديل، وسنة الصنع" : "Choose vehicle make, model and manufacturing year"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Brand */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      {lang === "ar" ? "الشركة المصنعة" : "Make"}
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        const newBrand = e.target.value;
                        setSelectedBrand(newBrand);
                        const models = VEHICLE_MODELS[newBrand] || [];
                        if (models.length > 0) setSelectedModel(models[0]);
                      }}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                    >
                      {VEHICLE_BRANDS.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      {lang === "ar" ? "الموديل" : "Model"}
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                    >
                      {(VEHICLE_MODELS[selectedBrand] || ["Standard Trim"]).map((mod) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      {lang === "ar" ? "سنة الصنع" : "Year"}
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                    >
                      {VEHICLE_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Matched Base Quick Preview Card */}
                <div className="mt-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedBase.image}
                      alt={matchedBase.name}
                      className="w-14 h-14 object-cover rounded-lg bg-white border border-neutral-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md">
                        {lang === "ar" ? "قاعدة لوحة القيادة المتطابقة" : "Matched Dashboard Base"}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                        {lang === "ar" ? matchedBase.name_ar : matchedBase.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {selectedBrand} {selectedModel} ({selectedYear})
                      </p>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <p className="text-xs font-extrabold text-neutral-900">{formatPrice(matchedBase.price)}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={11} /> {lang === "ar" ? "متوفر بالمخزن" : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* STEP 2: Device & Holder Selection */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#c5a059] text-neutral-950 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                      <Smartphone size={18} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "الخطوة الثانية: حدد جهازك ونوع الحامل" : "Step 2: Select Device & Holder"}</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      {lang === "ar" ? "اختر هاتفك وطريقة التثبيت المفضلة لديك" : "Choose device brand, model, and preferred holding style"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Device Brand */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      {lang === "ar" ? "ماركة الهاتف" : "Phone Brand"}
                    </label>
                    <select
                      value={selectedDeviceBrand}
                      onChange={(e) => {
                        const newDeviceBrand = e.target.value;
                        setSelectedDeviceBrand(newDeviceBrand);
                        const devModels = DEVICE_MODELS[newDeviceBrand] || [];
                        if (devModels.length > 0) setSelectedDeviceModel(devModels[0]);
                      }}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                    >
                      {DEVICE_BRANDS.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Device Model */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      {lang === "ar" ? "موديل الهاتف" : "Phone Model"}
                    </label>
                    <select
                      value={selectedDeviceModel}
                      onChange={(e) => setSelectedDeviceModel(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#c5a059] focus:bg-white transition"
                    >
                      {(DEVICE_MODELS[selectedDeviceBrand] || ["Universal Size"]).map((mod) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Holder Style Radio Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    {lang === "ar" ? "طريقة التثبيت والشحن" : "Mounting & Charging Style"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* MagSafe */}
                    <button
                      type="button"
                      onClick={() => setHolderType("magsafe")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "magsafe"
                          ? "bg-[#faf6ed] border-[#c5a059] ring-1 ring-[#c5a059]"
                          : "bg-white border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                        <Zap size={14} className="text-[#c5a059]" />
                        <span>MagSafe Qi Fast</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "مغناطيس 15 واط لاسلكي" : "15W Magnetic wireless charge"}
                      </p>
                    </button>

                    {/* Off-road Heavy Duty */}
                    <button
                      type="button"
                      onClick={() => setHolderType("offroad")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "offroad"
                          ? "bg-[#faf6ed] border-[#c5a059] ring-1 ring-[#c5a059]"
                          : "bg-white border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                        <ShieldCheck size={14} className="text-[#c5a059]" />
                        <span>Heavy-Duty Off-Road</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "مخمد اهتزاز للصحراء" : "Dual-arm shock dampening"}
                      </p>
                    </button>

                    {/* Luxury Leather */}
                    <button
                      type="button"
                      onClick={() => setHolderType("adjustable")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "adjustable"
                          ? "bg-[#faf6ed] border-[#c5a059] ring-1 ring-[#c5a059]"
                          : "bg-white border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                        <Layers size={14} className="text-[#c5a059]" />
                        <span>Luxury Leather</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "جلد إيطالي فاخر يدوي" : "Handcrafted Italian leather"}
                      </p>
                    </button>
                  </div>
                </div>

                {/* Matched Holder Quick Preview Card */}
                <div className="mt-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedHolder.image}
                      alt={matchedHolder.name}
                      className="w-14 h-14 object-cover rounded-lg bg-white border border-neutral-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md">
                        {lang === "ar" ? "الحامل المتطابق" : "Matched Device Holder"}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                        {lang === "ar" ? matchedHolder.name_ar : matchedHolder.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {selectedDeviceBrand} {selectedDeviceModel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <p className="text-xs font-extrabold text-neutral-900">{formatPrice(matchedHolder.price)}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={11} /> {lang === "ar" ? "متوفر بالمخزن" : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Combo Summary & Add to Cart (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-md relative">
                {/* Gold Ribbon */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/40 text-[#9b7832] text-xs font-bold mb-4">
                  <Sparkles size={13} />
                  <span>{lang === "ar" ? "خصم الباقة المتكاملة: وفر 10%" : "Complete Pair Bundle: Save 10%"}</span>
                </div>

                <h3 className="text-base font-extrabold text-neutral-950 mb-4">
                  {lang === "ar" ? "ملخص باقة التثبيت المتكاملة" : "Complete Fitment Pair Summary"}
                </h3>

                {/* Items in Pair */}
                <div className="space-y-3 pb-5 border-b border-neutral-100">
                  {/* Part 1 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                      <span className="text-neutral-700 font-medium line-clamp-1 max-w-[200px]">
                        {lang === "ar" ? matchedBase.name_ar : matchedBase.name}
                      </span>
                    </div>
                    <span className="font-bold text-neutral-900">{formatPrice(matchedBase.price)}</span>
                  </div>

                  {/* Part 2 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#c5a059] text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <span className="text-neutral-700 font-medium line-clamp-1 max-w-[200px]">
                        {lang === "ar" ? matchedHolder.name_ar : matchedHolder.name}
                      </span>
                    </div>
                    <span className="font-bold text-neutral-900">{formatPrice(matchedHolder.price)}</span>
                  </div>
                </div>

                {/* Calculations */}
                <div className="py-4 space-y-2 text-xs border-b border-neutral-100">
                  <div className="flex items-center justify-between text-neutral-500">
                    <span>{lang === "ar" ? "سعر القطعتين منفردتين:" : "Separate Items Price:"}</span>
                    <span className="line-through">{formatPrice(comboSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-bold">
                    <span>{lang === "ar" ? "خصم الباقة المزدوجة (10%):" : "Pair Bundle Discount (10%):"}</span>
                    <span>-{formatPrice(comboDiscount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-950 font-extrabold text-base pt-2">
                    <span>{lang === "ar" ? "الإجمالي للباقة:" : "Bundle Total:"}</span>
                    <span className="text-[#9b7832] text-lg font-black">{formatPrice(comboTotal)}</span>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div className="grid grid-cols-2 gap-2 my-4 text-[10px] text-neutral-600">
                  <div className="p-2 bg-neutral-50 rounded-lg flex items-center gap-1.5 border border-neutral-100">
                    <ShieldCheck size={14} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "ضمان استبدال لسنة كاملة" : "1-Year GCC Warranty"}</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded-lg flex items-center gap-1.5 border border-neutral-100">
                    <Zap size={14} className="text-[#c5a059] shrink-0" />
                    <span>{lang === "ar" ? "توصيل خلال 24 ساعة بقطر" : "24h Express Delivery"}</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleAddComboToCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer group"
                >
                  <ShoppingBag size={16} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "أضف الباقة المتكاملة إلى السلة" : "Add Complete 2-Part Set to Cart"}</span>
                  <ArrowRight size={14} className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-neutral-400 text-center mt-3">
                  {lang === "ar"
                    ? "تركيب مباشر بدون أي حفر، لاصق، أو إتلاف لديكور سيارتك."
                    : "Precision snap-fit without tools, drilling, or vehicle dashboard adhesives."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
