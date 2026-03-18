import api from "./api";

export const getResumoDesperdicio = async (params = {}) => {
  const { data } = await api.get("/desperdicios/resumo", { params });
  return data;
};

export const getDesperdicios = async (params = {}) => {
  const { data } = await api.get("/desperdicios", { params });
  return data.data;
};

export const criarDesperdicio = async (payload) => {
  const { data } = await api.post("/desperdicios", payload);
  return data;
};

export const atualizarDesperdicio = async (id, payload) => {
  const { data } = await api.put(`/desperdicios/${id}`, payload);
  return data;
};

export const deletarDesperdicio = async (id) => {
  await api.delete(`/desperdicios/${id}`);
};