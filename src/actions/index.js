export const NEW_EMAIL = 'NEW_EMAIL';
export const NEW_TOKEN = 'NEW_TOKEN';

export const newEmail = (payload) => ({
  type: NEW_EMAIL,
  payload,
});

export const newToken = (payload) => ({
  type: NEW_TOKEN,
  payload,
});
