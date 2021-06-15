import { START_FETCH, FETCH_TOKEN_SUCCESS, FETCH_QUESTIONS_SUCCESS } from '../actions';

const INTIAL_STATE = {
  token: '',
  questions: [],
  isLoading: true,
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case START_FETCH:
    return { ...state, isLoading: true };
  case FETCH_TOKEN_SUCCESS:
    return { ...state, token: action.payload };
  case FETCH_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload, isLoading: false };
  default:
    return state;
  }
};

export default reducer;
