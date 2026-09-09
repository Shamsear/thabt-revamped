"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, User, Globe, ChevronDown, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  currency: string;
  setCurrency: (cur: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  lang,
  setLang,
  currency,
  setCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currencies = ["QAR", "SAR", "AED", "KWD", "BHD", "OMR"];

  const navLinks = [
    { name: lang === "ar" ? "الرئيسية" : "Home", href: "#" },
    { name: lang === "ar" ? "قواعد التثبيت" : "Mounting Bases", href: "#vehicle-selection" },
    { name: lang === "ar" ? "حوامل الأجهزة" : "Device Holders", href: "#device-selection" },
    { name: lang === "ar" ? "الفئات" : "Categories", href: "#categories" },
    { name: lang === "ar" ? "اتصل بنا" : "Contact Us", href: "#footer" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-neutral-900 font-bold px-2 py-0.5 rounded-full text-[10px]">PROMO</span>
            <span>{lang === "ar" ? "توصيل سريع لجميع دول الخليج (قطر، السعودية، الإمارات، الكويت، عمان، البحرين)" : "Fast GCC Delivery (Qatar, UAE, Saudi Arabia, Kuwait, Oman, Bahrain)"}</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative group cursor-pointer flex items-center gap-1">
              <span>{currency}</span>
              <ChevronDown size={12} />
              <div className="absolute right-0 top-full mt-1 bg-neutral-800 text-white shadow-lg rounded py-1 min-w-[80px] hidden group-hover:block border border-neutral-700 z-50">
                {currencies.map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className="block w-full text-left px-3 py-1 text-xs hover:bg-amber-400 hover:text-neutral-900"
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Globe size={13} />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-amber-500"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 text-neutral-900 font-black text-2xl tracking-tighter px-3 py-1 rounded-lg shadow-sm">
              THABT
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold hidden sm:inline-block">
              MOUNTS
            </span>
          </div>
        </a>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث عن سيارة أو جهاز أو منتج..." : "Search for vehicle, device or product..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2 border border-transparent focus:border-amber-400 focus:bg-white focus:outline-none transition"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-amber-500 text-sm font-medium">
            <User size={20} />
            <span className="hidden lg:inline">{lang === "ar" ? "حسابي" : "Account"}</span>
          </a>

          {/* Cart Icon Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 bg-amber-400 text-neutral-900 rounded-full hover:bg-amber-500 transition shadow-sm"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-100 hidden lg:block bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-3 text-sm font-medium hover:text-amber-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 text-white border-t border-neutral-800 px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder={lang === "ar" ? "بحث..." : "Search..."}
              className="w-full bg-neutral-800 text-white text-sm rounded-full pl-4 pr-10 py-2 border border-neutral-700 focus:outline-none"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm hover:text-amber-400 border-b border-neutral-800"
            >
              {link.name}
            </a>
          ))}
          <div className="flex justify-between items-center pt-2 text-xs text-gray-400">
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="text-amber-400 font-bold">
              {lang === "en" ? "العربية" : "English"}
            </button>
            <div className="flex gap-2">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded ${currency === c ? "bg-amber-400 text-black font-bold" : "bg-neutral-800"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
