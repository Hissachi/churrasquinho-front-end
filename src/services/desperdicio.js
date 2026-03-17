import api from './api';

export const getResumoDesperdicio = (params = {}) => {
  return api.get('/desperdicios/resumo', { params });
};

export const getDesperdicios = (params = {}) => {
  return api.get('/desperdicios', { params });
};

export const criarDesperdicio = (data) => {
  return api.post('/desperdicios', data);
};