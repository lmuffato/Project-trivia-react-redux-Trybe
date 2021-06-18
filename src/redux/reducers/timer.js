import { RESET_TIMER, SET_TIME, START_TIMER, STOP_TIMER } from '../actions/actions';

const INITIAL_STATE = {
  time: 30,
  timerID: '',
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_TIMER:
    return {
      ...state,
      timerID: action.payload,
    };
  case SET_TIME:
    return {
      ...state,
      time: state.time - 1,
    };
  case STOP_TIMER: {
    clearInterval(state.timerID);
    return state;
  }
  case RESET_TIMER:
    return {
      ...state,
      time: 30,
    };
  default:
    return state;
  }
};

export default timerReducer;
