"use client";

import { useState } from "react";

import { useProdutos } from "@/hooks/useProduto";
import { useProdutoMutations } from "@/hooks/useProdutoMutations";

import { columns } from "@/components/estoque/estoque-columns";
import { EstoqueTable } from "@/components/estoque/estoque-table";
import { EstoqueForm } from "@/components/estoque/estoque-form";

import { Button } from "@/components/ui/button";

export default function EstoquePage() {
  const { data = [], isLoading } = useProdutos();
  const { create, update, remove } = useProdutoMutations();

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSubmit(formData) {
    if (selectedItem) {
      update.mutate({
        id: selectedItem.id,
        data: formData,
      });
    } else {
      create.mutate(formData);
    }

    setOpenModal(false);
    setSelectedItem(null);
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos disponíveis
          </p>
        </div>

        <Button onClick={() => setOpenModal(true)}>
          Novo produto
        </Button>
      </div>

      <EstoqueForm
        open={openModal}
        onOpenChange={(open) => {
          setOpenModal(open);
          if (!open) setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedItem}
      />

      {isLoading ? (
        <div className="text-muted-foreground">
          Carregando produtos...
        </div>
      ) : (
        <EstoqueTable
          columns={columns({
            onEdit: (item) => {
              setSelectedItem(item);
              setOpenModal(true);
            },
            onDelete: (item) => {
              if (confirm("Excluir esse produto?")) {
                remove.mutate(item.id);
              }
            },
          })}
          data={data}
        />
      )}
    </div>
  );
}