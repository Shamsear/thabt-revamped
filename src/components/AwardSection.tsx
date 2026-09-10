"use client";

import React from "react";
import { Trophy, Award, ShieldCheck, MapPin, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface AwardSectionProps {
  lang: "en" | "ar";
}

export const AwardSection: React.FC<AwardSectionProps> = ({ lang }) => {
  const isAr = lang === "ar";

  const metrics = [
    {
      icon: <Trophy size={16} className="text-[#c5a059]" />,
      val: "2026",
      label: isAr ? "السنة" : "Year",
    },
    {
      icon: <Award size={16} className="text-[#c5a059]" />,
      val: isAr ? "أفضل 5" : "Top 5",
      label: isAr ? "وطنياً" : "Nationally",
    },
    {
      icon: <MapPin size={16} className="text-[#c5a059]" />,
      val: isAr ? "قطر" : "Qatar",
      label: isAr ? "المنطقة" : "Region",
    },
    {
      icon: <Building2 size={16} className="text-[#c5a059]" />,
      val: "SME",
      label: isAr ? "الفئة" : "Category",
    },
  ];

  return (
    <section
      id="awards"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#0B0D11] text-white border-b border-neutral-800/80 overflow-hidden"
    >
      {/* Subtle Luxury Radial Gold Ambient Lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Certification Authority & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-xs font-medium tracking-wide">
              <Trophy size={14} className="shrink-0 text-[#c5a059]" />
              <span>
                {isAr
                  ? "أفضل بيئات العمل في قطر™ 2026 · اعتماد رسمي · الفئة المتوسطة والصغيرة"
                  : "Best Workplaces Qatar™ 2026 · Official Certification · Small & Medium"}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight">
                {isAr ? (
                  <>
                    شركة ثابت ضمن{" "}
                    <span className="font-semibold text-[#c5a059]">
                      أفضل بيئات العمل في قطر™ 2026
                    </span>
                  </>
                ) : (
                  <>
                    Thabt Best Workplace{" "}
                    <span className="font-semibold text-[#c5a059]">
                      Qatar™ 2026
                    </span>
                  </>
                )}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Great Place To Work® · {isAr ? "منظمة معتمدة رسمياً" : "Certified Organisation"}</span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-2xl">
              {isAr
                ? "من بين مئات الشركات في دولة قطر، حققت شركة ثابت مكانتها المرموقة ضمن المراكز الخمسة الأولى — تقديراً لثقافة الثقة المتبادلة، والاعتزاز بفريق العمل، والاهتمام الحقيقي بكل موظف. هذه ليست مجرد جائزة، بل هي مرآة لهويتنا وقيمنا الراسخة."
                : "Out of hundreds of companies across Qatar, Thabt secured its position in the top 5 — recognised for a culture of trust, team pride, and genuine care for every employee. This is not just an award. It's a reflection of who we are."}
            </p>

            {/* Featured Rank Callout Plaque */}
            <div className="bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/[0.12] rounded-2xl p-5 sm:p-6 backdrop-blur-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Large Gold Rank Emblem */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#9a7832] text-neutral-950 font-extrabold text-3xl sm:text-4xl shadow-md shrink-0">
                  #4
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {isAr ? "ثابت في المركز الرابع على مستوى دولة قطر" : "Thabt Ranked 4th in Qatar"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c5a059] font-medium">
                    {isAr ? "فئة المنشآت الصغيرة والمتوسطة" : "Small & Medium Business Category"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-400">
                    {isAr
                      ? "من بين كافة الشركات المعتمدة من Great Place To Work® في قطر"
                      : "Among all certified companies in Qatar"}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Item Grid Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/[0.08] hover:border-[#c5a059]/40 rounded-xl p-3 sm:p-3.5 transition-colors duration-200"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-neutral-400 text-[11px]">
                    {m.icon}
                    <span>{m.label}</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Trophy Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 to-[#0B0D11] border border-[#c5a059]/30 shadow-2xl group">
              
              {/* Glow Behind Trophy Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

              {/* Trophy Image */}
              <div className="relative aspect-[9/16] max-h-[480px] sm:max-h-[520px] w-full overflow-hidden flex items-center justify-center">
                <img
                  src="/user/images/thabt-best-workplaces-qatar-2026.jpg"
                  alt="Thabt Best Workplaces Qatar 2026 Trophy"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Inset Technical Credential Plaque */}
              <div className="absolute bottom-3 left-3 right-3 z-20 p-3 sm:p-3.5 rounded-xl bg-[#0B0D11]/90 backdrop-blur-md border border-white/10 text-white shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059]">
                    OFFICIAL CERTIFICATION
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600/90 text-white px-2 py-0.5 rounded-full">
                    QATAR 2026
                  </span>
                </div>
                <div className="text-xs font-semibold text-white">
                  Great Place To Work® · Certified
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Small & Medium Category - #4 THABT
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
