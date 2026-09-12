"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  lang?: "en" | "ar";
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 12,
  lang = "en",
  className = "",
}) => {
  if (totalPages <= 1) return null;

  // Compute displayed range (e.g. "Showing 1-12 of 36")
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : currentPage * pageSize;

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include page 1
      pages.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const pages = getPageNumbers();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-2 border-t border-neutral-100 ${className}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Items Counter Info */}
      {totalItems !== undefined && (
        <div className="text-xs text-neutral-500 font-medium">
          {lang === "ar" ? (
            <span>
              عرض <strong className="text-neutral-900 font-semibold">{startItem}–{endItem}</strong> من أصل{" "}
              <strong className="text-neutral-900 font-semibold">{totalItems}</strong> منتج
            </span>
          ) : (
            <span>
              Showing <strong className="text-neutral-900 font-semibold">{startItem}–{endItem}</strong> of{" "}
              <strong className="text-neutral-900 font-semibold">{totalItems}</strong> products
            </span>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <nav
        aria-label="Pagination"
        className="flex items-center gap-1 sm:gap-1.5 select-none"
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={lang === "ar" ? "الصفحة السابقة" : "Previous page"}
          className={`h-9 sm:h-9.5 px-3 rounded-xl flex items-center gap-1 text-xs font-semibold transition-all duration-150 cursor-pointer ${
            currentPage === 1
              ? "text-neutral-300 bg-transparent cursor-not-allowed pointer-events-none"
              : "text-neutral-700 hover:text-neutral-950 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 active:scale-95 shadow-2xs"
          }`}
        >
          <ChevronLeft size={14} className="rtl:rotate-180" />
          <span className="hidden sm:inline">{lang === "ar" ? "السابق" : "Previous"}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-9 flex items-center justify-center text-xs text-neutral-400 font-bold"
                >
                  •••
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageClick(pageNum)}
                aria-current={isActive ? "page" : undefined}
                className={`w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-[#c5a059] text-neutral-950 shadow-xs ring-2 ring-[#c5a059]/20"
                    : "text-neutral-600 hover:text-neutral-950 bg-transparent hover:bg-neutral-100 border border-transparent hover:border-neutral-200/60 active:scale-95"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={lang === "ar" ? "الصفحة التالية" : "Next page"}
          className={`h-9 sm:h-9.5 px-3 rounded-xl flex items-center gap-1 text-xs font-semibold transition-all duration-150 cursor-pointer ${
            currentPage === totalPages
              ? "text-neutral-300 bg-transparent cursor-not-allowed pointer-events-none"
              : "text-neutral-700 hover:text-neutral-950 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 active:scale-95 shadow-2xs"
          }`}
        >
          <span className="hidden sm:inline">{lang === "ar" ? "التالي" : "Next"}</span>
          <ChevronRight size={14} className="rtl:rotate-180" />
        </button>
      </nav>
    </div>
  );
};
