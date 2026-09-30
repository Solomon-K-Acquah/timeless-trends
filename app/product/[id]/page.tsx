"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Sparkles,
  Info,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_PRODUCTS, SAMPLE_REVIEWS } from "@/data";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetails() {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    addToast,
  } = useApp();

  // Retrieve current product, default to prime product if not set
  const product = useMemo(() => {
    return (
      SAMPLE_PRODUCTS.find((p) => p.id === selectedProductId) ||
      SAMPLE_PRODUCTS[0]
    );
  }, [selectedProductId]);

  // Gallery main image switcher state
  const [activeImage, setActiveImage] = useState(product.mainImage);

  // Active variants selected hooks
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  // Active quantity state
  const [qty, setQty] = useState(1);

  // Accordions display state
  const [activeTab, setActiveTab] = useState<"features" | "ingredients">(
    "features",
  );

  // Customer added custom reviews listing
  const [localReviews, setLocalReviews] = useState(SAMPLE_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");

  // Sync image and variants when product changes
  useEffect(() => {
    setActiveImage(product.mainImage);
    setQty(1);

    // Auto-select first option of each variant
    const initialVar: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        initialVar[v.name] = v.options[0];
      }
    });
    setSelectedVariants(initialVar);
  }, [product]);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }));
  };

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedVariants);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedVariants);
    navigateTo("checkout");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) {
      addToast("Please fill out your name and review details.", "error");
      return;
    }

    const nReview = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      title: newReviewTitle || "Excellent product!",
      text: newReviewText,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      verified: true,
    };

    setLocalReviews((prev) => [nReview, ...prev]);
    setNewReviewAuthor("");
    setNewReviewTitle("");
    setNewReviewText("");
    setNewReviewRating(5);
    addToast(
      "Review submitted successfully! Thank you for your feedback.",
      "success",
    );
  };

  // Find related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id,
    ).slice(0, 4);
  }, [product]);

  return (
    <div
      id="product-detail-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left"
    >
      {/* 1. PRIMARY GRID SECTION */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        id="product-primary-panel"
      >
        {/* Gallery Column */}
        <div className="space-y-4" id="detail-gallery">
          {/* Main Visual Frame */}
          <div className="aspect-3/4 rounded-2xl overflow-hidden border border-brand-beige shadow-sm bg-neutral-100">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3 justify-start overflow-x-auto py-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                id={`thumb-${idx}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 bg-neutral-50 transition-all ${activeImage === img ? "border-brand-primary shadow-md" : "border-brand-beige hover:border-neutral-400"}`}
                aria-label={`View thumbnail ${idx + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6" id="detail-info-block">
          {/* Category path & Tags */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-primary uppercase font-extrabold tracking-widest">
              {product.category}
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs text-neutral-500 font-medium">
              {product.subcategory}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase tracking-wide leading-tight">
              {product.name}
            </h1>

            {/* Star ratings overview */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-neutral-200"}`}
                  />
                ))}
              </div>
              <span className="font-mono text-sm font-bold text-brand-charcoal">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-neutral-muted">
                ({product.reviewsCount} global customer ratings)
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="py-4 border-y border-brand-beige flex items-baseline gap-4">
            {product.salePrice ? (
              <>
                <span className="font-mono text-3xl font-black text-brand-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="font-mono text-base text-neutral-400 line-through font-medium">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-brand-primary/10 text-brand-primary text-xs font-black py-0.5 px-2 rounded-md uppercase tracking-wider">
                  Save ${(product.price - product.salePrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-mono text-3xl font-black text-brand-charcoal">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Dynamic Variant Switchers */}
          {product.variants.length > 0 && (
            <div className="space-y-4 pt-2" id="detail-variants">
              {product.variants.map((v) => (
                <div key={v.name} className="space-y-2 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Choose {v.name}:{" "}
                    <strong className="text-brand-charcoal">
                      {selectedVariants[v.name] || "Select"}
                    </strong>
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => {
                      const isSelected = selectedVariants[v.name] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleVariantSelect(v.name, opt)}
                          className={`text-xs py-2 px-4 rounded-lg font-bold border transition-all ${isSelected ? "bg-brand-charcoal border-brand-charcoal text-white shadow-md" : "border-brand-beige bg-white text-neutral-600 hover:border-neutral-400"}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector and CTA Actions button set */}
          <div className="pt-6 space-y-4" id="detail-actions">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Qty Stepper */}
              <div className="flex items-center justify-between border border-brand-beige rounded-lg bg-neutral-50 p-2 shrink-0 sm:w-36">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 text-neutral-500 hover:text-brand-primary"
                  title="Reduce quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono text-sm font-black text-zinc-900 w-10 text-center select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 text-neutral-500 hover:text-brand-primary"
                  title="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-charcoal text-white font-extrabold uppercase tracking-widest text-xs py-4 px-8 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4.5 w-4.5" /> Add To Bag
              </button>

              {/* Wishlist ribbon icon */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border rounded-lg hover:bg-neutral-50 transition-colors shrink-0 flex items-center justify-center ${isSaved ? "border-brand-primary text-brand-primary bg-brand-cream/10" : "border-brand-beige text-brand-charcoal"}`}
                title={isSaved ? "Saved in Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Buy Now direct triggers */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-brand-primary text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-brand-secondary transition-all shadow-md hover:shadow-lg text-center"
            >
              Buy It Now (Direct Express Checkout)
            </button>
          </div>

          {/* Quick trust metrics */}
          <div
            className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-brand-cream/30 border border-brand-beige text-xs text-neutral-600 font-light"
            id="detail-trust-pills"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-brand-teal" />
              <span>Free matching elastic wig cap included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-brand-teal" />
              <span>FDA Cleared pigment formulas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS ACCORDION TAB PANEL */}
      <section
        className="border-t border-brand-beige pt-10"
        id="detail-specs-accordions"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Accent text list Column */}
          <div className="lg:col-span-1 space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal block">
              The Ingredients of Majesty
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase leading-tight">
              Premium Styling Disclosures
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We focus on trace-level transparency. From pure non-synthetic
              protective wefts to nourishing ceramides, click to examine our lab
              formulations.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Control Header */}
            <div className="flex border-b border-brand-beige">
              <button
                onClick={() => setActiveTab("features")}
                className={`py-3 px-6 text-xs uppercase font-extrabold tracking-widest border-b-2 transition-all ${activeTab === "features" ? "border-brand-primary text-brand-primary" : "border-transparent text-neutral-500 hover:text-brand-charcoal"}`}
              >
                Key Features
              </button>
              {product.ingredients && (
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`py-3 px-6 text-xs uppercase font-extrabold tracking-widest border-b-2 transition-all ${activeTab === "ingredients" ? "border-brand-primary text-brand-primary" : "border-transparent text-neutral-500 hover:text-brand-charcoal"}`}
                >
                  Active Ingredients
                </button>
              )}
            </div>

            {/* Tabs content body */}
            <div className="bg-neutral-50 p-6 rounded-xl border border-brand-beige text-sm text-neutral-600 space-y-3">
              {activeTab === "features" ? (
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex gap-2 items-start font-light">
                      <Sparkles className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Full chemical disclosure list:
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-neutral-600">
                    {product.ingredients?.join(", ")}
                  </p>
                  <span className="block text-[11px] text-brand-teal font-medium mt-4">
                    ✦ 100% Vegan, Clean formulation standard, Gluten-free,
                    Cruelty-free verified
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED CUSTOMER REVIEWS PORTAL */}
      <section
        className="border-t border-brand-beige pt-10 space-y-8"
        id="detail-reviews-portal"
      >
        <h3 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase text-left">
          Guest Book & Reviews ({localReviews.length})
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form to submit review */}
          <div className="lg:col-span-1 p-6 border border-brand-beige bg-brand-cream/15 rounded-2xl text-left space-y-4">
            <h4 className="font-display font-bold text-base text-brand-charcoal uppercase">
              Leave your review
            </h4>
            <span className="text-xs text-neutral-500 leading-normal block">
              Share your styling experience with our world-wide luxury
              community.
            </span>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Alexis S."
                  className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Gorgeous hair!"
                    className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Rating
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) =>
                      setNewReviewRating(parseInt(e.target.value))
                    }
                    className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none"
                  >
                    <option value={5}>5 Stars (Superb)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Decent)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Your Review Guidelines
                </label>
                <textarea
                  rows={4}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Tell us about the texture, length or blush hold..."
                  className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal text-white text-[11px] font-extrabold uppercase tracking-widest py-3.5 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Submit Glamour Review
              </button>
            </form>
          </div>

          {/* List of customer reviews */}
          <div className="lg:col-span-2 space-y-6 text-left">
            {localReviews.map((rev) => (
              <div
                key={rev.id}
                id={`customer-rev-${rev.id}`}
                className="pb-6 border-b border-brand-beige last:border-b-0 space-y-2.5"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-charcoal block">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="bg-brand-teal/10 text-brand-teal text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="h-2.5 w-2.5" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-muted font-mono">
                    {rev.date}
                  </span>
                </div>

                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < rev.rating ? "fill-current" : "text-neutral-200"}`}
                    />
                  ))}
                </div>

                <h4 className="text-sm font-bold text-brand-charcoal">
                  {rev.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RELATED PRODUCTS RECOMMENDATIONS */}
      {relatedProducts.length > 0 && (
        <section
          className="border-t border-brand-beige pt-10 space-y-8"
          id="related-products-carousel"
        >
          <div className="flex justify-between items-end">
            <h3 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase leading-none">
              Explore Related Glamour
            </h3>
            <button
              onClick={() => navigateTo("shop")}
              className="text-xs uppercase font-extrabold tracking-widest text-[#000000] border-b border-[#000000] pb-0.5"
            >
              All Matchings <ArrowRight className="h-3.5 w-3.5 inline ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
