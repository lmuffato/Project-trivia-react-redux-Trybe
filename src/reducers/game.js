import {
  DISABLE,
  HIDDEN,
  CURRENT_TIME,
  CLOCK_STOPER,
  RESET_CURRENT_TIME,
  RESET_TIMER,
  CHANGE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  disableAnswer: false,
  hiddenBtnNext: true,
  currentTime: 5,
  clockStoper: false,
  resetTimer: false,
  score: 0,
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

  case RESET_TIMER:
    return ({
      ...state,
      resetTimer: action.payload,
    });

  case CHANGE_SCORE:
    return ({
      ...state,
      score: state.score + action.payload,
    });

  default:
    return state;
  }
}

export default gameReducer;
