import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

export const insertGame = payload => api.post(`/game`, payload);
export const getAllGames = () => api.get(`/games`);
export const updateGameById = (id, payload) => api.put(`/game/${id}`, payload);
export const deleteGameById = id => api.delete(`/game/${id}`);
export const getGameById = id => api.get(`/game/${id}`);

const apis = {
  insertGame,
  getAllGames,
  updateGameById,
  deleteGameById,
  getGameById
};

export default apis;
