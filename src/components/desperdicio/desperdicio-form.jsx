"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export function DesperdicioForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    peso: "",
    origem: "",
    tipo_residuo: "",
    data: "",
  });

  const isCliente = form.origem === "cliente";

  useEffect(() => {
    if (initialData) {
      setForm({
        peso: initialData.peso || "",
        origem: initialData.origem || "",
        tipo_residuo: initialData.tipo_residuo || "",
        data: initialData.data?.substring(0, 10) || "",
      });
    } else {
      setForm({
        peso: "",
        origem: "",
        tipo_residuo: "",
        data: "",
      });
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...form,
      tipo_residuo: isCliente ? null : form.tipo_residuo,
      peso: Number(form.peso),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? "Editar desperdício"
              : "Registrar desperdício"}
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Peso (kg)"
            value={form.peso}
            onChange={(e) =>
              setForm({ ...form, peso: e.target.value })
            }
          />

          <Select
            value={form.origem}
            onValueChange={(value) =>
              setForm({
                ...form,
                origem: value,
                tipo_residuo: "",
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Origem" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="interno">Interno</SelectItem>
              <SelectItem value="cliente">Cliente</SelectItem>
            </SelectContent>
          </Select>

          {isCliente ? (
            <div className="text-sm text-muted-foreground p-3 border rounded-md">
              O desperdício do cliente é considerado como{" "}
              <strong>misturado</strong> e não é separado por tipo.
            </div>
          ) : (
            <Select
              value={form.tipo_residuo}
              onValueChange={(value) =>
                setForm({ ...form, tipo_residuo: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de resíduo" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="comida_pronta">
                  Comida pronta
                </SelectItem>
                <SelectItem value="insumo_cru">
                  Insumo cru
                </SelectItem>
                <SelectItem value="embalagem">
                  Embalagem
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          <Input
            type="date"
            value={form.data}
            onChange={(e) =>
              setForm({ ...form, data: e.target.value })
            }
          />

          <Button type="submit">
            {initialData ? "Salvar alterações" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}