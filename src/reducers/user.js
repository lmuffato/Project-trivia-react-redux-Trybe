import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  userName: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, /* testar state */
      email: action.payload.email,
      userName: action.payload.userName,
    };
  default:
    return {
      ...state,
    };
  }
};

export default userReducer;
