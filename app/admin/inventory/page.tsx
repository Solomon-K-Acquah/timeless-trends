"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Boxes, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS } from "@/data";
import { InteractiveTable } from "@/components/admin/interactive-table";
import { showAdminToast } from "@/components/admin/admin-interactions";
import type { AdminTableRow } from "@/components/admin/admin-interactions";

const inventory = [
  { product: SAMPLE_PRODUCTS[0], sku: "TT-WIG-001", onHand: 3, reserved: 1, location: "Main studio" },
  { product: SAMPLE_PRODUCTS[1], sku: "TT-WIG-002", onHand: 8, reserved: 2, location: "Main studio" },
  { product: SAMPLE_PRODUCTS[2], sku: "TT-WIG-003", onHand: 5, reserved: 1, location: "Main studio" },
  { product: SAMPLE_PRODUCTS[4], sku: "TT-EXT-001", onHand: 24, reserved: 4, location: "Main studio" },
  { product: SAMPLE_PRODUCTS[8], sku: "TT-HC-001", onHand: 42, reserved: 6, location: "Main studio" },
  { product: SAMPLE_PRODUCTS[12], sku: "TT-COS-003", onHand: 0, reserved: 0, location: "Main studio" },
];

export default function InventoryPage() {
  const rows: AdminTableRow[] = inventory.map(({ product, sku, onHand, reserved, location }) => {
    const available = onHand - reserved;
    const stockStatus = available === 0 ? "Out of stock" : available < 5 ? "Low stock" : "In stock";
    return {
      id: sku,
      status: stockStatus,
      values: { product: product.name, sku, onHand: String(onHand), reserved: String(reserved), available: String(available), location, status: stockStatus },
      cells: {
        product: <span className="flex items-center gap-3"><Image src={product.mainImage} alt="" width={38} height={38} unoptimized className="h-9 w-9 rounded-lg bg-[#f7f1ed] object-cover" /><span className="max-w-[220px] truncate text-[11px] font-medium">{product.name}</span></span>,
        sku: <span className="text-[10px] text-[#8e8680]">{sku}</span>,
        onHand: <span className="text-[11px] font-medium">{onHand}</span>,
        reserved: <span className="text-[11px] text-[#8e8680]">{reserved}</span>,
        available: <span className={`text-[11px] font-semibold ${available < 5 ? "text-[#b75b3a]" : ""}`}>{available}</span>,
        location: <span className="text-[10px] text-[#8e8680]">{location}</span>,
        status: <span className={`rounded-full px-2 py-1 text-[10px] ${available < 5 ? "bg-[#fff3e8] text-[#a65b1e]" : "bg-[#e9f5ed] text-[#3d7952]"}`}>{stockStatus}</span>,
      },
    };
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Operations</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Inventory</h1><p className="mt-1 text-sm text-[#8b837d]">Know what&apos;s in stock and what needs a little love.</p></div><Button type="button" onClick={() => showAdminToast("Select an inventory row and choose Adjust to update demo stock.")} className="h-9 w-fit rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Boxes size={14} /> Adjust stock</Button></div>
      <div className="grid gap-3 sm:grid-cols-3"><article className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="flex items-center gap-2 text-[11px] text-[#8a827d]"><Boxes size={14} /> Total units</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">2,486</p><p className="mt-1 text-[10px] text-[#9a928c]">Across 24 products</p></article><article className="rounded-xl border border-[#f0ddcd] bg-[#fffaf6] p-4"><p className="flex items-center gap-2 text-[11px] text-[#a65b1e]"><AlertTriangle size={14} /> Low stock</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">4</p><p className="mt-1 text-[10px] text-[#9a928c]">Products below threshold</p></article><article className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="flex items-center gap-2 text-[11px] text-[#8a827d]"><PackageCheck size={14} /> Inventory value</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">$84,290</p><p className="mt-1 text-[10px] text-[#9a928c]">At current retail price</p></article></div>
      <div><div className="mb-3"><h2 className="text-sm font-semibold">Stock levels</h2><p className="mt-1 text-[10px] text-[#9a928c]">Based on available-to-sell quantity</p></div><InteractiveTable columns={[{ key: "product", label: "Product" }, { key: "sku", label: "SKU" }, { key: "onHand", label: "On hand" }, { key: "reserved", label: "Reserved" }, { key: "available", label: "Available" }, { key: "location", label: "Location" }, { key: "status", label: "Status" }]} rows={rows} searchLabel="Search inventory..." filters={["In stock", "Low stock", "Out of stock"]} actionLabel="Adjust" /></div>
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-xs font-medium text-[#a75537]">Manage products <ArrowRight size={13} /></Link>
    </div>
  );
}
