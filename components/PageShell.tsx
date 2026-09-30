"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  return (
    <div className="min-h-screen bg-white text-brand-charcoal">
      {isAdminRoute ? null : isAuthRoute ? (
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-brand-charcoal transition-colors hover:text-brand-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-charcoal text-brand-primary shadow-sm">
              <Crown className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl sm:text-lg font-extrabold tracking-tight text-brand-charcoal">
                TIMELESS <span className="text-brand-primary">TRENDS</span>
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.20em] text-neutral-400">
                Hair &amp; Cosmetics
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-charcoal transition-colors hover:text-brand-primary"
          >
            Go to Home
          </Link>
        </header>
      ) : (
        <Navigation />
      )}

      {isAdminRoute ? (
        <main className="min-h-screen bg-brand-cream/30">{children}</main>
      ) : isAuthRoute ? (
        <main className="px-4 pb-12 pt-2 sm:px-6 lg:px-8 bg-amber-50">
          <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-brand-beige/50 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]">
            {children}
          </div>
        </main>
      ) : (
        <div className="mt-6">{children}</div>
      )}

      {!isAuthRoute && !isAdminRoute && <Footer />}
    </div>
  );
}
