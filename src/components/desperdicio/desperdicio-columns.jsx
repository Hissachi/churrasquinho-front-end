"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, Pencil, Eye } from "lucide-react";
import { formatarDataRelativa } from "@/lib/date";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getTipoLabel(item) {
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

function getOrigemBadge(origem) {
  if (origem === "interno") {
    return <Badge variant="default">Interno</Badge>;
  }

  return <Badge variant="secondary">Cliente</Badge>;
}

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

  {
    id: "tipo_residuo",
    header: "Tipo",

    accessorFn: (row) => {
      if (row.origem === "cliente") {
        return "Misturado";
      }

      const map = {
        comida_pronta: "Comida pronta",
        insumo_cru: "Insumo cru",
        embalagem: "Embalagem",
      };

      return map[row.tipo_residuo] || "";
    },
  },

  {
    accessorKey: "peso",
    header: "Peso",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.peso} kg</span>
    ),
  },

  {
    accessorKey: "origem",
    header: "Origem",
    cell: ({ row }) => getOrigemBadge(row.original.origem),
  },

  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      return formatarDataRelativa(row.original.data);
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
