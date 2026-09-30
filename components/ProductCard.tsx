/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Product } from "../types";
import { useApp } from "../context/AppContext";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, navigateTo } = useApp();

  const isSaved = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first variant option if any
    const defaultVariants: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaultVariants[v.name] = v.options[0];
      }
    });
    addToCart(product, 1, defaultVariants);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white border border-brand-beige rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div
        className="relative aspect-3/4 bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => navigateTo("product-details", { productId: product.id })}
      >
        <motion.img
          src={product.mainImage}
          alt={product.name}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-brand-teal text-white text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="bg-brand-primary text-white text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Hearts Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full z-10 transition-all ${isSaved ? "bg-brand-primary text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-brand-charcoal hover:bg-white"}`}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </button>

        {/* Hover Action Panel Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
          <button
            onClick={() =>
              navigateTo("product-details", { productId: product.id })
            }
            className="p-3 bg-white text-zinc-900 rounded-full hover:bg-brand-cream hover:text-brand-primary transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick View Details"
          >
            <Eye className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-3 bg-white text-zinc-900 rounded-full hover:bg-brand-cream hover:text-brand-primary transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="Quick Add To Bag"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Product Description Details Card */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-2 text-left">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-neutral-muted font-bold block">
            {product.category}
          </span>
          <h3
            onClick={() =>
              navigateTo("product-details", { productId: product.id })
            }
            className="font-display font-bold text-sm sm:text-base text-brand-charcoal hover:text-brand-primary transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Ratings Row */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-neutral-200"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-brand-charcoal">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-neutral-muted font-medium">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Product Price & Button */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-beige">
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="font-mono text-base font-black text-brand-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="font-mono text-xs text-neutral-muted line-through font-medium">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-mono text-base font-black text-brand-charcoal">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="text-[11px] uppercase tracking-wider font-extrabold text-brand-primary hover:text-brand-secondary flex items-center gap-1"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
