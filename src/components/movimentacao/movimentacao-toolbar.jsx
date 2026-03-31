"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MovimentacoesToolbar({ filters, setFilters }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput || undefined,
      }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  function toggleTipo(tipo) {
    const current = filters?.tipo ? filters.tipo.split(",") : [];

    const exists = current.includes(tipo);

    const updated = exists
      ? current.filter((t) => t !== tipo)
      : [...current, tipo];

    setFilters((prev) => ({
      ...prev,
      tipo: updated.length ? updated.join(",") : undefined,
    }));
  }

  function isActive(tipo) {
    return filters?.tipo?.split(",").includes(tipo);
  }

  function setPeriodo(tipo) {
    const hoje = new Date();

    let inicio;
    let fim = hoje.toISOString().slice(0, 10);

    if (tipo === "hoje") {
      inicio = fim;
    }

    if (tipo === "7dias") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      inicio = d.toISOString().slice(0, 10);
    }

    if (tipo === "mes") {
      const d = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      inicio = d.toISOString().slice(0, 10);
    }

    setFilters((prev) => ({
      ...prev,
      data_inicio: inicio,
      data_fim: fim,
    }));
  }

  function setData(field, value) {
    setFilters((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  }

  function clearFilters() {
    setSearchInput("");
    setFilters({});
  }

  return (
    <div className="flex flex-col gap-4">

      <div>
        <p className="text-xs text-muted-foreground mb-1">Busca</p>
        <Input
          placeholder="Buscar por produto ou observação..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Tipo</p>
          <div className="flex gap-1">
            {["entrada", "saida"].map((tipo) => (
              <Button
                key={tipo}
                size="sm"
                variant={isActive(tipo) ? "default" : "outline"}
                onClick={() => toggleTipo(tipo)}
              >
                {tipo}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Período</p>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => setPeriodo("hoje")}>
              Hoje
            </Button>
            <Button size="sm" variant="outline" onClick={() => setPeriodo("7dias")}>
              7 dias
            </Button>
            <Button size="sm" variant="outline" onClick={() => setPeriodo("mes")}>
              Mês
            </Button>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Data personalizada</p>
          <div className="flex gap-2">
            <Input
              type="date"
              value={filters?.data_inicio || ""}
              onChange={(e) => setData("data_inicio", e.target.value)}
            />
            <Input
              type="date"
              value={filters?.data_fim || ""}
              onChange={(e) => setData("data_fim", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-end">
          <Button size="sm" variant="ghost" onClick={clearFilters}>
            Limpar
          </Button>
        </div>

      </div>
    </div>
  );
}