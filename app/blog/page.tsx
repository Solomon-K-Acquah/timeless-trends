"use client";

import React, { useState, useMemo } from "react";
import { Search, Clock, ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_BLOGS } from "@/data";

export default function Blog() {
  const { navigateTo } = useApp();
  const [blogSearch, setBlogSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Derive categories list dynamically
  const categoriesList = useMemo(() => {
    return Array.from(new Set(SAMPLE_BLOGS.map((b) => b.category)));
  }, []);

  // Filter pipeline
  const filteredBlogs = useMemo(() => {
    return SAMPLE_BLOGS.filter((b) => {
      if (activeCategory && b.category !== activeCategory) {
        return false;
      }
      if (blogSearch.trim()) {
        const query = blogSearch.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(query);
        const matchesExcerpt = b.excerpt.toLowerCase().includes(query);
        const matchesCategory = b.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, blogSearch]);

  const featuredBlog =
    SAMPLE_BLOGS.find((b) => b.isFeatured) || SAMPLE_BLOGS[0];

  return (
    <div
      id="blog-directory-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left"
    >
      {/* Page Title */}
      <div
        id="blog-header"
        className="pb-6 border-b border-brand-beige flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">
            Lace, Skin & Science
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-none mt-1">
            Editorial Stories
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Inside the master files of elite salon hair stylists and cosmetic
            formulation chemists.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              className="border border-brand-beige rounded-lg py-2.5 pl-4 pr-10 text-xs w-full sm:w-60 focus:outline-none focus:border-brand-primary bg-white"
            />
            <Search className="h-4 w-4 text-neutral-400 absolute right-3" />
          </div>

          <div className="flex gap-2.5 overflow-x-auto self-start">
            <button
              onClick={() => setActiveCategory(null)}
              className={`py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${!activeCategory ? "bg-brand-primary border-brand-primary text-white shadow-xs" : "bg-neutral-50 border-brand-beige text-neutral-600 hover:bg-neutral-100"}`}
            >
              All Stories
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${activeCategory === cat ? "bg-brand-primary border-brand-primary text-white shadow-xs" : "bg-neutral-50 border-brand-beige text-neutral-600 hover:bg-neutral-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. LARGE HERO ARTICLE SPOTLIGHT */}
      {!activeCategory && !blogSearch && (
        <section
          className="bg-brand-cream/30 border border-brand-beige rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          id="featured-blog-panel"
        >
          <div
            className="col-span-12 lg:col-span-7 aspect-16/10 bg-neutral-100 cursor-pointer overflow-hidden"
            onClick={() =>
              navigateTo("single-blog", { blogId: featuredBlog.id })
            }
          >
            <motion.img
              src={featuredBlog.mainImage}
              alt={featuredBlog.title}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="col-span-12 lg:col-span-5 p-6 sm:p-8 space-y-4">
            <span className="bg-brand-primary text-white text-[9px] uppercase font-black tracking-widest py-1 px-2.5 rounded-md inline-block">
              ⭐️ Featured Spotlight
            </span>

            <h2
              onClick={() =>
                navigateTo("single-blog", { blogId: featuredBlog.id })
              }
              className="font-display font-black text-2xl sm:text-3.5xl text-brand-charcoal uppercase leading-tight hover:text-brand-primary cursor-pointer transition-colors"
            >
              {featuredBlog.title}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
              {featuredBlog.excerpt}
            </p>

            <div className="flex items-center gap-3 text-xs pt-2">
              <img
                src={featuredBlog.authorAvatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover border"
              />
              <div>
                <span className="font-bold text-brand-charcoal block">
                  {featuredBlog.author}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  {featuredBlog.authorRole}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-brand-beige text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-brand-accent pb-0.5" />{" "}
                {featuredBlog.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-brand-accent pb-0.5" />{" "}
                {featuredBlog.readTime}
              </span>
              <button
                onClick={() =>
                  navigateTo("single-blog", { blogId: featuredBlog.id })
                }
                className="font-extrabold uppercase tracking-widest text-brand-accent hover:text-brand-charcoal flex items-center gap-1 text-[11px]"
              >
                Read Now <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. REGULAR GRIDS OF STORIES */}
      <section className="space-y-6" id="blog-grid-section">
        {filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-500 italic border border-dashed rounded-xl border-brand-beige bg-neutral-50">
            No beauty articles matched your active search conditions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <div
                key={post.id}
                id={`article-card-${post.id}`}
                className="bg-white border border-brand-beige rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-lg transition-transform duration-300"
              >
                <div
                  onClick={() => navigateTo("single-blog", { blogId: post.id })}
                  className="aspect-16/10 bg-neutral-100 overflow-hidden relative"
                >
                  <img
                    src={post.mainImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-white border border-brand-beige text-[9px] uppercase font-black tracking-widest py-0.5 px-2 rounded text-brand-charcoal">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() =>
                        navigateTo("single-blog", { blogId: post.id })
                      }
                      className="font-display font-bold text-base text-brand-charcoal hover:text-brand-primary line-clamp-2 leading-snug"
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-light line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-beige flex justify-between items-center text-xs text-neutral-400">
                    <span className="font-medium font-mono text-[10px] text-brand-accent">
                      ✦ BY: {post.author.toUpperCase().split(" ")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-brand-primary" />{" "}
                      {post.readTime}
                    </span>
                    <button
                      onClick={() =>
                        navigateTo("single-blog", { blogId: post.id })
                      }
                      className="text-[10px] font-black uppercase text-brand-charcoal tracking-widest hover:text-brand-primary"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
