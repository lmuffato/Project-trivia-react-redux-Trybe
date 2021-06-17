// import { RECEIVE_TOKEN, RECEIVE_TRIVIA } from '../actions';
import { TIME, TIMER } from '../actions';

const INITIAL_STATE = {
  token: {},
  trivia: {},
  seconds: 0,
  timer: true,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      seconds: action.payload,
    };
  case TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return { ...state };
  }
};

export default triviaReducer;
