"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  SlidersHorizontal,
  X,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Frown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_PRODUCTS } from "@/data";
import { ProductCard } from "@/components/ProductCard";

export default function Shop() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategoryFilter,
    setActiveCategoryFilter,
  } = useApp();

  // Price range states
  const [maxPrice, setMaxPrice] = useState<number>(500);
  // Rating filter state
  const [minRating, setMinRating] = useState<number | null>(null);
  // Sort states
  const [sortBy, setSortBy] = useState<string>("featured");
  // Sidebar state on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Pagination states
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 8;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchQuery, activeCategoryFilter, maxPrice, minRating, sortBy]);

  // Derived list of categories
  const categoryList = useMemo(() => {
    const list = new Set(SAMPLE_PRODUCTS.map((p) => p.category));
    return Array.from(list);
  }, []);

  // Filter application pipeline
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // 1. Category
      if (
        activeCategoryFilter &&
        product.category !== activeCategoryFilter &&
        product.subcategory !== activeCategoryFilter
      ) {
        return false;
      }
      // 2. Search Box Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      // 3. Price Filter
      const activePrice = product.salePrice || product.price;
      if (activePrice > maxPrice) {
        return false;
      }
      // 4. Rating Filter
      if (minRating && product.rating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const pA = a.salePrice || a.price;
      const pB = b.salePrice || b.price;

      if (sortBy === "lowest") return pA - pB;
      if (sortBy === "highest") return pB - pA;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
      // Default / Featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [activeCategoryFilter, searchQuery, maxPrice, minRating, sortBy]);

  // Paginated items
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPageNum - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPageNum]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategoryFilter(null);
    setMaxPrice(500);
    setMinRating(null);
    setSortBy("featured");
  };

  return (
    <div
      id="shop-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left"
    >
      {/* Page Title & Breadcrumbs header */}
      <div
        id="shop-header"
        className="pb-8 border-b border-brand-beige mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-muted">
            Luxurious Collections
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
            {activeCategoryFilter || "Our Glamour Catalog"}
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Showing{" "}
            <strong className="text-brand-charcoal">
              {filteredProducts.length}
            </strong>{" "}
            luxurious formulations and premium wigs tailored for you.
          </p>
        </div>

        {/* Filters and Sorting bar */}
        <div className="flex items-center gap-3 w-full md:w-auto self-stretch md:self-auto justify-between md:justify-end">
          <button
            id="mobile-filter-toggle"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden border border-brand-beige py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-brand-charcoal hover:bg-neutral-50 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-muted font-bold uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-brand-beige rounded-lg py-2.5 px-4 text-xs font-bold text-brand-charcoal bg-white focus:outline-none focus:border-brand-primary"
            >
              <option value="featured">Featured Picks</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
              <option value="popular">Best Selling</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- DESKTOP FILTER SIDEBAR --- */}
        <aside id="desktop-sidebar" className="hidden lg:block space-y-8">
          {/* Active conditions */}
          {(activeCategoryFilter ||
            searchQuery ||
            maxPrice < 500 ||
            minRating) && (
            <div className="p-4 bg-brand-cream/40 rounded-xl border border-brand-beige space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-brand-charcoal uppercase tracking-widest">
                  Active Filters
                </span>
                <button
                  onClick={resetAllFilters}
                  className="text-[10px] text-brand-primary underline uppercase font-bold"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activeCategoryFilter && (
                  <span className="inline-flex items-center gap-1 bg-white border border-brand-beige text-[11px] font-bold text-brand-charcoal px-2.5 py-1 rounded-md">
                    {activeCategoryFilter}
                    <X
                      className="h-3 w-3 cursor-pointer text-brand-primary"
                      onClick={() => setActiveCategoryFilter(null)}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-white border border-brand-beige text-[11px] font-bold text-brand-charcoal px-2.5 py-1 rounded-md">
                    "{searchQuery}"
                    <X
                      className="h-3 w-3 cursor-pointer text-brand-primary"
                      onClick={() => setSearchQuery("")}
                    />
                  </span>
                )}
                {maxPrice < 500 && (
                  <span className="inline-flex items-center gap-1 bg-white border border-brand-beige text-[11px] font-bold text-brand-charcoal px-2.5 py-1 rounded-md">
                    &lt; ${maxPrice}
                    <X
                      className="h-3 w-3 cursor-pointer text-brand-primary"
                      onClick={() => setMaxPrice(500)}
                    />
                  </span>
                )}
                {minRating && (
                  <span className="inline-flex items-center gap-1 bg-white border border-brand-beige text-[11px] font-bold text-brand-charcoal px-2.5 py-1 rounded-md">
                    ★ {minRating}+
                    <X
                      className="h-3 w-3 cursor-pointer text-brand-primary"
                      onClick={() => setMinRating(null)}
                    />
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Categories Filter Block */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-charcoal pb-2 border-b border-brand-beige">
              Collections
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategoryFilter(null)}
                className={`w-full text-left text-xs uppercase tracking-wider font-extrabold flex items-center justify-between py-1 transition-colors ${!activeCategoryFilter ? "text-brand-primary" : "text-neutral-500 hover:text-brand-charcoal"}`}
              >
                <span>Browse All</span>
                <span className="text-[10px] font-mono font-medium text-neutral-400">
                  ({SAMPLE_PRODUCTS.length})
                </span>
              </button>

              {categoryList.map((cat) => {
                const count = SAMPLE_PRODUCTS.filter(
                  (p) => p.category === cat,
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`w-full text-left text-xs tracking-wide py-1 transition-colors flex items-center justify-between ${activeCategoryFilter === cat ? "text-brand-primary font-bold" : "text-neutral-600 hover:text-brand-charcoal"}`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-charcoal pb-2 border-b border-brand-beige">
              Budget Cap
            </h4>
            <div className="space-y-3">
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-primary cursor-pointer h-1.5 bg-brand-beige rounded-lg"
              />
              <div className="flex justify-between items-center text-xs text-brand-charcoal font-medium">
                <span>$20.00</span>
                <span>
                  Max:{" "}
                  <strong className="font-mono text-brand-primary text-sm font-black">
                    ${maxPrice}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Ratings Filters */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-brand-charcoal pb-2 border-b border-brand-beige">
              Customer Love
            </h4>
            <div className="space-y-2">
              {[5, 4, 3].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`w-full flex items-center justify-between text-xs py-1 transition-colors ${minRating === stars ? "text-brand-primary font-bold animate-pulse" : "text-neutral-600 hover:text-brand-charcoal"}`}
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < stars ? "fill-current" : "text-neutral-200"}`}
                      />
                    ))}
                    <span className="text-neutral-500 font-medium ml-1">
                      and up
                    </span>
                  </div>
                  {minRating === stars && (
                    <Check className="h-3 w-3 text-brand-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- PRODUCT GRID AND EXPERIMENTAL LABELS --- */}
        <main className="lg:col-span-3 space-y-10">
          {filteredProducts.length === 0 ? (
            <div
              id="no-products-view"
              className="py-20 rounded-2xl bg-brand-cream/20 border border-brand-beige flex flex-col items-center justify-center text-center space-y-4 px-6"
            >
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center text-brand-primary">
                <Frown className="h-8 w-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-charcoal uppercase">
                No luxury items matched
              </h3>
              <p className="text-sm text-neutral-500 max-w-sm">
                Try widening your price range, clearing your active search
                query, or browsing alternative collections.
              </p>
              <button
                onClick={resetAllFilters}
                className="bg-brand-primary text-white text-xs uppercase font-extrabold tracking-widest py-3:: px-6 rounded-lg hover:bg-brand-secondary transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Grid block */}
              <div
                id="shop-products-grid"
                className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  id="shop-pagination"
                  className="flex items-center justify-center gap-2 pt-6 border-t border-brand-beige"
                >
                  <button
                    onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                    disabled={currentPageNum === 1}
                    className="p-2 border border-brand-beige rounded-lg hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4 text-brand-charcoal" />
                  </button>

                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNo = idx + 1;
                    return (
                      <button
                        key={pageNo}
                        onClick={() => setCurrentPageNum(pageNo)}
                        className={`w-10 h-10 border text-xs font-bold font-mono rounded-lg transition-all ${currentPageNum === pageNo ? "bg-brand-primary border-brand-primary text-white shadow-md" : "bg-white border-brand-beige text-brand-charcoal hover:bg-neutral-50"}`}
                      >
                        {pageNo}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPageNum((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPageNum === totalPages}
                    className="p-2 border border-brand-beige rounded-lg hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4 text-brand-charcoal" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* --- MOBILE FILTER SIDE DRAWER --- */}
      {isSidebarOpen && (
        <div id="mobile-filter-drawer" className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer contents */}
          <div className="fixed top-0 bottom-0 left-0 w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-brand-beige">
                <h3 className="font-display font-black text-sm uppercase tracking-widest text-brand-charcoal">
                  Filters
                </h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-full text-brand-charcoal hover:bg-brand-cream"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Collections list for mobile */}
              <div className="space-y-4">
                <h4 className="font-display font-medium text-xs uppercase tracking-widest text-[#000000]">
                  Collections
                </h4>
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setActiveCategoryFilter(null);
                      setIsSidebarOpen(false);
                    }}
                    className={`block w-full text-left text-xs uppercase tracking-wider font-extrabold ${!activeCategoryFilter ? "text-brand-primary" : "text-neutral-500"}`}
                  >
                    Browse All ({SAMPLE_PRODUCTS.length})
                  </button>
                  {categoryList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategoryFilter(cat);
                        setIsSidebarOpen(false);
                      }}
                      className={`block w-full text-left text-xs ${activeCategoryFilter === cat ? "text-brand-primary font-bold" : "text-neutral-600"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter for mobile */}
              <div className="space-y-4">
                <h4 className="font-display font-medium text-xs uppercase tracking-widest text-brand-charcoal">
                  Budget Cap
                </h4>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-brand-primary"
                />
                <div className="text-xs text-neutral-500 font-bold">
                  Max:{" "}
                  <strong className="font-mono text-brand-primary text-sm">
                    ${maxPrice}
                  </strong>
                </div>
              </div>

              {/* Rating level */}
              <div className="space-y-4">
                <h4 className="font-display font-medium text-xs uppercase tracking-widest text-brand-charcoal">
                  Customer Love
                </h4>
                {[5, 4, 3].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => {
                      setMinRating(stars);
                      setIsSidebarOpen(false);
                    }}
                    className="flex justify-between items-center w-full text-left text-xs text-neutral-600 py-1"
                  >
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < stars ? "fill-current" : "text-neutral-200"}`}
                        />
                      ))}
                      <span className="text-neutral-500 ml-1">and up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="bg-brand-primary text-white text-xs font-bold uppercase tracking-widest w-full py-4 rounded-lg hover:bg-brand-secondary text-center"
            >
              Apply Selected Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
