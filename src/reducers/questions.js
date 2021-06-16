import { REQUEST_API_GAME } from '../actions';

const INITIAL_STATE_QUESTIONS = {
  results: [],
  loading: true,
};

const questions = (state = INITIAL_STATE_QUESTIONS, action) => {
  switch (action.type) {
  case REQUEST_API_GAME:
    return {
      ...state,
      results: action.results,
      loading: false,
    };
  default:
    return state;
  }
};

export default questions;
