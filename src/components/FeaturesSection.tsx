"use client";

import React from "react";

interface FeaturesSectionProps {
  lang: "en" | "ar";
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ lang }) => {
  const specs = [
    {
      num: "01",
      title: lang === "ar" ? "قفل الفواصل الميكانيكي (1 مم)" : "1mm Factory Seam Lock",
      desc:
        lang === "ar"
          ? "تثبيت محكم بالاعتماد على فواصل الألواح الأصلية في السيارة بدون حفر أو صمغ."
          : "Locks into factory dashboard gaps without glue, adhesives, or screws.",
    },
    {
      num: "02",
      title: lang === "ar" ? "مقاومة حرارة الخليج 60°م" : "GCC 60°C Heat Endurance",
      desc:
        lang === "ar"
          ? "بلاستيك سيارات مقاوم للأشعة فوق البنفسجية لا ينحني أو يذوب في شمس الصيف."
          : "Automotive-grade polymer engineered to endure direct Gulf summer sun.",
    },
    {
      num: "03",
      title: lang === "ar" ? "شحن MagSafe لاسلكي" : "MagSafe Fast Induction",
      desc:
        lang === "ar"
          ? "مغناطيس N52 قوي يثبت الأجهزة الكبيرة ويوفر شحناً لاسلكياً سريعاً."
          : "High-power magnetic array grips large devices and delivers wireless power.",
    },
    {
      num: "04",
      title: lang === "ar" ? "تركيب فوري بدون أدوات" : "Tool-Free Installation",
      desc:
        lang === "ar"
          ? "يتم تركيبه خلال 30 ثانية دون الحاجة لفني أو أدوات خاصة."
          : "Installs in 30 seconds with intuitive snap-fit mechanics.",
    },
    {
      num: "05",
      title: lang === "ar" ? "رؤية آمنة ومدروسة" : "Driver Line-of-Sight",
      desc:
        lang === "ar"
          ? "موقع مدروس يضمن رؤية واضحة للطريق والملاحة دون حجب فتحات التكييف."
          : "Positioned within safe view without blocking critical AC cooling vents.",
    },
    {
      num: "06",
      title: lang === "ar" ? "مفصل كروي محكم" : "Precision Ball Pivot",
      desc:
        lang === "ar"
          ? "مفصل متين يمنع ارتخاء الهاتف أو سقوطه أثناء الاهتزازات القوية."
          : "High-friction ball joint prevents device sag over rough desert tracks.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-[#0b0d11] text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="max-w-2xl mb-6 sm:mb-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1 sm:mb-2">
            {lang === "ar" ? "المعايير الهندسية" : "Engineering Standards"}
          </p>
          <h2 className="text-xl sm:text-4xl font-light tracking-tight text-white">
            {lang === "ar" ? (
              <>
                الدقة في كل <span className="font-semibold">تفصيل</span>
              </>
            ) : (
              <>
                Precision in every <span className="font-semibold">detail</span>
              </>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {specs.map((spec) => (
            <div
              key={spec.num}
              className="p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs font-mono text-[#c5a059] tracking-wider mb-2 sm:mb-4">
                {spec.num}
              </span>
              <div>
                <h3 className="text-xs sm:text-base font-semibold text-white mb-1 sm:mb-2 leading-snug">{spec.title}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
