"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WhyMountSection } from "@/components/WhyMountSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { BrandTickerSection } from "@/components/BrandTickerSection";
import { MiddleBannerSection } from "@/components/MiddleBannerSection";
import { TopSellingSection } from "@/components/TopSellingSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { PreOrderModal } from "@/components/PreOrderModal";
import {
  MOCK_CATEGORIES,
  MOCK_TOP_SELLERS,
  MOCK_BRANDS,
  MOCK_REVIEWS,
  MOCK_FAQS,
  Product,
} from "@/data/mockData";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [currency, setCurrency] = useState("QAR");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [preOrderProduct, setPreOrderProduct] = useState<Product | null>(null);

  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
    { product: MOCK_TOP_SELLERS[0], quantity: 1 },
  ]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
        {/* 1. Hero Section */}
        <HeroSection lang={lang} />

        {/* 2. Why Quality Mounts are Essential */}
        <WhyMountSection lang={lang} />

        {/* 3. Product Categories */}
        <CategorySection categories={MOCK_CATEGORIES} lang={lang} />

        {/* 4. What Thabt Mounts Bring To You (Features) */}
        <FeaturesSection lang={lang} />

        {/* 5. Brand Logos Marquee Ticker */}
        <BrandTickerSection brands={MOCK_BRANDS} lang={lang} />

        {/* 6. Middle Page Banner */}
        <MiddleBannerSection />

        {/* 7. Top Selling Products Carousel */}
        <TopSellingSection
          products={MOCK_TOP_SELLERS}
          onAddToCart={handleAddToCart}
          onOpenPreOrder={(prod) => setPreOrderProduct(prod)}
          currency={currency}
          lang={lang}
        />

        {/* 8. Video Showcase */}
        <VideoShowcaseSection lang={lang} />

        {/* 9. Customer Reviews Testimonials */}
        <TestimonialsSection reviews={MOCK_REVIEWS} lang={lang} />

        {/* 10. FAQs Accordion */}
        <FaqSection faqs={MOCK_FAQS} lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQty={handleUpdateCartQty}
        currency={currency}
        lang={lang}
      />

      {/* Pre Order Request Modal */}
      <PreOrderModal
        product={preOrderProduct}
        onClose={() => setPreOrderProduct(null)}
        lang={lang}
      />
    </div>
  );
}
