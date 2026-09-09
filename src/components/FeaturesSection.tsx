"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, Wrench, RefreshCw, Settings, Star } from "lucide-react";

interface FeaturesSectionProps {
  lang: "en" | "ar";
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ lang }) => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "ثبات في كل الطرق" : "Stable On Every Road",
      desc: lang === "ar" ? "تصميم قوي ومتين يضمن بقاء جهازك ثابتاً في أكثر الطرق وعورة." : "Premium build ensures your device stays steady across all terrains.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "ملاحة بدون استخدام اليدين" : "Hands-Free Navigation",
      desc: lang === "ar" ? "حافظ على تركيزك أثناء القيادة مع وصول مريح لخرائط الطريق." : "Stay focused while driving with optimal line-of-sight navigation.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "تركيب بدون أدوات" : "Tool-Free Setup",
      desc: lang === "ar" ? "تركيب محكم بلمح البصر دون الحاجة لتعديل أو ثقب السيارة." : "Quick installation with custom snap fit without damaging interior.",
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "تعديل مرن للزوايا" : "Flexible Adjustment",
      desc: lang === "ar" ? "بدّل بين الوضع الأفقي والعمودي بزاوية 360 درجة." : "Switch between landscape and portrait views smoothly.",
    },
    {
      icon: <Settings className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "توافق شامل" : "Universal Compatibility",
      desc: lang === "ar" ? "يتناسب مع جميع الهواتف الذكية والأجهزة اللوحية والمقاسات." : "Fits smartphones and tablets of all sizes and cases.",
    },
    {
      icon: <Star className="w-8 h-8 text-amber-500" />,
      title: lang === "ar" ? "تصميم أنيق ومتين" : "Elegant And Durable",
      desc: lang === "ar" ? "تصميم فاخر يكمل المظهر الداخلي لسيارتك بكل تناسق." : "Designed to seamlessly complement your luxury car interior.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {lang === "ar" ? "ما الذي تقدمه لك قواعد ثابـت؟" : "What Thabt Mounts Bring To You"}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
        </motion.div>

        {/* 6 Feature Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-neutral-800/80 border border-neutral-700/60 p-8 rounded-3xl text-center hover:border-amber-400 transition duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-neutral-900 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-400 group-hover:text-neutral-900 transition duration-300">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition">
                {feat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
