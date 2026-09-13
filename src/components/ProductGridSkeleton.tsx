"use client";

import React from "react";

/**
 * #8: Skeleton loader grid for product cards.
 * Shows shimmer placeholders while content is loading.
 */
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14 mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card p-2 animate-pulse">
          <div className="skeleton-image bg-neutral-200/60 rounded-xl aspect-square mb-3" />
          <div className="skeleton-text bg-neutral-200/60 rounded h-2.5 w-3/5 mb-2" />
          <div className="skeleton-text bg-neutral-200/60 rounded h-3 w-4/5 mb-2" />
          <div className="skeleton-text-sm bg-neutral-200/60 rounded h-2 w-2/5" />
        </div>
      ))}
    </div>
  );
};
