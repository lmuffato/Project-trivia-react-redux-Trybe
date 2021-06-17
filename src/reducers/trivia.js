import { GAME_TRIVIA } from '../actions';

const INITIAL_STATE = {
  trivia: [],
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_TRIVIA:
    return { ...state, trivia: action.payload };
  default:
    return state;
  }
};

export default trivia;
