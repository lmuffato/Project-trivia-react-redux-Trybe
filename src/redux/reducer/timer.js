import { UPDATE_TIMER, TIMER_RESET, TIMER_INTERVAL } from '../action';

const initialState = {
  time: 30,
  timerInterval: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case UPDATE_TIMER:
    return { ...state, time: state.time - 1 };
  case TIMER_RESET:
    return { ...state, time: 30 };
  case TIMER_INTERVAL:
    return { ...state, timerInterval: payload };
  default:
    return state;
  }
};
