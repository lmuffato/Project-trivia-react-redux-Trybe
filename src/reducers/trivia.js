// import { RECEIVE_TOKEN, RECEIVE_TRIVIA } from '../actions';
import { TIME, TIMER, NEXT_TIMER } from '../actions';

const INITIAL_STATE = {
  token: {},
  trivia: {},
  seconds: 0,
  secondsTimer: 30,
  timer: true,
  nextTimer: true,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      seconds: action.payload,
      secondsTimer: action.payload,
    };
  case TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  case NEXT_TIMER:
    return {
      ...state,
      nextTimer: action.payload,
    };
  default:
    return { ...state };
  }
};

export default triviaReducer;
