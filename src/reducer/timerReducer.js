import { RESET_TIMER, REMOVE_RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  isTimerReseted: false,
};

const timerReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case RESET_TIMER:
    return {
      ...state,
      isTimerReseted: true,
    };
  case REMOVE_RESET_TIMER:
    return {
      ...state,
      isTimerReseted: false,
    };
  default:
    return state;
  }
};

export default timerReducer;
