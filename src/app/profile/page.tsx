"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { MOCK_ORDERS } from "@/data/mockData";
import {
  User,
  Package,
  MapPin,
  Car,
  ChevronRight,
  Truck,
  ExternalLink,
  ShieldCheck,
  Plus,
  RefreshCw,
} from "lucide-react";

export default function ProfilePage() {
  const { lang, formatPrice } = useAppContext();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "garage">("orders");

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <Link href="/" className="hover:text-neutral-900 transition">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">
              {lang === "ar" ? "حسابي والطلبات" : "My Account & Orders"}
            </span>
          </nav>

          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-950 text-[#c5a059] flex items-center justify-center font-bold text-xl">
                M
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold text-neutral-950">
                    Mohammed Al-Kuwari
                  </h1>
                  <span className="text-[10px] font-bold text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    Thabt VIP Club
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">mohammed.alkuwari@gmail.com • +974 5581 2940</p>
                <p className="text-[11px] text-neutral-400 mt-1">Doha, Qatar</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/find"
                className="py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition"
              >
                {lang === "ar" ? "مطابقة قطعة جديدة" : "Match New Vehicle"}
              </Link>
            </div>
          </div>

          {/* Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-neutral-200 mb-8 overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "orders"
                  ? "border-neutral-950 text-neutral-950"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <Package size={15} />
              <span>{lang === "ar" ? "سجل الطلبات والتتبع" : "Order History"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "addresses"
                  ? "border-neutral-950 text-neutral-950"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <MapPin size={15} />
              <span>{lang === "ar" ? "العناوين المحفوظة" : "Saved Addresses"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("garage")}
              className={`pb-3 px-3 transition cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === "garage"
                  ? "border-neutral-950 text-neutral-950"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <Car size={15} />
              <span>{lang === "ar" ? "مرآب سياراتي" : "My Vehicles Garage"}</span>
            </button>
          </div>

          {/* Tab 1: Orders */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-neutral-900">{order.id}</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-500">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                        {lang === "ar" ? order.status_ar : order.status}
                      </span>
                      <span className="font-extrabold text-neutral-950 text-sm">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-neutral-100">
                    {order.products.map((prod, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="text-neutral-800 font-medium">{prod.name}</span>
                        <span className="text-neutral-500">{formatPrice(prod.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking link */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-neutral-500 text-[11px]">
                      Courier: {order.courier} ({order.tracking_number})
                    </span>
                    <Link
                      href="/order-success"
                      className="text-[#9b7832] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>{lang === "ar" ? "تتبع الشحنة بالتفصيل" : "Live Package Tracking"}</span>
                      <ChevronRight size={12} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Addresses */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qatar Blue Plate Primary Address */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {lang === "ar" ? "العنوان الرئيسي (قطر)" : "Primary Address (Qatar)"}
                </span>

                <h3 className="text-sm font-bold text-neutral-900 mt-2">Old Rayan Villa</h3>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/80 text-xs font-mono space-y-1">
                  <p className="text-blue-900 font-bold">Zone 52 • Street 990 • Building 16</p>
                  <p className="text-neutral-500 text-[11px]">Old Rayan near Sports Roundabout, Doha, Qatar</p>
                </div>
                <p className="text-xs text-neutral-600">Recipient: Mohammed Al-Kuwari (+974 5581 2940)</p>
              </div>

              {/* Add New Address Card */}
              <div className="bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200 p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-neutral-100/50 transition">
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600">
                  <Plus size={18} />
                </div>
                <p className="text-xs font-bold text-neutral-800">{lang === "ar" ? "إضافة عنوان جديد" : "Add New Delivery Address"}</p>
                <p className="text-[10px] text-neutral-400">{lang === "ar" ? "دولة قطر أو دول مجلس التعاون الخليجي" : "Qatar or GCC destinations"}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Vehicles Garage */}
          {activeTab === "garage" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-0.5 rounded-full">
                  Primary Vehicle
                </span>
                <h3 className="text-base font-bold text-neutral-950">Toyota Land Cruiser LC300 (2024)</h3>
                <p className="text-xs text-neutral-500">Trim: GR-Sport • Dashboard Standard GCC</p>
                <div className="pt-2">
                  <Link
                    href="/find"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9b7832] hover:underline"
                  >
                    <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for LC300"}</span>
                    <ChevronRight size={12} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                  Off-Road Vehicle
                </span>
                <h3 className="text-base font-bold text-neutral-950">Nissan Patrol Y62 NISMO (2023)</h3>
                <p className="text-xs text-neutral-500">Console Fitment Verified</p>
                <div className="pt-2">
                  <Link
                    href="/find"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9b7832] hover:underline"
                  >
                    <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for Patrol"}</span>
                    <ChevronRight size={12} className="rtl:rotate-180" />
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
