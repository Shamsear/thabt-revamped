"use client";

import React, { useState } from "react";

interface WhyMountSectionProps {
  lang: "en" | "ar";
}

export const WhyMountSection: React.FC<WhyMountSectionProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState<string>("01");
  const [activeSpec, setActiveSpec] = useState<string>("01");
  const steps = [
    {
      num: "01",
      tag: lang === "ar" ? "قاعدة لوحة القيادة المخصصة" : "Vehicle-Specific Base",
      title: lang === "ar" ? "قاعدة تثبيت فواصل التابلوه" : "Dashboard Panel Seam Mount",
      desc:
        lang === "ar"
          ? "تُصنع بدقة متناهية لكل طراز سيارة لتثبت داخل فواصل لوحة القيادة الأصلية بالضغط الميكانيكي. لا حفر، لا شريط لاصق، ولا أثر على الإطلاق عند الإزالة."
          : "Engineered specifically for your vehicle model to snap into factory dashboard panel seams. Zero drilling, zero adhesives, and 100% reversible without a trace.",
      image: "/user/images/mount-sc.png",
    },
    {
      num: "02",
      tag: lang === "ar" ? "حامل الجهاز المتوافق" : "Precision Device Mount",
      title: lang === "ar" ? "حامل الجهاز وشاحن MagSafe" : "MagSafe Qi2 or Precision Grip",
      desc:
        lang === "ar"
          ? "يثبت مباشرة على القاعدة: اختر بين شاحن MagSafe Qi2 المغناطيسي السريع، حامل القفل الميكانيكي، أو سلسلة الجلد الفاخر المصنوع يدوياً."
          : "Locks directly onto the base: Choose between MagSafe Qi2 inductive charging, mechanical clamp, or luxury handcrafted leather.",
      image: "/user/images/holder-sc.png",
    },
  ];

  const specs = [
    {
      num: "01",
      title: lang === "ar" ? "تثبيت ميكانيكي (1 مم)" : "1mm Seam Snap-Fit",
      desc: lang === "ar" ? "تثبيت محكم بالضغط دون براغي أو غراء يترك أثراً." : "Precision lock into panel gaps. Zero screws, glue, or marks on trim.",
    },
    {
      num: "02",
      title: lang === "ar" ? "مقاوم لحرارة الخليج 60°م" : "GCC 60°C Thermal Stability",
      desc: lang === "ar" ? "بلاستيك سيارات مقاوم للأشعة فوق البنفسجية لا ينحني أو يذوب." : "UV-stabilized automotive ABS polymer engineered for desert sun.",
    },
    {
      num: "03",
      title: lang === "ar" ? "ثبات تام على الكثبان" : "Desert Dunes Anti-Vibration",
      desc: lang === "ar" ? "قفل ميكانيكي صلب يمنع اهتزاز الهاتف في أصعب الدروب." : "Rigid lock eliminates device wobble over washboard terrain.",
    },
    {
      num: "04",
      title: lang === "ar" ? "لا يعيق التكييف أو الرؤية" : "Unblocked Airflow & View",
      desc: lang === "ar" ? "تصميم مدروس يحافظ على تدفق التبريد ومجال رؤية السائق." : "Maintains factory AC vent output and clear windshield sightlines.",
    },
  ];

  return (
    <section id="architecture" className="py-12 sm:py-16 lg:py-20 bg-neutral-50 text-neutral-900 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
            {lang === "ar" ? "هندسة التثبيت المزدوجة" : "The Two-Part Architecture"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
            {lang === "ar" ? (
              <>
                كيف يعمل <span className="font-semibold text-neutral-950">نظام ثابـت</span>
              </>
            ) : (
              <>
                How the <span className="font-semibold text-neutral-950">Thabt system</span> works.
              </>
            )}
          </h2>
        </div>

        {/* 2-Part System Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {steps.map((step) => {
            const isActive = activeStep === step.num;
            return (
              <div
                key={step.num}
                role="button"
                tabIndex={0}
                onClick={() => setActiveStep(isActive ? "" : step.num)}
                className={`bg-white rounded-2xl p-6 sm:p-8 border shadow-xs transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer active-press select-none ${
                  isActive
                    ? "border-[#c5a059] shadow-lg -translate-y-1 ring-1 ring-[#c5a059]/30"
                    : "border-neutral-200/80 hover:shadow-lg hover:-translate-y-1 hover:border-neutral-300/90 active:border-[#c5a059]"
                }`}
              >
                <div className="h-48 flex items-center justify-center p-4 mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-out ${
                      isActive ? "scale-105" : "group-hover:scale-105 group-active:scale-105"
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono text-[#c5a059] font-semibold">
                      {step.num}
                    </span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                      // {step.tag}
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 transition-colors duration-200 ${
                    isActive ? "text-[#b38e46]" : "text-neutral-900 group-hover:text-[#c5a059] group-active:text-[#c5a059]"
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Minimalist Engineering Standards: 2x2 grid on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-8 sm:pt-10 border-t border-neutral-200/80">
          {specs.map((item) => {
            const isActive = activeSpec === item.num;
            return (
              <div
                key={item.num}
                role="button"
                tabIndex={0}
                onClick={() => setActiveSpec(isActive ? "" : item.num)}
                className={`space-y-1 p-3 sm:p-3.5 rounded-xl transition-all duration-200 cursor-pointer select-none active-press border ${
                  isActive
                    ? "bg-white shadow-md border-[#c5a059] -translate-y-0.5 ring-1 ring-[#c5a059]/20"
                    : "bg-white/60 sm:bg-transparent hover:bg-white hover:shadow-xs border-neutral-200/50 sm:border-transparent hover:border-neutral-200/80 active:border-[#c5a059] active:bg-white"
                }`}
              >
                <span className={`text-[11px] sm:text-xs font-mono tracking-wider font-semibold transition-colors duration-200 ${
                  isActive ? "text-[#b38e46]" : "text-[#c5a059]"
                }`}>
                  {item.num}
                </span>
                <h4 className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                  isActive ? "text-[#b38e46]" : "text-neutral-900"
                }`}>
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
