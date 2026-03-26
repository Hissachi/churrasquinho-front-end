import { useQuery } from "@tanstack/react-query";
import { getMovimentacao } from "@/services/movimentacao";

export function useMovimentacoes() {
  return useQuery({
    queryKey: ["movimentacoes"],
    queryFn: getMovimentacao,
  });
}