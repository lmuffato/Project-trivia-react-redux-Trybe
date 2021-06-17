export const NEW_EMAIL = 'NEW_EMAIL';
export const NEW_TOKEN = 'NEW_TOKEN';
export const DISABLE = 'DISABLE';
export const HIDDEN = 'HIDDEN';
export const CURRENT_TIME = 'CURRENT_TIME';
export const CLOCK_STOPER = 'CLOCK_STOPER';
export const RESET_CURRENT_TIME = 'RESET_CURRENT_TIME';
export const CHANGE_TRUE_OR_FALSE = 'CHANGE_TRUE_OR_FALSE';

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

export const currentTime = (payload) => ({
  type: CURRENT_TIME,
  payload,
});

export const clockStoper = (payload) => ({
  type: CLOCK_STOPER,
  payload,
});

export const resetCurrentTime = () => ({
  type: RESET_CURRENT_TIME,
});

export const changeTrueOrFalse = (payload) => ({
  type: CHANGE_TRUE_OR_FALSE,
  payload,
});
