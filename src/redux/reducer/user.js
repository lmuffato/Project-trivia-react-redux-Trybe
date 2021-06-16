import { GET_QUESTIONS, IS_FETCHING, USER_LOGIN } from '../action';

const initialState = {
  email: '',
  name: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, ...payload };
  case IS_FETCHING:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, questions: payload };
  default:
    return state;
  }
};
