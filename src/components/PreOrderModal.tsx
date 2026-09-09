"use client";

import React, { useState } from "react";
import { Product } from "@/data/mockData";
import { X, Send, Clock } from "lucide-react";

interface PreOrderModalProps {
  product: Product | null;
  onClose: () => void;
  lang: "en" | "ar";
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ product, onClose, lang }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 text-amber-500 mb-2">
          <Clock size={24} />
          <h3 className="font-extrabold text-xl text-neutral-900">{lang === "ar" ? "طلب مسبق للمنتج" : "Pre-Order Request"}</h3>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          {lang === "ar"
            ? "المنتج غير متوفر حالياً بالمخزون. سجل بياناتك وسنتواصل معك فور توفره."
            : "This item is currently out of stock. Leave your contact info and we'll notify you upon restock."}
        </p>

        {/* Selected Product Card Summary */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200/80 mb-6">
          <img src={product.image} alt={product.name} className="w-14 h-14 object-contain bg-white rounded-xl p-1" />
          <div>
            <h4 className="font-bold text-xs text-neutral-900">{lang === "ar" ? product.name_ar : product.name}</h4>
            <p className="text-xs text-amber-600 font-bold mt-0.5">Item #: {product.product_id}</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center text-sm font-bold border border-emerald-200">
            {lang === "ar" ? "تم تسجيل طلبك المسبق بنجاح!" : "Pre-order request submitted successfully!"}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{lang === "ar" ? "الاسم الكامل" : "Full Name"}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "ar" ? "أدخل اسمك..." : "Enter your name..."}
                className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{lang === "ar" ? "رقم الهاتف / الجوال" : "Phone / Mobile Number"}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+974 ..."
                className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{lang === "ar" ? "البريد الإلكتروني" : "Email Address"}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition shadow-lg text-sm mt-4"
            >
              <Send size={16} />
              <span>{lang === "ar" ? "إرسال طلب التوفر" : "Submit Pre-Order Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
