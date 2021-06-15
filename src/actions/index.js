export const NEW_EMAIL = 'NEW_EMAIL';
export const NEW_TOKEN = 'NEW_TOKEN';
export const GET_USER_IMAGE = 'GET_USER_IMAGE';

export const newEmail = (payload) => ({
  type: NEW_EMAIL,
  payload,
});

export const newToken = (payload) => ({
  type: NEW_TOKEN,
  payload,
});

export const getUserImage = (payload) => ({
  type: GET_USER_IMAGE,
  payload,
});
