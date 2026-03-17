"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getDesperdicios } from "@/services/desperdicio";

import { columns } from "@/components/desperdicio/desperdicio-columns";
import { DesperdicioTable } from "@/components/desperdicio/desperdicio-table";
import { DesperdicioForm } from "@/components/desperdicio/desperdicio-form";

export default function DesperdicioPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["desperdicios"],
    queryFn: () => getDesperdicios().then((res) => res.data.data),
  });

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Desperdício</h1>

          <p className="text-muted-foreground">
            Gerencie os itens descartados no churrasco
          </p>
        </div>
      </div>

      <DesperdicioForm />
      {isLoading ? (
        <div className="text-muted-foreground">Carregando desperdício...</div>
      ) : (
        <DesperdicioTable columns={columns} data={data || []} />
      )}
    </div>
  );
}
