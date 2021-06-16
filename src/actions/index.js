export const USER_NAME = 'USER_NAME';
export const PICTURE = 'PICTURE';

export const login = (value) => ({ type: USER_NAME, payload: value });
export const picture = (value) => ({ type: PICTURE, payload: value });
