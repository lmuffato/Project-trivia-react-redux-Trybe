import {
  DISABLE,
  HIDDEN,
  CURRENT_TIME,
  CLOCK_STOPER,
  RESET_CURRENT_TIME,
  RESET_TIMER,
  RESET_GAME_REDUCER,
} from '../actions';

const INITIAL_STATE = {
  disableAnswer: false,
  hiddenBtnNext: true,
  currentTime: 30,
  clockStoper: false,
  resetTimer: false,
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
      currentTime: 30,
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
  case RESET_GAME_REDUCER:
    return ({
      ...state,
      disableAnswer: false,
      hiddenBtnNext: true,
      currentTime: 30,
      clockStoper: false,
      resetTimer: false,
    });
  default:
    return state;
  }
}

export default gameReducer;
