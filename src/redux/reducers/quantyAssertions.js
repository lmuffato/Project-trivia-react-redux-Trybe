import { ASSERTIONS } from '../actions/index';

const INITIAL_STATE = {
  assertions: 0,
};

function score(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
}

export default score;
