import { DISABLE, HIDDEN } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  disableAnswer: false,
  hiddenBtnNext: true,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISABLE:
    return ({
      ...state,
      disableAnswer: action.payload,
    });

  case HIDDEN:
    return ({
      ...state,
      hiddenBtnNext: action.payload,
    });

  default:
    return state;
  }
}

export default gameReducer;
