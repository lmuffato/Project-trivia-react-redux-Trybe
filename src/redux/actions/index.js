export const LOGIN = 'LOGIN';
export const TIME = 'TIME';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const disableButton = (payload) => ({
  type: TIME,
  payload,
});
