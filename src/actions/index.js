export const USER_LOGIN = 'USER_LOGIN';
export const USER_NAME = 'USER_NAME';
export const SCORE_ADD = 'SCORE_ADD';
export const ASSERTIONS_ADD = 'ASSERTIONS_ADD';

export const loginAction = (payload) => ({ type: USER_LOGIN, payload });
export const userNameAction = (payload) => ({ type: USER_NAME, payload });
export const scoreAction = (payload) => ({ type: SCORE_ADD, payload });
export const assertionsAction = (payload) => ({ type: ASSERTIONS_ADD, payload });
