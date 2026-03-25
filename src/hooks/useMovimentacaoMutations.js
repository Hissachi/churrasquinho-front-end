import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarMovimentacao } from "@/services/movimentacao";

export function useCriarMovimentacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarMovimentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}