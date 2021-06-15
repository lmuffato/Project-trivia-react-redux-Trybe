export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const token = (payload) => ({
  type: TOKEN,
  payload,
});
