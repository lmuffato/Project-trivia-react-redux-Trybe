import { LOGIN, GET_SCORE, GET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload.score,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default player;
