"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import { CustomSelect } from "@/components/CustomSelect";
import {
  VEHICLE_BRANDS,
  VEHICLE_MODELS,
  VEHICLE_YEARS,
  DEVICE_BRANDS,
  DEVICE_MODELS,
} from "@/data/mockData";

interface HeroSectionProps {
  lang: "en" | "ar";
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"vehicle" | "device">("vehicle");

  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState("Toyota");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("Land Cruiser LC300");
  const [selectedVehicleYear, setSelectedVehicleYear] = useState("2024");

  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("Apple");
  const [selectedDeviceModel, setSelectedDeviceModel] = useState("iPhone 15 Pro Max");

  const availableVehicleModels = selectedVehicleBrand ? VEHICLE_MODELS[selectedVehicleBrand] || [] : [];
  const availableDeviceModels = selectedDeviceBrand ? DEVICE_MODELS[selectedDeviceBrand] || [] : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "vehicle") {
      router.push(`/search?brand=${encodeURIComponent(selectedVehicleBrand)}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(selectedDeviceBrand)}`);
    }
  };

  return (
    <section id="home-hero" className="relative w-full bg-white text-neutral-900 py-6 sm:py-8 lg:py-0 lg:min-h-[calc(100dvh-4rem)] lg:flex lg:items-center border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Headline & The Front-and-Center Matcher Console (7 cols) */}
          <div className="animate-lcp-fade-up lg:col-span-7 space-y-4 sm:space-y-4.5 lg:space-y-3.5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-semibold mb-1 sm:mb-1.5">
                {lang === "ar" ? "قواعد تثبيت مخصصة بدون حفر" : "Vehicle-Specific Dashboard Mounts"}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] xl:text-[2.4rem] font-light tracking-tight text-neutral-900 leading-snug sm:leading-[1.12]">
                {lang === "ar" ? (
                  <>
                    قواعد تثبيت دقيقة. <br />
                    <span className="font-semibold text-neutral-950">مصممة لسيارتك.</span>
                  </>
                ) : (
                  <>
                    Precision mounts. <br />
                    <span className="font-semibold text-neutral-950">Engineered for your vehicle.</span>
                  </>
                )}
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm font-normal leading-relaxed mt-1.5 sm:mt-1 max-w-xl">
                {lang === "ar"
                  ? "تثبيت محكم بالضغط داخل فواصل لوحة القيادة الأصلية. ثبات تام على الكثبان الرملية بدون أي تلف لمقصورة السيارة."
                  : "Precision snap-fit directly into factory dashboard panel seams. Unshakeable stability on desert dunes with zero drilling or adhesive damage."}
              </p>
            </div>

            {/* The Front-and-Center Selector Console */}
            <div className="bg-neutral-50/90 border border-neutral-200/90 rounded-2xl p-4 sm:p-4.5 shadow-xs">
              {/* Tab Toggles with Calibrated Animated Gold Sliding Indicator */}
              <LayoutGroup id="heroTabSelector">
                <div className="flex border-b border-neutral-200/80 mb-3 relative">
                  <button
                    type="button"
                    onClick={() => setActiveTab("vehicle")}
                    className={`pb-2 px-3 sm:px-4 text-xs sm:text-sm tracking-wide font-medium transition-colors duration-150 relative cursor-pointer ${
                      activeTab === "vehicle"
                        ? "text-neutral-950 font-semibold"
                        : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    <span>{lang === "ar" ? "قاعدة التثبيت (السيارة)" : "Mounting Base"}</span>
                    {activeTab === "vehicle" && (
                      <motion.span
                        layoutId="heroActiveTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("device")}
                    className={`pb-2 px-3 sm:px-4 text-xs sm:text-sm tracking-wide font-medium transition-colors duration-150 relative cursor-pointer ${
                      activeTab === "device"
                        ? "text-neutral-950 font-semibold"
                        : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    <span>{lang === "ar" ? "حامل الجهاز (الهاتف)" : "Device Holder"}</span>
                    {activeTab === "device" && (
                      <motion.span
                        layoutId="heroActiveTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                </div>
              </LayoutGroup>

              {/* Tab Forms with Simultaneous Zero-Jitter Crossfade */}
              <div className="grid grid-cols-1 items-start">
                {/* Tab 1: Vehicle Base Finder */}
                <div
                  className={`col-start-1 row-start-1 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeTab === "vehicle"
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                  aria-hidden={activeTab !== "vehicle"}
                >
                  <form onSubmit={handleSearchSubmit} className="space-y-3 sm:space-y-2.5">
                    <div className="flex items-center justify-between gap-1">
                      <h2 className="text-[10px] sm:text-[11px] uppercase tracking-normal sm:tracking-wider text-neutral-500 font-semibold whitespace-nowrap">
                        {lang === "ar" ? "ما هي السيارة التي تستخدمها؟" : "What car are you using?"}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] text-[#c5a059] font-medium whitespace-nowrap shrink-0">
                        {lang === "ar" ? "تطابق مصنعي 100%" : "100% Factory Match"}
                      </span>
                    </div>

                    {/* 3 Dropdowns: Compact 2-row layout on mobile, 3-column row on sm/lg */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {/* Brand: full-width on mobile */}
                      <div className="col-span-2 sm:col-span-1">
                        <CustomSelect
                          label={lang === "ar" ? "السيارة" : "Vehicle"}
                          value={selectedVehicleBrand}
                          onChange={(newBrand) => {
                            setSelectedVehicleBrand(newBrand);
                            const models = VEHICLE_MODELS[newBrand] || [];
                            setSelectedVehicleModel(models[0] || "");
                          }}
                          options={VEHICLE_BRANDS}
                          placeholder={lang === "ar" ? "الماركة" : "Brand"}
                          lang={lang}
                        />
                      </div>

                      {/* Model: 1 column on mobile */}
                      <div className="col-span-1">
                        <CustomSelect
                          label={lang === "ar" ? "الموديل" : "Vehicle Model"}
                          value={selectedVehicleModel}
                          onChange={(newModel) => setSelectedVehicleModel(newModel)}
                          options={availableVehicleModels}
                          placeholder={lang === "ar" ? "الموديل" : "Model"}
                          disabled={!selectedVehicleBrand}
                          disabledText={lang === "ar" ? "اختر الماركة أولاً" : "Select Brand First"}
                          lang={lang}
                        />
                      </div>

                      {/* Year: 1 column on mobile */}
                      <div className="col-span-1">
                        <CustomSelect
                          label={lang === "ar" ? "السنة" : "Vehicle Year"}
                          value={selectedVehicleYear}
                          onChange={(newYear) => setSelectedVehicleYear(newYear)}
                          options={VEHICLE_YEARS}
                          placeholder={lang === "ar" ? "السنة" : "Year"}
                          disabled={!selectedVehicleModel}
                          disabledText={lang === "ar" ? "اختر الموديل أولاً" : "Select Model First"}
                          lang={lang}
                        />
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-3 px-3 sm:px-5 rounded-xl sm:rounded-lg bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-widest font-bold transition-[background-color,box-shadow] duration-200 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs hover:shadow-[0_6px_24px_rgba(197,160,89,0.3)] active-press group"
                      >
                        <span className="whitespace-nowrap truncate">
                          {lang === "ar"
                            ? `عرض قاعدة ${selectedVehicleBrand} المخصصة`
                            : `View Exact Fit for ${selectedVehicleBrand}`}
                        </span>
                        <ArrowRight size={14} className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shrink-0" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Tab 2: Device Holder Finder */}
                <div
                  className={`col-start-1 row-start-1 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeTab === "device"
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                  aria-hidden={activeTab !== "device"}
                >
                  <form onSubmit={handleSearchSubmit} className="space-y-3 sm:space-y-2.5">
                    <div className="flex items-center justify-between gap-1">
                      <h2 className="text-[10px] sm:text-[11px] uppercase tracking-normal sm:tracking-wider text-neutral-500 font-semibold whitespace-nowrap">
                        {lang === "ar" ? "ما هو الجهاز الذي تستخدمه؟" : "What device are you using?"}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] text-[#c5a059] font-medium whitespace-nowrap shrink-0">
                        {lang === "ar" ? "يدعم MagSafe" : "MagSafe Qi2 Ready"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Device Brand */}
                      <CustomSelect
                        label={lang === "ar" ? "الجهاز" : "Device"}
                        value={selectedDeviceBrand}
                        onChange={(newDevice) => {
                          setSelectedDeviceBrand(newDevice);
                          const models = DEVICE_MODELS[newDevice] || [];
                          setSelectedDeviceModel(models[0] || "");
                        }}
                        options={DEVICE_BRANDS}
                        placeholder={lang === "ar" ? "الماركة" : "Brand"}
                        lang={lang}
                      />

                      {/* Device Model */}
                      <CustomSelect
                        label={lang === "ar" ? "موديل الجهاز" : "Device Model"}
                        value={selectedDeviceModel}
                        onChange={(newModel) => setSelectedDeviceModel(newModel)}
                        options={availableDeviceModels}
                        placeholder={lang === "ar" ? "الموديل" : "Model"}
                        disabled={!selectedDeviceBrand}
                        disabledText={lang === "ar" ? "اختر الماركة أولاً" : "Select Brand First"}
                        lang={lang}
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-3 px-3 sm:px-5 rounded-xl sm:rounded-lg bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-widest font-bold transition-[background-color,box-shadow] duration-200 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs hover:shadow-[0_6px_24px_rgba(197,160,89,0.3)] active-press group"
                      >
                        <span className="whitespace-nowrap truncate">
                          {lang === "ar"
                            ? `عرض حامل ${selectedDeviceBrand}`
                            : `View Compatible ${selectedDeviceBrand} Holder`}
                        </span>
                        <ArrowRight size={14} className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shrink-0" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Feature Badges: Clean 3-tile grid on mobile, inline checkmark row on desktop */}
            <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1.5 text-[11px] sm:text-xs text-neutral-600 pt-0.5">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-1.5 bg-neutral-100/80 sm:bg-transparent py-2 px-1 sm:p-0 rounded-xl sm:rounded-none border border-neutral-200/50 sm:border-transparent hover:border-[#c5a059]/40 transition-colors duration-200 select-none">
                <Check size={13} className="text-[#c5a059] shrink-0" />
                <span className="leading-tight font-medium sm:font-normal">{lang === "ar" ? "تركيب بلمسة" : "30s Snap Fit"}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-1.5 bg-neutral-100/80 sm:bg-transparent py-2 px-1 sm:p-0 rounded-xl sm:rounded-none border border-neutral-200/50 sm:border-transparent hover:border-[#c5a059]/40 transition-colors duration-200 select-none">
                <Check size={13} className="text-[#c5a059] shrink-0" />
                <span className="leading-tight font-medium sm:font-normal">{lang === "ar" ? "بدون حفر" : "Zero Holes"}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-1.5 bg-neutral-100/80 sm:bg-transparent py-2 px-1 sm:p-0 rounded-xl sm:rounded-none border border-neutral-200/50 sm:border-transparent hover:border-[#c5a059]/40 transition-colors duration-200 select-none">
                <Check size={13} className="text-[#c5a059] shrink-0" />
                <span className="leading-tight font-medium sm:font-normal">{lang === "ar" ? "حرارة 60°م" : "60°C Proof"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Framing (5 cols) with Live Dynamic Sync */}
          <div className="animate-lcp-fade-up lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-md group">
              {/* Image Frame: Exact 16:9 ratio to fit home-3.png without any overflow, crop, or white space */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-white">
                <img
                  src="/home-3.png"
                  alt="ProClip Cockpit Fit"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform block"
                />
              </div>

              {/* Inset Technical Note Card: Cleanly stacked directly below the exact image frame */}
              <div className="p-3.5 sm:p-4 bg-white border-t border-neutral-100 text-neutral-900">
                <motion.div
                  key={activeTab === "vehicle" ? `${selectedVehicleBrand}-${selectedVehicleModel}` : `${selectedDeviceBrand}-${selectedDeviceModel}`}
                  initial={{ opacity: 0.75 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                      {activeTab === "vehicle" ? "OEM FITMENT VERIFIED" : "DEVICE COMPATIBILITY"}
                    </span>
                    <span className="text-[11px] font-semibold text-[#c5a059] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                      {activeTab === "vehicle"
                        ? (lang === "ar" ? "ثبات مؤكد" : "Direct Fit")
                        : (lang === "ar" ? "شحن سريع" : "Fast Induction")}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-neutral-900">
                    {activeTab === "vehicle"
                      ? `${selectedVehicleBrand} ${selectedVehicleModel || ""} (${selectedVehicleYear || ""})`
                      : `${selectedDeviceBrand} ${selectedDeviceModel || ""}`}
                  </h3>

                  <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                    {activeTab === "vehicle"
                      ? (lang === "ar"
                          ? `قاعدة مخصصة تثبت في فواصل تابلوه ${selectedVehicleBrand} بدون حفر أو إعاقة للتكييف.`
                          : `Custom-molded to lock into ${selectedVehicleBrand} dash seams without blocking airflow.`)
                      : (lang === "ar"
                          ? `حامل متوافق بدقة مع ${selectedDeviceModel || "جهازك"} مع شاحن ماج سيف لاسلكي سريع.`
                          : `Precision grip tailored for ${selectedDeviceModel || "device"} with MagSafe charging.`)}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
