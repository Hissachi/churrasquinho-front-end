"use client";

import { Badge } from "@/components/ui/badge";
import { formatarDataRelativa } from "@/lib/date";

export const columns = [
  {
    accessorFn: (row) => row.produto?.nome,
    id: "produto",
    header: "Produto",
    cell: ({ row }) => row.original.produto?.nome || "—",
  },

  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.original.tipo;

      if (tipo === "entrada") return <Badge>Entrada</Badge>;
      if (tipo === "saida") return <Badge variant="secondary">Saída</Badge>;

      return <Badge variant="outline">—</Badge>;
    },
    filterFn: (row, id, values) => {
      if (!values?.length) return true;
      return values.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },

  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) => {
      return formatarDataRelativa(row.original.created_at);
    },
  },
];
