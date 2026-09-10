"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
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
  ArrowRight,
  ShoppingBag,
  Layers,
  ChevronRight,
  Check,
} from "lucide-react";

export default function FindPage() {
  const { lang, formatPrice, addToCart, currency } = useAppContext();

  // Step 1: Vehicle State
  const [selectedBrand, setSelectedBrand] = useState("Toyota");
  const [selectedModel, setSelectedModel] = useState("Land Cruiser LC300");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Step 2: Device State
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("Apple");
  const [selectedDeviceModel, setSelectedDeviceModel] = useState("iPhone 15 Pro Max");
  const [holderType, setHolderType] = useState<"magsafe" | "adjustable" | "offroad">("magsafe");
  const [addedSuccess, setAddedSuccess] = useState(false);

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
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

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
              {lang === "ar" ? "مطابق التثبيت الذكي" : "Vehicle Fitment Matcher"}
            </span>
          </nav>

          {/* Minimalist Section Header (Matches Home Page Model) */}
          <div className="mb-8 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
              {lang === "ar" ? "نظام التثبيت الثنائي" : "The 2-Part System"}
            </p>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-2">
              {lang === "ar" ? (
                <>
                  مطابق التثبيت <span className="font-semibold text-neutral-950">للسيارة والهاتف</span>
                </>
              ) : (
                <>
                  Find the Exact <span className="font-semibold text-neutral-950">Fitment Pair</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
              {lang === "ar"
                ? "قواعد برو كليبس تصنع بدقة لكل سيارة لتثبت في فواصل الديكور بدون حفر، وتتكامل مع حوامل الهواتف الذكية."
                : "Vehicle-specific dashboard mounts clip in tool-free, perfectly pairing with our wireless MagSafe phone holders."}
            </p>
          </div>

          {/* 2-Step Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
            {/* Left Column: Step 1 & Step 2 Selectors (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: Vehicle Base Selection */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#c5a059] text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                      <Car size={15} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "حدد نوع سيارتك وموديلها" : "Select Your Vehicle"}</span>
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {lang === "ar" ? "اختر الماركة، الموديل، وسنة الصنع" : "Choose vehicle make, model and manufacturing year"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Brand */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "الشركة المصنعة" : "Make"}
                      value={selectedBrand}
                      onChange={(newBrand) => {
                        setSelectedBrand(newBrand);
                        const models = VEHICLE_MODELS[newBrand] || [];
                        if (models.length > 0) setSelectedModel(models[0]);
                      }}
                      options={VEHICLE_BRANDS}
                      placeholder={lang === "ar" ? "اختر الماركة" : "Select Make"}
                      lang={lang}
                    />
                  </div>

                  {/* Model */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "الموديل" : "Model"}
                      value={selectedModel}
                      onChange={(val) => setSelectedModel(val)}
                      options={VEHICLE_MODELS[selectedBrand] || ["Standard Trim"]}
                      placeholder={lang === "ar" ? "اختر الموديل" : "Select Model"}
                      lang={lang}
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "سنة الصنع" : "Year"}
                      value={selectedYear}
                      onChange={(val) => setSelectedYear(val)}
                      options={VEHICLE_YEARS}
                      placeholder={lang === "ar" ? "اختر السنة" : "Select Year"}
                      lang={lang}
                    />
                  </div>
                </div>

                {/* Matched Base Minimal Preview */}
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedBase.image}
                      alt={matchedBase.name}
                      className="w-12 h-12 object-contain rounded-lg bg-white border border-neutral-200 p-1 shrink-0"
                    />
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-[#c5a059]">
                        {lang === "ar" ? "قاعدة لوحة القيادة المتطابقة" : "Matched Dashboard Base"}
                      </p>
                      <h4 className="font-semibold text-neutral-900 line-clamp-1">
                        {lang === "ar" ? matchedBase.name_ar : matchedBase.name}
                      </h4>
                      <p className="text-neutral-400 text-[11px]">
                        {selectedBrand} {selectedModel} ({selectedYear})
                      </p>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <p className="font-semibold text-neutral-950">{matchedBase.price} <span className="text-[10px] text-[#c5a059]">{currency}</span></p>
                    <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 size={10} /> {lang === "ar" ? "متوفر" : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* STEP 2: Device & Holder Selection */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059] text-neutral-950 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                      <Smartphone size={15} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "حدد جهازك وطريقة التثبيت" : "Select Device & Holder Style"}</span>
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {lang === "ar" ? "اختر ماركة الهاتف والنوع المناسب لقيادتك" : "Choose device brand, model, and preferred holding style"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Device Brand */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "ماركة الهاتف" : "Phone Brand"}
                      value={selectedDeviceBrand}
                      onChange={(newDeviceBrand) => {
                        setSelectedDeviceBrand(newDeviceBrand);
                        const devModels = DEVICE_MODELS[newDeviceBrand] || [];
                        if (devModels.length > 0) setSelectedDeviceModel(devModels[0]);
                      }}
                      options={DEVICE_BRANDS}
                      placeholder={lang === "ar" ? "اختر الماركة" : "Select Brand"}
                      lang={lang}
                    />
                  </div>

                  {/* Device Model */}
                  <div>
                    <CustomSelect
                      label={lang === "ar" ? "موديل الهاتف" : "Phone Model"}
                      value={selectedDeviceModel}
                      onChange={(val) => setSelectedDeviceModel(val)}
                      options={DEVICE_MODELS[selectedDeviceBrand] || ["Universal Size"]}
                      placeholder={lang === "ar" ? "اختر الموديل" : "Select Model"}
                      lang={lang}
                    />
                  </div>
                </div>

                {/* Holder Style Buttons */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-2">
                    {lang === "ar" ? "طريقة التثبيت والشحن" : "Mounting & Charging Style"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* MagSafe */}
                    <button
                      type="button"
                      onClick={() => setHolderType("magsafe")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "magsafe"
                          ? "bg-[#faf6ed] border-[#c5a059] text-neutral-950 font-semibold"
                          : "bg-neutral-50/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                        <Zap size={13} className="text-[#c5a059]" />
                        <span>MagSafe Fast</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "مغناطيس 15W لاسلكي" : "15W Magnetic wireless"}
                      </p>
                    </button>

                    {/* Off-road Heavy Duty */}
                    <button
                      type="button"
                      onClick={() => setHolderType("offroad")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "offroad"
                          ? "bg-[#faf6ed] border-[#c5a059] text-neutral-950 font-semibold"
                          : "bg-neutral-50/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                        <ShieldCheck size={13} className="text-[#c5a059]" />
                        <span>Heavy-Duty</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "مخمد اهتزاز للصحراء" : "Desert vibration dampener"}
                      </p>
                    </button>

                    {/* Luxury Leather */}
                    <button
                      type="button"
                      onClick={() => setHolderType("adjustable")}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        holderType === "adjustable"
                          ? "bg-[#faf6ed] border-[#c5a059] text-neutral-950 font-semibold"
                          : "bg-neutral-50/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                        <Layers size={13} className="text-[#c5a059]" />
                        <span>Luxury Leather</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {lang === "ar" ? "جلد إيطالي يدوي" : "Handcrafted Italian leather"}
                      </p>
                    </button>
                  </div>
                </div>

                {/* Matched Holder Minimal Preview */}
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedHolder.image}
                      alt={matchedHolder.name}
                      className="w-12 h-12 object-contain rounded-lg bg-white border border-neutral-200 p-1 shrink-0"
                    />
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-[#c5a059]">
                        {lang === "ar" ? "الحامل المتطابق" : "Matched Device Holder"}
                      </p>
                      <h4 className="font-semibold text-neutral-900 line-clamp-1">
                        {lang === "ar" ? matchedHolder.name_ar : matchedHolder.name}
                      </h4>
                      <p className="text-neutral-400 text-[11px]">
                        {selectedDeviceBrand} {selectedDeviceModel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <p className="font-semibold text-neutral-950">{matchedHolder.price} <span className="text-[10px] text-[#c5a059]">{currency}</span></p>
                    <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 size={10} /> {lang === "ar" ? "متوفر" : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Combo Summary (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-950">
                    {lang === "ar" ? "ملخص الباقة الثنائية" : "Complete Pair Summary"}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#9b7832] bg-[#faf6ed] border border-[#c5a059]/30 px-2 py-0.5 rounded-full">
                    {lang === "ar" ? "خصم 10%" : "Save 10%"}
                  </span>
                </div>

                {/* Items in Pair */}
                <div className="space-y-3 pb-4 border-b border-neutral-100 text-xs">
                  {/* Part 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-neutral-950 text-[#c5a059] text-[9px] font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span className="text-neutral-800 font-medium line-clamp-1 max-w-[200px]">
                        {lang === "ar" ? matchedBase.name_ar : matchedBase.name}
                      </span>
                    </div>
                    <span className="font-semibold text-neutral-900">{matchedBase.price} {currency}</span>
                  </div>

                  {/* Part 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span className="text-neutral-800 font-medium line-clamp-1 max-w-[200px]">
                        {lang === "ar" ? matchedHolder.name_ar : matchedHolder.name}
                      </span>
                    </div>
                    <span className="font-semibold text-neutral-900">{matchedHolder.price} {currency}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs pb-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>{lang === "ar" ? "السعر الإجمالي:" : "Subtotal:"}</span>
                    <span className="line-through">{comboSubtotal} {currency}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>{lang === "ar" ? "خصم الباقة (10%):" : "Bundle Discount (10%):"}</span>
                    <span>-{comboDiscount} {currency}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-950 font-bold text-sm pt-2">
                    <span>{lang === "ar" ? "الإجمالي:" : "Total:"}</span>
                    <span className="text-base font-semibold text-neutral-950">
                      {comboTotal}{" "}
                      <span className="text-xs font-medium text-[#c5a059]">{currency}</span>
                    </span>
                  </div>
                </div>

                {/* Action Button (Home Page Obsidian & Gold styling) */}
                <button
                  type="button"
                  onClick={handleAddComboToCart}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  {addedSuccess ? (
                    <>
                      <Check size={14} />
                      <span>{lang === "ar" ? "تمت إضافة الباقة للسلة!" : "Bundle Added!"}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>{lang === "ar" ? "أضف الباقة كاملة للسلة" : "Add Complete 2-Part Set"}</span>
                      <ArrowRight size={13} className="rtl:rotate-180" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400 text-center">
                  {lang === "ar"
                    ? "تركيب مباشر بدون أي حفر أو إتلاف لديكور سيارتك."
                    : "Precision snap-fit without tools, drilling, or vehicle adhesives."}
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
