export const USER_LOGIN = 'USER_LOGIN';
export const USER_NAME = 'USER_NAME';
export const SCORE_ADD = 'SCORE_ADD';
export const SAVE_TIME_LEFT = 'SAVE_TIME_LEFT';
// export const IS_TIMER_OK = 'IS_TIMER_OK';

export const loginAction = (payload) => ({ type: USER_LOGIN, payload });
export const userNameAction = (payload) => ({ type: USER_NAME, payload });
export const scoreAndAssertionsAction = (payload) => ({ type: SCORE_ADD, payload });
export const saveTimeLeftAction = (payload) => ({ type: SAVE_TIME_LEFT, payload });
// export const isTimerOkAction = (payload) => ({ type: IS_TIMER_OK, payload });
