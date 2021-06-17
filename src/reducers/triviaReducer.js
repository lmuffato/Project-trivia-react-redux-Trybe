import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_SECONDS,
  SHOULD_TIMER_RESTART,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
  seconds: 0,
  shouldTimerRestart: false,
};

export default function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
      isLoading: false,
    };
  case GET_SECONDS:
    return {
      ...state,
      seconds: action.payload,
    };
  case SHOULD_TIMER_RESTART:
    return { ...state, shouldTimerRestart: action.payload };
  default:
    return state;
  }
}
