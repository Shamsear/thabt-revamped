"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  LogOut,
  Package,
  Car,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext, SupportedCurrency, SupportedLanguage } from "@/context/AppContext";
import { MOCK_ALL_PRODUCTS } from "@/data/mockData";
import { AuthModal } from "@/components/AuthModal";
import { useDevicePerfTier, perfClasses } from "@/utils/useDevicePerfTier";

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
  const pathname = usePathname();
  const perfTier = useDevicePerfTier();
  const tierStyles = perfClasses[perfTier];

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
  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // #9: Header scroll state with hysteresis deadband (prevents any fluctuation or getting stuck)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
          setIsScrolled((prev) => {
            if (!prev && scrollY > 30) return true;
            if (prev && scrollY < 10) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // #7: Cart badge bounce key — triggers re-animation on count change
  const [badgeBounceKey, setBadgeBounceKey] = useState(0);
  const prevCartCount = useRef(cartCount);
  useEffect(() => {
    if (cartCount !== prevCartCount.current) {
      setBadgeBounceKey((k) => k + 1);
      prevCartCount.current = cartCount;
    }
  }, [cartCount]);

  // Reset clickedHref when mobile menu opens/closes or route changes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setClickedHref(null);
    }
  }, [mobileMenuOpen, pathname]);

  const handleSidebarNav = (href: string) => {
    setClickedHref(href);
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 120);
  };

  // Close dropdowns and search on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setSearchOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(target)) {
        setCurrencyOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMoreOpen(false);
        setCurrencyOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K" || e.code === "KeyK")) {
        e.preventDefault();
        e.stopPropagation();
        setSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }, 30);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown, true);
      if (moreCloseTimeout.current) clearTimeout(moreCloseTimeout.current);
    };
  }, []);

  const handleMoreMouseEnter = () => {
    if (moreCloseTimeout.current) clearTimeout(moreCloseTimeout.current);
    setMoreOpen(true);
  };

  const handleMoreMouseLeave = () => {
    moreCloseTimeout.current = setTimeout(() => {
      setMoreOpen(false);
    }, 200);
  };

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

  // Navigation Links: when search is open, MountX and Catalog collapse into More
  const allNavLinks = [
    { name: lang === "ar" ? "مطابق التثبيت" : "Vehicle Matcher", href: "/find", highlight: true },
    { name: lang === "ar" ? "قواعد برو كليبس" : "ProClips Bases", href: "/categories/pro-clips" },
    { name: lang === "ar" ? "حوامل الأجهزة" : "Device Holders", href: "/categories/device-holders" },
    { name: lang === "ar" ? "ماونت إكس" : "MountX", href: "/mountx", icon: Shield, collapseOnSearch: true },
    { name: lang === "ar" ? "الكتالوج" : "Catalog", href: "/search", icon: SlidersHorizontal, collapseOnSearch: true },
  ];

  const visibleNavLinks = searchOpen
    ? allNavLinks.filter((l) => !l.collapseOnSearch)
    : allNavLinks;

  const baseMoreLinks = [
    { name: lang === "ar" ? "معرض التركيبات" : "Builds Gallery", href: "/gallery", icon: Camera },
    { name: lang === "ar" ? "معارض الدوحة" : "Doha Showrooms", href: "/contact-us", icon: MapPin },
    { name: lang === "ar" ? "الأسئلة والضمان" : "FAQs & Support", href: "/faqs", icon: HelpCircle },
    { name: lang === "ar" ? "الوظائف وبيئة العمل" : "Careers", href: "/careers", icon: Briefcase },
  ];

  const moreLinks = searchOpen
    ? [
        { name: lang === "ar" ? "ماونت إكس ألمنيوم" : "MountX All-Terrain", href: "/mountx", icon: Shield },
        { name: lang === "ar" ? "كتالوج المنتجات" : "Product Catalog", href: "/search", icon: SlidersHorizontal },
        ...baseMoreLinks,
      ]
    : baseMoreLinks;

  const isRouteActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (pathname === href) return true;
    if (pathname.startsWith(href + "/")) return true;

    // Handle mounting-bases alias to pro-clips
    if (
      href === "/categories/pro-clips" &&
      (pathname === "/categories/mounting-bases" || pathname.startsWith("/categories/mounting-bases/"))
    ) {
      return true;
    }

    // Match product detail pages to their category
    if (pathname.startsWith("/products/")) {
      const slug = pathname.replace("/products/", "");
      const matched = MOCK_ALL_PRODUCTS.find((p) => p.slug === slug);
      if (matched) {
        if (href === `/categories/${matched.category_slug}`) return true;
        if (matched.category_slug === "mountx" && href === "/mountx") return true;
        if (matched.category_slug === "pro-clips" && href === "/categories/pro-clips") return true;
      }
    }
    return false;
  };

  const isMoreActive = moreLinks.some((l) => pathname === l.href);

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
      {/* ========================================================================= */}
      {/* DESKTOP FLOATING PILL DOCK (lg+)                                         */}
      {/* Fixed-height wrapper (74px) prevents ANY layout shift or jumping of content */}
      {/* GPU hardware-accelerated CSS transition with Apple cubic-bezier curve     */}
      {/* Consistent rounded-full pill shape at all times                           */}
      {/* ========================================================================= */}
      <header className="hidden lg:block sticky top-0 z-40 w-full pointer-events-none h-[74px] pt-2 px-4 sm:px-6 lg:px-8">
        <div
          style={{ transform: "translateZ(0)" }}
          className={`pointer-events-auto mx-auto w-full px-5 sm:px-6 rounded-full border flex items-center justify-between gap-4 select-none will-change-[max-width,height,background-color,border-color,box-shadow] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            tierStyles.blur
          } ${
            isScrolled
              ? "max-w-[1080px] h-[52px] bg-white/95 border-[#c5a059]/30 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)]"
              : "max-w-7xl h-16 bg-white/88 border-neutral-200/80 shadow-[0_2px_10px_0_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <img
              src="/user/images/black_logo.png"
              alt="Thabt"
              className={`w-auto object-contain transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-90 shrink-0 ${
                isScrolled ? "h-7" : "h-9"
              }`}
            />
          </Link>

          {/* Minimal, Luxury Active-Aware Desktop Navigation */}
          <nav className="flex items-center gap-0.5 xl:gap-1.5 h-full text-xs flex-nowrap whitespace-nowrap shrink-0">
            <AnimatePresence initial={false}>
              {visibleNavLinks.map((link) => {
                const active = isRouteActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.9, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0.9, width: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden flex items-center h-full shrink-0"
                  >
                    <Link
                      href={link.href}
                      className={`relative h-full flex items-center px-3 xl:px-3.5 tracking-tight transition-colors whitespace-nowrap ${
                        active
                          ? "text-neutral-950 font-bold"
                          : "text-neutral-600 hover:text-neutral-950 font-medium"
                      }`}
                    >
                      <span className="relative inline-flex items-center gap-1.5 py-0.5">
                        {link.href === "/find" && (
                          <Compass
                            size={13}
                            className={`transition-colors ${
                              active ? "text-[#c5a059]" : "text-neutral-400"
                            }`}
                          />
                        )}
                        <span>{link.name}</span>
                        {active && (
                          <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#c5a059] rounded-full shadow-[0_1px_4px_rgba(197,160,89,0.35)]" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* More Dropdown */}
            <div
              ref={moreRef}
              className="relative h-full flex items-center shrink-0"
              onMouseEnter={handleMoreMouseEnter}
              onMouseLeave={handleMoreMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (moreCloseTimeout.current) clearTimeout(moreCloseTimeout.current);
                  setMoreOpen((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setMoreOpen(true);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setMoreOpen(false);
                  }
                }}
                aria-haspopup="true"
                aria-expanded={moreOpen}
                className={`relative h-full flex items-center px-3 tracking-tight transition-colors cursor-pointer whitespace-nowrap ${
                  isMoreActive
                    ? "text-neutral-950 font-bold"
                    : "text-neutral-600 hover:text-neutral-950 font-medium"
                }`}
              >
                <span className="relative inline-flex items-center gap-1 py-0.5">
                  <span>{lang === "ar" ? "المزيد" : "More"}</span>
                  {searchOpen && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                  )}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      moreOpen ? "rotate-180 text-[#c5a059]" : isMoreActive ? "text-[#c5a059]" : "text-neutral-400"
                    }`}
                  />
                  {isMoreActive && (
                    <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#c5a059] rounded-full shadow-[0_1px_4px_rgba(197,160,89,0.35)]" />
                  )}
                </span>
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full pt-1.5 right-0 rtl:right-auto rtl:left-0 w-56 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={handleMoreMouseEnter}
                  onMouseLeave={handleMoreMouseLeave}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setMoreOpen(false);
                    }
                  }}
                >
                  <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-xl py-1.5 overflow-hidden">
                    {moreLinks.map((sub, idx) => {
                      const isSubActive = pathname === sub.href;
                      const SubIcon = sub.icon;
                      const isOverflowItem = searchOpen && idx < 2;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors ${
                            isSubActive
                              ? "bg-neutral-50 text-neutral-950 font-bold"
                              : isOverflowItem
                              ? "text-neutral-900 bg-neutral-50/50 hover:bg-neutral-100 hover:text-neutral-950 font-medium"
                              : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 font-medium"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <SubIcon
                              size={14}
                              className={isSubActive ? "text-[#c5a059]" : isOverflowItem ? "text-[#9b7832]" : "text-neutral-400"}
                            />
                            <span>{sub.name}</span>
                          </span>
                          {isSubActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Clean Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 flex-nowrap h-full">
            {/* Search Icon Toggle with Smooth Animated Inline Expansion */}
            <div ref={searchContainerRef} className="relative flex items-center shrink-0">
              <motion.div
                initial={false}
                animate={{
                  width: searchOpen ? (typeof window !== "undefined" && window.innerWidth >= 1280 ? 270 : 220) : 38,
                }}
                transition={{ type: "spring", stiffness: 460, damping: 34 }}
                className={`flex items-center h-8.5 rounded-full overflow-hidden transition-colors duration-200 ${
                  searchOpen
                    ? "bg-neutral-50/95 hover:bg-neutral-100/70 focus-within:bg-white border border-neutral-300 focus-within:border-[#c5a059] shadow-2xs px-2"
                    : "bg-transparent border border-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!searchOpen) {
                      setSearchOpen(true);
                    }
                  }}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                    searchOpen
                      ? "text-[#c5a059]"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                  }`}
                  aria-label="Search"
                  title={lang === "ar" ? "بحث" : "Search"}
                >
                  <Search size={17} />
                </button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onSubmit={handleSearchSubmit}
                      className="flex items-center flex-1 min-w-0 pl-1.5 rtl:pl-0 rtl:pr-1.5"
                    >
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={lang === "ar" ? "ابحث عن سيارة أو قطعة..." : "Search model or mount..."}
                        className="bg-transparent text-xs text-neutral-900 w-full focus:outline-none placeholder-neutral-400 py-1"
                      />
                      <span className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold text-neutral-400 bg-neutral-200/70 border border-neutral-300/80 rounded shrink-0 mr-1 rtl:mr-0 rtl:ml-1">
                        ⌘K
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="p-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-full cursor-pointer shrink-0 ml-1 rtl:ml-0 rtl:mr-1 transition-colors"
                        aria-label="Close search"
                      >
                        <X size={13} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Currency Dropdown (Desktop) */}
            <div ref={currencyRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrencyOpen(true);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setCurrencyOpen(false);
                  }
                }}
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
                className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-[#c5a059] transition cursor-pointer py-1.5 px-2 rounded-lg hover:bg-neutral-100"
              >
                <span>{currency}</span>
                <ChevronDown size={11} className="text-neutral-400" />
              </button>

              {currencyOpen && (
                <div
                  className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1.5 w-36 bg-white border border-neutral-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in duration-150"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setCurrencyOpen(false);
                    }
                  }}
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyOpen(false);
                      }}
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
              className="text-xs font-medium text-neutral-600 hover:text-[#c5a059] transition cursor-pointer py-1.5 px-2 rounded-lg hover:bg-neutral-100"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>

            {/* Profile / Login Button & Dropdown (Desktop) */}
            {context.user?.isLoggedIn ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-1 p-1 rounded-full transition-colors cursor-pointer ${
                    userMenuOpen || pathname === "/profile"
                      ? "bg-[#faf6ed] text-[#c5a059] ring-2 ring-[#c5a059]/30"
                      : "hover:bg-neutral-100"
                  }`}
                  title={context.user.name || (lang === "ar" ? "حسابي" : "My Account")}
                >
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] text-neutral-950 font-black text-[10px] flex items-center justify-center shadow-2xs uppercase">
                    {context.user.name ? context.user.name.charAt(0) : "M"}
                  </div>
                  <ChevronDown size={11} className={`text-neutral-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180 text-[#c5a059]" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1.5 w-52 bg-white border border-neutral-200/90 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                    <div className="px-3.5 py-2 border-b border-neutral-100">
                      <p className="text-xs font-bold text-neutral-950 truncate">
                        {context.user.name || "Mohammed Al-Kuwari"}
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono truncate">
                        {context.user.phone || context.user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium transition-colors"
                      >
                        <User size={14} className="text-[#c5a059]" />
                        <span>{lang === "ar" ? "حسابي والطلبات" : "My Account & Orders"}</span>
                      </Link>

                      <Link
                        href="/find"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium transition-colors"
                      >
                        <Compass size={14} className="text-[#c5a059]" />
                        <span>{lang === "ar" ? "مطابق التثبيت" : "Vehicle Matcher"}</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={() => {
                          context.logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold transition-colors text-left rtl:text-right cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>{lang === "ar" ? "تسجيل الخروج" : "Logout"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={context.openAuthModal}
                className="flex items-center justify-center p-2 rounded-full text-neutral-600 hover:text-[#c5a059] hover:bg-neutral-100 transition cursor-pointer"
                title={lang === "ar" ? "تسجيل الدخول / إنشاء حساب" : "Login / Register"}
              >
                <User size={18} />
              </button>
            )}

            {/* Shopping Bag with Gold Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className={`relative p-2 transition-colors flex items-center justify-center rounded-full ${
                pathname === "/cart" || pathname === "/checkout"
                  ? "text-[#c5a059] bg-[#faf6ed]"
                  : "text-neutral-900 hover:text-[#c5a059] hover:bg-neutral-100"
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} className="stroke-[1.6]" />
              {cartCount > 0 && (
                <span
                  key={badgeBounceKey}
                  className={`absolute top-0.5 right-0.5 rtl:right-auto rtl:left-0.5 w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-black flex items-center justify-center shadow-xs ${badgeBounceKey > 0 ? "badge-bounce" : ""}`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE LIQUID TOP BAR (<lg)                                               */}
      {/* Opaque at rest, dissolves into translucent liquid glass on scroll          */}
      {/* ========================================================================= */}
      <header
        className={`lg:hidden sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? tierStyles.hasBlur
              ? "bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 border-b border-neutral-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              : "bg-white/95 border-b border-neutral-200 shadow-xs"
            : "bg-white border-b border-neutral-100 shadow-none"
        }`}
      >
        <div className="px-4 h-14 flex items-center justify-between gap-2 flex-nowrap">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/user/images/black_logo.png"
              alt="Thabt"
              className="h-8 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Clean Mobile Right Actions: Search + Cart + Menu */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Search Icon */}
            <Link
              href="/search"
              className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={19} />
            </Link>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-neutral-900 hover:text-[#c5a059] hover:bg-neutral-100 rounded-full transition-colors flex items-center justify-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} className="stroke-[1.6]" />
              {cartCount > 0 && (
                <span
                  key={badgeBounceKey}
                  className={`absolute top-0.5 right-0.5 rtl:right-auto rtl:left-0.5 w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-black flex items-center justify-center shadow-xs ${badgeBounceKey > 0 ? "badge-bounce" : ""}`}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 rounded-full cursor-pointer active:scale-95 transition-transform"
              aria-label="Open navigation menu"
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
                className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 z-[101] w-[84vw] max-w-[340px] sm:w-[350px] h-screen h-[100dvh] bg-white shadow-2xl flex flex-col border-l rtl:border-l-0 rtl:border-r border-neutral-200/90 select-none"
              >
                {/* Sidebar Top Header */}
                <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
                  <Link href="/" onClick={() => handleSidebarNav("/")} className="shrink-0">
                    <img
                      src="/user/images/black_logo.png"
                      alt="Thabt"
                      className="h-8 sm:h-9 w-auto object-contain"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer active-press outline-none focus:outline-none"
                    aria-label="Close sidebar"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Search Bar in Mobile Drawer */}
                <div className="px-4 py-2 sm:px-5 sm:py-2.5 border-b border-neutral-100 shrink-0 bg-neutral-50/50">
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <Search
                      size={14}
                      className="absolute left-3 rtl:left-auto rtl:right-3 text-neutral-400 pointer-events-none"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === "ar" ? "ابحث عن سيارتك أو جهازك..." : "Search car or device..."}
                      className="w-full h-9 sm:h-10 bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 rounded-xl pl-8.5 pr-3.5 rtl:pl-3.5 rtl:pr-8.5 border border-neutral-200 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </form>
                </div>

                {/* Scrollable Navigation Body */}
                <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-none px-4 py-3 sm:px-5 sm:py-4 space-y-3.5 sm:space-y-4">
                  {/* Hero Matcher Callout Banner */}
                  {(() => {
                    const isFindActive = clickedHref ? clickedHref === "/find" : pathname === "/find";
                    return (
                      <Link
                        href="/find"
                        onClick={() => handleSidebarNav("/find")}
                        className={`flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-150 shadow-xs group outline-none focus:outline-none select-none active:scale-[0.98] ${
                          isFindActive
                            ? "bg-neutral-950 text-white border border-neutral-950 shadow-md"
                            : "bg-gradient-to-r from-[#faf6ed] to-[#f4ebe0] border border-[#c5a059]/40 text-neutral-950 hover:shadow-xs active:bg-[#f4ebe0]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-bold bg-[#c5a059] text-neutral-950 shrink-0">
                            <Compass size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 truncate ${
                              isFindActive ? "text-white" : "text-neutral-950"
                            }`}>
                              <span className="truncate">{lang === "ar" ? "مطابق التثبيت للسيارات" : "Vehicle Fitment Matcher"}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
                            </p>
                            <p className={`text-[10px] sm:text-xs truncate ${isFindActive ? "text-neutral-300" : "text-[#8c6f2e]"}`}>
                              {lang === "ar" ? "اختر سيارتك وهاتفك خطوة بخطوة" : "2-Step Base + Holder System"}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={14} className={`shrink-0 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform ${
                          isFindActive ? "text-[#c5a059]" : "text-[#c5a059]"
                        }`} />
                      </Link>
                    );
                  })()}

                  {/* Collections */}
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1 px-1">
                      {lang === "ar" ? "التشكيلات والمنتجات" : "Collections"}
                    </p>
                    <div className="space-y-0.5 sm:space-y-1">
                      {[
                        { label: lang === "ar" ? "قواعد برو كليبس" : "ProClips Mounts", href: "/categories/pro-clips" },
                        { label: lang === "ar" ? "حوامل الأجهزة" : "Device Holders", href: "/categories/device-holders" },
                        { label: lang === "ar" ? "ماونت إكس ألمنيوم للطرق الوعرة" : "MountX All-Terrain System", href: "/mountx", icon: Shield },
                        { label: lang === "ar" ? "حوامل جلدية" : "Leather Mounts", href: "/categories/leather-mount" },
                        { label: lang === "ar" ? "حوامل الدراجات" : "Motorbike Mounts", href: "/categories/motorbike-mount" },
                        { label: lang === "ar" ? "الهوائيات والدفع الرباعي" : "Antenna & Off-Road", href: "/categories/antenna-accessories" },
                        { label: lang === "ar" ? "تصفح كامل الكتالوج" : "Browse All Products", href: "/search", icon: SlidersHorizontal, isCatalog: true },
                      ].map((item) => {
                        const isItemActive = clickedHref ? clickedHref === item.href : isRouteActive(item.href);
                        const ItemIcon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => handleSidebarNav(item.href)}
                            className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-150 outline-none focus:outline-none select-none active:scale-[0.98] ${
                              isItemActive
                                ? "bg-neutral-950 text-white font-bold border border-neutral-950 shadow-xs"
                                : item.isCatalog
                                ? "text-[#8c6f2e] bg-[#faf6ed]/70 hover:bg-[#faf6ed] font-medium border border-transparent"
                                : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 font-medium border border-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              {ItemIcon && <ItemIcon size={14} className={isItemActive ? "text-[#c5a059]" : item.isCatalog ? "text-[#8c6f2e]" : "text-neutral-400"} />}
                              <span className="truncate">{item.label}</span>
                            </span>
                            {isItemActive ? (
                              <span className="w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)] shrink-0" />
                            ) : (
                              <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180 shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Company & Content */}
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1 px-1">
                      {lang === "ar" ? "المحتوى والمجتمع" : "Experience"}
                    </p>
                    <div className="space-y-0.5 sm:space-y-1">
                      {[
                        { label: lang === "ar" ? "معرض صور تركيبات العملاء" : "Customer Builds Gallery", href: "/gallery", icon: Camera },
                        { label: lang === "ar" ? "معارض الدوحة وأوقات العمل" : "Doha Showrooms & Locations", href: "/contact-us", icon: MapPin },
                        { label: lang === "ar" ? "الوظائف وبيئة العمل" : "Careers at Thabt", href: "/careers", icon: Briefcase },
                        { label: lang === "ar" ? "الأسئلة الشائعة والضمان" : "FAQs & Support", href: "/faqs", icon: HelpCircle },
                        { label: lang === "ar" ? "حسابي وتتبع الشحنات" : "My Account & Orders", href: "/profile", icon: User },
                      ].map((item) => {
                        const isItemActive = clickedHref ? clickedHref === item.href : (pathname === item.href || (item.href === "/profile" && pathname.startsWith("/profile")));
                        const ItemIcon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => handleSidebarNav(item.href)}
                            className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-150 outline-none focus:outline-none select-none active:scale-[0.98] ${
                              isItemActive
                                ? "bg-neutral-950 text-white font-bold border border-neutral-950 shadow-xs"
                                : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 font-medium border border-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <ItemIcon size={14} className={isItemActive ? "text-[#c5a059]" : "text-neutral-400"} />
                              <span className="truncate">{item.label}</span>
                            </span>
                            {isItemActive ? (
                              <span className="w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)] shrink-0" />
                            ) : (
                              <ChevronRight size={13} className="text-neutral-300 rtl:rotate-180 shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cart Action */}
                  <div className="pt-1">
                    {(() => {
                      const isCartActive = clickedHref ? clickedHref === "/cart" : pathname === "/cart";
                      return (
                        <Link
                          href="/cart"
                          onClick={() => handleSidebarNav("/cart")}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 outline-none focus:outline-none select-none active:scale-[0.98] ${
                            isCartActive
                              ? "bg-neutral-950 text-white border border-neutral-950 shadow-xs"
                              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-transparent"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ShoppingBag size={15} className={isCartActive ? "text-[#c5a059]" : "text-neutral-700"} />
                            <span>{lang === "ar" ? "عرض سلة المشتريات" : "View Shopping Cart"}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#c5a059] text-neutral-950 text-xs font-black">
                            {cartCount}
                          </span>
                        </Link>
                      );
                    })()}
                  </div>
                </div>

                {/* Sidebar Footer: Currency, Language & WhatsApp */}
                <div className="p-3 sm:p-4 border-t border-neutral-100 bg-neutral-50/90 space-y-2 sm:space-y-2.5 shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    {/* Language Switch */}
                    <button
                      type="button"
                      onClick={() => {
                        setLang(lang === "en" ? "ar" : "en");
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-[#c5a059] transition-all cursor-pointer active-press outline-none focus:outline-none select-none"
                    >
                      <Globe size={13} className="text-[#c5a059]" />
                      <span>{lang === "ar" ? "English" : "العربية"}</span>
                    </button>

                    {/* Currency Selector */}
                    <div className="relative flex-1">
                      <button
                        type="button"
                        onClick={() => setCurrencyOpen(!currencyOpen)}
                        className="w-full flex items-center justify-between py-2 px-2.5 sm:px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-[#c5a059] transition-all cursor-pointer active-press outline-none focus:outline-none select-none"
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
                              className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs transition cursor-pointer flex items-center justify-between outline-none focus:outline-none ${
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
                    className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all duration-200 shadow-sm active-press cursor-pointer outline-none focus:outline-none select-none"
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

      {/* Instant Fast Auth Modal */}
      <AuthModal
        isOpen={context.authModalOpen}
        onClose={() => context.setAuthModalOpen(false)}
        lang={lang}
      />
    </>
  );
};
