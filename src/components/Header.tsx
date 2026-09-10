"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies = [
    { code: "QAR", name: "Qatar" },
    { code: "SAR", name: "Saudi Arabia" },
    { code: "AED", name: "UAE" },
    { code: "KWD", name: "Kuwait" },
    { code: "BHD", name: "Bahrain" },
    { code: "OMR", name: "Oman" },
  ];

  const categories = [
    { name: lang === "ar" ? "قواعد برو كليبس" : "ProClips", slug: "pro-clips" },
    { name: lang === "ar" ? "حوامل الأجهزة" : "Device Holders", slug: "device-holders" },
    { name: lang === "ar" ? "حوامل جلدية" : "Leather", slug: "leather-mount" },
    { name: lang === "ar" ? "حوامل الدراجات" : "Motorbike", slug: "motorbike-mount" },
    { name: lang === "ar" ? "الهوائيات والإكسسوارات" : "Off-Road & Antenna", slug: "antenna-accessories" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById("hardware");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo (Black & Gold) */}
        <a href="#" className="flex items-center shrink-0 mr-4 sm:mr-8 rtl:mr-0 rtl:ml-4 sm:rtl:ml-8">
          <img
            src="/user/images/black_logo.png"
            alt="Thabt"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* Spacious, Elegant Navigation Links with Subtle Gold Underline Animation */}
        <nav className="hidden lg:flex items-center gap-9 text-sm text-neutral-600 font-medium">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="hover:text-neutral-950 transition-colors duration-200 whitespace-nowrap hover-underline-gold py-1"
            >
              {cat.name}
            </a>
          ))}
        </nav>

        {/* Right Tools: Search, Currency, Language, Cart */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto rtl:ml-0 rtl:mr-auto">
          {/* Subtle Minimalist Expanding Search Input */}
          <form onSubmit={handleSearch} className="hidden md:block relative w-48 lg:w-56 focus-within:w-64 transition-all duration-300 ease-out">
            <Search
              size={15}
              className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-neutral-400 pointer-events-none transition-colors group-focus-within:text-[#c5a059]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ar" ? "بحث عن سيارتك أو جهازك..." : "Search car or device..."}
              className="w-full bg-neutral-100/70 hover:bg-neutral-100 text-xs text-neutral-900 placeholder-neutral-400 rounded-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 border border-transparent focus:outline-none focus:border-[#c5a059]/40 focus:ring-2 focus:ring-[#c5a059]/10 focus:bg-white transition-all duration-200"
            />
          </form>

          {/* Hairline Divider */}
          <div className="hidden sm:block h-4 w-px bg-neutral-200" />

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-[#c5a059] transition cursor-pointer py-1.5"
            >
              <span>{currency}</span>
              <ChevronDown size={13} className="text-neutral-400" />
            </button>

            {currencyOpen && (
              <div
                className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-36 bg-white border border-neutral-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in duration-150"
                onClick={() => setCurrencyOpen(false)}
              >
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`w-full text-left rtl:text-right px-3.5 py-1.5 text-xs transition cursor-pointer flex items-center justify-between ${
                      currency === c.code
                        ? "bg-[#faf6ed] font-bold text-[#c5a059]"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-[10px] text-neutral-400">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="text-xs font-medium text-neutral-600 hover:text-[#c5a059] transition cursor-pointer py-1.5"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>

          {/* Shopping Bag with Gold Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-900 hover:text-[#c5a059] transition cursor-pointer flex items-center justify-center group"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={20} className="stroke-[1.6]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rtl:-right-auto rtl:-left-0.5 w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-black flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-neutral-800 hover:text-neutral-950 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-6 py-5 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <Search size={15} className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-neutral-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ar" ? "بحث..." : "Search car or device..."}
              className="w-full bg-neutral-100 text-sm rounded-xl pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 focus:outline-none"
            />
          </form>

          <div className="space-y-2 pt-2">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-800 hover:text-[#c5a059] py-2 border-b border-neutral-50"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
