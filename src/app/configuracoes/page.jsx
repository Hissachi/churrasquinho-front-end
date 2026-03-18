"use client";

import { useCategorias } from "@/hooks/useCategoria";
import { criarCategoria } from "@/services/categoria";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CategoriaTree } from "@/components/categoria/CategoriaTree";

export default function ConfiguracoesPage() {
  const { data: categorias = [] } = useCategorias();
  const queryClient = useQueryClient();

  const [nome, setNome] = useState("");
  const [parentId, setParentId] = useState("none");

  async function handleSubmit(e) {
    e.preventDefault();

    await criarCategoria({
      nome,
      parent_id: parentId === "none" ? null : Number(parentId),
    });

    // 🔥 ATUALIZA AUTOMATICAMENTE
    queryClient.invalidateQueries(["categorias"]);

    setNome("");
    setParentId("none");
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie categorias e organização do estoque
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>

          <CardContent>
            <CategoriaTree data={categorias} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nova categoria</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                placeholder="Nome da categoria"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <Select value={parentId} onValueChange={setParentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria pai (opcional)" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>

                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                Criar categoria
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}