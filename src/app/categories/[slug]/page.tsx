"use client";

import React, { useState, useMemo, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomSelect } from "@/components/CustomSelect";
import { Pagination } from "@/components/Pagination";
import { useAppContext } from "@/context/AppContext";
import {
  MOCK_CATEGORIES,
  MOCK_ALL_PRODUCTS,
  VEHICLE_BRANDS,
} from "@/data/mockData";
import {
  Search,
  ChevronRight,
  Plus,
  Check,
  X,
  Car,
  Clock,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const PAGE_SIZE = 12;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { lang, formatPrice, addToCart, currency, setPreOrderProduct } = useAppContext();

  // Inline Search, Vehicle, and Sort Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const normalizedSlug =
    slug === "mounting-bases" || slug === "mounting-base" ? "pro-clips" : slug;

  const [activeSlug, setActiveSlug] = useState<string>(normalizedSlug);

  useEffect(() => {
    setActiveSlug(normalizedSlug);
  }, [normalizedSlug]);

  const category =
    MOCK_CATEGORIES.find((c) => c.slug === activeSlug) ||
    MOCK_CATEGORIES.find((c) => c.slug === normalizedSlug) ||
    MOCK_CATEGORIES[0];

  // Auto-center selected pill inside horizontal scroll container
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pillRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  const centerActivePill = (targetSlug: string = activeSlug, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const activeEl = pillRefs.current[targetSlug];
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
    centerActivePill(activeSlug, "auto");
    const raf = requestAnimationFrame(() => centerActivePill(activeSlug, "auto"));
    const timer = setTimeout(() => centerActivePill(activeSlug, "smooth"), 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [activeSlug]);

  if (!category) {
    notFound();
  }

  // Filter products by category, search query, and vehicle inline
  const filteredProducts = useMemo(() => {
    let list = MOCK_ALL_PRODUCTS.filter(
      (p) =>
        p.category_slug === activeSlug ||
        (activeSlug === "pro-clips" && p.slug.includes("mount"))
    );

    // If none match exactly, show fallback subset of category
    if (list.length === 0) {
      list = MOCK_ALL_PRODUCTS.slice(0, 4);
    }

    // Search query filter within category
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.name_ar && p.name_ar.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.compatible_cars && p.compatible_cars.some((c) => c.toLowerCase().includes(q)))
      );
    }

    // Filter by vehicle inline
    if (selectedVehicle !== "all") {
      list = list.filter(
        (p) =>
          (p.compatible_cars &&
            p.compatible_cars.some((c) =>
              c.toLowerCase().includes(selectedVehicle.toLowerCase())
            )) ||
          p.name.toLowerCase().includes(selectedVehicle.toLowerCase()) ||
          (p.name_ar && p.name_ar.toLowerCase().includes(selectedVehicle.toLowerCase()))
      );
    }

    if (onlyInStock) {
      list = list.filter((p) => p.stock > 0);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeSlug, searchQuery, selectedVehicle, onlyInStock, sortBy]);

  // Reset page when any filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSlug, searchQuery, selectedVehicle, onlyInStock, sortBy]);

  const productGridRef = React.useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (productGridRef.current) {
      const topOffset = productGridRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  };

  const handleAddClick = (product: any) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-5 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500 mb-3 sm:mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <Link href="/search" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الكتالوج" : "Catalog"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <span className="text-neutral-900 font-semibold truncate max-w-[150px] sm:max-w-none">
              {lang === "ar" ? category.category_ar : category.category}
            </span>
          </nav>

          {/* Minimalist Section Header (Matches Home Page Model) */}
          <div className="mb-4 sm:mb-10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] font-semibold mb-1 sm:mb-2">
              {lang === "ar" ? "الفئة الأصلية المعتمدة" : "Official Collection"}
            </p>
            <h1 className="text-xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-1 sm:mb-2">
              {lang === "ar" ? (
                <>
                  قواعد وحوامل <span className="font-semibold text-neutral-950">{category.category_ar}</span>
                </>
              ) : (
                <>
                  {category.category.split(" ")[0]}{" "}
                  <span className="font-semibold text-neutral-950">
                    {category.category.split(" ").slice(1).join(" ") || "Collection"}
                  </span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-base text-neutral-600 max-w-xl leading-relaxed">
              {lang === "ar" ? category.descriptionar : category.description}
            </p>
          </div>

          {/* Unified Horizontal Filtering System */}
          <div ref={productGridRef} className="space-y-4 mb-8">
            {/* Category Tabs Pill Carousel */}
            <div className="relative">
              <div
                ref={containerRef}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar"
              >
                {MOCK_CATEGORIES.map((cat) => {
                  const isSelected = activeSlug === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      ref={(el) => {
                        pillRefs.current[cat.slug] = el;
                      }}
                      onClick={() => setActiveSlug(cat.slug)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? "bg-neutral-950 text-white shadow-xs"
                          : "bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 hover:text-neutral-950"
                      }`}
                    >
                      <span>{lang === "ar" ? cat.category_ar : cat.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Filters: Search input, Vehicle Brand selector, Sort, In-stock toggle */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
              {/* Search Bar Input */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search
                  size={15}
                  className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "ابحث بالاسم أو موديل السيارة..."
                      : "Search by name or vehicle model..."
                  }
                  className="w-full h-10 bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white text-xs text-neutral-900 rounded-xl pl-9.5 pr-8 rtl:pl-8 rtl:pr-9.5 border border-neutral-200 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20 transition-all placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 rounded-full cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Dropdown Filters & In-Stock Switch */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {/* Vehicle Brand Dropdown */}
                <div className="w-36 sm:w-40 shrink-0">
                  <CustomSelect
                    value={selectedVehicle}
                    onChange={(val) => setSelectedVehicle(val)}
                    options={[
                      { label: lang === "ar" ? "كل السيارات" : "All Vehicles", value: "all" },
                      ...VEHICLE_BRANDS.map((b) => ({ label: b, value: b })),
                    ]}
                    placeholder={lang === "ar" ? "نوع السيارة" : "Vehicle Make"}
                    lang={lang}
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="w-36 sm:w-40 shrink-0">
                  <CustomSelect
                    value={sortBy}
                    onChange={(val) => setSortBy(val as any)}
                    options={[
                      { label: lang === "ar" ? "الأكثر تميزاً" : "Featured", value: "featured" },
                      { label: lang === "ar" ? "السعر: الأقل أولاً" : "Price: Low to High", value: "price-asc" },
                      { label: lang === "ar" ? "السعر: الأعلى أولاً" : "Price: High to Low", value: "price-desc" },
                    ]}
                    placeholder={lang === "ar" ? "الترتيب" : "Sort"}
                    lang={lang}
                  />
                </div>

                {/* In Stock Only Checkbox Button */}
                <button
                  type="button"
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`h-10 px-3 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 select-none active:scale-95 ${
                    onlyInStock
                      ? "bg-[#faf6ed] border-[#c5a059] text-[#9b7832] ring-1 ring-[#c5a059]/30"
                      : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-colors ${
                      onlyInStock ? "bg-[#c5a059] border-[#c5a059] text-white" : "border-neutral-300 bg-white"
                    }`}
                  >
                    {onlyInStock && <Check size={10} className="stroke-[3]" />}
                  </span>
                  <span>{lang === "ar" ? "المتوفر فقط" : "In Stock"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips & Counter Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900">
                {lang === "ar"
                  ? `عرض ${filteredProducts.length} ${filteredProducts.length === 1 ? "منتج" : "منتجات"}`
                  : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? "mount" : "mounts"}`}
              </span>
              {(searchQuery || selectedVehicle !== "all" || onlyInStock) && (
                <span className="text-[11px] text-neutral-400">
                  ({lang === "ar" ? "مُصفى" : "filtered"})
                </span>
              )}
            </div>

            {(searchQuery || selectedVehicle !== "all" || onlyInStock) && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] sm:text-[11px]">
                    <span className="truncate max-w-[100px]">&ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery("")} className="hover:text-neutral-950 cursor-pointer">
                      <X size={10} />
                    </button>
                  </span>
                )}

                {selectedVehicle !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] sm:text-[11px]">
                    <span>{selectedVehicle}</span>
                    <button type="button" onClick={() => setSelectedVehicle("all")} className="hover:text-neutral-950 cursor-pointer">
                      <X size={10} />
                    </button>
                  </span>
                )}

                {onlyInStock && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] sm:text-[11px]">
                    <span>{lang === "ar" ? "المتوفر" : "In Stock"}</span>
                    <button type="button" onClick={() => setOnlyInStock(false)} className="hover:text-neutral-950 cursor-pointer">
                      <X size={10} />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedVehicle("all");
                    setOnlyInStock(false);
                  }}
                  className="px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors"
                >
                  {lang === "ar" ? "إعادة تعيين الكل" : "Clear All"}
                </button>
              </div>
            )}
          </div>

          {/* Animated Product Cards Grid or Fallback State */}
          <AnimatePresence mode="popLayout">
            {paginatedProducts.length > 0 ? (
              <div>
                <motion.div
                  key={`cat-grid-${activeSlug}-${selectedVehicle}-${searchQuery}-${onlyInStock}-${sortBy}-${currentPage}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14 mb-8"
                >
                  {paginatedProducts.map((product) => {
                    const inStock = product.stock > 0;
                    const isAdded = justAddedId === product.id;

                    return (
                      <div
                        key={product.id}
                        className="h-full flex flex-col justify-between group select-none"
                      >
                        <div>
                          {/* Pure Container-less Product Photo Showcase */}
                          <Link
                            href={`/products/${product.slug}`}
                            className="block relative w-full h-44 sm:h-60 flex items-center justify-center mb-3 sm:mb-4 overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                              onError={(e) => {
                                e.currentTarget.src = "/admin/banners/accessories.jpg";
                              }}
                            />
                            {/* Minimal In-Stock / Pre-Order Pill Badge */}
                            <div className="absolute top-1 start-1 px-2 py-0.5 rounded-full bg-neutral-100/90 text-[10px] sm:text-[11px] font-medium shadow-2xs">
                              <span className={inStock ? "text-neutral-700" : "text-[#b38e46]"}>
                                {inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Pre-Order")}
                              </span>
                            </div>
                          </Link>

                          {/* Model SKU */}
                          <p className="text-[10px] sm:text-xs font-mono text-neutral-400 mb-1 truncate">
                            {product.product_id}
                          </p>

                          {/* Product Title */}
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-medium text-xs sm:text-sm text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#c5a059] transition-colors">
                              {lang === "ar" ? product.name_ar : product.name}
                            </h3>
                          </Link>
                        </div>

                        {/* Pricing & Add to Bag */}
                        <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
                          <div className="shrink-0 whitespace-nowrap">
                            <span className="text-sm sm:text-base font-bold text-neutral-950 font-mono">
                              {product.price}
                            </span>
                            <span className="text-[11px] sm:text-xs font-semibold text-[#c5a059] ms-1">
                              {currency}
                            </span>
                          </div>

                          {inStock ? (
                            <button
                              type="button"
                              onClick={() => handleAddClick(product)}
                              className={`flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl transition-all duration-200 cursor-pointer shrink-0 active-press shadow-2xs ${
                                isAdded
                                  ? "bg-[#25D366] text-white"
                                  : "bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={12} className="stroke-[2.5]" />
                                  <span>{lang === "ar" ? "تم" : "Added"}</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={12} />
                                  <span>{lang === "ar" ? "أضف" : "Add"}</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPreOrderProduct(product)}
                              className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 transition-colors shrink-0 cursor-pointer active-press shadow-2xs"
                            >
                              <Clock size={11} />
                              <span>{lang === "ar" ? "طلب مسبق" : "Pre-Order"}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Numbered Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={handlePageChange}
                  lang={lang}
                />
              </div>
            ) : (
              /* Smart Fallback Zero-Result State */
              <motion.div
                key="cat-empty-state"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-center py-8 px-4 max-w-md mx-auto mb-10 bg-neutral-50/60 border border-neutral-200/70 rounded-2xl p-5 sm:p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-neutral-200 flex items-center justify-center mx-auto mb-3 text-[#c5a059]">
                  <Car size={20} />
                </div>
                
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
                  {lang === "ar" ? "لم نجد قواعد تطابق بحثك" : "No matching mounts found"}
                </h3>
                
                <p className="text-xs text-neutral-500 mb-4 leading-relaxed max-w-xs mx-auto">
                  {lang === "ar"
                    ? "جرب إزالة بعض الفلاتر، أو تواصل معنا مباشرة عبر الواتساب لتوفير القاعدة المناسبة لسيارتك وموديلها."
                    : "Try resetting filters or chat directly with our fitment team on WhatsApp for custom car matching."}
                </p>

                {/* Popular Vehicle Quick Picks */}
                <div className="mb-5">
                  <span className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    {lang === "ar" ? "سيارات شائعة:" : "Popular Vehicles:"}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {["Toyota", "Nissan", "Ford", "GMC", "Lexus", "Jeep"].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => {
                          setSelectedVehicle(brand);
                          setSearchQuery("");
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-[11px] font-medium text-neutral-700 hover:text-neutral-950 transition-all cursor-pointer active:scale-95"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedVehicle("all");
                      setOnlyInStock(false);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs active:scale-95"
                  >
                    <RotateCcw size={12} />
                    <span>{lang === "ar" ? "إعادة تعيين الفلاتر" : "Reset All Filters"}</span>
                  </button>

                  <a
                    href={`https://wa.me/966547631526?text=${encodeURIComponent(
                      lang === "ar"
                        ? `مرحباً ثقة، لم أجد قاعدة مناسبة لسيارتي في قسم ${category.category_ar} (بحث: ${searchQuery || selectedVehicle}). هل تتوفر لديكم؟`
                        : `Hello Thabt, I'm looking for a mount in ${category.category} (Query: ${searchQuery || selectedVehicle}). Do you have fitment for my car?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs active:scale-95"
                  >
                    <MessageCircle size={13} />
                    <span>{lang === "ar" ? "استفسر عبر الواتساب" : "Ask on WhatsApp"}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
