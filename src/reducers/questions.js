import { REQUEST_API_GAME,
  SAVE_NUMBER_OF_CORRECT_ANSWER } from '../actions';

const INITIAL_STATE_QUESTIONS = {
  results: [],
  loading: true,
  nOfCorrectAnswers: 0,
};

const questions = (state = INITIAL_STATE_QUESTIONS, action) => {
  switch (action.type) {
  case REQUEST_API_GAME:
    return {
      ...state,
      results: action.results,
      loading: false,
    };
  case SAVE_NUMBER_OF_CORRECT_ANSWER:
    return {
      ...state,
      nOfCorrectAnswers: action.nOfCorrectAnswers,
    };

  default:
    return state;
  }
};

export default questions;
