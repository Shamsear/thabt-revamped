"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, MOCK_TOP_SELLERS } from "@/data/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SupportedLanguage = "en" | "ar";
export type SupportedCurrency = "QAR" | "SAR" | "AED" | "KWD" | "BHD" | "OMR" | "USD";

export interface CurrencyRate {
  code: SupportedCurrency;
  symbol: string;
  symbol_ar: string;
  rate: number; // relative to QAR (1 QAR = rate in target currency)
  name: string;
}

export const CURRENCY_MAP: Record<SupportedCurrency, CurrencyRate> = {
  QAR: { code: "QAR", symbol: "QAR", symbol_ar: "ر.ق", rate: 1.0, name: "Qatar Riyal" },
  SAR: { code: "SAR", symbol: "SAR", symbol_ar: "ر.س", rate: 1.03, name: "Saudi Riyal" },
  AED: { code: "AED", symbol: "AED", symbol_ar: "د.إ", rate: 1.01, name: "UAE Dirham" },
  KWD: { code: "KWD", symbol: "KWD", symbol_ar: "د.ك", rate: 0.084, name: "Kuwaiti Dinar" },
  BHD: { code: "BHD", symbol: "BHD", symbol_ar: "د.ب", rate: 0.103, name: "Bahraini Dinar" },
  OMR: { code: "OMR", symbol: "OMR", symbol_ar: "ر.ع", rate: 0.106, name: "Omani Rial" },
  USD: { code: "USD", symbol: "$", symbol_ar: "$", rate: 0.275, name: "US Dollar" },
};

interface AppContextType {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalCartCount: number;
  cartSubtotalQar: number;
  formatPrice: (qarAmount: number) => string;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  preOrderProduct: Product | null;
  setPreOrderProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLanguage>("en");
  const [currency, setCurrencyState] = useState<SupportedCurrency>("QAR");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [preOrderProduct, setPreOrderProduct] = useState<Product | null>(null);

  // Initialize with sample top seller to provide instant rich visual state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_TOP_SELLERS[0], quantity: 1 },
  ]);

  // Sync language with document direction
  const setLang = (newLang: SupportedLanguage) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("thabt_lang", newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    }
  };

  const setCurrency = (newCurrency: SupportedCurrency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("thabt_currency", newCurrency);
    }
  };

  // Restore saved preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("thabt_lang") as SupportedLanguage;
      if (savedLang === "en" || savedLang === "ar") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      }

      const savedCurrency = localStorage.getItem("thabt_currency") as SupportedCurrency;
      if (savedCurrency && CURRENCY_MAP[savedCurrency]) {
        setCurrencyState(savedCurrency);
      }

      const savedCart = localStorage.getItem("thabt_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("thabt_cart", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotalQar = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const formatPrice = (qarAmount: number): string => {
    const cur = CURRENCY_MAP[currency] || CURRENCY_MAP.QAR;
    const converted = qarAmount * cur.rate;
    const formatted = converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2);
    return lang === "ar" ? `${formatted} ${cur.symbol_ar}` : `${formatted} ${cur.symbol}`;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalCartCount,
        cartSubtotalQar,
        formatPrice,
        cartDrawerOpen,
        setCartDrawerOpen,
        preOrderProduct,
        setPreOrderProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
