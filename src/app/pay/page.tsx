"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Smartphone,
  Banknote,
  Building2,
  Loader2,
} from "lucide-react";

export default function DummyPayPage() {
  const router = useRouter();
  const { lang, cartItems, cartSubtotalQar, formatPrice, clearCart } = useAppContext();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "qpay" | "apple" | "cod">("card");

  // Dummy Card state
  const [cardHolder, setCardHolder] = useState("Mohammed Al-Kuwari");
  const [cardNumber, setCardNumber] = useState("4000 1234 5678 9010");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("789");

  // Simulation loading state
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const shippingCostQar = cartSubtotalQar > 200 || cartSubtotalQar === 0 ? 0 : 15;
  const orderTotalQar = cartSubtotalQar + shippingCostQar;

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
    <div className={`min-h-screen bg-[#fafaf9] text-neutral-900 flex flex-col relative overflow-hidden ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Ambient background gold glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[160px]" />

      {/* Header */}
      <header className="bg-white border-b border-neutral-200/80 py-4 px-4 sm:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/user/images/black_logo.png" alt="Thabt" className="h-7 sm:h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-[#faf6ed] border border-[#c5a059]/30 px-3 py-1.5 rounded-full shadow-2xs">
            <Lock size={14} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "بوابة الدفع التوضيحية المشفرة 256-bit" : "256-bit Simulated Payment Gateway"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-10 flex-1">
        {/* Progress Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-xs">
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <span>{lang === "ar" ? "العنوان والشحن" : "Address"}</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-[#c5a059]/40" />
          <div className="flex items-center gap-2 text-neutral-950 font-black">
            <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#c5a059] border border-[#c5a059]/50 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>{lang === "ar" ? "الدفع التوضيحي" : "Payment Simulation"}</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-neutral-200" />
          <div className="flex items-center gap-2 text-neutral-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px]">
              3
            </span>
            <span>{lang === "ar" ? "تأكيد الطلب" : "Confirmation"}</span>
          </div>
        </div>

        {/* Dummy Notification Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-white via-[#faf6ed] to-[#f5ebd4]/60 border border-[#c5a059]/50 flex items-start gap-3 text-xs text-neutral-900 shadow-2xs">
          <Sparkles size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-neutral-950 flex items-center gap-1.5">
              <span>{lang === "ar" ? "واجهة توضيحية أمامية (Frontend Mock Mode):" : "Interactive Frontend Prototype Mode:"}</span>
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
              {lang === "ar"
                ? "لا توجد بوابة دفع حقيقية مرتبطة. يمكنك الضغط على 'تعبئة بيانات بطاقة تجريبية' أو الضغط مباشرة على زر الدفع لتجربة تدفق الشراء بالكامل وصولاً إلى إشعار تأكيد الطلب وتتبع الشحنة."
                : "No actual credit card charge will occur. You can click 'Auto-Fill Test Card' or click 'Complete Simulated Payment' to test the full purchase flow and tracking receipt."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Options & Card Form (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "card"
                    ? "bg-neutral-950 border-[#c5a059] text-[#c5a059] font-bold shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:bg-[#faf6ed]/50 hover:text-[#9b7832]"
                }`}
              >
                <CreditCard size={18} />
                <span className="text-xs">Visa / MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("qpay")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "qpay"
                    ? "bg-neutral-950 border-[#c5a059] text-[#c5a059] font-bold shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:bg-[#faf6ed]/50 hover:text-[#9b7832]"
                }`}
              >
                <Building2 size={18} />
                <span className="text-xs">QPay / NAPS</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "apple"
                    ? "bg-neutral-950 border-[#c5a059] text-[#c5a059] font-bold shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:bg-[#faf6ed]/50 hover:text-[#9b7832]"
                }`}
              >
                <Smartphone size={18} />
                <span className="text-xs">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "cod"
                    ? "bg-neutral-950 border-[#c5a059] text-[#c5a059] font-bold shadow-xs"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:bg-[#faf6ed]/50 hover:text-[#9b7832]"
                }`}
              >
                <Banknote size={18} />
                <span className="text-xs">{lang === "ar" ? "عند الاستلام" : "COD"}</span>
              </button>
            </div>

            {/* Payment Method Panel */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs">
              {paymentMethod === "card" && (
                <form onSubmit={handleSimulatePayment} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="text-xs font-extrabold text-neutral-950 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                      {lang === "ar" ? "بيانات البطاقة البنكية" : "Credit or Debit Card Details"}
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFillDummy}
                      className="text-[11px] font-black text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-lg border border-[#c5a059]/40 hover:bg-[#f4ebe0] cursor-pointer shadow-2xs"
                    >
                      {lang === "ar" ? "⚡ تعبئة بيانات تجريبية" : "⚡ Auto-Fill Test Card"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      {lang === "ar" ? "الاسم المطبوع على البطاقة" : "Cardholder Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-[#fafaf9] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      {lang === "ar" ? "رقم البطاقة (16 رقماً)" : "Card Number (16 Digits)"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#fafaf9] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "تاريخ الانتهاء" : "Expiry (MM/YY)"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#fafaf9] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {lang === "ar" ? "رمز الأمان CVV" : "CVV Code"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#fafaf9] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-4 py-4 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.3)] transition-all active:scale-98 cursor-pointer disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-neutral-950" />
                        <span>{statusMessage}</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} className="text-neutral-950" />
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
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/30 flex items-center justify-center mx-auto">
                    <Building2 size={24} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-neutral-950">
                    {lang === "ar" ? "بوابة الدفع الوطنية القطرية NAPS / QPay" : "Qatar National Debit Gateway (QPay / NAPS)"}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    {lang === "ar"
                      ? "الدفع المباشر عبر بطاقات الصراف الآلي للبنوك القطرية (QNB، الدوحة، المصرف، دخان، الريان، الأهلي)."
                      : "Direct bank account debit supported for all Qatar Central Bank local NAPS cards."}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-4 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b08e4d] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_20px_rgba(197,160,89,0.3)]"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-neutral-950" />
                    ) : (
                      <span>{lang === "ar" ? "محاكاة الدفع عبر كيو باي" : "Simulate QPay Authorization"}</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-950 text-[#c5a059] border border-[#c5a059]/40 flex items-center justify-center mx-auto">
                    <Smartphone size={24} />
                  </div>
                  <h4 className="text-sm font-extrabold text-neutral-950">Apple Pay 1-Click</h4>
                  <p className="text-xs text-neutral-500">
                    {lang === "ar" ? "انقر بالأسفل لمحاكاة الدفع عبر Apple Pay" : "Tap below to simulate instant Apple Pay FaceID confirmation"}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-4 px-4 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-[#c5a059]" />
                    ) : (
                      <span> Pay with Apple Pay</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf6ed] text-[#9b7832] border border-[#c5a059]/30 flex items-center justify-center mx-auto">
                    <Banknote size={24} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-neutral-950">
                    {lang === "ar" ? "الدفع نقداً أو بالبطاقة عند الاستلام" : "Cash or Card on Delivery"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {lang === "ar"
                      ? "متاح داخل دولة قطر. يمكنك الدفع لمندوب التوصيل نقداً أو عبر جهاز الدفع اللاسلكي POS."
                      : "Pay securely to the courier driver upon arrival in Qatar using cash or mobile card machine."}
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-4 px-4 rounded-xl bg-neutral-950 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin text-[#c5a059]" />
                    ) : (
                      <span>{lang === "ar" ? "تأكيد الطلب للدفع عند الاستلام" : "Confirm Cash on Delivery Order"}</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Amount Payable Box (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-gradient-to-b from-white to-[#faf6ed]/30 border border-[#c5a059]/30 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-extrabold text-neutral-950 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>{lang === "ar" ? "المبلغ المستحق" : "Summary"}</span>
                <span className="text-[11px] font-mono text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#c5a059]/30">Doha HQ</span>
              </h3>
              <div className="py-3 space-y-2 text-xs border-b border-neutral-100">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>{lang === "ar" ? "المنتجات:" : "Items Subtotal:"}</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(cartSubtotalQar)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500">
                  <span>{lang === "ar" ? "التوصيل:" : "Delivery:"}</span>
                  <span className="font-semibold text-neutral-900">
                    {shippingCostQar === 0 ? (
                      <span className="text-emerald-700 font-bold">{lang === "ar" ? "مجاني" : "Free"}</span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-between font-extrabold text-base text-neutral-950">
                  <span>{lang === "ar" ? "الإجمالي:" : "Total:"}</span>
                  <span className="text-[#9b7832] text-xl font-black">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2 text-[11px] text-neutral-500">
                <p className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 size={14} />
                  <span>{lang === "ar" ? "محاكاة دفع فورية بدون بطاقة حقيقية" : "Simulation mode: No card charged"}</span>
                </p>
                <p className="flex items-center gap-1.5 text-neutral-700 font-medium">
                  <ShieldCheck size={14} className="text-[#c5a059]" />
                  <span>{lang === "ar" ? "إصدار رقم تتبع وفاتورة ضريبية رسمية" : "Official invoice & tracking generation"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
