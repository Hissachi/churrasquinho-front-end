import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "@/services/produto";

export function useProdutos(params = {}) {
  return useQuery({
    queryKey: ["produtos", JSON.stringify(params)],

    queryFn: () => getProdutos(params),

    staleTime: 1000 * 60, // 1 min
    keepPreviousData: true,

    select: (data) => {
      return data?.map((produto) => ({
        ...produto,
        estoqueBaixo: produto.quantidade < 5,
      }));
    },
  });
}