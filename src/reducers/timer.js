import { SET_TIMER_ID } from '../actions';

const INITIAL_STATE_TIMER = {
  timerID: '',
};

const timer = (state = INITIAL_STATE_TIMER, action) => {
  switch (action.type) {
  case SET_TIMER_ID:
    return {
      ...state,
      timerID: action.timerID,
    };
  default:
    return state;
  }
};

export default timer;
