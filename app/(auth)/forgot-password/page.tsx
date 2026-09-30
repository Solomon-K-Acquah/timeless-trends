"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

export default function ForgotPassword() {
  const { forgotPassword, navigateTo } = useApp();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      const success = forgotPassword(email);
      setIsLoading(false);
      if (success) {
        setIsSent(true);
      }
    }, 1000);
  };

  return (
    <div
      id="forgot-password-view"
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
          <span>Back to Sign In</span>
        </button>

        {!isSent ? (
          <>
            {/* Request State */}
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-brand-primary">
                Couture Identity Vault
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal uppercase tracking-tight">
                Recover Access
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Provide your registered email. We will dispatch a encrypted
                signature link allowing credential restoration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mail Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                  Registered Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    id="forgot-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vip@timelesstrends.com"
                    className="w-full pl-11 pr-4 py-3.5 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-medium placeholder:text-neutral-300"
                    required
                  />
                </div>
              </div>

              {/* Submit btn */}
              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-charcoal text-white hover:bg-neutral-800 disabled:bg-neutral-300 text-xs uppercase font-extrabold tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Locating Account Index...
                  </span>
                ) : (
                  <>
                    Request Recovery Connection{" "}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-brand-beige p-8 rounded-2xl bg-brand-cream/10 space-y-6 text-center"
          >
            <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-brand-charcoal uppercase tracking-wide">
                Recovery Transmitted
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                An authentication ticket hash has been successfully sent to{" "}
                <strong className="font-medium text-brand-charcoal font-mono">
                  {email}
                </strong>
                . Check your inbound spam or primary folder directory within a
                few minutes.
              </p>
            </div>

            {/* Sandbox reset bypass link */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo("reset-password")}
                className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest bg-brand-primary text-white py-3 px-5 rounded-lg hover:bg-neutral-800 transition-all"
              >
                Fast-track Reset Password <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
