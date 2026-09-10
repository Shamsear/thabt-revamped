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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "كتالوج المنتجات والبحث" : "Product Catalog & Search"}
            </span>
          </nav>

          {/* Page Heading & Search Bar */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-3">
              {lang === "ar" ? "كتالوج قواعد وحوامل ثقة الأصلية" : "Precision Vehicle Mounts & Holders Catalog"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6">
              {lang === "ar"
                ? "تصفح جميع قواعد التثبيت المخصصة وحوامل الأجهزة المتوافقة مع أحدث سيارات الشرق الأوسط والخليج."
                : "Browse custom dashboard mounts, wireless charging holders, and heavy-duty off-road gear engineered for the GCC."}
            </p>

            {/* Direct Search Input */}
            <div className="relative max-w-xl">
              <Search
                size={16}
                className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5 text-neutral-400 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "ابحث باسم السيارة، رقم القطعة، أو نوع الهاتف..."
                    : "Search by vehicle make, part name, or device..."
                }
                className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 shadow-xs transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-3.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 mb-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${selectedCategory === "all"
                      ? "bg-neutral-950 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                >
                  {lang === "ar" ? "جميع الفئات" : "All Categories"}
                </button>

                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${selectedCategory === cat.slug
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                  >
                    {lang === "ar" ? cat.category_ar : cat.category}
                  </button>
                ))}
              </div>

              {/* Vehicle & Sort Dropdowns */}
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                {/* Vehicle Filter */}
                <div className="w-40 sm:w-48">
                  <CustomSelect
                    value={selectedBrand}
                    onChange={(val) => setSelectedBrand(val)}
                    options={[
                      { label: lang === "ar" ? "كل الماركات" : "All Vehicles", value: "all" },
                      ...vehicleBrands.map((b) => ({ label: b, value: b })),
                    ]}
                    lang={lang}
                  />
                </div>

                {/* Sort Order */}
                <div className="w-40 sm:w-48">
                  <CustomSelect
                    value={sortBy}
                    onChange={(val) => setSortBy(val as any)}
                    options={[
                      { label: lang === "ar" ? "الأكثر تميزاً" : "Featured", value: "featured" },
                      { label: lang === "ar" ? "السعر: الأقل" : "Price: Low to High", value: "price-asc" },
                      { label: lang === "ar" ? "السعر: الأعلى" : "Price: High to Low", value: "price-desc" },
                    ]}
                    lang={lang}
                  />
                </div>

                {/* In Stock Toggle */}
                <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded border-neutral-300 text-[#c5a059] focus:ring-[#c5a059]"
                  />
                  <span>{lang === "ar" ? "المتوفر فقط" : "In Stock Only"}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Count & Match Status */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
            <p>
              {lang === "ar"
                ? `تم العثور على ${filteredProducts.length} منتج`
                : `Showing ${filteredProducts.length} items`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            <Link
              href="/find"
              className="text-[#9b7832] font-semibold flex items-center gap-1 hover:underline"
            >
              <Sparkles size={13} />
              <span>{lang === "ar" ? "استخدم مطابق السيارات الذكي" : "Launch Fitment Matcher"}</span>
            </Link>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col group"
                >
                  {/* Image Area */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block aspect-square bg-neutral-100 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.original_price && (
                      <span className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {lang === "ar" ? "عرض خاص" : "Special Offer"}
                      </span>
                    )}
                    {product.stock <= 0 && (
                      <span className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {lang === "ar" ? "طلب مسبق" : "Pre-Order"}
                      </span>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* SKU / Origin Pill */}
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1.5">
                        <span className="font-mono">{product.product_id}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          {product.stock > 0 ? (
                            <>
                              <CheckCircle2 size={11} /> {lang === "ar" ? "متوفر" : "In Stock"}
                            </>
                          ) : (
                            <span className="text-neutral-500">{lang === "ar" ? "طلب مسبق" : "Available to Order"}</span>
                          )}
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#9b7832] transition-colors line-clamp-2 mb-2"
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
                        <p className="text-sm font-extrabold text-neutral-950">
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
                          className="py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          title={lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                        >
                          <ShoppingBag size={13} />
                          <span>{lang === "ar" ? "إضافة" : "Add"}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPreOrderProduct(product)}
                          className="py-1.5 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-all cursor-pointer"
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
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8 max-w-lg mx-auto">
              <Search size={36} className="text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                {lang === "ar" ? "لم نتمكن من العثور على نتائج مطابقة" : "No matching products found"}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
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
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  {lang === "ar" ? "مسح التصفية" : "Clear All Filters"}
                </button>
                <Link
                  href="/find"
                  className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
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
