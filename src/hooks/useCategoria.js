import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "@/services/categoria";

export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });
}