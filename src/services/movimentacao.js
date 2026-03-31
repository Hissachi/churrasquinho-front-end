import api from "./api";

export const criarMovimentacao = async (payload) => {
  const response = await api.post("/movimentacoes", payload);
  return response.data;
};

export const getMovimentacao = async (params = {}) => {
  const response = await api.get("/movimentacoes", { params });
  return response.data;
};