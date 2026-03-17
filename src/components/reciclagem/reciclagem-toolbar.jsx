"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ReciclagemToolbar({ table, data }) {
  function exportCSV() {
    const header = Object.keys(data[0]).join(",");

    const rows = data.map((row) => Object.values(row).join(","));

    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv]);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "reciclagem.csv";
    a.click();
  }

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Buscar..."
        value={table.getState().globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
