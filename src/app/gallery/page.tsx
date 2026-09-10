"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { MOCK_GALLERY_ITEMS, GalleryItem } from "@/data/mockData";
import {
  Camera,
  ChevronRight,
  Sparkles,
  X,
  ArrowRight,
  Car,
  Compass,
  CheckCircle2,
} from "lucide-react";

export default function GalleryPage() {
  const { lang } = useAppContext();

  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const brands = ["Toyota", "Nissan", "Land Rover", "GMC"];

  const filteredItems =
    selectedBrand === "all"
      ? MOCK_GALLERY_ITEMS
      : MOCK_GALLERY_ITEMS.filter((item) => item.vehicle_brand.toLowerCase() === selectedBrand.toLowerCase());

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "معرض صور التركيبات" : "Customer Builds Gallery"}
            </span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-semibold mb-3">
              <Camera size={14} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "تركيبات حقيقية من معارضنا في الدوحة" : "Real Customer Setups in Qatar"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3">
              {lang === "ar" ? "معرض تركيبات عملاء ثقة" : "Customer Installations Gallery"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              {lang === "ar"
                ? "شاهد كيف تبدو قواعد برو كليبس وحوامل الهواتف بعد تركيبها بدقة متناهية على لوحة قيادة سيارات الدفع الرباعي الفاخرة."
                : "Explore real-world fitments inside luxury SUVs and desert cruisers across Qatar, UAE, and Saudi Arabia without drilling a single hole."}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="max-w-xs mx-auto mb-6 sm:hidden">
            <CustomSelect
              label={lang === "ar" ? "تصفية حسب نوع السيارة" : "Filter by Vehicle"}
              value={selectedBrand}
              onChange={(val) => setSelectedBrand(val)}
              options={[
                { value: "all", label: lang === "ar" ? "جميع السيارات" : "All Vehicles" },
                ...brands.map((b) => ({ value: b, label: b })),
              ]}
              lang={lang}
            />
          </div>

          <div className="hidden sm:flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedBrand("all")}
              className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedBrand === "all"
                  ? "bg-neutral-950 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {lang === "ar" ? "جميع السيارات" : "All Vehicles"}
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                  selectedBrand === b
                    ? "bg-neutral-950 text-white"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-1.5">
                      <span>{lang === "ar" ? "عرض تفاصيل القطع" : "View Fitment Components"}</span>
                      <ArrowRight size={12} className="rtl:rotate-180" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {item.vehicle}
                  </span>
                </div>

                {/* Card Footer */}
                <div className="p-4 space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-950 group-hover:text-[#9b7832] transition">
                    {lang === "ar" ? item.title_ar : item.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {item.mounting_base} + {item.device_holder}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="bg-[#faf6ed] rounded-3xl border border-[#c5a059]/40 p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-base font-bold text-neutral-900 mb-2">
              {lang === "ar" ? "هل ترغب في الحصول على نفس المظهر لسيارتك؟" : "Want the exact same clean setup for your car?"}
            </h3>
            <p className="text-xs text-neutral-600 mb-6">
              {lang === "ar"
                ? "استخدم مطابق السيارات الذكي لاختيار القطع المتوافقة تماماً مع طبلون سيارتك وموديل هاتفك."
                : "Use our interactive fitment matcher to pair your specific vehicle dashboard with the right holder."}
            </p>
            <Link
              href="/find"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition"
            >
              <Compass size={14} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مطابق السيارات الآن" : "Launch Fitment Matcher"}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative aspect-video bg-neutral-100">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full">
                  {activeModalItem.vehicle}
                </span>
                <h3 className="text-base font-extrabold text-neutral-950 mt-1">
                  {lang === "ar" ? activeModalItem.title_ar : activeModalItem.title}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs">
                <p className="font-bold text-neutral-800">{lang === "ar" ? "القطع المستخدمة في هذا التركيب:" : "Components used in this setup:"}</p>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>1. {activeModalItem.mounting_base}</span>
                  <Link href={`/products/${activeModalItem.base_slug}`} className="text-[#9b7832] font-semibold hover:underline">
                    {lang === "ar" ? "عرض القطعة" : "View"}
                  </Link>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>2. {activeModalItem.device_holder}</span>
                  <Link href={`/products/${activeModalItem.holder_slug}`} className="text-[#9b7832] font-semibold hover:underline">
                    {lang === "ar" ? "عرض القطعة" : "View"}
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-semibold cursor-pointer"
                >
                  {lang === "ar" ? "إغلاق" : "Close"}
                </button>
                <Link
                  href="/find"
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>{lang === "ar" ? "مطابقة سيارتي" : "Match My Vehicle"}</span>
                  <ArrowRight size={12} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
