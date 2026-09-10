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
  X,
  ArrowRight,
  Compass,
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
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "معرض صور التركيبات" : "Customer Builds Gallery"}
            </span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 block">
              {lang === "ar" ? "تركيبات حقيقية في قطر" : "Real Customer Setups"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-3">
              {lang === "ar" ? "معرض تركيبات " : "Customer Installation "}
              <span className="font-semibold text-neutral-950">{lang === "ar" ? "عملاء ثقة" : "Gallery"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {lang === "ar"
                ? "شاهد كيف تبدو قواعد برو كليبس وحوامل الهواتف بعد تركيبها بدقة متناهية على لوحة قيادة سيارات الدفع الرباعي الفاخرة بدون أي حفر أو إتلاف."
                : "Explore real-world fitments inside luxury SUVs and desert cruisers across Qatar and the GCC without drilling a single hole."}
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
              className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                selectedBrand === "all"
                  ? "bg-neutral-900 text-[#c5a059]"
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              {lang === "ar" ? "جميع السيارات" : "All Vehicles"}
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                  selectedBrand === b
                    ? "bg-neutral-900 text-[#c5a059]"
                    : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
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
                className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[#c5a059] text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                      <span>{lang === "ar" ? "عرض تفاصيل القطع" : "View Fitment"}</span>
                      <ArrowRight size={13} className="rtl:rotate-180" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-neutral-950/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {item.vehicle}
                  </span>
                </div>

                {/* Card Footer */}
                <div className="p-4 sm:p-5 space-y-1">
                  <h3 className="text-sm font-semibold text-neutral-950 group-hover:text-[#9b7832] transition-colors">
                    {lang === "ar" ? item.title_ar : item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#c5a059]"></span>
                    <span>{item.mounting_base} + {item.device_holder}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-base font-semibold text-neutral-950 mb-2">
              {lang === "ar" ? "هل ترغب في الحصول على نفس المظهر لسيارتك؟" : "Want the exact same clean setup for your car?"}
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              {lang === "ar"
                ? "استخدم مطابق السيارات الذكي لاختيار القطع المتوافقة تماماً مع طبلون سيارتك وموديل هاتفك."
                : "Use our interactive fitment matcher to pair your specific vehicle dashboard with the right holder."}
            </p>
            <Link
              href="/find"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Compass size={15} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مطابق السيارات الآن" : "Launch Fitment Matcher"}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-neutral-200 shadow-xl">
            <div className="relative aspect-video bg-neutral-100">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                  {activeModalItem.vehicle}
                </span>
                <h3 className="text-base font-semibold text-neutral-950 mt-2">
                  {lang === "ar" ? activeModalItem.title_ar : activeModalItem.title}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs">
                <p className="font-semibold text-neutral-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                  {lang === "ar" ? "القطع المستخدمة في هذا التركيب:" : "Components used in this setup:"}
                </p>
                <div className="flex items-center justify-between text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200/80">
                  <span>1. {activeModalItem.mounting_base}</span>
                  <Link href={`/products/${activeModalItem.base_slug}`} className="text-[#9b7832] font-semibold hover:underline">
                    {lang === "ar" ? "عرض القطعة" : "View"}
                  </Link>
                </div>
                <div className="flex items-center justify-between text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200/80">
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
                  className="px-4 py-2 rounded-xl text-neutral-500 hover:text-neutral-900 text-xs font-medium cursor-pointer"
                >
                  {lang === "ar" ? "إغلاق" : "Close"}
                </button>
                <Link
                  href="/find"
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{lang === "ar" ? "مطابقة سيارتي" : "Match My Vehicle"}</span>
                  <ArrowRight size={13} className="rtl:rotate-180" />
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
