"use client";

import React, { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

interface VideoShowcaseSectionProps {
  lang: "en" | "ar";
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video-showcase" className="py-12 sm:py-16 lg:py-20 bg-[#0b0d11] text-white relative overflow-hidden">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c5a059]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              {lang === "ar" ? "فيديو عملي" : "Field Demonstration"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              {lang === "ar" ? (
                <>
                  شاهد سرعة <span className="font-semibold text-white">التركيب الميكانيكي</span>
                </>
              ) : (
                <>
                  30-Second <span className="font-semibold text-white">Installation</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
            {lang === "ar"
              ? "شاهد كيف تثبت قواعد برو كليبس في فواصل لوحة القيادة الأصلية خلال ثوانٍ معدودة بدون أي أدوات أو تعديل على مقصورة السيارة."
              : "Watch how custom ProClips lock into factory dashboard seams in seconds without tools or dashboard alterations."}
          </p>
        </div>

        {/* 16:9 In-Page Player with Front Poster Image */}
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/1y5NsASwck0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Thabt Installation Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
              {/* Reset to Cover Image */}
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-900 backdrop-blur-md text-white/90 hover:text-white border border-white/10 text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <RotateCcw size={12} />
                <span>{lang === "ar" ? "إغلاق الفيديو" : "Close Player"}</span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group select-none"
            >
              {/* Cover Image in Front */}
              <img
                src="https://www.thabt.qa/admin/galleries/855497-c.jpg"
                alt="Installation Demonstration"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-neutral-950/20" />

              {/* Pulsating Play Button & Call to Action */}
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div
                  className="pulsating-play-btn-luxury mb-4 text-neutral-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl"
                  aria-label="Play video"
                >
                  <Play size={24} className="ml-1 rtl:ml-0 rtl:mr-1 fill-neutral-950" />
                </div>

                <p className="text-sm sm:text-base font-semibold text-white mb-1 tracking-wide group-hover:text-[#c5a059] transition-colors">
                  {lang === "ar" ? "اضغط للمشاهدة الآن" : "Click to Play Demonstration"}
                </p>
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  {lang === "ar"
                    ? "فيديو واقعي يوضح تثبيت برو كليبس في فواصل التابلوه بدون أي أدوات."
                    : "Live footage locking custom ProClips into factory dash seams in seconds."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


