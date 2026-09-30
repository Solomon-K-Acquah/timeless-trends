"use client";

import { useMemo, useState } from "react";
import { Download, Search, SlidersHorizontal, ArrowDownWideNarrow, ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTableColumn, AdminTableRow, downloadCsv, showAdminToast } from "./admin-interactions";

export function InteractiveTable({
  columns,
  rows: initialRows,
  searchLabel,
  filters = [],
  actionLabel = "View",
}: {
  columns: AdminTableColumn[];
  rows: AdminTableRow[];
  searchLabel: string;
  filters?: string[];
  actionLabel?: string;
}) {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState(columns[0]?.key ?? "");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState<AdminTableRow | null>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit" | "adjust">("view");
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const pageSize = 6;

  const filteredRows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return rows
      .filter((row) => (filter === "All" || row.status === filter))
      .filter((row) => !query || `${Object.values(row.values).join(" ")} ${row.id}`.toLocaleLowerCase().includes(query))
      .toSorted((left, right) => (left.values[sortKey] ?? "").localeCompare(right.values[sortKey] ?? "", undefined, { numeric: true }));
  }, [filter, rows, search, sortKey]);
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleRows = filteredRows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.includes(row.id));

  const toggleRow = (id: string) => setSelected((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
  const toggleVisible = () => setSelected((current) => allVisibleSelected
    ? current.filter((id) => !visibleRows.some((row) => row.id === id))
    : [...new Set([...current, ...visibleRows.map((row) => row.id)])]);
  const exportRows = () => {
    const exportable = filteredRows.filter((row) => selected.length === 0 || selected.includes(row.id));
    downloadCsv("timeless-trends-export.csv", exportable.map((row) => row.values));
  };
  const requestDelete = (ids: string[]) => {
    if (!ids.length) {
      showAdminToast("Select one or more rows first.");
      return;
    }
    setDeleteIds(ids);
  };
  const confirmDelete = () => {
    setRows((current) => current.filter((row) => !deleteIds.includes(row.id)));
    setSelected((current) => current.filter((id) => !deleteIds.includes(id)));
    showAdminToast(`Deleted ${deleteIds.length} ${deleteIds.length === 1 ? "record" : "records"} in this demo.`);
    setDeleteIds([]);
  };
  const openRow = (row: AdminTableRow, mode: "view" | "edit" | "adjust") => {
    setActiveRow(row);
    setDialogMode(mode);
    setDraftValues({ ...row.values });
  };
  const archiveSelected = () => {
    if (!selected.length) {
      showAdminToast("Select one or more rows first.");
      return;
    }
    requestDelete(selected);
  };
  const saveRow = () => {
    if (dialogMode === "adjust") {
      const quantity = Number(draftValues.onHand);
      if (!Number.isInteger(quantity) || quantity < 0) {
        showAdminToast("Enter a whole-number stock quantity of zero or more.");
        return;
      }
      if (!activeRow) return;
      const available = Math.max(0, quantity - Number(activeRow.values.reserved));
      const status = available === 0 ? "Out of stock" : available < 5 ? "Low stock" : "In stock";
      setRows((current) => current.map((row) => row.id === activeRow.id
        ? { ...row, status, values: { ...row.values, onHand: String(quantity), available: String(available), status }, cells: {} }
        : row));
      showAdminToast(`Updated ${activeRow.values.product} to ${quantity} units in demo inventory.`);
      setActiveRow(null);
      return;
    }
    if (Object.values(draftValues).some((value) => !value.trim())) {
      showAdminToast("Complete each field before saving.");
      return;
    }
    if (!activeRow) return;
    setRows((current) => current.map((row) => row.id === activeRow.id
      ? { ...row, status: draftValues.status ?? row.status, values: draftValues, cells: {} }
      : row));
    showAdminToast(`${draftValues[columns[0]?.key] ?? activeRow.id} saved in this demo.`);
    setActiveRow(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#eeebe8] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#f1eeeb] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <label className="flex h-8 min-w-[190px] items-center gap-2 rounded-lg border border-[#eeebe8] px-2.5">
            <Search size={13} className="shrink-0 text-[#aaa29d]" />
            <input aria-label={searchLabel} value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder={searchLabel} className="w-full bg-transparent text-[11px] outline-none placeholder:text-[#aaa29d]" />
          </label>
          {filters.length > 0 && <label className="flex h-8 items-center gap-1 rounded-lg border border-[#eeebe8] px-2 text-[10px] text-[#665e59]"><SlidersHorizontal size={12} /><select aria-label="Filter rows" value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }} className="max-w-28 bg-transparent outline-none"><option>All</option>{filters.map((item) => <option key={item}>{item}</option>)}</select></label>}
          <label className="hidden h-8 items-center gap-1 rounded-lg border border-[#eeebe8] px-2 text-[10px] text-[#665e59] sm:flex"><ArrowDownWideNarrow size={12} /><select aria-label="Sort rows by" value={sortKey} onChange={(event) => setSortKey(event.target.value)} className="max-w-28 bg-transparent outline-none">{columns.map(({ key, label }) => <option value={key} key={key}>{label}</option>)}</select></label>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && <Button type="button" variant="outline" onClick={archiveSelected} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px] text-[#a64f41]"><Trash2 size={12} /> Delete ({selected.length})</Button>}
          <Button type="button" variant="outline" onClick={exportRows} className="h-8 rounded-lg border-[#eeebe8] px-2.5 text-[10px] text-[#665e59]"><Download size={12} /> Export{selected.length ? " selected" : ""}</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead><tr className="bg-[#fcfbfa] text-[9px] font-semibold uppercase tracking-[.1em] text-[#aaa29d]"><th className="w-10 px-5 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleVisible} aria-label="Select visible rows" className="accent-[#a75537]" /></th>{columns.map(({ key, label }) => <th className="px-3 py-3" key={key}>{label}</th>)}<th className="px-5 py-3 text-right">Actions</th></tr></thead>
          <tbody>{visibleRows.map((row) => <tr key={row.id} className="border-t border-[#f3f0ed] hover:bg-[#fdfcfb]"><td className="px-5 py-3"><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Select ${row.id}`} className="accent-[#a75537}" /></td>{columns.map(({ key }) => <td key={key} className="px-3 py-3">{row.cells[key] ?? <span className="text-[11px] text-[#615a55]">{row.values[key]}</span>}</td>)}<td className="px-3 py-3"><div className="flex justify-end gap-1"><Button type="button" variant="ghost" size="icon" aria-label={`View ${row.id}`} title="View record" onClick={() => openRow(row, "view")} className="h-7 w-7 text-[#8b837d]"><Eye size={13} /></Button><Button type="button" variant="ghost" size="icon" aria-label={`Edit ${row.id}`} title="Edit record" onClick={() => openRow(row, "edit")} className="h-7 w-7 text-[#8b837d]"><Pencil size={13} /></Button>{actionLabel === "Adjust" && <Button type="button" variant="ghost" size="sm" onClick={() => openRow(row, "adjust")} className="h-7 text-[10px] text-[#8b837d]">Adjust</Button>}<Button type="button" variant="ghost" size="icon" aria-label={`Delete ${row.id}`} title="Delete record" onClick={() => requestDelete([row.id])} className="h-7 w-7 text-[#a64f41]"><Trash2 size={13} /></Button></div></td></tr>)}</tbody>
        </table>
        {visibleRows.length === 0 && <p className="px-5 py-12 text-center text-xs text-[#8f8781]">No matches. Try another search or filter.</p>}
      </div>
      <div className="flex items-center justify-between border-t border-[#f1eeeb] px-4 py-3 text-[10px] text-[#8f8781]"><span>{filteredRows.length === 0 ? "No results" : `Showing ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, filteredRows.length)} of ${filteredRows.length}`}</span><div className="flex items-center gap-2"><span>Page {currentPage + 1} of {pageCount}</span><Button type="button" variant="outline" size="icon" aria-label="Previous page" disabled={currentPage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))} className="h-7 w-7 rounded-md border-[#eeebe8]"><ChevronLeft size={14} /></Button><Button type="button" variant="outline" size="icon" aria-label="Next page" disabled={currentPage >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} className="h-7 w-7 rounded-md border-[#eeebe8]"><ChevronRight size={14} /></Button></div></div>
      {activeRow && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211a17]/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveRow(null); }}><section role="dialog" aria-modal="true" aria-labelledby="table-record-title" className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"><div className="mb-4 flex items-start justify-between"><div><h2 id="table-record-title" className="text-sm font-semibold">{dialogMode === "edit" ? "Edit record" : dialogMode === "adjust" ? "Adjust stock" : "Record details"}</h2><p className="mt-1 text-[10px] text-[#9a928c]">{activeRow.id} · demo data only</p></div><Button type="button" variant="ghost" size="icon" aria-label="Close details" onClick={() => setActiveRow(null)} className="h-8 w-8">×</Button></div><div className="space-y-3">{columns.map(({ key, label }) => <label key={key} className="block text-[10px] font-semibold text-[#746c66]">{label}{dialogMode === "edit" || (dialogMode === "adjust" && key === "onHand") ? <input inputMode={dialogMode === "adjust" ? "numeric" : undefined} value={draftValues[key] ?? ""} onChange={(event) => setDraftValues((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 h-9 w-full rounded-lg border border-[#e9e4df] px-3 text-xs font-normal text-[#332d29] outline-none focus:border-[#c07b61]" /> : <span className="mt-1 block rounded-lg bg-[#faf8f6] px-3 py-2.5 text-xs font-normal text-[#332d29]">{activeRow.values[key] || "—"}</span>}</label>)}</div><div className="mt-5 flex justify-end gap-2 border-t border-[#f1eeeb] pt-4"><Button type="button" variant="outline" onClick={() => setActiveRow(null)} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Close</Button>{(dialogMode === "edit" || dialogMode === "adjust") && <Button type="button" onClick={saveRow} className="h-9 rounded-lg bg-[#292321] px-3.5 text-xs text-white hover:bg-[#463a35]">{dialogMode === "adjust" ? "Save stock" : "Save changes"}</Button>}</div></section></div>}
      {deleteIds.length > 0 && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#211a17]/40 p-4"><section role="alertdialog" aria-modal="true" aria-labelledby="delete-record-title" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"><h2 id="delete-record-title" className="text-sm font-semibold">Delete {deleteIds.length === 1 ? "record" : `${deleteIds.length} records`}?</h2><p className="mt-2 text-xs leading-relaxed text-[#77706b]">This removes {deleteIds.length === 1 ? "the selected record" : "the selected records"} from this demo table. This action cannot be undone.</p><div className="mt-5 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDeleteIds([])} className="h-9 rounded-lg border-[#e9e4df] px-3 text-xs">Cancel</Button><Button type="button" onClick={confirmDelete} className="h-9 rounded-lg bg-[#a64f41] px-3.5 text-xs text-white hover:bg-[#8f4035]"><Trash2 size={13} /> Delete</Button></div></section></div>}
    </div>
  );
}
