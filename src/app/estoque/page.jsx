"use client";

import { useEffect, useState } from "react";

import estoqueData from "./data.json";

import { columns } from "@/components/estoque/estoque-columns";
import { EstoqueTable } from "@/components/estoque/estoque-table";

export default function EstoquePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // simula latência de API
      await new Promise((resolve) => setTimeout(resolve, 600));

      setData(estoqueData);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Estoque</h1>

          <p className="text-muted-foreground">
            Gerencie os itens utilizados no churrasco
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Carregando estoque...</div>
      ) : (
        <EstoqueTable columns={columns} data={data} />
      )}
    </div>
  );
}
