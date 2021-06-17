import { SCORE } from '../actions/index';

const INITIAL_STATE = {
  score: 0,
};

function score(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default score;
