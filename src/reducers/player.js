import { GET_NAME } from '../actions';

const INITIAL_STATE = {
  playerName: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    return ({
      ...state,
      playerName: action.payload,
    });

  default:
    return state;
  }
};

export default player;
