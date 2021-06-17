import { SET_TIMER_ID, SAVE_SECONDS } from '../actions';

const INITIAL_STATE_TIMER = {
  seconds: 30,
  timerID: '',
};

const timer = (state = INITIAL_STATE_TIMER, action) => {
  switch (action.type) {
  case SET_TIMER_ID:
    return {
      ...state,
      timerID: action.timerID,
    };
  case SAVE_SECONDS:
    return {
      ...state,
      seconds: action.seconds,
    };
  default:
    return state;
  }
};

export default timer;
