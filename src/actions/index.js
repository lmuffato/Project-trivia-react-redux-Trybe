export const NEW_EMAIL = 'NEW_EMAIL';
export const NEW_TOKEN = 'NEW_TOKEN';
export const DISABLE = 'DISABLE';
export const HIDDEN = 'HIDDEN';

export const newEmail = (payload) => ({
  type: NEW_EMAIL,
  payload,
});

export const newToken = (payload) => ({
  type: NEW_TOKEN,
  payload,
});

export const disable = (payload) => ({
  type: DISABLE,
  payload,
});

export const hidden = (payload) => ({
  type: HIDDEN,
  payload,
});
