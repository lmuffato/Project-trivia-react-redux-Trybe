export const USER_LOGIN = 'USER_LOGIN';
export const USER_NAME = 'USER_NAME';

export const loginAction = (payload) => ({ type: USER_LOGIN, payload });
export const userNameAction = (payload) => ({ type: USER_NAME, payload });
