import { useQuery } from "@tanstack/react-query";
import { getMovimentacao } from "@/services/movimentacao";

export function useMovimentacoes(filters) {
  return useQuery({
    queryKey: ["movimentacoes", filters],
    queryFn: () => getMovimentacao(filters),

    keepPreviousData: true,
    staleTime: 1000 * 30,
  });
}