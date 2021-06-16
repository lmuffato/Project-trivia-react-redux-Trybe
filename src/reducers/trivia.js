import { RECEIVE_TOKEN, RECEIVE_TRIVIA } from '../actions';

const INITIAL_STATE = {
  token: {},
  trivia: {},
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case RECEIVE_TRIVIA:
    return {
      ...state,
      trivia: action.trivia,
    };
  default:
    return { ...state };
  }
};

export default triviaReducer;
