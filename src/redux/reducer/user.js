import { USER_LOGIN } from '../action';

const initialState = {
  email: '',
  name: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, ...payload };

  default:
    return state;
  }
};
