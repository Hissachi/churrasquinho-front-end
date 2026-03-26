"use client";

import { useState, useEffect } from "react";

import { useCategorias } from "@/hooks/useCategoria";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EstoqueForm({ open, onOpenChange, onSubmit, initialData }) {
  const { data: categorias = [] } = useCategorias();

  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    quantidade: "",
    preco: "",
    custo: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        categoria_id: String(initialData.categoria_id || ""),
        quantidade: initialData.quantidade || "",
        preco: initialData.preco || "",
        custo: initialData.custo || "",
      });
    } else {
      setForm({
        nome: "",
        categoria_id: "",
        quantidade: "",
        preco: "",
        custo: "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...form,
      quantidade: Number(form.quantidade),
      preco: Number(form.preco),
      custo: Number(form.custo),
      categoria_id: Number(form.categoria_id),
    });
  }

  function flattenCategorias(categorias) {
    const result = [];

    categorias.forEach((cat) => {
      result.push({
        id: cat.id,
        label: cat.nome,
      });

      cat.children?.forEach((sub) => {
        result.push({
          id: sub.id,
          label: `— ${sub.nome}`,
        });
      });
    });

    return result;
  }

  const categoriasFlat = flattenCategorias(categorias);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar produto" : "Novo produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nome */}
          <label className="text-sm font-medium text-gray-600">Nome</label>
          <Input
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />

          {/* Categoria */}
          <label className="text-sm font-medium text-gray-600">Categoria</label>
          <Select
            value={form.categoria_id}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                categoria_id: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>

            <SelectContent>
              {categoriasFlat.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Quantidade */}
          <label className="text-sm font-medium text-gray-600">Quantidade</label>
          <Input
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleChange}
          />

          {/* Custo */}
          <label className="text-sm font-medium text-gray-600">Custo</label>
          <Input
            name="custo"
            type="number"
            step="0.01"
            placeholder="Custo (R$)"
            value={form.custo}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, custo: e.target.value }))
            }
          />

          <label className="text-sm font-medium text-gray-600">Preço de venda</label>
          <Input
            name="preco"
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={form.preco}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, preco: e.target.value }))
            }
          />

          {/* Botão */}
          <Button type="submit">{initialData ? "Atualizar" : "Criar"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
