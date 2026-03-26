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
    header: "Custo",
    cell: ({ row }) =>
      row.original.custo ? `R$ ${Number(row.original.custo).toFixed(2)}` : "—",
  },

  {
    header: "Preço",
    cell: ({ row }) => `R$ ${Number(row.original.preco).toFixed(2)}`,
  },

  {
    header: "Margem",
    cell: ({ row }) => {
      const margem = row.original.margem;

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
    header: "Lucro potencial",
    cell: ({ row }) => {
      const lucro = row.original.lucro_total;

      if (lucro == null) return "—";

      return (
        <span
          className={
            lucro < 0
              ? "text-red-500 font-semibold"
              : "text-green-600 font-semibold"
          }
        >
          R$ {lucro.toFixed(2)}
        </span>
      );
    },
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      if (status === "disponivel") return <Badge>Disponível</Badge>;
      if (status === "baixo") return <Badge variant="secondary">Baixo</Badge>;
      if (status === "esgotado")
        return <Badge variant="destructive">Esgotado</Badge>;

      return <Badge variant="outline">Inativo</Badge>;
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
