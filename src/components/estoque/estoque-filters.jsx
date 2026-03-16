"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function EstoqueFilters({ table }) {
  return (
    <div className="flex flex-wrap gap-4">

      <Input
        placeholder="Buscar produto..."
        value={table.getState().globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <Select
        onValueChange={(value) =>
          table.getColumn("categoria")?.setFilterValue(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Plástico">Plástico</SelectItem>
          <SelectItem value="Metal">Metal</SelectItem>
          <SelectItem value="Papel">Papel</SelectItem>
          <SelectItem value="Vidro">Vidro</SelectItem>
        </SelectContent>

      </Select>

    </div>
  )
}