import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS,
  GET_TOKEN, GET_TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  ranking: [],
  token: '',
  questions: [],
  loadingToken: false,
  loadingQuestions: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      loadingQuestions: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.questions.results,
      loadingQuestions: false,
    };
  case GET_TOKEN:
    return {
      ...state,
      loadingToken: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      loadingToken: false,
    };
  default:
    return state;
  }
};

export default game;
