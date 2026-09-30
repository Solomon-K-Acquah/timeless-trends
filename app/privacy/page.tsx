"use client";

import { ShieldCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div
      id="privacy-page"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-left font-sans"
    >
      {/* Title */}
      <div id="privacy-header" className="pb-6 border-b border-brand-primary">
        <span className="text-[10px] uppercase tracking-widest text-brand-secondary font-black">
          Data Shield Protection
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-400 mt-2 font-mono">
          Last updated: June 13, 2026
        </p>
      </div>

      {/* Policy block content */}
      <div
        className="space-y-6 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed"
        id="privacy-markdown"
      >
        <div className="bg-brand-teal/5 border border-brand-teal/15 p-4 rounded-xl flex gap-3 items-start mb-6">
          <ShieldCheck className="h-5 w-5 text-brand-teal shrink-0 mt-0.5" />
          <p className="text-[11px] text-brand-teal font-medium leading-normal">
            <strong>256-BIT SSL ENCRYPTION GUARANTEE:</strong> We never store
            credit cards, bank wire logs, or mobile wallets data on our
            services. All checkout transactions flow securely through
            DCI-compliant gateways.
          </p>
        </div>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">
            1. Information Accumalation Details
          </h3>
          <p>
            When utilizing our Site or ordering cosmetics presets, we capture
            only essential delivery payloads: your Consignee name, Email
            destination address, telephone numbers, and Billing postal routes.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-secondary uppercase">
            2. Use of Captured Elements
          </h3>
          <p>
            Your email is utilized exclusively to transmit package tracking
            links, invoices, and premium coupon tokens (e.g.{" "}
            <strong>TIMELESS20</strong>). We do not rent, lease, or lease your
            profile database lists to external advertisement networks.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">
            3. Cookies & Cache Tracking
          </h3>
          <p>
            Our web application uses client-side localStorage caching to
            maintain your Wishlist, active Shopping Bag counts, and
            authenticated Platinum club profiles across browsing tabs. No
            third-party privacy tracking cookies are executed.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-charcoal uppercase">
            4. Compliance and Legal Disclosures
          </h3>
          <p>
            We adhere strictly to California Consumer Privacy standards (CCPA)
            and EU GDPR frameworks. If you wish to delete your Platinum club
            profile logs entirely from our cache registry, please submit a
            deletion request to privacy@timelesstrends.com.
          </p>
        </section>
      </div>
    </div>
  );
}
