"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { resetPassword, navigateTo, addToast } = useApp();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      addToast("Please input both password fields.", "error");
      return;
    }
    if (password !== confirmPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = resetPassword(password);
      setIsLoading(false);
      if (success) {
        navigateTo("login");
      }
    }, 1000);
  };

  return (
    <div
      id="reset-password-view"
      className="max-w-md mx-auto px-6 py-16 text-left"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Back Link */}
        <button
          onClick={() => navigateTo("login")}
          className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-charcoal transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Login</span>
        </button>

        {/* Header Title */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-brand-primary">
            Security Gate
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal uppercase tracking-tight">
            New Password
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Set a new access key code below to restore complete access to your
            customer order records.
          </p>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              New Access Code
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                id="reset-password-input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-charcoal focus:outline-none"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
              Confirm Access Code
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                id="reset-confirm-input"
                type={showPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                required
              />
            </div>
          </div>

          {/* Submit Reset Button */}
          <button
            id="reset-password-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-charcoal text-white hover:bg-neutral-800 disabled:bg-neutral-300 text-xs uppercase font-extrabold tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Resaving Encrypted Vault Key...
              </span>
            ) : (
              <>
                Unlock Identity Vault <Save className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
