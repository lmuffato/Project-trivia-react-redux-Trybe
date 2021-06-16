import { DISABLE_ANS } from '../actions';

const INITIAL_STATE = {
  timesUp: false,
};

const gameMatch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_ANS:
    return ({
      ...state,
      timesUp: action.payload,
    });

  default:
    return state;
  }
};

export default gameMatch;
