"use client";

import React, { useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  HelpCircle,
  CalendarCheck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_FAQS } from "@/data";

export default function Contact() {
  const { addToast } = useApp();

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("Inquiry");
  const [formText, setFormText] = useState("");

  // Accordion active FAQ keys list
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formText) {
      addToast("Please fill out all contact fields.", "error");
      return;
    }

    addToast(
      `Thank you ${formName}! Your concierge message has been securely submitted.`,
      "success",
    );
    setFormName("");
    setFormEmail("");
    setFormText("");
  };

  const handleBookConsultation = () => {
    addToast(
      "Virtual styling consultation link generated! Please check your email to book a date.",
      "success",
    );
  };

  return (
    <div
      id="contact-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left"
    >
      {/* Title */}
      <div id="contact-title" className="pb-6 border-b border-brand-beige">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">
          Get In Touch
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Store Concierge
        </h1>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        id="contact-workspace"
      >
        {/* Core contact parameters / Flagship studio info */}
        <div className="lg:col-span-5 space-y-8" id="contact-details-col">
          <div className="bg-brand-cream/15 border border-brand-beige p-6 rounded-2xl text-left space-y-4">
            <h3 className="font-display font-bold text-lg text-brand-charcoal uppercase flex items-center gap-2">
              <Building className="h-5 w-5 text-brand-primary shrink-0" />{" "}
              Flagship HQ Salon
            </h3>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Located directly within the historic fashion district. Pop by for
              professional lace wig mapping, weft matching, and customized
              physical cosmetics shades testing.
            </p>

            <ul className="space-y-4 text-xs text-neutral-600 font-medium">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4.5 w-4.5 text-brand-accent shrink-0 mt-0.5" />
                <span>
                  128 Luxury Boulevard, Suite 500, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                <span className="font-mono">+1 (800) Luxury-Hair</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                <span>concierge@timelesstrends.com</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Clock className="h-4.5 w-4.5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="block font-bold text-brand-charcoal">
                    Monday - Saturday: 9:00 AM - 8:00 PM
                  </span>
                  <span className="block text-neutral-400 mt-1">
                    Sunday: 11:00 AM - 6:00 PM PST
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Virtual Booking CTA */}
          <div className="bg-brand-teal/5 border border-brand-teal/15 p-6 rounded-2xl text-left space-y-3">
            <h4 className="font-display font-bold text-brand-teal uppercase text-sm flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 shrink-0" /> Virtual Hair
              consultations
            </h4>
            <p className="text-xs text-neutral-500 leading-normal font-light">
              Can't make it to San Francisco? Schedule a live Zoom styling
              mapping with our lead creative wig-makers. We match density,
              colors, and textures virtually.
            </p>
            <button
              onClick={handleBookConsultation}
              className="bg-brand-teal text-white text-[11px] uppercase font-extrabold tracking-widest py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors inline-block"
            >
              Book Skype Consultation
            </button>
          </div>
        </div>

        {/* Contact form Column */}
        <div
          className="lg:col-span-7 bg-white border border-brand-beige p-6 rounded-2xl shadow-sm text-left space-y-6"
          id="contact-form-col"
        >
          <h3 className="font-display font-bold text-lg text-brand-charcoal uppercase flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-brand-primary" /> Send secure
            Inquiry
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-normal">
            Your beauty concerns are processed with deep care. Please specify
            your subject header pattern to redirect your note to the appropriate
            salon desk.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Alexis S."
                  className="w-full border border-brand-beige p-3 text-xs bg-neutral-100/50 rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full border border-brand-beige p-3 text-xs bg-neutral-100/50 rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                Inquiry Category Desk
              </label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full border border-brand-beige p-3 text-xs bg-neutral-100/50 rounded-lg focus:outline-none"
              >
                <option value="Wig_Styling">
                  Wig Density / Styling Sizing
                </option>
                <option value="Order_Tracking">
                  Order Invoicing & Shipment Tracking
                </option>
                <option value="Cosmetics_Allergy">
                  Cosmetics formulation ingredients
                </option>
                <option value="Wholesale">
                  Wholesale / Salon Partner Accounts
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                Your Message Body Details *
              </label>
              <textarea
                rows={5}
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Give us as much detail as possible about your hair matching guidelines, or shade codes..."
                className="w-full border border-brand-beige p-3 text-xs bg-neutral-100/50 rounded-lg focus:outline-none focus:border-brand-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-brand-primary text-white text-xs font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-secondary shadow-md transition-all inline-block"
            >
              Submit Message Securely
            </button>
          </form>
        </div>
      </div>

      {/* Embedded FAQ Accordion Block */}
      <section
        className="border-t border-brand-beige pt-10 space-y-8"
        id="contact-faq"
      >
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <HelpCircle className="h-6 w-6 text-brand-primary mx-auto" />
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-charcoal uppercase leading-none mt-1">
            FAQ Helper Desk
          </h2>
          <span className="text-xs text-neutral-400 block leading-normal">
            Common inquiries resolved instantly. Click to examine deep
            disclosures.
          </span>
        </div>

        <div className="max-w-3xl mx-auto space-y-3" id="faq-accordions-row">
          {SAMPLE_FAQS.slice(0, 4).map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                id={`contact-faq-item-${idx}`}
                className="border border-brand-beige rounded-xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-xs sm:text-sm font-bold text-brand-charcoal hover:bg-neutral-50/50 text-left"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-brand-primary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-brand-beige text-xs text-neutral-500 leading-relaxed font-light bg-neutral-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
