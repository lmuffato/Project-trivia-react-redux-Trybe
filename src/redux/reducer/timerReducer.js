import { TIMER } from '../../common/def';

const initialState = {
  time: 30,
};

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
  case TIMER:
    return { ...state,
      time: state.time - 1 };
  default:
    return state;
  }
}
