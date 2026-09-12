"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutStepper } from "@/components/CheckoutStepper";
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
    <div className={`min-h-screen bg-white text-neutral-900 flex flex-col ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <main className="flex-1 py-5 sm:py-10">
        <div className="max-w-3xl mx-auto px-3.5 sm:px-8">
          {/* Responsive Stepper */}
          <CheckoutStepper currentStep={3} lang={lang} />

          {/* Success Banner */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-8 text-center mb-6 shadow-2xs">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#faf6ed] text-[#c5a059] flex items-center justify-center mx-auto mb-3.5 border border-[#c5a059]/30">
              <CheckCircle2 size={28} className="stroke-[2.2]" />
            </div>

            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-bold">
              {lang === "ar" ? "تم تأكيد الطلب والدفع بنجاح" : "Order Confirmed & Payment Verified"}
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-900 tracking-tight mt-1.5 mb-2">
              {lang === "ar" ? "شكراً لطلبك من " : "Thank You For Your Order with "}
              <span className="font-semibold text-neutral-950">Thabt</span>
            </h1>

            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              {lang === "ar"
                ? "تم تأكيد طلبك وسيبدأ فريق التجهيز والتركيب بإعداد الشحنة لتسليمها بأسرع وقت."
                : "Your precision fitment components are being prepped at our logistics hub for rapid dispatch across Qatar & GCC."}
            </p>

            {/* Order & Tracking Details Card */}
            <div className="mt-5 inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-neutral-800 bg-neutral-50/80 border border-neutral-200/80 px-4 py-2.5 rounded-xl w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-neutral-500 font-sans text-[11px]">{lang === "ar" ? "رقم الطلب:" : "Order ID:"}</span>
                <span className="font-bold text-neutral-950">{orderInfo.orderId}</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <div className="flex items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-200/60">
                <span className="text-neutral-500 font-sans text-[11px]">{lang === "ar" ? "رقم التتبع:" : "Tracking:"}</span>
                <span className="font-bold text-[#9b7832]">{orderInfo.trackingCode}</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 mb-6 shadow-2xs">
            <h3 className="text-xs font-semibold text-neutral-950 uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2">
              <Truck size={15} className="text-[#c5a059]" />
              <span>{lang === "ar" ? "مراحل الشحنة" : "Delivery Status Tracker"}</span>
            </h3>

            {/* Desktop Horizontal Tracker */}
            <div className="hidden sm:block relative">
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-neutral-200 rounded-full" />
              <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "تم التأكيد" : "Confirmed"}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{orderInfo.date}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-950 text-[#c5a059] flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-[#c5a059]/30">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "التجهيز والتغليف" : "Processing"}</p>
                    <p className="text-[10px] text-[#9b7832] font-medium">{lang === "ar" ? "مستودع الدوحة" : "Doha Hub"}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-1.5 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-medium shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "مع المندوب" : "With Courier"}</p>
                    <p className="text-[10px] text-neutral-400">DHL Express</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center gap-1.5 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-medium shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "تم التوصيل" : "Delivered"}</p>
                    <p className="text-[10px] text-neutral-400">{lang === "ar" ? "خلال 24 ساعة" : "Within 24h"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Vertical Timeline with Connecting Line (< sm) */}
            <div className="sm:hidden relative pl-6 rtl:pl-0 rtl:pr-6 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-2.5 rtl:before:left-auto rtl:before:right-2.5 before:w-0.5 before:bg-neutral-200">
              {/* Step 1 */}
              <div className="relative flex items-center gap-3">
                <div className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 ring-4 ring-white">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "تم تأكيد الطلب والدفع" : "Order Confirmed & Paid"}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">{orderInfo.date}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center gap-3">
                <div className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-5 h-5 rounded-full bg-neutral-950 text-[#c5a059] flex items-center justify-center text-[10px] font-bold shrink-0 ring-4 ring-white">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-950">{lang === "ar" ? "جارٍ التجهيز والتغليف" : "Processing at Doha Hub"}</p>
                  <p className="text-[10px] text-[#9b7832] font-medium">{lang === "ar" ? "التغليف الآمن في مستودع الدوحة" : "Secure fitment packaging"}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center gap-3 opacity-50">
                <div className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px] font-bold shrink-0 ring-4 ring-white">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "تسليم لمندوب الشحن السريع" : "With DHL Courier"}</p>
                  <p className="text-[10px] text-neutral-400">{lang === "ar" ? "التوصيل إلى باب منزلك" : "Doorstep dispatch"}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center gap-3 opacity-50">
                <div className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px] font-bold shrink-0 ring-4 ring-white">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-950">{lang === "ar" ? "اكتمال التوصيل" : "Delivered"}</p>
                  <p className="text-[10px] text-neutral-400">{lang === "ar" ? "الموعد المتوقع خلال 24 ساعة" : "Expected in 24 hours"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 mb-6 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <h3 className="text-xs sm:text-sm font-semibold text-neutral-950 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>{lang === "ar" ? "ملخص الفاتورة" : "Order Summary & Receipt"}</span>
              </h3>
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 flex items-center gap-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Download size={13} className="text-[#c5a059]" />
                <span>{downloadedInvoice ? (lang === "ar" ? "تم التحميل!" : "Downloaded!") : (lang === "ar" ? "تحميل الفاتورة PDF" : "Download PDF")}</span>
              </button>
            </div>

            {/* Items */}
            <div className="divide-y divide-neutral-100 py-1">
              {orderInfo.items &&
                orderInfo.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200/60 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-900 text-xs truncate max-w-[200px] sm:max-w-none">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-950 shrink-0 font-mono text-xs sm:text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-neutral-600">
                <span>{lang === "ar" ? "الشحن والتوصيل:" : "Shipping:"}</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">{lang === "ar" ? "شحن مجاني" : "Free Delivery"}</span>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between font-semibold text-neutral-950">
                <span className="text-sm">{lang === "ar" ? "الإجمالي المدفوع:" : "Total Paid:"}</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-950">{formatPrice(orderInfo.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 text-xs font-semibold text-center transition-colors cursor-pointer shadow-xs"
            >
              {lang === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}
            </Link>
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold text-center transition-colors cursor-pointer"
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
