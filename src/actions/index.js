export const LOGIN = 'LOGIN';
export const TIME = 'TIME';
export const TIMER = 'TIMER';
export const NEXT_TIMER = 'NEXT_TIMER';

export const login = (payload) => ({ type: LOGIN, payload });

export const time = (payload) => ({ type: TIME, payload });

export const nextTimer = (payload) => ({ type: NEXT_TIMER, payload });

// Requisito 8 - Determina a condição de iniciar ou pausa o cronometro
const timer = (payload) => ({ type: TIMER, payload });

export function timerThunk(payload) {
  return (dispatch) => dispatch(timer(payload));
}
//
