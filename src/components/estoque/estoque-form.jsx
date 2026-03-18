"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EstoqueForm({ open, onOpenChange, onSubmit, initialData }) {
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    quantidade: "",
    preco: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        categoria_id: initialData.categoria_id || "",
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
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar produto" : "Novo produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />

          <Input
            name="categoria_id"
            placeholder="Categoria ID"
            value={form.categoria_id}
            onChange={handleChange}
          />

          <Input
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleChange}
          />
          <Input
            name="preco"
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={form.preco}
            onChange={handleChange}
          />

          <Button type="submit">{initialData ? "Atualizar" : "Criar"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
