import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "@/services/produto";

export function useProdutoMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: criarProduto,
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => atualizarProduto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });

  const remove = useMutation({
    mutationFn: deletarProduto,
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
    },
  });

  return { create, update, remove };
}