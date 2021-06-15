import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: {},
  isLoading: false,
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
  default:
    return state;
  }
}
