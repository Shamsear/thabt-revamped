"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { Pagination } from "@/components/Pagination";
import { MOCK_GALLERY_ITEMS, GalleryItem } from "@/data/mockData";
import {
  Camera,
  ChevronRight,
  X,
  ArrowRight,
  Compass,
} from "lucide-react";

import { staggerContainerVariants, fadeUpItemVariants, viewportOnce } from "@/utils/animations";

const PAGE_SIZE = 12;

export default function GalleryPage() {
  const { lang } = useAppContext();

  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const brands = ["Toyota", "Nissan", "Land Rover", "GMC"];

  // Auto-center selected pill inside horizontal scroll container
  const containerRef = React.useRef<HTMLDivElement>(null);
  const galleryGridRef = React.useRef<HTMLDivElement>(null);
  const pillRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  const centerActivePill = (behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const activeEl = pillRefs.current[selectedBrand];
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const pillRect = activeEl.getBoundingClientRect();
    if (containerRect.width === 0 || pillRect.width === 0) return;

    const offsetDiff = (pillRect.left - containerRect.left) + (pillRect.width / 2) - (containerRect.width / 2);

    if (Math.abs(offsetDiff) > 3) {
      const targetScroll = container.scrollLeft + offsetDiff;
      if (behavior === "auto") {
        container.scrollLeft = targetScroll;
      } else {
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
      }
    }
  };

  React.useEffect(() => {
    centerActivePill("auto");
    const raf = requestAnimationFrame(() => centerActivePill("auto"));
    const timer = setTimeout(() => centerActivePill("smooth"), 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [selectedBrand]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand]);

  const filteredItems =
    selectedBrand === "all"
      ? MOCK_GALLERY_ITEMS
      : MOCK_GALLERY_ITEMS.filter((item) => item.vehicle_brand.toLowerCase() === selectedBrand.toLowerCase());

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (galleryGridRef.current) {
      const topOffset = galleryGridRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-5 sm:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 mb-3 sm:mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "معرض صور التركيبات" : "Customer Builds Gallery"}
            </span>
          </nav>

          {/* Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpItemVariants}
            className="text-center max-w-2xl mx-auto mb-4 sm:mb-10"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] font-semibold mb-1 sm:mb-2 block">
              {lang === "ar" ? "تركيبات حقيقية في قطر" : "Real Customer Setups"}
            </span>
            <h1 className="text-xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-1.5 sm:mb-3">
              {lang === "ar" ? "معرض تركيبات " : "Customer Installation "}
              <span className="font-semibold text-neutral-950">{lang === "ar" ? "عملاء ثقة" : "Gallery"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {lang === "ar"
                ? "شاهد كيف تبدو قواعد برو كليبس وحوامل الهواتف بعد تركيبها بدقة متناهية على لوحة قيادة سيارات الدفع الرباعي الفاخرة بدون أي حفر أو إتلاف."
                : "Explore real-world fitments inside luxury SUVs and desert cruisers across Qatar and the GCC without drilling a single hole."}
            </p>
          </motion.div>

          {/* Horizontal Animated Sliding Pill Filter Bar */}
          <div ref={containerRef} className="mb-4 sm:mb-10 overflow-x-auto scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0 flex sm:justify-center">
            <LayoutGroup id="galleryBrandPillsGroup">
              <div className="inline-flex p-1 sm:p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200/70 gap-1 sm:gap-1.5 min-w-max shadow-2xs">
                {/* All Vehicles */}
                <button
                  type="button"
                  ref={(el) => { pillRefs.current["all"] = el; }}
                  onClick={() => {
                    setSelectedBrand("all");
                    const container = containerRef.current;
                    const el = pillRefs.current["all"];
                    if (container && el) {
                      const cRect = container.getBoundingClientRect();
                      const pRect = el.getBoundingClientRect();
                      const diff = (pRect.left - cRect.left) + (pRect.width / 2) - (cRect.width / 2);
                      container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
                    }
                  }}
                  className={`relative px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap text-xs transition-colors duration-200 cursor-pointer flex items-center justify-center outline-none focus:outline-none select-none active:scale-[0.98] ${
                    selectedBrand === "all"
                      ? "text-white"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-white/60"
                  }`}
                >
                  {selectedBrand === "all" && (
                    <motion.span
                      layoutId="galleryActiveBrandPill"
                      className="absolute inset-0 bg-neutral-950 rounded-xl shadow-xs -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {selectedBrand === "all" && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />}
                    <span>{lang === "ar" ? "جميع السيارات" : "All Vehicles"}</span>
                  </span>
                </button>

                {brands.map((b) => {
                  const isSelected = selectedBrand === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      ref={(el) => { pillRefs.current[b] = el; }}
                      onClick={() => {
                        setSelectedBrand(b);
                        const container = containerRef.current;
                        const el = pillRefs.current[b];
                        if (container && el) {
                          const cRect = container.getBoundingClientRect();
                          const pRect = el.getBoundingClientRect();
                          const diff = (pRect.left - cRect.left) + (pRect.width / 2) - (cRect.width / 2);
                          container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
                        }
                      }}
                      className={`relative px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap text-xs transition-colors duration-200 cursor-pointer flex items-center justify-center outline-none focus:outline-none select-none active:scale-[0.98] ${
                        isSelected
                          ? "text-white"
                          : "text-neutral-600 hover:text-neutral-950 hover:bg-white/60"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="galleryActiveBrandPill"
                          className="absolute inset-0 bg-neutral-950 rounded-xl shadow-xs -z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />}
                        <span>{b}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* Animated Gallery Grid: 2 columns on mobile */}
          <div ref={galleryGridRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`gallery-${selectedBrand}-${currentPage}`}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                variants={staggerContainerVariants}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-6 sm:mb-8"
              >
                {paginatedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUpItemVariants}
                    onClick={() => setActiveModalItem(item)}
                    className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 hover:border-neutral-900 overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-md active:scale-[0.99]"
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 sm:p-4">
                        <span className="text-[#c5a059] text-[10px] sm:text-xs font-semibold flex items-center gap-1 uppercase tracking-wider">
                          <span>{lang === "ar" ? "عرض التفاصيل" : "View Fitment"}</span>
                          <ArrowRight size={11} className="rtl:rotate-180" />
                        </span>
                      </div>
                      <span className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-neutral-950/80 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl">
                        {item.vehicle}
                      </span>
                    </div>

                    {/* Card Footer */}
                    <div className="p-2.5 sm:p-5 space-y-0.5 sm:space-y-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-950 group-hover:text-[#9b7832] transition-colors line-clamp-1">
                        {lang === "ar" ? item.title_ar : item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-neutral-500 flex items-center gap-1 truncate">
                        <span className="w-1 h-1 rounded-full bg-[#c5a059] shrink-0"></span>
                        <span className="truncate">{item.mounting_base} + {item.device_holder}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Numbered Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredItems.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
              lang={lang}
              className="mb-8 sm:mb-12"
            />
          </div>

          {/* Callout */}
          <div className="bg-neutral-50 rounded-xl sm:rounded-2xl border border-neutral-200/80 p-5 sm:p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-sm sm:text-base font-semibold text-neutral-950 mb-1 sm:mb-2">
              {lang === "ar" ? "هل ترغب في الحصول على نفس المظهر لسيارتك؟" : "Want the exact same clean setup for your car?"}
            </h3>
            <p className="text-xs text-neutral-500 mb-4 sm:mb-6 leading-relaxed">
              {lang === "ar"
                ? "استخدم مطابق السيارات الذكي لاختيار القطع المتوافقة تماماً مع طبلون سيارتك وموديل هاتفك."
                : "Use our interactive fitment matcher to pair your specific vehicle dashboard with the right holder."}
            </p>
            <Link
              href="/find"
              className="inline-flex items-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Compass size={14} className="text-[#c5a059]" />
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
