"use client";

import React from "react";
import { Play } from "lucide-react";

interface VideoShowcaseSectionProps {
  lang: "en" | "ar";
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ lang }) => {
  return (
    <section id="video-showcase" className="py-12 sm:py-16 lg:py-20 bg-[#0b0d11] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold mb-2">
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

        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 h-[280px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">
          <img
            src="https://www.thabt.qa/admin/galleries/855497-c.jpg"
            alt="Installation Demonstration"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          <div className="relative z-10 flex flex-col items-center text-center p-6">
            <a
              href="https://www.youtube.com/watch?v=1y5NsASwck0"
              target="_blank"
              rel="noreferrer"
              className="pulsating-play-btn-luxury cursor-pointer mb-5 text-neutral-950 flex items-center justify-center"
              aria-label="Play video"
            >
              <Play size={24} className="ml-1 rtl:ml-0 rtl:mr-1 fill-neutral-950" />
            </a>

            <p className="text-xs text-neutral-400 max-w-sm">
              {lang === "ar"
                ? "شاهد كيف تثبت قواعد برو كليبس في فواصل لوحة القيادة الأصلية خلال ثوانٍ معدودة بدون أي أدوات."
                : "Watch how custom ProClips lock into factory dashboard seams in seconds without tools."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
