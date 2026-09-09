"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Smartphone, RefreshCw, Wrench } from "lucide-react";

interface WhyMountSectionProps {
  lang: "en" | "ar";
}

export const WhyMountSection: React.FC<WhyMountSectionProps> = ({ lang }) => {
  const bulletPoints = [
    lang === "ar" ? "ضمان السلامة التامة أثناء القيادة" : "Ensure Safety While Driving",
    lang === "ar" ? "الاستمتاع بالملاحة بدون استخدام اليدين" : "Enjoy Hands-Free Navigation",
    lang === "ar" ? "حماية جهازك الذكي من السقوط والتلف" : "Protect Device From Damage",
    lang === "ar" ? "الحفاظ على ترتيب وتماسك لوحة القيادة" : "Keep your dashboard organized",
  ];

  const cards = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "قبضة متينة واستقرار فائق" : "Firm Grip And Stability",
      desc: lang === "ar" ? "خامات عالية الجودة تضمن عدم اهتزاز الهاتف أثناء القيادة." : "Premium materials ensure zero phone shaking on bumpy roads.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "توافق شامل مع جميع الأجهزة" : "Universal Compatibility",
      desc: lang === "ar" ? "يتناسب مع معظم الهواتف الذكية والأجهزة اللوحية." : "Fits most smartphones and tablets effortlessly.",
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "دوران وزاوية رؤية مرنة" : "Rotation And Adjustability",
      desc: lang === "ar" ? "عدّل زاوية الرؤية بسهولة بين الوضع الأفقي والعمودي." : "Adjust your viewing angle seamlessly between portrait and landscape.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "تركيب وإزالة سهلة للغاية" : "Easy Installation & Removal",
      desc: lang === "ar" ? "تركيب سريع بدون الحاجة لأي أدوات أو حفر." : "Tool-free setup with no damage to vehicle interior.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Bullet Checkmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
              {lang === "ar"
                ? "أجهزة التثبيت عالية الجودة أساسية لقيادة آمنة ومريحة"
                : "Quality mounting devices are essential for every vehicle"}
            </h2>

            <div className="space-y-4 pt-2">
              {bulletPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span className="text-neutral-800 font-medium text-sm md:text-base">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 4 Cards Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5"
                >
                  <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">{card.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
