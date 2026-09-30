"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

export function Footer() {
  const { navigateTo, addToast, setActiveCategoryFilter } = useApp();
  const [emailInput, setEmailInput] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      addToast(
        "Successfully subscribed! Check your inbox for 20% code: TIMELESS20",
        "success",
      );
      setEmailInput("");
    } else {
      addToast("Please enter a valid email address.", "error");
    }
  };

  const handleShopColNav = (cat: string) => {
    setActiveCategoryFilter(cat);
    navigateTo("shop");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="global-footer"
      className="bg-brand-charcoal text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden"
    >
      {/* Decorative luxury absolute circle */}
      <div
        id="footer-bg-glow"
        className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        id="footer-bg-glow-left"
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Value Pillars */}
        <div
          id="footer-pillars"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 mb-12"
        >
          <div className="flex gap-4 items-center" id="pillar-quality">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-brand-accent">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Premium Graded Virgin Hair
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                100% Remy human donor hair, bleach-ready and style-flexible.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center" id="pillar-shipping">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-brand-accent">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Toll-Free Express Delivery
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Complimentary expedited courier packaging for orders above $150.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center" id="pillar-guarantee">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-brand-accent">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Secure Returns System
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Hygienically verified, 14-day replacement return window policy.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-column Grid Section */}
        <div
          id="footer-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10"
        >
          {/* Brand & Newsletter Block */}
          <div className="space-y-6" id="footer-brand-col">
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-lg tracking-tight text-white uppercase">
                TIMELESS TRENDS
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold">
                Hair & Cosmetics
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Crafting world-class, premium elegance for hair stylists and
              cosmetics connoisseurs globally. Your supreme beauty standard
              starts here.
            </p>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#fafafa]">
                Newsletter VIP Club
              </h5>
              <p className="text-[11px] text-neutral-400">
                Subscribe for early collection releases & a 20% offline token.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-l-lg text-xs py-3 px-4 w-full text-white placeholder-neutral-500 focus:outline-none focus:border-brand-accent transition-all pr-12"
                />
                <button
                  type="submit"
                  className="bg-brand-primary p-3 rounded-r-lg hover:bg-brand-secondary text-white transition-all absolute right-0 top-0 bottom-0 px-4"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Shop Categories Quicklinks */}
          <div className="space-y-4" id="footer-shop-col">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Shop Collections
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => handleShopColNav("Human Hair Wigs")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Premium Wigs & HD Lace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopColNav("Hair Extensions")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Weft & Tape-In Extensions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopColNav("Hair Care")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  White Caviar & Oils Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopColNav("Cosmetics")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Velvet Matte Lipsticks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopColNav("Makeup")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Serum Glow Foundations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopColNav("Beauty Accessories")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  handcrafted Brushes & Electronics
                </button>
              </li>
            </ul>
          </div>

          {/* Help Center Lines */}
          <div className="space-y-4" id="footer-help-col">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigateTo("account")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Track Past Shipment Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("faq")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Returns & Refunds Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("contact")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Book Virtual Hair Consultations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("faq")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Stylist Salon Discount application
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("contact")}
                  className="hover:text-white transition-colors py-0.5 text-left block"
                >
                  Wholesale & Brand Ambassadorship
                </button>
              </li>
            </ul>
          </div>

          {/* Company Contacts and Hours */}
          <div className="space-y-4" id="footer-[#ed6c4f]-location-col">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Flagship Boutique
            </h5>
            <ul className="space-y-3.5 text-xs text-neutral-400 font-light">
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                <span>
                  128 Luxury Boulevard, Suite 500, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-brand-accent shrink-0" />
                <span className="font-mono">+1 (800) Luxury-Hair</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-brand-accent shrink-0" />
                <span>concierge@timelesstrends.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <Clock className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-300">
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </span>
                  <span className="block text-neutral-500 font-medium">
                    Sunday: 11:00 AM - 6:00 PM PST
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div
          id="footer-bottom"
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400"
        >
          <p id="copyright-text">
            © {currentYear} Timeless Trends Hair & Cosmetics. Designed with
            sheer premium Vercel and shadcn/ui aesthetic guidelines. All Rights
            Reserved.
          </p>

          <div
            id="legal-links"
            className="font-medium flex flex-wrap gap-x-6 gap-y-2"
          >
            <button
              onClick={() => navigateTo("terms")}
              className="hover:text-brand-accent transition-colors block"
            >
              Terms of Salon Service
            </button>
            <button
              onClick={() => navigateTo("privacy")}
              className="hover:text-brand-accent transition-colors block"
            >
              Privacy Shield Policies
            </button>
            <button
              onClick={() => navigateTo("faq")}
              className="hover:text-brand-accent transition-colors block"
            >
              Shipping & VAT Fees
            </button>
          </div>

          {/* Social Platforms links */}
          <div id="footer-socials" className="flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"
              aria-label="Visit us on Instagram"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"
              aria-label="Visit us on Facebook"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"
              aria-label="Visit us on Twitter"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"
              aria-label="Visit us on YouTube"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
