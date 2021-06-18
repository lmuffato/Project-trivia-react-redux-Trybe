import {
  ADD_USER_LOGIN,
  CALCULATE_SCORE,
  TIMEOUT, TIMEIN,
  ADD_ASSERTIONS, RESET, LOGOFF,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timeOut: false,
  isLogged: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_LOGIN:
    return { ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
      isLogged: true };
  case CALCULATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case ADD_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case TIMEOUT:
    return { ...state, timeOut: true };
  case TIMEIN:
    return { ...state, timeOut: false };
  case LOGOFF:
    return { ...state, isLogged: false };
  case RESET:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default player;
