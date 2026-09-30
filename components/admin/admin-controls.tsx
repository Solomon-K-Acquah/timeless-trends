"use client";

import { useState } from "react";
import { ChevronDown, Ellipsis, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadCsv, showAdminToast } from "./admin-interactions";

export function DemoExportButton({ label, filename, rows }: {
  label: string;
  filename: string;
  rows: Record<string, string>[];
}) {
  return (
    <Button type="button" variant="outline" onClick={() => downloadCsv(filename, rows)} className="h-9 w-fit rounded-lg border-[#e9e4df] bg-white px-3 text-xs">
      <Download size={14} /> {label}
    </Button>
  );
}

export function DateRangeButton() {
  const [range, setRange] = useState("Last 30 days");
  return (
    <label className="flex h-9 items-center gap-2 rounded-lg border border-[#e9e4df] bg-white px-3 text-xs text-[#4f4843]">
      <select aria-label="Analytics date range" value={range} onChange={(event) => { setRange(event.target.value); showAdminToast(`Showing ${event.target.value.toLowerCase()} demo metrics.`); }} className="bg-transparent outline-none">
        {["Today", "Last 7 days", "Last 30 days", "This year"].map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown size={13} className="pointer-events-none text-[#aaa29d]" />
    </label>
  );
}

export function ChartActionMenu({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button type="button" variant="ghost" size="icon" aria-label={`${title} options`} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="h-8 w-8 text-[#8c847f]"><Ellipsis size={18} /></Button>
      {open && <div className="absolute right-0 top-9 z-20 w-40 rounded-lg border border-[#eeebe8] bg-white p-1 shadow-lg"><button type="button" onClick={() => { setOpen(false); showAdminToast(`${title} chart details opened in demo mode.`); }} className="w-full rounded-md px-2.5 py-2 text-left text-[11px] hover:bg-[#faf7f5]">View details</button><button type="button" onClick={() => { setOpen(false); downloadCsv(`${title.toLowerCase().replaceAll(" ", "-")}.csv`, [{ metric: title, period: "Last 30 days", value: "Demo data" }]); }} className="w-full rounded-md px-2.5 py-2 text-left text-[11px] hover:bg-[#faf7f5]">Download CSV</button></div>}
    </div>
  );
}

export function DemoActionButton({ label, message }: { label: string; message: string }) {
  return <Button type="button" onClick={() => showAdminToast(message)} className="h-9 w-fit rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]">{label}</Button>;
}
