"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS } from "@/data/mockData";
import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpItemVariants, viewportOnce } from "@/utils/animations";
import {
  Shield,
  ShoppingBag,
  Flame,
  Award,
  ChevronRight,
  Check,
} from "lucide-react";

export default function MountXPage() {
  const { lang, formatPrice, addToCart, currency } = useAppContext();

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
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 overflow-hidden">
        {/* Flagship Hero */}
        <section className="relative py-8 sm:py-20 border-b border-neutral-100 bg-gradient-to-b from-neutral-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 mb-5 sm:mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-neutral-900 transition shrink-0">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight size={11} className="rtl:rotate-180 text-neutral-300 shrink-0" />
              <span className="text-[#c5a059] font-medium shrink-0">MountX™ Billet Series</span>
            </nav>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <motion.div variants={fadeUpItemVariants} className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
                  <Shield size={13} />
                  <span>{lang === "ar" ? "الإصدار الرائد للطرق الوعرة" : "Flagship All-Terrain System"}</span>
                </div>

                <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-950 tracking-tight leading-tight">
                  MOUNT<span className="text-[#c5a059] font-bold">X</span>™ BILLET
                </h1>

                <p className="text-xs sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                  {lang === "ar"
                    ? "مصنوع من ألمنيوم الطائرات 6061-T6 المشغول بالتحكم الرقمي CNC. مصمم خصيصاً لتحمل الكثبان الرملية العنيفة ودرجات الحرارة القصوى لصحراء الخليج بدون أي اهتزاز."
                    : "Precision CNC-machined from solid Aerospace 6061-T6 Billet Aluminum. Engineered to withstand high-impact desert dune bashing and extreme GCC temperatures without vibration or sag."}
                </p>

                {/* Technical Specs Highlight */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <div className="p-3 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70">
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-neutral-400">{lang === "ar" ? "المعدن" : "Material"}</p>
                    <p className="text-[11px] sm:text-xs font-bold text-neutral-950 mt-0.5 sm:mt-1 truncate">Aerospace 6061-T6</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70">
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-neutral-400">{lang === "ar" ? "الحرارة القصوى" : "Heat Tolerance"}</p>
                    <p className="text-[11px] sm:text-xs font-bold text-[#c5a059] mt-0.5 sm:mt-1 font-mono">-30°C to +85°C</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70">
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-neutral-400">{lang === "ar" ? "عزل الاهتزاز" : "Vibration Damping"}</p>
                    <p className="text-[11px] sm:text-xs font-bold text-emerald-700 mt-0.5 sm:mt-1">Dune Tested (100%)</p>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleOrderMountX}
                    className={`w-full sm:w-auto h-11 sm:h-12 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active-press shrink-0 ${
                      added
                        ? "bg-[#25D366] text-white"
                        : "bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={15} className="stroke-[2.5]" />
                        <span>{lang === "ar" ? "تمت الإضافة بنجاح!" : "Added to Cart!"}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>
                          {lang === "ar"
                            ? `طلب ماونت إكس (${mountxProduct.price} ${currency})`
                            : `Order MountX System (${mountxProduct.price} ${currency})`}
                        </span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/find"
                    className="w-full sm:w-auto h-11 sm:h-12 px-5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs flex items-center justify-center border border-neutral-200/80 transition-colors shrink-0 shadow-2xs"
                  >
                    {lang === "ar" ? "تحقق من التوافق مع سيارتك" : "Check Vehicle Fitment"}
                  </Link>
                </div>
              </motion.div>

              {/* Right: Graphic Hero Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl bg-neutral-100/70 border border-neutral-200/70 p-4 sm:p-8 flex items-center justify-center group overflow-hidden shadow-2xs">
                  <img
                    src="/admin/banners/accessories.jpg"
                    alt="MountX Billet"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 backdrop-blur-xs text-neutral-900 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-neutral-200 shadow-2xs">
                    CNC 6061-T6 SPEC
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Engineering Highlights Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerVariants}
          className="py-12 sm:py-20 bg-neutral-50/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <motion.div variants={fadeUpItemVariants} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-1.5 sm:mb-2 block">
                {lang === "ar" ? "هندسة فائقة" : "Precision Engineering"}
              </span>
              <h2 className="text-xl sm:text-3xl font-light text-neutral-950 mb-2">
                {lang === "ar" ? "مصمم لأقسى " : "Built for the Most "}
                <span className="font-semibold text-neutral-950">{lang === "ar" ? "كثبان الصحراء" : "Demanding Dunes"}</span>
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                {lang === "ar"
                  ? "صُمم ماونت إكس ليحل مشكلة سقوط حوامل الهواتف التقليدية أثناء القيادة في الطرق الوعرة ودرجات الحرارة الشديدة."
                  : "Say goodbye to melting suction cups and rattling plastic brackets during intense off-road expeditions."}
              </p>
            </motion.div>

            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              {/* Feature 1 */}
              <motion.div variants={fadeUpItemVariants} className="p-4 sm:p-6 rounded-2xl bg-white border border-neutral-200/70 hover:border-neutral-900 transition-colors space-y-2.5 sm:space-y-3 shadow-2xs">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#faf6ed] text-[#c5a059] flex items-center justify-center font-bold border border-[#c5a059]/20">
                  <Flame size={18} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-neutral-950">
                  {lang === "ar" ? "مقاوم لحرارة صيف الخليج" : "Zero Heat Sag Guarantee"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "ar"
                    ? "لا ينفك ولا يذوب مهما بلغت درجة حرارة لوحة القيادة تحت شمس الخليج حتى 85 درجة مئوية."
                    : "Unlike suction cups or standard adhesives that melt in 50°C+ car interiors, MountX uses mechanical dashboard seam clamping."}
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeUpItemVariants} className="p-4 sm:p-6 rounded-2xl bg-white border border-neutral-200/70 hover:border-neutral-900 transition-colors space-y-2.5 sm:space-y-3 shadow-2xs">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#faf6ed] text-[#c5a059] flex items-center justify-center font-bold border border-[#c5a059]/20">
                  <Shield size={18} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-neutral-950">
                  {lang === "ar" ? "عزل الاهتزاز للكاميرات" : "Camera Optical Protection"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "ar"
                    ? "مزود بمخمدات اهتزاز داخلية لحماية عدسات ومثبتات الكاميرا في هواتف الآيفون وسامسونج من التلف أثناء البر."
                    : "Integrated elastomer dampeners protect your smartphone's delicate optical image sensors from engine and dune vibration frequencies."}
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={fadeUpItemVariants} className="p-4 sm:p-6 rounded-2xl bg-white border border-neutral-200/70 hover:border-neutral-900 transition-colors space-y-2.5 sm:space-y-3 shadow-2xs">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#faf6ed] text-[#c5a059] flex items-center justify-center font-bold border border-[#c5a059]/20">
                  <Award size={18} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-neutral-950">
                  {lang === "ar" ? "تشطيب أسود مؤكسد فاخر" : "Military Anodized Finish"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "ar"
                    ? "معالج بأكسدة صلبة من الدرجة العسكرية لحمايته من الخدوش، الرمال، وأشعة الشمس فوق البنفسجية."
                    : "Hard-anodized deep matte obsidian coating protects against abrasive desert sand, salt mist, and intense UV degradation."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
