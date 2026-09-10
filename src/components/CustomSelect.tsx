"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  disabledText?: string;
  lang?: "en" | "ar";
  className?: string;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
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

  // Compute position relative to viewport
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldFlip = spaceBelow < 220 && spaceAbove > spaceBelow;

    setPlacement(shouldFlip ? "top" : "bottom");
    setCoords({
      top: shouldFlip ? rect.top : rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  // Handle scroll & resize to update floating position
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const filteredOptions = searchQuery.trim()
    ? options.filter((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : options;

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const displayText = disabled && disabledText ? disabledText : value || placeholder;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-[11px] text-neutral-500 mb-1 font-medium select-none">
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
        className={`w-full flex items-center justify-between text-xs sm:text-sm rounded-lg px-3 py-2 sm:py-2.5 border transition-all duration-150 cursor-pointer select-none text-left rtl:text-right ${
          disabled
            ? "bg-neutral-100/80 border-neutral-200/60 text-neutral-400 cursor-not-allowed"
            : isOpen
            ? "bg-white border-[#c5a059] ring-2 ring-[#c5a059]/15 text-neutral-900 shadow-sm"
            : "bg-white border-neutral-200/90 hover:border-neutral-300 text-neutral-900 shadow-2xs"
        }`}
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
                dir={lang === "ar" ? "rtl" : "ltr"}
                style={{
                  position: "fixed",
                  top: placement === "bottom" ? `${coords.top + 6}px` : undefined,
                  bottom: placement === "top" ? `${window.innerHeight - coords.top + 6}px` : undefined,
                  left: `${coords.left}px`,
                  width: `${Math.max(coords.width, 220)}px`,
                  maxWidth: "calc(100vw - 24px)",
                  zIndex: 99999,
                }}
                className="pointer-events-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-neutral-200/90 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.16),0_0_1px_rgba(0,0,0,0.1)] overflow-hidden"
                  role="listbox"
                >
                  {/* Search Input for Lists with > 7 items */}
                  {options.length > 7 && (
                    <div className="p-2 border-b border-neutral-100 bg-neutral-50/70">
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
                          className="w-full bg-white text-neutral-900 text-xs rounded-md pl-7 pr-3 rtl:pl-3 rtl:pr-7 py-1.5 border border-neutral-200 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  )}

                  {/* Scrollable Option Items */}
                  <div className="max-h-52 overflow-y-auto py-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => {
                        const isSelected = value === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(option)}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left rtl:text-right transition-colors duration-100 cursor-pointer ${
                              isSelected
                                ? "bg-[#faf6ed] text-[#b38e46] font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c5a059]"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                            }`}
                          >
                            <span className="truncate">{option}</span>
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
