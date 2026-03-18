import { useQuery } from "@tanstack/react-query";
import { getDesperdicios } from "@/services/desperdicio";

export function useDesperdicios(params) {
  return useQuery({
    queryKey: ["desperdicios", params],
    queryFn: () => getDesperdicios(params),
  });
}