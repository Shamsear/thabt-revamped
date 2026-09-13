"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, SlidersHorizontal, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useDevicePerfTier, perfClasses } from "@/utils/useDevicePerfTier";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { lang, user, openAuthModal } = useAppContext();
  const perfTier = useDevicePerfTier();
  const styles = perfClasses[perfTier];

  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Auto-shrink on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect virtual keyboard via window.visualViewport
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleViewportChange = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      const isKeyboard = window.innerHeight - vv.height > 150;
      setKeyboardVisible(isKeyboard);
    };

    window.visualViewport.addEventListener("resize", handleViewportChange);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  // Hide on checkout page or when keyboard is open
  if (pathname === "/checkout" || keyboardVisible) {
    return null;
  }

  const navItems = [
    {
      icon: Home,
      label: lang === "ar" ? "الرئيسية" : "Home",
      href: "/",
      isActive: pathname === "/",
    },
    {
      icon: Compass,
      label: lang === "ar" ? "مطابق سيارتك" : "Matcher",
      href: "/find",
      isActive: pathname === "/find",
      highlight: true,
    },
    {
      icon: SlidersHorizontal,
      label: lang === "ar" ? "الكتالوج" : "Shop",
      href: "/search",
      isActive: pathname.startsWith("/search") || pathname.startsWith("/categories"),
    },
    {
      icon: User,
      label: lang === "ar" ? "حسابي" : "Profile",
      href: "/profile",
      isActive: pathname === "/profile",
      onClick: !user?.isLoggedIn ? () => openAuthModal() : undefined,
    },
  ];

  return (
    <div
      className={`sm:hidden fixed left-4 right-4 z-40 transition-all duration-300 pointer-events-none ${
        isScrolledDown
          ? "scale-95 opacity-85 translate-y-1 bottom-[calc(0.6rem+env(safe-area-inset-bottom))]"
          : "scale-100 opacity-100 translate-y-0 bottom-[calc(0.9rem+env(safe-area-inset-bottom))]"
      }`}
    >
      <nav
        className={`pointer-events-auto max-w-sm mx-auto h-14 rounded-full border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-2 flex items-center justify-around transition-all ${
          styles.hasBlur ? "bg-white/92 backdrop-blur-xl" : "bg-white"
        }`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const content = (
            <div
              className={`relative flex flex-col items-center justify-center gap-0.5 w-16 py-1 transition-colors cursor-pointer select-none active:scale-95 ${
                item.isActive
                  ? "text-[#c5a059] font-bold"
                  : item.highlight
                  ? "text-[#9b7832] font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <div className="relative">
                <IconComponent
                  size={19}
                  className={`stroke-[1.7] ${item.isActive ? "text-[#c5a059]" : ""}`}
                />
                {item.highlight && !item.isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {item.isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#c5a059] shadow-[0_1px_4px_rgba(197,160,89,0.5)]" />
              )}
            </div>
          );

          return item.onClick ? (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="outline-none focus:outline-none"
            >
              {content}
            </button>
          ) : (
            <Link key={item.label} href={item.href} className="outline-none focus:outline-none">
              {content}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
