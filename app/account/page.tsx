"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  User,
  Settings,
  Truck,
  CheckCircle,
  Compass,
  Plus,
  Save,
  Clock,
  ExternalLink,
  Search,
  Package,
  Check,
  AlertCircle,
  Sparkles,
  Info,
  ArrowRight,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

type SubTab = "dashboard" | "orders" | "addresses" | "profile";

export default function Account() {
  const {
    orders,
    userProfile,
    updateUserProfile,
    navigateTo,
    logout,
    addToast,
  } = useApp();
  const [activeTab, setActiveTab] = useState<SubTab>("dashboard");

  // Profile forms state
  const [profileName, setProfileName] = useState(userProfile.fullName);
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [profilePhone, setProfilePhone] = useState(userProfile.phone);

  // Tracking State
  const [trackInput, setTrackInput] = useState("");
  const [activeTrackId, setActiveTrackId] = useState<string | null>(() => {
    return orders.length > 0 ? orders[0].id : null;
  });
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: profileName,
      email: profileEmail,
      phone: profilePhone,
    });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackInput.trim().toUpperCase();
    if (!cleanId) return;

    setIsTrackingLoading(true);
    setTrackingError(null);

    // Simulate high-fidelity security server handshake
    setTimeout(() => {
      const match = orders.find(
        (o) =>
          o.id.toUpperCase() === cleanId ||
          (o.trackingNumber && o.trackingNumber.toUpperCase() === cleanId),
      );
      if (match) {
        setActiveTrackId(match.id);
        addToast(`Found consignment data for ${match.id}`, "success");
      } else {
        setTrackingError(
          `No consignment found matching reference code "${cleanId}".`,
        );
        addToast("Consignment not registered.", "error");
      }
      setIsTrackingLoading(false);
    }, 600);
  };

  const spendTotal = orders
    .filter((o) => o.status === "Delivered" || o.status === "Processing")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div
      id="account-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10"
    >
      {/* Title */}
      <div
        id="account-header"
        className="pb-6 border-b border-brand-beige flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.fullName}
            className="w-16 h-16 rounded-full object-cover border border-brand-beige"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary">
              Vercel Couture Club
            </span>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-brand-charcoal uppercase leading-none mt-1">
              {userProfile.fullName}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Member since: May 2026 ✦ Platinum Tier membership
            </p>
          </div>
        </div>

        {/* Tab Selector Pill Button Set */}
        <div className="flex flex-wrap gap-2 text-left">
          {[
            {
              id: "dashboard",
              name: "Dashboard",
              icon: <Compass className="h-4 w-4" />,
            },
            {
              id: "orders",
              name: `Orders (${orders.length})`,
              icon: <ShoppingBag className="h-4 w-4" />,
            },
            {
              id: "addresses",
              name: "My Addresses",
              icon: <MapPin className="h-4 w-4" />,
            },
            {
              id: "profile",
              name: "Edit Profile",
              icon: <Settings className="h-4 w-4" />,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`account-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${isActive ? "bg-brand-primary text-white shadow-xs" : "bg-neutral-50 text-neutral-600 hover:bg-brand-cream/40 border border-brand-beige/50"}`}
              >
                {tab.icon} {tab.name}
              </button>
            );
          })}

          <button
            id="account-tab-logout"
            onClick={logout}
            className="py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/50 cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" /> Log Out
          </button>
        </div>
      </div>

      {/* --- DASHBOARD VIEW PANEL --- */}
      {activeTab === "dashboard" && (
        <div className="space-y-8" id="account-dashboard-tab">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-brand-beige p-6 rounded-2xl text-left space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Couture Investments
              </span>
              <span className="font-mono text-3xl font-black text-brand-charcoal block">
                ${spendTotal.toFixed(2)}
              </span>
              <p className="text-[10px] text-neutral-500">
                Accumulated checkout totals securely fulfilled.
              </p>
            </div>
            <div className="bg-white border border-brand-beige p-6 rounded-2xl text-left space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Fulfilled Orders
              </span>
              <span className="font-mono text-3xl font-black text-brand-charcoal block">
                {orders.length}
              </span>
              <p className="text-[10px] text-neutral-500">
                Tracked packages courier dispatched.
              </p>
            </div>
            <div className="bg-white border border-brand-beige p-6 rounded-2xl text-left space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Loyalty Level
              </span>
              <span className="font-display text-brand-teal text-xl font-extrabold uppercase block items-center gap-1">
                🏆 PLATINUM COUTURE
              </span>
              <p className="text-[10px] text-neutral-500">
                Free matching accessories on every wig purchase.
              </p>
            </div>
          </div>

          {/* ELEGANT ORDER TRACKING MODULE WITH STEP PROGRESS BAR */}
          <div
            id="shipment-tracker-container"
            className="bg-white border border-brand-beige rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all text-left"
          >
            <div className="bg-brand-cream/10 border-b border-brand-beige p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold tracking-[0.15em] text-brand-teal flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> High-End Shipment Tracker
                </span>
                <h3 className="font-display font-black text-lg text-brand-charcoal uppercase leading-none">
                  Consignment & Order Tracking
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 bg-neutral-100 py-1 px-2.5 rounded-lg">
                <Clock className="h-3.5 w-3.5 text-brand-primary" /> Real-time
                Logistics Feeds Enabled
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Track/Search & Quick-Pill selectors */}
              <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-brand-beige lg:pr-8">
                <form onSubmit={handleTrackSubmit} className="space-y-2.5">
                  <label
                    htmlFor="order-track-input"
                    className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block"
                  >
                    Enter Order ID or tracking code:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                      <Search className="h-4.5 w-4.5" />
                    </span>
                    <input
                      id="order-track-input"
                      type="text"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      placeholder="e.g. TT-2026-9810"
                      className="w-full pl-11 pr-4 py-3 text-xs bg-neutral-50/50 border border-brand-beige rounded-xl focus:border-brand-primary focus:bg-white focus:outline-none transition-all text-brand-charcoal font-mono placeholder:text-neutral-300"
                      required
                    />
                  </div>
                  <button
                    id="track-submit-btn"
                    type="submit"
                    disabled={isTrackingLoading}
                    className="w-full bg-brand-charcoal text-white hover:bg-neutral-800 disabled:bg-neutral-300 text-xs uppercase font-extrabold tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {isTrackingLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Fetching Logistics...
                      </span>
                    ) : (
                      <>
                        Verify Shipment <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </form>

                {/* Quick select list */}
                <div className="space-y-2.5 pt-4 border-t border-brand-beige/50">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block pb-1">
                    Your Active Courier Shipments:
                  </span>
                  {orders.length === 0 ? (
                    <p className="text-xs text-neutral-400 italic font-light">
                      No order registered on your profile. Complete checkout on
                      our shop to enable automatic tracking!
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {orders.map((o) => {
                        const isCurrent = activeTrackId === o.id;
                        return (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => {
                              setActiveTrackId(o.id);
                              setTrackInput(o.id);
                              setTrackingError(null);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all group ${
                              isCurrent
                                ? "bg-brand-cream/30 border-brand-primary text-brand-charcoal font-semibold"
                                : "bg-neutral-50/40 border-brand-beige/70 text-neutral-500 hover:bg-neutral-50/80"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono text-xs block font-bold text-brand-charcoal">
                                {o.id}
                              </span>
                              <span className="text-[9px] text-neutral-400 font-light block">
                                {o.date} ✦ {o.items.length}{" "}
                                {o.items.length === 1 ? "item" : "items"}
                              </span>
                            </div>
                            <span
                              className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider ${
                                o.status === "Delivered"
                                  ? "bg-brand-teal/10 text-brand-teal"
                                  : "bg-amber-500/10 text-amber-600"
                              }`}
                            >
                              {o.status}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: High Fidelity Stepper and Progress Bar */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                {trackingError && (
                  <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                    <AlertCircle className="h-8 w-8 text-red-500 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-sm text-red-800 uppercase tracking-wide">
                        Consignment Verification Failed
                      </h4>
                      <p className="text-xs text-red-600 mt-1 max-w-sm font-light">
                        {trackingError} Make sure your input matches the order
                        reference (e.g.,{" "}
                        <code className="font-mono bg-red-100/60 px-1 rounded">
                          TT-2026-9810
                        </code>
                        ) or courier sequence reference.
                      </p>
                    </div>
                  </div>
                )}

                {!trackingError &&
                  (() => {
                    const trackingOrder = orders.find(
                      (o) => o.id === activeTrackId,
                    );

                    if (!trackingOrder) {
                      return (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-neutral-400">
                          <Package className="h-10 w-10 text-neutral-300 stroke-[1.5]" />
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-charcoal font-sans">
                              No Consignment Selected
                            </h4>
                            <p className="text-xs text-neutral-400 mt-1 max-w-xs font-light">
                              Enter a valid order reference code on the left or
                              select an active courier shipment card to view
                              progress tracking.
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Compute active stats
                    const isDelivered = trackingOrder.status === "Delivered";
                    const isProcessing = trackingOrder.status === "Processing";
                    const isShipped = trackingOrder.status === "Shipped"; // handle custom status if added

                    // Base percentage for progress line
                    let progressPercent = 15;
                    if (isProcessing) progressPercent = 45;
                    if (isShipped) progressPercent = 75;
                    if (isDelivered) progressPercent = 100;

                    // Define 4 structural steps
                    const steps = [
                      {
                        label: "Order Placed",
                        sub: "Payment cleared & receipt indexed.",
                        time: trackingOrder.date,
                        completed: true,
                        active: false,
                        icon: <CheckCircle className="h-4 w-4" />,
                      },
                      {
                        label: "Luxury Styling & Prep",
                        sub: "Elite lace washed, knotted & Plucked.",
                        time: isDelivered ? "Completed" : "In Progress",
                        completed: isDelivered || isShipped,
                        active: isProcessing,
                        icon: <Sparkles className="h-4 w-4" />,
                      },
                      {
                        label: "Courier Dispatch",
                        sub: trackingOrder.trackingNumber
                          ? `Shipped via Express`
                          : "Pending Courier",
                        time: isDelivered
                          ? "Dispatched"
                          : isProcessing
                            ? "Estimating..."
                            : "In Transit",
                        completed: isDelivered,
                        active: isShipped,
                        icon: <Truck className="h-4 w-4" />,
                      },
                      {
                        label: "Arrived & Handed Over",
                        sub: isDelivered
                          ? "Signed & validated by client."
                          : "Pending destination dropoff.",
                        time: isDelivered ? "Delivered" : "Awaiting Client",
                        completed: isDelivered,
                        active: false,
                        icon: <ShoppingBag className="h-4 w-4 text-xs" />,
                      },
                    ];

                    return (
                      <div id="tracking-progress-board" className="space-y-6">
                        {/* Summary Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-beige/50 pb-3.5 gap-2 text-xs">
                          <div>
                            <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">
                              Tracking Reference
                            </span>
                            <span className="font-mono font-black text-brand-charcoal text-sm">
                              {trackingOrder.id}
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">
                              Assigned Logistics Partner
                            </span>
                            <span className="font-semibold text-brand-charcoal">
                              {trackingOrder.trackingNumber?.startsWith("UPS")
                                ? "UPS Courier Express"
                                : "FedEx Priority"}
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">
                              Fulfillment Signature
                            </span>
                            <span className="font-mono text-neutral-500">
                              {trackingOrder.trackingNumber || "Unassigned"}
                            </span>
                          </div>
                        </div>

                        {/* HIGH FIDELITY PROGRESS BAR TRACK */}
                        <div className="relative pt-6 pb-2">
                          {/* Background track line */}
                          <div className="absolute top-9.75 left-8 right-8 h-1 bg-neutral-100 rounded-full z-0" />

                          {/* Animated progress fill line */}
                          <div
                            className="absolute top-9.75 left-8 h-1 bg-brand-primary rounded-full z-0 transition-all duration-1000 ease-out"
                            style={{
                              width: `calc(${progressPercent}% - 4rem)`,
                            }}
                          />

                          {/* Layout grid of nodes */}
                          <div className="relative grid grid-cols-4 z-10">
                            {steps.map((st, i) => {
                              const isDone = st.completed;
                              const isActive = st.active;

                              return (
                                <div
                                  key={i}
                                  className="flex flex-col items-center text-center space-y-3"
                                >
                                  {/* Node dot */}
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white ${
                                      isDone
                                        ? "border-brand-primary text-brand-primary shadow-xs"
                                        : isActive
                                          ? "border-brand-teal text-brand-teal animate-pulse font-extrabold shadow-sm scale-110"
                                          : "border-neutral-200 text-neutral-300"
                                    }`}
                                  >
                                    {isDone && !isActive ? (
                                      <Check className="h-4.5 w-4.5 stroke-3" />
                                    ) : (
                                      st.icon
                                    )}
                                  </div>

                                  {/* Label and sub stats */}
                                  <div className="space-y-1 px-1">
                                    <h5
                                      className={`text-[10px] uppercase font-extrabold tracking-tight leading-none ${
                                        isDone
                                          ? "text-brand-charcoal"
                                          : isActive
                                            ? "text-brand-teal"
                                            : "text-neutral-400"
                                      }`}
                                    >
                                      {st.label}
                                    </h5>
                                    <p className="hidden md:block text-[9px] text-neutral-500 font-light leading-snug">
                                      {st.sub}
                                    </p>
                                    <span
                                      className={`inline-block font-mono text-[8px] px-1.5 py-0.5 rounded leading-none ${
                                        isDone
                                          ? "bg-neutral-100 text-brand-charcoal text-[9px] font-bold"
                                          : isActive
                                            ? "bg-brand-teal/10 text-brand-teal font-black animate-pulse"
                                            : "text-neutral-400"
                                      }`}
                                    >
                                      {st.time}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Small visual timeline note on mobile */}
                        <div className="md:hidden bg-neutral-50 p-4 rounded-xl border border-brand-beige/50 text-left space-y-2">
                          <strong className="text-[9px] uppercase font-black text-neutral-400 tracking-wider block">
                            Live Courier Log:
                          </strong>
                          <div className="space-y-2 text-xs">
                            {steps
                              .filter((st) => st.completed || st.active)
                              .map((st, i) => (
                                <div
                                  key={i}
                                  className="flex gap-2.5 items-start"
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${st.active ? "bg-brand-teal" : "bg-brand-primary"}`}
                                  />
                                  <div>
                                    <strong className="font-bold text-brand-charcoal">
                                      {st.label}
                                    </strong>
                                    <span className="text-neutral-400 ml-1">
                                      ({st.time})
                                    </span>
                                    <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">
                                      {st.sub}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Quick advice section */}
                        <div className="bg-brand-cream/15 border border-brand-beige p-4 rounded-xl flex gap-3 items-start">
                          <Info className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                          <p className="text-[10px] sm:text-[11px] text-neutral-500 font-light leading-relaxed">
                            Estimates take local courier handoff schedules into
                            account. Registered VIP Platinum guests can
                            coordinate free customized fitting appointments at
                            the local stylist salon using this tracking
                            reference.
                          </p>
                        </div>
                      </div>
                    );
                  })()}
              </div>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-brand-beige pb-3">
              <h3 className="font-display font-black text-lg text-brand-charcoal uppercase leading-none">
                Recent Order
              </h3>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs text-brand-primary font-bold uppercase underline"
              >
                All Orders List
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-sm text-neutral-500 italic">
                No past orders registered. Fill out checkout to observe tracking
                lists.
              </p>
            ) : (
              <div className="bg-white border border-brand-beige rounded-2xl overflow-hidden p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs border-b border-brand-beige pb-3">
                  <div>
                    <span className="text-neutral-500">Order ID:</span>{" "}
                    <strong className="font-mono text-zinc-900 font-bold ml-1">
                      {orders[0].id}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Fulfilled Date:</span>{" "}
                    <span className="font-semibold text-zinc-900 ml-1">
                      {orders[0].date}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">
                      Transaction Status:
                    </span>
                    <span className="ml-1 bg-amber-500/10 text-amber-600 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                      {orders[0].status}
                    </span>
                  </div>
                </div>

                {/* Ordered Items loop */}
                <div className="space-y-4 divide-y divide-brand-beige">
                  {orders[0].items.map((item, i) => (
                    <div
                      key={i}
                      className="pt-4 first:pt-0 flex gap-4 text-xs items-center justify-between"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.mainImage}
                          alt=""
                          className="w-12 h-15 rounded-lg object-cover border border-brand-beige shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-brand-charcoal">
                            {item.product.name}
                          </h4>
                          <p className="text-neutral-500 text-[10px] uppercase tracking-wider">
                            Qty: {item.quantity}
                          </p>
                          {Object.keys(item.selectedVariant).length > 0 && (
                            <p className="text-[9px] text-brand-teal uppercase font-bold">
                              {Object.entries(item.selectedVariant)
                                .map(([k, v]) => `${k}:${v}`)
                                .join(" | ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-zinc-900">
                        $
                        {(
                          (item.product.salePrice || item.product.price) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking section if available */}
                {orders[0].trackingNumber && (
                  <div className="pt-4 border-t border-brand-beige flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-neutral-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                    <div className="flex gap-2.5 items-center">
                      <Truck className="h-5 w-5 text-brand-primary shrink-0" />
                      <div>
                        <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                          Consignment Tracker
                        </span>
                        <strong className="font-mono text-xs text-brand-charcoal">
                          {orders[0].trackingNumber}
                        </strong>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setActiveTrackId(orders[0].id);
                          setTrackInput(orders[0].id);
                          setTrackingError(null);
                          document
                            .getElementById("shipment-tracker-container")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-xs uppercase font-extrabold tracking-widest bg-brand-primary text-white py-2 px-4 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        In-App Progress Tracker
                      </button>
                      <a
                        href="https://ups.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase font-extrabold tracking-widest border border-brand-charcoal text-brand-charcoal py-2 px-4 rounded hover:bg-neutral-50 flex items-center justify-center gap-1 transition-colors"
                      >
                        Real UPS Tracking <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- ORDERS HISTORY LIST --- */}
      {activeTab === "orders" && (
        <div className="space-y-8" id="account-orders-tab">
          <h3 className="font-display font-black text-lg text-brand-charcoal uppercase border-b border-brand-beige pb-3">
            Shipping Order Vault
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-brand-beige">
              <p className="text-xs text-neutral-500 font-light">
                No historic shipments found.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="border border-brand-beige rounded-2xl p-6 bg-white space-y-4"
                  id={`vault-order-${o.id}`}
                >
                  {/* header line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-beige pb-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-neutral-500">
                          Order Reference:
                        </span>{" "}
                        <strong className="font-mono font-bold text-zinc-900 ml-1">
                          {o.id}
                        </strong>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest ${o.status === "Delivered" ? "bg-brand-teal/10 text-brand-teal" : "bg-amber-500/10 text-amber-600"}`}
                      >
                        {o.status}
                      </span>
                    </div>
                    <div className="text-neutral-500 font-medium">
                      Placed:{" "}
                      <span className="text-zinc-900 ml-1 font-bold">
                        {o.date}
                      </span>
                    </div>
                    <div className="font-medium text-neutral-500">
                      Paid:{" "}
                      <span className="font-mono text-zinc-900 font-bold ml-1">
                        ${o.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* items summary mapping */}
                  <div className="space-y-3">
                    {o.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center justify-between text-xs"
                      >
                        <div className="flex gap-3">
                          <img
                            src={it.product.mainImage}
                            alt=""
                            className="w-10 h-13 rounded object-cover border border-brand-beige"
                          />
                          <div>
                            <h4 className="font-bold text-brand-charcoal">
                              {it.product.name}
                            </h4>
                            <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                              Quantity: {it.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-neutral-600">
                          $
                          {(
                            (it.product.salePrice || it.product.price) *
                            it.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* delivery line */}
                  {o.trackingNumber && (
                    <div className="pt-3 border-t border-brand-beige flex justify-between items-center text-xs bg-neutral-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <span className="text-[10px] text-neutral-500 font-medium">
                        Fulfillment tracking:{" "}
                        <strong className="font-mono text-zinc-900 ml-1">
                          {o.trackingNumber}
                        </strong>
                      </span>
                      <a
                        href="https://fedex.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-brand-primary uppercase flex items-center gap-1"
                      >
                        Track Shipment <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- CUSTOMER ADRESSES BOARD --- */}
      {activeTab === "addresses" && (
        <div className="space-y-6" id="account-addresses-tab">
          <div className="flex justify-between items-center border-b border-brand-beige pb-3">
            <h3 className="font-display font-black text-lg text-brand-charcoal uppercase">
              Addresses Directory
            </h3>
            <button className="text-xs uppercase font-extrabold tracking-widest text-brand-teal flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Address
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary Billing address card */}
            <div className="bg-brand-cream/10 border border-brand-primary/25 rounded-2xl p-6 text-left space-y-3 relative">
              <span className="bg-brand-primary text-white text-[9px] uppercase font-black tracking-widest py-0.5 px-2 rounded absolute top-6 right-6">
                Active Default
              </span>
              <h4 className="font-display font-bold text-sm text-brand-charcoal uppercase">
                Flagship Residence
              </h4>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                {userProfile.fullName} <br />
                128 Luxury Boulevard, Apt 4B <br />
                San Francisco, CA 94107 <br />
                United States
              </p>
              <div className="pt-2 text-xs text-neutral-400">
                Contact:{" "}
                <strong className="font-mono tracking-wide text-brand-charcoal">
                  {userProfile.phone}
                </strong>
              </div>
            </div>

            {/* Empty secondary template */}
            <div className="border border-dashed border-brand-beige rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-neutral-50 transition-colors">
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                Register Secondary Destination
              </p>
              <span className="text-[10px] text-neutral-400 font-light">
                E.g. hair stylist salon or corporate office.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- PROFILE FIELDS SAVING --- */}
      {activeTab === "profile" && (
        <div className="space-y-6" id="account-profile-tab">
          <h3 className="font-display font-black text-lg text-brand-charcoal uppercase border-b border-brand-beige pb-3">
            Elite Account Details
          </h3>

          <form
            onSubmit={handleProfileSave}
            className="max-w-2xl bg-white border border-brand-beige p-6 rounded-2xl space-y-6 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Full Couture Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full border border-brand-beige p-3 text-xs rounded-lg bg-neutral-50/50 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full border border-brand-beige p-3 text-xs rounded-lg bg-neutral-50/50 font-mono focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-neutral-500 block">
                Registered Email Address
              </label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full border border-brand-beige p-3 text-xs rounded-lg bg-neutral-50/50 focus:outline-none"
                required
              />
              <span className="text-[10px] text-neutral-400 block font-light">
                Your invoices and shipment tracking logs are dispatched directly
                here.
              </span>
            </div>

            <button
              type="submit"
              className="bg-brand-charcoal text-white text-xs uppercase font-extrabold tracking-widest py-3.5 px-6 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="h-4 w-4" /> Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
