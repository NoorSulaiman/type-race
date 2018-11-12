import api from '../api';

export const addPoints = data => () => api.game.savePoints(data)
export const getAllUsersPoints = () => api.game.getPoints()