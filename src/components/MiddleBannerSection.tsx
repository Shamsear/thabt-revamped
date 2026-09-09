"use client";

import React from "react";
import { motion } from "framer-motion";

export const MiddleBannerSection: React.FC = () => {
  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-gray-200"
        >
          <img
            src="https://www.thabt.qa/user/images/home_page_Banner.png"
            alt="Thabt Special Promotional Banner"
            className="w-full h-auto object-cover max-h-[380px]"
          />
        </motion.div>
      </div>
    </section>
  );
};
