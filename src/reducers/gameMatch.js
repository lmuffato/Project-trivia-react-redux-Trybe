import { DISABLE_ANS, UPDATE_TIME } from '../actions';

const INITIAL_STATE = {
  timesUp: false,
  timer: 30,
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
  default:
    return state;
  }
};

export default gameMatch;
