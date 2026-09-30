"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bell, CreditCard, Globe2, Home, Save, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showAdminToast } from "@/components/admin/admin-interactions";

const storeSchema = z.object({
  name: z.string().trim().min(2, "Store name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid support email."),
  phone: z.string().trim().min(5, "Enter a phone number."),
  address: z.string().trim().min(5, "Enter a store address."),
  businessHours: z.string().trim().min(5, "Add your customer-support hours."),
  currency: z.string().min(1, "Choose a currency."),
  timezone: z.string().min(1, "Choose a time zone."),
});
type StoreValues = z.infer<typeof storeSchema>;
type SettingKey = "guestCheckout" | "collectPhone" | "freeShipping" | "trackingEmails" | "lowStockAlerts" | "orderNotifications" | "homepageHero" | "promotionBanner" | "editorialGallery" | "faqSupportCard";
type SettingValues = Record<SettingKey, boolean>;

const defaults: StoreValues = {
  name: "Timeless Trends",
  email: "hello@timelesstrends.com",
  phone: "+1 (800) 589-7424",
  address: "128 Luxury Boulevard, Suite 500, San Francisco, CA 94107",
  businessHours: "Monday–Saturday, 9:00 AM–8:00 PM; Sunday, 11:00 AM–6:00 PM PST",
  currency: "USD",
  timezone: "America/New_York",
};
const defaultSettings: SettingValues = {
  guestCheckout: true,
  collectPhone: false,
  freeShipping: true,
  trackingEmails: true,
  lowStockAlerts: true,
  orderNotifications: true,
  homepageHero: true,
  promotionBanner: true,
  editorialGallery: true,
  faqSupportCard: true,
};
const storageKey = "timeless-admin-settings-v1";
const persistedSchema = z.object({
  profile: storeSchema.partial().optional(),
  preferences: z.record(z.string(), z.boolean()).optional(),
});
const settingKeys: SettingKey[] = [
  "guestCheckout", "collectPhone", "freeShipping", "trackingEmails", "lowStockAlerts",
  "orderNotifications", "homepageHero", "promotionBanner", "editorialGallery", "faqSupportCard",
];

function subscribeToSettings(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("timeless-admin-settings-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("timeless-admin-settings-change", callback);
  };
}

function getSettingsSnapshot() {
  return window.localStorage.getItem(storageKey);
}

function getServerSettingsSnapshot() {
  return null;
}

function parseSavedSettings(raw: string | null): { data: z.infer<typeof persistedSchema> | null; error: unknown | null } {
  if (raw === null) return { data: null, error: null };
  try {
    const result = persistedSchema.safeParse(JSON.parse(raw));
    return result.success ? { data: result.data, error: null } : { data: null, error: result.error };
  } catch (error) {
    return { data: null, error };
  }
}

const settingsTabs = [
  { label: "Store details", icon: Store },
  { label: "Contact", icon: Bell },
  { label: "Homepage", icon: Home },
  { label: "Checkout", icon: CreditCard },
  { label: "Shipping", icon: Truck },
  { label: "Notifications", icon: Bell },
  { label: "Regional", icon: Globe2 },
];

const inputClass = "mt-1.5 h-10 w-full rounded-lg border border-[#e9e4df] bg-white px-3 text-xs outline-none focus:border-[#c07b61] focus:ring-2 focus:ring-[#c07b61]/10";

export default function SettingsPage() {
  const [tab, setTab] = useState("Store details");
  const storedRaw = useSyncExternalStore(subscribeToSettings, getSettingsSnapshot, getServerSettingsSnapshot);
  const persisted = useMemo(() => parseSavedSettings(storedRaw), [storedRaw]);
  const settings = useMemo(() => Object.fromEntries(
    settingKeys.map((key) => [key, persisted.data?.preferences?.[key] ?? defaultSettings[key]]),
  ) as SettingValues, [persisted]);
  const savedProfile = useMemo(() => ({ ...defaults, ...persisted.data?.profile }), [persisted]);
  const saved = storedRaw !== null && persisted.error === null;
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<StoreValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    if (storedRaw === null) return;
    if (persisted.error) {
      console.error("Saved admin settings have an invalid format.", persisted.error);
      showAdminToast("Saved settings could not be loaded because their format is invalid.");
      return;
    }
    if (persisted.data?.profile) reset({ ...defaults, ...persisted.data.profile });
  }, [storedRaw, persisted, reset]);

  const persist = (profile: StoreValues, preferences: SettingValues) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ profile, preferences }));
      window.dispatchEvent(new Event("timeless-admin-settings-change"));
      return true;
    } catch (error) {
      console.error("Unable to save admin settings.", error);
      showAdminToast("Settings could not be saved in this browser.");
      return false;
    }
  };
  const toggle = (key: SettingKey) => {
    const nextSettings = { ...settings, [key]: !settings[key] };
    persist(savedProfile, nextSettings);
  };
  const saveProfile = handleSubmit((values) => {
    if (persist(values, settings)) showAdminToast(`${values.name} ${tab.toLowerCase()} settings saved in this browser.`);
  });
  const savePreferences = () => {
    if (persist(savedProfile, settings)) showAdminToast(`${tab} preferences saved in this browser.`);
  };

  const preferenceGroups: Record<string, { key: SettingKey; title: string; description: string }[]> = {
    Homepage: [
      { key: "homepageHero", title: "Show homepage hero", description: "Display the published hero section at the top of the storefront." },
      { key: "promotionBanner", title: "Show promotional placements", description: "Display the active announcement and advertising placements." },
      { key: "editorialGallery", title: "Show editorial gallery", description: "Display the latest brand and community stories on the homepage." },
      { key: "faqSupportCard", title: "Show FAQ support card", description: "Include the concierge support panel on the FAQ page." },
    ],
    Checkout: [
      { key: "guestCheckout", title: "Allow guest checkout", description: "Let customers place an order without creating an account." },
      { key: "collectPhone", title: "Require customer phone", description: "Ask for a phone number during checkout." },
    ],
    Shipping: [
      { key: "freeShipping", title: "Free shipping over $100", description: "Show complimentary domestic shipping for qualifying carts." },
      { key: "trackingEmails", title: "Send tracking updates", description: "Send customers a demo notification when shipment status changes." },
    ],
    Notifications: [
      { key: "lowStockAlerts", title: "Low-stock alerts", description: "Notify the store team when inventory reaches its threshold." },
      { key: "orderNotifications", title: "New order notifications", description: "Notify the store team when a customer places an order." },
    ],
  };
  const isProfileTab = tab === "Store details" || tab === "Contact" || tab === "Regional";

  return (
    <div className="space-y-6">
      <div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Workspace</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Store settings</h1><p className="mt-1 text-sm text-[#8b837d]">Set the details and storefront preferences that make your store yours.</p></div>
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Settings sections" className="flex gap-1 overflow-x-auto rounded-xl border border-[#eeebe8] bg-white p-2 lg:flex-col lg:self-start">
          {settingsTabs.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setTab(label)} className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] font-medium transition ${tab === label ? "bg-[#f6ede8] text-[#9b4527]" : "text-[#77706b] hover:bg-[#faf8f6]"}`}><Icon size={15} />{label}</button>)}
        </nav>
        <section className="rounded-xl border border-[#eeebe8] bg-white p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-[#f1eeeb] pb-4"><div><h2 className="text-sm font-semibold">{tab}</h2><p className="mt-1 text-[11px] text-[#9a928c]">{tab === "Homepage" ? "Choose which published storefront modules appear in the demo." : isProfileTab ? "Manage public store identity, contact channels, and regional defaults." : `Configure your ${tab.toLocaleLowerCase()} experience.`}</p></div><p role="status" className="text-[10px] text-[#7d877b]">{saved ? "Saved in this browser" : "Not saved yet"}</p></div>
          {isProfileTab ? <form onSubmit={saveProfile} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {tab !== "Regional" && <><label className="text-[11px] font-medium text-[#5e5651] sm:col-span-2">Store name<input {...register("name")} className={inputClass} />{errors.name && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.name.message}</span>}</label><label className="text-[11px] font-medium text-[#5e5651]">Customer support email<input {...register("email")} className={inputClass} />{errors.email && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.email.message}</span>}</label><label className="text-[11px] font-medium text-[#5e5651]">Customer support phone<input {...register("phone")} className={inputClass} />{errors.phone && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.phone.message}</span>}</label></>}
              {tab === "Contact" && <><label className="text-[11px] font-medium text-[#5e5651] sm:col-span-2">Store address<input {...register("address")} className={inputClass} />{errors.address && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.address.message}</span>}</label><label className="text-[11px] font-medium text-[#5e5651] sm:col-span-2">Support and business hours<textarea {...register("businessHours")} rows={3} className="mt-1.5 w-full rounded-lg border border-[#e9e4df] px-3 py-2.5 text-xs outline-none focus:border-[#c07b61]" />{errors.businessHours && <span className="mt-1 block text-[10px] text-[#b34235]">{errors.businessHours.message}</span>}</label></>}
              {tab !== "Contact" && <><label className="text-[11px] font-medium text-[#5e5651]">Store currency<select {...register("currency")} className={inputClass}><option value="USD">USD · US Dollar</option><option value="CAD">CAD · Canadian Dollar</option><option value="GBP">GBP · British Pound</option><option value="EUR">EUR · Euro</option></select></label><label className="text-[11px] font-medium text-[#5e5651]">Time zone<select {...register("timezone")} className={inputClass}><option value="America/New_York">Eastern Time · New York</option><option value="America/Chicago">Central Time · Chicago</option><option value="America/Los_Angeles">Pacific Time · Los Angeles</option><option value="Europe/London">London</option></select></label></>}
            </div>
            <div className="flex justify-end border-t border-[#f1eeeb] pt-4"><Button type="submit" className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Save size={14} /> {isDirty ? "Save changes" : "Save settings"}</Button></div>
          </form> : <div className="space-y-1">{(preferenceGroups[tab] ?? []).map(({ key, title, description }) => <button type="button" key={key} role="switch" aria-checked={settings[key]} onClick={() => toggle(key)} className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-4 text-left hover:bg-[#fcfbfa]"><span><span className="block text-xs font-medium">{title}</span><span className="mt-1 block text-[10px] text-[#9a928c]">{description}</span></span><span aria-hidden="true" className={`relative h-5 w-9 shrink-0 rounded-full transition ${settings[key] ? "bg-[#a75537]" : "bg-[#d8d2cd]"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${settings[key] ? "left-[18px]" : "left-0.5"}`} /></span></button>)}
            <div className="flex justify-end border-t border-[#f1eeeb] pt-4"><Button type="button" onClick={savePreferences} className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Save size={14} /> Save preferences</Button></div>
          </div>}
        </section>
      </div>
    </div>
  );
}
