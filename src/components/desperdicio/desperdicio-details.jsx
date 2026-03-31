"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { formatarDataRelativa } from "@/lib/date";

function getTipo(item) {
  if (!item) return "-";

  if (item.origem === "cliente") {
    return "Misturado";
  }

  const map = {
    comida_pronta: "Comida pronta",
    insumo_cru: "Insumo cru",
    embalagem: "Embalagem",
  };

  return map[item.tipo_residuo] || "-";
}

function getInsight(item) {
  if (!item) return "";

  if (item.origem === "cliente") {
    return "Esse desperdício vem do cliente e não é separado por tipo. Pode indicar sobra no prato ou porções mal ajustadas.";
  }

  if (item.tipo_residuo === "insumo_cru") {
    return "Desperdício de insumo cru pode indicar falha no armazenamento ou compra excessiva.";
  }

  if (item.tipo_residuo === "comida_pronta") {
    return "Desperdício de comida pronta pode indicar produção acima da demanda.";
  }

  if (item.tipo_residuo === "embalagem") {
    return "Alto volume de embalagem pode impactar custos e sustentabilidade.";
  }

  return "";
}

export function DesperdicioDetails({
  open,
  onOpenChange,
  item,
  onEdit,
  onDelete,
}) {
  if (!item) return null;

  const tipo = getTipo(item);
  const insight = getInsight(item);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{tipo}</span>

            <Badge variant={item.origem === "interno" ? "default" : "secondary"}>
              {item.origem}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Peso</p>
            <p className="text-4xl font-bold">{item.peso} kg</p>
          </div>

          {insight && (
            <div className="p-4 rounded-md border bg-muted/40">
              <p className="text-sm">{insight}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Origem</p>
              <p className="font-medium">{item.origem}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Tipo</p>
              <p className="font-medium">{tipo}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Data</p>
              <p className="font-medium">
                {formatarDataRelativa(item.data)}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onEdit(item)}>
              Editar
            </Button>

            <Button
              variant="destructive"
              onClick={() => onDelete(item)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}