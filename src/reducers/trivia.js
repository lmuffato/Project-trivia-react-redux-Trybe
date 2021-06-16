import { SET_QUESTIONS, GAME_TIMEOUT,
  SET_CURRENT_QUESTION_TIME, REQUEST_QUESTIONS, UPDATE_SCORE } from '../constants';

const INITIAL_STATE = {
  questions: [],
  timeExpired: false,
  currentQuestionTime: 30,
  isLoading: true,
  score: 0,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return { ...state,
      isLoading: false,
      questions: [...state.questions, ...action.payload.results] };
  case GAME_TIMEOUT:
    return { ...state, timeExpired: true };
  case SET_CURRENT_QUESTION_TIME:
    return { ...state, currentQuestionTime: action.payload };
  case REQUEST_QUESTIONS:
    return { ...state, isLoading: true };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default trivia;
