import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recentOrders } from "@/components/admin/admin-data";
import { InteractiveTable } from "@/components/admin/interactive-table";
import type { AdminTableRow } from "@/components/admin/admin-interactions";
import { DemoExportButton } from "@/components/admin/admin-controls";

const extraOrders = [
  { id: "#TT-10837", customer: "Natali Craig", email: "natali@email.com", date: "Sep 28, 2026", total: "$342.00", status: "Shipped", initials: "NC", color: "bg-[#eeeaf7] text-[#6552a3]" },
  { id: "#TT-10836", customer: "Drew Cano", email: "drew@email.com", date: "Sep 28, 2026", total: "$96.50", status: "Delivered", initials: "DC", color: "bg-[#e6f2eb] text-[#337552]" },
  { id: "#TT-10835", customer: "Orlando Diggs", email: "orlando@email.com", date: "Sep 27, 2026", total: "$218.00", status: "Cancelled", initials: "OD", color: "bg-[#fae9e7] text-[#a4453a]" },
];

const statusClass: Record<string, string> = {
  Processing: "bg-[#fff3e8] text-[#a65b1e]",
  Shipped: "bg-[#edf2ff] text-[#4765a8]",
  Delivered: "bg-[#e9f5ed] text-[#3d7952]",
  Cancelled: "bg-[#faecea] text-[#a64f41]",
};

export default function OrdersPage() {
  const orders = [...recentOrders, ...extraOrders];
  const rows: AdminTableRow[] = orders.map((order) => ({
    id: order.id,
    status: order.status,
    values: { order: order.id, customer: order.customer, email: order.email, date: order.date, total: order.total, status: order.status },
    cells: {
      order: <span className="text-[11px] font-semibold">{order.id}</span>,
      customer: <span className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold ${order.color}`}>{order.initials}</span><span><span className="block text-[11px] font-medium">{order.customer}</span><span className="block text-[9px] text-[#aaa29d]">{order.email}</span></span></span>,
      date: <span className="text-[10px] text-[#8e8680]">{order.date}</span>,
      total: <span className="text-[11px] font-semibold">{order.total}</span>,
      status: <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClass[order.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{order.status}</span>,
    },
  }));
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Sales</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Orders</h1><p className="mt-1 text-sm text-[#8b837d]">A clear view of every order placed with your store.</p></div><DemoExportButton label="Export orders" filename="timeless-orders.csv" rows={rows.map((row) => row.values)} /></div>
      <div className="grid gap-3 sm:grid-cols-4">{[["All orders", "1,284"], ["To fulfill", "8"], ["In transit", "23"], ["Delivered", "1,196"]].map(([label, value]) => <article key={label} className="rounded-xl border border-[#eeebe8] bg-white p-4"><p className="text-[11px] text-[#8a827d]">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">{value}</p></article>)}</div>
      <div><div className="mb-3"><h2 className="text-sm font-semibold">All orders</h2><p className="mt-1 text-[10px] text-[#9a928c]">Review fulfillment status and customer details</p></div><InteractiveTable columns={[{ key: "order", label: "Order" }, { key: "customer", label: "Customer" }, { key: "date", label: "Date" }, { key: "total", label: "Total" }, { key: "status", label: "Status" }]} rows={rows} searchLabel="Search orders..." filters={["Processing", "Shipped", "Delivered", "Cancelled"]} actionLabel="Details" /></div>
      <Link href="/admin" className="inline-flex items-center gap-1 text-xs font-medium text-[#a75537]">Back to overview <ArrowRight size={13} /></Link>
    </div>
  );
}
