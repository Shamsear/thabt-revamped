"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Search,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Globe,
  Compass,
  Shield,
  Camera,
  MapPin,
  Briefcase,
  HelpCircle,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext, SupportedCurrency, SupportedLanguage } from "@/context/AppContext";

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  lang?: SupportedLanguage;
  setLang?: (lang: SupportedLanguage) => void;
  currency?: SupportedCurrency;
  setCurrency?: (cur: SupportedCurrency) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount: propCartCount,
  onOpenCart: propOnOpenCart,
  lang: propLang,
  setLang: propSetLang,
  currency: propCurrency,
  setCurrency: propSetCurrency,
}) => {
  const context = useAppContext();
  const router = useRouter();

  const lang = propLang || context.lang;
  const setLang = propSetLang || context.setLang;
  const currency = (propCurrency as SupportedCurrency) || context.currency;
  const setCurrency = (propSetCurrency as (cur: SupportedCurrency) => void) || context.setCurrency;
  const cartCount = propCartCount !== undefined ? propCartCount : context.totalCartCount;
  const onOpenCart = propOnOpenCart || (() => context.setCartDrawerOpen(true));

  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Focus search input when toggled open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const currencies: { code: SupportedCurrency; name: string }[] = [
    { code: "QAR", name: "Qatar" },
    { code: "SAR", name: "Saudi Arabia" },
    { code: "AED", name: "UAE" },
    { code: "KWD", name: "Kuwait" },
    { code: "BHD", name: "Bahrain" },
    { code: "OMR", name: "Oman" },
    { code: "USD", name: "USD" },
  ];

  // Clean, focused navigation for desktop header (5 essential items)
  const navLinks = [
    { name: lang === "ar" ? "مطابق التثبيت" : "Vehicle Matcher", href: "/find", highlight: true },
    { name: lang === "ar" ? "قواعد برو كليبس" : "ProClips Bases", href: "/categories/pro-clips" },
    { name: lang === "ar" ? "حوامل الأجهزة" : "Device Holders", href: "/categories/device-holders" },
    { name: lang === "ar" ? "ماونت إكس" : "MountX", href: "/mountx" },
    { name: lang === "ar" ? "الكتالوج" : "Catalog", href: "/search" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/user/images/black_logo.png"
              alt="Thabt"
              className="h-8 sm:h-8.5 w-auto object-contain"
            />
          </Link>

          {/* Clean, Non-Cramped Desktop Navigation (Visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm text-neutral-600 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors duration-150 py-1 ${
                  link.highlight
                    ? "text-[#9b7832] font-semibold hover:text-[#795d23] flex items-center gap-1.5"
                    : "hover:text-neutral-950 hover-underline-gold"
                }`}
              >
                {link.highlight && <Compass size={14} className="text-[#c5a059]" />}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Clean Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Search Icon Toggle (Opens compact inline search or modal) */}
            <div className="relative">
              {!searchOpen ? (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Search"
                  title={lang === "ar" ? "بحث" : "Search"}
                >
                  <Search size={18} />
                </button>
              ) : (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-neutral-100 rounded-full pl-3 pr-2 py-1 border border-neutral-300 shadow-sm animate-in fade-in zoom-in-95 duration-150"
                >
                  <Search size={14} className="text-neutral-400 shrink-0 mr-2 rtl:mr-0 rtl:ml-2" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === "ar" ? "ابحث هنا..." : "Search..."}
                    className="bg-transparent text-xs text-neutral-900 w-32 sm:w-48 focus:outline-none placeholder-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full cursor-pointer ml-1 rtl:ml-0 rtl:mr-1"
                  >
                    <X size={13} />
                  </button>
                </form>
              )}
            </div>

            {/* Currency Dropdown (Desktop) */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-[#c5a059] transition cursor-pointer py-1.5 px-2 rounded-lg hover:bg-neutral-100"
              >
                <span>{currency}</span>
                <ChevronDown size={11} className="text-neutral-400" />
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

            {/* Language Switcher (Desktop) */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="hidden sm:block text-xs font-medium text-neutral-600 hover:text-[#c5a059] transition cursor-pointer py-1.5 px-2 rounded-lg hover:bg-neutral-100"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>

            {/* Profile Link (Desktop) */}
            <Link
              href="/profile"
              className="hidden lg:flex items-center justify-center p-2 text-neutral-600 hover:text-[#c5a059] rounded-full hover:bg-neutral-100 transition-colors"
              title={lang === "ar" ? "حسابي" : "My Account"}
            >
              <User size={18} />
            </Link>

            {/* Shopping Bag with Gold Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-neutral-900 hover:text-[#c5a059] transition cursor-pointer flex items-center justify-center rounded-full hover:bg-neutral-100"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} className="stroke-[1.6]" />
              {cartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 rtl:right-auto rtl:left-0.5 w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 rounded-full cursor-pointer active:scale-95 transition-transform"
              aria-label="Open navigation sidebar"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Navigation Side Drawer */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
              {/* Dark Full-Screen Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              />

              {/* Sliding Sidebar Shell */}
              <motion.div
                initial={{ x: lang === "ar" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: lang === "ar" ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 z-[101] w-[300px] sm:w-[350px] max-w-[85vw] h-screen h-[100dvh] bg-white shadow-2xl flex flex-col border-l rtl:border-l-0 rtl:border-r border-neutral-200/90"
              >
                {/* Sidebar Top Header */}
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <img
                      src="/user/images/black_logo.png"
                      alt="Thabt"
                      className="h-7 w-auto object-contain"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer active:scale-95"
                    aria-label="Close sidebar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Search Bar in Mobile Drawer */}
                <div className="px-5 py-3 border-b border-neutral-100 shrink-0 bg-neutral-50/50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-neutral-400 pointer-events-none"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === "ar" ? "ابحث عن سيارتك أو جهازك..." : "Search car or device..."}
                      className="w-full bg-white text-xs text-neutral-900 placeholder-neutral-400 rounded-xl pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 border border-neutral-200 focus:outline-none focus:border-[#c5a059]"
                    />
                  </form>
                </div>

                {/* Scrollable Navigation Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                  {/* Hero Matcher Callout Banner */}
                  <Link
                    href="/find"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#faf6ed] to-[#f4ebe0] border border-[#c5a059]/40 shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c5a059] text-neutral-950 flex items-center justify-center font-bold">
                        <Compass size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900">
                          {lang === "ar" ? "مطابق التثبيت للسيارات" : "Vehicle Fitment Matcher"}
                        </p>
                        <p className="text-[10px] text-[#8c6f2e]">
                          {lang === "ar" ? "اختر سيارتك وهاتفك خطوة بخطوة" : "2-Step Base + Holder System"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-[#c5a059] rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Collections */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                      {lang === "ar" ? "التشكيلات والمنتجات" : "Collections"}
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/categories/pro-clips"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span>{lang === "ar" ? "قواعد برو كليبس" : "ProClips Mounts"}</span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/categories/device-holders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span>{lang === "ar" ? "حوامل الأجهزة" : "Device Holders"}</span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/mountx"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Shield size={14} className="text-[#c5a059]" />
                          {lang === "ar" ? "ماونت إكس ألمنيوم للطرق الوعرة" : "MountX All-Terrain System"}
                        </span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/categories/leather-mount"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span>{lang === "ar" ? "حوامل جلدية" : "Leather Mounts"}</span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/categories/motorbike-mount"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span>{lang === "ar" ? "حوامل الدراجات" : "Motorbike Mounts"}</span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/categories/antenna-accessories"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span>{lang === "ar" ? "الهوائيات والدفع الرباعي" : "Antenna & Off-Road"}</span>
                        <ChevronRight size={14} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/search"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#8c6f2e] hover:bg-[#faf6ed] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <SlidersHorizontal size={14} />
                          {lang === "ar" ? "تصفح كامل الكتالوج" : "Browse All Products"}
                        </span>
                        <ChevronRight size={14} className="text-[#c5a059] rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>

                  {/* Company & Content */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                      {lang === "ar" ? "المحتوى والمجتمع" : "Experience"}
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/gallery"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Camera size={14} className="text-neutral-500" />
                          {lang === "ar" ? "معرض صور تركيبات العملاء" : "Customer Builds Gallery"}
                        </span>
                        <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/contact-us"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin size={14} className="text-neutral-500" />
                          {lang === "ar" ? "معارض الدوحة وأوقات العمل" : "Doha Showrooms & Locations"}
                        </span>
                        <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/careers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Briefcase size={14} className="text-neutral-500" />
                          {lang === "ar" ? "الوظائف وبيئة العمل" : "Careers at Thabt"}
                        </span>
                        <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/faqs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle size={14} className="text-neutral-500" />
                          {lang === "ar" ? "الأسئلة الشائعة والضمان" : "FAQs & Support"}
                        </span>
                        <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <User size={14} className="text-neutral-500" />
                          {lang === "ar" ? "حسابي وتتبع الشحنات" : "My Account & Orders"}
                        </span>
                        <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>

                  {/* Cart Action */}
                  <div className="pt-2">
                    <Link
                      href="/cart"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag size={15} />
                        {lang === "ar" ? "عرض سلة المشتريات" : "View Shopping Cart"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#c5a059] text-neutral-950 text-[10px]">
                        {cartCount}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Sidebar Footer: Currency, Language & WhatsApp */}
                <div className="p-4 border-t border-neutral-100 bg-neutral-50/90 space-y-3 shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    {/* Language Switch */}
                    <button
                      type="button"
                      onClick={() => {
                        setLang(lang === "en" ? "ar" : "en");
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-[#c5a059] transition-all cursor-pointer active:scale-95"
                    >
                      <Globe size={13} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "English" : "العربية"}</span>
                    </button>

                    {/* Currency Selector */}
                    <div className="relative flex-1">
                      <button
                        type="button"
                        onClick={() => setCurrencyOpen(!currencyOpen)}
                        className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-[#c5a059] transition-all cursor-pointer active:scale-95"
                      >
                        <span>{currency}</span>
                        <ChevronDown size={13} className="text-neutral-400" />
                      </button>

                      {currencyOpen && (
                        <div
                          className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-neutral-200 rounded-xl shadow-xl py-1 z-50 max-h-48 overflow-y-auto"
                          onClick={() => setCurrencyOpen(false)}
                        >
                          {currencies.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setCurrency(c.code);
                                setCurrencyOpen(false);
                              }}
                              className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs transition cursor-pointer flex items-center justify-between ${
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
                  </div>

                  {/* WhatsApp Direct */}
                  <a
                    href="https://api.whatsapp.com/send?phone=97450400314"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>{lang === "ar" ? "تواصل معنا عبر واتساب" : "WhatsApp Concierge"}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
