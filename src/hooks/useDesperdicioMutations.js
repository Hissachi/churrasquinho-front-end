import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  criarDesperdicio,
  atualizarDesperdicio,
  deletarDesperdicio,
} from "@/services/desperdicio";

export function useDesperdicioMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(["desperdicios"]);
  };

  const create = useMutation({
    mutationFn: criarDesperdicio,
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => atualizarDesperdicio(id, data),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: deletarDesperdicio,
    onSuccess: invalidate,
  });

  return { create, update, remove };
}