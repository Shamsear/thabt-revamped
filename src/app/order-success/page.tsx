"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  CheckCircle2,
  Truck,
  Download,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function OrderSuccessPage() {
  const { lang, formatPrice } = useAppContext();

  const [orderInfo, setOrderInfo] = useState<any>({
    orderId: "THABT-2026-9281",
    trackingCode: "DHL-QA-882194",
    date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    method: "Credit Card (Simulated)",
    total: 405,
    items: [
      {
        product: {
          id: "101",
          name: "ProClip Custom Car Mount - Toyota Land Cruiser LC300",
          name_ar: "قاعدة برو كليبس مخصصة لسيارة تويوتا لاندكروزر LC300",
          price: 185,
          image: "/admin/banners/proclip-1.jpg",
          product_id: "TH-8551",
        },
        quantity: 1,
      },
      {
        product: {
          id: "102",
          name: "Adjustable Smartphone Holder with MagSafe Wireless Charging",
          name_ar: "حامل هاتف قابل للتعديل مع شاحن ماج سيف لاسلكي",
          price: 220,
          image: "/admin/banners/i-phone-h15-holder.jpg",
          product_id: "TH-9420",
        },
        quantity: 1,
      },
    ],
  });

  const [downloadedInvoice, setDownloadedInvoice] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("thabt_last_order");
      if (saved) {
        setOrderInfo(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadInvoice = () => {
    setDownloadedInvoice(true);
    setTimeout(() => setDownloadedInvoice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Success Banner */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#faf6ed] text-[#c5a059] flex items-center justify-center mx-auto mb-4 border border-[#c5a059]/30">
              <CheckCircle2 size={32} className="stroke-[2.2]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
              {lang === "ar" ? "تم قبول الطلب والدفع بنجاح" : "Order Confirmed & Payment Verified"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mt-2 mb-2">
              {lang === "ar" ? "شكراً لطلبك من " : "Thank You For Your Order with "}
              <span className="font-semibold text-neutral-950">Thabt</span>
            </h1>

            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              {lang === "ar"
                ? "تم تأكيد طلبك بنجاح وسيبدأ فريق التركيب والشحن بتجهيز قطعك وتسليمها لمندوب التوصيل السريع."
                : "Your precision fitment components are being prepped at our Doha logistics hub for rapid dispatch across Qatar and GCC."}
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-800 bg-neutral-50 border border-neutral-200/80 px-4 py-2.5 rounded-xl">
              <div>
                <span className="text-neutral-500 font-sans">{lang === "ar" ? "رقم الطلب: " : "Order ID: "}</span>
                <span className="font-bold text-neutral-950">{orderInfo.orderId}</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div>
                <span className="text-neutral-500 font-sans">{lang === "ar" ? "رقم التتبع: " : "Tracking: "}</span>
                <span className="font-bold text-[#9b7832]">{orderInfo.trackingCode}</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 mb-8">
            <h3 className="text-xs font-semibold text-neutral-950 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Truck size={16} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مراحل تجهيز وتسليم الشحنة" : "Delivery Status Tracker"}</span>
            </h3>

            <div className="relative">
              <div className="hidden sm:block absolute top-4 left-6 right-6 h-px bg-neutral-200" />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "تم تأكيد الطلب" : "Confirmed"}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{orderInfo.date}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-[#c5a059] flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "التجهيز بمستودع الدوحة" : "Processing"}</p>
                    <p className="text-[10px] text-[#9b7832] font-medium">{lang === "ar" ? "التغليف الآمن" : "Secure Packaging"}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-medium shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "مع مندوب الشحن" : "With Courier"}</p>
                    <p className="text-[10px] text-neutral-400">DHL Express</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-medium shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "تم التوصيل" : "Delivered"}</p>
                    <p className="text-[10px] text-neutral-400">{lang === "ar" ? "خلال 24 ساعة" : "Expected in 24h"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-sm font-semibold text-neutral-950 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                {lang === "ar" ? "تفاصيل الفاتورة والمنتجات" : "Order Summary & Receipt"}
              </h3>
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="text-xs font-medium text-neutral-700 hover:text-neutral-950 flex items-center gap-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Download size={13} className="text-[#c5a059]" />
                <span>{downloadedInvoice ? (lang === "ar" ? "تم التحميل!" : "Downloaded!") : (lang === "ar" ? "تحميل الفاتورة PDF" : "Download PDF")}</span>
              </button>
            </div>

            {/* Items */}
            <div className="divide-y divide-neutral-100 py-2">
              {orderInfo.items &&
                orderInfo.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200/60 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 text-sm">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {lang === "ar" ? "الكمية: " : "Quantity: "} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-950 shrink-0 text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-sm sm:text-xs">
              <div className="flex items-center justify-between text-neutral-600">
                <span>{lang === "ar" ? "الشحن والتوصيل:" : "Shipping:"}</span>
                <span className="text-emerald-700 font-semibold">{lang === "ar" ? "شحن مجاني" : "Free Delivery"}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-base font-semibold text-neutral-950">
                <span>{lang === "ar" ? "الإجمالي المدفوع:" : "Total Paid:"}</span>
                <span className="text-xl font-bold text-neutral-950">{formatPrice(orderInfo.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-sm sm:text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              {lang === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}
            </Link>
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider text-center transition-colors cursor-pointer"
            >
              {lang === "ar" ? "عرض جميع طلباتي في حسابي" : "View Order in My Account"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
