"use client";

import React from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrandTickerSection } from "@/components/BrandTickerSection";
import { TopSellingSection } from "@/components/TopSellingSection";
import { WhyMountSection } from "@/components/WhyMountSection";
import { CategorySection } from "@/components/CategorySection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { AwardSection } from "@/components/AwardSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import {
  MOCK_CATEGORIES,
  MOCK_TOP_SELLERS,
  MOCK_BRANDS,
  MOCK_FAQS,
} from "@/data/mockData";

export default function Home() {
  const {
    lang,
    setLang,
    currency,
    setCurrency,
    addToCart,
    setPreOrderProduct,
    totalCartCount,
    setCartDrawerOpen,
  } = useAppContext();

  return (
    <div className={`min-h-screen bg-white text-neutral-900 ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section & Vehicle Matcher */}
        <HeroSection lang={lang} />

        {/* 2. The Two-Part Architecture: How the Thabt System Works */}
        <WhyMountSection lang={lang} />

        {/* 3. Great Place To Work Qatar 2026 Certification */}
        <AwardSection lang={lang} />

        {/* 4. Product Collections */}
        <CategorySection categories={MOCK_CATEGORIES} lang={lang} />

        {/* 5. Supported Marques Ribbon */}
        <BrandTickerSection brands={MOCK_BRANDS} lang={lang} />

        {/* 6. Selected Hardware Carousel */}
        <TopSellingSection
          products={MOCK_TOP_SELLERS}
          onAddToCart={addToCart}
          onOpenPreOrder={(prod) => setPreOrderProduct(prod)}
          currency={currency}
          lang={lang}
        />

        {/* 7. Video Field Demonstration */}
        <VideoShowcaseSection lang={lang} />

        {/* 8. Specifications & FAQs */}
        <FaqSection faqs={MOCK_FAQS} lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
