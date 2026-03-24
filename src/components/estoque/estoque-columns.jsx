"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },

  // 🔥 CLIQUE NO NOME ABRE DETALHES
  {
    accessorKey: "nome",
    header: "Produto",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <span
          className="cursor-pointer font-medium hover:underline"
          onClick={() => onView(item)}
        >
          {item.nome}
        </span>
      );
    },
  },

  {
    header: "Categoria",
    cell: ({ row }) => row.original.categoria?.nome ?? "-",
  },

  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const quantidade = row.original.quantidade;

      if (quantidade > 10) return <Badge>Disponível</Badge>;
      if (quantidade > 0) return <Badge variant="secondary">Baixo</Badge>;

      return <Badge variant="destructive">Esgotado</Badge>;
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
            {/* 🔥 NOVO */}
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