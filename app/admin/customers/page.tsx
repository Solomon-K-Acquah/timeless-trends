import { ArrowUpRight, Users } from "lucide-react";
import { InteractiveTable } from "@/components/admin/interactive-table";
import type { AdminTableRow } from "@/components/admin/admin-interactions";
import { DemoExportButton } from "@/components/admin/admin-controls";

const customers = [
  { name: "Olivia Rhye", email: "olivia.r@email.com", orders: 8, spent: "$2,480.00", joined: "Sep 24, 2026", initials: "OR", color: "bg-[#fce9df] text-[#a34826]", tier: "VIP" },
  { name: "Phoenix Baker", email: "phoenix@email.com", orders: 5, spent: "$1,294.50", joined: "Sep 22, 2026", initials: "PB", color: "bg-[#ece8fa] text-[#6552a3]", tier: "Returning" },
  { name: "Lana Steiner", email: "lana@email.com", orders: 4, spent: "$876.00", joined: "Sep 18, 2026", initials: "LS", color: "bg-[#e6f2eb] text-[#337552]", tier: "Returning" },
  { name: "Demi Wilkinson", email: "demi@email.com", orders: 3, spent: "$642.00", joined: "Sep 14, 2026", initials: "DW", color: "bg-[#f8e8ee] text-[#a44569]", tier: "Returning" },
  { name: "Candice Wu", email: "candice@email.com", orders: 2, spent: "$392.00", joined: "Sep 08, 2026", initials: "CW", color: "bg-[#e5eff7] text-[#3f6e91]", tier: "New" },
  { name: "Natali Craig", email: "natali@email.com", orders: 2, spent: "$518.00", joined: "Sep 02, 2026", initials: "NC", color: "bg-[#eeeaf7] text-[#6552a3]", tier: "New" },
];

export default function CustomersPage() {
  const rows: AdminTableRow[] = customers.map((customer) => ({
    id: customer.email,
    status: customer.tier,
    values: { customer: customer.name, email: customer.email, orders: String(customer.orders), spent: customer.spent, joined: customer.joined, segment: customer.tier },
    cells: {
      customer: <span className="flex items-center gap-2.5"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-semibold ${customer.color}`}>{customer.initials}</span><span><span className="block text-[11px] font-semibold">{customer.name}</span><span className="block text-[9px] text-[#aaa29d]">{customer.email}</span></span></span>,
      orders: <span className="text-[11px] text-[#6f6863]">{customer.orders}</span>,
      spent: <span className="text-[11px] font-semibold">{customer.spent}</span>,
      joined: <span className="text-[10px] text-[#8e8680]">{customer.joined}</span>,
      segment: <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${customer.tier === "VIP" ? "bg-[#fff3e8] text-[#a65b1e]" : customer.tier === "New" ? "bg-[#f2f0ee] text-[#6f6863]" : "bg-[#edf2ff] text-[#4765a8]"}`}><Users size={10} className="mr-1 inline" />{customer.tier}</span>,
    },
  }));
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Relationships</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Customers</h1><p className="mt-1 text-sm text-[#8b837d]">Get to know the people who make your business glow.</p></div><DemoExportButton label="Export customers" filename="timeless-customers.csv" rows={rows.map((row) => row.values)} /></div>
      <section className="grid gap-3 sm:grid-cols-3"><article className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">Total customers</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">8,492</p><p className="mt-1 flex items-center gap-1 text-[10px] text-[#43825b]"><ArrowUpRight size={12} /> 8.4% this month</p></article><article className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">Returning customers</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">38.6%</p><p className="mt-1 text-[10px] text-[#9a928c]">Industry-leading loyalty</p></article><article className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">Customer lifetime value</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">$284.60</p><p className="mt-1 text-[10px] text-[#9a928c]">Average spend per customer</p></article></section>
      <div><div className="mb-3"><h2 className="text-sm font-semibold">Customer directory</h2><p className="mt-1 text-[10px] text-[#9a928c]">A snapshot of your latest customers</p></div><InteractiveTable columns={[{ key: "customer", label: "Customer" }, { key: "orders", label: "Orders" }, { key: "spent", label: "Total spent" }, { key: "joined", label: "Joined" }, { key: "segment", label: "Segment" }]} rows={rows} searchLabel="Search customers..." filters={["VIP", "Returning", "New"]} actionLabel="View" /></div>
    </div>
  );
}
