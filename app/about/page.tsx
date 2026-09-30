"use client";

import React from "react";
import { Sparkles, Heart, Shield, Globe, Landmark, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

export default function About() {
  const { navigateTo } = useApp();

  const brandValues = [
    {
      icon: <Sparkles className="h-5 w-5 text-brand-primary" />,
      title: "Ethical Sourcing",
      desc: "All raw donor lock structures are gathered with complete consenting, fair-pay transparency from certified global donor networks.",
    },
    {
      icon: <Shield className="h-5 w-5 text-brand-primary" />,
      title: "Trichology Certified",
      desc: "Our hair care oils and cosmetic pigments are curated alongside dermatologists to preserve organic crown skin hydration.",
    },
    {
      icon: <Globe className="h-5 w-5 text-brand-primary" />,
      title: "Global Stylist Hubs",
      desc: "Shipping directly to master boutiques in San Francisco, Paris, Milan, London, Lagos and Tokyo weekly.",
    },
  ];

  const teamMembers = [
    {
      name: "Jean-Pierre Laurent",
      role: "Creative Director (Ex-Vogue Stylist)",
      image:
        "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=300",
      quote:
        "Hair is an organic crown of light. It should melt, drape, and breathe flawlessly.",
    },
    {
      name: "Dr. Elena Rostov",
      role: "Chief Labs Chemist (Skin & Pigmentation Science)",
      image:
        "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=300",
      quote:
        "Our foundations do double duty: they block daily environmental damage while glowing.",
    },
  ];

  return (
    <div id="about-page" className="pb-16 space-y-20">
      {/* 1. HERO BANNER */}
      <section
        id="about-hero"
        className="bg-brand-cream/40 border-b border-brand-beige py-16 text-center relative overflow-hidden"
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">
            Our Legacy & Philosophy
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-charcoal uppercase leading-none">
            Aesthetic. Elegance. <br />
            <span className="text-brand-secondary">Timeless trends.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-xl mx-auto pt-2">
            Pioneering the sweet intersection of raw donor hair craftsmanship
            and therapeutic, high-potency skin aesthetics since 2016.
          </p>
        </div>
      </section>

      {/* 2. THE STORY DETAILS */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        id="about-story-pnl bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual stage */}
          <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/5 border border-brand-beige shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
              alt="Timeless Trends Design Studio"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Copywriting */}
          <div className="space-y-6 text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-teal">
              Draped in Excellence
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-900 uppercase leading-none">
              Crafting Crowns for Royalty
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Timeless Trends Hair & Cosmetics was established with a singular,
              quiet motive: to liberate the hair wig market from plastic
              synthetics and coarse blends. By working strictly with virgin
              donor locks and invisible HD laces, we quickly became the secret
              favorite of editorial fashion designers in San Francisco and
              Paris.
            </p>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Over the years, we expanded our catalog to include Luminous
              Hydra-Glow foundations and peptide skincare line to ensure that
              when your hair drapes perfectly, your skin matches with
              consistent, flawless moisture.
            </p>

            <button
              onClick={() => navigateTo("shop")}
              className="bg-brand-charcoal text-white text-xs font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Shop Our Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES PILLARS */}
      <section
        className="bg-neutral-50 py-16 border-y border-brand-beige"
        id="about-values"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              Our Pillars
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-900 uppercase">
              Values We Standardize
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {brandValues.map((val, i) => (
              <div
                key={i}
                className="bg-white border border-brand-beige p-6 rounded-2xl shadow-xs space-y-3"
              >
                <div className="w-10 h-10 bg-brand-cream border border-brand-primary/10 rounded-full flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="font-display font-bold text-sm text-brand-charcoal uppercase tracking-wide">
                  {val.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHRONOLOGY TIMELINE */}
      <section className="max-w-5xl mx-auto px-4" id="about-timeline">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
            Chronicle
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase block">
            Our Timeline Milestones
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-brand-beige">
          {[
            {
              year: "2016",
              title: "The Blueprint Foundation",
              desc: "Launched a tiny private suite in San Francisco, shipping raw donor wefts directly to independent wig-makers locally.",
            },
            {
              year: "2019",
              title: "Proprietary HD Lace Launch",
              desc: "Pioneered and patented our ultra-thin micro-mesh HD lace, establishing bulk supplies to national hair extension salons.",
            },
            {
              year: "2023",
              title: "Cosmetics Fusion",
              desc: "Introduced our Velvet Matte lipsticks and Hydra-Glow foundations containing active skin health hydration serums.",
            },
            {
              year: "2026",
              title: "Global Inbound Portal",
              desc: "Launched our modern Vercel + shadcn portal and dispatched local shipping fulfillment centers across continents.",
            },
          ].map((mile, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex flex-col sm:flex-row items-start ${isLeft ? "sm:flex-row-reverse" : ""} relative gap-8`}
              >
                {/* Node icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-white shadow-md z-10" />

                {/* Content block */}
                <div className="sm:w-1/2 pl-12 sm:pl-0 sm:px-8 text-left">
                  <div className="bg-brand-cream/20 border border-brand-beige p-5 rounded-2xl relative">
                    <span className="font-mono text-xs font-black text-brand-primary block">
                      {mile.year}
                    </span>
                    <h4 className="font-display font-bold text-sm text-brand-charcoal uppercase mt-1">
                      {mile.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-light mt-2 leading-relaxed">
                      {mile.desc}
                    </p>
                  </div>
                </div>

                {/* Empty buffer for desktop balance */}
                <div className="sm:w-1/2 hidden sm:block" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TEAM SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 space-y-10" id="about-team">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Elite Curators
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase">
            Executive Stylists & Chemists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="border border-brand-beige p-6 rounded-2xl bg-white flex flex-col md:flex-row gap-6 items-center text-left shadow-xs"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-brand-beige shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-brand-charcoal">
                  {member.name}
                </h4>
                <span className="text-xs text-brand-primary font-bold uppercase tracking-wider block">
                  {member.role}
                </span>
                <p className="text-xs text-neutral-500 font-light italic leading-relaxed">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
