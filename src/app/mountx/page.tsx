"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS } from "@/data/mockData";
import {
  Shield,
  ShoppingBag,
  Flame,
  Award,
  ChevronRight,
} from "lucide-react";

export default function MountXPage() {
  const { lang, formatPrice, addToCart } = useAppContext();

  // Find MountX flagship product or heavy duty
  const mountxProduct =
    MOCK_ALL_PRODUCTS.find((p) => p.slug === "heavy-duty-tablet-mount") || MOCK_ALL_PRODUCTS[3];

  const [added, setAdded] = useState(false);

  const handleOrderMountX = () => {
    addToCart(mountxProduct, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Flagship Hero */}
        <section className="relative py-14 sm:py-20 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
              <Link href="/" className="hover:text-white transition">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight size={12} className="rtl:rotate-180 text-neutral-700" />
              <span className="text-[#c5a059] font-medium">MountX™ Billet Series</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] text-xs font-semibold tracking-wider uppercase">
                  <Shield size={14} />
                  <span>{lang === "ar" ? "الإصدار الرائد للطرق الوعرة" : "Flagship All-Terrain System"}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                  MOUNT<span className="text-[#c5a059] font-bold">X</span>™ BILLET
                </h1>

                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                  {lang === "ar"
                    ? "مصنوع من ألمنيوم الطائرات 6061-T6 المشغول بالتحكم الرقمي CNC. مصمم خصيصاً لتحمل الكثبان الرملية العنيفة ودرجات الحرارة القصوى لصحراء الخليج بدون أي اهتزاز."
                    : "Precision CNC-machined from solid Aerospace 6061-T6 Billet Aluminum. Engineered to withstand high-impact desert dune bashing and extreme GCC temperatures without vibration or sag."}
                </p>

                {/* Technical Specs Highlight */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <p className="text-[10px] uppercase font-semibold text-neutral-500">{lang === "ar" ? "المعدن" : "Material"}</p>
                    <p className="text-xs font-semibold text-white mt-1">Aerospace 6061-T6</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <p className="text-[10px] uppercase font-semibold text-neutral-500">{lang === "ar" ? "الحرارة القصوى" : "Heat Tolerance"}</p>
                    <p className="text-xs font-semibold text-[#c5a059] mt-1">-30°C to +85°C</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <p className="text-[10px] uppercase font-semibold text-neutral-500">{lang === "ar" ? "عزل الاهتزاز" : "Vibration Damping"}</p>
                    <p className="text-xs font-semibold text-emerald-400 mt-1">Dune Tested (100%)</p>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOrderMountX}
                    className="w-full sm:w-auto py-3 px-7 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={15} />
                    <span>
                      {added
                        ? lang === "ar"
                          ? "تمت الإضافة بنجاح!"
                          : "Added to Cart!"
                        : lang === "ar"
                        ? `طلب ماونت إكس (${formatPrice(mountxProduct.price)})`
                        : `Order MountX System (${formatPrice(mountxProduct.price)})`}
                    </span>
                  </button>

                  <Link
                    href="/find"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs text-center border border-neutral-800 transition-colors"
                  >
                    {lang === "ar" ? "تحقق من التوافق مع سيارتك" : "Check Vehicle Fitment"}
                  </Link>
                </div>
              </div>

              {/* Right: Graphic Hero Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-2xl bg-neutral-900 border border-neutral-800 p-8 flex items-center justify-center group overflow-hidden">
                  <img
                    src="/admin/banners/accessories.jpg"
                    alt="MountX Billet"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 brightness-105"
                  />
                  <span className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-neutral-950/90 text-[#c5a059] text-[10px] font-mono px-3 py-1 rounded-full border border-[#c5a059]/30">
                    CNC 6061-T6 SPEC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Highlights Grid */}
        <section className="py-16 sm:py-20 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
                {lang === "ar" ? "هندسة فائقة" : "Precision Engineering"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
                {lang === "ar" ? "مصمم لأقسى " : "Built for the Most "}
                <span className="font-semibold text-white">{lang === "ar" ? "كثبان الصحراء" : "Demanding Dunes"}</span>
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm">
                {lang === "ar"
                  ? "صُمم ماونت إكس ليحل مشكلة سقوط حوامل الهواتف التقليدية أثناء القيادة في الطرق الوعرة ودرجات الحرارة الشديدة."
                  : "Say goodbye to melting suction cups and rattling plastic brackets during intense off-road expeditions."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 text-[#c5a059] flex items-center justify-center font-bold">
                  <Flame size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === "ar" ? "مقاوم لحرارة صيف الخليج" : "Zero Heat Sag Guarantee"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "ar"
                    ? "لا ينفك ولا يذوب مهما بلغت درجة حرارة لوحة القيادة تحت شمس الخليج حتى 85 درجة مئوية."
                    : "Unlike suction cups or standard adhesives that melt in 50°C+ car interiors, MountX uses mechanical dashboard seam clamping."}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 text-[#c5a059] flex items-center justify-center font-bold">
                  <Shield size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === "ar" ? "عزل الاهتزاز للكاميرات" : "Camera Optical Protection"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "ar"
                    ? "مزود بمخمدات اهتزاز داخلية لحماية عدسات ومثبتات الكاميرا في هواتف الآيفون وسامسونج من التلف أثناء البر."
                    : "Integrated elastomer dampeners protect your smartphone's delicate optical image sensors from engine and dune vibration frequencies."}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 text-[#c5a059] flex items-center justify-center font-bold">
                  <Award size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === "ar" ? "تشطيب أسود مؤكسد فاخر" : "Military Anodized Finish"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "ar"
                    ? "معالج بأكسدة صلبة من الدرجة العسكرية لحمايته من الخدوش، الرمال، وأشعة الشمس فوق البنفسجية."
                    : "Hard-anodized deep matte obsidian coating protects against abrasive desert sand, salt mist, and intense UV degradation."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
