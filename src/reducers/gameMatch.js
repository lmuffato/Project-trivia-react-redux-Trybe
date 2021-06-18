import { DISABLE_ANS, UPDATE_TIME, VERIFY_ANSWERED } from '../actions';

const INITIAL_STATE = {
  timesUp: false,
  timer: 70,
  isAnswered: true,
};

const gameMatch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_ANS:
    return ({
      ...state,
      timesUp: action.payload,
    });
  case UPDATE_TIME:
    return {
      ...state,
      timer: action.payload,
    };
  case VERIFY_ANSWERED:
    return {
      ...state,
      isAnswered: action.payload,
    };
  default:
    return state;
  }
};

export default gameMatch;
