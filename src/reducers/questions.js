import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
} from '../actions/actionQuestions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case GET_QUESTIONS_SUCCESS || GET_QUESTIONS_ERROR:
    return {
      ...state,
      isLoading: false,
      questions: action.payload.questions,
    };
  default:
    return state;
  }
};

export default questions;
