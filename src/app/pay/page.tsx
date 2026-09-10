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
    <div className={`min-h-screen bg-white text-neutral-900 flex flex-col ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-neutral-200/80 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/user/images/black_logo.png" alt="Thabt" className="h-7 sm:h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#faf6ed] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full">
            <Lock size={13} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "بوابة الدفع التوضيحية المشفرة" : "Simulated Payment Gateway"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Progress Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-xs">
          <div className="flex items-center gap-2 text-neutral-500">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <span>{lang === "ar" ? "العنوان والشحن" : "Address"}</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-neutral-300" />
          <div className="flex items-center gap-2 text-neutral-950 font-semibold">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-[#c5a059] flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            <span>{lang === "ar" ? "الدفع التوضيحي" : "Payment Simulation"}</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-neutral-200" />
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-6 h-6 rounded-full border border-neutral-300 text-neutral-400 flex items-center justify-center text-[11px]">
              3
            </span>
            <span>{lang === "ar" ? "تأكيد الطلب" : "Confirmation"}</span>
          </div>
        </div>

        {/* Dummy Notification Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-[#faf6ed]/60 border border-[#c5a059]/30 flex items-start gap-3 text-xs text-neutral-900">
          <Sparkles size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-neutral-950">
              {lang === "ar" ? "واجهة توضيحية أمامية (Prototype Mode):" : "Interactive Prototype Mode:"}
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
              {lang === "ar"
                ? "لا توجد بوابة دفع حقيقية مرتبطة. يمكنك الضغط على 'تعبئة بيانات بطاقة تجريبية' أو الضغط مباشرة على زر الدفع لتجربة تدفق الشراء بالكامل وصولاً إلى إشعار تأكيد الطلب وتتبع الشحنة."
                : "No actual credit card charge will occur. You can click 'Auto-Fill Test Card' or click 'Pay' to test the full purchase flow and tracking receipt."}
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
                    ? "bg-neutral-900 border-neutral-900 text-white font-medium"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <CreditCard size={18} className={paymentMethod === "card" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-xs">Visa / MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("qpay")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "qpay"
                    ? "bg-neutral-900 border-neutral-900 text-white font-medium"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Building2 size={18} className={paymentMethod === "qpay" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-xs">QPay / NAPS</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "apple"
                    ? "bg-neutral-900 border-neutral-900 text-white font-medium"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Smartphone size={18} className={paymentMethod === "apple" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-xs">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "cod"
                    ? "bg-neutral-900 border-neutral-900 text-white font-medium"
                    : "bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <Banknote size={18} className={paymentMethod === "cod" ? "text-[#c5a059]" : "text-neutral-500"} />
                <span className="text-xs">{lang === "ar" ? "عند الاستلام" : "COD"}</span>
              </button>
            </div>

            {/* Payment Method Panel */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
              {paymentMethod === "card" && (
                <form onSubmit={handleSimulatePayment} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-950 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                      {lang === "ar" ? "بيانات البطاقة البنكية" : "Card Details"}
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFillDummy}
                      className="text-[11px] font-semibold text-[#9b7832] bg-[#faf6ed] px-2.5 py-1 rounded-lg border border-[#c5a059]/30 hover:bg-[#faf6ed]/80 cursor-pointer transition-colors"
                    >
                      {lang === "ar" ? "⚡ تعبئة بيانات تجريبية" : "⚡ Auto-Fill Test Card"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      {lang === "ar" ? "الاسم المطبوع على البطاقة" : "Cardholder Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      {lang === "ar" ? "رقم البطاقة" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "تاريخ الانتهاء" : "Expiry (MM/YY)"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                        {lang === "ar" ? "رمز الأمان CVV" : "CVV Code"}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-neutral-50/60 border border-neutral-200/90 rounded-xl px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-3 py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#c5a059] text-white hover:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        <span>{statusMessage}</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} className="text-[#c5a059]" />
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
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
                    <Building2 size={24} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "بوابة الدفع الوطنية القطرية NAPS / QPay" : "Qatar National Debit Gateway (QPay / NAPS)"}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    {lang === "ar"
                      ? "الدفع المباشر عبر بطاقات الصراف الآلي للبنوك القطرية (QNB، الدوحة، المصرف، دخان، الريان، الأهلي)."
                      : "Direct bank account debit supported for all Qatar Central Bank local NAPS cards."}
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
                      <span>{lang === "ar" ? "محاكاة الدفع عبر كيو باي" : "Simulate QPay Authorization"}</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto">
                    <Smartphone size={24} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-950">Apple Pay 1-Click</h4>
                  <p className="text-xs text-neutral-500">
                    {lang === "ar" ? "انقر بالأسفل لمحاكاة الدفع عبر Apple Pay" : "Tap below to simulate instant Apple Pay confirmation"}
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
                      <span> Pay with Apple Pay</span>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
                    <Banknote size={24} className="text-[#c5a059]" />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-950">
                    {lang === "ar" ? "الدفع نقداً أو بالبطاقة عند الاستلام" : "Cash or Card on Delivery"}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {lang === "ar"
                      ? "متاح داخل دولة قطر. يمكنك الدفع لمندوب التوصيل نقداً أو عبر جهاز الدفع اللاسلكي POS."
                      : "Pay securely to the courier driver upon arrival in Qatar using cash or mobile card machine."}
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
                      <span>{lang === "ar" ? "تأكيد الطلب للدفع عند الاستلام" : "Confirm Cash on Delivery Order"}</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Amount Payable Box (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-neutral-950 pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>{lang === "ar" ? "المبلغ المستحق" : "Summary"}</span>
                <span className="text-[10px] font-mono text-[#9b7832] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#c5a059]/30">Doha Hub</span>
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
                      <span className="text-emerald-700 font-semibold">{lang === "ar" ? "مجاني" : "Free"}</span>
                    ) : (
                      formatPrice(shippingCostQar)
                    )}
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-between font-semibold text-base text-neutral-950">
                  <span>{lang === "ar" ? "الإجمالي:" : "Total:"}</span>
                  <span className="text-neutral-950 text-xl font-bold">{formatPrice(orderTotalQar)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2 text-xs text-neutral-500">
                <p className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 size={14} />
                  <span>{lang === "ar" ? "محاكاة دفع فورية بدون بطاقة حقيقية" : "Simulation mode: No card charged"}</span>
                </p>
                <p className="flex items-center gap-1.5 text-neutral-600">
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
