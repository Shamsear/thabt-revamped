"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Download,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  Printer,
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
          image: "https://www.thabt.qa/admin/banners/proclip-1.jpg",
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
          image: "https://www.thabt.qa/admin/banners/i-phone-h15-holder.jpg",
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
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col relative overflow-hidden">
      {/* Ambient background gold glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />

      <Header />

      <main className="flex-1 py-10 sm:py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xs text-center mb-8 relative overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#faf6ed] text-[#9b7832] flex items-center justify-center mx-auto mb-4 border border-[#c5a059]/40 shadow-xs">
              <CheckCircle2 size={38} className="stroke-[2.2] text-[#c5a059]" />
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-[#9b7832] bg-[#faf6ed] px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 shadow-2xs">
              {lang === "ar" ? "تم قبول الطلب والدفع بنجاح" : "Order Confirmed & Payment Verified"}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 mt-4 mb-2">
              {lang === "ar" ? "شكراً لطلبك من ثقة!" : "Thank You For Your Order!"}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              {lang === "ar"
                ? "تم تأكيد طلبك بنجاح وسيبدأ فريق التركيب والشحن بتجهيز قطعك وتسليمها لمندوب التوصيل السريع."
                : "Your precision fitment components are being prepped at our Doha logistics hub for rapid dispatch across Qatar and GCC."}
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-800 bg-[#faf6ed]/60 border border-[#c5a059]/30 px-5 py-3 rounded-2xl shadow-2xs">
              <div>
                <span className="text-neutral-500 font-sans">{lang === "ar" ? "رقم الطلب: " : "Order ID: "}</span>
                <span className="font-extrabold text-neutral-950">{orderInfo.orderId}</span>
              </div>
              <span className="text-[#c5a059]">•</span>
              <div>
                <span className="text-neutral-500 font-sans">{lang === "ar" ? "رقم التتبع: " : "Tracking: "}</span>
                <span className="font-black text-[#9b7832]">{orderInfo.trackingCode}</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs mb-8">
            <h3 className="text-sm font-extrabold text-neutral-950 mb-6 flex items-center gap-2">
              <Truck size={18} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مراحل تجهيز وتسليم الشحنة" : "Delivery Status Tracker"}</span>
            </h3>

            <div className="relative">
              {/* Line */}
              <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-[#c5a059]/30" />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">{lang === "ar" ? "تم تأكيد الطلب" : "Confirmed"}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{orderInfo.date}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-950 text-[#c5a059] border border-[#c5a059]/50 flex items-center justify-center text-xs font-black shrink-0 shadow-md">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">{lang === "ar" ? "التجهيز بمستودع الدوحة" : "Processing"}</p>
                    <p className="text-[10px] text-[#9b7832] font-black">{lang === "ar" ? "جارٍ التغليف الآمن" : "Secure Packaging"}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">{lang === "ar" ? "مع مندوب الشحن" : "With Courier"}</p>
                    <p className="text-[10px] text-neutral-400">DHL Express / Aramex</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">{lang === "ar" ? "تم التوصيل" : "Delivered"}</p>
                    <p className="text-[10px] text-neutral-400">{lang === "ar" ? "خلال 24 ساعة" : "Expected in 24h"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-sm font-extrabold text-neutral-950 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                {lang === "ar" ? "تفاصيل الفاتورة والمنتجات" : "Order Summary & Receipt"}
              </h3>
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="text-xs font-bold text-[#9b7832] hover:text-neutral-950 flex items-center gap-1.5 bg-[#faf6ed] hover:bg-neutral-950 hover:text-white border border-[#c5a059]/30 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Download size={13} className="text-[#c5a059]" />
                <span>{downloadedInvoice ? (lang === "ar" ? "تم التحميل!" : "Invoice Downloaded!") : (lang === "ar" ? "تحميل الفاتورة PDF" : "Download PDF")}</span>
              </button>
            </div>

            {/* Items */}
            <div className="divide-y divide-neutral-100 py-3">
              {orderInfo.items &&
                orderInfo.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-xl bg-[#fafaf9] border border-neutral-200 p-1 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-neutral-900">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية: " : "Quantity: "} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-950 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-500">
                <span>{lang === "ar" ? "الشحن والتوصيل:" : "Shipping:"}</span>
                <span className="text-emerald-700 font-bold">{lang === "ar" ? "شحن مجاني" : "Free Delivery"}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-base font-extrabold text-neutral-950">
                <span>{lang === "ar" ? "الإجمالي المدفوع:" : "Total Paid:"}</span>
                <span className="text-[#9b7832] text-xl font-black">{formatPrice(orderInfo.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] cursor-pointer"
            >
              {lang === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}
            </Link>
            <Link
              href="/profile"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer shadow-sm"
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
