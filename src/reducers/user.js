import { LOGIN } from '../constants';

const INITIAL_STATE = {
  email: '',
  username: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, username: action.payload.username };
  default:
    return state;
  }
};

export default user;
