"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DesperdicioToolbar({ table }) {
  function toggleFilter(columnId, value) {
    const current = table.getColumn(columnId)?.getFilterValue() || [];

    const exists = current.includes(value);

    const newValue = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    table.getColumn(columnId)?.setFilterValue(newValue);
  }

  function clearFilters() {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  }

  function isActive(columnId, value) {
    const current = table.getColumn(columnId)?.getFilterValue() || [];
    return current.includes(value);
  }

  return (
    <div className="flex flex-col gap-3">

      {/* 🔎 BUSCA */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Busca</p>
        <Input
          placeholder="Buscar desperdício..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* 🎯 FILTROS */}
      <div className="flex flex-wrap gap-4">

        {/* ORIGEM */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Origem</p>
          <div className="flex gap-1">
            {[
              { value: "interno", label: "Interno" },
              { value: "cliente", label: "Cliente" },
            ].map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={
                  isActive("origem", item.value)
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  toggleFilter("origem", item.value)
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* TIPO */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Tipo</p>
          <div className="flex gap-1 flex-wrap">
            {[
              { value: "Comida pronta", label: "Comida" },
              { value: "Insumo cru", label: "Insumo" },
              { value: "Embalagem", label: "Embalagem" },
              { value: "Misturado", label: "Misturado" },
            ].map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={
                  isActive("tipo_residuo", item.value)
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  toggleFilter("tipo_residuo", item.value)
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* LIMPAR */}
        <div className="flex items-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={clearFilters}
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}