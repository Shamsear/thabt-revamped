"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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
  Truck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function ProfilePage() {
  const { lang, formatPrice, addToCart, setCartDrawerOpen } = useAppContext();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "garage">("orders");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null);

  // Auto-center selected pill inside horizontal scroll container
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pillRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  const centerActivePill = (behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const activeEl = pillRefs.current[activeTab];
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
  }, [activeTab]);

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
    <div className={`min-h-screen bg-white text-neutral-900 flex flex-col ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <main className="flex-1 py-5 sm:py-10">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs text-neutral-400 mb-4 sm:mb-6 overflow-x-auto scrollbar-none pb-0.5">
            <Link href="/" className="hover:text-neutral-900 transition shrink-0">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="rtl:rotate-180 text-neutral-300 shrink-0" />
            <span className="text-neutral-900 font-medium flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              {lang === "ar" ? "حسابي والطلبات" : "My Account & Orders"}
            </span>
          </nav>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-7 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 shadow-2xs">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neutral-950 text-[#c5a059] flex items-center justify-center font-bold text-lg sm:text-xl shrink-0 ring-2 ring-[#c5a059]/30">
                M
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base sm:text-xl font-semibold text-neutral-950 truncate">
                    Mohammed Al-Kuwari
                  </h1>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-xl border border-[#c5a059]/30 shrink-0">
                    Thabt VIP
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-neutral-600 mt-0.5">
                  <span className="truncate">mohammed.alkuwari@gmail.com</span>
                  <span className="hidden sm:inline text-neutral-300">•</span>
                  <span className="font-mono text-neutral-700">+974 5581 2940</span>
                </div>
                <p className="text-xs text-[#9b7832] font-medium mt-1 flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0"></span>
                  <span className="truncate">Doha, Qatar (Zone 52)</span>
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 flex items-center">
              <Link
                href="/find"
                className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles size={14} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "مطابقة قطعة جديدة" : "Match New Vehicle"}</span>
              </Link>
            </div>
          </div>

          {/* Tabs Bar: Animated Sliding Pill Switcher */}
          <div ref={containerRef} className="mb-6 sm:mb-8 overflow-x-auto scrollbar-none -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            <LayoutGroup id="profileTabsGroup">
              <div className="inline-flex p-1 sm:p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200/70 gap-1 sm:gap-1.5 min-w-max shadow-2xs">
                {/* Orders Tab */}
                <button
                  type="button"
                  ref={(el) => { pillRefs.current["orders"] = el; }}
                  onClick={() => {
                    setActiveTab("orders");
                    const container = containerRef.current;
                    const el = pillRefs.current["orders"];
                    if (container && el) {
                      const cRect = container.getBoundingClientRect();
                      const pRect = el.getBoundingClientRect();
                      const diff = (pRect.left - cRect.left) + (pRect.width / 2) - (cRect.width / 2);
                      container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
                    }
                  }}
                  className="relative py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl cursor-pointer flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap outline-none focus:outline-none select-none transition-colors"
                >
                  {activeTab === "orders" && (
                    <motion.span
                      layoutId="profileActivePill"
                      className="absolute inset-0 bg-neutral-950 rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Package size={15} className={activeTab === "orders" ? "text-[#c5a059]" : "text-neutral-400"} />
                    <span className={activeTab === "orders" ? "text-white font-semibold" : "text-neutral-600 hover:text-neutral-950"}>
                      {lang === "ar" ? "سجل الطلبات والتتبع" : "Order History"}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                        activeTab === "orders"
                          ? "bg-white/20 text-[#c5a059]"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {MOCK_ORDERS.length}
                    </span>
                  </span>
                </button>

                {/* Addresses Tab */}
                <button
                  type="button"
                  ref={(el) => { pillRefs.current["addresses"] = el; }}
                  onClick={() => {
                    setActiveTab("addresses");
                    const container = containerRef.current;
                    const el = pillRefs.current["addresses"];
                    if (container && el) {
                      const cRect = container.getBoundingClientRect();
                      const pRect = el.getBoundingClientRect();
                      const diff = (pRect.left - cRect.left) + (pRect.width / 2) - (cRect.width / 2);
                      container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
                    }
                  }}
                  className="relative py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl cursor-pointer flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap outline-none focus:outline-none select-none transition-colors"
                >
                  {activeTab === "addresses" && (
                    <motion.span
                      layoutId="profileActivePill"
                      className="absolute inset-0 bg-neutral-950 rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <MapPin size={15} className={activeTab === "addresses" ? "text-[#c5a059]" : "text-neutral-400"} />
                    <span className={activeTab === "addresses" ? "text-white font-semibold" : "text-neutral-600 hover:text-neutral-950"}>
                      {lang === "ar" ? "العناوين المحفوظة" : "Saved Addresses"}
                    </span>
                  </span>
                </button>

                {/* Garage Tab */}
                <button
                  type="button"
                  ref={(el) => { pillRefs.current["garage"] = el; }}
                  onClick={() => {
                    setActiveTab("garage");
                    const container = containerRef.current;
                    const el = pillRefs.current["garage"];
                    if (container && el) {
                      const cRect = container.getBoundingClientRect();
                      const pRect = el.getBoundingClientRect();
                      const diff = (pRect.left - cRect.left) + (pRect.width / 2) - (cRect.width / 2);
                      container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
                    }
                  }}
                  className="relative py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl cursor-pointer flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap outline-none focus:outline-none select-none transition-colors"
                >
                  {activeTab === "garage" && (
                    <motion.span
                      layoutId="profileActivePill"
                      className="absolute inset-0 bg-neutral-950 rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Car size={15} className={activeTab === "garage" ? "text-[#c5a059]" : "text-neutral-400"} />
                    <span className={activeTab === "garage" ? "text-white font-semibold" : "text-neutral-600 hover:text-neutral-950"}>
                      {lang === "ar" ? "مرآب سياراتي" : "My Vehicles Garage"}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                        activeTab === "garage"
                          ? "bg-white/20 text-[#c5a059]"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      2
                    </span>
                  </span>
                </button>
              </div>
            </LayoutGroup>
          </div>

          {/* Smooth Tab Content Switcher with AnimatePresence */}
          <AnimatePresence mode="wait">
            {/* Tab 1: Orders */}
            {activeTab === "orders" && (
              <motion.div
                key="tab-orders"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-950">
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

                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center text-xs text-neutral-500">
                    {lang === "ar" ? "لا توجد طلبات تطابق هذا التصنيف." : "No orders found for this status."}
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-950 p-4 sm:p-6 transition-all duration-300 space-y-3.5 sm:space-y-4 shadow-2xs"
                    >
                      {/* Order header row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono font-bold text-neutral-950 text-xs sm:text-sm">{order.id}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-500 font-mono text-[11px] sm:text-xs">{order.date}</span>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px] sm:text-[11px]">
                            {lang === "ar" ? order.status_ar : order.status}
                          </span>
                          <span className="font-bold text-neutral-950 font-mono text-xs sm:text-sm">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="divide-y divide-neutral-100">
                        {order.products.map((prod, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                            <div className="min-w-0 flex-1">
                              <span className="text-neutral-900 font-medium line-clamp-1 text-xs">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {lang === "ar" ? "الكمية:" : "Qty:"} {prod.qty}
                              </span>
                            </div>
                            <span className="font-semibold text-neutral-900 shrink-0 font-mono text-xs">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tracking & Actions row */}
                      <div className="pt-2 border-t border-neutral-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                        <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px] truncate min-w-0">
                          <Truck size={13} className="text-[#c5a059] shrink-0" />
                          <span className="truncate">
                            {order.courier}: <strong className="text-neutral-800 font-semibold">{order.tracking_number}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleReorder(order)}
                            className="flex-1 sm:flex-initial py-2 sm:py-1.5 px-3 rounded-xl bg-neutral-50 hover:bg-[#faf6ed] text-neutral-800 hover:text-[#9b7832] border border-neutral-200/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active-press"
                          >
                            {reorderingOrderId === order.id ? (
                              <>
                                <Check size={13} className="text-emerald-600 stroke-[2.5]" />
                                <span>{lang === "ar" ? "تمت الإضافة" : "Added"}</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw size={13} className="text-[#c5a059]" />
                                <span>{lang === "ar" ? "إعادة الطلب" : "Buy Again"}</span>
                              </>
                            )}
                          </button>

                          <Link
                            href="/order-success"
                            className="flex-1 sm:flex-initial py-2 sm:py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{lang === "ar" ? "تتبع الشحنة" : "Track Order"}</span>
                            <ChevronRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === "addresses" && (
              <motion.div
                key="tab-addresses"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              >
                {/* Qatar Blue Plate Primary Address */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 space-y-3 relative shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-xl border border-[#c5a059]/30">
                      {lang === "ar" ? "العنوان الرئيسي (قطر)" : "Primary Address (Qatar)"}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check size={12} className="stroke-[3]" />
                      <span>{lang === "ar" ? "مؤكد" : "Verified"}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-neutral-900 mt-1">Old Rayan Villa</h3>
                  
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs font-mono space-y-1">
                    <p className="text-neutral-950 font-semibold break-words">Zone 52 • Street 990 • Building 16</p>
                    <p className="text-neutral-500 text-[11px] leading-relaxed">Old Rayan near Sports Roundabout, Doha, Qatar</p>
                  </div>
                  
                  <p className="text-xs text-neutral-600">
                    <strong className="font-semibold text-neutral-800">{lang === "ar" ? "المستلم:" : "Recipient:"}</strong> Mohammed Al-Kuwari (+974 5581 2940)
                  </p>
                </div>

                {/* Add New Address Card */}
                <div className="bg-neutral-50/50 rounded-2xl border-2 border-dashed border-neutral-300 p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-neutral-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-2xs">
                    <Plus size={18} />
                  </div>
                  <p className="text-xs font-semibold text-neutral-800">{lang === "ar" ? "إضافة عنوان جديد" : "Add New Delivery Address"}</p>
                  <p className="text-[10px] text-neutral-400">{lang === "ar" ? "دولة قطر أو دول مجلس التعاون الخليجي" : "Qatar or GCC destinations"}</p>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Vehicles Garage */}
            {activeTab === "garage" && (
              <motion.div
                key="tab-garage"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-950 p-4 sm:p-6 transition-all duration-300 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-xl border border-[#c5a059]/30">
                      Primary Vehicle
                    </span>
                    <Car size={16} className="text-[#c5a059]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-950">Toyota Land Cruiser LC300 (2024)</h3>
                  <p className="text-xs text-neutral-500">Trim: GR-Sport • Dashboard Standard GCC</p>
                  <div className="pt-2 border-t border-neutral-100">
                    <Link
                      href="/find"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors"
                    >
                      <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for LC300"}</span>
                      <ChevronRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-950 p-4 sm:p-6 transition-all duration-300 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-xl border border-[#c5a059]/30">
                      Off-Road Vehicle
                    </span>
                    <Car size={16} className="text-[#c5a059]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-950">Nissan Patrol Y62 NISMO (2023)</h3>
                  <p className="text-xs text-neutral-500">Console Fitment Verified</p>
                  <div className="pt-2 border-t border-neutral-100">
                    <Link
                      href="/find"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#c5a059] transition-colors"
                    >
                      <span>{lang === "ar" ? "البحث عن قواعد متوافقة مع هذه السيارة" : "Find Compatible Mounts for Patrol"}</span>
                      <ChevronRight size={13} className="rtl:rotate-180 text-[#c5a059]" />
                    </Link>
                  </div>
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

