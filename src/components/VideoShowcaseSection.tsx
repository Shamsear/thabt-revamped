"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoShowcaseSectionProps {
  lang: "en" | "ar";
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ lang }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative py-28 bg-neutral-950 text-white overflow-hidden flex items-center justify-center">
      {/* Background Video Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url('https://www.thabt.qa/admin/galleries/855497-c.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/90" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow"
        >
          {lang === "ar"
            ? "اكتشف حلول قواعد تثبيت ثابـت"
            : "Discover Thabt Mounting Solutions"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed"
        >
          {lang === "ar"
            ? "استكشف منتجاتنا المبتكرة والموثوقة في هذا الفيديو التفصيلي للتثبيت في جميع أنواع المركبات."
            : "Explore our innovative and reliable mounting products engineered for maximum vehicle stability."}
        </motion.p>

        {/* Pulsating Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setVideoModalOpen(true)}
            aria-label="Play Showcase Video"
            className="pulsating-play-btn"
          >
            <Play size={32} className="text-neutral-900 fill-neutral-900 ml-1" />
          </button>
        </motion.div>
      </div>

      {/* Video Modal Popup */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-neutral-800/80 p-2 rounded-full z-10 transition"
            >
              <X size={24} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/1y5NsASwck0?autoplay=1"
                title="Thabt Showcase Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
