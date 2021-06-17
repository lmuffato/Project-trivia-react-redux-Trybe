import {
  DISABLE,
  HIDDEN,
  CURRENT_TIME,
  CLOCK_STOPER,
  RESET_CURRENT_TIME,
  CHANGE_TRUE_OR_FALSE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  disableAnswer: false,
  hiddenBtnNext: true,
  currentTime: 5,
  clockStoper: false,
  changeTrueOrFalse: false,
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

  case CURRENT_TIME:
    return ({
      ...state,
      currentTime: state.currentTime - action.payload,
    });

  case RESET_CURRENT_TIME:
    return ({
      ...state,
      currentTime: 5,
    });

  case CLOCK_STOPER:
    return ({
      ...state,
      clockStoper: action.payload,
    });

  case CHANGE_TRUE_OR_FALSE:
    return ({
      ...state,
      changeTrueOrFalse: action.payload,
    });

  default:
    return state;
  }
}

export default gameReducer;
