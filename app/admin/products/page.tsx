import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/data";
import { Button } from "@/components/ui/button";
import { InteractiveTable } from "@/components/admin/interactive-table";
import type { AdminTableRow } from "@/components/admin/admin-interactions";
import { DemoExportButton } from "@/components/admin/admin-controls";

const stockLevels = [24, 8, 16, 11, 32, 4, 19, 28];

function StockLabel({ quantity }: { quantity: number }) {
  const state = quantity === 0
    ? ["Out of stock", "bg-[#faecea] text-[#a64f41]"]
    : quantity < 10
      ? ["Low stock", "bg-[#fff3e8] text-[#a65b1e]"]
      : ["In stock", "bg-[#e9f5ed] text-[#3d7952]"];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${state[1]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{state[0]}</span>;
}

export default function ProductsPage() {
  const products = SAMPLE_PRODUCTS.slice(0, 8);
  const rows: AdminTableRow[] = products.map((product, index) => {
    const quantity = stockLevels[index];
    const price = product.salePrice ? `$${product.salePrice.toFixed(2)} (was $${product.price.toFixed(2)})` : `$${product.price.toFixed(2)}`;
    return {
      id: product.id,
      status: "Active",
      values: { product: product.name, category: product.category, price, inventory: String(quantity), status: "Active" },
      cells: {
        product: <div className="flex items-center gap-3"><Image src={product.mainImage} alt="" width={42} height={42} unoptimized className="h-10 w-10 rounded-lg bg-[#f7f1ed] object-cover" /><span><span className="block max-w-[270px] truncate text-[11px] font-semibold text-[#393330]">{product.name}</span><span className="mt-0.5 block text-[9px] text-[#aaa29d]">SKU · TT-{String(index + 1201)}</span></span></div>,
        category: <span className="text-[10px] text-[#77706b]">{product.category}</span>,
        price: <span className="text-[11px] font-semibold">{price}</span>,
        inventory: <span><span className="block text-[10px] font-medium">{quantity} units</span><span className="mt-1 block"><StockLabel quantity={quantity} /></span></span>,
        status: <span className="inline-flex items-center gap-1.5 text-[10px] text-[#43825b]"><span className="h-1.5 w-1.5 rounded-full bg-[#62a779]" />Active</span>,
      },
    };
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Catalog</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Products</h1><p className="mt-1 text-sm text-[#8b837d]">Manage your catalog, pricing, and product visibility.</p></div>
        <div className="flex gap-2"><DemoExportButton label="Export" filename="timeless-products.csv" rows={rows.map((row) => row.values)} /><Button asChild className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]"><Link href="/admin/products/new"><Plus size={15} /> Add product</Link></Button></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[["All products", "24", "Across 5 collections"], ["Active", "19", "Available to customers"], ["Drafts", "5", "Not published yet"]].map(([label, value, detail], i) => <article key={label} className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">{label}</p><div className="mt-2 flex items-end justify-between"><span className="text-2xl font-semibold tracking-[-.04em]">{value}</span><span className={`text-[10px] ${i === 1 ? "text-[#43825b]" : "text-[#aaa29d]"}`}>{detail}</span></div></article>)}
      </div>
      <div><div className="mb-3"><h2 className="text-sm font-semibold">All products <span className="ml-1 rounded-md bg-[#f5f2ef] px-1.5 py-0.5 text-[10px] text-[#8a827d]">{rows.length}</span></h2><p className="mt-1 text-[10px] text-[#9a928c]">A polished overview of your active catalog</p></div><InteractiveTable columns={[{ key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "price", label: "Price" }, { key: "inventory", label: "Inventory" }, { key: "status", label: "Status" }]} rows={rows} searchLabel="Search products..." filters={["Active"]} actionLabel="Edit" /></div>
    </div>
  );
}
