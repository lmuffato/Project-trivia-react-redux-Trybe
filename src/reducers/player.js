import { SET_NAME, SET_EMAIL, SET_URL_GRAVATAR, SET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  gravatar: '',
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SET_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SET_URL_GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,
    };
  case SET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case 'ADD_ASSERTION':
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
    };
  default: return state;
  }
};

export default player;
