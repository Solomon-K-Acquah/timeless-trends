"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Copy, Eye, Percent, Pencil, Plus, Search, Tag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showAdminToast } from "@/components/admin/admin-interactions";

type Discount = { id: string; code: string; offer: string; type: string; usage: string; expires: string; active: boolean };
const initialDiscounts: Discount[] = [
  { id: "d1", code: "GLOW15", offer: "15% off", type: "Percentage", usage: "128 / 500", expires: "Oct 15, 2026", active: true },
  { id: "d2", code: "WELCOME10", offer: "10% off", type: "Percentage", usage: "342 / Unlimited", expires: "No expiry", active: true },
  { id: "d3", code: "HAIRCARE20", offer: "$20 off", type: "Fixed amount", usage: "46 / 100", expires: "Oct 02, 2026", active: true },
  { id: "d4", code: "SUMMERGLOW", offer: "Free shipping", type: "Free shipping", usage: "86 / 250", expires: "Sep 20, 2026", active: false },
];

const couponSchema = z.object({
  code: z.string().trim().min(4, "Use at least 4 characters.").regex(/^[A-Za-z0-9-]+$/, "Use letters, numbers or hyphens only."),
  offer: z.string().trim(),
  type: z.string().min(1, "Choose a discount type."),
  expires: z.string().min(1, "Choose an expiration."),
}).refine((values) => values.type === "Free shipping" || values.offer.length > 0, {
  message: "Enter a discount value.",
  path: ["offer"],
});
type CouponValues = z.infer<typeof couponSchema>;
const inputClass = "mt-1.5 h-10 w-full rounded-lg border border-[#e9e4df] bg-white px-3 text-xs outline-none focus:border-[#c07b61] focus:ring-2 focus:ring-[#c07b61]/10";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isCreating, setIsCreating] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);
  const [viewing, setViewing] = useState<Discount | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Discount | null>(null);
  const form = useForm<CouponValues>({ resolver: zodResolver(couponSchema), defaultValues: { code: "", offer: "", type: "Percentage", expires: "Never" } });
  const discountType = useWatch({ control: form.control, name: "type" });
  const shown = useMemo(() => discounts.filter((discount) => (filter === "All" || (filter === "Active" ? discount.active : !discount.active)) && `${discount.code} ${discount.offer} ${discount.type}`.toLowerCase().includes(search.toLowerCase().trim())), [discounts, filter, search]);
  const createDiscount = form.handleSubmit((values) => {
    if (discounts.some((discount) => discount.id !== editing?.id && discount.code.toLocaleLowerCase() === values.code.toLocaleLowerCase())) {
      form.setError("code", { message: "That discount code already exists." });
      return;
    }
    const nextDiscount: Discount = {
      id: editing?.id ?? `d-${values.code.toLocaleLowerCase()}`,
      code: values.code.toLocaleUpperCase(),
      offer: values.type === "Free shipping" ? "Free shipping" : `${values.type === "Percentage" ? `${values.offer}%` : `$${values.offer}`} off`,
      type: values.type,
      usage: editing?.usage ?? "0 / Unlimited",
      expires: values.expires === "Never" ? "No expiry" : values.expires,
      active: editing?.active ?? true,
    };
    setDiscounts((current) => editing
      ? current.map((discount) => discount.id === editing.id ? nextDiscount : discount)
      : [nextDiscount, ...current]);
    setIsCreating(false);
    showAdminToast(`${values.code.toLocaleUpperCase()} ${editing ? "updated" : "created"} in demo discounts.`);
    setEditing(null);
    form.reset();
  });
  const editDiscount = (discount: Discount) => {
    setEditing(discount);
    form.reset({
      code: discount.code,
      offer: discount.type === "Percentage" ? discount.offer.replace(/% off$/, "") : discount.type === "Fixed amount" ? discount.offer.replace(/^\$| off$/g, "") : "0",
      type: discount.type,
      expires: discount.expires === "No expiry" ? "Never" : discount.expires,
    });
    setIsCreating(true);
  };
  const deleteDiscount = () => {
    if (!pendingDelete) return;
    setDiscounts((current) => current.filter((discount) => discount.id !== pendingDelete.id));
    showAdminToast(`${pendingDelete.code} deleted from demo discounts.`);
    setPendingDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Marketing</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Discounts</h1><p className="mt-1 text-sm text-[#8b837d]">Reward your customers and create a little extra glow.</p></div><Button type="button" onClick={() => { setEditing(null); form.reset({ code: "", offer: "", type: "Percentage", expires: "Never" }); setIsCreating(true); }} className="h-9 w-fit rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Plus size={14} /> Create discount</Button></div>
      <section className="grid gap-3 sm:grid-cols-3">{[["Active discounts", String(discounts.filter((item) => item.active).length), "Currently available"], ["Redemptions", "602", "Across active codes"], ["Discount value", "$8,942", "Given to customers"]].map(([label, value, note]) => <article key={label} className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">{value}</p><p className="mt-1 text-[10px] text-[#9a928c]">{note}</p></article>)}</section>
      <section className="overflow-hidden rounded-xl border border-[#eeebe8] bg-white"><div className="flex flex-col justify-between gap-3 border-b border-[#f1eeeb] p-4 sm:flex-row sm:items-center"><div><h2 className="text-sm font-semibold">Discount codes</h2><p className="mt-1 text-[10px] text-[#9a928c]">Activate, pause, or copy your promotion codes</p></div><div className="flex gap-2"><label className="flex h-8 min-w-[180px] items-center gap-2 rounded-lg border border-[#eeebe8] px-2.5"><Search size={13} className="text-[#aaa29d]" /><input aria-label="Search discounts" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search discounts..." className="w-full bg-transparent text-[11px] outline-none" /></label><select aria-label="Filter discounts" value={filter} onChange={(event) => setFilter(event.target.value)} className="h-8 rounded-lg border border-[#eeebe8] bg-white px-2 text-[10px]"><option>All</option><option>Active</option><option>Inactive</option></select></div></div>
        <div className="divide-y divide-[#f3f0ed]">{shown.map((discount) => <article key={discount.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faf2ed] text-[#a75537]"><Tag size={16} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold tracking-[.08em]">{discount.code}</span><button type="button" aria-label={`Copy ${discount.code}`} onClick={() => { navigator.clipboard?.writeText(discount.code).then(() => showAdminToast(`${discount.code} copied.`), () => showAdminToast(`Discount code: ${discount.code}`)); }} className="rounded p-1 text-[#9a928c] hover:bg-[#f4f1ee]"><Copy size={12} /></button><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${discount.active ? "bg-[#e9f5ed] text-[#3d7952]" : "bg-[#f2f0ee] text-[#6f6863]"}`}>{discount.active ? "Active" : "Inactive"}</span></div><p className="mt-1 text-[10px] text-[#8e8680]">{discount.offer} · {discount.type} · {discount.usage} uses · Expires {discount.expires}</p></div><div className="flex flex-wrap items-center gap-1"><Button type="button" variant="ghost" size="icon" aria-label={`View ${discount.code}`} title="View discount" onClick={() => setViewing(discount)} className="h-8 w-8 text-[#8b837d]"><Eye size={14} /></Button><Button type="button" variant="ghost" size="icon" aria-label={`Edit ${discount.code}`} title="Edit discount" onClick={() => editDiscount(discount)} className="h-8 w-8 text-[#8b837d]"><Pencil size={14} /></Button><Button type="button" variant="outline" onClick={() => { setDiscounts((current) => current.map((item) => item.id === discount.id ? { ...item, active: !item.active } : item)); showAdminToast(`${discount.code} ${discount.active ? "paused" : "activated"} in demo mode.`); }} className="h-8 rounded-lg border-[#eeebe8] px-3 text-[10px]">{discount.active ? "Pause" : "Activate"}</Button><Button type="button" variant="ghost" size="icon" aria-label={`Delete ${discount.code}`} title="Delete discount" onClick={() => setPendingDelete(discount)} className="h-8 w-8 text-[#a64f41]"><Trash2 size={14} /></Button></div></article>)}
          {shown.length === 0 && <p className="px-5 py-12 text-center text-xs text-[#8f8781]">No discounts match your search.</p>}</div>
      </section>
      {isCreating && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) { setIsCreating(false); setEditing(null); } }}><section role="dialog" aria-modal="true" aria-labelledby="coupon-title" className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h2 id="coupon-title" className="text-base font-semibold">{editing ? "Edit discount" : "Create a discount"}</h2><p className="mt-1 text-[11px] text-[#9a928c]">Update the offer details for your demo store.</p></div><button type="button" aria-label="Close discount form" onClick={() => { setIsCreating(false); setEditing(null); }} className="rounded-lg p-1.5 text-[#8f8781] hover:bg-[#f5f2ef]"><X size={17} /></button></div><form onSubmit={createDiscount} className="space-y-4"><label className="block text-[11px] font-medium">Discount code<input {...form.register("code")} placeholder="GLOW15" className={`${inputClass} uppercase`} />{form.formState.errors.code && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.code.message}</span>}</label><div className="grid grid-cols-2 gap-3"><label className="text-[11px] font-medium">Discount type<select {...form.register("type")} className={inputClass}><option>Percentage</option><option>Fixed amount</option><option>Free shipping</option></select></label><label className="text-[11px] font-medium">Value<div className="relative"><input {...form.register("offer")} placeholder="15" disabled={discountType === "Free shipping"} className={`${inputClass} pr-8 disabled:bg-[#f5f2ef]`} /><Percent size={12} className="absolute right-3 top-4 text-[#aaa29d]" /></div>{form.formState.errors.offer && <span className="mt-1 block text-[10px] text-[#b34235]">{form.formState.errors.offer.message}</span>}</label></div><label className="block text-[11px] font-medium">Expires<select {...form.register("expires")} className={inputClass}><option>Never</option><option>Oct 15, 2026</option><option>Nov 01, 2026</option><option>Dec 31, 2026</option>{editing && editing.expires !== "No expiry" && !["Oct 15, 2026", "Nov 01, 2026", "Dec 31, 2026"].includes(editing.expires) && <option>{editing.expires}</option>}</select></label><div className="flex justify-end gap-2 border-t border-[#f1eeeb] pt-4"><Button type="button" variant="outline" onClick={() => { setIsCreating(false); setEditing(null); }} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button><Button type="submit" className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]">{editing ? "Save changes" : "Create discount"}</Button></div></form></section></div>}
      {viewing && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setViewing(null); }}><section role="dialog" aria-modal="true" aria-labelledby="discount-details-title" className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"><div className="mb-4 flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#a75537]">Discount details</p><h2 id="discount-details-title" className="mt-1 text-base font-semibold">{viewing.code}</h2></div><button type="button" aria-label="Close discount details" onClick={() => setViewing(null)} className="rounded-lg p-1.5 text-[#8f8781] hover:bg-[#f5f2ef]"><X size={17} /></button></div><dl className="space-y-3 text-xs">{[["Offer", viewing.offer], ["Type", viewing.type], ["Redemptions", viewing.usage], ["Expires", viewing.expires], ["Status", viewing.active ? "Active" : "Inactive"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-[#f3f0ed] pb-2"><dt className="text-[#8e8680]">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl><div className="mt-5 flex justify-end"><Button type="button" onClick={() => setViewing(null)} className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white">Close</Button></div></section></div>}
      {pendingDelete && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#211a17]/40 p-4"><section role="alertdialog" aria-modal="true" aria-labelledby="discount-delete-title" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"><h2 id="discount-delete-title" className="text-sm font-semibold">Delete {pendingDelete.code}?</h2><p className="mt-2 text-xs leading-relaxed text-[#77706b]">This discount will be removed from the demo list. This action cannot be undone.</p><div className="mt-5 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setPendingDelete(null)} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button><Button type="button" onClick={deleteDiscount} className="h-9 rounded-lg bg-[#a64f41] px-3.5 text-xs text-white hover:bg-[#8f4035]"><Trash2 size={13} /> Delete</Button></div></section></div>}
    </div>
  );
}
