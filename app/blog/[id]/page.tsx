"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Calendar,
  Send,
  User,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_BLOGS } from "@/data";
import { useApp } from "@/context/AppContext";

export default function BlogDetails() {
  const { selectedBlogId, navigateTo, addToast } = useApp();

  // Find targeted blog post, default to first blog post
  const post = useMemo(() => {
    return SAMPLE_BLOGS.find((b) => b.id === selectedBlogId) || SAMPLE_BLOGS[0];
  }, [selectedBlogId]);

  // Commentary thread state
  const [localComments, setLocalComments] = useState(post.comments);
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Reset comments list when post shifts
  useEffect(() => {
    setLocalComments(post.comments);
    setNewCommentAuthor("");
    setNewCommentText("");
  }, [post]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor || !newCommentText) {
      addToast("Please fill out both name and comment details.", "error");
      return;
    }

    const newComment = {
      id: `bc-new-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      author: newCommentAuthor,
      text: newCommentText,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setLocalComments((prev) => [...prev, newComment]);
    setNewCommentAuthor("");
    setNewCommentText("");
    addToast("Comment published successfully! Thank you.", "success");
  };

  // Find direct alternatives/recommendations (excluding current)
  const relatedArticles = useMemo(() => {
    return SAMPLE_BLOGS.filter((b) => b.id !== post.id).slice(0, 2);
  }, [post]);

  return (
    <div
      id="single-blog-view"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left"
    >
      {/* 1. HEADER SECTION & NAVIGATION */}
      <div id="blog-nav-bar" className="pb-6 border-b border-brand-beige">
        <button
          onClick={() => navigateTo("blog")}
          className="text-xs uppercase font-extrabold tracking-widest text-brand-secondary hover:text-brand-charcoal flex items-center gap-1.5 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Stories Directory
        </button>

        <div className="space-y-4">
          <span className="bg-brand-teal/10 text-brand-teal text-[10px] uppercase font-black tracking-widest py-1 px-3 rounded-full inline-block">
            {post.category}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-charcoal uppercase leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {/* Author info */}
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-brand-beige"
              />
              <div>
                <strong className="text-xs font-bold text-brand-charcoal block">
                  {post.author}
                </strong>
                <span className="text-[10px] text-neutral-400 font-medium block">
                  {post.authorRole}
                </span>
              </div>
            </div>

            {/* Read / date indicators */}
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="h-4 w-4 text-brand-accent pb-0.5" />{" "}
                {post.date}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="h-4 w-4 text-brand-accent pb-0.5" />{" "}
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HERO DECORATION IMAGE */}
      <div
        className="aspect-video rounded-2xl overflow-hidden shadow-md border border-brand-beige bg-neutral-100"
        id="reading-hero-panel"
      >
        <img
          src={post.mainImage}
          alt=""
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3. CORE ARTICLE TEXT BLOCKS */}
      <article
        className="prose max-w-none text-neutral-600 space-y-6 text-sm sm:text-base font-light leading-relaxed text-left"
        id="reading-prose-blocks"
      >
        {post.content.map((pParagraph, idx) => (
          <p
            key={idx}
            className="first-of-type:text-neutral-900 first-of-type:font-medium"
          >
            {pParagraph}
          </p>
        ))}
      </article>

      {/* 4. COMMENTS ACCUMULATION WALL */}
      <section
        className="border-t border-brand-beige pt-10 space-y-8"
        id="blog-comments-pnl"
      >
        <h3 className="font-display font-black text-xl text-brand-charcoal uppercase flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand-primary" /> Story
          Discussion ({localComments.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Discussion list */}
          <div className="md:col-span-7 space-y-6">
            {localComments.length === 0 ? (
              <p className="text-xs text-neutral-500 italic">
                No comments registered yet. Be the first to start the
                discussion!
              </p>
            ) : (
              <div className="space-y-4">
                {localComments.map((com) => (
                  <div
                    key={com.id}
                    className="bg-neutral-50 p-4 border border-brand-beige rounded-xl text-left space-y-2"
                  >
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-extrabold text-brand-charcoal uppercase">
                        {com.author}
                      </span>
                      <span className="text-neutral-400 font-mono">
                        {com.date}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {com.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment submission form */}
          <div className="md:col-span-5 bg-brand-cream/15 border border-brand-beige p-5 rounded-2xl space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-charcoal uppercase">
              Join In the Debate
            </h4>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-neutral-500 block">
                  Your Profile Name
                </label>
                <input
                  type="text"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  placeholder="e.g. Alexis S."
                  className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-neutral-500 block">
                  Your Comment Message
                </label>
                <textarea
                  rows={4}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share your thoughts on HD lace melting tapes, thermal protection creams..."
                  className="w-full border border-brand-beige bg-white text-xs p-3 rounded-lg focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal text-white text-[11px] font-extrabold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-800 flex items-center justify-center gap-1 transition-colors"
              >
                <Send className="h-3 w-3" /> Post Comment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 5. RELATED ARTICLES recommendations */}
      {relatedArticles.length > 0 && (
        <section
          className="border-t border-brand-beige pt-10 space-y-6"
          id="related-blogs-panel"
        >
          <h3 className="font-display font-black text-lg text-brand-charcoal uppercase">
            Alternative Editorial Reads
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="flex gap-4 p-4 border border-brand-beige rounded-xl hover:shadow-md transition-all bg-white cursor-pointer"
                onClick={() =>
                  navigateTo("single-blog", { blogId: article.id })
                }
              >
                <img
                  src={article.mainImage}
                  alt=""
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border shrink-0"
                />
                <div className="space-y-1 my-auto text-left">
                  <span className="text-[9px] text-brand-teal uppercase tracking-wider font-extrabold">
                    {article.category}
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-brand-charcoal hover:text-brand-primary line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
