"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";
import { span } from "motion/react-client";

export default function Login() {
  const { login, navigateTo, addToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please input both email and password.", "error");
      return;
    }

    setIsLoading(true);
    // Simulate luxury API handshake
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigateTo("account");
      }
    }, 900);
  };

  const handleDemoLogin = (role: "client" | "stylist") => {
    setIsLoading(true);
    setTimeout(() => {
      const defaultEmail =
        role === "stylist"
          ? "stylist@timelesstrends.com"
          : "kofifrankie@gmail.com";
      login(defaultEmail, "securepassword123");
      setIsLoading(false);
      navigateTo("account");
    }, 600);
  };

  return (
    <div id="login-view" className="max-w-md mx-auto px-6 py-12 text-left">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Back navigation */}
        <button
          onClick={() => navigateTo("home")}
          className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-charcoal transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </button>

        {/* Text header block */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-brand-primary">
            Elite Access Portal
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal uppercase tracking-tight">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Log in to manage your luxury wig shipments, view order tracker
            details, and save items to your wishlist directory.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Registered Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                id="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="style@timelesstrends.com"
                className="w-full pl-11 pr-4 py-3.5 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-medium placeholder:text-neutral-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                Access Password
              </label>
              <button
                type="button"
                onClick={() => navigateTo("forgot-password")}
                className="text-[10px] font-bold text-neutral-400 hover:text-brand-primary underline uppercase tracking-wider"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                id="login-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3.5 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-charcoal focus:outline-none"
                aria-label="Toggle password text"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit action */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-charcoal text-white hover:bg-neutral-800 disabled:bg-neutral-300 text-xs uppercase font-extrabold tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Handshaking Database...
              </span>
            ) : (
              <>
                Unlock Couture Account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Redirect signups */}
        <div className="pt-4 border-t border-brand-beige flex flex-col items-center gap-2.5 text-center">
          <p className="text-xs text-neutral-500 font-light">
            New to the Timeless Trends elite circle?
          </p>
          <button
            onClick={() => navigateTo("signup")}
            className="text-xs uppercase font-bold tracking-widest text-brand-teal hover:text-[#015f6b] hover:underline"
          >
            Create New Account Profile
          </button>
        </div>

        {/* Luxury Sandbox helper pills */}
        <div className="bg-brand-cream/20 border border-brand-beige p-5 rounded-2xl space-y-3.5 text-xs mt-6">
          <div className="flex items-center gap-1.5 text-brand-primary">
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Luxury Fast-Track Experience
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
            Fast-track your experience by logging with pre-configured developer
            demo credentials:
          </p>
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => handleDemoLogin("client")}
              className="py-2 px-3 text-left border border-brand-beige rounded-lg hover:bg-brand-cream/40 bg-white transition-colors"
            >
              <strong className="block text-[10px] text-brand-charcoal font-bold uppercase">
                Standard Client
              </strong>
              <span className="text-[9px] text-neutral-400 font-mono">
                kofifrankie@gmail.com
              </span>
            </button>
            <button
              onClick={() => handleDemoLogin("stylist")}
              className="py-2 px-3 text-left border border-brand-beige rounded-lg hover:bg-brand-cream/40 bg-white transition-colors"
            >
              <strong className="block text-[10px] text-brand-teal font-bold uppercase">
                Elite Hair Stylist
              </strong>
              <span className="text-[9px] text-neutral-400 font-mono">
                stylist@timelesstrends.com
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
