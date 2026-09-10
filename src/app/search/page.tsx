"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomSelect } from "@/components/CustomSelect";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS, MOCK_CATEGORIES, Product } from "@/data/mockData";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Car,
} from "lucide-react";

function SearchCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialBrand = searchParams.get("brand") || "all";
  const initialCategory = searchParams.get("category") || "all";

  const { lang, formatPrice, addToCart, setPreOrderProduct } = useAppContext();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const vehicleBrands = ["Toyota", "Nissan", "Lexus", "Land Rover", "GMC", "Ford"];

  // Filter products based on query, category, brand, and stock
  const filteredProducts = useMemo(() => {
    let list = [...MOCK_ALL_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.name_ar && p.name_ar.includes(q)) ||
          (p.compatible_cars && p.compatible_cars.some((c) => c.toLowerCase().includes(q))) ||
          (p.category_slug && p.category_slug.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category_slug === selectedCategory);
    }

    if (selectedBrand !== "all") {
      list = list.filter(
        (p) =>
          (p.compatible_cars && p.compatible_cars.some((c) => c.toLowerCase().includes(selectedBrand.toLowerCase()))) ||
          p.name.toLowerCase().includes(selectedBrand.toLowerCase())
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
  }, [searchQuery, selectedCategory, selectedBrand, onlyInStock, sortBy]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12 relative">
        {/* Subtle Ambient Gold Glow in Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#c5a059]/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-[#9b7832] transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              {lang === "ar" ? "كتالوج المنتجات والبحث" : "Product Catalog & Search"}
            </span>
          </nav>

          {/* Page Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6ed] border border-[#c5a059]/30 text-[#9b7832] text-xs font-semibold mb-2.5">
              <Sparkles size={13} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "قواعد وحوامل أصلية معتمدة" : "Official GCC Certified Mounts"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mb-2">
              {lang === "ar" ? "كتالوج قواعد وحوامل ثقة الأصلية" : "Precision Vehicle Mounts & Holders Catalog"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              {lang === "ar"
                ? "تصفح جميع قواعد التثبيت المخصصة وحوامل الأجهزة المتوافقة مع أحدث سيارات الشرق الأوسط والخليج."
                : "Browse custom dashboard mounts, wireless charging holders, and heavy-duty off-road gear engineered for the GCC."}
            </p>
          </div>

          {/* Unified Filter & Search Console */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            {/* 1. Category Switcher Strip */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9b7832] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  {lang === "ar" ? "تصنيف المنتجات" : "Product Categories"}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {filteredProducts.length} {lang === "ar" ? "منتج مطابق" : "items available"}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 border ${
                    selectedCategory === "all"
                      ? "bg-neutral-950 text-[#c5a059] border-[#c5a059]/40 shadow-sm"
                      : "bg-neutral-50 hover:bg-[#faf6ed] text-neutral-700 hover:text-[#9b7832] border-neutral-200/80 hover:border-[#c5a059]/30"
                  }`}
                >
                  {lang === "ar" ? "جميع الفئات" : "All Categories"}
                </button>

                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 border ${
                      selectedCategory === cat.slug
                        ? "bg-neutral-950 text-[#c5a059] border-[#c5a059]/40 shadow-sm"
                        : "bg-neutral-50 hover:bg-[#faf6ed] text-neutral-700 hover:text-[#9b7832] border-neutral-200/80 hover:border-[#c5a059]/30"
                    }`}
                  >
                    {lang === "ar" ? cat.category_ar : cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Unified Search & Filter Toolbar */}
            <div className="pt-3 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search input: 5 cols on sm/lg */}
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
                      ? "ابحث باسم السيارة، الموديل، أو المنتج..."
                      : "Search by vehicle, model, or product..."
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

              {/* Vehicle Filter: 3 cols */}
              <div className="sm:col-span-6 md:col-span-3">
                <CustomSelect
                  value={selectedBrand}
                  onChange={(val) => setSelectedBrand(val)}
                  options={[
                    { label: lang === "ar" ? "كل ماركات السيارات" : "All Vehicles", value: "all" },
                    ...vehicleBrands.map((b) => ({ label: b, value: b })),
                  ]}
                  placeholder={lang === "ar" ? "نوع السيارة" : "Vehicle Make"}
                  lang={lang}
                />
              </div>

              {/* Sort Order: 2 cols */}
              <div className="sm:col-span-6 md:col-span-2">
                <CustomSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val as any)}
                  options={[
                    { label: lang === "ar" ? "الأكثر تميزاً" : "Featured", value: "featured" },
                    { label: lang === "ar" ? "السعر: الأقل" : "Price: Low to High", value: "price-asc" },
                    { label: lang === "ar" ? "السعر: الأعلى" : "Price: High to Low", value: "price-desc" },
                  ]}
                  placeholder={lang === "ar" ? "الترتيب" : "Sort By"}
                  lang={lang}
                />
              </div>

              {/* In-Stock Toggle Button: 2 cols */}
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
            {(searchQuery || selectedCategory !== "all" || selectedBrand !== "all" || onlyInStock) && (
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

                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/40 font-semibold text-[11px]">
                    <span>
                      {MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.category || selectedCategory}
                    </span>
                    <button type="button" onClick={() => setSelectedCategory("all")} className="hover:text-neutral-900 cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedBrand !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/40 font-semibold text-[11px]">
                    <Car size={12} className="text-[#c5a059]" />
                    <span>{selectedBrand}</span>
                    <button type="button" onClick={() => setSelectedBrand("all")} className="hover:text-neutral-900 cursor-pointer">
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
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setOnlyInStock(false);
                  }}
                  className="text-[11px] font-bold text-[#9b7832] hover:text-neutral-950 underline ml-2 rtl:ml-0 rtl:mr-2 cursor-pointer transition-colors"
                >
                  {lang === "ar" ? "مسح جميع الفلاتر" : "Clear all"}
                </button>
              </div>
            )}
          </div>

          {/* Results Count & Match Status */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
            <p className="font-medium">
              {lang === "ar"
                ? `تم العثور على ${filteredProducts.length} منتج`
                : `Showing ${filteredProducts.length} items`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            <Link
              href="/find"
              className="text-[#9b7832] font-bold flex items-center gap-1.5 hover:text-neutral-950 transition"
            >
              <Sparkles size={13} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "استخدم مطابق السيارات الذكي" : "Launch Fitment Matcher"}</span>
            </Link>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#c5a059] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Area */}
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
                        {lang === "ar" ? "عرض خاص" : "Special Offer"}
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
                      {/* SKU / Origin Pill */}
                      <div className="flex items-center justify-between text-[10px] mb-2">
                        <span className="font-mono text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded-md border border-[#c5a059]/20 font-semibold">
                          {product.product_id}
                        </span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          {product.stock > 0 ? (
                            <>
                              <CheckCircle2 size={11} /> {lang === "ar" ? "متوفر" : "In Stock"}
                            </>
                          ) : (
                            <span className="text-[#9b7832]">{lang === "ar" ? "طلب مسبق" : "Available to Order"}</span>
                          )}
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block text-xs sm:text-sm font-bold text-neutral-950 group-hover:text-[#9b7832] transition-colors line-clamp-2 mb-1.5"
                      >
                        {lang === "ar" ? product.name_ar : product.name}
                      </Link>

                      {/* Compatible Cars Snippet */}
                      {product.compatible_cars && product.compatible_cars.length > 0 && (
                        <p className="text-[11px] text-neutral-500 line-clamp-1 mb-3">
                          {product.compatible_cars[0]}
                        </p>
                      )}
                    </div>

                    {/* Price & Action Row */}
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

                      {product.stock > 0 ? (
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="py-2 px-3.5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          title={lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                        >
                          <ShoppingBag size={13} className="text-[#c5a059] group-hover:text-neutral-950" />
                          <span>{lang === "ar" ? "إضافة" : "Add"}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPreOrderProduct(product)}
                          className="py-2 px-3 rounded-xl bg-[#faf6ed] hover:bg-[#f5ebd4] text-[#9b7832] border border-[#c5a059]/30 text-xs font-bold transition-all cursor-pointer"
                        >
                          {lang === "ar" ? "حجز مسبق" : "Pre-Order"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#faf6ed] border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-3 text-[#c5a059]">
                <Search size={24} />
              </div>
              <h3 className="text-base font-bold text-neutral-950 mb-1">
                {lang === "ar" ? "لم نتمكن من العثور على نتائج مطابقة" : "No matching products found"}
              </h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                {lang === "ar"
                  ? "جرب البحث بكلمات أخرى أو تصفح الفئات الرئيسية، أو استخدم مطابق السيارات لاختيار موديلك بالتحديد."
                  : "Try clearing your filters, searching for a different car model, or use our 2-step fitment finder."}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setOnlyInStock(false);
                  }}
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-[#faf6ed] hover:text-[#9b7832] text-neutral-800 rounded-xl text-xs font-bold transition cursor-pointer border border-neutral-200"
                >
                  {lang === "ar" ? "مسح التصفية" : "Clear All Filters"}
                </button>
                <Link
                  href="/find"
                  className="px-4 py-2.5 bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 border border-neutral-950 hover:border-[#c5a059] rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles size={13} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "مطابق السيارات" : "Fitment Matcher"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
      <SearchCatalogContent />
    </Suspense>
  );
}
