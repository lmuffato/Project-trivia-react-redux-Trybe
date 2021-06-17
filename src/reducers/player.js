import { GET_PLAYER, UPDATE_ASSERTIONS, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  playerName: '',
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
      playerName: payload.name,
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
  default:
    return state;
  }
};

export default player;
