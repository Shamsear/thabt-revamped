"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_CATEGORIES, MOCK_ALL_PRODUCTS, VEHICLE_BRANDS, Product } from "@/data/mockData";
import {
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  SlidersHorizontal,
  Car,
  X,
  Search,
} from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { lang, formatPrice, addToCart, setPreOrderProduct } = useAppContext();

  // Inline Search, Vehicle, and Sort Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter products by category, search query, and vehicle inline
  const filteredProducts = useMemo(() => {
    let list = MOCK_ALL_PRODUCTS.filter(
      (p) => p.category_slug === slug || (slug === "pro-clips" && p.slug.includes("mount"))
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
  }, [slug, searchQuery, selectedVehicle, onlyInStock, sortBy]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-10 relative">
        {/* Subtle Ambient Gold Glow in Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#c5a059]/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
            <Link href="/" className="hover:text-[#9b7832] transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <Link href="/search" className="hover:text-[#9b7832] transition">
              {lang === "ar" ? "المنتجات" : "Catalog"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              {lang === "ar" ? category.category_ar : category.category}
            </span>
          </nav>

          {/* Compact Category Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-semibold mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>{lang === "ar" ? "الفئة الأصلية المعتمدة" : "Official Category"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mb-2">
              {lang === "ar" ? category.category_ar : category.category}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              {lang === "ar" ? category.descriptionar : category.description}
            </p>
          </div>

          {/* Unified Filter & Search Console */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            {/* 1. Category Switcher Strip */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b7832] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  {lang === "ar" ? "تصفح الفئات" : "Browse Categories"}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {filteredProducts.length} {lang === "ar" ? "منتج مطابق" : "items available"}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <Link
                  href="/search"
                  className="px-4 py-2 rounded-xl font-bold whitespace-nowrap transition bg-neutral-50 hover:bg-[#faf6ed] text-neutral-700 hover:text-[#9b7832] border border-neutral-200/80 hover:border-[#c5a059]/30 shrink-0"
                >
                  {lang === "ar" ? "جميع المنتجات" : "All Products"}
                </Link>

                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 border ${
                      cat.slug === slug
                        ? "bg-neutral-950 text-[#c5a059] border-[#c5a059]/40 shadow-sm"
                        : "bg-neutral-50 hover:bg-[#faf6ed] text-neutral-700 hover:text-[#9b7832] border-neutral-200/80 hover:border-[#c5a059]/30"
                    }`}
                  >
                    {lang === "ar" ? cat.category_ar : cat.category}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Unified Search & Filter Toolbar */}
            <div className="pt-3 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search within this category */}
              <div className="sm:col-span-12 md:col-span-5 relative">
                <Search
                  size={15}
                  className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-[#c5a059] pointer-events-none"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? `ابحث داخل ${category.category_ar}...`
                      : `Search in ${category.category}...`
                  }
                  className="w-full bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200/90 rounded-xl pl-9 pr-9 rtl:pl-9 rtl:pr-9 py-2 sm:py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/15 shadow-2xs transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Vehicle Filter */}
              <div className="sm:col-span-6 md:col-span-3">
                <CustomSelect
                  value={selectedVehicle}
                  onChange={(val) => setSelectedVehicle(val)}
                  options={[
                    { label: lang === "ar" ? "كل ماركات السيارات" : "All Vehicles", value: "all" },
                    ...VEHICLE_BRANDS.map((b) => ({ label: b, value: b })),
                  ]}
                  placeholder={lang === "ar" ? "نوع السيارة" : "Vehicle Make"}
                  lang={lang}
                />
              </div>

              {/* Sort Order */}
              <div className="sm:col-span-6 md:col-span-2">
                <CustomSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val as any)}
                  options={[
                    { label: lang === "ar" ? "الأكثر طلباً" : "Featured", value: "featured" },
                    { label: lang === "ar" ? "السعر: الأقل" : "Price: Low to High", value: "price-asc" },
                    { label: lang === "ar" ? "السعر: الأعلى" : "Price: High to Low", value: "price-desc" },
                  ]}
                  placeholder={lang === "ar" ? "الترتيب" : "Sort By"}
                  lang={lang}
                />
              </div>

              {/* In-Stock Toggle Button */}
              <div className="sm:col-span-12 md:col-span-2 flex items-center justify-stretch">
                <button
                  type="button"
                  onClick={() => setOnlyInStock((prev) => !prev)}
                  className={`w-full py-2 sm:py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer select-none ${
                    onlyInStock
                      ? "bg-[#faf6ed] border-[#c5a059] text-[#9b7832] font-bold shadow-2xs"
                      : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      onlyInStock ? "bg-[#c5a059] animate-pulse" : "bg-neutral-400"
                    }`}
                  />
                  <span>{lang === "ar" ? "المتوفر بالمخزن" : "In Stock Only"}</span>
                </button>
              </div>
            </div>

            {/* 3. Active Filters Pills Bar */}
            {(searchQuery || selectedVehicle !== "all" || onlyInStock) && (
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b7832]">
                  {lang === "ar" ? "الفلاتر النشطة:" : "Active Filters:"}
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/40 font-semibold text-[11px]">
                    <span>&ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery("")} className="hover:text-neutral-900 cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedVehicle !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/40 font-semibold text-[11px]">
                    <Car size={12} className="text-[#c5a059]" />
                    <span>{selectedVehicle}</span>
                    <button type="button" onClick={() => setSelectedVehicle("all")} className="hover:text-neutral-900 cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {onlyInStock && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/40 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                    <span>{lang === "ar" ? "المتوفر فقط" : "In Stock"}</span>
                    <button type="button" onClick={() => setOnlyInStock(false)} className="hover:text-[#9b7832] cursor-pointer">
                      <X size={12} />
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
                  className="text-[11px] font-bold text-[#9b7832] hover:text-neutral-950 underline ml-2 rtl:ml-0 rtl:mr-2 cursor-pointer transition-colors"
                >
                  {lang === "ar" ? "مسح جميع الفلاتر" : "Clear all"}
                </button>
              </div>
            )}
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#c5a059] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block aspect-square bg-gradient-to-b from-neutral-50 to-white overflow-hidden p-6"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.original_price && (
                      <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-neutral-950 text-[#c5a059] border border-[#c5a059]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {lang === "ar" ? "تخفيض" : "Sale"}
                      </span>
                    )}
                    {product.stock <= 0 && (
                      <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {lang === "ar" ? "طلب مسبق" : "Pre-Order"}
                      </span>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-2">
                        <span className="font-mono text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md border border-[#c5a059]/20 font-semibold">
                          {product.product_id}
                        </span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 size={11} /> {product.stock > 0 ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Pre-Order")}
                        </span>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="block text-xs sm:text-sm font-bold text-neutral-950 group-hover:text-[#9b7832] transition-colors line-clamp-2 mb-1.5"
                      >
                        {lang === "ar" ? product.name_ar : product.name}
                      </Link>

                      {product.features && product.features.length > 0 && (
                        <p className="text-[11px] text-neutral-500 line-clamp-1 mb-3">
                          {product.features[0]}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <p className="text-sm sm:text-base font-black text-neutral-950">
                          {formatPrice(product.price)}
                        </p>
                        {product.original_price && (
                          <p className="text-[10px] text-neutral-400 line-through">
                            {formatPrice(product.original_price)}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="py-2 px-3.5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingBag size={13} className="text-[#c5a059] group-hover:text-neutral-950" />
                        <span>{lang === "ar" ? "إضافة" : "Add"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Filter Result */
            <div className="text-center py-14 bg-white rounded-3xl border border-neutral-200 p-6 max-w-md mx-auto mb-12 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#faf6ed] border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-3 text-[#c5a059]">
                <Car size={26} />
              </div>
              <h3 className="text-sm font-bold text-neutral-950 mb-1">
                {lang === "ar"
                  ? `لا توجد قطع مخصصة لـ ${selectedVehicle} في هذه الفئة`
                  : `No ${category.category} found for ${selectedVehicle}`}
              </h3>
              <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
                {lang === "ar"
                  ? "جرب إزالة تصفية السيارة أو تصفح كامل الكتالوج."
                  : "Try clearing the vehicle filter or browsing the full catalog."}
              </p>
              <button
                type="button"
                onClick={() => setSelectedVehicle("all")}
                className="px-4 py-2.5 bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              >
                {lang === "ar" ? "عرض جميع المنتجات" : "Show All Products"}
              </button>
            </div>
          )}

          {/* Other Categories Strip */}
          <div className="pt-8 border-t border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9b7832] mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              {lang === "ar" ? "تصفح الفئات الأخرى" : "Browse Other Collections"}
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {MOCK_CATEGORIES.filter((c) => c.slug !== slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/categories/${other.slug}`}
                  className="px-4 py-2 bg-white rounded-xl border border-neutral-200 hover:border-[#c5a059] hover:bg-[#faf6ed] text-neutral-700 hover:text-[#9b7832] font-semibold whitespace-nowrap transition shadow-2xs"
                >
                  {lang === "ar" ? other.category_ar : other.category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
