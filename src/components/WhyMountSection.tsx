import React from "react";
import Link from "next/link";

interface WhyMountSectionProps {
  lang: "en" | "ar";
}

export const WhyMountSection: React.FC<WhyMountSectionProps> = ({ lang }) => {
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
      href: "/categories/pro-clips",
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
      href: "/categories/device-holders",
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
    <section id="architecture" className="py-10 sm:py-16 lg:py-20 bg-neutral-50 text-neutral-900 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] font-semibold mb-1 sm:mb-2">
            {lang === "ar" ? "هندسة التثبيت المزدوجة" : "The Two-Part Architecture"}
          </p>
          <h2 className="text-xl sm:text-4xl font-light tracking-tight text-neutral-900">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 mb-6 sm:mb-12">
          {steps.map((step) => (
            <Link
              key={step.num}
              href={step.href}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-200/80 hover:border-[#c5a059] active:border-[#c5a059] shadow-xs hover:shadow-lg active:shadow-md hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer active-press select-none"
            >
              <div className="h-32 sm:h-48 flex items-center justify-center p-2 sm:p-4 mb-3 sm:mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 group-active:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#c5a059] font-semibold">
                    {step.num}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                    // {step.tag}
                  </span>
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-neutral-900 group-hover:text-[#c5a059] group-active:text-[#c5a059] mb-1 sm:mb-2 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 4 Minimalist Engineering Standards: 2x2 grid on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 pt-5 sm:pt-10 border-t border-neutral-200/80">
          {specs.map((item) => (
            <div
              key={item.num}
              className="group space-y-0.5 sm:space-y-1 p-2.5 sm:p-3.5 rounded-xl bg-white/70 hover:bg-white border border-neutral-200/60 hover:border-[#c5a059]/60 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 ease-out select-none"
            >
              <span className="text-[10px] sm:text-xs font-mono text-[#c5a059] group-hover:text-[#b38e46] tracking-wider font-semibold transition-colors duration-200">
                {item.num}
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-[#0b0d11] leading-snug transition-colors duration-200">
                {item.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
