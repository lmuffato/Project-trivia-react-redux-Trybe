import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  user: '',
  email: '',
};

const loginUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return {
      user: payload.user,
      email: payload.email,
    };
  default:
    return state;
  }
};

export default loginUser;
