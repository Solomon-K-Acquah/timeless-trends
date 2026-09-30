"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Boxes,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SAMPLE_PRODUCTS } from "@/data";
import { showAdminToast } from "./admin-interactions";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "8" },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: Activity },
  { label: "Content studio", href: "/admin/content", icon: Sparkles },
  { label: "Discounts", href: "/admin/discounts", icon: ShoppingBag },
  { label: "Store settings", href: "/admin/settings", icon: Settings2 },
];

const quickLinks = [
  ...navigation,
  { label: "Our story and storefront pages", href: "/admin/content", icon: Sparkles },
  { label: "Stories and blog posts", href: "/admin/content?tab=stories", icon: Sparkles },
  { label: "FAQs and customer messages", href: "/admin/content?tab=help", icon: CircleHelp },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"notifications" | "profile" | null>(null);
  const [unread, setUnread] = useState(true);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    const links = quickLinks.filter((item) => item.label.toLocaleLowerCase().includes(normalized)).slice(0, 5);
    const products = SAMPLE_PRODUCTS.filter((item) => item.name.toLocaleLowerCase().includes(normalized)).slice(0, 3).map((item) => ({
      label: item.name,
      href: "/admin/products",
      icon: Package,
    }));
    return [...links, ...products].slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setToast(message);
      window.setTimeout(() => setToast((current) => current === message ? "" : current), 3200);
    };
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        setActiveMenu(null);
      }
    };
    window.addEventListener("admin-toast", onToast);
    window.addEventListener("keydown", onShortcut);
    return () => {
      window.removeEventListener("admin-toast", onToast);
      window.removeEventListener("keydown", onShortcut);
    };
  }, []);

  const profileMenu = (
    <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-[#eeebe8] bg-white p-1.5 shadow-xl">
      <div className="border-b border-[#f1eeeb] px-3 py-2"><p className="text-xs font-semibold">Alex Morgan</p><p className="mt-0.5 text-[10px] text-[#aaa29d]">alex@timelesstrends.com</p></div>
      <Link href="/admin/settings" onClick={() => setActiveMenu(null)} className="block rounded-lg px-3 py-2.5 text-xs text-[#5f5752] hover:bg-[#faf7f5]">Account &amp; store settings</Link>
      <Link href="/admin/content" onClick={() => setActiveMenu(null)} className="block rounded-lg px-3 py-2.5 text-xs text-[#5f5752] hover:bg-[#faf7f5]">Manage storefront content</Link>
      <button type="button" onClick={() => { setActiveMenu(null); showAdminToast("Demo sign out selected. Connect this action to your authentication provider."); }} className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-[#a64f41] hover:bg-[#fdf5f4]">Sign out</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#25211f]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col border-r border-[#eeebe8] bg-white md:flex">
        <Link href="/admin" className="flex h-[76px] items-center gap-3 border-b border-[#f1eeeb] px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#241f1d] text-[#f5b99f]">
            <Sparkles size={19} />
          </span>
          <span className="leading-tight">
            <span className="block text-[14px] font-extrabold tracking-[.14em]">TIMELESS</span>
            <span className="text-[10px] font-medium tracking-[.22em] text-[#a19a95]">TRENDS · STUDIO</span>
          </span>
        </Link>

        <div className="mx-4 mt-5 rounded-xl border border-[#f0ece8] bg-[#fbfaf9] p-2.5">
          <button type="button" aria-label="Store switcher" onClick={() => showAdminToast("Timeless Trends is your active demo store.")} className="flex w-full items-center gap-2.5 text-left">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2e8e1] text-[#a24a2a]">
              <span className="text-xs font-bold">TT</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold">Timeless Trends</span>
              <span className="text-[10px] text-[#a19a95]">Online store</span>
            </span>
            <ChevronDown size={15} className="text-[#aaa29d]" />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#aaa29d]">Workspace</p>
          <nav className="space-y-1" aria-label="Admin navigation">
            {navigation.map(({ label, href, icon: Icon, badge }) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#f6ede8] text-[#9b4527]"
                      : "text-[#6f6863] hover:bg-[#f8f6f4] hover:text-[#282321]"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span className="flex-1">{label}</span>
                  {badge && <span className="rounded-md bg-[#fff] px-1.5 py-0.5 text-[10px] font-semibold text-[#9b4527]">{badge}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-1 border-t border-[#f1eeeb] px-4 py-4">
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#756e69] hover:bg-[#f8f6f4]">
            <Settings2 size={17} strokeWidth={1.8} /> Settings
          </Link>
          <Link href="/admin/content?tab=help" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#756e69] hover:bg-[#f8f6f4]">
            <CircleHelp size={17} strokeWidth={1.8} /> Help &amp; support
          </Link>
          <Link href="/admin/settings" className="mt-3 flex items-center gap-3 border-t border-[#f1eeeb] px-2 pt-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#272220] text-[11px] font-semibold text-white">AM</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold">Alex Morgan</span>
              <span className="text-[10px] text-[#a19a95]">Store owner</span>
            </span>
            <ChevronLeft size={15} className="rotate-[-90deg] text-[#aaa29d]" />
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-[280px] bg-white p-5 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-extrabold tracking-[.12em]">TIMELESS TRENDS</span>
              <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={19} /></button>
            </div>
            <nav className="space-y-1" aria-label="Mobile admin navigation">
              {navigation.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${pathname === href ? "bg-[#f6ede8] text-[#9b4527]" : "text-[#6f6863]"}`}>
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="md:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-[#eeebe8] bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg p-2 text-[#6f6863] hover:bg-[#f7f4f1] md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden items-center gap-2 text-xs text-[#aaa29d] sm:flex">
              <span>Store</span><span>/</span><span className="font-medium text-[#49423e]">{navigation.find((item) => item.href === pathname)?.label ?? (pathname.includes("/products/new") ? "New product" : "Overview")}</span>
            </div>
            <span className="text-sm font-bold tracking-[.1em] sm:hidden">TIMELESS</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden h-9 w-56 items-center gap-2 rounded-lg border border-[#eeebe8] bg-[#fcfbfa] px-3 md:flex">
              <Search size={15} className="text-[#aaa29d]" />
              <input ref={searchRef} aria-label="Search admin" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." className="w-full bg-transparent text-xs outline-none placeholder:text-[#aaa29d]" />
              <kbd className="rounded border border-[#eae6e2] px-1 py-0.5 text-[9px] text-[#aaa29d]">⌘ K</kbd>
              {query.trim() && <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border border-[#eeebe8] bg-white p-1.5 shadow-xl">{results.length ? results.map(({ label, href, icon: Icon }) => <Link key={`${label}-${href}`} href={href} onClick={() => setQuery("")} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] text-[#5f5752] hover:bg-[#faf7f5]"><Icon size={14} className="text-[#a75537]" /><span className="truncate">{label}</span></Link>) : <p className="px-3 py-3 text-[11px] text-[#8f8781]">No matching pages or products.</p>}</div>}
            </div>
            <div className="relative">
              <button type="button" aria-label="Notifications" aria-expanded={activeMenu === "notifications"} onClick={() => setActiveMenu(activeMenu === "notifications" ? null : "notifications")} className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#eeebe8] text-[#766e68] hover:bg-[#faf8f6]">
                <Bell size={17} />{unread && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c55f3a]" />}
              </button>
              {activeMenu === "notifications" && <div className="absolute right-0 top-11 z-50 w-[310px] rounded-xl border border-[#eeebe8] bg-white p-2 shadow-xl"><div className="flex items-center justify-between px-2 py-1.5"><span className="text-xs font-semibold">Notifications</span><button type="button" onClick={() => { setUnread(false); showAdminToast("All notifications marked as read."); }} className="text-[10px] font-semibold text-[#a75537]">Mark all read</button></div><Link href="/admin/orders" onClick={() => { setUnread(false); setActiveMenu(null); }} className="block rounded-lg px-2.5 py-2.5 hover:bg-[#faf7f5]"><span className="block text-[11px] font-medium">8 orders need fulfillment</span><span className="mt-1 block text-[10px] text-[#9a928c]">Your latest customers are waiting for their orders.</span></Link><Link href="/admin/inventory" onClick={() => setActiveMenu(null)} className="block rounded-lg px-2.5 py-2.5 hover:bg-[#faf7f5]"><span className="block text-[11px] font-medium">4 products running low</span><span className="mt-1 block text-[10px] text-[#9a928c]">Review stock before your next campaign.</span></Link><Link href="/admin/content?tab=messages" onClick={() => setActiveMenu(null)} className="block rounded-lg px-2.5 py-2.5 hover:bg-[#faf7f5]"><span className="block text-[11px] font-medium">3 new customer messages</span><span className="mt-1 block text-[10px] text-[#9a928c]">A little care goes a long way.</span></Link></div>}
            </div>
            <span className="hidden h-7 w-px bg-[#eeebe8] sm:block" />
            <div className="relative">
              <button type="button" aria-label="User menu" aria-expanded={activeMenu === "profile"} onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#272220] text-[10px] font-bold text-white sm:hidden">AM</button>
              <button type="button" aria-label="User menu" aria-expanded={activeMenu === "profile"} onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")} className="hidden items-center gap-2 text-xs font-medium sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#272220] text-[10px] font-bold text-white">AM</span>Alex Morgan</button>
              {activeMenu === "profile" && profileMenu}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">{children}</main>
        <footer className="px-4 pb-6 pt-2 text-center text-[10px] text-[#aaa29d] sm:px-7 lg:px-9">Timeless Trends admin · storefront preview</footer>
      </div>
      {toast && <div role="status" className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-xl border border-[#e8ded6] bg-white px-4 py-3 text-xs text-[#4a403a] shadow-xl">{toast}</div>}
    </div>
  );
}
