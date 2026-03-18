"use client";

import { useState } from "react";

import { useDesperdicios } from "@/hooks/useDesperdicio";
import { useDesperdicioMutations } from "@/hooks/useDesperdicioMutations";

import { columns } from "@/components/desperdicio/desperdicio-columns";
import { DesperdicioTable } from "@/components/desperdicio/desperdicio-table";
import { DesperdicioForm } from "@/components/desperdicio/desperdicio-form";
import { Button } from "@/components/ui/button";

export default function DesperdicioPage() {
  const { data = [], isLoading } = useDesperdicios();
  const { create, update, remove } = useDesperdicioMutations();

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
          <h1 className="text-2xl font-bold">Desperdício</h1>
          <p className="text-muted-foreground">
            Gerencie os itens descartados no churrasco
          </p>
        </div>

        <Button onClick={() => setOpenModal(true)}>
          Registrar resíduos
        </Button>
      </div>

      <DesperdicioForm
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
          Carregando desperdício...
        </div>
      ) : (
        <DesperdicioTable
          columns={columns({
            onEdit: (item) => {
              setSelectedItem(item);
              setOpenModal(true);
            },
            onDelete: (item) => {
              if (confirm("Excluir esse registro?")) {
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