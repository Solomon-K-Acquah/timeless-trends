"use client";

import type { ReactNode } from "react";

export type AdminTableColumn = {
  key: string;
  label: string;
};

export type AdminTableRow = {
  id: string;
  values: Record<string, string>;
  cells: Record<string, ReactNode>;
  status?: string;
  actions?: ReactNode;
};

export function showAdminToast(message: string) {
  window.dispatchEvent(new CustomEvent("admin-toast", { detail: message }));
}

export function downloadCsv(filename: string, rows: Record<string, string>[]) {
  if (rows.length === 0) {
    showAdminToast("There are no rows to export.");
    return;
  }
  const headers = Object.keys(rows[0]);
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const content = [headers.map(escape).join(","), ...rows.map((row) => headers.map((key) => escape(row[key] ?? "")).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showAdminToast(`Downloaded ${rows.length} rows as ${filename}.`);
}
