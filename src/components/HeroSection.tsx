"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { VEHICLE_BRANDS, VEHICLE_MODELS, VEHICLE_YEARS, DEVICE_BRANDS, DEVICE_MODELS } from "@/data/mockData";
import { Car, Smartphone, Search } from "lucide-react";

interface HeroSectionProps {
  lang: "en" | "ar";
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<"vehicle" | "device">("vehicle");

  // Vehicle Tab State
  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");
  const [selectedVehicleYear, setSelectedVehicleYear] = useState("");

  // Device Tab State
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("");
  const [selectedDeviceModel, setSelectedDeviceModel] = useState("");

  const availableVehicleModels = selectedVehicleBrand ? VEHICLE_MODELS[selectedVehicleBrand] || [] : [];
  const availableDeviceModels = selectedDeviceBrand ? DEVICE_MODELS[selectedDeviceBrand] || [] : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "vehicle") {
      alert(`Searching Vehicle Base: ${selectedVehicleBrand} ${selectedVehicleModel} (${selectedVehicleYear})`);
    } else {
      alert(`Searching Device Holder: ${selectedDeviceBrand} ${selectedDeviceModel}`);
    }
  };

  return (
    <section className="relative bg-neutral-900 text-white pt-12 pb-24 px-4 overflow-hidden min-h-[580px] flex items-center justify-center">
      {/* Background Image & Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url('https://www.thabt.qa/home-3.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-900/80 to-neutral-900/95" />

      <div className="relative max-w-4xl mx-auto text-center z-10 w-full">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md"
        >
          {lang === "ar"
            ? "حلول تثبيت مخصصة لكل مركبة"
            : "Tailored Mounting Solutions for Every Vehicle"}
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed"
        >
          {lang === "ar"
            ? "تساعدك حلولنا المبتكرة على قيادة آمنة، واستخدام مريح للهاتف بدون استخدام اليدين في جميع الأوقات."
            : "Our innovative solutions help you drive safely while enjoying hands-free navigation for any vehicle."}
        </motion.p>

        {/* Interactive Search Tab Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white/95 text-neutral-900 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl max-w-2xl mx-auto text-left border border-white/20"
        >
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("vehicle")}
              className={`flex-1 py-3 px-4 font-bold text-sm md:text-base flex items-center justify-center gap-2 border-b-2 transition ${
                activeTab === "vehicle"
                  ? "border-amber-400 text-amber-600 bg-amber-50/50 rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Car size={18} />
              <span>{lang === "ar" ? "قواعد التثبيت (للسيارة)" : "Mounting Base"}</span>
            </button>
            <button
              onClick={() => setActiveTab("device")}
              className={`flex-1 py-3 px-4 font-bold text-sm md:text-base flex items-center justify-center gap-2 border-b-2 transition ${
                activeTab === "device"
                  ? "border-amber-400 text-amber-600 bg-amber-50/50 rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Smartphone size={18} />
              <span>{lang === "ar" ? "حامل الجهاز (للهاتف)" : "Device Holder"}</span>
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-4">
            {activeTab === "vehicle" ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {lang === "ar" ? "ما هي السيارة التي تستخدمها؟" : "What Car Are You Using?"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Vehicle Brand */}
                  <div className="md:col-span-12">
                    <select
                      value={selectedVehicleBrand}
                      onChange={(e) => {
                        setSelectedVehicleBrand(e.target.value);
                        setSelectedVehicleModel("");
                      }}
                      className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white text-gray-800 font-medium"
                      required
                    >
                      <option value="" disabled hidden>
                        {lang === "ar" ? "-- اختر السيارة --" : "Select Vehicle Brand"}
                      </option>
                      {VEHICLE_BRANDS.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Model */}
                  <div className="md:col-span-6">
                    <select
                      value={selectedVehicleModel}
                      onChange={(e) => setSelectedVehicleModel(e.target.value)}
                      disabled={!selectedVehicleBrand}
                      className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white disabled:opacity-50 text-gray-800 font-medium"
                    >
                      <option value="" disabled hidden>
                        {lang === "ar" ? "-- اختر الموديل --" : "Select Model"}
                      </option>
                      {availableVehicleModels.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Year */}
                  <div className="md:col-span-6">
                    <select
                      value={selectedVehicleYear}
                      onChange={(e) => setSelectedVehicleYear(e.target.value)}
                      disabled={!selectedVehicleModel}
                      className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white disabled:opacity-50 text-gray-800 font-medium"
                    >
                      <option value="" disabled hidden>
                        {lang === "ar" ? "-- السنة --" : "Select Year"}
                      </option>
                      {VEHICLE_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {lang === "ar" ? "ما هو الجهاز الذي تستخدمه؟" : "What Device Are You Using?"}
                </p>

                <div className="space-y-3">
                  {/* Device Brand */}
                  <div>
                    <select
                      value={selectedDeviceBrand}
                      onChange={(e) => {
                        setSelectedDeviceBrand(e.target.value);
                        setSelectedDeviceModel("");
                      }}
                      className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white text-gray-800 font-medium"
                      required
                    >
                      <option value="" disabled hidden>
                        {lang === "ar" ? "-- اختر ماركة الجهاز --" : "Select Device Brand"}
                      </option>
                      {DEVICE_BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Device Model */}
                  <div>
                    <select
                      value={selectedDeviceModel}
                      onChange={(e) => setSelectedDeviceModel(e.target.value)}
                      disabled={!selectedDeviceBrand}
                      className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white disabled:opacity-50 text-gray-800 font-medium"
                    >
                      <option value="" disabled hidden>
                        {lang === "ar" ? "-- اختر موديل الجهاز --" : "Select Device Model"}
                      </option>
                      {availableDeviceModels.map((dm) => (
                        <option key={dm} value={dm}>
                          {dm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold py-3.5 px-6 rounded-full transition flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/30 text-sm md:text-base mt-4"
            >
              <Search size={18} />
              <span>{lang === "ar" ? "ابحث الآن" : "Search Mounting Base"}</span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* SVG Wave Animation Bottom */}
      <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="wave1">
          <use href="#wave-path" x="50" y="3" />
        </g>
        <g className="wave2">
          <use href="#wave-path" x="50" y="0" />
        </g>
        <g className="wave3">
          <use href="#wave-path" x="50" y="9" />
        </g>
      </svg>
    </section>
  );
};
