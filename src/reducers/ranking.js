import { RANKING } from '../actions';

const INITIAL_STATE = [];

const ranking = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  localStorage.setItem('ranking', JSON.stringify({ ...state, ...payload }));

  switch (type) {
  case RANKING:
    return [
      ...state,
      {
        name: payload.name,
        score: payload.score,
        picture: payload.picture,
      }];
  default:
    return state;
  }
};

export default ranking;
