"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

export default function Signup() {
  const { signup, navigateTo, addToast } = useApp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hairCategory, setHairCategory] = useState("human-wigs");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      addToast("Please fill out all directory fields to register.", "error");
      return;
    }
    if (!agreeTerms) {
      addToast("Please agree to premium member terms & conditions.", "info");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = signup(fullName, email, phone, password);
      setIsLoading(false);
      if (success) {
        navigateTo("account");
      }
    }, 1000);
  };

  return (
    <div id="signup-view" className="max-w-md mx-auto px-6 py-10 text-left">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Back link */}
        <button
          onClick={() => navigateTo("login")}
          className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-charcoal transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Sign In</span>
        </button>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-brand-teal flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Elite Guest Registration
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal uppercase tracking-tight">
            Register
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Gain premium benefits, exclusive launch previews, bespoke matching
            wig styling, and priority beauty customer courier shipping.
          </p>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <User className="h-4.5 w-4.5" />
              </span>
              <input
                id="signup-fullname-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Charlotte Dubois"
                className="w-full pl-11 pr-4 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-medium placeholder:text-neutral-300"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                id="signup-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="charlotte@du-bois.com"
                className="w-full pl-11 pr-4 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-medium placeholder:text-neutral-300"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Phone className="h-4.5 w-4.5" />
              </span>
              <input
                id="signup-phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 231-9014"
                className="w-full pl-11 pr-4 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Create Secure Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                id="signup-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-charcoal focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Hair Preference dropdown for personalized touch */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Preferred Beauty Collection
            </label>
            <select
              id="signup-preference-select"
              value={hairCategory}
              onChange={(e) => setHairCategory(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-medium cursor-pointer"
            >
              <option value="human-wigs">Premium Human Hair Wigs</option>
              <option value="extensions">
                Keratin Tip Extensions / Bundles
              </option>
              <option value="skincare">
                Cosmetics, Glistening Glow & Serum
              </option>
              <option value="all-beauty">All Beauty Collections</option>
            </select>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2 flex items-start gap-2.5">
            <input
              id="agree-membership-terms-checkbox"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded text-brand-primary focus:ring-brand-primary border-brand-beige h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor="agree-membership-terms-checkbox"
              className="text-[11px] text-neutral-500 select-none leading-relaxed cursor-pointer font-light"
            >
              I agree to the{" "}
              <span
                onClick={() => navigateTo("terms")}
                className="underline hover:text-brand-primary cursor-pointer font-medium text-neutral-600"
              >
                Terms of Elite Membership
              </span>{" "}
              and acknowledge the{" "}
              <span
                onClick={() => navigateTo("privacy")}
                className="underline hover:text-brand-primary cursor-pointer font-medium text-neutral-600"
              >
                Privacy Policy
              </span>
              .
            </label>
          </div>

          {/* Button Submit */}
          <button
            id="signup-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-charcoal text-white hover:bg-neutral-800 disabled:bg-neutral-300 text-xs uppercase font-extrabold tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registering Member Profile...
              </span>
            ) : (
              <>
                Register VIP Account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Already a member */}
        <div className="pt-4 border-t border-brand-beige flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-neutral-500 font-light">
            Already part of the Timeless trends circle?
          </p>
          <button
            onClick={() => navigateTo("login")}
            className="text-xs uppercase font-bold tracking-widest text-brand-teal hover:text-[#015f6b] hover:underline"
          >
            Sign In with Existing Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
