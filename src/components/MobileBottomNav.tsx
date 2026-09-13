"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { lang, totalCartCount, setCartDrawerOpen } = useAppContext();

  const navItems = [
    {
      icon: Home,
      label: lang === "ar" ? "الرئيسية" : "Home",
      href: "/",
      isActive: pathname === "/",
    },
    {
      icon: Search,
      label: lang === "ar" ? "بحث" : "Search",
      href: "/search",
      isActive: pathname === "/search",
    },
    {
      icon: ShoppingBag,
      label: lang === "ar" ? "السلة" : "Cart",
      href: "/cart",
      isActive: pathname === "/cart" || pathname === "/checkout",
      badge: totalCartCount > 0 ? totalCartCount : undefined,
      onClick: () => setCartDrawerOpen(true),
    },
    {
      icon: User,
      label: lang === "ar" ? "حسابي" : "Profile",
      href: "/profile",
      isActive: pathname === "/profile",
    },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 mobile-bottom-nav">
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return item.onClick ? (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 transition-colors cursor-pointer ${
                item.isActive
                  ? "text-[#c5a059]"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <IconComponent size={20} className="stroke-[1.6]" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge !== undefined && (
                <span className="absolute top-0 right-1.5 w-4 h-4 rounded-full bg-[#c5a059] text-neutral-950 text-[9px] font-black flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 transition-colors ${
                item.isActive
                  ? "text-[#c5a059]"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <IconComponent size={20} className="stroke-[1.6]" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#c5a059]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
