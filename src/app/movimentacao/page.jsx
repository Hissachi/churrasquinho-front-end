"use client";

import { useState } from "react";
import { columns } from "@/components/movimentacao/movimentacao-columns";
import { MovimentacoesTable } from "@/components/movimentacao/movimentacao-table";
import { MovimentacoesToolbar } from "@/components/movimentacao/movimentacao-toolbar";

import { useMovimentacoes } from "@/hooks/useMovimentacao";

export default function MovimentacoesPage() {
  const [filters, setFilters] = useState({});

  const { data } = useMovimentacoes(filters);

  const movimentacoes = data?.data ?? [];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Histórico de Movimentações</h1>
      </div>

      <MovimentacoesToolbar filters={filters} setFilters={setFilters} />

      <MovimentacoesTable data={movimentacoes} columns={columns} />
    </div>
  );
}
