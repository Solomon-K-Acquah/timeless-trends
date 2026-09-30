"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SAMPLE_PRODUCTS, SAMPLE_REVIEWS, SAMPLE_BLOGS } from "../data";
import { ProductCard } from "../components/ProductCard";
import {
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Heart,
  BookOpen,
  Clock,
  MessageSquare,
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const { navigateTo, setActiveCategoryFilter } = useApp();

  const featuredWigs = SAMPLE_PRODUCTS.filter(
    (p) => p.category === "Human Hair Wigs" && p.isFeatured,
  );
  const featuredCosmetics = SAMPLE_PRODUCTS.filter(
    (p) => p.category === "Cosmetics" && p.isFeatured,
  );
  const bestSellers = SAMPLE_PRODUCTS.slice(0, 8); // At least 8 products

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const categories = [
    {
      name: "Human Hair Wigs",
      tagline: "100% Raw Virgin HD Lace",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Hair Extensions",
      tagline: "Seamless Tape-ins & Clip-ins",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Hair Care",
      tagline: "Hydrating White Caviar Infusions",
      image:
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Cosmetics",
      tagline: "Moisture Velvet Matte Lipsticks",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const handleCategoryClick = (cat: string) => {
    setActiveCategoryFilter(cat);
    navigateTo("shop");
  };

  const instagramImages = [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300",
  ];

  return (
    <div id="home-view" className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative bg-brand-cream/60 overflow-hidden"
      >
        {/* Dynamic Abstract Highlights */}
        <div
          id="hero-glow"
          className="absolute top-10 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          id="hero-glow-right"
          className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Copywriting */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-left"
            id="hero-content"
          >
            <div className="inline-flex items-center gap-1.5 bg-brand-beige/50 border border-brand-primary/15 py-1.5 px-3 rounded-full text-xs font-semibold text-brand-primary tracking-wide">
              <Sparkles className="h-3.5 w-3.5" /> Luxury Quality Certified
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-brand-charcoal tracking-tight leading-none uppercase">
              REDEFINE YOUR <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent">
                GLOWING CROWN
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-lg">
              Indulge in 100% raw virgin HD Lace Wigs and skin-loving serum
              cosmetics designed by master trichologists and elite cosmetic
              chemists. Built for your supreme everyday glamour.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => handleCategoryClick("Human Hair Wigs")}
                className="bg-brand-primary text-white font-extrabold uppercase tracking-widest text-xs py-4 px-8 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Shop Luxury Wigs
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => handleCategoryClick("Cosmetics")}
                className="border border-brand-charcoal text-brand-charcoal font-extrabold uppercase tracking-widest text-xs py-4 px-8 rounded-lg hover:bg-brand-charcoal hover:text-white transition-all flex items-center justify-center"
              >
                Explore Cosmetics
              </button>
            </div>

            {/* Quick Metrics */}
            <div
              className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-beige"
              id="hero-stats"
            >
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-black text-brand-charcoal">
                  100%
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-muted">
                  Virgin Remy Hair
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-black text-brand-charcoal">
                  45+
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-muted">
                  Vibrant Shades
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-black text-brand-charcoal">
                  25k+
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-muted">
                  Happy Stylists
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Premium Visual Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
            id="hero-images"
          >
            {/* Visual background frames */}
            <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl rotate-3 scale-102 transform filter blur-sm" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-beige aspect-4/3 sm:aspect-16/10 lg:aspect-4/5 max-h-145 bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400"
                alt="Timeless Trends Premium Beauty"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Overlapping promo card banner */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-brand-beige p-4 sm:p-5 rounded-xl shadow-lg flex items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-brand-primary font-bold block mb-0.5">
                    Lace Front Spotlight
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-brand-charcoal leading-tight">
                    HD Invisible Lace Front Wig
                  </h4>
                  <span className="text-xs text-neutral-500">
                    Melt down technology for custom scaling skin types.
                  </span>
                </div>
                <button
                  onClick={() =>
                    navigateTo("product-details", {
                      productId: "wig-lux-hd-lace",
                    })
                  }
                  className="bg-brand-charcoal text-white hover:bg-brand-primary p-3 rounded-full transition-colors shrink-0"
                  aria-label="Direct product link"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* floating cosmetic circle */}
            <div
              className="absolute -top-6 -right-6 bg-white border border-brand-beige rounded-full py-3.5 px-4 shadow-lg flex flex-col items-center select-none animate-bounce"
              style={{ animationDuration: "6s" }}
            >
              <span className="font-mono text-lg font-black text-brand-primary">
                20%
              </span>
              <span className="text-[8px] uppercase tracking-wider font-extrabold text-neutral-muted">
                PROMO OFF
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REUSABLE VALUES GRID */}
      <section
        id="values-pillars"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Sparkles className="h-6 w-6 text-brand-primary" />,
              title: "100% Remy Human Hair",
              desc: "Highest collection grade raw donor hair. Sourced and processed ethically.",
            },
            {
              icon: <Truck className="h-6 w-6 text-brand-primary" />,
              title: "Expedited Parcel Flow",
              desc: "Quick, sanitized courier packing and tracked shipment to your doorstep.",
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-brand-primary" />,
              title: "Vercel Approved Clinique",
              desc: "Tested dermatologically to ensure supreme skin breathing integrity.",
            },
            {
              icon: <RotateCcw className="h-6 w-6 text-brand-primary" />,
              title: "14-Day Safety Seals",
              desc: "No question asked hygiene returns policy for untouched packages.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-cream/20 border border-brand-beige/50 p-5 rounded-xl text-left space-y-3 shadow-xs"
            >
              <div className="w-10 h-10 bg-brand-cream border border-brand-primary/10 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-brand-charcoal text-sm uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES ROUTING */}
      <section
        id="featured-categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              Luxury At Hand
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase">
              Browse Categories
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick("")}
            className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal hover:text-brand-primary flex items-center gap-1 border-b border-brand-charcoal hover:border-brand-primary py-0.5"
          >
            Browse All Catalogue <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              id={`cat-card-${idx}`}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer relative bg-neutral-100 rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Elegant Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-5 pt-10 text-left flex flex-col justify-end">
                <span className="text-[10px] text-brand-accent uppercase tracking-widest font-extrabold mb-1">
                  {cat.tagline}
                </span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS GRID */}
      <section
        id="best-sellers"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Curated Classics
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase">
            Our Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md mx-auto">
            Sought-after hair crowns and cosmetics absolute pigment favorites
            preferred by top beauty influencers worldwide.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL COUPON BANNER */}
      <section
        id="promo-banner"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative bg-brand-charcoal text-white rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/5">
          {/* Abstract glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 text-left lg:max-w-xl relative z-10">
            <span className="text-xs text-brand-accent uppercase tracking-widest font-extrabold flex items-center gap-1.5 animate-pulse">
              ★ LIMITED PERIOD OPPORTUNITY ★
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none">
              TAKE <span className="text-brand-accent">20% OFF</span> ALL
              PREMIUM COLLECTIONS
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Unlock supreme quality straight-weft extensions, raw frontals and
              high-potency collagen skin creams today. Use our luxury ribbon
              token on checkout.
            </p>
          </div>

          <div className="flex flex-col items-center sm:flex-row gap-4 relative z-10 shrink-0">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg flex flex-col items-start select-all">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                Promo Coupon Code
              </span>
              <span className="font-mono text-xl font-bold tracking-widest text-white">
                TIMELESS20
              </span>
            </div>
            <button
              onClick={() => handleCategoryClick("")}
              className="bg-brand-primary text-white text-xs font-extrabold uppercase tracking-widest py-5 px-8 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-xl transition-all"
            >
              Shop Exclusive Now
            </button>
          </div>
        </div>
      </section>

      {/* EDITORIAL BLOG STORIES SECTION */}
      <section
        id="editorial-highlights"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
              Salon Secrets & Trends
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase text-left">
              Editorial Stories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-xl">
              Discover professional hair guide masterclasses, summer beauty
              forecasts, and clinical science behind caviar hair therapy.
            </p>
          </div>
          <button
            onClick={() => navigateTo("blog")}
            className="text-xs uppercase font-extrabold tracking-widest text-brand-teal hover:text-brand-charcoal flex items-center gap-1.5 border-b border-brand-teal hover:border-brand-charcoal py-0.5 self-start md:self-end"
          >
            Read All Stories <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_BLOGS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo("single-blog", { blogId: post.id })}
              className="bg-white border border-brand-beige rounded-2xl overflow-hidden group cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div className="aspect-16/10 bg-neutral-100 overflow-hidden relative">
                <img
                  src={post.mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-brand-beige text-[9px] uppercase font-black tracking-widest py-1 px-2.5 rounded text-brand-charcoal">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base sm:text-lg text-brand-charcoal group-hover:text-brand-teal transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-beige flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover border"
                    />
                    <span className="font-medium text-brand-charcoal">
                      {post.author.split(" ")[0]}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="h-3.5 w-3.5 text-brand-teal" />{" "}
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM AMBIENT BENTO GALLERY */}
      <section
        id="instagram-spotlight"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
            Stay Connected
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase">
            Editorial Gallery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md mx-auto">
            Tag{" "}
            <strong className="text-brand-charcoal">
              #TimelessTrendsGrace
            </strong>{" "}
            on Instagram to be featured on our premium lookbooks.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((src, idx) => (
            <div
              key={idx}
              id={`insta-shot-${idx}`}
              className="group relative rounded-xl overflow-hidden aspect-square bg-neutral-100 cursor-pointer shadow-xs border border-brand-beige"
            >
              <img
                src={src}
                alt="Instagram lookbook"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIALS CAROUSEL */}
      <section
        id="testimonials-block"
        className="bg-brand-cream/40 border-y border-brand-beige py-16"
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            The Timeless Experience
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase">
            Sought-after Reviews
          </h2>

          <div className="relative min-h-40 flex items-center justify-center">
            {SAMPLE_REVIEWS.map(
              (rev, idx) =>
                idx === activeReviewIndex && (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-center text-amber-500 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-charcoal tracking-wide">
                      "{rev.title}"
                    </h4>
                    <p className="text-neutral-600 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto italic">
                      {rev.text}
                    </p>
                    <div>
                      <span className="font-bold text-xs uppercase text-brand-charcoal block">
                        {rev.author}
                      </span>
                      <span className="text-[10px] text-brand-teal font-medium uppercase tracking-widest">
                        Verified Couture Buyer
                      </span>
                    </div>
                  </motion.div>
                ),
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {SAMPLE_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                id={`dot-btn-${idx}`}
                onClick={() => setActiveReviewIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === activeReviewIndex ? "bg-brand-primary w-6" : "bg-brand-beige"}`}
                aria-label={`Show testimonial page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
