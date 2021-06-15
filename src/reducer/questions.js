import { GENERATE_QUESTION, REQUEST_QUESTION } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  loading: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GENERATE_QUESTION:
      return { ...state, questions: action.state, loading: false };
    case REQUEST_QUESTION:
      return { ...state, loading: true };
    default: return state;
  }
}

export default questions;
