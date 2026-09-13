"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { Smartphone, Mail, User, ArrowRight, CheckCircle2, Sparkles, KeyRound, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpItemVariants, viewportOnce } from "@/utils/animations";

export default function LoginPage() {
  const router = useRouter();
  const { lang, login, user } = useAppContext();

  const [authType, setAuthType] = useState<"otp" | "register">("otp");
  const [step, setStep] = useState<"input" | "verify">("input");

  // Inputs
  const [phone, setPhone] = useState(user?.phone || "+974 5512 3456");
  const [name, setName] = useState(user?.name || "Mohammed Al-Kuwari");
  const [email, setEmail] = useState(user?.email || "m.alkuwari@domain.qa");
  const [otpCode, setOtpCode] = useState(["4", "3", "2", "1"]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verify");
  };

  const handleCompleteLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSuccess(true);
    login({
      name: name || "Mohammed Al-Kuwari",
      phone: phone || "+974 5512 3456",
      email: email || "customer@thabt.qa",
    });
    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    login({
      name: name || "New Member",
      phone: phone || "+974 5500 1122",
      email: email || "member@thabt.qa",
    });
    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  const handleAutoFill = () => {
    setPhone("+974 5512 3456");
    setName("Mohammed Al-Kuwari");
    setEmail("m.alkuwari@domain.qa");
    setOtpCode(["4", "3", "2", "1"]);
  };

  return (
    <div className={`min-h-screen bg-white text-neutral-900 flex flex-col ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="w-full max-w-md bg-white border border-neutral-200/90 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
        >
          {/* Top Brand & Title */}
          <motion.div variants={fadeUpItemVariants} className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#faf6ed] text-[#c5a059] border border-[#c5a059]/30 mb-1">
              <Lock size={22} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-950">
              {lang === "ar" ? "تسجيل الدخول السريع" : "Fast & Efficient Login"}
            </h1>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              {lang === "ar"
                ? "سجّل دخولك برقم الجوال مباشرة بدون كلمات مرور معقدة"
                : "Sign in with your GCC mobile number in 1 simple step."}
            </p>
          </motion.div>

          {/* Quick Demo Shortcut Banner */}
          <motion.div variants={fadeUpItemVariants} className="p-3 rounded-xl bg-[#faf6ed]/80 border border-[#c5a059]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-neutral-800">
              <Sparkles size={15} className="text-[#c5a059] shrink-0" />
              <span className="text-[11px] font-semibold">
                {lang === "ar" ? "تعبئة تجريبية سريعة:" : "1-Tap Demo Auto-Fill:"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAutoFill}
              className="text-[11px] font-bold text-[#9b7832] bg-white px-3 py-1 rounded-lg border border-[#c5a059]/40 hover:bg-[#faf6ed] transition cursor-pointer shadow-2xs active:scale-95"
            >
              {lang === "ar" ? "⚡ تعبئة نموذج تجريبي" : "⚡ Auto-Fill Demo"}
            </button>
          </motion.div>

          {/* Mode Switcher Tabs */}
          <motion.div variants={fadeUpItemVariants} className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100/80 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthType("otp");
                setStep("input");
              }}
              className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
                authType === "otp"
                  ? "bg-white text-neutral-950 shadow-2xs font-bold"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {lang === "ar" ? "رمز OTP للجوال" : "Mobile OTP"}
            </button>
            <button
              type="button"
              onClick={() => setAuthType("register")}
              className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
                authType === "register"
                  ? "bg-white text-neutral-950 shadow-2xs font-bold"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {lang === "ar" ? "إنشاء حساب جديد" : "Quick Register"}
            </button>
          </motion.div>

          {/* Form Content */}
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-bold text-base text-neutral-950">
                {lang === "ar" ? "تم تسجيل الدخول بنجاح!" : "Login Successful!"}
              </h3>
              <p className="text-xs text-neutral-500">
                {lang === "ar" ? "جارٍ تحويلك إلى صفحة الحساب..." : "Redirecting to your profile dashboard..."}
              </p>
            </div>
          ) : authType === "otp" ? (
            step === "input" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === "ar" ? "رقم الجوال (دول الخليج)" : "GCC Mobile Number"}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+974 5512 3456"
                      className="w-full bg-neutral-50/80 border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-950 hover:bg-[#c5a059] hover:text-neutral-950 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs"
                >
                  <span>{lang === "ar" ? "إرسال رمز التاكيد" : "Send 4-Digit Passcode"}</span>
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleCompleteLogin} className="space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-mono text-neutral-800">
                    <KeyRound size={12} className="text-[#c5a059]" />
                    <span>{phone}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {lang === "ar" ? "أدخل الرمز 4321 للتأكيد الفوري" : "Enter passcode 4321 for instant login"}
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
                      className="w-12 h-12 text-center text-base font-bold font-mono bg-neutral-50 border border-neutral-200 rounded-xl focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5a059] hover:bg-[#b38e46] text-neutral-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs"
                >
                  <CheckCircle2 size={16} />
                  <span>{lang === "ar" ? "تأكيد وتحديد الهوية (4321)" : "Confirm & Sign In (4321)"}</span>
                </button>

                <div className="flex justify-between text-xs text-neutral-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="hover:text-neutral-900 transition cursor-pointer"
                  >
                    {lang === "ar" ? "تغيير رقم الجوال" : "Edit Mobile Number"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="text-[#9b7832] font-semibold hover:underline cursor-pointer"
                  >
                    {lang === "ar" ? "إعادة الإرسال" : "Resend OTP"}
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleQuickRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === "ar" ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "ar" ? "محمد الكواري" : "Mohammed Al-Kuwari"}
                  className="w-full bg-neutral-50/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                />
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
                  className="w-full bg-neutral-50/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
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
                  className="w-full bg-neutral-50/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-950 hover:bg-[#c5a059] hover:text-neutral-950 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs active:scale-[0.98] shadow-xs mt-2"
              >
                <User size={15} />
                <span>{lang === "ar" ? "إنشاء حساب ودخول مباشر" : "Instant Register & Login"}</span>
              </button>
            </form>
          )}

          {/* Security Assurance Footer */}
          <motion.div variants={fadeUpItemVariants} className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck size={14} className="text-[#c5a059]" />
            <span>{lang === "ar" ? "حماية وتشفير عالي الأمان 256-bit SSL" : "256-bit Encrypted GCC Fast Auth"}</span>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
