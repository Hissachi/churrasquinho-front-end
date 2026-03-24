"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Pencil, Trash } from "lucide-react";

export function EstoqueDetailsModal({
  open,
  onOpenChange,
  item,
  onEdit,
  onDelete,
}) {
  if (!item) return null;

  const valorTotal = item.quantidade * item.preco;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{item.nome}</span>

              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">
                  {item.categoria?.nome || "Sem categoria"}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <InfoCard label="Quantidade" value={item.quantidade} />

          <InfoCard
            label="Preço unitário"
            value={`R$ ${Number(item.preco).toFixed(2)}`}
          />

          <InfoCard
            label="Valor total"
            value={`R$ ${valorTotal.toFixed(2)}`}
            highlight
          />

          <InfoCard
            label="Categoria"
            value={item.categoria?.nome || "—"}
          />
        </div>

        <Separator className="my-4" />

        {/* METADADOS */}
        <div className="text-sm text-muted-foreground flex flex-col gap-1">
          <span>
            Criado em: {formatDate(item.created_at)}
          </span>
          <span>
            Atualizado em: {formatDate(item.updated_at)}
          </span>
        </div>

        <Separator className="my-4" />

        {/* AÇÕES */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onEdit(item);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(item)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* COMPONENTE AUXILIAR */
function InfoCard({ label, value, highlight }) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        highlight ? "bg-primary/5 border-primary/20" : ""
      }`}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

/* FORMATADOR */
function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}