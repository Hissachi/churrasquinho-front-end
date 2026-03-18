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
  });

  // ✅ Preenche ao editar
  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        categoria_id: String(initialData.categoria_id || ""),
        quantidade: initialData.quantidade || "",
        preco: initialData.preco || "",
      });
    } else {
      setForm({
        nome: "",
        categoria_id: "",
        quantidade: "",
        preco: "",
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
      categoria_id: Number(form.categoria_id),
    });
  }

  // ✅ Flatten categorias (pai + sub)
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
          <Input
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />

          {/* Categoria */}
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
          <Input
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleChange}
          />

          {/* Preço */}
          <Input
            name="preco"
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={form.preco}
            onChange={handleChange}
          />

          {/* Botão */}
          <Button type="submit">
            {initialData ? "Atualizar" : "Criar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}