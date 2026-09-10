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
  ChevronRight,
  Plus,
  Check,
  X,
  Car,
} from "lucide-react";

function SearchCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialBrand = searchParams.get("brand") || "all";
  const initialCategory = searchParams.get("category") || "all";

  const { lang, formatPrice, addToCart, currency } = useAppContext();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const vehicleBrands = ["Toyota", "Nissan", "Lexus", "Land Rover", "GMC", "Ford", "Chevrolet", "Jeep"];

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

  const handleAddClick = (product: Product) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={11} className="rtl:rotate-180" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "كتالوج المنتجات والبحث" : "Product Catalog & Search"}
            </span>
          </nav>

          {/* Minimalist Section Header (Matches Home Page Model) */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
              {lang === "ar" ? "الكتالوج الشامل" : "Full Catalog"}
            </p>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 mb-2">
              {lang === "ar" ? (
                <>
                  جميع حلول التثبيت <span className="font-semibold text-neutral-950">الأصلية</span>
                </>
              ) : (
                <>
                  Precision Hardware <span className="font-semibold text-neutral-950">Catalog</span>
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
              {lang === "ar"
                ? "تصفح جميع قواعد التثبيت المخصصة وحوامل الأجهزة المتوافقة مع أحدث سيارات الشرق الأوسط والخليج."
                : "Browse custom dashboard mounts, MagSafe charging holders, and heavy-duty off-road systems engineered for the GCC."}
            </p>
          </div>

          {/* Category Tabs: Open, Minimalist Pill Bar (No boxed container) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-sm sm:text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === "all"
                  ? "bg-neutral-900 text-white font-semibold shadow-xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900"
              }`}
            >
              {lang === "ar" ? "جميع الفئات" : "All Categories"}
            </button>

            {MOCK_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-neutral-900 text-white font-semibold shadow-xs"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900"
                  }`}
                >
                  {lang === "ar" ? cat.category_ar : cat.category}
                </button>
              );
            })}
          </div>

          {/* Minimalist Filter Toolbar (Directly on white canvas with standardized element sizes) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center mb-6 pb-6 border-b border-neutral-100">
            {/* Search Input */}
            <div className="sm:col-span-12 md:col-span-5 relative flex items-center">
              <Search
                size={15}
                className="absolute left-3.5 rtl:left-auto rtl:right-3.5 text-neutral-400 pointer-events-none"
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
                className="w-full h-11 sm:h-10 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-xl pl-9 pr-8 rtl:pl-8 rtl:pr-9 text-sm sm:text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 rtl:right-auto rtl:left-3 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Vehicle Filter */}
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

            {/* Sort Order */}
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

            {/* In-Stock Filter Toggle */}
            <div className="sm:col-span-12 md:col-span-2">
              <button
                type="button"
                onClick={() => setOnlyInStock((prev) => !prev)}
                className={`w-full h-11 sm:h-10 px-3.5 rounded-xl border text-sm sm:text-xs font-normal flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  onlyInStock
                    ? "bg-[#faf6ed] border-[#c5a059] text-[#9b7832] font-semibold"
                    : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-900"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    onlyInStock ? "bg-[#c5a059]" : "bg-neutral-300"
                  }`}
                />
                <span className="whitespace-nowrap">{lang === "ar" ? "المتوفر فقط" : "In Stock Only"}</span>
              </button>
            </div>
          </div>

          {/* Active Filter Chips (Quiet and minimal) */}
          {(searchQuery || selectedCategory !== "all" || selectedBrand !== "all" || onlyInStock) && (
            <div className="flex flex-wrap items-center gap-2 text-xs mb-8">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                {lang === "ar" ? "الفلاتر النشطة:" : "Active:"}
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px]">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button type="button" onClick={() => setSearchQuery("")} className="hover:text-neutral-950 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px]">
                  <span>{MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.category || selectedCategory}</span>
                  <button type="button" onClick={() => setSelectedCategory("all")} className="hover:text-neutral-950 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              {selectedBrand !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px]">
                  <span>{selectedBrand}</span>
                  <button type="button" onClick={() => setSelectedBrand("all")} className="hover:text-neutral-950 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              {onlyInStock && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px]">
                  <span>{lang === "ar" ? "المتوفر بالمخزن" : "In Stock"}</span>
                  <button type="button" onClick={() => setOnlyInStock(false)} className="hover:text-neutral-950 cursor-pointer">
                    <X size={11} />
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
                className="text-[11px] text-neutral-500 hover:text-neutral-950 underline ml-1 rtl:ml-0 rtl:mr-1 cursor-pointer transition-colors"
              >
                {lang === "ar" ? "إلغاء التصفية" : "Reset"}
              </button>
            </div>
          )}

          {/* Product Cards Grid: Exactly matches Home Page TopSellingSection Card Model */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {filteredProducts.map((product) => {
                const inStock = product.stock > 0;
                const isAdded = justAddedId === product.id;

                return (
                  <div
                    key={product.id}
                    className="h-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 group"
                  >
                    <div>
                      {/* Product Photo Showcase */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block h-48 sm:h-52 w-full rounded-xl mb-4 bg-neutral-100 relative overflow-hidden p-4 group-hover:scale-[1.02] transition-transform duration-300"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain object-center"
                          onError={(e) => {
                            e.currentTarget.src = "/admin/banners/accessories.jpg";
                          }}
                        />
                      </Link>

                      {/* Model SKU & Stock */}
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5">
                        <span>{product.product_id}</span>
                        <span className={inStock ? "text-neutral-600" : "text-[#b38e46] font-medium"}>
                          {inStock
                            ? lang === "ar"
                              ? "متوفر"
                              : "In Stock"
                            : lang === "ar"
                            ? "طلب مسبق"
                            : "Backorder"}
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-medium text-sm sm:text-sm text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-neutral-950 transition-colors">
                          {lang === "ar" ? product.name_ar : product.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Pricing & Add to Bag (Identical to Home Page) */}
                    <div className="pt-4 border-t border-neutral-100 mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-neutral-900">
                          {product.price}{" "}
                          <span className="text-xs font-medium text-[#c5a059]">{currency}</span>
                        </span>
                      </div>

                      {inStock ? (
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 rounded-lg transition-all duration-200 cursor-pointer ${
                            isAdded
                              ? "bg-[#25D366] text-white"
                              : "bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={13} className="stroke-[2.5]" />
                              <span>{lang === "ar" ? "تمت الإضافة" : "Added!"}</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>{lang === "ar" ? "أضف للسلة" : "Add"}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-xs font-semibold py-2 px-3 rounded-lg border border-neutral-200 text-neutral-700 hover:border-neutral-900 transition"
                        >
                          {lang === "ar" ? "تفاصيل" : "Details"}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Filter Result */
            <div className="text-center py-16 max-w-sm mx-auto mb-16">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <Car size={20} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {lang === "ar" ? "لا توجد منتجات مطابقة للبحث" : "No products found"}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                {lang === "ar"
                  ? "جرب كتابة كلمات مختلفة أو إزالة الفلاتر المحددة."
                  : "Try searching for a different car model or reset filters."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                  setOnlyInStock(false);
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                {lang === "ar" ? "عرض جميع المنتجات" : "Show All Products"}
              </button>
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-[#c5a059] rounded-full animate-spin" />
        </div>
      }
    >
      <SearchCatalogContent />
    </Suspense>
  );
}
