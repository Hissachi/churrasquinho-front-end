"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarDesperdicio } from "@/services/desperdicio";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function DesperdicioForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    peso: "",
    origem: "",
    tipo_residuo: "",
    data: "",
  });

  const mutation = useMutation({
    mutationFn: criarDesperdicio,
    onSuccess: () => {
      queryClient.invalidateQueries(["desperdicios"]);
      setForm({
        peso: "",
        origem: "",
        tipo_residuo: "",
        data: "",
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate({
      ...form,
      peso: Number(form.peso),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">

      <Input
        type="number"
        placeholder="Peso (kg)"
        value={form.peso}
        onChange={(e) => setForm({ ...form, peso: e.target.value })}
      />

      <Select onValueChange={(value) => setForm({ ...form, origem: value })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Origem" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="interno">Interno</SelectItem>
          <SelectItem value="cliente">Cliente</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setForm({ ...form, tipo_residuo: value })}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="comida_pronta">Comida pronta</SelectItem>
          <SelectItem value="insumo_cru">Insumo cru</SelectItem>
          <SelectItem value="embalagem">Embalagem</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={form.data}
        onChange={(e) => setForm({ ...form, data: e.target.value })}
      />

      <Button type="submit">
        Registrar
      </Button>
    </form>
  );
}