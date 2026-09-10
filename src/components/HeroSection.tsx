"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
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
    const targetElement = document.getElementById("hardware");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home-hero" className="relative w-full bg-white text-neutral-900 py-4 lg:py-0 lg:min-h-[calc(100dvh-4rem)] lg:flex lg:items-center border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Headline & The Front-and-Center Matcher Console (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3 sm:space-y-3.5"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-semibold mb-1">
                {lang === "ar" ? "قواعد تثبيت مخصصة بدون حفر" : "Vehicle-Specific Dashboard Mounts"}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] xl:text-[2.4rem] font-light tracking-tight text-neutral-900 leading-[1.12]">
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
              <p className="text-neutral-500 text-xs sm:text-sm font-normal leading-relaxed mt-1 max-w-xl">
                {lang === "ar"
                  ? "تثبيت محكم بالضغط داخل فواصل لوحة القيادة الأصلية. ثبات تام على الكثبان الرملية بدون أي تلف لمقصورة السيارة."
                  : "Precision snap-fit directly into factory dashboard panel seams. Unshakeable stability on desert dunes with zero drilling or adhesive damage."}
              </p>
            </div>

            {/* The Front-and-Center Selector Console */}
            <div className="bg-neutral-50/90 border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs">
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
                  <form onSubmit={handleSearchSubmit} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                        {lang === "ar" ? "ما هي السيارة التي تستخدمها؟" : "What car are you using?"}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] text-[#c5a059] font-medium">
                        {lang === "ar" ? "تطابق مصنعي 100%" : "100% Factory Match"}
                      </span>
                    </div>

                    {/* 3 Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Brand */}
                      <div>
                        <label className="block text-[11px] text-neutral-500 mb-1 font-medium">
                          {lang === "ar" ? "السيارة" : "Vehicle"}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedVehicleBrand}
                            onChange={(e) => {
                              const newBrand = e.target.value;
                              setSelectedVehicleBrand(newBrand);
                              const models = VEHICLE_MODELS[newBrand] || [];
                              setSelectedVehicleModel(models[0] || "");
                            }}
                            className="w-full appearance-none bg-white text-neutral-900 text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border border-neutral-200 focus:border-[#c5a059] focus:outline-none transition-colors duration-150 cursor-pointer"
                          >
                            <option value="" disabled>
                              {lang === "ar" ? "الماركة" : "Brand"}
                            </option>
                            {VEHICLE_BRANDS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={13} className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 sm:top-3 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Model */}
                      <div>
                        <label className="block text-[11px] text-neutral-500 mb-1 font-medium">
                          {lang === "ar" ? "الموديل" : "Vehicle Model"}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedVehicleModel}
                            onChange={(e) => setSelectedVehicleModel(e.target.value)}
                            disabled={!selectedVehicleBrand}
                            className="w-full appearance-none bg-white text-neutral-900 text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border border-neutral-200 focus:border-[#c5a059] focus:outline-none transition-colors duration-150 cursor-pointer disabled:bg-neutral-100 disabled:text-neutral-400"
                          >
                            <option value="" disabled>
                              {lang === "ar" ? "الموديل" : "Model"}
                            </option>
                            {availableVehicleModels.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={13} className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 sm:top-3 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Year */}
                      <div>
                        <label className="block text-[11px] text-neutral-500 mb-1 font-medium">
                          {lang === "ar" ? "السنة" : "Vehicle Year"}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedVehicleYear}
                            onChange={(e) => setSelectedVehicleYear(e.target.value)}
                            disabled={!selectedVehicleModel}
                            className="w-full appearance-none bg-white text-neutral-900 text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border border-neutral-200 focus:border-[#c5a059] focus:outline-none transition-colors duration-150 cursor-pointer disabled:bg-neutral-100 disabled:text-neutral-400"
                          >
                            <option value="" disabled>
                              {lang === "ar" ? "السنة" : "Year"}
                            </option>
                            {VEHICLE_YEARS.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={13} className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 sm:top-3 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-2.5 sm:py-3 px-5 rounded-lg bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 text-xs uppercase tracking-widest font-bold transition-[background-color,box-shadow] duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-[0_6px_24px_rgba(197,160,89,0.3)] active-press group"
                      >
                        <span>
                          {lang === "ar"
                            ? `عرض قاعدة ${selectedVehicleBrand} المخصصة`
                            : `View Exact Fit for ${selectedVehicleBrand}`}
                        </span>
                        <ArrowRight size={14} className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
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
                  <form onSubmit={handleSearchSubmit} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                        {lang === "ar" ? "ما هو الجهاز الذي تستخدمه؟" : "What device are you using?"}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] text-[#c5a059] font-medium">
                        {lang === "ar" ? "يدعم MagSafe" : "MagSafe Qi2 Ready"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Device Brand */}
                      <div>
                        <label className="block text-[11px] text-neutral-500 mb-1 font-medium">
                          {lang === "ar" ? "الجهاز" : "Device"}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedDeviceBrand}
                            onChange={(e) => {
                              const newDevice = e.target.value;
                              setSelectedDeviceBrand(newDevice);
                              const models = DEVICE_MODELS[newDevice] || [];
                              setSelectedDeviceModel(models[0] || "");
                            }}
                            className="w-full appearance-none bg-white text-neutral-900 text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border border-neutral-200 focus:border-[#c5a059] focus:outline-none transition-colors duration-150 cursor-pointer"
                          >
                            <option value="" disabled>
                              {lang === "ar" ? "الماركة" : "Brand"}
                            </option>
                            {DEVICE_BRANDS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={13} className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 sm:top-3 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Device Model */}
                      <div>
                        <label className="block text-[11px] text-neutral-500 mb-1 font-medium">
                          {lang === "ar" ? "موديل الجهاز" : "Device Model"}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedDeviceModel}
                            onChange={(e) => setSelectedDeviceModel(e.target.value)}
                            disabled={!selectedDeviceBrand}
                            className="w-full appearance-none bg-white text-neutral-900 text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border border-neutral-200 focus:border-[#c5a059] focus:outline-none transition-colors duration-150 cursor-pointer disabled:bg-neutral-100 disabled:text-neutral-400"
                          >
                            <option value="" disabled>
                              {lang === "ar" ? "الموديل" : "Model"}
                            </option>
                            {availableDeviceModels.map((dm) => (
                              <option key={dm} value={dm}>
                                {dm}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={13} className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 sm:top-3 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-2.5 sm:py-3 px-5 rounded-lg bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 text-xs uppercase tracking-widest font-bold transition-[background-color,box-shadow] duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-[0_6px_24px_rgba(197,160,89,0.3)] active-press group"
                      >
                        <span>
                          {lang === "ar"
                            ? `عرض حامل ${selectedDeviceBrand}`
                            : `View Compatible ${selectedDeviceBrand} Holder`}
                        </span>
                        <ArrowRight size={14} className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Feature Line */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-neutral-500 pt-0.5">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#c5a059]" />
                {lang === "ar" ? "تركيب بلمسة يد واحدة" : "30-second snap fit"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#c5a059]" />
                {lang === "ar" ? "بدون حفر أو تخريم" : "Zero holes or adhesives"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#c5a059]" />
                {lang === "ar" ? "مقاوم لحرارة 60°م" : "GCC 60°C summer endurance"}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Architectural Visual Framing (5 cols) with Live Dynamic Sync */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group">
              <div className="relative h-[280px] sm:h-[330px] lg:h-[350px] xl:h-[390px] w-full overflow-hidden">
                <img
                  src="/home-3.png"
                  alt="ProClip Cockpit Fit"
                  className="w-full h-full object-cover object-bottom group-hover:scale-[1.025] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Inset Technical Note Card - Stable Hardware-Accelerated Plaque */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-3 sm:p-3.5 rounded-xl bg-white/98 border border-neutral-200/90 text-neutral-900 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transform-gpu">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
