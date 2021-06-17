export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const score = (payload) => ({
  type: SCORE,
  payload,
});

export const quantyAssertions = (payload) => ({
  type: ASSERTIONS,
  payload,
});
