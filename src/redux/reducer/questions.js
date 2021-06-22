import { FETCH_QUESTION, IS_FETCHING } from '../action';

const initialState = {
  questions: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case IS_FETCHING:
    return { ...state, isFetching: true };
  case FETCH_QUESTION:
    return { ...state, questions: payload, isFetching: false };
  default:
    return state;
  }
};
