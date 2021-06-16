import { GET_QUESTIONS, GAME_TIMEOUT } from '../constants';

const INITIAL_STATE = {
  questions: [],
  timeExpired: false,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload.results] };
  case GAME_TIMEOUT:
    return { ...state, timeExpired: true };
  default:
    return state;
  }
};

export default trivia;
