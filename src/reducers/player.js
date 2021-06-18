import {
  ADD_USER_LOGIN,
  CALCULATE_SCORE,
  GET_ASSERTIONS, TIMEOUT, TIMEIN,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timeOut: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_LOGIN:
    return { ...state, gravatarEmail: action.payload.email, name: action.payload.name };
  case CALCULATE_SCORE:
    return { ...state, score: action.payload };
  case GET_ASSERTIONS:
    return { ...state, assertions: action.payload };
  case TIMEOUT:
    return { ...state, timeOut: true };
  case TIMEIN:
    return { ...state, timeOut: false };
  default:
    return state;
  }
};

export default player;
