import api from "./api";

export const getCategorias = async () => {
  const response = await api.get("/categorias");
  return response.data;
};

export const criarCategoria = async (payload) => {
  const response = await api.post("/categorias", payload);
  return response.data;
};

export function atualizarCategoria(id, data) {
  return api.put(`/categorias/${id}`, data);
}

export function deletarCategoria(id) {
  return api.delete(`/categorias/${id}`);
}