import { GET_TOKEN, GET_TOKEN_SUCCESS, FETCH_GRAVATAR } from '../actions/index';

const INITIAL_STATE = {
  user: '',
  email: '',
  token: '',
  emailConverter: '',
};

const loginUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return state;
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      user: payload.user,
      email: payload.email,
      token: payload.token,
    };
  case FETCH_GRAVATAR:
    return {
      ...state,
      emailConverter: payload.gravatarImg,
    };
  default:
    return state;
  }
};

export default loginUser;
