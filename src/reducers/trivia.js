import { SET_QUESTIONS, GAME_TIMEOUT,
  REQUEST_QUESTIONS, UPDATE_SCORE } from '../constants';

const INITIAL_STATE = {
  isLoading: true,
  questions: [],
  timeExpired: false,
  score: 0,
  correctAnswers: 0,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isLoading: true };
  case SET_QUESTIONS:
    return { ...state,
      isLoading: false,
      questions: [...action.payload.results],
      correctAnswers: 0 };
  case GAME_TIMEOUT:
    return { ...state, timeExpired: true };
  case UPDATE_SCORE:
    return { ...state, score: action.payload, correctAnswers: state.correctAnswers + 1 };
  default:
    return state;
  }
};

export default trivia;
