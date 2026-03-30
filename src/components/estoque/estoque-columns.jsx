"use client";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, Pencil, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = ({ onEdit, onDelete, onView }) => [
  {
    accessorKey: "nome",
    header: "Produto",
  },

  {
    accessorKey: "quantidade",
    header: "Estoque",
  },

  {
    accessorKey: "categoria_id",
    header: "Categoria",
    cell: ({ row, table }) => {
      const map = table.options.meta?.categoriaMap || {};

      const id = row.getValue("categoria_id");

      return map[id] || "—";
    },
    filterFn: (row, id, values) => {
      if (!values?.length) return true;

      return values.includes(String(row.getValue(id)));
    },
  },

  {
    accessorKey: "custo",
    header: "Custo",
    cell: ({ row }) => {
      const v = row.getValue("custo");
      return v ? `R$ ${Number(v).toFixed(2)}` : "—";
    },
  },

  {
    accessorKey: "preco",
    header: "Preço",
    cell: ({ row }) => {
      const v = row.getValue("preco");
      return v ? `R$ ${Number(v).toFixed(2)}` : "—";
    },
    filterFn: (row, id, value) => {
      if (!value) return true;

      const preco = Number(row.getValue(id));
      if (isNaN(preco)) return false;

      const min = value.min ? Number(value.min) : null;
      const max = value.max ? Number(value.max) : null;

      if (min !== null && preco < min) return false;
      if (max !== null && preco > max) return false;

      return true;
    },
  },

  {
    accessorKey: "margem",
    header: "Margem",
    cell: ({ row }) => {
      const margem = row.getValue("margem");

      if (margem == null) return "—";

      return (
        <span
          className={
            margem < 0
              ? "text-red-500 font-semibold"
              : "text-green-600 font-semibold"
          }
        >
          {margem}%
        </span>
      );
    },
  },

  {
    accessorKey: "lucro_total",
    header: "Lucro potencial",
    cell: ({ row }) => {
      const lucro = row.getValue("lucro_total");

      if (lucro == null) return "—";

      return (
        <span
          className={
            lucro < 0
              ? "text-red-500 font-semibold"
              : "text-green-600 font-semibold"
          }
        >
          R$ {Number(lucro).toFixed(2)}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      if (status === "disponivel") return <Badge>Disponível</Badge>;
      if (status === "baixo") return <Badge variant="secondary">Baixo</Badge>;
      if (status === "indisponivel")
        return <Badge variant="destructive">Indisponível</Badge>;

      return <Badge variant="outline">—</Badge>;
    },
    filterFn: (row, id, value) => {
      if (!value?.length) return true;

      const status = String(row.getValue(id));
      return value.includes(status);
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(item)}>
              <Eye className="w-4 h-4 mr-2" />
              Ver detalhes
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(item)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
