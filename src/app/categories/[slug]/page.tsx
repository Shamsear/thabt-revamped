"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomSelect } from "@/components/CustomSelect";
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
} from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { lang, formatPrice, addToCart, currency } = useAppContext();

  // Inline Search, Vehicle, and Sort Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const normalizedSlug =
    slug === "mounting-bases" || slug === "mounting-base" ? "pro-clips" : slug;

  const category = MOCK_CATEGORIES.find((c) => c.slug === normalizedSlug);

  if (!category) {
    notFound();
  }

  // Filter products by category, search query, and vehicle inline
  const filteredProducts = useMemo(() => {
    let list = MOCK_ALL_PRODUCTS.filter(
      (p) =>
        p.category_slug === normalizedSlug ||
        (normalizedSlug === "pro-clips" && p.slug.includes("mount"))
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
  }, [normalizedSlug, searchQuery, selectedVehicle, onlyInStock, sortBy]);

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

          {/* Category Tabs: Open, Minimalist Pill Bar (No boxed container) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-4 mb-4 sm:mb-6 scrollbar-none text-xs">
            <Link
              href="/search"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition-colors bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 shrink-0 text-xs"
            >
              {lang === "ar" ? "جميع المنتجات" : "All Products"}
            </Link>

            {MOCK_CATEGORIES.map((cat) => {
              const isSelected = cat.slug === normalizedSlug;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition-colors shrink-0 text-xs ${
                    isSelected
                      ? "bg-neutral-900 text-white font-semibold shadow-xs"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900"
                  }`}
                >
                  {lang === "ar" ? cat.category_ar : cat.category}
                </Link>
              );
            })}
          </div>

          {/* Minimalist Filter Toolbar (Compact on mobile: 2 neat rows) */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3 items-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-neutral-100">
            {/* Search Input */}
            <div className="col-span-12 md:col-span-5 relative flex items-center">
              <Search
                size={14}
                className="absolute left-3 rtl:left-auto rtl:right-3 text-neutral-400 pointer-events-none"
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
                className="w-full h-9 sm:h-10 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-xl pl-8 pr-7 rtl:pl-7 rtl:pr-8 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 rtl:right-auto rtl:left-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Vehicle Filter */}
            <div className="col-span-6 md:col-span-3">
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

            {/* Sort Order */}
            <div className="col-span-6 md:col-span-2">
              <CustomSelect
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                options={[
                  { label: lang === "ar" ? "الأكثر طلباً" : "Featured", value: "featured" },
                  { label: lang === "ar" ? "السعر: الأقل" : "Price: Low", value: "price-asc" },
                  { label: lang === "ar" ? "السعر: الأعلى" : "Price: High", value: "price-desc" },
                ]}
                placeholder={lang === "ar" ? "الترتيب" : "Sort By"}
                lang={lang}
              />
            </div>

            {/* In-Stock Filter Toggle */}
            <div className="col-span-12 md:col-span-2">
              <button
                type="button"
                onClick={() => setOnlyInStock((prev) => !prev)}
                className={`w-full h-9 sm:h-10 px-3 rounded-xl border text-xs font-normal flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
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
          {(searchQuery || selectedVehicle !== "all" || onlyInStock) && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs mb-4 sm:mb-8">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                {lang === "ar" ? "الفلاتر النشطة:" : "Active:"}
              </span>

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
                className="text-[10px] sm:text-[11px] text-neutral-500 hover:text-neutral-950 underline ml-1 rtl:ml-0 rtl:mr-1 cursor-pointer transition-colors"
              >
                {lang === "ar" ? "إلغاء التصفية" : "Reset"}
              </button>
            </div>
          )}

          {/* Product Cards Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6 mb-10 sm:mb-16">
              {filteredProducts.map((product) => {
                const inStock = product.stock > 0;
                const isAdded = justAddedId === product.id;

                return (
                  <div
                    key={product.id}
                    className="h-full flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 group"
                  >
                    <div>
                      {/* Product Photo Showcase */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block h-32 sm:h-52 w-full rounded-lg sm:rounded-xl mb-2 sm:mb-4 bg-neutral-100 relative overflow-hidden p-2 sm:p-4 group-hover:scale-[1.02] transition-transform duration-300"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain object-center"
                        />
                      </Link>

                      {/* Model SKU & Stock */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-500 mb-1">
                        <span className="truncate max-w-[60px] sm:max-w-none">{product.product_id}</span>
                        <span className={`shrink-0 ${inStock ? "text-neutral-600" : "text-[#b38e46] font-medium"}`}>
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
                        <h3 className="font-medium text-xs sm:text-sm text-neutral-900 leading-snug line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-neutral-950 transition-colors">
                          {lang === "ar" ? product.name_ar : product.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Pricing & Add to Bag */}
                    <div className="pt-2 sm:pt-4 border-t border-neutral-100 mt-2 sm:mt-3 flex items-center justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-xs sm:text-base font-semibold text-neutral-900 block truncate">
                          {product.price}{" "}
                          <span className="text-[10px] sm:text-xs font-medium text-[#c5a059]">{currency}</span>
                        </span>
                      </div>

                      {inStock ? (
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className={`flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold py-1.5 px-2 sm:py-2 sm:px-3.5 rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
                            isAdded
                              ? "bg-[#25D366] text-white"
                              : "bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={12} className="stroke-[2.5]" />
                              <span className="hidden xs:inline">{lang === "ar" ? "تم" : "Added"}</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} />
                              <span>{lang === "ar" ? "أضف" : "Add"}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-[11px] sm:text-xs font-semibold py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg border border-neutral-200 text-neutral-700 hover:border-neutral-900 transition shrink-0"
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
                {lang === "ar" ? "لا توجد منتجات مطابقة" : "No matching products"}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                {lang === "ar"
                  ? "جرب إزالة بعض الفلاتر لعرض مزيد من النتائج."
                  : "Try clearing search keywords or vehicle filter."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedVehicle("all");
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
