// components/produtos-list.jsx
"use client";

import { ProdutoCard } from "./produto-card";
import { useProdutos } from "@/hooks/useProduto";
import { Card } from "@/components/ui/card";

export function ProdutosList() {
  const { data, isLoading } = useProdutos();

  if (isLoading) {
    return (
      <div className="grid gap-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <p className="text-muted-foreground">
        Nenhum produto cadastrado
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}