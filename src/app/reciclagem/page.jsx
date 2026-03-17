"use client";

import { useEffect, useState } from "react";

import reciclagemData from "./data.json";

import { columns } from "@/components/reciclagem/reciclagem-columns";
import { ReciclagemTable } from "@/components/reciclagem/reciclagem-table";

export default function ReciclagemPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // simula latência de API
      await new Promise((resolve) => setTimeout(resolve, 600));

      setData(reciclagemData);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reciclagem</h1>

          <p className="text-muted-foreground">
            Gerencie os itens descartados no churrasco
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Carregando reciclagem...</div>
      ) : (
        <ReciclagemTable columns={columns} data={data} />
      )}
    </div>
  );
}
