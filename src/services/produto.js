import api from "./api";

export const getProdutos = async (params = {}) => {
  const response = await api.get("/produtos", { params });
  return response.data.data;
};

export const criarProduto = async (payload) => {
  const response = await api.post("/produtos", payload);
  return response.data;
};

export const atualizarProduto = async (id, payload) => {
  const response = await api.put(`/produtos/${id}`, payload);
  return response.data;
};

export const deletarProduto = async (id) => {
  await api.delete(`/produtos/${id}`);
};