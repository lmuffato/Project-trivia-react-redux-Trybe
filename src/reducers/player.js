import { SCORE, PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  localStorage.setItem('state', JSON.stringify({ player: { ...state, ...payload } }));

  switch (type) {
  case PLAYER:
    return {
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      assertions: payload.assertions,
      score: payload.score,
    };
  case SCORE:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.score,
    };
  default:
    return state;
  }
};

export default player;
