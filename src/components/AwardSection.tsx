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
      className="relative py-12 sm:py-16 lg:py-20 bg-[#FAF9F5] text-neutral-900 border-b border-neutral-200/80 overflow-hidden"
    >
      {/* Subtle Luxury Radial Gold Ambient Lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c5a059]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Certification Authority & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#faf6ed] border border-[#c5a059]/35 text-[#b38e46] text-xs font-medium tracking-wide shadow-2xs">
              <Trophy size={14} className="shrink-0 text-[#c5a059]" />
              <span className="hidden sm:inline">
                {isAr
                  ? "أفضل بيئات العمل في قطر™ 2026 · اعتماد رسمي · الفئة المتوسطة والصغيرة"
                  : "Best Workplaces Qatar™ 2026 · Official Certification · Small & Medium"}
              </span>
              <span className="inline sm:hidden">
                {isAr
                  ? "أفضل بيئات العمل في قطر™ 2026"
                  : "Best Workplaces Qatar™ 2026"}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-900 leading-tight">
                {isAr ? (
                  <>
                    شركة ثابت ضمن{" "}
                    <span className="font-semibold text-[#b38e46]">
                      أفضل بيئات العمل في قطر™ 2026
                    </span>
                  </>
                ) : (
                  <>
                    Thabt Best Workplace{" "}
                    <span className="font-semibold text-[#b38e46]">
                      Qatar™ 2026
                    </span>
                  </>
                )}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Great Place To Work® · {isAr ? "منظمة معتمدة رسمياً" : "Certified Organisation"}</span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed max-w-2xl">
              {isAr
                ? "من بين مئات الشركات في دولة قطر، حققت شركة ثابت مكانتها المرموقة ضمن المراكز الخمسة الأولى — تقديراً لثقافة الثقة المتبادلة، والاعتزاز بفريق العمل، والاهتمام الحقيقي بكل موظف. هذه ليست مجرد جائزة، بل هي مرآة لهويتنا وقيمنا الراسخة."
                : "Out of hundreds of companies across Qatar, Thabt secured its position in the top 5 — recognised for a culture of trust, team pride, and genuine care for every employee. This is not just an award. It's a reflection of who we are."}
            </p>

            {/* Featured Rank Callout Plaque */}
            <div className="bg-white border border-[#c5a059]/30 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Large Gold Rank Emblem */}
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#b38e46] text-neutral-950 font-extrabold text-3xl sm:text-4xl shadow-sm shrink-0">
                  #4
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    {isAr ? "ثابت في المركز الرابع على مستوى دولة قطر" : "Thabt Ranked 4th in Qatar"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b38e46] font-medium">
                    {isAr ? "فئة المنشآت الصغيرة والمتوسطة" : "Small & Medium Business Category"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    {isAr
                      ? "من بين كافة الشركات المعتمدة من Great Place To Work® في قطر"
                      : "Among all certified companies in Qatar"}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Item Grid Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200/80 hover:border-[#c5a059]/40 rounded-xl p-3 sm:p-3.5 transition-colors duration-200 shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-neutral-500 text-[11px] font-medium">
                    {m.icon}
                    <span>{m.label}</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Trophy Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px] rounded-2xl overflow-hidden bg-[#0B0D11] border border-[#c5a059]/40 shadow-xl group">
              
              {/* Trophy Image: Full Uncropped 9:16 Presentation */}
              <div className="relative aspect-[9/16] w-full overflow-hidden flex items-center justify-center bg-[#0B0D11]">
                <img
                  src="/user/images/thabt-best-workplaces-qatar-2026.jpg"
                  alt="Thabt Best Workplaces Qatar 2026 Trophy"
                  className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Technical Credential Plaque - Clean bottom bar outside photo view */}
              <div className="p-3 sm:p-3.5 bg-neutral-950/95 border-t border-[#c5a059]/30 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-semibold">
                    OFFICIAL CERTIFICATION
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
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
