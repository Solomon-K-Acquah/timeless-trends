"use client";

import React, { useState } from "react";
import {
  CreditCard,
  MapPin,
  Smartphone,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
  Building,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "@/context/AppContext";
import { Address } from "@/types";

export default function Checkout() {
  const {
    cart,
    selectedCartItems,
    discountPercentage,
    deliveryFee,
    userProfile,
    addNewOrder,
    navigateTo,
    addToast,
  } = useApp();

  const checkoutItems = selectedCartItems;
  const subtotal = checkoutItems.reduce(
    (sum, item) =>
      sum + (item.product.salePrice || item.product.price) * item.quantity,
    0,
  );
  const discountAmount = subtotal * (discountPercentage / 100);
  const checkoutDeliveryFee = checkoutItems.length > 0 ? deliveryFee : 0;
  const total = subtotal - discountAmount + checkoutDeliveryFee;

  // Address inputs state
  const [addrName, setAddrName] = useState(userProfile.fullName);
  const [addrEmail, setAddrEmail] = useState(userProfile.email);
  const [addrPhone, setAddrPhone] = useState(userProfile.phone);
  const [addressLine1, setAddressLine1] = useState("128 Luxury Boulevard");
  const [addressLine2, setAddressLine2] = useState("Apt 4B");
  const [city, setCity] = useState("San Francisco");
  const [state, setState] = useState("CA");
  const [zipCode, setZipCode] = useState("94107");
  const [country, setCountry] = useState("United States");

  // Selected Payment Method state
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "mobile_money" | "bank_transfer"
  >("card");
  const [cardNo, setCardNo] = useState("4102 5590 1284 3291");
  const [cardExpiry, setCardExpiry] = useState("09/29");
  const [cardCvv, setCardCvv] = useState("443");
  const paymentOptions: {
    id: typeof paymentMethod;
    name: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "card",
      name: "Credit Card",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <Building className="h-4 w-4" />,
    },
  ];

  // Order submission overlay state
  const [isSuccessOverlay, setIsSuccessOverlay] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName || !addrEmail || !addressLine1 || !city || !zipCode) {
      addToast("Please fill out all required shipping fields.", "error");
      return;
    }

    const shippingAddress: Address = {
      fullName: addrName,
      email: addrEmail,
      phone: addrPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
    };

    let pMethodText = "Credit Card (Visa ending in 3291)";
    if (paymentMethod === "mobile_money") {
      pMethodText = "Mobile Money (MoMo Account)";
    } else if (paymentMethod === "bank_transfer") {
      pMethodText = "Direct Bank Wire Transfer";
    }

    // Submit order via global state
    const orderCreated = addNewOrder(shippingAddress, pMethodText);
    if (!orderCreated) return;
    setPlacedOrderId(orderCreated.id);
    setIsSuccessOverlay(true);
  };

  if ((cart.length === 0 || checkoutItems.length === 0) && !isSuccessOverlay) {
    const hasUnselectedItems = cart.length > 0;
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-primary mx-auto">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="font-display font-black text-xl sm:text-2xl text-brand-charcoal uppercase">
          {hasUnselectedItems ? "No items selected" : "Cart is empty"}
        </h2>
        <p className="text-xs text-neutral-500 font-light">
          {hasUnselectedItems
            ? "Your other items are safe in your cart. Choose the products you want to purchase before continuing."
            : "There are no items inside your checkout carriage. Please proceed to the store catalog to select luxury items."}
        </p>
        <button
          onClick={() => navigateTo(hasUnselectedItems ? "cart" : "shop")}
          className="bg-brand-primary text-white text-xs font-black uppercase tracking-widest py-3 px-6 rounded-lg hover:bg-brand-secondary inline-block"
        >
          {hasUnselectedItems ? "Choose Cart Items" : "Go Shop Collections"}
        </button>
      </div>
    );
  }

  return (
    <div
      id="checkout-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left relative"
    >
      {/* 2. SUCCESS MODAL PANEL */}
      <AnimatePresence>
        {isSuccessOverlay && (
          <motion.div
            id="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-charcoal/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-8 text-center space-y-6 border border-brand-beige shadow-2xl"
              id="success-modal-card"
            >
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mx-auto animate-pulse">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-brand-teal uppercase font-black tracking-widest block">
                  ORDER SUBMITTED SECURELY
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-charcoal uppercase">
                  Thank you for your beauty purchase!
                </h2>
                <div className="bg-neutral-50 border border-brand-beige py-2.5 px-4 rounded-lg inline-block font-mono text-sm text-brand-charcoal font-bold">
                  Order ID:{" "}
                  <strong className="text-brand-primary font-bold">
                    {placedOrderId}
                  </strong>
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                We are preparing your premium satin package ribbons, HD lace
                structures, or glow cosmetics right now. A shipment tracking
                link will be sent to{" "}
                <strong className="text-brand-charcoal">{addrEmail}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsSuccessOverlay(false);
                    navigateTo("account");
                  }}
                  className="border border-brand-primary text-brand-primary text-xs uppercase font-extrabold tracking-widest py-3 px-4 rounded-lg hover:bg-brand-cream/20 text-center"
                >
                  View My Orders
                </button>
                <button
                  onClick={() => {
                    setIsSuccessOverlay(false);
                    navigateTo("shop");
                  }}
                  className="bg-brand-primary text-white text-xs uppercase font-extrabold tracking-widest py-3 px-4 rounded-lg hover:bg-brand-secondary text-center"
                >
                  Shop More
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div
        id="checkout-header"
        className="pb-6 border-b border-brand-beige mb-8"
      >
        <button
          onClick={() => navigateTo("cart")}
          className="text-xs uppercase font-extrabold tracking-widest text-brand-secondary hover:text-brand-charcoal flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Cart Bag
        </button>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase">
          Billing & Shipping
        </h1>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        {/* Shipping address form & Payment selection */}
        <div className="lg:col-span-7 space-y-8" id="checkout-forms">
          {/* Shipping fields */}
          <div className="bg-white border border-brand-beige p-6 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-display font-bold text-lg text-brand-charcoal uppercase flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-accent shrink-0" /> Shipping
              Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Consignee Name *
                </label>
                <input
                  type="text"
                  value={addrName}
                  onChange={(e) => setAddrName(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Contact Phone *
                </label>
                <input
                  type="text"
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500">
                Email Address *
              </label>
              <input
                type="email"
                value={addrEmail}
                onChange={(e) => setAddrEmail(e.target.value)}
                className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none focus:border-brand-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="128 Luxury Boulevard"
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Apartment / Suite
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Apt 4B"
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="col-span-2 sm:col-span-1 space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  State *
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Zip Code *
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none font-mono"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500">
                  Country *
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-brand-beige bg-neutral-50/50 p-3 text-xs rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Methods selector */}
          <div className="bg-white border border-brand-beige p-6 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-display font-bold text-lg text-brand-charcoal uppercase flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-brand-accent shrink-0" />{" "}
              Settlement Options
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
              {paymentOptions.map((opt) => {
                const isActive = paymentMethod === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`border p-4 rounded-xl flex items-center gap-2.5 transition-all text-xs font-bold ${isActive ? "bg-brand-cream/30 border-brand-primary text-brand-primary shadow-xs" : "border-brand-beige text-neutral-600 hover:bg-neutral-50"}`}
                  >
                    {opt.icon} {opt.name}
                  </button>
                );
              })}
            </div>

            {/* Conditional fields based on option */}
            <div className="bg-neutral-50 p-4 border border-brand-beige rounded-xl">
              {paymentMethod === "card" && (
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-neutral-500">
                      Credit Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                      className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none font-mono tracking-widest"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-neutral-500">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-neutral-500">
                        CVV Guard
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "mobile_money" && (
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] uppercase font-bold text-neutral-500">
                    Mobile Money Wallet Number (Momo / wave / orange)
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) Momo-Num"
                    className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg font-mono"
                    required
                  />
                  <span className="text-[10px] text-neutral-400 font-light block">
                    You will receive an instant approval push token pin
                    validation on your phone.
                  </span>
                </div>
              )}

              {paymentMethod === "bank_transfer" && (
                <div className="text-xs text-neutral-600 text-left font-light space-y-2">
                  <p className="font-bold uppercase text-brand-teal text-[10px] tracking-wider mb-2">
                    Wire routing details:
                  </p>
                  <p>
                    Bank Name:{" "}
                    <strong className="font-bold text-brand-charcoal">
                      Citibank Couture Corp
                    </strong>
                  </p>
                  <p>
                    Account Number:{" "}
                    <strong className="font-mono text-brand-charcoal font-bold">
                      1092-4811-9840
                    </strong>
                  </p>
                  <p>
                    Routing Code:{" "}
                    <strong className="font-mono text-brand-charcoal font-bold">
                      CITI0026X
                    </strong>
                  </p>
                  <p className="text-[11px] text-neutral-400 italic">
                    Please send your bank slip clearance output to
                    billing@timelesstrends.com for rapid packing verification.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aggregate order summary column */}
        <div className="lg:col-span-5 space-y-6" id="checkout-summary-col">
          <div className="bg-white border border-brand-beige p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-display font-black text-sm uppercase tracking-widest text-[#000000] pb-2 border-b border-brand-beige">
              Order Outline
            </h3>

            {/* List of items */}
            <div className="space-y-4 max-h-70 overflow-y-auto pr-2">
              {checkoutItems.map((item) => {
                const activePrice =
                  item.product.salePrice || item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 justify-between items-start text-xs border-b border-brand-beige/50 pb-3 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.product.mainImage}
                      alt=""
                      className="w-10 h-13 object-cover rounded-md border border-brand-beige shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-brand-charcoal truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
                        Qty: {item.quantity}
                      </p>
                      {Object.keys(item.selectedVariant).length > 0 && (
                        <p className="text-[9px] text-brand-teal font-medium uppercase truncate">
                          {Object.entries(item.selectedVariant)
                            .map(([k, v]) => `${k}:${v}`)
                            .join(" | ")}
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-zinc-900 shrink-0 select-none">
                      ${(activePrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Aggregates breakdown */}
            <div className="space-y-3.5 text-xs text-neutral-500 font-medium pt-4 border-t border-brand-beige">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-brand-teal font-bold">
                  <span>Couture Discount (-20%)</span>
                  <span className="font-mono">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tracked Courier Fee</span>
                <span className="font-mono text-zinc-900">
                  ${checkoutDeliveryFee.toFixed(2)}
                </span>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-4 border-t border-brand-beige text-brand-charcoal">
                <span className="text-sm font-bold uppercase tracking-wider">
                  Aggregate Total
                </span>
                <span className="font-mono text-xl font-black text-brand-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-brand-secondary shadow-md hover:shadow-xl transition-all text-center block"
            >
              Complete Place Order Securely
            </button>

            {/* Safety metrics */}
            <div className="flex justify-center items-center gap-1 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-brand-teal" />
              <span>DCI Security verified</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
