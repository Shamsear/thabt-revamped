"use client";

import React from "react";
import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
  lang: string;
}

export function CheckoutStepper({ currentStep, lang }: CheckoutStepperProps) {
  const steps = [
    {
      num: 1,
      name: lang === "ar" ? "العنوان والشحن" : "Shipping & Address",
    },
    {
      num: 2,
      name: lang === "ar" ? "الدفع التوضيحي" : "Payment Simulation",
    },
    {
      num: 3,
      name: lang === "ar" ? "تأكيد واستلام الطلب" : "Order Confirmation",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mb-8">
      {/* Mobile / Small Screen: Single focused active step with directional lines */}
      <div className="flex md:hidden items-center justify-center">
        <div className="flex items-center gap-2.5">
          {/* Left directional line if previous step exists */}
          {currentStep > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <div className="w-8 sm:w-12 h-0.5 bg-[#c5a059]/40 rounded-full" />
            </div>
          )}

          {/* Active Step Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-50 border border-neutral-200/80 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-neutral-950 text-[#c5a059] flex items-center justify-center text-[10px] font-bold">
              {currentStep}
            </span>
            <span className="text-xs font-semibold text-neutral-900">
              {steps[currentStep - 1].name}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              ({lang === "ar" ? `خطوة ${currentStep} من 3` : `Step ${currentStep} of 3`})
            </span>
          </div>

          {/* Right directional line if next step exists */}
          {currentStep < 3 && (
            <div className="flex items-center gap-1.5">
              <div className="w-8 sm:w-12 h-0.5 bg-neutral-200 rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
          )}
        </div>
      </div>

      {/* Large Screen: Full 3-step sequence fitted with connecting lines */}
      <div className="hidden md:flex items-center justify-center gap-4 w-full max-w-2xl px-4 py-2 rounded-2xl bg-neutral-50/70 border border-neutral-200/60 shadow-2xs">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              currentStep === 1
                ? "bg-neutral-950 text-[#c5a059] shadow-2xs ring-2 ring-[#c5a059]/30"
                : currentStep > 1
                ? "bg-[#faf6ed] text-[#c5a059] border border-[#c5a059]/40"
                : "bg-white text-neutral-400 border border-neutral-200"
            }`}
          >
            {currentStep > 1 ? <Check size={12} className="stroke-[3]" /> : "1"}
          </span>
          <span
            className={`text-xs font-medium whitespace-nowrap ${
              currentStep === 1
                ? "text-neutral-950 font-bold"
                : currentStep > 1
                ? "text-neutral-700"
                : "text-neutral-400"
            }`}
          >
            {steps[0].name}
          </span>
        </div>

        {/* Connector 1 -> 2 */}
        <div
          className={`flex-1 h-0.5 min-w-[28px] rounded-full transition-all ${
            currentStep >= 2 ? "bg-neutral-900" : "bg-neutral-200"
          }`}
        />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              currentStep === 2
                ? "bg-neutral-950 text-[#c5a059] shadow-2xs ring-2 ring-[#c5a059]/30"
                : currentStep > 2
                ? "bg-[#faf6ed] text-[#c5a059] border border-[#c5a059]/40"
                : "bg-white text-neutral-400 border border-neutral-200"
            }`}
          >
            {currentStep > 2 ? <Check size={12} className="stroke-[3]" /> : "2"}
          </span>
          <span
            className={`text-xs font-medium whitespace-nowrap ${
              currentStep === 2
                ? "text-neutral-950 font-bold"
                : currentStep > 2
                ? "text-neutral-700"
                : "text-neutral-400"
            }`}
          >
            {steps[1].name}
          </span>
        </div>

        {/* Connector 2 -> 3 */}
        <div
          className={`flex-1 h-0.5 min-w-[28px] rounded-full transition-all ${
            currentStep >= 3 ? "bg-neutral-900" : "bg-neutral-200"
          }`}
        />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              currentStep === 3
                ? "bg-neutral-950 text-[#c5a059] shadow-2xs ring-2 ring-[#c5a059]/30"
                : "bg-white text-neutral-400 border border-neutral-200"
            }`}
          >
            3
          </span>
          <span
            className={`text-xs font-medium whitespace-nowrap ${
              currentStep === 3
                ? "text-neutral-950 font-bold"
                : "text-neutral-400"
            }`}
          >
            {steps[2].name}
          </span>
        </div>
      </div>
    </div>
  );
}
