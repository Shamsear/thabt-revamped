"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import { MOCK_ORDERS, MOCK_ALL_PRODUCTS } from "@/data/mockData";
import {
  Package,
  MapPin,
  Car,
  ChevronRight,
  Plus,
  RotateCcw,
  Check,
  ShoppingBag,
} from "lucide-react";

export default function ProfilePage() {
  const { lang, formatPrice, addToCart, setCartDrawerOpen } = useAppContext();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "garage">("orders");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null);

  const handleReorder = (order: typeof MOCK_ORDERS[0]) => {
    order.products.forEach((p) => {
      const matched = MOCK_ALL_PRODUCTS.find((item) => item.name === p.name) || {
        id: Math.random().toString(),
        product_id: "TH-REORDER",
        name: p.name,
        name_ar: p.name,
        slug: "proclip-land-cruiser-lc300",
        price: p.price,
        stock: 10,
        weight: 0.3,
        image: "/admin/banners/proclip-1.jpg",
        link: "products",
      };
      addToCart(matched, 1);
    });
    setReorderingOrderId(order.id);
    setTimeout(() => {
      setReorderingOrderId(null);
      setCartDrawerOpen(true);
    }, 400);
  };

  const filteredOrders =
    orderStatusFilter === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status.toLowerCase().includes(orderStatusFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300" />
            <span className="text-neutral-900 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "حسابي والطلبات" : "My Account & Orders"}
            </span>
          </nav>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-[#c5a059] flex items-center justify-center font-bold text-xl">
                M
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-semibold text-neutral-950">
                    Mohammed Al-Kuwari
                  </h1>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    Thabt VIP
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-0.5">mohammed.alkuwari@gmail.com • +974 5581 2940</p>
                <p className="text-xs text-[#9b7832] font-medium mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                  <span>Doha, Qatar (Zone 52)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/find"
                className="py-3 px-5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-sm sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lang === "ar" ? "مطابقة قطعة جديدة" : "Match New Vehicle"}
              </Link>
            </div>
          </div>

          {/* Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-neutral-200/80 mb-8 overflow-x-auto text-sm sm:text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "orders"
                  ? "border-neutral-900 text-neutral-950 font-semibold"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <Package size={15} className={activeTab === "orders" ? "text-[#c5a059]" : ""} />
              <span>{lang === "ar" ? "سجل الطلبات والتتبع" : "Order History"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "addresses"
                  ? "border-neutral-900 text-neutral-950 font-semibold"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <MapPin size={15} className={activeTab === "addresses" ? "text-[#c5a059]" : ""} />
              <span>{lang === "ar" ? "العناوين المحفوظة" : "Saved Addresses"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("garage")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "garage"
                  ? "border-neutral-900 text-neutral-950 font-semibold"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <Car size={15} className={activeTab === "garage" ? "text-[#c5a059]" : ""} />
              <span>{lang === "ar" ? "مرآب سياراتي" : "My Vehicles Garage"}</span>
            </button>
          </div>

          {/* Tab 1: Orders */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "سجل الطلبات والمشتريات" : "Order History & Status"}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {lang === "ar" ? "تتبع مباشر لحالة التوصيل السريع بالخليج" : "Live package tracking and invoice history"}
                  </p>
                </div>
                <div className="w-full sm:w-56 shrink-0">
                  <CustomSelect
                    value={orderStatusFilter}
                    onChange={(val) => setOrderStatusFilter(val)}
                    options={[
                      { value: "all", label: lang === "ar" ? "جميع الحالات" : "All Order Statuses" },
                      { value: "Out for Delivery", label: lang === "ar" ? "جاري التوصيل" : "Out for Delivery" },
                      { value: "Delivered", label: lang === "ar" ? "تم الاستلام" : "Delivered" },
                    ]}
                    lang={lang}
                  />
                </div>
              </div>

              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-semibold text-neutral-900">{order.id}</span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[#9b7832] font-semibold bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30 text-[11px]">
                        {lang === "ar" ? order.status_ar : order.status}
                      </span>
                      <span className="font-bold text-neutral-950 text-sm">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-neutral-100">
                    {order.products.map((prod, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <span className="text-neutral-800 font-medium">{prod.name}</span>
                        <span className="text-neutral-500">{formatPrice(prod.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking link & Reorder Action */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-neutral-400 text-[11px]">
                      Courier: {order.courier} ({order.tracking_number})
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#9b7832] border border-neutral-200/80 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer active-press"
                      >
                        {reorderingOrderId === order.id ? (
                          <>
                            <Check size={12} className="text-emerald-600 stroke-[2.5]" />
                            <span>{lang === "ar" ? "تمت الإضافة للسلة" : "Added to Cart"}</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw size={12} className="text-[#c5a059]" />
                            <span>{lang === "ar" ? "إعادة الطلب" : "Buy Again"}</span>
                          </>
                        )}
                      </button>

                      <Link
                        href="/order-success"
                        className="text-neutral-900 font-semibold hover:text-[#c5a059] flex items-center gap-1 transition-colors"
                      >
                        <span>{lang === "ar" ? "تتبع الشحنة" : "Track Order"}</span>
                        <ChevronRight size={12} className="rtl:rotate-180 text-[#c5a059]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Addresses */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qatar Blue Plate Primary Address */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-3 relative">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                  {lang === "ar" ? "العنوان الرئيسي (قطر)" : "Primary Address (Qatar)"}
                </span>

                <h3 className="text-sm font-semibold text-neutral-900 mt-2">Old Rayan Villa</h3>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono space-y-1">
                  <p className="text-neutral-900 font-semibold">Zone 52 • Street 990 • Building 16</p>
                  <p className="text-neutral-500 text-[11px]">Old Rayan near Sports Roundabout, Doha, Qatar</p>
                </div>
                <p className="text-xs text-neutral-500">Recipient: Mohammed Al-Kuwari (+974 5581 2940)</p>
              </div>

              {/* Add New Address Card */}
              <div className="bg-neutral-50/50 rounded-2xl border-2 border-dashed border-neutral-300 p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-neutral-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600">
                  <Plus size={18} />
                </div>
                <p className="text-xs font-semibold text-neutral-800">{lang === "ar" ? "إضافة عنوان جديد" : "Add New Delivery Address"}</p>
                <p className="text-[10px] text-neutral-400">{lang === "ar" ? "دولة قطر أو دول مجلس التعاون الخليجي" : "Qatar or GCC destinations"}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Vehicles Garage */}
          {activeTab === "garage" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                  Primary Vehicle
                </span>
                <h3 className="text-base font-semibold text-neutral-950">Toyota Land Cruiser LC300 (2024)</h3>
                <p className="text-xs text-neutral-500">Trim: GR-Sport • Dashboard Standard GCC</p>
                <div className="pt-2">
                  <Link
                    href="/find"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors"
                  >
                    <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for LC300"}</span>
                    <ChevronRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 p-6 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                  Off-Road Vehicle
                </span>
                <h3 className="text-base font-semibold text-neutral-950">Nissan Patrol Y62 NISMO (2023)</h3>
                <p className="text-xs text-neutral-500">Console Fitment Verified</p>
                <div className="pt-2">
                  <Link
                    href="/find"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors"
                  >
                    <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for Patrol"}</span>
                    <ChevronRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
