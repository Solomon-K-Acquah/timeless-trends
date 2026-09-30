"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, CartItem, BlogPost, Order, Address } from "../types";
import { SAMPLE_PRODUCTS, PRESET_ORDERS } from "../data";

export type ActivePage =
  | "home"
  | "shop"
  | "product-details"
  | "cart"
  | "checkout"
  | "wishlist"
  | "account"
  | "about"
  | "contact"
  | "blog"
  | "single-blog"
  | "faq"
  | "terms"
  | "privacy"
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  currentPage: ActivePage;
  navigateTo: (
    page: ActivePage,
    options?: { productId?: string; blogId?: string },
  ) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;

  // Cart
  cart: CartItem[];
  selectedCartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedVariant: Record<string, string>,
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  toggleCartItemSelection: (cartItemId: string) => void;
  selectAllCartItems: (isSelected: boolean) => void;
  clearCart: () => void;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  discountPercentage: number;
  deliveryFee: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (category: string | null) => void;

  // Account
  orders: Order[];
  addNewOrder: (address: Address, paymentMethod: string) => Order | null;
  userProfile: {
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  updateUserProfile: (profile: {
    fullName: string;
    email: string;
    phone: string;
  }) => void;

  // Auth
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => boolean;
  logout: () => void;
  forgotPassword: (email: string) => boolean;
  resetPassword: (password: string) => boolean;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<ActivePage>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const defaultProfile = {
    fullName: "Kofi Frankie",
    email: "kofifrankie@gmail.com",
    phone: "+1 (555) 349-2041",
    avatar:
      "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=150",
  };

  // Persistence using standard local storage
  const [cart, setCart] = useState<CartItem[]>([]);
  const selectedCartItems = cart.filter((item) => item.isSelected !== false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(PRESET_ORDERS);

  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    string | null
  >(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState(defaultProfile);

  const deliveryFee = 15;

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedCart = localStorage.getItem("tt_cart");
      const savedWishlist = localStorage.getItem("tt_wishlist");
      const savedOrders = localStorage.getItem("tt_orders");
      const savedLoggedIn = localStorage.getItem("tt_is_logged_in");
      const savedProfile = localStorage.getItem("tt_user_profile");

      if (savedCart) {
        const savedItems = JSON.parse(savedCart) as CartItem[];
        setCart(
          savedItems.map((item) => ({
            ...item,
            isSelected: item.isSelected !== false,
          })),
        );
      }
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedLoggedIn) setIsLoggedIn(savedLoggedIn === "true");
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    } catch {
      // Ignore invalid stored data and keep defaults.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("tt_is_logged_in", String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("tt_user_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("tt_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("tt_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("tt_orders", JSON.stringify(orders));
  }, [orders]);

  // Navigate utility with scroll reset
  const navigateTo = (
    page: ActivePage,
    options?: { productId?: string; blogId?: string },
  ) => {
    setCurrentPage(page);

    const routeMap: Record<ActivePage, string> = {
      home: "/",
      shop: "/shop",
      "product-details": options?.productId
        ? `/product/${options.productId}`
        : "/shop",
      cart: "/cart",
      checkout: "/checkout",
      wishlist: "/wishlist",
      account: "/account",
      about: "/about",
      contact: "/contact",
      blog: "/blog",
      "single-blog": options?.blogId ? `/blog/${options.blogId}` : "/blog",
      faq: "/faq",
      terms: "/terms",
      privacy: "/privacy",
      login: "/login",
      signup: "/signup",
      "forgot-password": "/forgot-password",
      "reset-password": "/reset-password",
    };

    if (options?.productId) setSelectedProductId(options.productId);
    if (options?.blogId) setSelectedBlogId(options.blogId);

    router.push(routeMap[page]);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  // Add toast
  const addToast = (
    message: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart logic
  const addToCart = (
    product: Product,
    quantity: number,
    selectedVariant: Record<string, string>,
  ) => {
    const variantKey = Object.entries(selectedVariant)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${k}:${v}`)
      .join("|");

    const cartItemId = `${product.id}-${variantKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        addToast(`Updated quantity of ${product.name} in cart!`, "info");
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity, isSelected: true }
            : item,
        );
      }
      addToast(`Added ${product.name} to cart!`, "success");
      return [
        ...prev,
        { id: cartItemId, product, quantity, selectedVariant, isSelected: true },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const removedItem = prev.find((item) => item.id === cartItemId);
      if (removedItem) {
        addToast(`Removed ${removedItem.product.name} from cart`, "info");
      }
      return prev.filter((item) => item.id !== cartItemId);
    });
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const toggleCartItemSelection = (cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, isSelected: item.isSelected === false }
          : item,
      ),
    );
  };

  const selectAllCartItems = (isSelected: boolean) => {
    setCart((prev) => prev.map((item) => ({ ...item, isSelected })));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (
      cleanCode === "TIMELESS20" ||
      cleanCode === "LUXURY20" ||
      cleanCode === "COSMETIC20"
    ) {
      setCouponCode(cleanCode);
      setDiscountPercentage(20);
      addToast("Discount code applied: 20% off!", "success");
      return true;
    } else {
      addToast("Invalid coupon code", "error");
      return false;
    }
  };

  // Wishlist logic
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed ${product.name} from wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved ${product.name} to wishlist!`, "success");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product: Product) => {
    // default primary option choices
    const defaultVariant: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaultVariant[v.name] = v.options[0];
      }
    });

    addToCart(product, 1, defaultVariant);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Profile updating
  const updateUserProfile = (profile: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    setUserProfile((prev) => ({
      ...prev,
      ...profile,
    }));
    addToast("Profile changes saved successfully!", "success");
  };

  // Orders creation
  const addNewOrder = (address: Address, paymentMethod: string): Order | null => {
    if (selectedCartItems.length === 0) {
      addToast("Select at least one cart item before checkout.", "error");
      return null;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const subtotal = selectedCartItems.reduce(
      (sum, item) =>
        sum + (item.product.salePrice || item.product.price) * item.quantity,
      0,
    );
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = subtotal - discountAmount + deliveryFee;

    const newOrder: Order = {
      id: `TT-2026-${randomNum}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: "Processing",
      items: [...selectedCartItems],
      total,
      shippingAddress: address,
      paymentMethod,
      trackingNumber: `TRACK-${randomNum}XLT`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    const purchasedItemIds = new Set(selectedCartItems.map((item) => item.id));
    setCart((prev) => prev.filter((item) => !purchasedItemIds.has(item.id)));
    if (cart.length === selectedCartItems.length) {
      setCouponCode("");
      setDiscountPercentage(0);
    }
    addToast(
      selectedCartItems.length === cart.length
        ? "Order placed successfully! Thank you."
        : "Order placed. Your other cart items are saved for later.",
      "success",
    );
    return newOrder;
  };

  // Auth Methods implementation
  const login = (email: string, password: string): boolean => {
    if (!email || !password) {
      addToast("Please fill in all credentials.", "error");
      return false;
    }
    const namePrefix = email.split("@")[0];
    const formattedName =
      namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);

    setIsLoggedIn(true);
    setUserProfile({
      fullName:
        formattedName === "Kofifrankie" ? "Kofi Frankie" : formattedName,
      email: email,
      phone: "+1 (555) 349-2041",
      avatar:
        "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=150",
    });
    addToast("Welcome back! Successful login.", "success");
    return true;
  };

  const signup = (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ): boolean => {
    if (!fullName || !email || !phone || !password) {
      addToast("Please complete the registration form.", "error");
      return false;
    }
    setIsLoggedIn(true);
    setUserProfile({
      fullName,
      email,
      phone,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    });
    addToast("Account registered beautifully. Welcome!", "success");
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Reset back to defaults if we want
    localStorage.removeItem("tt_is_logged_in");
    localStorage.removeItem("tt_user_profile");
    setUserProfile({
      fullName: "Kofi Frankie",
      email: "kofifrankie@gmail.com",
      phone: "+1 (555) 349-2041",
      avatar:
        "https://images.unsplash.com/photo-1595959183075-c1d0a161b03d?auto=format&fit=crop&q=80&w=150",
    });
    addToast("Logged out successfully from your account.", "info");
    navigateTo("home");
  };

  const forgotPassword = (email: string): boolean => {
    if (!email) {
      addToast("Please provide your email address.", "error");
      return false;
    }
    addToast(`Password reset link dispatched securely to ${email}!`, "success");
    return true;
  };

  const resetPassword = (password: string): boolean => {
    if (!password) {
      addToast("Please enter a new password.", "error");
      return false;
    }
    addToast("Password updated successfully! Welcome back.", "success");
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedBlogId,
        setSelectedBlogId,
        cart,
        selectedCartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartItemSelection,
        selectAllCartItems,
        clearCart,
        couponCode,
        applyCoupon,
        discountPercentage,
        deliveryFee,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        searchQuery,
        setSearchQuery,
        activeCategoryFilter,
        setActiveCategoryFilter,
        orders,
        addNewOrder,
        userProfile,
        updateUserProfile,
        isLoggedIn,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
