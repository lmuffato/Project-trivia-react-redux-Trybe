import { DISABLE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  disable: false,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISABLE:
    return ({
      ...state,
      disable: action.payload,
    });

  default:
    return state;
  }
}

export default gameReducer;
