"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type SelectOption = string | { label: string; value: string };

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  disabledText?: string;
  lang?: "en" | "ar";
  className?: string;
  triggerClassName?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  disabledText,
  lang = "en",
  className = "",
  triggerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [maxMenuHeight, setMaxMenuHeight] = useState<number>(260);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getOptValue = (opt: SelectOption): string =>
    typeof opt === "string" ? opt : opt.value;

  const getOptLabel = (opt: SelectOption): string =>
    typeof opt === "string" ? opt : opt.label;

  // Compute position relative to viewport with downward preference & boundary protection
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Viewport margin protection (12px safe boundary)
    const margin = 12;
    const spaceBelow = Math.max(0, viewportHeight - rect.bottom - margin);
    const spaceAbove = Math.max(0, rect.top - margin);

    // Calculate full content height based on options and search bar
    const hasSearch = options.length > 7;
    const searchBarHeight = hasSearch ? 48 : 0;
    const itemHeight = 42;
    const contentHeight = searchBarHeight + options.length * itemHeight + 16;
    const preferredMaxHeight = Math.min(contentHeight, 260);

    // Downward preference logic:
    // 1. If trigger is in the top-to-middle portion of viewport (top < 58% of viewport) -> open downwards.
    // 2. If space below can accommodate the menu (>= preferredMaxHeight or >= 140px) -> open downwards.
    // 3. Only flip upwards if trigger is past the middle/lower screen AND space below is tight AND space above has more room.
    const isTopToMiddle = rect.top < viewportHeight * 0.58;
    const fitsBelow = spaceBelow >= preferredMaxHeight || spaceBelow >= 140;
    const shouldFlip = !isTopToMiddle && !fitsBelow && spaceAbove > spaceBelow + 40;

    const currentPlacement = shouldFlip ? "top" : "bottom";
    setPlacement(currentPlacement);

    // Constrain menu height strictly to visible viewport space so it never overflows off-screen
    const availableSpace = currentPlacement === "bottom" ? spaceBelow : spaceAbove;
    const computedMaxHeight = Math.min(preferredMaxHeight, Math.max(100, availableSpace));
    setMaxMenuHeight(computedMaxHeight);

    // Horizontal alignment with safe viewport boundary clamping
    const menuWidth = Math.min(Math.max(rect.width, 220), viewportWidth - 24);
    const safeLeft = Math.max(12, Math.min(rect.left, viewportWidth - menuWidth - 12));

    setCoords({
      top: shouldFlip ? rect.top : rect.bottom,
      left: safeLeft,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  // Handle scroll & resize: close on background page scroll to prevent jumping, isolate menu list scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (e: Event) => {
      // If scrolling inside the menu list itself, do not close
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        return;
      }
      // Close cleanly when page is scrolled (prevents jumping or floating detached menus)
      setIsOpen(false);
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && options.length > 7) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen, options.length]);

  // Filter options
  const filteredOptions = options.filter((opt) => {
    const label = getOptLabel(opt);
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedOption = options.find((opt) => getOptValue(opt) === value);
  const selectedLabel = selectedOption ? getOptLabel(selectedOption) : "";
  const displayText =
    disabled && disabledText
      ? disabledText
      : selectedLabel || placeholder;

  const handleSelect = (opt: SelectOption) => {
    const val = getOptValue(opt);
    onChange(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {label && (
        <label className="block text-xs sm:text-xs text-neutral-600 mb-1 sm:mb-1.5 font-medium">
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            updatePosition();
            setIsOpen((prev) => !prev);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full h-11 sm:h-10 flex items-center justify-between text-sm sm:text-xs rounded-xl px-3.5 border transition-all duration-150 cursor-pointer select-none text-left rtl:text-right ${
          disabled
            ? "bg-neutral-100/80 border-neutral-200/60 text-neutral-400 cursor-not-allowed"
            : isOpen
            ? "bg-white border-[#c5a059] ring-2 ring-[#c5a059]/15 text-neutral-900 shadow-xs"
            : "bg-neutral-50 hover:bg-neutral-100/70 border-neutral-200 text-neutral-900"
        } ${triggerClassName}`}
      >
        <span className={`truncate ${!value && !disabled ? "text-neutral-400" : ""}`}>
          {displayText}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 ml-2 rtl:ml-0 rtl:mr-2 transition-transform duration-200 ${
            disabled
              ? "text-neutral-300"
              : isOpen
              ? "rotate-180 text-[#c5a059]"
              : "text-neutral-400 group-hover:text-neutral-600"
          }`}
        />
      </button>

      {/* Portal Dropdown Menu: completely escapes all parent containers, cards, and overflow clipping */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && !disabled && (
              <div
                ref={menuRef}
                style={{
                  position: "fixed",
                  top: placement === "bottom" ? `${coords.top + 6}px` : undefined,
                  bottom: placement === "top" ? `${window.innerHeight - coords.top + 6}px` : undefined,
                  left: `${coords.left}px`,
                  width: `${Math.max(coords.width, 220)}px`,
                  maxWidth: "calc(100vw - 24px)",
                  maxHeight: `${maxMenuHeight}px`,
                  zIndex: 99999,
                }}
                className="pointer-events-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ maxHeight: `${maxMenuHeight}px` }}
                  className="bg-white border border-neutral-200/90 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
                  role="listbox"
                >
                  {/* Search Input for Lists with > 7 items */}
                  {options.length > 7 && (
                    <div className="p-2 border-b border-neutral-100 bg-neutral-50/70 shrink-0">
                      <div className="relative flex items-center">
                        <Search
                          size={13}
                          className="absolute left-2.5 rtl:left-auto rtl:right-2.5 text-neutral-400 pointer-events-none"
                        />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={lang === "ar" ? "ابحث هنا..." : "Search..."}
                          className="w-full bg-white text-neutral-900 text-sm sm:text-xs rounded-xl pl-7 pr-3 rtl:pl-3 rtl:pr-7 py-2 sm:py-1.5 border border-neutral-200 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  )}

                  {/* Scrollable Option Items */}
                  <div className="overflow-y-auto py-1 flex-1 overscroll-contain">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((opt) => {
                        const optVal = getOptValue(opt);
                        const optLbl = getOptLabel(opt);
                        const isSelected = value === optVal;
                        return (
                          <button
                            key={optVal}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(opt)}
                            className={`w-full flex items-center justify-between px-3.5 py-3 sm:py-2.5 text-sm sm:text-xs text-left rtl:text-right transition-colors duration-100 cursor-pointer ${
                              isSelected
                                ? "bg-[#faf6ed] text-[#b38e46] font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c5a059]"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                            }`}
                          >
                            <span className="truncate">{optLbl}</span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-[#c5a059] shrink-0 ml-2 rtl:ml-0 rtl:mr-2 stroke-[2.5]"
                              />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-4 text-center text-xs text-neutral-400">
                        {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
