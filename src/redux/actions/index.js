import { LOGIN } from './actionsTypes';

export const addLogin = (userInfo) => ({
  type: LOGIN,
  payload: { ...userInfo },
});

export const addToken = () => ({
  type: 'Token',
});
