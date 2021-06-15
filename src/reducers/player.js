import { GET_PLAYER } from '../actions';

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
    return ({
      ...state,
      playerName: payload.name,
      gravatarEmail: payload.email,
    });

  default:
    return state;
  }
};

export default player;
