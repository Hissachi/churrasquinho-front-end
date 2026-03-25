"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMovimentacaoModal } from "@/context/movimentacao-context";
import { useCriarMovimentacao } from "@/hooks/useMovimentacaoMutations";
import { useProdutos } from "@/hooks/useProduto";
import { useState } from "react";

export function MovimentacaoModal() {
  const { open, fechar, produto, tipo, abrir } = useMovimentacaoModal();
  const { mutate, isPending } = useCriarMovimentacao();

  const [quantidade, setQuantidade] = useState(1);
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState("");

  const { data: produtos = [] } = useProdutos();

  const handleSubmit = () => {
    // 🔥 pega o produto certo (card OU select)
    const produtoIdFinal = produto?.id || produtoSelecionadoId;

    if (!produtoIdFinal) {
      alert("Selecione um produto");
      return;
    }

    mutate(
      {
        produto_id: Number(produtoIdFinal),
        tipo,
        quantidade: Number(quantidade),
      },
      {
        onSuccess: () => {
          fechar();
          setQuantidade(1);
          setProdutoSelecionadoId(""); // limpa select
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={fechar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {produto ? produto.nome : "Movimentação"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tipo */}
          <div className="flex gap-2">
            <Button
              variant={tipo === "entrada" ? "default" : "outline"}
              onClick={() => abrir(produto, "entrada")}
            >
              Entrada
            </Button>

            <Button
              variant={tipo === "saida" ? "default" : "outline"}
              onClick={() => abrir(produto, "saida")}
            >
              Saída
            </Button>
          </div>

          {!produto && (
            <select
              className="w-full border rounded-md p-2"
              value={produtoSelecionadoId}
              onChange={(e) => setProdutoSelecionadoId(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          )}

          {/* Quantidade */}
          <Input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          {/* Ação */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}