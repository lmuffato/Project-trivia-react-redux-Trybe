// import { RECEIVE_TOKEN, RECEIVE_TRIVIA } from '../actions';
import { TIME } from '../actions';

const INITIAL_STATE = {
  token: {},
  trivia: {},
  seconds: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      seconds: action.payload,
    };
    //   case RECEIVE_TOKEN:
    //     return {
    //       ...state, /* fiquei em dúvida se tem necessidade de chamar o state */
    //       token: action.token,
    //     };
    //   case RECEIVE_TRIVIA:
    //     return {
    //       ...state, /* fiquei em dúvida se tem necessidade de chamar o state */
    //       trivia: action.trivia,
    //     };
  default:
    return { ...state };
  }
};

export default triviaReducer;
