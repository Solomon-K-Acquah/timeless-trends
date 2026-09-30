import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { bestSellers, dashboardMetrics, orderVolume, recentOrders } from "@/components/admin/admin-data";
import { ChartActionMenu, DateRangeButton, DemoExportButton } from "@/components/admin/admin-controls";

const metricIcons = { sales: CreditCard, orders: ShoppingBag, basket: PackageCheck, customers: Users };

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Processing: "bg-[#fff3e8] text-[#a65b1e]",
    Shipped: "bg-[#edf2ff] text-[#4765a8]",
    Delivered: "bg-[#e9f5ed] text-[#3d7952]",
    Cancelled: "bg-[#faecea] text-[#a64f41]",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status] ?? "bg-[#f2f0ee] text-[#6f6863]"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function SalesChart() {
  const max = Math.max(...orderVolume);
  const points = orderVolume.map((value, index) => `${(index / (orderVolume.length - 1)) * 100},${100 - (value / max) * 85}`).join(" ");
  return (
    <div className="relative h-[220px]">
      <div className="absolute inset-0 flex flex-col justify-between pb-7 pt-2">
        {[0, 1, 2, 3].map((line) => <div key={line} className="border-t border-dashed border-[#efebe8]" />)}
      </div>
      <div className="absolute inset-0 flex justify-between pb-7 pt-1 text-[9px] text-[#aaa29d]">
        {["$50k", "$35k", "$20k", "$5k"].map((label) => <span key={label} className="translate-y-[-5px]">{label}</span>)}
      </div>
      <svg className="absolute inset-x-0 bottom-7 top-2 h-[calc(100%-36px)] w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Sales trend rising over the last 30 days">
        <defs><linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c86b49" stopOpacity=".22" /><stop offset="100%" stopColor="#c86b49" stopOpacity="0" /></linearGradient></defs>
        <polygon points={`0,100 ${points} 100,100`} fill="url(#sales-fill)" />
        <polyline points={points} fill="none" stroke="#bd6241" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="100" cy={100 - (orderVolume[orderVolume.length - 1] / max) * 85} r="2.1" fill="#bd6241" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] text-[#aaa29d]"><span>Sep 01</span><span>Sep 07</span><span>Sep 14</span><span>Sep 21</span><span>Sep 29</span></div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]"><Sparkles size={13} /> Tuesday, September 29, 2026</p>
          <h1 className="text-[28px] font-semibold tracking-[-.04em] text-[#282321] sm:text-[32px]">Good morning, Alex <span aria-hidden="true">✦</span></h1>
          <p className="mt-1 text-sm text-[#8b837d]">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeButton />
          <DemoExportButton label="Export report" filename="timeless-sales-report.csv" rows={recentOrders.map(({ id, customer, date, total, status }) => ({ order: id, customer, date, total, status }))} />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => {
          const Icon = metricIcons[metric.icon];
          return (
            <article key={metric.label} className="rounded-xl border border-[#eeebe8] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-[#8a827d]">{metric.label}</p>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf4f0] text-[#a75738]"><Icon size={16} strokeWidth={1.7} /></span>
              </div>
              <p className="mt-3 text-[25px] font-semibold tracking-[-.04em] text-[#2c2724]">{metric.value}</p>
              <p className="mt-1 flex items-center gap-1 text-[10px] text-[#8c847f]"><span className="inline-flex items-center gap-0.5 font-semibold text-[#43825b]"><ArrowUpRight size={12} />{metric.change}</span> <span>vs last month</span></p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <article className="rounded-xl border border-[#eeebe8] bg-white p-4 sm:p-5">
          <div className="mb-5 flex items-start justify-between">
            <div><h2 className="text-sm font-semibold">Sales overview</h2><p className="mt-1 text-[11px] text-[#9a928c]">Revenue performance over time</p></div>
            <ChartActionMenu title="Sales overview" />
          </div>
          <div className="mb-4 flex items-end gap-3"><span className="text-[26px] font-semibold tracking-[-.04em]">$48,294.80</span><span className="mb-1 inline-flex items-center gap-0.5 rounded-full bg-[#eaf4ed] px-2 py-1 text-[10px] font-semibold text-[#43825b]"><ArrowUpRight size={12} /> 12.8%</span></div>
          <SalesChart />
        </article>

        <article className="rounded-xl border border-[#eeebe8] bg-white p-4 sm:p-5">
          <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Sales by channel</h2><p className="mt-1 text-[11px] text-[#9a928c]">Where customers find you</p></div><ChartActionMenu title="Sales by channel" /></div>
          <div className="my-5 flex items-center justify-center">
            <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full" style={{ background: "conic-gradient(#bd6241 0% 58%, #eab198 58% 81%, #eee5df 81% 93%, #f7f3f0 93% 100%)" }}>
              <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-white"><span className="text-xl font-semibold">$48.3k</span><span className="text-[9px] text-[#9a928c]">Total sales</span></div>
            </div>
          </div>
          <div className="space-y-3">
            {[["Online store", "58%", "$28,011", "#bd6241"], ["Instagram", "23%", "$11,108", "#eab198"], ["Direct", "12%", "$5,795", "#d9c8bb"], ["Other", "7%", "$3,380", "#eee5df"]].map(([label, percentage, amount, color]) => (
              <div key={label} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-2 text-[#77706b]"><span className="h-2 w-2 rounded-full" style={{ background: color }} />{label}</span><span className="flex items-center gap-3"><span className="text-[#aaa29d]">{percentage}</span><span className="w-14 text-right font-medium text-[#403a36]">{amount}</span></span></div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article className="overflow-hidden rounded-xl border border-[#eeebe8] bg-white">
          <div className="flex items-center justify-between px-4 py-4 sm:px-5"><div><h2 className="text-sm font-semibold">Recent orders</h2><p className="mt-1 text-[11px] text-[#9a928c]">You have 8 orders to fulfill</p></div><Link href="/admin/orders" className="flex items-center gap-1 text-[11px] font-semibold text-[#a75537] hover:text-[#7e3c27]">View all <ArrowRight size={13} /></Link></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead><tr className="border-y border-[#f1eeeb] bg-[#fcfbfa] text-[9px] font-semibold uppercase tracking-[.1em] text-[#aaa29d]"><th className="px-5 py-2.5">Order</th><th className="px-3 py-2.5">Customer</th><th className="px-3 py-2.5">Date</th><th className="px-3 py-2.5">Amount</th><th className="px-5 py-2.5">Status</th></tr></thead>
              <tbody>{recentOrders.map((order) => <tr key={order.id} className="border-b border-[#f4f1ef] last:border-0"><td className="px-5 py-3 text-[11px] font-semibold text-[#4b4440]">{order.id}</td><td className="px-3 py-3"><span className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold ${order.color}`}>{order.initials}</span><span><span className="block text-[11px] font-medium">{order.customer}</span><span className="block text-[9px] text-[#aaa29d]">{order.email}</span></span></span></td><td className="px-3 py-3 text-[10px] text-[#8e8680]">{order.date}</td><td className="px-3 py-3 text-[11px] font-semibold">{order.total}</td><td className="px-5 py-3"><StatusBadge status={order.status} /></td></tr>)}</tbody>
            </table>
          </div>
        </article>

        <article className="rounded-xl border border-[#eeebe8] bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-semibold">Top products</h2><p className="mt-1 text-[11px] text-[#9a928c]">Best performers this month</p></div><Link href="/admin/products" aria-label="View all products" className="text-[#a75537]"><ArrowRight size={15} /></Link></div>
          <div className="space-y-4">{bestSellers.map((product, index) => <div key={product.name} className="flex items-center gap-3"><span className="text-[10px] font-medium text-[#b2aaa5]">0{index + 1}</span><Image src={product.image} alt="" width={40} height={40} unoptimized className="h-10 w-10 rounded-lg bg-[#f7f1ed] object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-[11px] font-medium">{product.name}</span><span className="block text-[9px] text-[#aaa29d]">{product.sold} sold · {product.category}</span></span><span className="text-[10px] font-semibold">{product.revenue}</span></div>)}</div>
          <div className="mt-5 rounded-lg bg-[#fbf7f4] p-3.5"><div className="flex items-center gap-2 text-[11px] font-semibold text-[#684836]"><Sparkles size={14} /> Your store is glowing</div><p className="mt-1 text-[10px] leading-relaxed text-[#8e7a6f]">Wig sales are up 18% this month. Keep your best sellers in stock to maintain momentum.</p></div>
        </article>
      </section>
    </div>
  );
}
