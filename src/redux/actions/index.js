export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const score = (payload) => ({
  type: SCORE,
  payload,
});
