"use client";

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function Terms() {
  return (
    <div id="terms-view" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-left">
      
      {/* Title */}
      <div id="terms-header" className="pb-6 border-b border-brand-beige">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">Corporate Policy</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-400 mt-2 font-mono">Last updated: June 13, 2026</p>
      </div>

      {/* Terms sections */}
      <div className="space-y-6 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed font-sans" id="terms-content">
        
        <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-beige flex gap-3 items-start mb-6">
          <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
          <p className="text-[11px] text-neutral-500 leading-normal">
            <strong>CRITICAL RAW HAIR DISCLOSURE:</strong> Because our virgin human extensions and lace front wigs are derived from organic sources without heavy chemical washing, slight tonal, texturing, or density variations are expected. Every weave remains entirely distinct.
          </p>
        </div>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">1. Procurement Agreement & Acceptance</h3>
          <p>
            By accessing or shopping on the Timeless Trends Hair & Cosmetics web application ("the Site"), you agree to be bound by these Terms of Service. If you do not accept these criteria without modification, you are strictly forbidden from placing orders on our salon's catalog.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-secondary uppercase">2. Customized Styling & Wig Returns</h3>
          <p>
            For hygienic safety standards, all Sales of custom-trimmed HD lace wigs, pre-plucked frontals, or client-dyed donor wefts are **strictly final**. We cannot authorize refunds once the safety lace trim has been cut. Please verify weft density, length (18"-26"), and lace match prior to alterations.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">3. Cosmetics Formulation Integrity</h3>
          <p>
            All Timeless Trends cosmetics, Velvet lip liners, and Hydra-Glow foundations are dermatologically assessed. However, users are requested to inspect the published Active Ingredients list on the item pages to prevent trace allergen contact. We are not liable for individual skin reaction anomalies.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">4. Delivery, Loss Risks & Tracked Shipments</h3>
          <p>
            All physical parcels are dispatched via trackable signature services (UPS, FedEx) to verify secure delivery. Risk of loss passes onto the customer once the courier verifies destination handover.
          </p>
        </section>

      </div>

    </div>
  );
}