"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Mail, User, ArrowRight, CheckCircle2, Sparkles, KeyRound } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useFocusTrap } from "@/utils/useFocusTrap";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "ar";
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const { login } = useAppContext();
  const focusTrapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [mode, setMode] = useState<"otp" | "register">("otp");
  const [step, setStep] = useState<"phone" | "verify">("phone");

  // Form State
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 400);
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      login({
        name: name || (phone.includes("5512") ? "Mohammed Al-Kuwari" : "GCC Customer"),
        phone: phone || "+974 5512 3456",
        email: email || "customer@thabt.qa",
      });
      setTimeout(() => {
        setSuccess(false);
        setStep("phone");
        onClose();
      }, 1200);
    }, 500);
  };

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      login({
        name: name || "New Thabt Member",
        phone: phone || "+974 5500 1122",
        email: email || "member@thabt.qa",
      });
      setTimeout(() => {
        setSuccess(false);
        setStep("phone");
        onClose();
      }, 1200);
    }, 500);
  };

  // Instant Auto Fill Demo Shortcut
  const handleAutoFillDemo = () => {
    setPhone("+974 5512 3456");
    setName("Mohammed Al-Kuwari");
    setEmail("m.alkuwari@domain.qa");
    setOtpCode(["4", "3", "2", "1"]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={focusTrapRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-neutral-100 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-neutral-400 hover:text-neutral-950 p-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-[#faf6ed] text-[#c5a059] border border-[#c5a059]/30 flex items-center justify-center">
                <Smartphone size={17} />
              </span>
              <h3 className="font-bold text-lg text-neutral-950">
                {lang === "ar"
                  ? mode === "otp" ? "تسجيل دخول سريع" : "إنشاء حساب جديد"
                  : mode === "otp" ? "Fast 1-Step Login" : "Quick Registration"}
              </h3>
            </div>

            <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
              {lang === "ar"
                ? "ادخل رقم الجوال للتسجيل الفوري بدون كلمة سر معقدة."
                : "Enter your mobile number for instant passcode-free login."}
            </p>

            {/* Demo Auto-Fill Banner */}
            <div className="mb-5 p-3 rounded-xl bg-[#faf6ed]/70 border border-[#c5a059]/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Sparkles size={14} className="text-[#c5a059] shrink-0" />
                <span className="text-[11px] font-medium">
                  {lang === "ar" ? "تجربة فورية بنقرة واحدة:" : "Instant 1-Click Demo:"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="text-[11px] font-bold text-[#9b7832] bg-white px-2.5 py-1 rounded-lg border border-[#c5a059]/40 hover:bg-[#faf6ed] transition cursor-pointer shadow-2xs"
              >
                {lang === "ar" ? "⚡ تعبئة نموذج تجريبي" : "⚡ Auto-Fill Demo"}
              </button>
            </div>

            {/* Success State */}
            {success ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-sm text-neutral-950">
                  {lang === "ar" ? "تم تسجيل الدخول بنجاح!" : "Welcome back! Login Successful."}
                </h4>
                <p className="text-xs text-neutral-500">
                  {lang === "ar" ? "جارٍ تحويلك لمتابعة التسوق..." : "Redirecting back to your shopping session..."}
                </p>
              </div>
            ) : mode === "otp" ? (
              /* Phone / OTP 1-Step Workflow */
              step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      {lang === "ar" ? "رقم الجوال (دول الخليج)" : "Mobile Number (GCC)"}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+974 5512 3456"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neutral-950 hover:bg-[#c5a059] hover:text-neutral-950 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs"
                  >
                    <span>{lang === "ar" ? "إرسال رمز التحقق" : "Send Verification Code"}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </button>

                  <div className="pt-2 text-center border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="text-xs text-neutral-600 hover:text-[#c5a059] font-medium transition cursor-pointer"
                    >
                      {lang === "ar" ? "ليس لديك حساب؟ سجّل بالاسم والإيميل" : "New customer? Quick Register with Name & Email"}
                    </button>
                  </div>
                </form>
              ) : (
                /* Verification Step */
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-mono text-neutral-800">
                      <KeyRound size={12} className="text-[#c5a059]" />
                      <span>{phone || "+974 5512 3456"}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {lang === "ar" ? "أدخل رمز التاكيد المكون من 4 أرقام" : "Enter the 4-digit verification code"}
                    </p>
                  </div>

                  <div className="flex justify-center gap-2.5 dir-ltr" dir="ltr">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={otpCode[idx] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const next = [...otpCode];
                          next[idx] = val;
                          setOtpCode(next);
                        }}
                        className="w-11 h-12 text-center text-base font-bold font-mono bg-neutral-50 border border-neutral-200 rounded-xl focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 focus:bg-white outline-none transition"
                      />
                    ))}
                  </div>

                  {/* 1-Click Instant Verify Demo Button */}
                  <button
                    type="button"
                    onClick={() => handleVerifyOtp()}
                    className="w-full bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs"
                  >
                    <CheckCircle2 size={15} />
                    <span>{lang === "ar" ? "تأكيد الدخول المباشر (4321)" : "Confirm 1-Tap Login (4321)"}</span>
                  </button>

                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="hover:text-neutral-900 transition cursor-pointer"
                    >
                      {lang === "ar" ? "تغيير الرقم" : "Change Number"}
                    </button>
                    <button
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="text-[#9b7832] font-semibold hover:underline cursor-pointer"
                    >
                      {lang === "ar" ? "إعادة إرسال الرمز" : "Resend Code"}
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* Quick Registration Form */
              <form onSubmit={handleQuickRegister} className="space-y-3.5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {lang === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "ar" ? "محمد الكواري" : "Mohammed Al-Kuwari"}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {lang === "ar" ? "رقم الجوال" : "Mobile Phone"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 5512 3456"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.qa"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-950 hover:bg-[#c5a059] hover:text-neutral-950 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs mt-2"
                >
                  <User size={15} />
                  <span>{lang === "ar" ? "إنشاء الحساب ودخول" : "Complete Registration & Login"}</span>
                </button>

                <div className="pt-2 text-center border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("otp");
                      setStep("phone");
                    }}
                    className="text-xs text-neutral-600 hover:text-[#c5a059] font-medium transition cursor-pointer"
                  >
                    {lang === "ar" ? "لديك حساب بالفعل؟ تسجيل الدخول برقم الجوال" : "Already registered? Login with Phone OTP"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
