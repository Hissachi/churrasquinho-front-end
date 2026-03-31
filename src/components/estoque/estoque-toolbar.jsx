"use client";

import { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategorias } from "@/hooks/useCategoria";

export function EstoqueToolbar({ table }) {
  const { data: categorias = [] } = useCategorias();

  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const categoriaMap = useMemo(() => {
    const map = {};

    categorias.forEach((cat) => {
      map[cat.id] = [cat.id];

      cat.children?.forEach((sub) => {
        map[cat.id].push(sub.id);
        map[sub.id] = [sub.id];
      });
    });

    return map;
  }, [categorias]);

  function toggleStatus(value) {
    const current = table.getColumn("status")?.getFilterValue() || [];

    const exists = current.includes(value);

    const newValue = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    table.getColumn("status")?.setFilterValue(newValue);
  }

  function applyPreco() {
    table.getColumn("preco")?.setFilterValue({
      min: precoMin,
      max: precoMax,
    });
  }

  function handleCategoria(value) {
    if (value === "all") {
      table.getColumn("categoria_id")?.setFilterValue(undefined);
      return;
    }

    const ids = categoriaMap[value] || [value];

    table.getColumn("categoria_id")?.setFilterValue(
      ids.map(String)
    );
  }

  function clearAll() {
    table.resetColumnFilters();
    table.setGlobalFilter("");
    setPrecoMin("");
    setPrecoMax("");
  }

  return (
    <div className="flex flex-col gap-3">

      {/* 🔎 BUSCA */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Busca</p>
        <Input
          placeholder="Buscar produto..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* 🎯 FILTROS */}
      <div className="flex flex-wrap gap-4">

        {/* STATUS */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <div className="flex gap-1">
            {["disponivel", "baixo", "indisponivel"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={
                  table.getColumn("status")?.getFilterValue()?.includes(s)
                    ? "default"
                    : "outline"
                }
                onClick={() => toggleStatus(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* CATEGORIA */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Categoria</p>

          <Select onValueChange={handleCategoria}>
            <SelectTrigger className="w-48 h-9">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>

              {categorias.map((cat) => (
                <div key={cat.id}>
                  <SelectItem value={String(cat.id)}>
                    {cat.nome}
                  </SelectItem>

                  {cat.children?.map((sub) => (
                    <SelectItem key={sub.id} value={String(sub.id)}>
                      — {sub.nome}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PREÇO */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Preço</p>

          <div className="flex items-center gap-1">
            <Input
              type="number"
              placeholder="Min"
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value)}
              className="w-20 h-9"
            />

            <span className="text-muted-foreground text-sm">—</span>

            <Input
              type="number"
              placeholder="Max"
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
              className="w-20 h-9"
            />

            <Button size="sm" onClick={applyPreco}>
              OK
            </Button>
          </div>
        </div>

        {/* LIMPAR */}
        <div className="flex items-end">
          <Button size="sm" variant="ghost" onClick={clearAll}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}