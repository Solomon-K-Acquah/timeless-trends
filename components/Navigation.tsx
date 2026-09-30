"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SAMPLE_PRODUCTS } from "../data";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Clock,
  TrendingUp,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navigation() {
  const {
    cart,
    selectedCartItems,
    wishlist,
    currentPage,
    navigateTo,
    updateCartQuantity,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    setActiveCategoryFilter,
    userProfile,
    isLoggedIn,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const cartTotal = selectedCartItems.reduce(
    (sum, item) =>
      sum + (item.product.salePrice || item.product.price) * item.quantity,
    0,
  );
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectedCartItemsCount = selectedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigateTo("shop");
      setIsSearchModalOpen(false);
    }
  };

  const handleCategoryNav = (cat: string) => {
    setActiveCategoryFilter(cat);
    navigateTo("shop");
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };
    if (isSearchModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen]);

  // Reactive quick filter matches
  const filteredProducts =
    searchInput.trim() === ""
      ? []
      : SAMPLE_PRODUCTS.filter((product) => {
          const query = searchInput.toLowerCase();
          return (
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            (product.subcategory &&
              product.subcategory.toLowerCase().includes(query)) ||
            product.description.toLowerCase().includes(query)
          );
        });

  const displayProducts = filteredProducts.slice(0, 5);

  const menuCategories = [
    {
      name: "Hair Collection",
      subcategories: [
        "Human Hair Wigs",
        "Hair Extensions",
        "Glueless Wigs",
        "HD Lace Wigs",
      ],
    },
    {
      name: "Cosmetics & Makeup",
      subcategories: ["Cosmetics", "Makeup", "Lipsticks", "Foundations"],
    },
    {
      name: "Skin & Styling",
      subcategories: ["Skincare", "Hair Care", "Beauty Accessories"],
    },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        id="announce-bar"
        className="bg-brand-charcoal text-white text-xs py-2 px-4 text-center tracking-widest font-medium border-b border-white/5 uppercase flex items-center justify-center gap-2"
      >
        <Sparkles className="h-3.5 w-3.5 text-brand-accent animate-pulse" />
        <span>
          Grand Opening Sale: Use Code{" "}
          <strong className="text-brand-accent">TIMELESS20</strong> for 20% off
          plus free shipping!
        </span>
      </div>

      {/* Sticky Main Header */}
      <header
        id="main-header"
        className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-brand-beige transition-all"
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-1 sm:gap-4">
          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-brand-charcoal hover:text-brand-primary shrink-0"
            aria-label="Open mobile navigation"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Luxury Logo */}
          <div
            id="logo-container"
            onClick={() => navigateTo("home")}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-xs shrink-0">
              <Crown className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 stroke-2" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-base sm:text-2xl font-extrabold tracking-tight text-brand-charcoal group-hover:text-brand-primary transition-colors flex items-center gap-1 leading-none">
                TIMELESS <span className="text-brand-primary">TRENDS</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-neutral-400 font-semibold ml-0.5 mt-0.5 sm:mt-1 leading-none truncate">
                Hair & Cosmetics
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-8"
          >
            <button
              id="nav-home"
              onClick={() => {
                setActiveCategoryFilter(null);
                navigateTo("home");
              }}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary py-2 ${currentPage === "home" ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-charcoal"}`}
            >
              Home
            </button>

            {/* Shop Dropdown & Mega Menu */}
            <div
              id="mega-menu-trigger"
              className="relative py-2"
              onMouseEnter={() => setActiveMegaMenu("shop")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                id="nav-shop"
                onClick={() => {
                  setActiveCategoryFilter(null);
                  navigateTo("shop");
                }}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary flex items-center gap-1 ${currentPage === "shop" ? "text-brand-primary" : "text-brand-charcoal"}`}
              >
                Shop <ChevronDown className="h-3 w-3" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === "shop" && (
                  <motion.div
                    id="shop-mega-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-150 bg-white border border-brand-beige shadow-xl rounded-b-xl p-6 grid grid-cols-3 gap-6 z-50 text-left"
                  >
                    {menuCategories.map((col, idx) => (
                      <div key={idx} id={`megamenu-col-${idx}`}>
                        <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-primary mb-3">
                          {col.name}
                        </h4>
                        <ul className="space-y-2">
                          {col.subcategories.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <button
                                onClick={() => handleCategoryNav(sub)}
                                className="text-sm text-neutral-600 hover:text-brand-teal transition-colors text-left font-normal py-0.5 block"
                              >
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div
                      id="megamenu-cta"
                      className="col-span-3 pt-4 border-t border-brand-beige flex justify-between items-center bg-brand-cream/40 -mx-6 -mb-6 p-4 rounded-b-xl"
                    >
                      <span className="text-xs text-neutral-500 font-medium">
                        ✨ Premium HD Lace hair is now in stock!
                      </span>
                      <button
                        onClick={() => {
                          setActiveMegaMenu(null);
                          handleCategoryNav("Human Hair Wigs");
                        }}
                        className="text-xs font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 uppercase tracking-wider"
                      >
                        Explore Wigs <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-blog"
              onClick={() => navigateTo("blog")}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary py-2 ${currentPage === "blog" || currentPage === "single-blog" ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-charcoal"}`}
            >
              Stories
            </button>

            <button
              id="nav-about"
              onClick={() => navigateTo("about")}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary py-2 ${currentPage === "about" ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-charcoal"}`}
            >
              Our Story
            </button>

            <button
              id="nav-faq"
              onClick={() => navigateTo("faq")}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary py-2 ${currentPage === "faq" ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-charcoal"}`}
            >
              FAQ
            </button>

            <button
              id="nav-contact"
              onClick={() => navigateTo("contact")}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary py-2 ${currentPage === "contact" ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-charcoal"}`}
            >
              Contact
            </button>
          </nav>

          {/* Actions Menu */}
          <div
            id="header-actions"
            className="flex items-center space-x-1 sm:space-x-3"
          >
            {/* Search Trigger Button (Modal-Based) */}
            <button
              id="search-nav-btn"
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-brand-charcoal hover:text-brand-primary transition-colors cursor-pointer"
              aria-label="Open luxury search bar"
            >
              <Search className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
            </button>

            {/* Wishlist Link - Visible on all viewports */}
            <button
              id="wishlist-nav-btn"
              onClick={() => navigateTo("wishlist")}
              className="flex p-2 text-brand-charcoal hover:text-brand-primary transition-colors relative"
              aria-label="Wishlist page"
            >
              <Heart className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
              {wishlist.length > 0 && (
                <span
                  id="wishlist-count-badge"
                  className="absolute top-1 right-1 bg-brand-teal text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center"
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger - ALWAYS visible and premium on mobile */}
            <button
              id="cart-nav-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-brand-charcoal hover:text-brand-primary transition-colors relative"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
              {cartItemsCount > 0 && (
                <span
                  id="cart-count-badge"
                  className="absolute top-1 right-1 bg-brand-primary text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center"
                >
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Profile/Account Portal - Hidden on mobile, added inside Mobile Drawer */}
            <button
              id="profile-nav-btn"
              onClick={() => navigateTo(isLoggedIn ? "account" : "login")}
              className="hidden md:flex p-2 text-brand-charcoal hover:text-brand-primary transition-colors items-center gap-1.5 cursor-pointer"
              aria-label="User Account Dashboard"
            >
              {isLoggedIn ? (
                <>
                  <img
                    src={userProfile.avatar}
                    alt="Account"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-brand-beige"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-brand-charcoal tracking-wide truncate max-w-20">
                    {userProfile.fullName.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  <User className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-brand-charcoal hover:text-brand-primary" />
                  <span className="hidden md:inline text-xs font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-primary">
                    Sign In
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="cart-overlay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Drawer Body */}
            <motion.div
              id="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-brand-beige z-50 shadow-2xl flex flex-col pointer-events-auto"
            >
              <div
                id="cart-drawer-header"
                className="p-6 border-b border-brand-beige flex justify-between items-center bg-brand-cream/30"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-brand-primary" />
                  <h3 className="font-display font-extrabold text-lg text-brand-charcoal uppercase">
                    Your Cart
                  </h3>
                  <span className="text-xs bg-brand-primary/10 text-brand-primary py-0.5 px-2 rounded-full font-bold">
                    {selectedCartItemsCount} of {cartItemsCount} selected
                  </span>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-brand-charcoal hover:bg-neutral-100 hover:text-brand-primary transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div
                id="cart-drawer-items"
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {cart.length === 0 ? (
                  <div
                    id="empty-cart-drawer"
                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center text-brand-accent">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-charcoal">
                      Your bag is empty
                    </h4>
                    <p className="text-sm text-neutral-500 max-w-xs">
                      Indulge in premium human hair collections and glowing
                      serum cosmetics designed for your custom radiance.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo("shop");
                      }}
                      className="bg-brand-primary text-white text-xs uppercase font-extrabold tracking-widest py-3 px-6 rounded-lg hover:bg-brand-secondary transition-all"
                    >
                      Shop Best Sellers
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      id={`cart-drawer-item-${item.id}`}
                      className="flex gap-4 border-b border-brand-beige pb-4 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.product.mainImage}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-lg border border-brand-beige"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4
                              className="text-sm font-bold text-brand-charcoal hover:text-brand-primary cursor-pointer line-clamp-1"
                              onClick={() => {
                                setIsCartOpen(false);
                                navigateTo("product-details", {
                                  productId: item.product.id,
                                });
                              }}
                            >
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-muted hover:text-red-600 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Selected Variants display */}
                          {Object.keys(item.selectedVariant).length > 0 && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-neutral-muted font-medium">
                              {Object.entries(item.selectedVariant).map(
                                ([k, v]) => (
                                  <span key={k}>
                                    {k}:{" "}
                                    <strong className="text-brand-charcoal">
                                      {v}
                                    </strong>
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-brand-beige rounded-md bg-neutral-50">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 text-neutral-500 hover:text-brand-primary transition-all"
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
                              className="p-1.5 text-neutral-500 hover:text-brand-primary transition-all"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Cost */}
                          <span className="font-mono text-sm font-extrabold text-brand-charcoal">
                            $
                            {(
                              (item.product.salePrice || item.product.price) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && (
                <div
                  id="cart-drawer-footer"
                  className="p-6 border-t border-brand-beige bg-neutral-50 space-y-4"
                >
                  <div className="flex justify-between items-center text-brand-charcoal">
                    <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                      Selected subtotal
                    </span>
                    <span className="font-mono text-lg font-black">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-muted text-center italic">
                    Choose which items to purchase from your cart. The rest
                    will stay saved for later.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo("cart");
                      }}
                      className="border border-brand-primary text-brand-primary py-3 px-4 rounded-lg uppercase tracking-widest font-extrabold text-[11px] text-center hover:bg-brand-cream transition-colors"
                    >
                      View Cart Bag
                    </button>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo("checkout");
                      }}
                      disabled={selectedCartItems.length === 0}
                      className="bg-brand-primary text-white py-3 px-4 rounded-lg uppercase tracking-widest font-extrabold text-[11px] text-center hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {selectedCartItemsCount > 0 ? "Checkout Now" : "Select in Cart"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backer */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden pointer-events-auto"
            />

            {/* Menu Body */}
            <motion.div
              id="mobile-drawer-body"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-xs bg-white border-r border-brand-beige z-50 shadow-2xl p-6 lg:hidden flex flex-col justify-between pointer-events-auto"
            >
              <div>
                <div
                  id="mobile-drawer-header"
                  className="flex justify-between items-center pb-6 border-b border-brand-beige mb-4"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-charcoal flex items-center justify-center text-brand-primary shrink-0">
                      <Crown className="h-4.5 w-4.5 stroke-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-base text-brand-charcoal leading-none">
                        TIMELESS TRENDS
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold mt-1 leading-none">
                        HAIR & COSMETICS
                      </span>
                    </div>
                  </div>
                  <button
                    id="close-mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-full text-brand-charcoal hover:bg-brand-cream transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <button
                  id="mobile-drawer-auth-btn"
                  onClick={() => {
                    navigateTo(isLoggedIn ? "account" : "login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mb-4 flex w-full items-center justify-between rounded-2xl border border-brand-beige bg-brand-cream/60 px-4 py-3 text-left shadow-sm transition-colors hover:border-brand-primary hover:bg-brand-cream"
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-brand-primary">
                      {isLoggedIn ? "My Account" : "Sign In"}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-brand-charcoal">
                      {isLoggedIn
                        ? "Open your VIP dashboard"
                        : "Access your account"}
                    </span>
                  </span>
                  <User className="h-4.5 w-4.5 text-brand-charcoal" />
                </button>

                {/* Mobile Menu Links */}
                <nav id="mobile-nav-routes" className="space-y-4">
                  <button
                    onClick={() => {
                      setActiveCategoryFilter(null);
                      navigateTo("home");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 border-b border-neutral-100"
                  >
                    Home
                  </button>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveCategoryFilter(null);
                        navigateTo("shop");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 border-b border-neutral-100"
                    >
                      Shop Collections
                    </button>
                    {/* Nested quick categories */}
                    <div
                      id="mobile-quick-categories"
                      className="pl-4 space-y-2.5"
                    >
                      {[
                        "Human Hair Wigs",
                        "Hair Extensions",
                        "Hair Care",
                        "Cosmetics",
                        "Makeup",
                        "Beauty Accessories",
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryNav(cat)}
                          className="block text-sm text-neutral-600 hover:text-brand-primary py-0.5 text-left font-medium"
                        >
                          ✦ {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo("blog");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 border-b border-neutral-100 block"
                  >
                    Editorial Blog Stories
                  </button>
                  <button
                    onClick={() => {
                      navigateTo("about");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 border-b border-neutral-100 block"
                  >
                    Our Philosophy
                  </button>
                  <button
                    onClick={() => {
                      navigateTo("faq");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 border-b border-neutral-100 block"
                  >
                    FAQ Support
                  </button>
                  <button
                    onClick={() => {
                      navigateTo("contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-base font-bold text-brand-charcoal hover:text-brand-primary py-1.5 block pb-3"
                  >
                    Contact Stores
                  </button>

                  {/* High fidelity Mobile Profile & Wishlist sections */}
                  <div className="pt-4 border-t border-brand-beige space-y-3">
                    <button
                      onClick={() => {
                        navigateTo("wishlist");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between text-sm font-bold text-brand-charcoal hover:text-brand-primary py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="h-4.5 w-4.5 text-brand-teal" />
                        My Custom Wishlist
                      </span>
                      {wishlist.length > 0 && (
                        <span className="bg-brand-teal text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {wishlist.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        navigateTo(isLoggedIn ? "account" : "login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 text-sm font-bold text-brand-charcoal hover:text-brand-primary py-1"
                    >
                      {isLoggedIn ? (
                        <>
                          <img
                            src={userProfile.avatar}
                            alt="Profile"
                            className="h-5 w-5 rounded-full object-cover border border-brand-beige"
                            referrerPolicy="no-referrer"
                          />
                          <span className="truncate">
                            VIP Client Vault (
                            {userProfile.fullName.split(" ")[0]})
                          </span>
                        </>
                      ) : (
                        <>
                          <User className="h-4.5 w-4.5 text-brand-primary" />
                          <span>VIP Client Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                </nav>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div
                id="mobile-drawer-footer"
                className="pt-6 border-t border-brand-beige text-neutral-500 text-xs text-center space-y-3 bg-neutral-50 -mx-6 -mb-6 p-6"
              >
                <span className="font-semibold block text-brand-charcoal">
                  Exclusive Beauty Hotline:
                </span>
                <span className="block font-mono tracking-wide">
                  +1 (800) Luxury-Hair
                </span>
                <span className="block text-[11px] text-neutral-muted">
                  Available 24/7 for hair styling consultations.
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Beautiful High-Fidelity & Luxury Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div
            id="luxury-search-portal"
            className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center"
          >
            {/* Dark translucent backdrop */}
            <motion.div
              id="search-portal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="absolute inset-0 bg-[#0a0a0b]/60 backdrop-blur-md cursor-pointer pointer-events-auto"
            />

            {/* Sliding modal card */}
            <motion.div
              id="search-portal-card"
              initial={{ opacity: 0, y: -40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white border border-brand-beige shadow-3xl rounded-2xl mt-[8vh] mx-4 overflow-hidden flex flex-col z-10 pointer-events-auto"
            >
              {/* Header input block */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative border-b border-brand-beige flex items-center bg-[#faf9f6]/40"
              >
                <Search className="absolute left-5 text-neutral-400 h-5.5 w-5.5 pointer-events-none stroke-2" />
                <input
                  id="search-modal-input"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search and discover luxurious wigs, extensions, soft cosmetics..."
                  className="w-full pl-14 pr-12 py-5 text-brand-charcoal placeholder-neutral-400 bg-transparent text-sm sm:text-base font-display font-light focus:outline-none focus:ring-0 border-0"
                  autoFocus
                />

                <button
                  id="search-modal-close"
                  type="button"
                  onClick={() => {
                    if (searchInput) {
                      setSearchInput("");
                    } else {
                      setIsSearchModalOpen(false);
                    }
                  }}
                  className="absolute right-4 p-1.5 text-neutral-400 hover:text-brand-charcoal hover:bg-neutral-100 transition-colors rounded-full"
                  aria-label="Reset or close search"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </form>

              {/* Scrollable results body */}
              <div
                id="search-modal-body"
                className="p-6 overflow-y-auto max-h-[50vh] sm:max-h-[60vh] space-y-6"
              >
                {searchInput.trim() === "" ? (
                  // Empty State Suggestions
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-teal flex items-center gap-1.5 leading-none">
                        <TrendingUp className="h-3.5 w-3.5" /> Trending Searches
                      </span>
                      <div className="flex flex-col gap-1">
                        {[
                          "Invisible Lace Front",
                          "Glueless styling bob",
                          "Brazilian Virgin Hair",
                          "Lipsticks",
                          "Hydrating Serum",
                        ].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setSearchInput(term)}
                            className="flex items-center gap-2 text-xs text-neutral-600 hover:text-brand-primary py-2 px-3 rounded-lg hover:bg-brand-cream/30 transition-all font-medium text-left cursor-pointer"
                          >
                            <Search className="h-3.5 w-3.5 text-neutral-300" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-primary flex items-center gap-1.5 leading-none">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />{" "}
                        Suggested Categories
                      </span>
                      <div className="flex flex-col gap-1">
                        {[
                          {
                            name: "HD Lace Wigs Collection",
                            cat: "HD Lace Wigs",
                            total: "Premium glueless bundles",
                          },
                          {
                            name: "Human Hair Wigs",
                            cat: "Human Hair Wigs",
                            total: "Raw premium natural hair",
                          },
                          {
                            name: "Cream & Makeup Care",
                            cat: "Makeup",
                            total: "Nourishing dynamic lip shades",
                          },
                          {
                            name: "Beauty & Accessories",
                            cat: "Beauty Accessories",
                            total: "Professional application sets",
                          },
                        ].map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => {
                              setActiveCategoryFilter(item.cat);
                              navigateTo("shop");
                              setIsSearchModalOpen(false);
                            }}
                            className="flex flex-col p-2.5 rounded-lg hover:bg-brand-cream/30 border border-transparent hover:border-brand-beige/50 text-left transition-all cursor-pointer"
                          >
                            <span className="text-xs font-bold text-brand-charcoal">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-light mt-0.5">
                              {item.total}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Search query active state
                  <div className="space-y-4">
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
                          <span>
                            Quick Product Matches ({filteredProducts.length})
                          </span>
                          <span className="font-mono text-[9px] font-normal lowercase tracking-normal bg-neutral-100 py-0.5 px-2 rounded-md">
                            Press [Enter] to submit full query
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {displayProducts.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                setIsSearchModalOpen(false);
                                setSearchInput("");
                                navigateTo("product-details", {
                                  productId: product.id,
                                });
                              }}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-cream/30 border border-transparent hover:border-brand-beige/50 hover:shadow-xs transition-all duration-300 cursor-pointer group text-left"
                            >
                              {/* Product Thumbnail */}
                              <div className="w-11 h-13 bg-neutral-50 border border-brand-beige rounded-lg overflow-hidden shrink-0">
                                <img
                                  src={product.mainImage}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Text & Categories */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-teal bg-brand-cream/50 py-0.5 px-1.5 rounded">
                                    {product.category}
                                  </span>
                                  {product.subcategory && (
                                    <span className="text-[9px] text-neutral-400 tracking-wide">
                                      ✦ {product.subcategory}
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal group-hover:text-brand-primary transition-colors line-clamp-1 mt-1">
                                  {product.name}
                                </h4>
                              </div>

                              {/* Price block */}
                              <div className="text-right shrink-0">
                                {product.salePrice ? (
                                  <div className="flex flex-col items-end leading-tight">
                                    <span className="text-xs font-mono font-extrabold text-brand-teal">
                                      ${product.salePrice}
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-400 line-through">
                                      ${product.price}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs font-mono font-extrabold text-brand-charcoal">
                                    ${product.price}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery(searchInput.trim());
                              navigateTo("shop");
                              setIsSearchModalOpen(false);
                            }}
                            className="w-full bg-brand-charcoal text-white hover:bg-brand-primary transition-colors text-xs uppercase font-extrabold tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            Explore all matches ({filteredProducts.length}){" "}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // No products match
                      <div className="py-10 text-center space-y-4">
                        <div className="w-12 h-12 bg-neutral-50 border border-brand-beige rounded-full flex items-center justify-center text-neutral-300 mx-auto">
                          <Search className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-brand-charcoal">
                            No Matching Products Found
                          </p>
                          <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                            We couldn't locate any items matching "
                            <span className="font-mono text-neutral-600 font-semibold">
                              {searchInput}
                            </span>
                            ". Try searching for simpler terms like "lace",
                            "bob", "hair", or "lipstick".
                          </p>
                        </div>

                        {/* Fallback instant suggestions */}
                        <div className="pt-5 border-t border-brand-beige/50 max-w-md mx-auto">
                          <span className="text-[9px] uppercase font-black text-neutral-400 tracking-wider block mb-2.5">
                            Try our trending products:
                          </span>
                          <div className="flex justify-center gap-2 flex-wrap">
                            {[
                              "HD Lace",
                              "Glueless Wigs",
                              "Serum",
                              "Lipsticks",
                            ].map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setSearchInput(t)}
                                className="text-[10px] uppercase font-semibold tracking-wider py-1.5 px-3 rounded-lg border border-brand-beige bg-white text-neutral-500 hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
