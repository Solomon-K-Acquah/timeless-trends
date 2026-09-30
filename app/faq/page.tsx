"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessagesSquare,
} from "lucide-react";
import { SAMPLE_FAQS } from "@/data";

export default function Faq() {
  const [expandedFaqKey, setExpandedFaqKey] = useState<number | null>(0);

  return (
    <div
      id="faq-page-view"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left"
    >
      {/* Header */}
      <div id="faq-page-header" className="pb-6 border-b border-brand-beige">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">
          Frequently Asked Questions
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Support Center FAQ
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-light">
          Get near-instant answers about lace melting thresholds, shipping
          parcel routes, and wholesale stylist accounts.
        </p>
      </div>

      {/* Accordion List mapping */}
      <div className="space-y-4" id="faq-accordions-matrix">
        {SAMPLE_FAQS.map((faq, idx) => {
          const isExpanded = expandedFaqKey === idx;
          return (
            <div
              key={idx}
              id={`faq-item-card-${idx}`}
              className="border border-brand-beige rounded-xl overflow-hidden bg-white hover:border-neutral-400 transition-colors"
            >
              <button
                type="button"
                onClick={() => setExpandedFaqKey(isExpanded ? null : idx)}
                className="w-full p-5 flex justify-between items-center text-xs sm:text-base font-bold text-brand-charcoal hover:bg-neutral-50/50 text-left"
              >
                <span className="flex items-start gap-2">
                  <HelpCircle className="h-4.5 w-4.5 text-brand-accent mt-0.5 shrink-0" />
                  <span>{faq.question}</span>
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-brand-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-neutral-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-5 pt-1 border-t border-brand-beige text-xs sm:text-sm text-neutral-500 leading-relaxed font-light bg-neutral-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Under guidance card details */}
      <div
        className="bg-brand-cream/15 border border-brand-beige p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6"
        id="faq-support-panel"
      >
        <div className="space-y-1.5 text-left">
          <h4 className="font-display font-bold text-brand-charcoal uppercase text-sm flex items-center gap-1.5">
            <MessagesSquare className="h-4.5 w-4.5 text-brand-primary" /> STILL
            HAVE UNRESOLVED INQUIRIES?
          </h4>
          <p className="text-xs text-neutral-500 font-light">
            Our luxury styling concierge is available 24/7 for tailored mapping
            of hair wigs densities.
          </p>
        </div>
        <button
          onClick={() =>
            (window.location.href = "mailto:concierge@timelesstrends.com")
          }
          className="bg-brand-charcoal text-white text-[11px] uppercase tracking-widest font-extrabold py-3.5 px-6 rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
        >
          Email Concierge Desk
        </button>
      </div>
    </div>
  );
}
