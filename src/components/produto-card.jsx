"use client";

import { Button } from "@/components/ui/button";
import { useMovimentacaoModal } from "@/context/movimentacao-context";

export function ProdutoCard({ produto }) {
  const { abrir } = useMovimentacaoModal();

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-medium">{produto.nome}</p>
        <p className="text-sm text-muted-foreground">
          {produto.quantidade} em estoque
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => abrir(produto, "saida")}
        >
          -
        </Button>

        <Button size="icon" onClick={() => abrir(produto, "entrada")}>
          +
        </Button>
      </div>
    </div>
  );
}