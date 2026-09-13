"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { useAppContext, SupportedLanguage } from "@/context/AppContext";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface FooterProps {
  lang?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ lang: propLang }) => {
  const context = useAppContext();
  const pathname = usePathname();
  const lang = propLang || context.lang;
  const { hasStickyBottomBar, customWhatsAppMessage } = context;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowScrollTop(currentScrollY > 300);

      // Match MobileBottomNav scroll-down threshold so buttons track bottom nav in lockstep
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappHref = `https://api.whatsapp.com/send?phone=97450400314${
    customWhatsAppMessage ? `&text=${encodeURIComponent(customWhatsAppMessage)}` : ""
  }`;

  const isCheckout = pathname === "/checkout";

  // Coordinates with MobileBottomNav safe-area calculation so buttons never go down behind or under the nav bar
  const floatingBottomClass = isCheckout
    ? "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-5"
    : hasStickyBottomBar
    ? isScrolledDown
      ? "bottom-[calc(8.2rem+env(safe-area-inset-bottom))] sm:bottom-20"
      : "bottom-[calc(8.8rem+env(safe-area-inset-bottom))] sm:bottom-20"
    : isScrolledDown
    ? "bottom-[calc(4.8rem+env(safe-area-inset-bottom))] sm:bottom-5"
    : "bottom-[calc(5.4rem+env(safe-area-inset-bottom))] sm:bottom-5";

  return (
    <>
      <footer className="bg-[#0b0d11] text-neutral-400 text-xs pt-16 pb-20 sm:pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
            {/* 1. Brand with White & Gold Logo */}
            <div className="lg:col-span-2 space-y-3">
              <Link href="/">
                <img
                  src="/user/images/logo.png"
                  alt="Thabt"
                  className="h-9 sm:h-10 w-auto object-contain brightness-110 mb-3"
                />
              </Link>
              <p className="text-[11px] leading-relaxed text-neutral-400 max-w-sm">
                {lang === "ar"
                  ? "حلول وقواعد التثبيت الأصلية لمركبات الدفع الرباعي والهواتف في قطر ودول الخليج. هندسة سويدية دقيقة بدون حفر أو إتلاف ديكور السيارة."
                  : "Precision-engineered vehicle mounts and device holders for Qatar and the GCC. Swedish fitment design without drilling or dashboard damage."}
              </p>
              <div className="pt-2 text-[11px] space-y-1.5 text-neutral-300">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#c5a059]" />
                  <a href="mailto:info@thabt.qa" className="hover:text-white transition">info@thabt.qa</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#c5a059]" />
                  <span dir="ltr" className="font-mono text-neutral-300 hover:text-[#c5a059] transition">+974 4483 2731</span>
                </div>
              </div>

              {/* Newsletter Signup (#16) */}
              <NewsletterSignup lang={lang} />
            </div>

            {/* 2. Collections */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-semibold mb-3.5">
                {lang === "ar" ? "التشكيلات" : "Collections"}
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/categories/pro-clips" className="hover:text-white transition">{lang === "ar" ? "قواعد برو كليبس" : "ProClips Mounts"}</Link></li>
                <li><Link href="/categories/device-holders" className="hover:text-white transition">{lang === "ar" ? "حوامل الأجهزة" : "Device Holders"}</Link></li>
                <li><Link href="/mountx" className="hover:text-white text-[#c5a059] transition font-medium">{lang === "ar" ? "ماونت إكس ألمنيوم" : "MountX All-Terrain"}</Link></li>
                <li><Link href="/categories/leather-mount" className="hover:text-white transition">{lang === "ar" ? "حوامل جلدية" : "Leather Mounts"}</Link></li>
                <li><Link href="/categories/motorbike-mount" className="hover:text-white transition">{lang === "ar" ? "حوامل الدراجات" : "Motorbike Mounts"}</Link></li>
                <li><Link href="/categories/antenna-accessories" className="hover:text-white transition">{lang === "ar" ? "الهوائيات والإكسسوارات" : "Antenna & Off-Road"}</Link></li>
              </ul>
            </div>

            {/* 3. Navigation & Tools */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-semibold mb-3.5">
                {lang === "ar" ? "استكشف ثقة" : "Explore"}
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/find" className="hover:text-white transition">{lang === "ar" ? "مطابقة نوع السيارة" : "Vehicle Fitment Matcher"}</Link></li>
                <li><Link href="/search" className="hover:text-white transition">{lang === "ar" ? "كتالوج المنتجات" : "Product Catalog"}</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition">{lang === "ar" ? "معرض التركيبات" : "Customer Builds"}</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">{lang === "ar" ? "الوظائف وبيئة العمل" : "Careers at Thabt"}</Link></li>
                <li><Link href="/faqs" className="hover:text-white transition">{lang === "ar" ? "الأسئلة الشائعة" : "FAQ & Specs"}</Link></li>
                <li><Link href="/contact-us" className="hover:text-white transition">{lang === "ar" ? "معارض الدوحة" : "Doha Showrooms"}</Link></li>
              </ul>
            </div>

            {/* 4. Showrooms & Social */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-semibold mb-3.5">
                {lang === "ar" ? "معارض الدوحة" : "Doha Showrooms"}
              </h4>
              <div className="space-y-3 text-[11px]">
                <div>
                  <p className="text-neutral-200 font-medium">{lang === "ar" ? "فرع الريان القديم" : "Old Rayan Branch"}</p>
                  <p className="text-neutral-500 text-[10px]">Unit 16, Building 419, Street 990, Zone 52</p>
                </div>
                <div>
                  <p className="text-neutral-200 font-medium">{lang === "ar" ? "فرع أم صلال محمد" : "Umm Salal Branch"}</p>
                  <p className="text-neutral-500 text-[10px]">Unit 10, Building 191, Street 750, Zone 71</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <a href="https://www.instagram.com/thabt.qa/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#c5a059] text-[11px] transition">Instagram</a>
                  <span className="text-neutral-700">•</span>
                  <a href="https://www.tiktok.com/@thabt.gcc" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#c5a059] text-[11px] transition">TikTok</a>
                  <span className="text-neutral-700">•</span>
                  <a href="https://www.youtube.com/@Thabt.Digital.Solutions" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#c5a059] text-[11px] transition">YouTube</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} Thabt (Gulf Digital Solution). All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms-and-conditions" className="hover:text-neutral-300 transition">
                {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
              </Link>
              <Link href="/privacy-policy" className="hover:text-neutral-300 transition">
                {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link href="/cookie-policy" className="hover:text-neutral-300 transition">
                {lang === "ar" ? "ملفات تعريف الارتباط" : "Cookie Policy"}
              </Link>
              <Link href="/faqs" className="hover:text-neutral-300 transition">
                {lang === "ar" ? "الضمان والإرجاع" : "Warranty"}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Concierge floating button (z-30, clears mobile floating bottom nav pill) */}
      <div
        className="fixed right-5 rtl:right-auto rtl:left-5 z-30 transition-all duration-300 ease-out bottom-20 sm:bottom-5"
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-11 h-11 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-105 active-press transition-transform cursor-pointer"
          aria-label="WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.1225 14.9458C17.8183 14.7895 16.3033 14.0473 16.0215 13.9469C15.7397 13.8409 15.5332 13.7907 15.3295 14.1032C15.123 14.4129 14.5371 15.102 14.3529 15.3113C14.1744 15.5178 13.993 15.5429 13.6889 15.3894C11.8808 14.4854 10.695 13.7767 9.50361 11.7315C9.18832 11.1874 9.8189 11.2265 10.4076 10.0518C10.5081 9.84534 10.4578 9.66956 10.3797 9.51331C10.3016 9.35706 9.68776 7.84478 9.43106 7.22815C9.18274 6.62826 8.92604 6.71197 8.7391 6.70081C8.56053 6.68965 8.35684 6.68965 8.15037 6.68965C7.9439 6.68965 7.61187 6.76777 7.33006 7.0719C7.04825 7.38161 6.25305 8.12659 6.25305 9.63887C6.25305 11.1511 7.35517 12.616 7.50584 12.8225C7.66209 13.0289 9.67381 16.1316 12.7625 17.4681C14.7157 18.3107 15.4802 18.3833 16.4567 18.2382C17.051 18.1489 18.2759 17.496 18.5298 16.7734C18.7837 16.0535 18.7837 15.4369 18.7084 15.3085C18.6331 15.1718 18.4266 15.0937 18.1225 14.9458Z"
              fill="white"
            />
            <path
              d="M24.0292 7.65625C23.3986 6.15792 22.4946 4.81306 21.3422 3.65792C20.198 2.50948 18.8395 1.5966 17.3439 0.970982C15.8093 0.326451 14.1798 0 12.5002 0H12.4444C10.7535 0.00837054 9.11567 0.343192 7.57549 1.00167C6.09267 1.63371 4.74699 2.54821 3.61344 3.6942C2.47226 4.84654 1.57661 6.18583 0.95719 7.67857C0.315449 9.22433 -0.00821224 10.8677 0.000158294 12.5586C0.00962607 14.4963 0.468048 16.4054 1.33944 18.1362V22.3772C1.33944 22.7176 1.47467 23.0441 1.71537 23.2848C1.95607 23.5255 2.28253 23.6607 2.62293 23.6607H6.86679C8.59752 24.5321 10.5067 24.9905 12.4444 25H12.5029C14.1743 25 15.7954 24.6763 17.3216 24.043C18.8097 23.4248 20.163 22.5226 21.306 21.3867C22.4583 20.2455 23.3651 18.9118 23.9985 17.4247C24.657 15.8845 24.9918 14.2467 25.0002 12.5558C25.0085 10.8566 24.6793 9.20759 24.0292 7.65625ZM19.8132 19.8772C17.8573 21.8136 15.2624 22.8795 12.5002 22.8795H12.4527C10.7702 22.8711 9.09893 22.4526 7.62293 21.6657L7.38855 21.5402H3.45998V17.6116L3.33442 17.3772C2.54759 15.9012 2.12906 14.2299 2.12069 12.5474C2.10953 9.76562 3.17259 7.15402 5.12293 5.18694C7.07047 3.21987 9.67371 2.1317 12.4555 2.12054H12.5029C13.898 2.12054 15.2513 2.39118 16.5264 2.9269C17.7708 3.44866 18.8869 4.19922 19.8467 5.15904C20.8037 6.11607 21.5571 7.23493 22.0788 8.47935C22.6201 9.76841 22.8908 11.1356 22.8852 12.5474C22.8685 15.3265 21.7775 17.9297 19.8132 19.8772Z"
              fill="white"
            />
          </svg>
        </a>
      </div>

      {/* Back to Top / To Up Button (z-30, clears mobile floating bottom nav pill) */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed left-5 rtl:left-auto rtl:right-5 z-30 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-neutral-300 hover:text-white bg-neutral-900/95 hover:bg-neutral-900 border border-neutral-700/80 rounded-full shadow-lg backdrop-blur-xs transition-all duration-300 active-press cursor-pointer bottom-20 sm:bottom-5 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label={lang === "ar" ? "العودة إلى الأعلى" : "Back to top"}
      >
        <ArrowUp size={16} className="text-neutral-300 group-hover:text-white" />
      </button>
    </>
  );
};
