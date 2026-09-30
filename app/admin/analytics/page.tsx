import Link from "next/link";
import { ArrowUpRight, ChevronDown, CircleDollarSign, MousePointerClick, ShoppingCart, Users } from "lucide-react";
import { DateRangeButton, DemoExportButton } from "@/components/admin/admin-controls";

const analytics = [
  { label: "Total sales", value: "$48,294.80", delta: "+12.8%", icon: CircleDollarSign },
  { label: "Sessions", value: "24,891", delta: "+6.4%", icon: MousePointerClick },
  { label: "Conversion rate", value: "3.24%", delta: "+0.8%", icon: ShoppingCart },
  { label: "New customers", value: "486", delta: "+14.2%", icon: Users },
];

const sources = [
  { name: "Direct", visits: "9,224", share: 37, sales: "$18,190", color: "#bd6241" },
  { name: "Instagram", visits: "7,218", share: 29, sales: "$14,312", color: "#d99070" },
  { name: "Google search", visits: "5,226", share: 21, sales: "$10,142", color: "#e8b7a0" },
  { name: "Email", visits: "3,223", share: 13, sales: "$5,650", color: "#e8ded6" },
];

const funnelSteps = [
  ["Store sessions", "24,891", 100, "#eaded5"],
  ["Added to cart", "8,215", 64, "#ddbaa9"],
  ["Reached checkout", "4,882", 48, "#ce8f72"],
  ["Completed purchase", "806", 31, "#bd6241"],
] as const;

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-[#b75b3a]">Performance</p><h1 className="text-[30px] font-semibold tracking-[-.04em]">Analytics</h1><p className="mt-1 text-sm text-[#8b837d]">The signals behind your store&apos;s next big moment.</p></div><div className="flex gap-2"><DateRangeButton /><DemoExportButton label="Download" filename="timeless-analytics.csv" rows={sources.map(({ name, visits, share, sales }) => ({ source: name, visits, share: String(share), sales }))} /></div></div>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{analytics.map(({ label, value, delta, icon: Icon }) => <article key={label} className="rounded-xl border border-[#eeebe8] bg-white p-4"><div className="flex items-center justify-between"><p className="text-[11px] text-[#8a827d]">{label}</p><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf4f0] text-[#a75738]"><Icon size={16} /></span></div><p className="mt-3 text-2xl font-semibold tracking-[-.04em]">{value}</p><p className="mt-1 flex items-center gap-1 text-[10px]"><span className="inline-flex items-center font-semibold text-[#43825b]"><ArrowUpRight size={12} />{delta}</span><span className="text-[#9a928c]">vs previous period</span></p></article>)}</section>
      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-xl border border-[#eeebe8] bg-white p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Store conversion</h2><p className="mt-1 text-[11px] text-[#9a928c]">How visits become happy customers</p></div><span className="text-xs font-semibold text-[#403a36]">3.24%</span></div><div className="mt-6 space-y-5">{funnelSteps.map(([label, value, width, color]) => <div key={label}><div className="mb-1.5 flex justify-between text-[11px]"><span className="text-[#625b56]">{label}</span><span className="font-semibold">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#f4f1ee]"><div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} /></div></div>)}</div><div className="mt-5 border-t border-[#f1eeeb] pt-4 text-[10px] text-[#9a928c]">Session to purchase conversion <span className="ml-1 font-semibold text-[#43825b]">+0.8% vs previous period</span></div></article>
        <article className="rounded-xl border border-[#eeebe8] bg-white p-5"><h2 className="text-sm font-semibold">Traffic sources</h2><p className="mt-1 text-[11px] text-[#9a928c]">Where your visitors come from</p><div className="mt-5 space-y-4">{sources.map((source) => <div key={source.name}><div className="mb-1.5 flex justify-between text-[10px]"><span className="font-medium">{source.name}</span><span className="text-[#9a928c]">{source.visits} visits</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#f4f1ee]"><div className="h-full rounded-full" style={{ width: `${source.share}%`, backgroundColor: source.color }} /></div><p className="mt-1 text-right text-[9px] text-[#aaa29d]">{source.sales} sales</p></div>)}</div></article>
      </section>
      <div className="rounded-xl border border-[#eee5de] bg-[#fbf6f2] p-5"><p className="text-sm font-semibold text-[#684836]">A little insight, a lot of glow.</p><p className="mt-1 text-xs leading-relaxed text-[#8e7a6f]">Instagram brought nearly one in three visits this month. Consider featuring your latest wig collection in your next creator campaign.</p><Link href="/admin" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#a75537]">Back to overview <ChevronDown size={13} className="rotate-[-90deg]" /></Link></div>
    </div>
  );
}
