import { UPDATE_TIMER, TIMER_RESET } from '../action';

const initialState = {
  time: 30,
};

export default (state = initialState, { type }) => {
  switch (type) {
  case UPDATE_TIMER:
    return { ...state, time: state.time - 1 };
  case TIMER_RESET:
    return { ...state, time: 30 };
  default:
    return state;
  }
};
