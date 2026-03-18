import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "@/services/produto";

export function useProdutos(params = {}) {
  return useQuery({
    queryKey: ["produtos", params],
    queryFn: () => getProdutos(params),
  });
}