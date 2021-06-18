import { SET_QUESTIONS, GAME_TIMEOUT,
  REQUEST_QUESTIONS, UPDATE_SCORE } from '../constants';

const INITIAL_STATE = {
  isLoading: true,
  questions: [],
  timeExpired: false,
  score: 0,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isLoading: true };
  case SET_QUESTIONS:
    return { ...state,
      isLoading: false,
      questions: [...state.questions, ...action.payload.results] };
  case GAME_TIMEOUT:
    return { ...state, timeExpired: true };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default trivia;
