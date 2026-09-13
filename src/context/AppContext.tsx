"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, MOCK_TOP_SELLERS } from "@/data/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SupportedLanguage = "en" | "ar";
export type SupportedCurrency = "QAR" | "SAR" | "AED" | "KWD" | "BHD" | "OMR" | "USD";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
  city?: string;
  country?: string;
}

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

export interface ToastMessage {
  id: string;
  title: string;
  title_ar?: string;
  message?: string;
  image?: string;
  type?: "success" | "info" | "warning";
}

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
  hasStickyBottomBar: boolean;
  setHasStickyBottomBar: (visible: boolean) => void;
  customWhatsAppMessage: string | null;
  setCustomWhatsAppMessage: (msg: string | null) => void;
  user: UserProfile | null;
  login: (userData: { name: string; phone: string; email: string; city?: string; country?: string }) => void;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
  toast: ToastMessage | null;
  showToast: (toastData: Omit<ToastMessage, "id">) => void;
  hideToast: () => void;
  recentlyViewed: string[];
  trackProductView: (slug: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLanguage>("en");
  const [currency, setCurrencyState] = useState<SupportedCurrency>("QAR");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [preOrderProduct, setPreOrderProduct] = useState<Product | null>(null);
  const [hasStickyBottomBar, setHasStickyBottomBar] = useState(false);
  const [customWhatsAppMessage, setCustomWhatsAppMessage] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const showToast = (toastData: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ ...toastData, id });
  };

  const hideToast = () => {
    setToast(null);
  };

  // #14 Recently Viewed — track product slug
  const trackProductView = (slug: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, 6);
      try {
        localStorage.setItem("thabt_recently_viewed", JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  };

  // User auth state with demo default state (Mohammed Al-Kuwari)
  const [user, setUser] = useState<UserProfile | null>(null);

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

      const savedUser = localStorage.getItem("thabt_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default initialized demo user profile
        setUser({
          name: "Mohammed Al-Kuwari",
          phone: "+974 5512 3456",
          email: "m.alkuwari@domain.qa",
          isLoggedIn: true,
          city: "Doha",
          country: "Qatar",
        });
      }

      const savedCart = localStorage.getItem("thabt_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed
            .filter((item) => item && item.product && typeof item.product.id === "string")
            .map((item) => ({
              ...item,
              quantity: Math.max(1, Number(item.quantity) || 1),
              product: {
                ...item.product,
                price: Number(item.product.price) || 0,
              },
            }));
          if (valid.length > 0) {
            setCartItems(valid);
          }
        }
      }

      // Restore recently viewed products (#14)
      const savedRecent = localStorage.getItem("thabt_recently_viewed");
      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);
        if (Array.isArray(parsed)) {
          setRecentlyViewed(parsed.slice(0, 6));
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
    showToast({
      title: product.name,
      title_ar: product.name_ar,
      message: `Added to cart (${quantity})`,
      image: product.image,
      type: "success",
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

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (Number(item?.quantity) || 1),
    0
  );

  const cartSubtotalQar = cartItems.reduce(
    (acc, item) => acc + (Number(item?.product?.price) || 0) * (Number(item?.quantity) || 1),
    0
  );

  const formatPrice = (qarAmount: number): string => {
    const cur = CURRENCY_MAP[currency] || CURRENCY_MAP.QAR;
    const safeAmount = Number.isFinite(qarAmount) ? qarAmount : 0;
    const converted = safeAmount * (cur?.rate || 1);
    const formatted = converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2);
    return lang === "ar" ? `${formatted} ${cur?.symbol_ar || "ر.ق"}` : `${formatted} ${cur?.symbol || "QAR"}`;
  };

  const login = (userData: { name: string; phone: string; email: string; city?: string; country?: string }) => {
    const updatedUser: UserProfile = {
      ...userData,
      isLoggedIn: true,
      city: userData.city || "Doha",
      country: userData.country || "Qatar",
    };
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("thabt_user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    const loggedOutUser: UserProfile = {
      name: "",
      phone: "",
      email: "",
      isLoggedIn: false,
    };
    setUser(loggedOutUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("thabt_user", JSON.stringify(loggedOutUser));
    }
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
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
        hasStickyBottomBar,
        setHasStickyBottomBar,
        customWhatsAppMessage,
        setCustomWhatsAppMessage,
        user,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        openAuthModal,
        toast,
        showToast,
        hideToast,
        recentlyViewed,
        trackProductView,
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
