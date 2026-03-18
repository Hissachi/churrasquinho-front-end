"use client";

import { useCategorias } from "@/hooks/useCategoria";
import { useState } from "react";
import { criarCategoria } from "@/services/categoria";
import { buildCategoriaTree } from "@/utils/categoria";

export default function ConfiguracoesPage() {
  const { data = [] } = useCategorias();
  const tree = data;
  const [nome, setNome] = useState("");
  const [parentId, setParentId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await criarCategoria({
      nome,
      parent_id: parentId || null,
    });

    setNome("");
    setParentId("");
  }

  function CategoriaTree({ data }) {
    return (
      <ul className="space-y-2">
        {data.map((cat) => (
          <li key={cat.id}>
            <div className="font-medium">{cat.nome}</div>

            {cat.children?.length > 0 && (
              <ul className="ml-4 border-l pl-4 mt-2 space-y-1">
                {cat.children.map((sub) => (
                  <li key={sub.id} className="text-muted-foreground">
                    {sub.nome}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }

  console.log("CATEGORIAS RAW:", data);

  console.log("TREE:", tree);

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      {/* Árvore */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Categorias</h2>
        <CategoriaTree data={tree} />
      </div>

      {/* Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Nova categoria</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Nome da categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sem pai</option>
            {data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>

          <button className="bg-black text-white p-2 rounded">Criar</button>
        </form>
      </div>
    </div>
  );
}
