"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

interface FooterProps {
  lang: "en" | "ar";
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer id="footer" className="bg-neutral-950 text-gray-300 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 text-neutral-900 font-black text-2xl tracking-tighter px-3 py-1 rounded-lg">
                THABT
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">MOUNTS</span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              {lang === "ar"
                ? "ثابـت - الرواد في التثبيت الذكي والحلول المخصصة لمختلف السيارات والأجهزة في قطر ودول مجلس التعاون الخليجي."
                : "Thabt - Premium customized mounting bases, phone holders, and vehicle accessories across Qatar & GCC."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "الرئيسية" : "Home"}</a></li>
              <li><a href="#categories" className="hover:text-amber-400 transition">{lang === "ar" ? "الفئات" : "Categories"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "المنتجات الأكثر مبيعاً" : "Top Sellers"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">{lang === "ar" ? "فئات المنتجات" : "Categories"}</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "قواعد برو كليبس" : "ProClips Mounts"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "حوامل الأجهزة الذكية" : "Device Holders"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "الحوامل الجلدية الفاخرة" : "Leather Mounts"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "حوامل الدراجات النارية" : "Motorbike Mounts"}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">{lang === "ar" ? "الهوائيات والإكسسوارات" : "Antenna & Accessories"}</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">{lang === "ar" ? "النشرة البريدية" : "Newsletter"}</h4>
            <p className="text-xs text-gray-400">{lang === "ar" ? "اشترك للحصول على أحدث العروض والخصومات الخاصة." : "Subscribe to receive special offers and product drops."}</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder={lang === "ar" ? "بريدك الإلكتروني..." : "Enter your email..."}
                  className="w-full bg-neutral-900 text-white text-xs rounded-full pl-4 pr-10 py-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                  required
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-400 text-neutral-900 p-2 rounded-full hover:bg-amber-500 transition">
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Thabt Mounts Qatar. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Visa</span>
            <span className="hover:text-gray-400 cursor-pointer">MasterCard</span>
            <span className="hover:text-gray-400 cursor-pointer">QPay</span>
            <span className="hover:text-gray-400 cursor-pointer">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
