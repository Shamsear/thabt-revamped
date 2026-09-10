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

  // Inline Vehicle and Sort Filters
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter products by category AND by selected vehicle inline
  const filteredProducts = useMemo(() => {
    let list = MOCK_ALL_PRODUCTS.filter(
      (p) => p.category_slug === slug || (slug === "pro-clips" && p.slug.includes("mount"))
    );

    // If none match exactly, show fallback subset of category
    if (list.length === 0) {
      list = MOCK_ALL_PRODUCTS.slice(0, 4);
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
  }, [slug, selectedVehicle, onlyInStock, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <Link href="/search" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "المنتجات" : "Catalog"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? category.category_ar : category.category}
            </span>
          </nav>

          {/* Clean, Compact Category Header (No Big Hero Banner) */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 mb-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
                  {lang === "ar" ? category.category_ar : category.category}
                </h1>
                <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
                  {lang === "ar" ? category.descriptionar : category.description}
                </p>
              </div>

              <div className="text-xs text-neutral-400 shrink-0 font-medium">
                {lang === "ar"
                  ? `${filteredProducts.length} منتج متاح`
                  : `${filteredProducts.length} items available`}
              </div>
            </div>

            {/* Inline Filter Controls (Filters Right on This Page) */}
            <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              {/* Inline Vehicle Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5 shrink-0">
                  <Car size={15} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "تصفية حسب نوع سيارتك:" : "Filter by Vehicle:"}</span>
                </label>

                <div className="w-44 sm:w-52">
                  <CustomSelect
                    value={selectedVehicle}
                    onChange={(val) => setSelectedVehicle(val)}
                    options={[
                      { label: lang === "ar" ? "جميع السيارات" : "All Vehicles", value: "all" },
                      ...VEHICLE_BRANDS.map((b) => ({ label: b, value: b })),
                    ]}
                    lang={lang}
                  />
                </div>

                {selectedVehicle !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedVehicle("all")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 bg-neutral-100 px-2.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    <span>{selectedVehicle}</span>
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Sort Order & Stock Toggle */}
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <div className="w-40">
                  <CustomSelect
                    value={sortBy}
                    onChange={(val) => setSortBy(val as any)}
                    options={[
                      { label: lang === "ar" ? "الأكثر طلباً" : "Featured", value: "featured" },
                      { label: lang === "ar" ? "السعر: الأقل" : "Price: Low to High", value: "price-asc" },
                      { label: lang === "ar" ? "السعر: الأعلى" : "Price: High to Low", value: "price-desc" },
                    ]}
                    lang={lang}
                  />
                </div>

                <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded border-neutral-300 text-[#c5a059] focus:ring-[#c5a059]"
                  />
                  <span>{lang === "ar" ? "المتوفر فقط" : "In Stock"}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col group"
                >
                  {/* Image */}
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
                        {lang === "ar" ? "تخفيض" : "Sale"}
                      </span>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1.5">
                        <span className="font-mono">{product.product_id}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={11} /> {product.stock > 0 ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "طلب مسبق" : "Pre-Order")}
                        </span>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="block text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#9b7832] transition-colors line-clamp-2 mb-2"
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
                        <p className="text-sm font-extrabold text-neutral-950">
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
                        className="py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingBag size={13} />
                        <span>{lang === "ar" ? "إضافة" : "Add"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Filter Result */
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 p-6 max-w-md mx-auto mb-12">
              <Car size={32} className="text-neutral-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-neutral-900 mb-1">
                {lang === "ar"
                  ? `لا توجد قطع مخصصة لـ ${selectedVehicle} في هذه الفئة`
                  : `No ${category.category} found for ${selectedVehicle}`}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                {lang === "ar"
                  ? "جرب إزالة تصفية السيارة أو تصفح كامل الكتالوج."
                  : "Try clearing the vehicle filter or browsing the full catalog."}
              </p>
              <button
                type="button"
                onClick={() => setSelectedVehicle("all")}
                className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {lang === "ar" ? "عرض جميع المنتجات" : "Show All Products"}
              </button>
            </div>
          )}

          {/* Other Categories Strip */}
          <div className="pt-8 border-t border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              {lang === "ar" ? "تصفح الفئات الأخرى" : "Browse Other Collections"}
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {MOCK_CATEGORIES.filter((c) => c.slug !== slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/categories/${other.slug}`}
                  className="px-4 py-2 bg-white rounded-xl border border-neutral-200 hover:border-[#c5a059] text-neutral-700 hover:text-neutral-950 font-medium whitespace-nowrap transition shadow-2xs"
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
