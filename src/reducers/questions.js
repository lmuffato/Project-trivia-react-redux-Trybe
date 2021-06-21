import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  ADD_CORRECTS,
} from '../actions/actionQuestions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  assertions: 0,
  score: 0,
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
  case ADD_CORRECTS:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload.points,
    };
  default:
    return state;
  }
};

export default questions;
