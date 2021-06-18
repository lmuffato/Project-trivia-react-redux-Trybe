import {
  GET_PLAYER, UPDATE_ASSERTIONS, UPDATE_SCORE, CLEAR_PLAYER_STATE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case GET_PLAYER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: payload,
    };
  case CLEAR_PLAYER_STATE:
    return {
      ...state,
      name: payload.name,
      assertions: payload.assertions,
      score: payload.score,
      gravatarEmail: payload.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
