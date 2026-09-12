"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Banknote,
  Building2,
  Loader2,
  MapPin,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

export default function DummyPayPage() {
  const router = useRouter();
  const { lang, cartItems, cartSubtotalQar, formatPrice, clearCart } = useAppContext();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "qpay" | "apple" | "cod">("card");
  const [checkoutInfo, setCheckoutInfo] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("thabt_checkout_info");
      if (saved) {
        setCheckoutInfo(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Dummy Card state
  const [cardHolder, setCardHolder] = useState("Mohammed Al-Kuwari");
  const [cardNumber, setCardNumber] = useState("4000 1234 5678 9010");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("789");

  // Simulation loading state
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const subtotalQar =
    Number.isFinite(cartSubtotalQar) && cartSubtotalQar >= 0
      ? cartSubtotalQar
      : cartItems.reduce(
          (acc, item) =>
            acc + (Number(item?.product?.price) || 0) * (Number(item?.quantity) || 1),
          0
        );
  const shippingCostQar = subtotalQar > 200 || subtotalQar === 0 ? 0 : 15;
  const orderTotalQar = subtotalQar + shippingCostQar;

  // Auto fill dummy card
  const handleAutoFillDummy = () => {
    setCardHolder("Mohammed Al-Kuwari");
    setCardNumber("4242 •••• •••• 4242");
    setCardExpiry("09/29");
    setCardCvv("888");
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage(
      lang === "ar"
        ? "جارٍ محاكاة التفويض البنكي الآمن عبر بوابة الدفع..."
        : "Simulating 3D-Secure 2.0 authorization with bank gateway..."
    );

    setTimeout(() => {
      // Create random order ID
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const orderId = `THABT-2026-${randomOrderNum}`;
      const trackingCode = `DHL-QA-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        orderId,
        trackingCode,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        method: paymentMethod,
        total: orderTotalQar,
        items: cartItems,
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("thabt_last_order", JSON.stringify(orderData));
      }

      // Clear cart
      clearCart();

      // Redirect to success screen
      router.push("/order-success");
    }, 1400);
  };

  return (
    <div className={`min-h-screen bg-white text-neutral-900 flex flex-col ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-neutral-200/80 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/user/images/black_logo.png" alt="Thabt" className="h-8 sm:h-9.5 md:h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#faf6ed] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full">
            <Lock size={13} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "بوابة الدفع التوضيحية المشفرة" : "Simulated Payment Gateway"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3.5 sm:px-8 py-5 sm:py-10 flex-1 w-full">
        {/* Responsive Stepper */}
        <CheckoutStepper currentStep={2} lang={lang} />

        {/* Mobile Top Brief Summary Card (< lg) */}
        <div className="lg:hidden mb-4 bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-2xs">
          <div className="p-3.5 sm:p-5 flex items-center justify-between gap-2 bg-gradient-to-r from-neutral-50/90 via-white to-[#faf6ed]/40">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold block truncate">
                {lang === "ar" ? "المبلغ الإجمالي المستحق" : "Total Amount Payable"}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl sm:text-2xl font-bold text-neutral-950 font-mono tracking-tight">
                  {formatPrice(orderTotalQar)}
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                  ({cartItems.length} {lang === "ar" ? "منتج" : cartItems.length === 1 ? "item" : "items"})
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 flex items-center gap-1 truncate">
                <MapPin size={12} className="text-[#c5a059] shrink-0" />
                <span className="truncate">
                  {checkoutInfo
                    ? `${checkoutInfo.firstName} ${checkoutInfo.lastName} • ${checkoutInfo.city || checkoutInfo.country} ${checkoutInfo.zoneNumber ? `(Zone ${checkoutInfo.zoneNumber})` : ""}`
                    : lang === "ar"
                    ? "توصيل سريع وموثوق داخل قطر ودول الخليج"
                    : "Express delivery across Qatar & GCC"}
                </span>
              </p>
            </div>

            {/* Toggle item details button */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white border border-neutral-200/90 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:border-neutral-400 transition-colors shadow-2xs cursor-pointer"
            >
              <ShoppingBag size={12} className="text-[#c5a059]" />
              <span className="hidden sm:inline">
                {showDetails
                  ? lang === "ar" ? "إخفاء التفاصيل" : "Hide Details"
                  : lang === "ar" ? "عرض المنتجات" : "View Items"}
              </span>
              <span className="sm:hidden">
                {showDetails
                  ? lang === "ar" ? "إخفاء" : "Hide"
                  : lang === "ar" ? "المنتجات" : "Items"}
              </span>
              <ChevronDown
                size={12}
                className={`text-neutral-400 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Expandable item thumbnails & breakdown (< lg) */}
          {showDetails && (
            <div className="p-3.5 sm:p-4 border-t border-neutral-100 bg-neutral-50/40">
              <div className="divide-y divide-neutral-100 max-h-52 overflow-y-auto py-1 scrollbar-none">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-2 flex items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 p-0.5 shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-950 truncate max-w-[170px] sm:max-w-[240px] text-xs">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-950 shrink-0 font-mono text-xs">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-600">
                <span>{lang === "ar" ? "رسوم الشحن والتوصيل:" : "Shipping & Handling:"}</span>
                <span className="font-semibold text-neutral-900">
                  {shippingCostQar === 0 ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      {lang === "ar" ? "مجاني" : "Free"}
                    </span>
                  ) : (
                    formatPrice(shippingCostQar)
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Payment Options & Card Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Dummy Notification Banner */}
            <div className="p-3 rounded-xl bg-[#faf6ed]/60 border border-[#c5a059]/30 flex items-center gap-2.5 text-xs text-neutral-900">
              <Sparkles size={15} className="text-[#c5a059] shrink-0" />
              <p className="text-[11px] text-neutral-600 leading-snug">
                <strong className="text-neutral-950 font-semibold">{lang === "ar" ? "وضع محاكاة توضيحي:" : "Interactive Prototype:"} </strong>
                {lang === "ar"
                  ? "لا يتم خصم مبالغ حقيقية. يمكنك النقر على 'تعبئة بيانات تجريبية' وتأكيد الدفع."
                  : "No real charge occurs. Click 'Auto-Fill Test Card' and confirm to test full receipt flow."}
              </p>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                  paymentMethod === "card"
                    ? "bg-neutral-950 border-neutral-950 text-white font-medium shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <CreditCard size={16} className={paymentMethod === "card" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-[10px] sm:text-xs font-medium truncate w-full">Visa/MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("qpay")}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                  paymentMethod === "qpay"
                    ? "bg-neutral-950 border-neutral-950 text-white font-medium shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Building2 size={16} className={paymentMethod === "qpay" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-[10px] sm:text-xs font-medium truncate w-full">QPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                  paymentMethod === "apple"
                    ? "bg-neutral-950 border-neutral-950 text-white font-medium shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Smartphone size={16} className={paymentMethod === "apple" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-[10px] sm:text-xs font-medium truncate w-full"> Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                  paymentMethod === "cod"
                    ? "bg-neutral-950 border-neutral-950 text-white font-medium shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Banknote size={16} className={paymentMethod === "cod" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-[10px] sm:text-xs font-medium truncate w-full">{lang === "ar" ? "استلام" : "COD"}</span>
              </button>
            </div>

            {/* Payment Method Panel */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-2xs">
              {paymentMethod === "card" && (
                <form onSubmit={handleSimulatePayment} className="space-y-3 sm:space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-neutral-100">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                      <span>{lang === "ar" ? "بيانات البطاقة البنكية" : "Card Details"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFillDummy}
                      className="text-[11px] sm:text-xs font-semibold text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-lg border border-[#c5a059]/30 hover:bg-[#faf6ed]/80 cursor-pointer transition-colors"
                    >
                      {lang === "ar" ? "⚡ تعبئة بيانات تجريبية" : "⚡ Auto-Fill Test Card"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      {lang === "ar" ? "الاسم المطبوع على البطاقة" : "Cardholder Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3.5 text-sm sm:text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      {lang === "ar" ? "رقم البطاقة" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3.5 text-sm sm:text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-xs text-neutral-700 mb-1 font-medium">
                        {lang === "ar" ? "تاريخ الانتهاء" : "Expiry (MM/YY)"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3 text-sm sm:text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-center sm:text-left rtl:sm:text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-700 mb-1 font-medium">
                        {lang === "ar" ? "رمز الأمان CVV" : "CVV Code"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full h-11 sm:h-10 bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3 text-sm sm:text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-center sm:text-left rtl:sm:text-right"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-2 sm:mt-3 py-3.5 sm:py-4 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        <span>{statusMessage}</span>
                      </>
                    ) : (
                      <>
                        <Lock size={15} className="text-[#c5a059]" />
                        <span>
                          {lang === "ar"
                            ? `تأكيد ودفع ${formatPrice(orderTotalQar)} (محاكاة)`
                            : `Pay ${formatPrice(orderTotalQar)} (Simulated)`}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === "qpay" && (
                <div className="space-y-3.5 text-center py-3">
                  <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
                    <Building2 size={22} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "بوابة الدفع الوطنية القطرية NAPS / QPay" : "Qatar Debit Gateway (QPay / NAPS)"}
                  </h4>
                  <p className="text-[11px] text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    {lang === "ar"
                      ? "الدفع المباشر عبر بطاقات الصراف الآلي للبنوك القطرية (QNB، الدوحة، المصرف، دخان، الريان، الأهلي)."
                      : "Direct bank debit supported for all Qatar local NAPS debit cards."}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <span>{lang === "ar" ? `محاكاة الدفع (${formatPrice(orderTotalQar)})` : `Simulate QPay (${formatPrice(orderTotalQar)})`}</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="space-y-3.5 text-center py-3">
                  <div className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto">
                    <Smartphone size={22} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-950">Apple Pay 1-Click</h4>
                  <p className="text-[11px] text-neutral-500">
                    {lang === "ar" ? "انقر بالأسفل لمحاكاة الدفع الفوري عبر Apple Pay" : "Tap below to simulate instant Apple Pay confirmation"}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <span> Pay with Apple Pay ({formatPrice(orderTotalQar)})</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="space-y-3.5 text-center py-3">
                  <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
                    <Banknote size={22} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "الدفع عند الاستلام (داخل قطر)" : "Cash or Card on Delivery"}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {lang === "ar"
                      ? "متاح داخل دولة قطر. يمكنك الدفع لمندوب التوصيل نقداً أو عبر جهاز الدفع اللاسلكي POS."
                      : "Pay securely to the courier driver upon arrival in Qatar using cash or POS card machine."}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <span>{lang === "ar" ? `تأكيد الطلب (${formatPrice(orderTotalQar)})` : `Confirm COD Order (${formatPrice(orderTotalQar)})`}</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Security & Guarantee Footer Bar */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs text-neutral-600">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 size={14} />
                <span>{lang === "ar" ? "وضع محاكاة آمن (بدون خصم حقيقي)" : "Simulation mode (No real charge)"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#c5a059]" />
                <span>{lang === "ar" ? "تتبع فوري وفاتورة رسمية" : "Official invoice & tracking"}</span>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar (5 cols, desktop only) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
              <h3 className="text-sm font-semibold text-neutral-950 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>{lang === "ar" ? "ملخص طلبك" : "Your Order"} ({cartItems.length})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              </h3>

              {/* Delivery destination pill */}
              {checkoutInfo && (
                <div className="my-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-900 mb-0.5">
                    <MapPin size={13} className="text-[#c5a059]" />
                    <span>{lang === "ar" ? "عنوان الاستلام:" : "Delivering to:"}</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] truncate">
                    {checkoutInfo.firstName} {checkoutInfo.lastName} • {checkoutInfo.city || checkoutInfo.country} {checkoutInfo.zoneNumber ? `(Zone ${checkoutInfo.zoneNumber})` : ""}
                  </p>
                </div>
              )}

              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto py-1 scrollbar-none">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 p-0.5 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-950 line-clamp-1 max-w-[180px]">
                          {lang === "ar" ? item.product.name_ar : item.product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {lang === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price totals */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="font-semibold text-neutral-950">{formatPrice(subtotalQar)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{lang === "ar" ? "رسوم الشحن:" : "Shipping:"}</span>
                  <span className="font-semibold text-neutral-950">
                    {shippingCostQar === 0 ? (
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">{lang === "ar" ? "مجاني" : "Free"}</span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-900">{lang === "ar" ? "المجموع المستحق:" : "Total Payable:"}</span>
                  <span className="text-xl font-bold text-neutral-950">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="p-4 rounded-2xl bg-[#faf6ed]/60 border border-[#c5a059]/30 text-xs text-neutral-700 flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-950">{lang === "ar" ? "ضمان رسمي وتتبع فوري" : "Official Fitment Guarantee"}</p>
                <p className="text-neutral-500 text-[11px] mt-0.5 leading-relaxed">
                  {lang === "ar"
                    ? "جميع الطلبات مغطاة بضمان ثقة الرسمي مع إصدار فوري لبيانات التتبع والفاتورة الضريبية."
                    : "All orders include full 1-year replacement warranty with instant invoice & tracking code generation."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
