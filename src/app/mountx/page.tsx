"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS } from "@/data/mockData";
import {
  Shield,
  Zap,
  CheckCircle2,
  Layers,
  ShoppingBag,
  ArrowRight,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
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
    <div className="min-h-screen bg-[#0b0d11] text-neutral-100 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Flagship Hero */}
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-neutral-800/80">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
              <Link href="/" className="hover:text-white transition">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight size={12} className="rtl:rotate-180 text-neutral-600" />
              <span className="text-[#c5a059] font-medium">MountX™ Billet Series</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-bold tracking-wider uppercase">
                  <Shield size={14} />
                  <span>{lang === "ar" ? "الإصدار الرائد للطرق الوعرة" : "Flagship All-Terrain System"}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  MOUNT<span className="text-[#c5a059]">X</span>™ BILLET
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                  {lang === "ar"
                    ? "مصنوع من ألمنيوم الطائرات 6061-T6 المشغول بالتحكم الرقمي CNC. مصمم خصيصاً لتحمل الكثبان الرملية العنيفة ودرجات الحرارة القصوى لصحراء الخليج بدون أي اهتزاز."
                    : "Precision CNC-machined from solid Aerospace 6061-T6 Billet Aluminum. Engineered to withstand high-impact desert dune bashing and extreme GCC temperatures without vibration or sag."}
                </p>

                {/* Technical Specs Highlight */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">{lang === "ar" ? "المعدن" : "Material"}</p>
                    <p className="text-xs font-bold text-white mt-1">Aerospace 6061-T6</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">{lang === "ar" ? "الحرارة القصوى" : "Heat Tolerance"}</p>
                    <p className="text-xs font-bold text-[#c5a059] mt-1">-30°C to +85°C</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">{lang === "ar" ? "عزل الاهتزاز" : "Vibration Damping"}</p>
                    <p className="text-xs font-bold text-emerald-400 mt-1">Dune Tested (100%)</p>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOrderMountX}
                    className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag size={16} />
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
                    className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs text-center border border-neutral-700 transition"
                  >
                    {lang === "ar" ? "تحقق من التوافق مع سيارتك" : "Check Vehicle Fitment"}
                  </Link>
                </div>
              </div>

              {/* Right: Graphic Hero Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 shadow-2xl flex items-center justify-center group overflow-hidden">
                  <img
                    src="https://www.thabt.qa/admin/banners/accessories.jpg"
                    alt="MountX Billet"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 brightness-105"
                  />
                  <span className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-black/80 backdrop-blur-xs text-[#c5a059] text-[10px] font-mono px-3 py-1 rounded-full border border-[#c5a059]/30">
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
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                {lang === "ar" ? "هندسة تفوق متطلبات الصحراء" : "Built for the Most Demanding Dunes"}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm">
                {lang === "ar"
                  ? "صُمم ماونت إكس ليحل مشكلة سقوط حوامل الهواتف التقليدية أثناء القيادة في الطرق الوعرة ودرجات الحرارة الشديدة."
                  : "Say goodbye to melting suction cups and rattling plastic brackets during intense off-road expeditions."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#c5a059]/40 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center font-bold">
                  <Flame size={22} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === "ar" ? "مقاوم لحرارة صيف الخليج" : "Zero Heat Sag Guarantee"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "ar"
                    ? "لا ينفك ولا يذوب مهما بلغت درجة حرارة لوحة القيادة تحت شمس الخليج حتى 85 درجة مئوية."
                    : "Unlike suction cups or standard adhesives that melt in 50°C+ car interiors, MountX uses mechanical dashboard seam clamping."}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#c5a059]/40 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center font-bold">
                  <Shield size={22} />
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === "ar" ? "عزل الاهتزاز للكاميرات" : "Camera Optical Protection"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "ar"
                    ? "مزود بمخمدات اهتزاز داخلية لحماية عدسات ومثبتات الكاميرا في هواتف الآيفون وسامسونج من التلف أثناء البر."
                    : "Integrated elastomer dampeners protect your smartphone's delicate optical image sensors from engine and dune vibration frequencies."}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#c5a059]/40 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center font-bold">
                  <Award size={22} />
                </div>
                <h3 className="text-base font-bold text-white">
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
