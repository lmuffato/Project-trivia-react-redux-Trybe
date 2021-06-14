import { GET_TOKEN, GET_TOKEN_SUCCESS } from '../actions/index';

const INITIAL_STATE = {
  user: '',
  email: '',
  token: '',
};

const loginUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  /* case LOGIN:
    return {
      ...state,
      user: payload.user,
      email: payload.email,
    }; */
  case GET_TOKEN:
    return state;
  case GET_TOKEN_SUCCESS:
    return {
      user: payload.user,
      email: payload.email,
      token: payload.token,
    };
  default:
    return state;
  }
};

export default loginUser;
