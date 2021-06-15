import { USER_LOGIN, USER_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, email: payload };
  case USER_NAME:
    return { ...state, user: payload };
  default:
    return state;
  }
};

export default userReducer;
