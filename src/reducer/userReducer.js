import { USER_LOGIN, USER_NAME, SCORE_ADD, ASSERTIONS_ADD } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  score: 0,
  assertions: 0,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, email: payload };
  case USER_NAME:
    return { ...state, user: payload };
  case SCORE_ADD:
    return {
      ...state,
      score: payload,
    };
  case ASSERTIONS_ADD:
    return {
      ...state,
      assertions: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
