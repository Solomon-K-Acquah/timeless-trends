"use client";

import React from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist, moveWishlistToCart, navigateTo } = useApp();

  return (
    <div
      id="wishlist-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left"
    >
      {/* Header */}
      <div id="wishlist-header" className="pb-6 border-b border-brand-beige">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">
          Saved Gems
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Your Wishlist
        </h1>
      </div>

      {wishlist.length === 0 ? (
        // Empty State
        <div
          id="empty-wishlist-page"
          className="py-20 rounded-2xl bg-brand-cream/20 border border-brand-beige flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto"
        >
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-teal shadow-xs">
            <Heart className="h-10 w-10 text-brand-teal" />
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase">
            No Saved Gems Found
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm font-light">
            Keep track of luxurious human hair wefts, lace wigs and glow
            foundations you absolutely adore.
          </p>
          <button
            onClick={() => navigateTo("shop")}
            className="bg-brand-primary text-white text-xs font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all"
          >
            Go Save Favorites
          </button>
        </div>
      ) : (
        // Grid lists with dynamic cart action
        <div className="space-y-8" id="wishlist-matrix">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              return (
                <div
                  key={product.id}
                  className="relative group flex flex-col justify-between border border-brand-beige rounded-xl p-3 bg-white"
                  id={`wishlist-item-${product.id}`}
                >
                  {/* Reuse image logic or core card */}
                  <div
                    className="aspect-3/4 relative rounded-lg overflow-hidden bg-neutral-50 cursor-pointer"
                    onClick={() =>
                      navigateTo("product-details", { productId: product.id })
                    }
                  >
                    <img
                      src={product.mainImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-104 transition-all"
                      referrerPolicy="no-referrer"
                    />

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/95 text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-xs"
                      title="Delete saved item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Core details mapping */}
                  <div className="pt-3 space-y-1 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-muted block mb-0.5">
                        {product.category}
                      </span>
                      <h4
                        onClick={() =>
                          navigateTo("product-details", {
                            productId: product.id,
                          })
                        }
                        className="font-display font-bold text-sm text-brand-charcoal hover:text-brand-primary transition-all cursor-pointer truncate"
                      >
                        {product.name}
                      </h4>
                      <div className="font-mono text-sm font-black text-brand-charcoal pt-1">
                        ${(product.salePrice || product.price).toFixed(2)}
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col gap-2 border-t border-brand-beige mt-3">
                      <button
                        onClick={() => moveWishlistToCart(product)}
                        className="w-full bg-brand-charcoal text-white py-2 px-3 rounded-lg text-[10px] uppercase font-bold tracking-widest hover:bg-brand-primary flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="h-3 w-3" /> Move To Bag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
