"use client";

import { useState } from "react";
import {
  ChevronDown,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  atualizarCategoria,
  deletarCategoria,
} from "@/services/categoria";

import { useQueryClient } from "@tanstack/react-query";

export function CategoriaTree({ data }) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((cat) => (
        <CategoriaItem key={cat.id} categoria={cat} />
      ))}
    </div>
  );
}

function CategoriaItem({ categoria }) {
  const [open, setOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(categoria.nome);

  const queryClient = useQueryClient();

  const hasChildren = categoria.children?.length > 0;

  async function handleUpdate() {
    await atualizarCategoria(categoria.id, { nome });

    queryClient.invalidateQueries(["categorias"]);

    setIsEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    await deletarCategoria(categoria.id);

    queryClient.invalidateQueries(["categorias"]);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted transition">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => hasChildren && setOpen(!open)}
        >
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 transition ${
                open ? "rotate-0" : "-rotate-90"
              }`}
            />
          )}

          {isEditing ? (
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="h-7"
            />
          ) : (
            <span className="font-medium">{categoria.nome}</span>
          )}
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleUpdate}>
                Salvar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleDelete}>
                  <Trash className="w-4 h-4 mr-2 text-red-500" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {open && hasChildren && (
        <div className="ml-6 border-l pl-4 flex flex-col gap-1">
          {categoria.children.map((sub) => (
            <CategoriaItem key={sub.id} categoria={sub} />
          ))}
        </div>
      )}
    </div>
  );
}