"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Percent,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Cart() {
  const {
    cart,
    selectedCartItems,
    toggleCartItemSelection,
    selectAllCartItems,
    updateCartQuantity,
    removeFromCart,
    couponCode,
    applyCoupon,
    discountPercentage,
    deliveryFee,
    navigateTo,
  } = useApp();

  const [promoInput, setPromoInput] = useState("");

  const subtotal = selectedCartItems.reduce(
    (sum, item) =>
      sum + (item.product.salePrice || item.product.price) * item.quantity,
    0,
  );
  const discountAmount = subtotal * (discountPercentage / 100);
  const selectedItemsCount = selectedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const savedForLaterCount = cart
    .filter((item) => item.isSelected === false)
    .reduce((sum, item) => sum + item.quantity, 0);
  const allItemsSelected = cart.every((item) => item.isSelected !== false);
  const total =
    subtotal - discountAmount + (selectedCartItems.length ? deliveryFee : 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput);
    }
  };

  return (
    <div
      id="cart-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10"
    >
      {/* Title */}
      <div id="cart-title-block" className="pb-6 border-b border-brand-beige">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary">
          Checkout Prep
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
          Your Shopping Bag
        </h1>
      </div>

      {cart.length === 0 ? (
        // Empty State
        <div
          id="empty-cart-page"
          className="py-20 rounded-2xl bg-brand-cream/20 border border-brand-beige flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto"
        >
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-accent shadow-xs">
            <ShoppingBag className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase select-none">
            Your Premium Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm font-light">
            No luxurious wigs or glowing serum cosmetics are prepared. Browse
            our collection catalog to formulate your signature beauty standard.
          </p>
          <button
            onClick={() => navigateTo("shop")}
            className="bg-brand-primary text-white text-xs font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all"
          >
            Explore Master Collections
          </button>
        </div>
      ) : (
        // Core Layout
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start"
          id="cart-workspace"
        >
          {/* Items Column */}
          <div className="lg:col-span-2 space-y-4" id="cart-items-collection">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-beige bg-white px-5 py-4">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-brand-charcoal">
                <input
                  type="checkbox"
                  checked={allItemsSelected}
                  onChange={(event) => selectAllCartItems(event.target.checked)}
                  className="h-4 w-4 accent-brand-primary"
                  aria-label="Select all items in your cart"
                />
                Select all items
              </label>
              <span className="text-xs font-medium text-neutral-500">
                {selectedItemsCount} {selectedItemsCount === 1 ? "item" : "items"} selected for checkout
              </span>
            </div>
            <div className="bg-white border border-brand-beige rounded-2xl overflow-hidden shadow-xs">
              <div className="p-6 bg-brand-cream/30 border-b border-brand-beige py-4 hidden sm:grid grid-cols-12 text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                <span className="col-span-6">Luxury Item Details</span>
                <span className="col-span-2 text-center">Quantities</span>
                <span className="col-span-2 text-right">Unit Price</span>
                <span className="col-span-2 text-right">Total Price</span>
              </div>

              <div className="divide-y divide-brand-beige">
                {cart.map((item) => {
                  const activePrice =
                    item.product.salePrice || item.product.price;
                  return (
                    <div
                      key={item.id}
                      id={`page-cart-item-${item.id}`}
                      className={`p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center ${item.isSelected === false ? "bg-neutral-50/70" : ""}`}
                    >
                      {/* Product details */}
                      <div className="col-span-12 sm:col-span-6 flex gap-4 text-left">
                        <input
                          type="checkbox"
                          checked={item.isSelected !== false}
                          onChange={() => toggleCartItemSelection(item.id)}
                          className="mt-1 h-4 w-4 shrink-0 accent-brand-primary"
                          aria-label={`Select ${item.product.name} for checkout`}
                        />
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                          className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg border border-brand-beige shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 my-auto">
                          <span className="text-[9px] uppercase tracking-widest text-brand-teal font-extrabold block">
                            {item.product.category}
                          </span>
                          <h3
                            onClick={() =>
                              navigateTo("product-details", {
                                productId: item.product.id,
                              })
                            }
                            className="font-display font-bold text-sm sm:text-base text-brand-charcoal hover:text-brand-primary transition-colors cursor-pointer line-clamp-2"
                          >
                            {item.product.name}
                          </h3>
                          {Object.keys(item.selectedVariant).length > 0 && (
                            <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-zinc-500">
                              {Object.entries(item.selectedVariant).map(
                                ([k, v]) => (
                                  <span key={k}>
                                    {k}:{" "}
                                    <strong className="text-neutral-700">
                                      {v}
                                    </strong>
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity display / Controls */}
                      <div className="col-span-4 sm:col-span-2 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-brand-beige rounded-lg bg-neutral-50">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1.5 text-neutral-500 hover:text-brand-primary"
                            title="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-brand-charcoal w-8 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 text-neutral-500 hover:text-brand-primary"
                            title="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-4 sm:col-span-2 text-left sm:text-right">
                        <span className="text-xs text-neutral-400 font-medium block sm:hidden uppercase">
                          Unit:
                        </span>
                        <span className="font-mono text-sm font-bold text-brand-charcoal">
                          ${activePrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Total cost and Quick trash */}
                      <div className="col-span-4 sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
                        <div className="text-right">
                          <span className="text-xs text-neutral-400 font-medium block sm:hidden uppercase">
                            Total:
                          </span>
                          <span className="font-mono text-sm sm:text-base font-black text-brand-primary block">
                            ${(activePrice * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-neutral-muted hover:text-red-600 hover:bg-neutral-50 rounded-lg transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back Link bottom footer */}
              <div className="p-4 bg-brand-cream/10 border-t border-brand-beige flex justify-between items-center">
                <button
                  onClick={() => navigateTo("shop")}
                  className="text-xs uppercase font-extrabold tracking-widest text-brand-charcoal hover:text-brand-primary flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Checkout Totals Summary column */}
          <div className="space-y-6" id="cart-summary-col">
            {/* Promo Code Coupon Widget */}
            <div className="bg-white border border-brand-beige p-6 rounded-2xl shadow-xs space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#000000]">
                Have a coupon token?
              </h4>
              <p className="text-[11px] text-neutral-400 font-light leading-snug">
                Type <strong className="text-brand-primary">TIMELESS20</strong>{" "}
                to get an instant 20% off high-end wigs and beauty creams.
              </p>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="TIMELESS20"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="bg-white border border-brand-beige rounded-lg text-xs py-3.5 px-4 w-full focus:outline-none uppercase font-mono tracking-widest"
                />
                <button
                  type="submit"
                  className="bg-brand-charcoal text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="bg-brand-teal/5 border border-brand-teal/15 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-teal flex items-center gap-1 uppercase">
                    <Percent className="h-3 w-3" /> TOKEN ACTIVE: {couponCode}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-teal">
                    (-20% Active)
                  </span>
                </div>
              )}
            </div>

            {/* Calculations block */}
            <div className="bg-white border border-brand-beige p-6 rounded-2xl shadow-sm space-y-4 text-left">
              <h4 className="font-display font-black text-sm uppercase tracking-widest text-[#000000] pb-2 border-b border-brand-beige">
                Order Summation
              </h4>

              <div className="space-y-3.5 text-xs text-neutral-500 font-medium">
                <div className="flex justify-between">
                  <span>Selected subtotal</span>
                  <span className="font-mono text-zinc-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discountPercentage > 0 && (
                  <div className="flex justify-between text-brand-teal">
                    <span>Couture Discount ({discountPercentage}%)</span>
                    <span className="font-mono">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tracked Delivery Fee</span>
                  <span className="font-mono text-zinc-900">
                    ${(selectedCartItems.length ? deliveryFee : 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-brand-beige flex justify-between items-baseline text-zinc-905">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Aggregate Total
                </span>
                <span className="font-mono text-2xl font-black text-brand-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              {savedForLaterCount > 0 && (
                <p className="text-center text-[11px] text-neutral-500">
                  {savedForLaterCount}{" "}
                  {savedForLaterCount === 1 ? "item is" : "items are"} saved
                  for later and will stay in your cart.
                </p>
              )}

              <button
                onClick={() => navigateTo("checkout")}
                disabled={selectedCartItems.length === 0}
                className="w-full bg-brand-primary text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {selectedCartItems.length === 0
                  ? "Select items to continue"
                  : `Checkout ${selectedItemsCount} ${selectedItemsCount === 1 ? "item" : "items"}`}
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Secure Trust logo */}
              <div className="pt-2 flex justify-center items-center gap-1.5 text-brand-teal">
                <ShieldCheck className="h-4.5 w-4.5" />
                <span className="text-[11px] font-bold tracking-wide uppercase">
                  256-Bit SSL Encrypted Vault
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
